// Stripe price configuration
// Replace these with your actual Stripe price IDs after setting up products in the Stripe Dashboard

export const STRIPE_PRICES = {
  INDIVIDUAL_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_MONTHLY || 'price_individual_monthly',
  INDIVIDUAL_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_ANNUAL || 'price_individual_annual',
  CHURCH_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHURCH_MONTHLY || 'price_church_monthly',
  CHURCH_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHURCH_ANNUAL || 'price_church_annual',
} as const

export const STRIPE_PLANS = [
  {
    id: 'individual_monthly',
    name: 'Individual Monthly',
    price: '$4.99/mo',
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
    name: 'Individual Annual',
    price: '$39.99/yr',
    priceId: STRIPE_PRICES.INDIVIDUAL_ANNUAL,
    badge: 'Save 33%',
    features: [
      'Everything in Monthly',
      '2 months free',
      'Early access to new content',
    ],
  },
  {
    id: 'church_monthly',
    name: 'Church Monthly',
    price: '$19.99/mo',
    priceId: STRIPE_PRICES.CHURCH_MONTHLY,
    features: [
      'Everything in Individual',
      'Up to 50 church members',
      'Church leaderboards',
      'Admin dashboard',
      'Up to 12 players per game',
    ],
  },
  {
    id: 'church_annual',
    name: 'Church Annual',
    price: '$179.99/yr',
    priceId: STRIPE_PRICES.CHURCH_ANNUAL,
    badge: 'Save 25%',
    features: [
      'Everything in Church Monthly',
      '3 months free',
      'Priority support',
    ],
  },
] as const
