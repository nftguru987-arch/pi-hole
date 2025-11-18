'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Settings, BarChart3, Smartphone, Send, LogOut, Plus, Crown } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const platformCards = [
    { name: 'WhatsApp', icon: '💬', status: 'connected', apiKey: 'wh_***' },
    { name: 'Instagram', icon: '📷', status: 'pending', apiKey: 'ig_***' },
    { name: 'Telegram', icon: '✈️', status: 'connected', apiKey: 'tg_***' },
    { name: 'Facebook', icon: '👍', status: 'pending', apiKey: 'fb_***' },
    { name: 'Messenger', icon: '💬', status: 'connected', apiKey: 'ms_***' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-accent" />
            <span className="font-bold">AI Business Assistant</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-primary/10 to-accent/10 border-accent/30 hover:border-accent/60">
              <Link href="/dashboard/subscription" className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-accent" />
                <span className="hidden sm:inline">Subscription</span>
              </Link>
            </Button>
            <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground transition">
              <Settings className="w-5 h-5" />
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/logout">
                <LogOut className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'overview' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'platforms' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'chatbot' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Chatbot
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'orders' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-accent/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Activate Your Plan</h3>
                    <p className="text-sm text-muted-foreground">Add your OpenAI API key and choose a monthly plan to get started</p>
                  </div>
                </div>
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Link href="/dashboard/subscription">
                    View Plans <Crown className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="text-sm text-muted-foreground mb-2">Messages Today</div>
                <div className="text-3xl font-bold">1,234</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-muted-foreground mb-2">Active Conversations</div>
                <div className="text-3xl font-bold">47</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-muted-foreground mb-2">Orders Received</div>
                <div className="text-3xl font-bold">12</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-muted-foreground mb-2">Response Time</div>
                <div className="text-3xl font-bold text-accent">0.2s</div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Connected Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {platformCards.map((platform) => (
                  <div key={platform.name} className="p-4 bg-muted/30 rounded-lg text-center">
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="font-medium text-sm">{platform.name}</div>
                    <div className={`text-xs mt-2 ${platform.status === 'connected' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {platform.status === 'connected' ? '✓ Connected' : 'Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Platforms Tab */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Platform Integrations</h2>
              <Button asChild>
                <Link href="/dashboard/integrations/add">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Platform
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {platformCards.map((platform) => (
                <Card key={platform.name} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <span className="text-2xl">{platform.icon}</span>
                        {platform.name}
                      </h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${platform.status === 'connected' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {platform.status === 'connected' ? 'Connected' : 'Setup Required'}
                    </span>
                  </div>
                  <div className="bg-muted/30 p-3 rounded mb-4 text-sm font-mono text-muted-foreground break-all">
                    {platform.apiKey}
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    {platform.status === 'connected' ? 'Update' : 'Configure'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chatbot Tab */}
        {activeTab === 'chatbot' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">AI Chatbot Settings</h2>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Chatbot Personality</h3>
              <textarea
                placeholder="Define how your chatbot should respond to customers. E.g., 'You are a friendly restaurant assistant...'"
                className="w-full p-3 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-32"
              />
              <Button className="mt-4">Save Configuration</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Knowledge Base</h3>
              <p className="text-muted-foreground mb-4">Upload business information, FAQs, and product details for your AI assistant</p>
              <Button variant="outline">Upload Documents</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Automated Responses</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded flex items-center justify-between">
                  <span>Greeting Message</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="p-3 bg-muted/30 rounded flex items-center justify-between">
                  <span>Business Hours Auto-reply</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Order Management</h2>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="p-4 border border-border rounded flex items-center justify-between hover:bg-muted/30 transition">
                    <div>
                      <div className="font-medium">Order #{1000 + order}</div>
                      <div className="text-sm text-muted-foreground">Customer: John Doe</div>
                      <div className="text-sm text-muted-foreground">Platform: WhatsApp</div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span>Send WhatsApp notification to owner when order received</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span>Notify owner on high-value orders (above $100)</span>
                </label>
              </div>
              <Button className="mt-6">Save Settings</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
