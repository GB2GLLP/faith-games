'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { STRIPE_PLANS } from '@/lib/stripe/config'

export default function SubscriptionPage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState<string | null>(null)
  const [annual, setAnnual] = useState(false)

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Stripe is not configured yet. See README for setup instructions.')
      }
    } catch {
      alert('Something went wrong')
    }
    setLoading(null)
  }

  const filteredPlans = STRIPE_PLANS.filter((p) =>
    annual ? p.id.includes('annual') : p.id.includes('monthly')
  )

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-gold">Upgrade Your Experience</h1>
        <p className="text-cream/60 mt-2">Unlock premium content, more players, and church features</p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="bg-navy-light rounded-lg p-1 inline-flex">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !annual ? 'bg-gold text-navy' : 'text-cream/60'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              annual ? 'bg-gold text-navy' : 'text-cream/60'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => {
          const isCurrent = (
            (user?.subscription_tier === 'individual' && plan.id.includes('individual')) ||
            (user?.subscription_tier === 'church' && plan.id.includes('church'))
          )
          return (
            <Card key={plan.id} className={isCurrent ? 'border-gold/40' : ''}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {'badge' in plan && plan.badge && <Badge variant="gold">{plan.badge}</Badge>}
                </div>
                <p className="text-2xl font-bold text-gold mt-2">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-cream/70">
                      <span className="text-gold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrent ? (
                  <Button variant="secondary" className="w-full" disabled>Current Plan</Button>
                ) : (
                  <Button
                    className="w-full"
                    loading={loading === plan.priceId}
                    onClick={() => handleSubscribe(plan.priceId)}
                  >
                    Subscribe
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Free tier */}
      <Card className="text-center">
        <CardContent className="py-6">
          <p className="text-cream/40 text-sm">Currently on the <strong className="text-cream">Free</strong> plan</p>
          <p className="text-cream/30 text-xs mt-1">Free includes basic content, up to 4 players per game</p>
        </CardContent>
      </Card>
    </div>
  )
}
