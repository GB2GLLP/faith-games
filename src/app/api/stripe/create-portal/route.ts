import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Implement Stripe customer portal
  // 1. Get user's stripe_customer_id from subscriptions table
  // 2. Create portal session
  // 3. Return portal URL
  //
  // Example:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  // const portalSession = await stripe.billingPortal.sessions.create({
  //   customer: stripeCustomerId,
  //   return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
  // })
  // return NextResponse.json({ url: portalSession.url })

  return NextResponse.json(
    { error: 'Stripe not configured. See README for setup instructions.' },
    { status: 501 }
  )
}
