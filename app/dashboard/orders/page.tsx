'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search, Filter, Eye, Trash2, MoreVertical, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface Order {
  id: string
  number: number
  customer: string
  platform: string
  items: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
  phone: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord_1',
      number: 1001,
      customer: 'John Doe',
      platform: 'WhatsApp',
      items: '2x Product A, 1x Product B',
      total: 250,
      status: 'pending',
      date: '2024-01-15 14:32',
      phone: '+1234567890'
    },
    {
      id: 'ord_2',
      number: 1002,
      customer: 'Sarah Smith',
      platform: 'Instagram',
      items: '3x Service B',
      total: 450,
      status: 'processing',
      date: '2024-01-15 12:15',
      phone: '+0987654321'
    },
    {
      id: 'ord_3',
      number: 1003,
      customer: 'Mike Johnson',
      platform: 'Telegram',
      items: '1x Premium Package',
      total: 1200,
      status: 'completed',
      date: '2024-01-14 09:45',
      phone: '+1122334455'
    },
    {
      id: 'ord_4',
      number: 1004,
      customer: 'Emma Wilson',
      platform: 'Facebook',
      items: '5x Product C',
      total: 175,
      status: 'completed',
      date: '2024-01-14 08:20',
      phone: '+5544332211'
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.number.toString().includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-600 border-blue-500/30'
      case 'completed': return 'bg-green-500/20 text-green-600 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-600 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle2 className="w-4 h-4" />
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
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage customer orders and track delivery status</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">{orders.filter(o => o.status === 'pending').length}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{orders.filter(o => o.status === 'processing').length}</div>
                <p className="text-xs text-muted-foreground">Processing</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">${orders.reduce((sum, o) => sum + o.total, 0)}</div>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer or order #..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded border border-border bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Order</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Platform</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                        <td className="px-6 py-4 text-sm font-medium">#{order.number}</td>
                        <td className="px-6 py-4 text-sm">{order.customer}</td>
                        <td className="px-6 py-4 text-sm">{order.platform}</td>
                        <td className="px-6 py-4 text-sm font-semibold">${order.total}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <Card className="p-6 h-fit sticky top-24">
              <h3 className="text-lg font-bold mb-6">Order Details</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="text-lg font-semibold">#{selectedOrder.number}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Platform</p>
                  <p className="font-medium">{selectedOrder.platform}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Items</p>
                  <p className="text-sm bg-muted/30 p-3 rounded">{selectedOrder.items}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-medium">${selectedOrder.total * 0.9}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm">Tax</span>
                    <span className="font-medium">${(selectedOrder.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <select
                    value={selectedOrder.status}
                    className={`w-full px-3 py-2 rounded border ${getStatusColor(selectedOrder.status)} font-medium`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">Send Status Update via WhatsApp</Button>
                  <Button variant="outline" className="w-full">Send Invoice</Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">Cancel Order</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
