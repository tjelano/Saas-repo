import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      return NextResponse.json({
        error: "DATABASE_URL environment variable is not set on Vercel.",
      }, { status: 500 });
    }

    // For security, we will not expose the full URL.
    // Instead, we parse it and return only safe-to-view parts.
    const url = new URL(dbUrl);

    return NextResponse.json({
      message: "Successfully read environment variable from Vercel.",
      database_host: url.hostname,
      database_port: url.port,
      database_protocol: url.protocol,
      database_url_char_length: dbUrl.length,
      database_url_is_set: true,
    });

  } catch (error) {
    return NextResponse.json({
      error: "Failed to parse DATABASE_URL. Please ensure it's a valid URL in Vercel environment variables.",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      fullValueForDebugging: process.env.DATABASE_URL?.substring(0, 20) + "..." // Show only a snippet for debugging
    }, { status: 500 });
  }
} 