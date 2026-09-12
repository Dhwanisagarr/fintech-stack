'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Navbar({ backLabel, backHref = '/' }) {
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Stack Optimizer
          </span>
        </motion.button>
        {backLabel && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(backHref)}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
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
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {link.label}
        </button>
      ))}
    </div>
  )
}

