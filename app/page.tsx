'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, TrendingUp, BarChart3, Zap, CheckCircle, ArrowRight, Smartphone, Lock, Bolt, Sparkles } from 'lucide-react'
import { Hero3DBackground } from '@/components/hero-3d-background'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center animate-rotate-3d">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Business Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-accent transition">
              Sign In
            </Link>
            <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden perspective-1000">
        <Suspense fallback={null}>
          <Hero3DBackground />
        </Suspense>
        
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 transform-3d">
          <div className="inline-flex items-center gap-2 mb-6 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2 animate-slide-in-3d">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-secondary">Powered by Advanced AI Technology</span>
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent leading-tight animate-text-reveal animate-glow-pulse text-3d">
            AI-Powered Business Assistant for Every Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed animate-text-reveal" style={{ animationDelay: '0.3s', opacity: 0 }}>
            Connect WhatsApp, Instagram, Telegram, Facebook & Messenger. Automate customer support, manage orders, and capture leads with advanced OpenAI ChatGPT technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-3d" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg h-12 hover:scale-105 transition-transform duration-300">
              <Link href="/signup">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-12 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:scale-105 transition-transform duration-300">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 animate-text-reveal text-3d">Advanced AI Assistant Features</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-text-reveal" style={{ animationDelay: '0.2s', opacity: 0 }}>Everything you need to automate your business and delight your customers</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {[
              { icon: Smartphone, title: 'Multi-Platform', desc: 'Connect WhatsApp, Instagram, Telegram, Facebook, and Messenger with individual API keys' },
              { icon: Zap, title: 'AI-Powered Responses', desc: 'Advanced OpenAI ChatGPT technology for intelligent, natural customer interactions' },
              { icon: TrendingUp, title: 'Order Management', desc: 'Customers create orders through chat, AI assists, and owner gets notified via WhatsApp' },
              { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track conversations, customer engagement, and sales with comprehensive dashboards' },
              { icon: Lock, title: 'Secure & Fast', desc: 'Enterprise-grade security with lightning-fast AI response times' },
              { icon: Bolt, title: 'Automated Messaging', desc: '24/7 automated replies with intelligent escalation to human agents' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 group animate-slide-in-3d transform-3d hover:scale-105"
                  style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all animate-scale-3d">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-text-reveal text-3d">Connect Every Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 perspective-1000">
            {['WhatsApp', 'Instagram', 'Telegram', 'Facebook', 'Messenger'].map((platform, idx) => (
              <div 
                key={platform} 
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 group cursor-pointer animate-slide-in-3d transform-3d hover:scale-110"
                style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 mx-auto mb-3 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/30 transition-all animate-scale-3d">
                  <Smartphone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">{platform}</h3>
                <p className="text-sm text-muted-foreground mt-2">API Key Configuration</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-text-reveal text-3d">Simple Pricing</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg animate-text-reveal" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Scale from startup to enterprise - All prices in BDT
          </p>
          <div className="grid md:grid-cols-3 gap-8 perspective-1000">
            {[
              { name: 'Starter', price: '৳4,999/mo', features: ['2 Platforms', '1000 Messages/mo', 'Basic AI', 'Email Support'] },
              { name: 'Pro', price: '৳14,999/mo', features: ['All 5 Platforms', '100K Messages/mo', 'Advanced AI', 'Priority Support', 'Analytics', 'Order Management'], popular: true },
              { name: 'Enterprise', price: 'Custom Quote', features: ['Unlimited', 'Custom Features', 'Dedicated Support', 'SLA Guarantee'] }
            ].map((plan, idx) => (
              <div 
                key={plan.name} 
                className={`relative rounded-2xl p-8 transition-all duration-500 animate-slide-in-3d transform-3d hover:scale-105 ${plan.popular ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-accent md:scale-105 shadow-lg shadow-accent/10' : 'bg-card border border-border hover:border-accent/30'}`}
                style={{ animationDelay: `${idx * 0.15}s`, opacity: 0 }}
              >
                {plan.popular && <div className="absolute top-6 right-6 bg-gradient-to-r from-accent to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 animate-glow-pulse">{plan.price}</div>
                <p className="text-sm text-muted-foreground mb-8">Billed monthly</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full text-base h-11 font-semibold transition-transform duration-300 hover:scale-105 ${plan.popular ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white' : 'border-2 border-primary/30 hover:bg-primary/10'}`} variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center animate-text-reveal" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <p className="text-muted-foreground">🇧🇩 Special pricing for Bangladesh businesses • 7-day free trial • No credit card required</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-accent/20 rounded-3xl p-12 relative overflow-hidden animate-scale-3d transform-3d">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow-pulse text-3d">Ready to Automate Your Business?</h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Get started in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg h-12 hover:scale-110 transition-transform duration-300">
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg h-12 border-2 border-primary/30 hover:bg-primary/5 hover:scale-110 transition-transform duration-300">
                <Link href="#contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold">AI Business Assistant</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering businesses with AI automation across all platforms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-accent transition">Features</Link></li>
                <li><Link href="#" className="hover:text-accent transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-accent transition">Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-accent transition">About</Link></li>
                <li><Link href="#" className="hover:text-accent transition">Contact</Link></li>
                <li><Link href="#" className="hover:text-accent transition">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-accent transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-accent transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AI Business Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
