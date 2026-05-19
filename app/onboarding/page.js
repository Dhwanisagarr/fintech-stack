'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import { OptionCard, ChipOption, AppSelectCard, StepIndicator } from '@/components/AppSelectCard'
import {
  USER_TYPES,
  SPENDING_HABITS,
  PRIORITIES,
  FINANCIAL_GOALS,
  ONBOARDING_APP_CATEGORIES,
} from '@/lib/onboarding-data'
import { APP_CATEGORIES, getAppsByCategory } from '@/lib/apps'
import { cn } from '@/lib/utils'

const STEP_TITLES = [
  { title: 'Who are you?', subtitle: 'This helps us personalize your recommendations' },
  { title: 'What do you spend on?', subtitle: 'Select all that apply to your lifestyle' },
  { title: 'What matters most?', subtitle: 'This shapes your stack priorities' },
  { title: 'Your current apps', subtitle: 'Select apps you already use' },
  { title: 'Your financial goal', subtitle: 'What are you trying to achieve?' },
]

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

  const handleNext = () => setStep((s) => Math.min(s + 1, 5))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

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

  const currentStepData = STEP_TITLES[step - 1]

  return (
    <PageTransition className="min-h-screen px-4 py-8 md:px-6">
      <Navbar backLabel="Back to Home" backHref="/" />

      <div className="max-w-4xl mx-auto mt-24 md:mt-28 pb-16">
        {/* Progress Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Premium Progress Bar */}
          <div className="progress-bar-premium h-2 mb-6">
            <motion.div
              className="progress-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${step * 20}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          
          {/* Step indicator dots */}
          <StepIndicator currentStep={step} totalSteps={5} />
          
          {/* Step text */}
          <p className="text-center mt-4 text-neutral-500 text-sm font-medium">
            Step {step} of 5
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: User Type */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <StepHeader {...currentStepData} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {USER_TYPES.map((opt, i) => (
                  <motion.div
                    key={opt.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <OptionCard
                      icon={opt.icon}
                      label={opt.label}
                      description={opt.description}
                      selected={data.user_type === opt.value}
                      onClick={() => {
                        setData({ ...data, user_type: opt.value })
                        setTimeout(handleNext, 300)
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Spending Habits */}
          {step === 2 && (
            <motion.div 
              key="s2" 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -40 }}
            >
              <StepHeader {...currentStepData} />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SPENDING_HABITS.map((opt, i) => (
                  <motion.div
                    key={opt.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <ChipOption
                      icon={opt.icon}
                      label={opt.label}
                      selected={data.spending_habits.includes(opt.value)}
                      onClick={() => toggleArray('spending_habits', opt.value)}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Selection count badge */}
              {data.spending_habits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    {data.spending_habits.length} selected
                  </span>
                </motion.div>
              )}
              
              <NavButtons onBack={handleBack} onNext={handleNext} canProceed={data.spending_habits.length > 0} />
            </motion.div>
          )}

          {/* Step 3: Priorities */}
          {step === 3 && (
            <motion.div 
              key="s3" 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -40 }}
            >
              <StepHeader {...currentStepData} />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PRIORITIES.map((opt, i) => (
                  <motion.div
                    key={opt.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <ChipOption
                      icon={opt.icon}
                      label={opt.label}
                      selected={data.priorities === opt.value}
                      onClick={() => {
                        setData({ ...data, priorities: opt.value })
                        setTimeout(handleNext, 300)
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <button 
                  onClick={handleBack} 
                  className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Existing Apps */}
          {step === 4 && (
            <motion.div 
              key="s4" 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -40 }}
            >
              <StepHeader {...currentStepData} />
              
              {ONBOARDING_APP_CATEGORIES.map((cat, catIndex) => (
                <motion.div 
                  key={cat} 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-green-500" />
                    <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      {APP_CATEGORIES[cat]}
                    </h3>
                    <span className="text-neutral-600 text-xs">
                      ({getAppsByCategory(cat).length} apps)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {getAppsByCategory(cat).map((app, i) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <AppSelectCard
                          app={app}
                          compact
                          selected={data.existing_apps.includes(app.name)}
                          onClick={() => toggleApp(app.name)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {/* Selection count */}
              {data.existing_apps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    {data.existing_apps.length} apps selected
                  </span>
                </motion.div>
              )}
              
              <NavButtons onBack={handleBack} onNext={handleNext} />
            </motion.div>
          )}

          {/* Step 5: Financial Goals */}
          {step === 5 && (
            <motion.div 
              key="s5" 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -40 }}
            >
              <StepHeader {...currentStepData} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FINANCIAL_GOALS.map((opt, i) => (
                  <motion.div
                    key={opt.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <OptionCard
                      icon={opt.icon}
                      label={opt.label}
                      description={opt.description}
                      selected={data.financial_goals === opt.value}
                      onClick={() => !loading && handleSubmit(opt.value)}
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-10">
                <button 
                  onClick={handleBack} 
                  className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-emerald-400"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">Building your stack...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

function StepHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{title}</h2>
      <p className="text-neutral-400">{subtitle}</p>
    </motion.div>
  )
}

function NavButtons({ onBack, onNext, canProceed = true }) {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-emerald-500/10">
      <motion.button 
        whileHover={{ x: -4 }}
        onClick={onBack} 
        className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors px-4 py-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!canProceed}
        className={cn(
          'flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all shadow-glow-sm',
          canProceed
            ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-[#050505] hover:shadow-glow'
            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed shadow-none'
        )}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}
