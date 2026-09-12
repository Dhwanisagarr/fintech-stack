'use client'
import { FINTECH_APPS } from '@/lib/apps'
import AppLogo from './AppLogo'
import WavyTicker from './ui/wavy-ticker'

export default function LogoMarquee() {
  const tickerItems = FINTECH_APPS.slice(0, 24).map((app) => (
    <div
      key={app.id}
      className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
    >
      <AppLogo app={app} size={36} />
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-white leading-tight">{app.name}</span>
        <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
          {app.category}
        </span>
      </div>
    </div>
  ))

  return (
    <div className="py-4">
      <WavyTicker
        items={tickerItems}
        speed={45}
        waveAmplitude={16}
        waveFrequency={0.005}
        gap={20}
        padding={24}
        itemSize={56}
        fadeEdges={true}
        fadeDistance={12}
      />
    </div>
  )
}

