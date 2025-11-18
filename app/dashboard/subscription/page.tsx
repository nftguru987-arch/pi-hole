'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, CheckCircle, Crown, Key, Calendar, CreditCard, AlertCircle, Check, Eye, EyeOff, Ticket, Sparkles } from 'lucide-react'

type PlanType = 'starter' | 'pro' | 'enterprise' | null

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>(null)
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [savedKey, setSavedKey] = useState(false)
  const [planExpiry, setPlanExpiry] = useState<Date | null>(null)
  const [isActivating, setIsActivating] = useState(false)
  const [redemptionKey, setRedemptionKey] = useState('')
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)

  useEffect(() => {
    const savedPlan = localStorage.getItem('subscription_plan') as PlanType
    const savedApiKey = localStorage.getItem('customer_openai_key')
    const savedExpiry = localStorage.getItem('plan_expiry')
    
    if (savedPlan) setCurrentPlan(savedPlan)
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedExpiry) setPlanExpiry(new Date(savedExpiry))
  }, [])

  const handleRedeemKey = async () => {
    if (!redemptionKey.trim()) {
      alert('Please enter a redemption key!')
      return
    }

    if (!apiKey.trim()) {
      alert('Please add your OpenAI API key first!')
      return
    }

    setIsRedeeming(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const validKeys = {
      'STARTER30': 'starter',
      'PRO30': 'pro',
      'ENTERPRISE30': 'enterprise',
      'START2025': 'starter',
      'PRO2025': 'pro',
      'ENT2025': 'enterprise'
    }
    
    const planType = validKeys[redemptionKey.toUpperCase() as keyof typeof validKeys]
    
    if (planType) {
      const expiry = new Date()
      expiry.setDate(expiry.getDate() + 30)
      
      localStorage.setItem('subscription_plan', planType)
      localStorage.setItem('plan_expiry', expiry.toISOString())
      localStorage.setItem('plan_active', 'true')
      localStorage.setItem('redemption_key', redemptionKey)
      
      setCurrentPlan(planType as PlanType)
      setPlanExpiry(expiry)
      setRedemptionSuccess(true)
      setRedemptionKey('')
      
      setTimeout(() => {
        setRedemptionSuccess(false)
      }, 5000)
    } else {
      alert('Invalid redemption key. Please check and try again.')
    }
    
    setIsRedeeming(false)
  }

  const handleActivatePlan = async (plan: PlanType) => {
    if (!apiKey.trim()) {
      alert('Please add your OpenAI API key first!')
      return
    }

    setIsActivating(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
    
    localStorage.setItem('subscription_plan', plan || '')
    localStorage.setItem('plan_expiry', expiry.toISOString())
    localStorage.setItem('plan_active', 'true')
    
    setCurrentPlan(plan)
    setPlanExpiry(expiry)
    setIsActivating(false)
    
    alert(`${plan?.toUpperCase()} plan activated successfully! Valid until ${expiry.toLocaleDateString()}`)
  }

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      alert('Please enter a valid OpenAI API key')
      return
    }
    
    localStorage.setItem('customer_openai_key', apiKey)
    localStorage.setItem('openai_api_key', apiKey)
    setSavedKey(true)
    setTimeout(() => setSavedKey(false), 3000)
  }

  const plans = [
    {
      id: 'starter' as PlanType,
      name: 'Starter',
      price: '৳4,999',
      period: '/month',
      features: [
        '2 Platforms',
        '1,000 Messages/month',
        'Basic AI Responses',
        'Email Support',
        'Basic Analytics'
      ]
    },
    {
      id: 'pro' as PlanType,
      name: 'Pro',
      price: '৳14,999',
      period: '/month',
      popular: true,
      features: [
        'All 5 Platforms',
        '100,000 Messages/month',
        'Advanced AI Responses',
        'Priority Support',
        'Full Analytics Dashboard',
        'Order Management',
        'Custom AI Training'
      ]
    },
    {
      id: 'enterprise' as PlanType,
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited Platforms',
        'Unlimited Messages',
        'Custom AI Models',
        'Dedicated Support',
        'SLA Guarantee',
        'Custom Integrations',
        'White Label Option'
      ]
    }
  ]

  const daysRemaining = planExpiry ? Math.ceil((planExpiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Subscription & API Keys</h1>
          <p className="text-muted-foreground mt-2">Manage your plan and configure your OpenAI API key</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {currentPlan && (
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-accent/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold capitalize">{currentPlan} Plan Active</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {daysRemaining} days remaining • Expires {planExpiry?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage Billing
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Redeem Subscription Key</h2>
              <p className="text-muted-foreground text-sm">Have a redemption key? Activate your monthly plan instantly!</p>
            </div>
          </div>

          {redemptionSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-600">
                <p className="font-medium mb-1">Plan Activated Successfully! 🎉</p>
                <p className="text-xs">Your {currentPlan} plan is now active for 30 days. Enjoy all premium features!</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-600">
                <p className="font-medium mb-2">How to get a redemption key?</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Purchase a subscription key from our sales team</li>
                  <li>Promotional keys from marketing campaigns</li>
                  <li>Partner or reseller provided keys</li>
                  <li>Gift keys from existing customers</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Redemption Key</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={redemptionKey}
                  onChange={(e) => setRedemptionKey(e.target.value.toUpperCase())}
                  placeholder="STARTER30 or PRO30 or ENTERPRISE30"
                  className="flex-1 text-base font-mono"
                  disabled={isRedeeming || !apiKey.trim()}
                />
                <Button 
                  onClick={handleRedeemKey}
                  disabled={isRedeeming || !redemptionKey.trim() || !apiKey.trim()}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isRedeeming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Redeeming...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Redeem Key
                    </>
                  )}
                </Button>
              </div>
              {!apiKey.trim() && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Please add your OpenAI API key first to redeem
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">Enter your key and click Redeem to activate 30 days of service</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Demo Keys (For Testing)</h4>
              <div className="flex flex-wrap gap-2">
                {['STARTER30', 'PRO30', 'ENTERPRISE30'].map((key) => (
                  <button
                    key={key}
                    onClick={() => setRedemptionKey(key)}
                    className="px-3 py-1 bg-background border border-border rounded text-xs font-mono hover:border-accent hover:bg-accent/5 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your OpenAI API Key</h2>
              <p className="text-muted-foreground text-sm">Required to activate any plan and use AI features</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-600">
                <p className="font-medium mb-1">Why do I need my own API key?</p>
                <p className="text-xs">You use your own OpenAI account for full control, transparency, and cost management. Get your key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com/api-keys</a></p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">OpenAI API Key</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-4 py-2.5 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button onClick={handleSaveApiKey}>
                  {savedKey ? <Check className="w-4 h-4 mr-2" /> : null}
                  {savedKey ? 'Saved!' : 'Save Key'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Your key is stored locally and used only for your chatbot responses</p>
            </div>

            {savedKey && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-600">API key saved successfully! You can now activate a plan or redeem a key.</p>
              </div>
            )}
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-muted-foreground mb-8">Select a plan and activate with your API key</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-6 relative ${
                  plan.popular 
                    ? 'border-2 border-accent shadow-lg shadow-accent/10' 
                    : currentPlan === plan.id
                    ? 'border-2 border-primary'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-secondary text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                
                {currentPlan === plan.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Current Plan
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={currentPlan === plan.id ? 'outline' : plan.popular ? 'default' : 'outline'}
                  disabled={currentPlan === plan.id || isActivating || !apiKey.trim()}
                  onClick={() => handleActivatePlan(plan.id)}
                >
                  {isActivating ? 'Activating...' : currentPlan === plan.id ? 'Current Plan' : 'Activate Plan'}
                </Button>
                
                {!apiKey.trim() && currentPlan !== plan.id && (
                  <p className="text-xs text-center text-muted-foreground mt-2">Add API key first</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Payment Information</h3>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> Secure payment processing
            </p>
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> Cancel anytime, no hidden fees
            </p>
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> 7-day money-back guarantee
            </p>
            <p className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" /> Automatic monthly renewal
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
