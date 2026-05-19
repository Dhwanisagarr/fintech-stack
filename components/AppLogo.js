'use client'
import { useState } from 'react'
import Image from 'next/image'
import { getLogoUrl } from '@/lib/apps'
import { cn } from '@/lib/utils'

export default function AppLogo({ app, size = 48, className }) {
  const [failed, setFailed] = useState(false)
  const px = size

  if (!app) {
    return (
      <div
        className={cn('rounded-2xl bg-emerald-500/20 flex items-center justify-center', className)}
        style={{ width: px, height: px }}
      >
        <span className="text-emerald-400 text-xs font-bold">?</span>
      </div>
    )
  }

  if (failed) {
    return (
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ring-1 ring-emerald-500/30',
          className
        )}
        style={{ width: px, height: px, backgroundColor: app.brandColor || '#22c55e' }}
      >
        <span style={{ fontSize: px * 0.35 }}>{app.name.slice(0, 2).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden bg-white ring-1 ring-emerald-500/20 shadow-glow-sm',
        className
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={getLogoUrl(app.domain)}
        alt={`${app.name} logo`}
        width={px}
        height={px}
        className="object-contain p-1.5 w-full h-full"
        onError={() => setFailed(true)}
        unoptimized
      />
    </div>
  )
}
