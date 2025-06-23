import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ 
    message: "API is working", 
    timestamp: new Date().toISOString(),
    env: {
      hasReplicateToken: !!process.env.REPLICATE_API_TOKEN,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: "POST request received", 
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: "Invalid JSON in request body" 
    }, { status: 400 })
  }
} 