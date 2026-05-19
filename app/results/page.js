'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Save, Share2, RotateCcw } from 'lucide-react'
import { getRecommendations, calculateStackScore } from '@/lib/recommendations'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import LoadingScreen from '@/components/LoadingScreen'
import RecommendationCard from '@/components/RecommendationCard'

function ScoreRing({ value, label, delay }) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (value / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#0b0f0b" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#greenGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: delay + 0.2, duration: 1 }}
          />
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-emerald-400">
          {value}%
        </span>
      </div>
      <span className="text-xs text-neutral-400 mt-2 text-center">{label}</span>
    </motion.div>
  )
}

export default function ResultsPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [score, setScore] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('userPreferences')
    if (!raw) {
      router.push('/onboarding')
      return
    }
    const prefs = JSON.parse(raw)
    setPreferences(prefs)
    setRecommendations(getRecommendations(prefs))
    setScore(calculateStackScore(prefs))
  }, [router])

  if (!preferences || !recommendations || !score) {
    return <LoadingScreen message="Analyzing your fintech stack..." />
  }

  const cards = [
    recommendations.upi,
    recommendations.banking,
    recommendations.investment,
    recommendations.credit_card,
    recommendations.travel,
  ]

  return (
    <PageTransition className="min-h-screen px-4 py-8 md:px-6">
      <Navbar backLabel="Home →" backHref="/" />

      <div className="max-w-4xl mx-auto mt-28 md:mt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative text-center">
            <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">Stack Efficiency Score</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-display font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-4"
            >
              {score.overall}%
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-emerald-400/90 text-sm mb-10">
              <Sparkles className="w-4 h-4" />
              <span>Optimized for your lifestyle</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ScoreRing value={score.breakdown.savings} label="Savings" delay={0.3} />
              <ScoreRing value={score.breakdown.rewards} label="Rewards" delay={0.4} />
              <ScoreRing value={score.breakdown.simplicity} label="Simplicity" delay={0.5} />
              <ScoreRing value={score.breakdown.investment} label="Investment" delay={0.6} />
            </div>
            <p className="mt-8 text-neutral-500 text-sm max-w-md mx-auto">
              Based on your spending habits and priorities — AI-matched for maximum compatibility
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold">Your Personalized Fintech Stack</h2>
          <p className="text-neutral-400 mt-2">5 apps · curated for you</p>
        </motion.div>

        {cards.map((rec, i) => (
          <RecommendationCard key={rec.app} data={rec} index={i} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col md:flex-row gap-4 justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert('Stack saved! (Account sync coming soon)')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save My Stack
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const link = 'https://fintech-stack-optimizer.vercel.app/stack/' + Date.now()
              navigator.clipboard.writeText(link)
              alert('Share link copied to clipboard!')
            }}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Stack
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/onboarding')}
            className="px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
