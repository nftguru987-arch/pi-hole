'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search, MessageSquare, Phone, Mail, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

interface SupportTicket {
  id: string
  ticketId: number
  customer: string
  platform: string
  subject: string
  message: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  date: string
  lastReply: string
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt_1',
      ticketId: 5001,
      customer: 'John Doe',
      platform: 'WhatsApp',
      subject: 'Issue with order delivery',
      message: 'I ordered 3 days ago but haven\'t received my package yet',
      status: 'open',
      priority: 'high',
      date: '2024-01-15 14:32',
      lastReply: 'Not yet replied'
    },
    {
      id: 'tkt_2',
      ticketId: 5002,
      customer: 'Sarah Smith',
      platform: 'Instagram DM',
      subject: 'Product quality concern',
      message: 'The product arrived with a defect',
      status: 'in-progress',
      priority: 'high',
      date: '2024-01-15 10:15',
      lastReply: '2024-01-15 11:30'
    },
    {
      id: 'tkt_3',
      ticketId: 5003,
      customer: 'Mike Johnson',
      platform: 'Telegram',
      subject: 'How to return an item?',
      message: 'Can I return the product within 30 days?',
      status: 'resolved',
      priority: 'low',
      date: '2024-01-14 09:45',
      lastReply: '2024-01-14 14:20'
    },
  ])

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTickets = tickets.filter(ticket =>
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketId.toString().includes(searchTerm)
  )

  const handleReply = () => {
    if (replyMessage.trim() && selectedTicket) {
      console.log('[v0] Reply sent:', { ticketId: selectedTicket.id, message: replyMessage })
      setReplyMessage('')
      // Show success message
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-600 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-600 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return <AlertCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      case 'resolved': return <CheckCircle2 className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-muted-foreground mt-2">Manage customer inquiries and support tickets</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tickets List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">{tickets.length}</div>
                <p className="text-xs text-muted-foreground">Total Tickets</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{tickets.filter(t => t.status === 'open').length}</div>
                <p className="text-xs text-muted-foreground">Open</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{tickets.filter(t => t.status === 'in-progress').length}</div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{tickets.filter(t => t.status === 'resolved').length}</div>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </Card>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or ticket #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`p-6 cursor-pointer transition border-2 ${
                    selectedTicket?.id === ticket.id ? 'border-accent' : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">#{ticket.ticketId}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">{ticket.platform}</span>
                      </div>
                      <p className="font-medium text-foreground">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1">{ticket.customer}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                      ticket.status === 'open' ? 'bg-red-500/20 text-red-600 border-red-500/30' :
                      ticket.status === 'in-progress' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                      'bg-green-500/20 text-green-600 border-green-500/30'
                    }`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.date}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Ticket Details */}
          {selectedTicket && (
            <Card className="p-6 h-fit sticky top-24">
              <h3 className="text-lg font-bold mb-6">Ticket Details</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground">Ticket ID</p>
                  <p className="text-lg font-semibold">#{selectedTicket.ticketId}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedTicket.customer}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Platform</p>
                  <p className="font-medium">{selectedTicket.platform}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Subject</p>
                  <p className="font-medium">{selectedTicket.subject}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Message</p>
                  <p className="text-sm bg-muted/30 p-3 rounded">{selectedTicket.message}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Priority</p>
                  <select
                    value={selectedTicket.priority}
                    className={`w-full px-3 py-2 rounded border font-medium ${getPriorityColor(selectedTicket.priority)}`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <select className="w-full px-3 py-2 rounded border border-border bg-background text-foreground">
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="w-full p-3 rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent h-24 resize-none"
                />

                <div className="space-y-2">
                  <Button className="w-full" onClick={handleReply}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
