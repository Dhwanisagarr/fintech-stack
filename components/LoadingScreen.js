'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ message = 'Loading your stack...' }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
        <p className="text-neutral-400 text-lg">{message}</p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emerald-500 opacity-50" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <motion.div
        className="w-16 h-16 rounded-2xl border-2 border-emerald-500/30 border-t-emerald-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-neutral-400 text-lg"
      >
        {message}
      </motion.p>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
