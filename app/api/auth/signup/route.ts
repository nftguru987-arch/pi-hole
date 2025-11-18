import { NextRequest, NextResponse } from 'next/server'

// This is a demo endpoint. In production, connect to your database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessName, email, password, whatsappNumber } = body

    // Validation
    if (!businessName || !email || !password || !whatsappNumber) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // TODO: Hash password and store in database
    // TODO: Send verification email
    // TODO: Create auth session/token

    console.log('[v0] New signup:', { businessName, email, whatsappNumber })

    return NextResponse.json(
      { message: 'Account created successfully', userId: 'user_' + Date.now() },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
