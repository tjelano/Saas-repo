import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { db } from "@/utils/db/db"
import { designsTable } from "@/utils/db/schema"
import { randomUUID } from "crypto"

// Insert your API keys here
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

if (!REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN environment variable is not set")
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    // Prepare the request to Replicate (or your own API)
    const replicateInput = {
      image: base64Image,
      prompt: params.prompt,
      negative_prompt: params.negative_prompt,
      num_inference_steps: params.num_inference_steps,
      guidance_scale: params.guidance_scale,
      prompt_strength: params.prompt_strength,
      ...(params.seed && { seed: params.seed }),
    }

    // Call Replicate API to get model version (replace with your own API if needed)
    const modelResponse = await fetch("https://api.replicate.com/v1/models/adirik/interior-design", {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
    })
    if (!modelResponse.ok) throw new Error("Failed to get model info")
    const modelData = await modelResponse.json()
    const latestVersion = modelData.latest_version.id

    // Make prediction
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version: latestVersion, input: replicateInput }),
    })
    if (!response.ok) throw new Error("Failed to start prediction")
    let prediction = await response.json()

    // Poll for completion
    while (["starting", "processing"].includes(prediction.status)) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
      })
      if (!pollResponse.ok) throw new Error("Failed to poll prediction")
      prediction = await pollResponse.json()
    }

    if (prediction.status === "failed") {
      return NextResponse.json({ error: prediction.error || "Prediction failed" }, { status: 500 })
    }

    // Optionally save the design to the database here
    // ...

    return NextResponse.json({ output: prediction.output })
  } catch (error) {
    console.error("API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
} 