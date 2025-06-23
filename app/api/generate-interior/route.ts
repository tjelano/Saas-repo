import { createClient } from '@supabase/supabase-js';
import Replicate from 'replicate';
import { db } from '@/utils/db/db';
import { generatedImagesTable } from '@/utils/db/schema';
import { createClient as createSupabaseClient } from '@/utils/supabase/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server operations
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const supabaseServer = createSupabaseClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      image, 
      prompt, 
      negative_prompt,
      guidance_scale = 15,
      num_inference_steps = 50,
      prompt_strength = 0.8,
    } = await request.json();

    // Generate image with Replicate
    const output = await replicate.run(
      "adirik/interior-design:latest",
      {
        input: {
          image,
          prompt,
          negative_prompt,
          guidance_scale,
          num_inference_steps,
          prompt_strength,
        },
      }
    );

    // Download and store the generated image
    // The output is an array of URLs, so we take the first one.
    const generatedImageUrl = (output as string[])[0];
    const imageResponse = await fetch(generatedImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Upload to Supabase Storage
    const fileName = `${user.id}/${Date.now()}-generated.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-interiors')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('generated-interiors')
      .getPublicUrl(fileName);

    // Save to database using Drizzle
    const [dbData] = await db.insert(generatedImagesTable).values({
      userId: user.id,
      originalImageUrl: image,
      generatedImageUrl: urlData.publicUrl,
      prompt,
      negativePrompt: negative_prompt,
      generationSettings: JSON.stringify({
        guidance_scale,
        num_inference_steps,
        prompt_strength,
      }),
    }).returning();

    return Response.json({ 
      success: true, 
      data: dbData,
      image_url: urlData.publicUrl 
    });

  } catch (error) {
    console.error('Generation error:', error);
    return Response.json(
      { error: 'Failed to generate image' }, 
      { status: 500 }
    );
  }
} 