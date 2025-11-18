import { NextRequest, NextResponse } from 'next/server'

// This is a demo endpoint. In production, connect to your database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Verify credentials against database
    // TODO: Create auth session/token
    // TODO: Set secure HTTP-only cookie

    console.log('[v0] Login attempt:', { email })

    return NextResponse.json(
      { message: 'Login successful', userId: 'user_demo' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
