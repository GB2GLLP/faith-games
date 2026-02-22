// Stripe price configuration
// Replace these with your actual Stripe price IDs after setting up products in the Stripe Dashboard

export const STRIPE_PRICES = {
  INDIVIDUAL_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_MONTHLY || 'price_individual_monthly',
  INDIVIDUAL_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_ANNUAL || 'price_individual_annual',
  CHURCH_PER_MEMBER: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHURCH_PER_MEMBER || 'price_church_per_member',
} as const

export const STRIPE_PLANS = [
  {
    id: 'individual_monthly',
    name: 'Monthly',
    price: '$0.99/mo',
    priceId: STRIPE_PRICES.INDIVIDUAL_MONTHLY,
    features: [
      'All 4 games unlocked',
      'Premium content packs',
      'Personal stats & streaks',
      'Up to 8 players per game',
    ],
  },
  {
    id: 'individual_annual',
    name: 'Annual',
    price: '$12/yr',
    priceId: STRIPE_PRICES.INDIVIDUAL_ANNUAL,
    badge: 'Save $0.88',
    features: [
      'Everything in Monthly',
      'Works out to $1/month',
      'Early access to new content',
    ],
  },
  {
    id: 'church_per_member',
    name: 'Church',
    price: '$0.99/member/mo',
    priceId: STRIPE_PRICES.CHURCH_PER_MEMBER,
    features: [
      'Everything in Individual for all members',
      'Members join with your church code',
      'Only pay for active members',
      'Church leaderboards & admin dashboard',
      'Up to 12 players per game',
    ],
  },
] as const
