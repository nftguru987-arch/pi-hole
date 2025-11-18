import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        { success: false, message: 'API key is required' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid API key. Please check and try again.',
          details: error.error?.message 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'API key is valid and working!',
        modelsAvailable: data.data?.length || 0
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] OpenAI Test Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error testing API key. Check your internet connection.' 
      },
      { status: 500 }
    )
  }
}
