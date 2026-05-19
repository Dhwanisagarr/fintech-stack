'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import { OptionCard, ChipOption, AppSelectCard } from '@/components/AppSelectCard'
import {
  USER_TYPES,
  SPENDING_HABITS,
  PRIORITIES,
  FINANCIAL_GOALS,
  ONBOARDING_APP_CATEGORIES,
} from '@/lib/onboarding-data'
import { APP_CATEGORIES, getAppsByCategory } from '@/lib/apps'
import { cn } from '@/lib/utils'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    user_type: '',
    spending_habits: [],
    priorities: '',
    existing_apps: [],
    financial_goals: '',
  })

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = async (goalValue) => {
    setLoading(true)
    const payload = { ...data, financial_goals: goalValue || data.financial_goals }
    try {
      const userId = 'user-' + Date.now()
      const { error } = await supabase.from('user_preferences').insert([{
        user_id: userId,
        user_type: payload.user_type,
        priorities: [payload.priorities],
        spending_habits: payload.spending_habits,
        existing_apps: payload.existing_apps,
        financial_goals: [payload.financial_goals],
      }])
      if (error) console.error('Supabase error:', error)
      localStorage.setItem('userPreferences', JSON.stringify(payload))
      router.push('/results')
    } catch (error) {
      console.error('Error saving:', error)
      localStorage.setItem('userPreferences', JSON.stringify(payload))
      router.push('/results')
    } finally {
      setLoading(false)
    }
  }

  const toggleArray = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  const toggleApp = (appName) => toggleArray('existing_apps', appName)

  return (
    <PageTransition className="min-h-screen px-4 py-8 md:px-6">
      <Navbar backLabel="← Back to Home" backHref="/" />

      <div className="max-w-4xl mx-auto mt-28 md:mt-32 pb-16">
        <div className="mb-10">
          <div className="flex justify-between mb-2 text-xs text-neutral-500">
            {['20%', '40%', '60%', '80%', '100%'].map((pct, i) => (
              <span key={pct} className={cn(i + 1 <= step && 'text-emerald-400 font-semibold')}>{pct}</span>
            ))}
          </div>
          <div className="h-2 bg-[#0b0f0b] rounded-full overflow-hidden border border-emerald-500/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${step * 20}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 shadow-glow-sm"
            />
          </div>
          <p className="text-center mt-3 text-neutral-500 text-sm">Step {step} of 5</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">What describes you best?</h2>
              <p className="text-neutral-400 text-center mb-8">Tailored recommendations for your situation</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {USER_TYPES.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    description={opt.description}
                    selected={data.user_type === opt.value}
                    onClick={() => {
                      setData({ ...data, user_type: opt.value })
                      handleNext()
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">What do you spend on?</h2>
              <p className="text-neutral-400 text-center mb-8">Select all that apply</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SPENDING_HABITS.map((opt) => (
                  <ChipOption
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={data.spending_habits.includes(opt.value)}
                    onClick={() => toggleArray('spending_habits', opt.value)}
                  />
                ))}
              </div>
              <NavButtons onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">What matters most?</h2>
              <p className="text-neutral-400 text-center mb-8">This shapes your stack focus</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PRIORITIES.map((opt) => (
                  <ChipOption
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={data.priorities === opt.value}
                    onClick={() => {
                      setData({ ...data, priorities: opt.value })
                      handleNext()
                    }}
                  />
                ))}
              </div>
              <div className="mt-8">
                <button onClick={handleBack} className="text-neutral-400 hover:text-emerald-400 transition-colors">← Back</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">Apps you already use</h2>
              <p className="text-neutral-400 text-center mb-8">Select all — grouped by category</p>
              {ONBOARDING_APP_CATEGORIES.map((cat) => (
                <div key={cat} className="mb-8">
                  <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    {APP_CATEGORIES[cat]}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {getAppsByCategory(cat).map((app) => (
                      <AppSelectCard
                        key={app.id}
                        app={app}
                        compact
                        selected={data.existing_apps.includes(app.name)}
                        onClick={() => toggleApp(app.name)}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <NavButtons onBack={handleBack} onNext={handleNext} nextClass="bg-emerald-500 hover:bg-emerald-400 text-[#050505]" />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">Your financial goal</h2>
              <p className="text-neutral-400 text-center mb-8">What are you trying to improve?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FINANCIAL_GOALS.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    description={opt.description}
                    selected={data.financial_goals === opt.value}
                    onClick={() => !loading && handleSubmit(opt.value)}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-8 items-center">
                <button onClick={handleBack} className="text-neutral-400 hover:text-emerald-400">← Back</button>
                {loading && <span className="text-emerald-400 animate-pulse text-sm">Saving your preferences...</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

function NavButtons({ onBack, onNext, nextClass }) {
  return (
    <div className="flex justify-between mt-10 gap-4">
      <button onClick={onBack} className="text-neutral-400 hover:text-emerald-400 px-4 py-2">← Back</button>
      <button
        onClick={onNext}
        className={cn(
          'px-8 py-3 rounded-full font-semibold transition-all shadow-glow-sm',
          nextClass || 'bg-emerald-500 hover:bg-emerald-400 text-[#050505]'
        )}
      >
        Next →
      </button>
    </div>
  )
}
