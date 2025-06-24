import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN
const MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION || "REMOVED"

export async function POST(request: NextRequest) {
  try {
    // Debug: log cookies
    console.log('API /api/replicate - Cookies:', request.cookies.getAll());

    // Supabase user session check
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!REPLICATE_API_TOKEN) {
      return NextResponse.json({ 
        error: "Replicate API token not configured. Please set REPLICATE_API_TOKEN environment variable. Get your token from https://replicate.com" 
      }, { status: 500 })
    }

    const formData = await request.formData()
    const image = formData.get("image") as File
    const paramsString = formData.get("params") as string

    if (!image || !paramsString) {
      return NextResponse.json({ error: "Missing image or parameters" }, { status: 400 })
    }

    const params = JSON.parse(paramsString)

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
        return NextResponse.json({ 
          error: `Failed to poll prediction: ${pollResponse.status} ${errorText}` 
        }, { status: 500 })
      }
      
      prediction = await pollResponse.json()
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json({ 
        error: "Prediction timed out after 60 seconds" 
      }, { status: 500 })
    }

    if (prediction.status === "failed") {
      return NextResponse.json({ error: prediction.error || "Prediction failed" }, { status: 500 })
    }

    return NextResponse.json({ output: prediction.output })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
} 