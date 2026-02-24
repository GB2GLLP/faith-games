export const APP_NAME = 'Faith Games'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  GAMES: {
    CHARADES: '/games/charades',
    WHO_AM_I: '/games/who-am-i',
    GUESS_VERSE: '/games/guess-verse',
    TRIVIA: '/games/trivia',
  },
  STATS: '/stats',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  SUBSCRIPTION: '/subscription',
  CHURCH: {
    MEMBERS: '/church/members',
    ANALYTICS: '/church/analytics',
    SETTINGS: '/church/settings',
  },
  SUPER: {
    CHURCHES: '/super/churches',
    USERS: '/super/users',
    CONTENT: '/super/content',
    ANALYTICS: '/super/analytics',
  },
} as const

export const GAME_CONFIG = {
  CHARADES: {
    DEFAULT_TIMER: 60,
    MIN_PLAYERS: 2,
  },
  WHO_AM_I: {
    WIN_SCORE: 7,
    MIN_PLAYERS: 4,
    HINTS_PER_CHARACTER: 3,
  },
  GUESS_VERSE: {
    POINTS: { EARLY: 3, MID: 2, LATE: 1 },
    PENALTY: -1,
    WIN_SCORE: 7,
    MIN_PLAYERS: 2,
    REVEAL_INTERVAL_MS: 1500,
  },
  TRIVIA: {
    WIN_SCORE: 7,
    POINTS: { FIRST: 3, PASSED: 1 },
    PENALTY: -1,
    MIN_PLAYERS: 2,
  },
} as const

export const CHURCH_CODE_LENGTH = 8
export const CHURCH_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export const SUBSCRIPTION_PLANS = {
  INDIVIDUAL_MONTHLY: {
    name: 'Individual Monthly',
    price: 0.99,
    interval: 'month' as const,
  },
  INDIVIDUAL_ANNUAL: {
    name: 'Individual Annual',
    price: 12,
    interval: 'year' as const,
  },
  CHURCH_PER_MEMBER: {
    name: 'Church (per member)',
    pricePerMember: 0.99,
    interval: 'month' as const,
    description: 'Billed per active member using your church code',
  },
} as const

export const CATEGORIES = {
  CHARADES: ['Old Testament', 'New Testament', 'Miracles', 'Parables', 'Creation', 'Prophets'],
  CHARACTERS: ['Patriarchs', 'Kings', 'Prophets', 'New Testament', 'Women of the Bible', 'Judges'],
  VERSES: ['Salvation', 'Faith', 'Wisdom', 'Comfort', 'Praise', 'Commands', 'Prophecy', 'Love'],
  TRIVIA: ['Old Testament', 'New Testament', 'People', 'Geography', 'Numbers', 'Miracles', 'General Knowledge', 'Books of the Bible'],
} as const
