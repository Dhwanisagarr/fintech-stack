'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Save, 
  Share2, 
  RotateCcw, 
  TrendingUp, 
  Wallet, 
  Gift, 
  LineChart,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { getRecommendations, calculateStackScore } from '@/lib/recommendations'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import LoadingScreen from '@/components/LoadingScreen'
import RecommendationCard from '@/components/RecommendationCard'

// Premium animated score ring
function ScoreRing({ value, label, icon: Icon, delay, color = 'emerald' }) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (value / 100) * circumference
  
  const colorClasses = {
    emerald: { stroke: '#22c55e', bg: 'emerald-500/10', text: 'emerald-400' },
    green: { stroke: '#4ade80', bg: 'green-500/10', text: 'green-400' },
    teal: { stroke: '#14b8a6', bg: 'teal-500/10', text: 'teal-400' },
  }
  
  const colors = colorClasses[color] || colorClasses.emerald

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          {/* Background ring */}
          <circle 
            cx="40" 
            cy="40" 
            r="36" 
            fill="none" 
            stroke="rgba(34, 197, 94, 0.1)" 
            strokeWidth="5" 
          />
          {/* Animated progress ring */}
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: delay + 0.3, duration: 1.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Icon && <Icon className={`w-4 h-4 text-${colors.text} mb-1`} />}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
            className="text-2xl font-bold text-white"
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <span className="text-xs text-neutral-400 mt-3 font-medium text-center">{label}</span>
    </motion.div>
  )
}

// Category label mapping for better display
const CATEGORY_LABELS = {
  upi: 'UPI App',
  banking: 'Bank Account',
  investment: 'Investment',
  credit_card: 'Credit Card',
  travel: 'Travel Card',
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
    { ...recommendations.upi, categoryKey: 'upi' },
    { ...recommendations.banking, categoryKey: 'banking' },
    { ...recommendations.investment, categoryKey: 'investment' },
    { ...recommendations.credit_card, categoryKey: 'credit_card' },
    { ...recommendations.travel, categoryKey: 'travel' },
  ]

  return (
    <PageTransition className="min-h-screen px-4 py-8 md:px-6">
      <Navbar backLabel="Home" backHref="/" />

      <div className="max-w-5xl mx-auto mt-24 md:mt-28 pb-20">
        {/* Hero Score Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 lg:p-16 mb-12 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">AI-Optimized Stack</span>
              </motion.div>
              
              <p className="text-neutral-400 text-sm uppercase tracking-widest mb-4">
                Stack Efficiency Score
              </p>
              
              {/* Main score */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="relative inline-block"
              >
                <span className="text-8xl md:text-9xl font-display font-bold gradient-text-animated">
                  {score.overall}%
                </span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 text-emerald-400/90 text-sm mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                Optimized for your lifestyle
              </motion.p>
            </div>
            
            {/* Score breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
              <ScoreRing 
                value={score.breakdown.savings} 
                label="Savings Potential" 
                icon={Wallet}
                delay={0.3} 
              />
              <ScoreRing 
                value={score.breakdown.rewards} 
                label="Rewards Score" 
                icon={Gift}
                delay={0.4} 
              />
              <ScoreRing 
                value={score.breakdown.simplicity} 
                label="Ease of Use" 
                icon={Zap}
                delay={0.5} 
              />
              <ScoreRing 
                value={score.breakdown.investment} 
                label="Investment Fit" 
                icon={TrendingUp}
                delay={0.6} 
              />
            </div>
            
            <p className="mt-10 text-neutral-500 text-sm max-w-lg mx-auto text-center">
              Based on your spending habits and priorities - AI-matched for maximum compatibility
            </p>
          </div>
        </motion.div>

        {/* Stack heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
            Your Personalized Fintech Stack
          </h2>
          <p className="text-neutral-400 flex items-center justify-center gap-3">
            <span>5 apps</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>curated for you</span>
          </p>
        </motion.div>

        {/* Quick stack overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-10 flex flex-wrap items-center justify-center gap-4"
        >
          {cards.map((rec, i) => (
            <motion.a
              key={rec.app}
              href={`#rec-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-emerald-500/5 transition-colors cursor-pointer"
            >
              <div className="text-xs text-neutral-500 font-medium">
                {CATEGORY_LABELS[rec.categoryKey] || rec.bestFor}
              </div>
              <span className="text-sm text-emerald-400 font-semibold">{rec.app}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Recommendation cards */}
        {cards.map((rec, i) => (
          <div key={rec.app} id={`rec-${i}`}>
            <RecommendationCard data={rec} index={i} />
          </div>
        ))}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
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
            className="px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 font-semibold hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </motion.button>
        </motion.div>
        
        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-neutral-600 text-sm mt-10"
        >
          Recommendations are personalized based on your preferences and spending habits
        </motion.p>
      </div>
    </PageTransition>
  )
}
