import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('[v0] WhatsApp Webhook received:', body)

    // TODO: Validate webhook signature
    // TODO: Extract message and sender info
    // TODO: Call AI chat API
    // TODO: Send response back to WhatsApp
    // TODO: Log conversation to database
    // TODO: Trigger notifications for owner

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('WhatsApp Webhook Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN || 'verify_token_demo'
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === verify_token) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ status: 'forbidden' }, { status: 403 })
}
