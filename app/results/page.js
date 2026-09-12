'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Save, Share2, Download, RotateCcw, Check, Loader2 } from 'lucide-react'
import { toBlob, toPng } from 'html-to-image'
import { getRecommendations, calculateStackScore } from '@/lib/recommendations'
import { getDbAppById } from '@/lib/apps-db'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import LoadingScreen from '@/components/LoadingScreen'
import RecommendationCard from '@/components/RecommendationCard'
import AppLogo from '@/components/AppLogo'

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
          <circle cx="40" cy="40" r="36" fill="none" stroke="#18181b" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#monoGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ delay: delay + 0.2, duration: 1 }}
          />
          <defs>
            <linearGradient id="monoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
          {value}%
        </span>
      </div>
      <span className="text-xs text-zinc-400 mt-2 text-center">{label}</span>
    </motion.div>
  )
}

export default function ResultsPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [score, setScore] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const exportCardRef = useRef(null)

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

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  const generateStackImage = async () => {
    if (!exportCardRef.current) return null
    try {
      const blob = await toBlob(exportCardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#09090b'
      })
      return blob
    } catch (err) {
      console.error('Failed to generate image blob:', err)
      return null
    }
  }

  const handleDownloadImage = async () => {
    setIsExporting(true)
    try {
      const blob = await generateStackImage()
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `my-fintech-stack-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        showToast('Stack card PNG downloaded!')
      } else {
        showToast('Failed to generate image card.')
      }
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    setIsExporting(true)
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fintechstackoptimizer.vercel.app'
    const shareUrl = `${origin}/results`

    try {
      // Generate high resolution image file
      const blob = await generateStackImage()
      let sharedWithFile = false

      if (blob) {
        const imageFile = new File([blob], 'my-fintech-stack.png', { type: 'image/png' })
        
        // 1. Try Native Web Share API with File payload
        if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
          try {
            await navigator.share({
              title: 'My Fintech Stack',
              text: `Check out my optimized fintech stack (${score?.overall || 85}% score) on Fintech Stack Optimizer!`,
              files: [imageFile],
              url: shareUrl,
            })
            sharedWithFile = true
            showToast('Stack image shared!')
            return
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') return
          }
        }
      }

      // 2. Fallback: Trigger PNG download & Copy URL to Clipboard
      if (blob && !sharedWithFile) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `my-fintech-stack-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
      }
      showToast('Image downloaded & share link copied to clipboard!')
    } catch (err) {
      showToast('Share link copied to clipboard!')
    } finally {
      setIsExporting(false)
    }
  }

  const handleSave = () => {
    if (typeof window !== 'undefined' && preferences) {
      localStorage.setItem('savedFintechStack', JSON.stringify({ preferences, score, savedAt: new Date().toISOString() }))
    }
    showToast('Stack configuration saved locally!')
  }

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
    <PageTransition className="min-h-screen px-4 py-8 md:px-6 relative">
      <Navbar backLabel="Home →" backHref="/" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-zinc-900/95 text-white border border-white/20 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-sm font-medium"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto mt-28 md:mt-32 pb-20">
        
        {/* Main Score Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative text-center">
            <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Stack Efficiency Score</p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-display font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4"
            >
              {score.overall}%
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-zinc-300 text-sm mb-10">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Optimized for your lifestyle</span>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ScoreRing value={score.breakdown.savings} label="Savings" delay={0.3} />
              <ScoreRing value={score.breakdown.rewards} label="Rewards" delay={0.4} />
              <ScoreRing value={score.breakdown.simplicity} label="Simplicity" delay={0.5} />
              <ScoreRing value={score.breakdown.investment} label="Investment" delay={0.6} />
            </div>
            <p className="mt-8 text-zinc-500 text-sm max-w-md mx-auto">
              Based on your spending habits and priorities — AI-matched for maximum compatibility
            </p>
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold">Your Personalized Fintech Stack</h2>
          <p className="text-zinc-400 mt-2">5 apps · curated for you</p>
        </motion.div>

        {/* Recommendation Cards */}
        {cards.map((rec, i) => (
          <RecommendationCard key={rec.app} data={rec} index={i} />
        ))}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Stack
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isExporting}
            onClick={handleShare}
            className="btn-secondary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
            {isExporting ? 'Preparing Image...' : 'Share Stack'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isExporting}
            onClick={handleDownloadImage}
            className="px-6 py-4 rounded-full border border-zinc-700 bg-zinc-900/90 text-white font-semibold hover:border-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5 text-emerald-400" />
            Download PNG Card
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/onboarding')}
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </motion.button>
        </motion.div>

      </div>

      {/* Offscreen High-Res Export Card for PNG Generation */}
      <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
        <div
          ref={exportCardRef}
          className="w-[720px] bg-black text-white p-10 rounded-3xl border border-zinc-800 font-sans shadow-2xl"
          style={{ backgroundColor: '#09090b' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">STACK OPTIMIZER</h1>
                <p className="text-xs text-zinc-400">Personalized Fintech Ecosystem</p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              Verified Stack Result
            </div>
          </div>

          {/* Hero Score */}
          <div className="bg-zinc-900/90 rounded-2xl p-6 border border-zinc-800 text-center mb-8">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Stack Efficiency Score</p>
            <div className="text-6xl font-extrabold text-white mb-2">{score?.overall || 85}%</div>
            <p className="text-xs text-emerald-400 font-medium">Matched for {preferences?.user_type || 'Salaried'} Lifestyle</p>
          </div>

          {/* 5 Stack Pillar Apps Grid */}
          <div className="space-y-3 mb-8">
            {cards.map((rec) => {
              const appObj = getDbAppById(rec.appId)
              return (
                <div key={rec.app} className="flex items-center justify-between bg-zinc-900/60 rounded-xl p-3.5 border border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <AppLogo app={appObj || { name: rec.app, domain: rec.logo }} size={36} />
                    <div>
                      <h3 className="text-sm font-bold text-white">{rec.app}</h3>
                      <p className="text-xs text-zinc-400">{rec.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                    {rec.compatibility}% Fit
                  </span>
                </div>
              )
            })}
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span>fintechstackoptimizer.vercel.app</span>
            <span>Created by Dhwani Sagar</span>
          </div>
        </div>
      </div>

    </PageTransition>
  )
}
