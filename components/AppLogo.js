'use client'
import { useState } from 'react'
import { getLogoUrl } from '@/lib/apps'
import { cn } from '@/lib/utils'

export default function AppLogo({ app, size = 48, className }) {
  const [failed, setFailed] = useState(false)
  const px = size

  if (!app) {
    return (
      <div
        className={cn('rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10', className)}
        style={{ width: px, height: px }}
      >
        <span className="text-zinc-400 text-xs font-bold">?</span>
      </div>
    )
  }

  const logoSrc = getLogoUrl(app)

  if (failed) {
    return (
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ring-1 ring-white/20 bg-zinc-900',
          className
        )}
        style={{ width: px, height: px }}
      >
        <span style={{ fontSize: px * 0.35 }}>{app.name.slice(0, 2).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden bg-white ring-1 ring-white/20 shadow-md flex items-center justify-center p-1.5',
        className
      )}
      style={{ width: px, height: px }}
    >
      <img
        src={logoSrc}
        alt={`${app.name} logo`}
        className="object-contain max-h-full max-w-full w-auto h-auto"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

