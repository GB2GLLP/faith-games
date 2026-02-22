import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <Image
          src="/logo.png"
          alt="Faith Games"
          width={160}
          height={160}
          className="mb-6"
          priority
        />
        <h1 className="font-display text-5xl md:text-7xl font-bold text-gold mb-4">
          Faith Games
        </h1>
        <p className="text-cream/80 text-lg md:text-xl max-w-xl mb-8">
          Fun, faith-filled party games for church groups, families, and friends.
          Gather around one device and let the fun begin!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border border-gold/40 text-gold rounded-lg hover:bg-gold/10 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="px-6 py-16 bg-navy-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gold text-center mb-12">
            4 Amazing Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Bible Story Charades',
                desc: 'Put the phone on your forehead and act out Bible stories while your friends guess!',
                icon: '🎭',
              },
              {
                title: 'What Bible Character Am I?',
                desc: 'Teams compete to guess which Bible character is displayed on the phone. First to 7 wins!',
                icon: '🤔',
              },
              {
                title: 'Guess The Verse',
                desc: 'Watch as a Bible verse is revealed word by word. Grab the phone to guess it first!',
                icon: '📖',
              },
              {
                title: 'Bible Trivia',
                desc: 'Test your Bible knowledge with rapid-fire trivia. Multiple choice, true/false, and more!',
                icon: '🧠',
              },
            ].map((game) => (
              <div
                key={game.title}
                className="p-6 rounded-xl bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
              >
                <div className="text-4xl mb-3">{game.icon}</div>
                <h3 className="font-display text-xl font-bold text-cream mb-2">
                  {game.title}
                </h3>
                <p className="text-cream/60 text-sm">{game.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-bold text-gold mb-4">
          Ready to Play?
        </h2>
        <p className="text-cream/70 mb-8 max-w-md mx-auto">
          Create an account, invite your church group, and start playing in minutes.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-cream/10 text-center text-cream/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Faith Games. All rights reserved.</p>
      </footer>
    </div>
  )
}
