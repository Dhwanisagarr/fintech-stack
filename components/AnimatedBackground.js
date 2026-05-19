'use client'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-grid opacity-40"
        animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-green-400/15 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
