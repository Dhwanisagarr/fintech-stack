'use client'
import { FINTECH_APPS } from '@/lib/apps'
import AppLogo from './AppLogo'

export default function LogoMarquee() {
  const apps = [...FINTECH_APPS, ...FINTECH_APPS]

  return (
    <div className="relative overflow-hidden py-8 mask-fade-x">
      <div className="flex gap-8 animate-marquee w-max">
        {apps.map((app, i) => (
          <div
            key={`${app.id}-${i}`}
            className="flex flex-col items-center gap-2 shrink-0 glass-card px-4 py-3 hover:border-emerald-500/40 hover:shadow-glow-sm transition-all"
          >
            <AppLogo app={app} size={44} />
            <span className="text-xs text-neutral-400 whitespace-nowrap">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
