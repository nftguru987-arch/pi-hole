'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react'

interface PlatformIntegration {
  id: string
  name: string
  icon: string
  status: 'connected' | 'pending' | 'error'
  apiKey?: string
  setupSteps?: string[]
}

export default function IntegrationsPage() {
  const [platforms, setPlatforms] = useState<PlatformIntegration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      status: 'connected',
      apiKey: 'wh_prod_1234567890abcdef'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      status: 'pending',
      setupSteps: ['Create Business Account', 'Get App ID & Token', 'Configure Webhook']
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      status: 'connected',
      apiKey: 'tg_bot_token_12345'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👍',
      status: 'error',
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: '💬',
      status: 'pending',
    }
  ])

  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleConnect = (platformId: string) => {
    const updatedPlatforms = platforms.map(p =>
      p.id === platformId ? { ...p, status: 'pending' as const } : p
    )
    setPlatforms(updatedPlatforms)
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
          <h1 className="text-3xl font-bold">Platform Integrations</h1>
          <p className="text-muted-foreground mt-2">Connect your social media platforms and messaging services</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Platform Cards */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Available Platforms</h2>
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className={`p-6 cursor-pointer transition border-2 ${
                  selectedPlatform === platform.id ? 'border-accent' : 'border-border hover:border-accent/50'
                }`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{platform.icon}</span>
                    <div>
                      <h3 className="font-semibold">{platform.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {platform.status === 'connected' && 'Connected'}
                        {platform.status === 'pending' && 'Setup Required'}
                        {platform.status === 'error' && 'Connection Error'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6">
                    {platform.status === 'connected' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {platform.status === 'pending' && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                    {platform.status === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Configuration Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Configuration</h2>
            {selectedPlatform ? (
              <div className="space-y-6">
                {platforms.find(p => p.id === selectedPlatform) && (
                  <>
                    {selectedPlatform === 'whatsapp' && (
                      <Card className="p-6 space-y-6">
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="text-2xl">💬</span>
                            WhatsApp Configuration
                          </h3>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Connected & Active
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">API Key</label>
                          <div className="flex gap-2">
                            <input
                              type="password"
                              value="wh_prod_1234567890abcdef"
                              readOnly
                              className="flex-1 px-3 py-2 rounded border border-border bg-muted"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('wh_prod_1234567890abcdef', 'whatsapp')}
                            >
                              {copiedKey === 'whatsapp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Webhook URL</label>
                          <input
                            type="text"
                            value="https://yourdomain.com/api/webhooks/whatsapp"
                            readOnly
                            className="w-full px-3 py-2 rounded border border-border bg-muted text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium mb-2">Status</label>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Messages Sending</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Webhook Receiving</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> AI Responding</div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">Disconnect</Button>
                      </Card>
                    )}

                    {selectedPlatform === 'telegram' && (
                      <Card className="p-6 space-y-6">
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="text-2xl">✈️</span>
                            Telegram Configuration
                          </h3>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Connected & Active
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Bot Token</label>
                          <div className="flex gap-2">
                            <input
                              type="password"
                              value="tg_bot_token_12345"
                              readOnly
                              className="flex-1 px-3 py-2 rounded border border-border bg-muted"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('tg_bot_token_12345', 'telegram')}
                            >
                              {copiedKey === 'telegram' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">Disconnect</Button>
                      </Card>
                    )}

                    {(selectedPlatform === 'instagram' || selectedPlatform === 'facebook' || selectedPlatform === 'messenger') && (
                      <Card className="p-6 space-y-6">
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="text-2xl">{platforms.find(p => p.id === selectedPlatform)?.icon}</span>
                            {platforms.find(p => p.id === selectedPlatform)?.name} Configuration
                          </h3>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                          <p className="text-sm text-yellow-600 font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Setup Required - Follow steps below
                          </p>
                        </div>

                        <div className="space-y-4">
                          {[
                            'Create a Business Account on ' + platforms.find(p => p.id === selectedPlatform)?.name,
                            'Generate API Keys and Access Tokens',
                            'Configure Webhook URL in your dashboard',
                            'Verify webhook by clicking "Test Connection"',
                            'Enable message forwarding'
                          ].map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <span className="text-sm font-semibold text-accent">{idx + 1}</span>
                              </div>
                              <p className="text-sm pt-1">{step}</p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">API Key</label>
                          <Input placeholder="Paste your API key here" />
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1">Test Connection</Button>
                          <Button variant="outline" className="flex-1">Save</Button>
                        </div>
                      </Card>
                    )}
                  </>
                )}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Select a platform to configure</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
