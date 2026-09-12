'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClipboardList, Sparkles, Share2, Zap, ArrowRight, Layers, Bot, SlidersHorizontal, CheckCircle2 } from 'lucide-react'
import { NavLinks } from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import LogoMarquee from '@/components/LogoMarquee'
import FintechStackHero from '@/components/ui/fintech-stack-hero'
import { APP_CATEGORIES, getAppsByCategory } from '@/lib/apps'
import AppLogo from '@/components/AppLogo'

const PILLARS = [
  { id: 'banking', name: 'Banking & Neobanking', desc: 'High-yield savings, zero Forex accounts, smart pots', apps: 'Jupiter, Fi Money, HDFC, ICICI, Axis' },
  { id: 'upi', name: 'UPI & Payments', desc: 'Instant transfers, bill payments, cashback rewards', apps: 'Google Pay, PhonePe, Paytm, Amazon Pay' },
  { id: 'investing', name: 'Investing & Wealth', desc: 'Direct MFs, stocks, US investing, theme baskets', apps: 'Zerodha, Groww, INDmoney, smallcase, Upstox' },
  { id: 'credit', name: 'Credit & Rewards', desc: 'LTF credit cards, reward multipliers, lounge access', apps: 'CRED, OneCard, Slice' },
  { id: 'budgeting', name: 'Budget & Expense Tracking', desc: 'Automated SMS tracking, net worth graphs', apps: 'Walnut, Fold' },
]

const STEPS = [
  { icon: ClipboardList, label: 'STEP 1', title: 'Answer 5 Questions', desc: 'Tell us about your lifestyle, spending habits, and priorities' },
  { icon: Sparkles, label: 'STEP 2', title: 'Get Recommendations', desc: 'AI-powered engine finds your perfect fintech stack' },
  { icon: Share2, label: 'STEP 3', title: 'Save & Share', desc: 'Save your stack and share it with friends' },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <PageTransition className="min-h-screen bg-transparent">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Stack Optimizer
            </span>
          </button>
          <NavLinks />
        </div>
      </header>

      {/* Scroll-Morph Hero Animation Component */}
      <FintechStackHero />

      {/* Section 1: One stack. Five parts of your financial life. */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent via-zinc-950/60 to-transparent relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              One stack. Five parts of your financial life.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              Instead of randomly downloading financial apps, get a cohesive software ecosystem where each app serves a clear purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 border border-zinc-800 hover:border-zinc-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white mb-4 font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{pillar.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-300 font-medium">
                  {pillar.apps}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Built around you, not the average user */}
      <section className="px-6 py-20 border-y border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-zinc-300 text-xs font-semibold mb-6">
              <SlidersHorizontal className="w-4 h-4 text-white" />
              Tailored Intelligence
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Built around you, not the average user.
            </h2>
            <p className="text-zinc-300 text-base md:text-lg mb-8 leading-relaxed">
              Generic listicles recommend the same 3 apps to everyone. Our 60-second questionnaire evaluates your exact spending patterns, travel needs, and investment style to curate your ultimate financial toolkit.
            </p>
            <div className="space-y-4">
              {[
                'Evaluates 50+ tier-1 fintech platforms',
                'Finds hidden reward & forex fee loopholes',
                'Adapts to your monthly spending & salary style',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-zinc-200 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 border border-zinc-800 bg-black/80 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Example Curated Stack</div>
            <div className="text-2xl font-extrabold text-white mb-6">The High-Growth Tech Stack</div>
            
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs">🏦</div>
                  <div>
                    <div className="text-sm font-bold text-white">Jupiter + HDFC</div>
                    <div className="text-xs text-zinc-400">Neobank pots + Salary account</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 font-semibold">Banking</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs">📈</div>
                  <div>
                    <div className="text-sm font-bold text-white">Zerodha + smallcase</div>
                    <div className="text-xs text-zinc-400">F&O + Theme baskets</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 font-semibold">Investing</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs">💳</div>
                  <div>
                    <div className="text-sm font-bold text-white">CRED + OneCard</div>
                    <div className="text-xs text-zinc-400">5X rewards + metal credit card</div>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 font-semibold">Credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-zinc-950/70 border-t border-zinc-800/80 relative z-10">
        <motion.div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-4">How It Works</h2>
          <p className="text-zinc-400 text-center mb-16">Three simple steps to your perfect money stack</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 text-center border border-zinc-800"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-sm text-zinc-400 font-semibold mb-2">{step.label}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trusted Brands */}
      <section className="py-16 overflow-hidden bg-black/60 border-t border-zinc-800/80 relative z-10">
        <h2 className="text-3xl font-display font-bold text-center text-white mb-2">Trusted Fintech Brands</h2>
        <p className="text-zinc-400 text-center mb-8 text-sm">50+ apps across payments, banking, investing & more</p>
        <LogoMarquee />
      </section>

      {/* Featured Brands */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">Featured Apps</h2>
          {Object.entries(APP_CATEGORIES).map(([key, label]) => {
            const apps = getAppsByCategory(key).slice(0, 6)
            if (!apps.length) return null
            return (
              <div key={key} className="mb-12">
                <h3 className="text-zinc-300 font-semibold mb-4 text-sm uppercase tracking-wider">{label}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {apps.map((app, i) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="glass-card p-4 flex flex-col items-center gap-2 cursor-default border border-zinc-800 hover:border-zinc-600"
                    >
                      <AppLogo app={app} size={44} />
                      <span className="text-xs text-zinc-400 text-center">{app.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-6 py-24 bg-gradient-to-t from-zinc-900/60 via-black to-black border-t border-zinc-800 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to build your stack?
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl mx-auto">
            Build your personalized financial app ecosystem in under 60 seconds.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-black bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:bg-zinc-100 transition-all transform hover:-translate-y-0.5"
          >
            Build My Stack <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}

