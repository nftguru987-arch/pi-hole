import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationContext, platformId } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const openaiApiKey = request.headers.get('x-openai-key') || process.env.OPENAI_API_KEY
    
    if (!openaiApiKey) {
      console.error('[v0] No OpenAI API key found')
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please set up in settings.' },
        { status: 400 }
      )
    }

    console.log('[v0] Processing chat message:', { message, platformId })

    const systemPrompt = `You are a helpful, friendly business assistant. You help customers with orders, questions, and support inquiries. Always be polite and professional.`
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...(conversationContext || []),
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('[v0] OpenAI API Error:', errorData)
      return NextResponse.json(
        { error: 'Failed to process message with AI. ' + (errorData.error?.message || 'Try again later.') },
        { status: openaiResponse.status }
      )
    }

    const aiData = await openaiResponse.json()
    const aiResponse = aiData.choices[0]?.message?.content || 'Unable to generate response'

    return NextResponse.json(
      { 
        response: aiResponse,
        conversationId: 'conv_' + Date.now(),
        platform: platformId,
        model: 'gpt-3.5-turbo'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat. ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
