'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Trash2, Edit2, ToggleLeft as Toggle2, Bell, Clock, MessageSquare } from 'lucide-react'

interface Automation {
  id: string
  name: string
  trigger: string
  action: string
  enabled: boolean
  platformTarget: string
  lastRun?: string
}

interface NotificationRule {
  id: string
  event: string
  channels: string[]
  enabled: boolean
  whatsappNumber?: string
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: 'auto_1',
      name: 'Welcome Message',
      trigger: 'New conversation started',
      action: 'Send greeting message',
      enabled: true,
      platformTarget: 'All Platforms',
      lastRun: '5 minutes ago'
    },
    {
      id: 'auto_2',
      name: 'Order Confirmation',
      trigger: 'Order received from AI',
      action: 'Send order confirmation + receipt',
      enabled: true,
      platformTarget: 'WhatsApp',
      lastRun: '2 minutes ago'
    },
    {
      id: 'auto_3',
      name: 'Business Hours Reply',
      trigger: 'Message outside business hours',
      action: 'Auto-reply with next open time',
      enabled: false,
      platformTarget: 'All Platforms'
    },
    {
      id: 'auto_4',
      name: 'Follow-up Message',
      trigger: 'No response for 24 hours',
      action: 'Send follow-up question',
      enabled: true,
      platformTarget: 'Instagram, Facebook'
    }
  ])

  const [notifications, setNotifications] = useState<NotificationRule[]>([
    {
      id: 'notif_1',
      event: 'New Order Received',
      channels: ['WhatsApp', 'Email'],
      enabled: true,
      whatsappNumber: '+1234567890'
    },
    {
      id: 'notif_2',
      event: 'High Priority Support Ticket',
      channels: ['WhatsApp'],
      enabled: true,
      whatsappNumber: '+1234567890'
    },
    {
      id: 'notif_3',
      event: 'Daily Summary Report',
      channels: ['Email', 'Dashboard'],
      enabled: false
    },
    {
      id: 'notif_4',
      event: 'AI Escalation Required',
      channels: ['WhatsApp', 'Email'],
      enabled: true,
      whatsappNumber: '+1234567890'
    }
  ])

  const [activeTab, setActiveTab] = useState<'automations' | 'notifications'>('automations')
  const [showAddAutomation, setShowAddAutomation] = useState(false)
  const [showAddNotification, setShowAddNotification] = useState(false)

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  const deleteAutomation = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id))
  }

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
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
          <h1 className="text-3xl font-bold">Automations & Notifications</h1>
          <p className="text-muted-foreground mt-2">Set up automated workflows and notification rules</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('automations')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'automations' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Automated Messages
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-4 px-4 font-medium text-sm transition ${
              activeTab === 'notifications' ? 'text-accent border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Automations Tab */}
        {activeTab === 'automations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Automated Messaging Rules</h2>
              <Button onClick={() => setShowAddAutomation(!showAddAutomation)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Automation
              </Button>
            </div>

            {showAddAutomation && (
              <Card className="p-6 border-accent">
                <h3 className="font-semibold mb-6">Create New Automation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Automation Name</label>
                    <Input placeholder="e.g., Welcome Message" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Trigger Event</label>
                      <select className="w-full px-3 py-2 rounded border border-border bg-background">
                        <option>New conversation started</option>
                        <option>Order received</option>
                        <option>No response for X hours</option>
                        <option>Keyword mentioned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Apply to Platforms</label>
                      <select className="w-full px-3 py-2 rounded border border-border bg-background">
                        <option>All Platforms</option>
                        <option>WhatsApp Only</option>
                        <option>Instagram & Facebook</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Response Message</label>
                    <textarea placeholder="Compose your automated message..." className="w-full p-3 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-24 resize-none" />
                  </div>
                  <div className="flex gap-2">
                    <Button>Create Automation</Button>
                    <Button variant="outline" onClick={() => setShowAddAutomation(false)}>Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {automations.map((automation) => (
                <Card key={automation.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="w-5 h-5 text-accent" />
                        <h3 className="font-semibold text-lg">{automation.name}</h3>
                        {automation.lastRun && (
                          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Last run: {automation.lastRun}</span>
                        )}
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground mt-3">
                        <p><Clock className="w-4 h-4 inline mr-2" />Trigger: {automation.trigger}</p>
                        <p><Bell className="w-4 h-4 inline mr-2" />Action: {automation.action}</p>
                        <p className="text-xs bg-muted/30 inline-block px-2 py-1 rounded">{automation.platformTarget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAutomation(automation.id)}
                        className={`p-2 rounded transition ${automation.enabled ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}
                      >
                        <Toggle2 className="w-5 h-5" />
                      </button>
                      <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4" /></Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAutomation(automation.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Notification Rules</h2>
              <Button onClick={() => setShowAddNotification(!showAddNotification)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Notification
              </Button>
            </div>

            {showAddNotification && (
              <Card className="p-6 border-accent">
                <h3 className="font-semibold mb-6">Create Notification Rule</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Notification Event</label>
                    <select className="w-full px-3 py-2 rounded border border-border bg-background">
                      <option>New Order Received</option>
                      <option>Support Ticket Created</option>
                      <option>AI Escalation Required</option>
                      <option>Daily Summary Report</option>
                      <option>Payment Received</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Notification Channels</label>
                    <div className="space-y-2">
                      {['WhatsApp', 'Email', 'SMS', 'Dashboard'].map((channel) => (
                        <label key={channel} className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 rounded" defaultChecked={channel === 'WhatsApp'} />
                          {channel}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Owner WhatsApp Number</label>
                    <Input placeholder="+1234567890" />
                  </div>
                  <div className="flex gap-2">
                    <Button>Create Rule</Button>
                    <Button variant="outline" onClick={() => setShowAddNotification(false)}>Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Bell className="w-5 h-5 text-accent" />
                        <h3 className="font-semibold text-lg">{notification.event}</h3>
                      </div>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {notification.channels.map((channel) => (
                          <span key={channel} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                            {channel}
                          </span>
                        ))}
                      </div>
                      {notification.whatsappNumber && (
                        <p className="text-sm text-muted-foreground">WhatsApp: {notification.whatsappNumber}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleNotification(notification.id)}
                        className={`p-2 rounded transition ${notification.enabled ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}
                      >
                        <Toggle2 className="w-5 h-5" />
                      </button>
                      <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4" /></Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-accent/5 border-accent">
              <h3 className="font-semibold mb-3">Test Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">Send a test notification to verify your settings</p>
              <div className="flex gap-2">
                <Button variant="outline">Test WhatsApp</Button>
                <Button variant="outline">Test Email</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
