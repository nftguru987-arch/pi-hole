'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, AlertCircle, Loader } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setLoading(true)
    setError(null)

    try {
      const storedApiKey = localStorage.getItem('openai_api_key')
      
      if (!storedApiKey) {
        setError('OpenAI API key not configured. Please set it up in Settings.')
        setLoading(false)
        return
      }

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openai-key': storedApiKey
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationContext: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          platformId: 'test'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to get response')
        setLoading(false)
        return
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('[v0] Chat error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-96 bg-background border border-border">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              No messages yet. Type something to get started!
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-accent text-primary rounded-tr-none'
                  : 'bg-accent/20 text-foreground rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="max-w-xs px-4 py-2 rounded-lg bg-accent/20 text-foreground rounded-tl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex gap-3 justify-start">
            <div className="max-w-xs px-4 py-2 rounded-lg bg-red-500/20 text-red-600 rounded-tl-none flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={loading || !inputValue.trim()}
          size="sm"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
