'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import AppLogo from './AppLogo'
import { cn } from '@/lib/utils'

export function AppSelectCard({ app, selected, onClick, compact = false }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'glass-card relative flex flex-col items-center justify-center gap-2 transition-all duration-300',
        compact ? 'p-3 md:p-4' : 'p-4 md:p-5',
        selected
          ? 'border-white bg-white/10 shadow-lg ring-1 ring-white/50'
          : 'hover:border-white/40 hover:bg-white/5'
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
          <Check className="w-3 h-3 text-black" strokeWidth={3} />
        </span>
      )}
      <AppLogo app={app} size={compact ? 40 : 48} />
      <span className={cn('text-xs md:text-sm font-medium text-center leading-tight', selected ? 'text-white font-bold' : 'text-zinc-400')}>
        {app.name}
      </span>
    </motion.button>
  )
}

export function OptionCard({ icon: Icon, label, description, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'glass-card p-5 md:p-6 text-left w-full transition-all duration-300',
        selected
          ? 'border-white bg-white/10 shadow-lg ring-1 ring-white/30'
          : 'hover:border-white/40 hover:bg-white/5'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
          selected ? 'bg-white text-black' : 'bg-zinc-800 text-white border border-white/10'
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-white">{label}</div>
          {description && <p className="text-sm text-zinc-400 mt-1">{description}</p>}
        </div>
      </div>
    </motion.button>
  )
}

export function ChipOption({ icon: Icon, label, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'glass-card flex flex-col items-center gap-2 p-4 transition-all',
        selected ? 'border-white bg-white/10 shadow-md ring-1 ring-white/30' : 'hover:border-white/30 hover:bg-white/5'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        selected ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300 border border-white/10'
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={cn('text-xs font-medium', selected ? 'text-white font-bold' : 'text-zinc-400')}>{label}</span>
      {selected && <span className="text-[10px] text-zinc-300 font-semibold uppercase tracking-wider">Selected</span>}
    </motion.button>
  )
}

