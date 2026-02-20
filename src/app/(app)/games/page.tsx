'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ROUTES } from '@/lib/constants'

const games = [
  {
    title: 'Bible Story Charades',
    description: 'Act out Bible stories while your friends guess. Phone on forehead, tilt to score!',
    href: ROUTES.GAMES.CHARADES,
    icon: '🎭',
    color: 'from-purple-500/20 to-purple-900/20 border-purple-500/30',
    players: '2-12 players',
  },
  {
    title: 'What Bible Character Am I?',
    description: 'Teams compete to guess Bible characters. Progressive hints help you along!',
    href: ROUTES.GAMES.WHO_AM_I,
    icon: '🤔',
    color: 'from-blue-500/20 to-blue-900/20 border-blue-500/30',
    players: '4-12 players (teams)',
  },
  {
    title: 'Guess The Verse',
    description: 'Watch a verse reveal word by word. Grab the phone first to guess the reference!',
    href: ROUTES.GAMES.GUESS_VERSE,
    icon: '📖',
    color: 'from-green-500/20 to-green-900/20 border-green-500/30',
    players: '2-8 players',
  },
  {
    title: 'Bible Trivia',
    description: 'Race to answer Bible trivia questions. Multiple choice, true/false, and more!',
    href: ROUTES.GAMES.TRIVIA,
    icon: '🧠',
    color: 'from-amber-500/20 to-amber-900/20 border-amber-500/30',
    players: '2-8 players',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function GamesPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-gold mb-2">Choose a Game</h1>
      <p className="text-cream/60 mb-8">Gather your friends around one device and start playing!</p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {games.map((g) => (
          <motion.div key={g.title} variants={item}>
            <Link href={g.href}>
              <div className={`p-6 rounded-xl bg-gradient-to-br ${g.color} border hover:scale-[1.02] transition-transform cursor-pointer`}>
                <div className="text-4xl mb-3">{g.icon}</div>
                <h2 className="font-display text-xl font-bold text-cream mb-1">{g.title}</h2>
                <p className="text-cream/50 text-sm mb-3">{g.description}</p>
                <span className="text-xs text-cream/30 bg-cream/5 px-2 py-1 rounded-full">
                  {g.players}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
