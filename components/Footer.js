'use client'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="relative px-6 py-16 border-t border-emerald-500/10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#050505]" />
              </div>
              <span className="font-bold text-emerald-400">Fintech Stack Optimizer</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Your personal money stack builder. AI-powered recommendations for India&apos;s best fintech apps.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <button onClick={() => router.push('/')} className="block text-neutral-400 hover:text-emerald-400 transition-colors">Home</button>
              <button onClick={() => router.push('/onboarding')} className="block text-neutral-400 hover:text-emerald-400 transition-colors">Build Stack</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Created By</h4>
            <p className="text-neutral-400 text-sm">Dhwani Sagar</p>
            <p className="text-neutral-500 text-xs mt-1">Software Developer @ Fyers</p>
            <p className="text-neutral-500 text-xs">Kerala, India</p>
          </div>
        </div>
        <div className="border-t border-emerald-500/10 pt-8 text-center text-neutral-500 text-sm">
          © 2026 Fintech Stack Optimizer. Built with Next.js, Supabase & Tailwind CSS.
        </div>
      </div>
    </footer>
  )
}
