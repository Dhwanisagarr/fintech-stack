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
          ? 'border-emerald-500 bg-emerald-500/10 shadow-glow ring-1 ring-emerald-400/50'
          : 'hover:border-emerald-500/40 hover:shadow-glow-sm'
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-[#050505]" strokeWidth={3} />
        </span>
      )}
      <AppLogo app={app} size={compact ? 40 : 48} />
      <span className={cn('text-xs md:text-sm font-medium text-center leading-tight', selected && 'text-emerald-400')}>
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
          ? 'border-emerald-500 bg-emerald-500/10 shadow-glow'
          : 'hover:border-emerald-500/40 hover:shadow-glow-sm'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
          selected ? 'bg-emerald-500 text-[#050505]' : 'bg-emerald-500/15 text-emerald-400'
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-white">{label}</div>
          {description && <p className="text-sm text-neutral-400 mt-1">{description}</p>}
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
        selected ? 'border-emerald-500 bg-emerald-500/10 shadow-glow-sm' : 'hover:border-emerald-500/30'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        selected ? 'bg-emerald-500 text-[#050505]' : 'bg-emerald-500/10 text-emerald-400'
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={cn('text-xs font-medium', selected && 'text-emerald-400')}>{label}</span>
      {selected && <span className="text-[10px] text-emerald-500 font-semibold">Selected</span>}
    </motion.button>
  )
}

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
        <div
          key={stepNum}
          className={cn(
            'w-2.5 h-2.5 rounded-full transition-all duration-300',
            stepNum === currentStep
              ? 'bg-emerald-500 w-8 rounded-full'
              : stepNum < currentStep
                ? 'bg-emerald-500/60'
                : 'bg-neutral-700'
          )}
        />
      ))}
    </div>
  )
}
