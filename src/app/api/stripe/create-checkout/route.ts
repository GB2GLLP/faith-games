import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { priceId } = body

  // TODO: Implement Stripe checkout session creation
  // 1. Get or create Stripe customer
  // 2. Create checkout session with priceId
  // 3. Return session URL
  //
  // Example implementation:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  // const session = await stripe.checkout.sessions.create({
  //   customer: stripeCustomerId,
  //   mode: 'subscription',
  //   line_items: [{ price: priceId, quantity: 1 }],
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?success=true`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
  // })
  // return NextResponse.json({ url: session.url })

  return NextResponse.json(
    { error: 'Stripe not configured. See README for setup instructions.' },
    { status: 501 }
  )
}
