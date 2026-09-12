'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react'

export type AnimationPhase = 'scatter' | 'line' | 'circle' | 'bottom-strip'

export interface FintechBrand {
  id: string
  name: string
  category: 'BANKING' | 'UPI' | 'INVESTING' | 'CREDIT + REWARDS' | 'BUDGETING'
  domain: string
  brandColor: string
  logoAsset: string
}

export const FINTECH_BRANDS_20: FintechBrand[] = [
  { id: 'zerodha', name: 'Zerodha', category: 'INVESTING', domain: 'zerodha.com', brandColor: '#387ED1', logoAsset: '/logos/zerodha.svg' },
  { id: 'groww', name: 'Groww', category: 'INVESTING', domain: 'groww.in', brandColor: '#00D09C', logoAsset: '/logos/groww.png' },
  { id: 'cred', name: 'CRED', category: 'CREDIT + REWARDS', domain: 'cred.club', brandColor: '#1A1A1A', logoAsset: '/logos/cred.png' },
  { id: 'jupiter', name: 'Jupiter', category: 'BANKING', domain: 'jupiter.money', brandColor: '#F97316', logoAsset: '/logos/jupiter.png' },
  { id: 'fi', name: 'Fi', category: 'BANKING', domain: 'fi.money', brandColor: '#00D09C', logoAsset: '/logos/fi.png' },
  { id: 'indmoney', name: 'INDmoney', category: 'INVESTING', domain: 'indmoney.com', brandColor: '#1E3A8A', logoAsset: '/logos/indmoney.png' },
  { id: 'navi', name: 'Navi', category: 'BANKING', domain: 'navi.com', brandColor: '#6C3CE9', logoAsset: '/logos/navi.png' },
  { id: 'gpay', name: 'Google Pay', category: 'UPI', domain: 'pay.google.com', brandColor: '#4285F4', logoAsset: '/logos/gpay.svg' },
  { id: 'phonepe', name: 'PhonePe', category: 'UPI', domain: 'phonepe.com', brandColor: '#5F259F', logoAsset: '/logos/phonepe.svg' },
  { id: 'onecard', name: 'OneCard', category: 'CREDIT + REWARDS', domain: 'getonecard.app', brandColor: '#111827', logoAsset: '/logos/onecard.png' },
  { id: 'smallcase', name: 'smallcase', category: 'INVESTING', domain: 'smallcase.com', brandColor: '#1F2937', logoAsset: '/logos/smallcase.png' },
  { id: 'walnut', name: 'Walnut', category: 'BUDGETING', domain: 'getwalnut.com', brandColor: '#10B981', logoAsset: '/logos/walnut.png' },
  { id: 'fold', name: 'Fold', category: 'BUDGETING', domain: 'fold.money', brandColor: '#8B5CF6', logoAsset: '/logos/fold.png' },
  { id: 'hdfc', name: 'HDFC Bank', category: 'BANKING', domain: 'hdfcbank.com', brandColor: '#004C8F', logoAsset: '/logos/hdfc.svg' },
  { id: 'icici', name: 'ICICI Bank', category: 'BANKING', domain: 'icicibank.com', brandColor: '#F58220', logoAsset: '/logos/icici.svg' },
  { id: 'axis', name: 'Axis Bank', category: 'BANKING', domain: 'axisbank.com', brandColor: '#971237', logoAsset: '/logos/axis.svg' },
  { id: 'paytm', name: 'Paytm', category: 'UPI', domain: 'paytm.com', brandColor: '#00BAF2', logoAsset: '/logos/paytm.svg' },
  { id: 'slice', name: 'Slice', category: 'CREDIT + REWARDS', domain: 'sliceit.com', brandColor: '#8B5CF6', logoAsset: '/logos/slice.png' },
  { id: 'amazonpay', name: 'Amazon Pay', category: 'UPI', domain: 'amazon.in', brandColor: '#FF9900', logoAsset: '/logos/amazonpay.svg' },
  { id: 'upstox', name: 'Upstox', category: 'INVESTING', domain: 'upstox.com', brandColor: '#5A2D8C', logoAsset: '/logos/upstox.png' },
]

interface FlipCardProps {
  brand: FintechBrand
  index: number
  total: number
  phase: AnimationPhase
  target: {
    x: number
    y: number
    rotation: number
    scale: number
    opacity: number
  }
}

const CARD_WIDTH = 76
const CARD_HEIGHT = 104

