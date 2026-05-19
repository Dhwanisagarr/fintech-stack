'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
export default function Navbar({ backLabel, backHref = '/' }) {
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 border-b border-emerald-500/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-glow-sm">
            <Sparkles className="w-5 h-5 text-[#050505]" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Stack Optimizer
          </span>
        </motion.button>
        {backLabel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(backHref)}
            className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
          >
            {backLabel}
          </motion.button>
        )}
      </div>
    </nav>
  )
}

export function NavLinks() {
  const router = useRouter()
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Build Stack', href: '/onboarding' },
  ]
  return (
    <div className="hidden md:flex gap-6">
      {links.map((link) => (
        <button
          key={link.href}
          onClick={() => router.push(link.href)}
          className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          {link.label}
        </button>
      ))}
    </div>
  )
}
