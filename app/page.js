'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClipboardList, Sparkles, Share2, Zap, ArrowRight } from 'lucide-react'
import { NavLinks } from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import LogoMarquee from '@/components/LogoMarquee'
import { APP_CATEGORIES, getAppsByCategory } from '@/lib/apps'
import AppLogo from '@/components/AppLogo'

const STEPS = [
  { icon: ClipboardList, label: 'STEP 1', title: 'Answer 5 Questions', desc: 'Tell us about your lifestyle, spending habits, and priorities' },
  { icon: Sparkles, label: 'STEP 2', title: 'Get Recommendations', desc: 'AI-powered engine finds your perfect fintech stack' },
  { icon: Share2, label: 'STEP 3', title: 'Save & Share', desc: 'Save your stack and share it with friends' },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <PageTransition className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-500/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#050505]" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">Stack Optimizer</span>
          </button>
          <NavLinks />
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm mb-8"
          >
            <Zap className="w-4 h-4" />
            AI-powered fintech stack builder
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Too many fintech apps.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
              One perfect stack.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto"
          >
            Find the best banking, UPI, investing, and credit apps for your lifestyle in under 60 seconds.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/onboarding')}
            className="btn-primary inline-flex items-center gap-2 text-lg w-full md:w-auto justify-center"
          >
            Build My Stack
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-500 mt-6 text-sm flex items-center justify-center gap-4 flex-wrap"
          >
            <span>Free</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span>No signup required</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span>Takes 60 seconds</span>
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-to-b from-[#050505] to-[#0b0f0b]">
        <motion.div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-4">How It Works</h2>
          <p className="text-neutral-400 text-center mb-16">Three simple steps to your perfect money stack</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-sm text-emerald-400 font-semibold mb-2">{step.label}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-12 overflow-hidden">
        <h2 className="text-3xl font-display font-bold text-center mb-2">Trusted Fintech Brands</h2>
        <p className="text-neutral-400 text-center mb-8 text-sm">50+ apps across payments, banking, investing & more</p>
        <LogoMarquee />
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Featured Apps</h2>
          {Object.entries(APP_CATEGORIES).map(([key, label]) => {
            const apps = getAppsByCategory(key).slice(0, 6)
            if (!apps.length) return null
            return (
              <div key={key} className="mb-12">
                <h3 className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wider">{label}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {apps.map((app, i) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="glass-card p-4 flex flex-col items-center gap-2 cursor-default hover:shadow-glow-sm"
                    >
                      <AppLogo app={app} size={44} />
                      <span className="text-xs text-neutral-400 text-center">{app.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
