import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import logger from '@/utils/logger'

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
const MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION || "REMOVED"

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Supabase user session check
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      logger.warn('Unauthorized API access attempt', { path: '/api/replicate' });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    logger.apiRequest('POST', '/api/replicate', user.id);

    if (!REPLICATE_API_TOKEN) {
      logger.error('Replicate API token not configured', undefined, { userId: user.id });
      return NextResponse.json({ 
        error: "Replicate API token not configured. Please set REPLICATE_API_TOKEN environment variable. Get your token from https://replicate.com" 
      }, { status: 500 })
    }

    const formData = await request.formData()
    const image = formData.get("image") as File
    const paramsString = formData.get("params") as string

    if (!image || !paramsString) {
      logger.warn('Missing required parameters', { userId: user.id, hasImage: !!image, hasParams: !!paramsString });
      return NextResponse.json({ error: "Missing image or parameters" }, { status: 400 })
    }

    // Validate image size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (image.size > maxSize) {
      logger.warn('Image too large', { userId: user.id, imageSize: image.size, maxSize });
      return NextResponse.json({ error: "Image too large. Maximum size is 10MB" }, { status: 400 })
    }

    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      logger.warn('Invalid image type', { userId: user.id, imageType: image.type });
      return NextResponse.json({ error: "Invalid image type. Please use JPEG, PNG, or WebP" }, { status: 400 })
    }

    let params;
    try {
      params = JSON.parse(paramsString)
    } catch (error) {
      logger.warn('Invalid JSON parameters', { userId: user.id, error: error instanceof Error ? error.message : 'Unknown' });
      return NextResponse.json({ error: "Invalid parameters format" }, { status: 400 })
    }

    // Validate required parameters
    if (!params.prompt || typeof params.prompt !== 'string') {
      logger.warn('Missing or invalid prompt', { userId: user.id });
      return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`

    // Use the model version from env or fallback to default
    const modelVersion = MODEL_VERSION;

    // Prepare the request to Replicate
    const replicateInput = {
      image: base64Image,
      prompt: params.prompt,
      negative_prompt: params.negative_prompt || "blurry, low quality, distorted",
      num_inference_steps: params.num_inference_steps || 20,
      guidance_scale: params.guidance_scale || 7.5,
      strength: params.prompt_strength || 0.8,
    }

    logger.info('Starting Replicate prediction', { userId: user.id, modelVersion });

    // Make prediction directly with the model version
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        version: modelVersion, 
        input: replicateInput 
      }),
    })
    
    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Replicate API error', new Error(`HTTP ${response.status}: ${errorText}`), { 
        userId: user.id, 
        status: response.status 
      });
      return NextResponse.json({ 
        error: `Failed to start prediction: ${response.status} ${errorText}` 
      }, { status: 500 })
    }
    
    let prediction = await response.json()

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds timeout
    
    while (["starting", "processing"].includes(prediction.status) && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      attempts++;
      
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
      })
      
      if (!pollResponse.ok) {
        const errorText = await pollResponse.text();
        logger.error('Replicate polling error', new Error(`HTTP ${pollResponse.status}: ${errorText}`), { 
          userId: user.id, 
          predictionId: prediction.id,
          attempts 
        });
        return NextResponse.json({ 
          error: `Failed to poll prediction: ${pollResponse.status} ${errorText}` 
        }, { status: 500 })
      }
      
      prediction = await pollResponse.json()
    }

    if (attempts >= maxAttempts) {
      logger.warn('Prediction timeout', { userId: user.id, predictionId: prediction.id, attempts });
      return NextResponse.json({ 
        error: "Prediction timed out after 60 seconds" 
      }, { status: 500 })
    }

    if (prediction.status === "failed") {
      logger.error('Prediction failed', new Error(prediction.error || 'Unknown error'), { 
        userId: user.id, 
        predictionId: prediction.id 
      });
      return NextResponse.json({ error: prediction.error || "Prediction failed" }, { status: 500 })
    }

    const duration = Date.now() - startTime;
    logger.apiResponse('POST', '/api/replicate', 200, duration);
    logger.info('Prediction completed successfully', { userId: user.id, predictionId: prediction.id, duration });

    return NextResponse.json({ output: prediction.output })
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    
    logger.error('Unexpected error in replicate API', error instanceof Error ? error : new Error(errorMessage), {
      duration,
      path: '/api/replicate'
    });
    
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
} 