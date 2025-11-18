'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Plus, Trash2, Eye } from 'lucide-react'
import ChatWidget from '@/components/chat-widget'

export default function ChatbotSettingsPage() {
  const [personality, setPersonality] = useState('You are a helpful, friendly business assistant. You help customers with orders, questions, and support inquiries. Always be polite and professional.')
  const [systemPrompt, setSystemPrompt] = useState('Answer customer queries in a concise, helpful manner. If unsure, offer to connect with a human agent.')
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Product Catalog.pdf', size: '2.4 MB', date: '2024-01-15' },
    { id: 2, name: 'FAQ.txt', size: '156 KB', date: '2024-01-14' }
  ])
  const [autoResponses, setAutoResponses] = useState([
    { id: 1, trigger: 'hello', response: 'Hi there! How can I help you today?' },
    { id: 2, trigger: 'support', response: 'You can reach our support team at support@example.com or reply here.' }
  ])

  const [newTrigger, setNewTrigger] = useState('')
  const [newResponse, setNewResponse] = useState('')

  const addAutoResponse = () => {
    if (newTrigger.trim() && newResponse.trim()) {
      setAutoResponses([...autoResponses, {
        id: Math.max(...autoResponses.map(r => r.id), 0) + 1,
        trigger: newTrigger,
        response: newResponse
      }])
      setNewTrigger('')
      setNewResponse('')
    }
  }

  const deleteAutoResponse = (id: number) => {
    setAutoResponses(autoResponses.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">AI Chatbot Settings</h1>
          <p className="text-muted-foreground mt-2">Configure your AI assistant personality and knowledge base</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* AI Personality */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">AI Personality & Behavior</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">System Personality</label>
              <p className="text-sm text-muted-foreground mb-3">Define how your AI should behave and communicate with customers</p>
              <textarea
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Describe your ideal AI assistant personality..."
                className="w-full p-4 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-28 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Response Guidelines</label>
              <p className="text-sm text-muted-foreground mb-3">Instructions for handling specific types of queries</p>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Provide guidelines for AI responses..."
                className="w-full p-4 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-28 resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Response Temperature</label>
                <select className="w-full px-3 py-2 rounded border border-border bg-background">
                  <option>Conservative (0.3)</option>
                  <option selected>Balanced (0.7)</option>
                  <option>Creative (1.0)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Response Length</label>
                <Input type="number" value="500" placeholder="characters" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select className="w-full px-3 py-2 rounded border border-border bg-background">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                  <option>Bangla</option>
                </select>
              </div>
            </div>

            <Button>Save Configuration</Button>
          </div>
        </Card>

        {/* Knowledge Base */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Knowledge Base</h2>
          
          <p className="text-muted-foreground mb-6">Upload documents and information that your AI will use to answer customer questions</p>

          <div className="mb-8">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent/50 transition cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-2">Drag documents here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports PDF, TXT, DOCX, and images</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Uploaded Documents</h3>
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.size} • Added {doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Automated Responses */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Automated Responses</h2>
          
          <p className="text-muted-foreground mb-6">Create quick responses for common customer messages</p>

          <div className="bg-muted/30 p-6 rounded-lg mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Trigger Keyword</label>
              <Input
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                placeholder="e.g., 'shipping', 'return', 'hours'"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Response Message</label>
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="e.g., 'We offer free shipping on orders over $50...'"
                className="w-full p-3 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-20 resize-none"
              />
            </div>
            <Button onClick={addAutoResponse}><Plus className="w-4 h-4 mr-2" />Add Response</Button>
          </div>

          <div className="space-y-3">
            {autoResponses.map((resp) => (
              <div key={resp.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-accent">{resp.trigger}</p>
                    <p className="text-sm text-muted-foreground mt-2">{resp.response}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAutoResponse(resp.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Testing */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Test Your Chatbot</h2>
          
          <p className="text-muted-foreground mb-4">Chat with your AI assistant below. Make sure your OpenAI API key is configured in Settings.</p>
          
          <ChatWidget />
        </Card>
      </div>
    </div>
  )
}