function FlipCard({ brand, index, total, phase, target }: FlipCardProps) {
  const [logoFailed, setLogoFailed] = useState(false)

  // Primary local logo asset from /public/logos, fallback to Clearbit / Google favicon
  const logoSrc = brand.logoAsset
  const fallbackLogoSrc = `https://logo.clearbit.com/${brand.domain}`

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="cursor-pointer group z-10"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 flex flex-col items-center justify-between p-2 group-hover:border-zinc-600 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Subtle top indicator category tag */}
          <div className="w-full flex justify-between items-center px-1 pt-0.5">
            <span className="text-[7px] font-semibold text-zinc-400 uppercase tracking-tight truncate max-w-[52px]">
              {brand.category.split(' ')[0]}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>

          {/* Official Brand Logo */}
          <div className="relative w-10 h-10 my-auto flex items-center justify-center bg-white rounded-lg p-1.5 shadow-inner">
            {!logoFailed ? (
              <img
                src={logoSrc}
                alt={`${brand.name} logo`}
                className="max-h-full max-w-full object-contain"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <img
                src={fallbackLogoSrc}
                alt={`${brand.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>

          {/* Brand Name */}
          <div className="w-full text-center pb-0.5">
            <p className="text-[9px] font-bold text-zinc-200 truncate leading-tight">{brand.name}</p>
          </div>

          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-2 border border-zinc-700 text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest mb-1 leading-none">
            {brand.category}
          </p>
          <p className="text-xs font-extrabold text-white leading-tight mb-1">{brand.name}</p>
          <div className="w-4 h-0.5 rounded-full bg-white/60 mt-1" />
        </div>
      </motion.div>
    </motion.div>
  )
}

const TOTAL_IMAGES = 20
const MAX_SCROLL = 3000

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t

export default function FintechStackHero() {
  const router = useRouter()
  const [introPhase, setIntroPhase] = useState<AnimationPhase>('scatter')
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width || window.innerWidth,
          height: entry.contentRect.height || 800,
        })
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)
    setContainerSize({
      width: containerRef.current.offsetWidth || window.innerWidth,
      height: containerRef.current.offsetHeight || 800,
    })

    return () => observer.disconnect()
  }, [])

  const virtualScroll = useMotionValue(0)
  const scrollRef = useRef(0)

  // Sync scroll from page wheel & window scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      const pageScrollY = window.scrollY
      const clamped = Math.min(Math.max(pageScrollY * 2.5, 0), MAX_SCROLL)
      scrollRef.current = clamped
      virtualScroll.set(clamped)
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [virtualScroll])

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 })

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360])
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 })

  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * 100)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX])

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase('line'), 500)
    const timer2 = setTimeout(() => setIntroPhase('circle'), 2400)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const scatterPositions = useMemo(() => {
    return Array.from({ length: TOTAL_IMAGES }).map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.65,
      opacity: 0.9,
    }))
  }, [])

  const [morphValue, setMorphValue] = useState(0)
  const [rotateValue, setRotateValue] = useState(0)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on('change', setMorphValue)
    const unsubscribeRotate = smoothScrollRotate.on('change', setRotateValue)
    const unsubscribeParallax = smoothMouseX.on('change', setParallaxValue)

    return () => {
      unsubscribeMorph()
      unsubscribeRotate()
      unsubscribeParallax()
    }
  }, [smoothMorph, smoothScrollRotate, smoothMouseX])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[92vh] md:min-h-[95vh] bg-transparent overflow-hidden flex flex-col justify-between pt-24 pb-12"
    >
      {/* Background Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black/80 to-black pointer-events-none" />

      {/* Main Content & Headline Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-8 md:pt-12 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-zinc-200 text-xs md:text-sm font-semibold mb-6 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>FINTECH STACK OPTIMIZER</span>
        </motion.div>

        {/* Dynamic Story Headlines */}
        <div className="min-h-[140px] md:min-h-[170px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {introPhase === 'scatter' ? (
              <motion.div
                key="headline-scatter"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight">
                  Your money is everywhere.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 font-medium mt-3">Let's organize it.</p>
              </motion.div>
            ) : introPhase === 'line' ? (
              <motion.div
                key="headline-line"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight">
                  Build your money stack.
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="headline-final"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
                  Build your money stack.{' '}
                  <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent block md:inline mt-1">
                    In 60 seconds.
                  </span>
                </h1>
                <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mt-5 leading-relaxed">
                  Get a personalized mix of banking, UPI, investing, rewards, and budgeting apps based on how you actually manage money.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push('/onboarding')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-white rounded-2xl shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.45)] hover:bg-zinc-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            <span>Build My Stack</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <p className="text-xs md:text-sm text-zinc-500 mt-4 font-medium flex items-center justify-center gap-3">
          <span>No spreadsheets</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          <span>No endless comparisons</span>
        </p>
      </div>

      {/* Cards Animation Canvas */}
      <div className="relative flex items-center justify-center w-full h-[380px] md:h-[460px] my-auto pointer-events-none">
        <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
          {FINTECH_BRANDS_20.map((brand, i) => {
            let target = {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            }

            if (introPhase === 'scatter') {
              target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.65, opacity: 0.9 }
            } else if (introPhase === 'line') {
              const lineSpacing = 68
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing
              const lineX = i * lineSpacing - lineTotalWidth / 2

              target = {
                x: lineX,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              }
            } else {
              const isMobile = containerSize.width < 768
              const minDimension = Math.min(containerSize.width, containerSize.height)

              // Circle positions
              const circleRadius = Math.min(minDimension * 0.32, 280)
              const circleAngle = (i / TOTAL_IMAGES) * 360
              const circleRad = (circleAngle * Math.PI) / 180

              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              }

              // Bottom Arc positions
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.4)
              const arcRadius = baseRadius * (isMobile ? 1.3 : 1.1)
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.22)
              const arcCenterY = arcApexY + arcRadius

              const spreadAngle = isMobile ? 95 : 130
              const startAngle = -90 - spreadAngle / 2
              const step = spreadAngle / (TOTAL_IMAGES - 1)

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1)
              const maxRotation = spreadAngle * 0.85
              const boundedRotation = -scrollProgress * maxRotation

              const currentArcAngle = startAngle + i * step + boundedRotation
              const arcRad = (currentArcAngle * Math.PI) / 180

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.3 : 1.65,
              }

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              }
            }

            return (
              <FlipCard
                key={brand.id}
                brand={brand}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
