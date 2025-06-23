import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // No authentication, just pass through
    return NextResponse.next({ request })
}