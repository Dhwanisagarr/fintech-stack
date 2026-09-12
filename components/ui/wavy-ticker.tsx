'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useAnimationFrame } from 'framer-motion'

export interface WavyTickerProps {
  items: React.ReactNode[]
  speed?: number
  slowdownOnHover?: number
  waveStyle?: 'straight' | 'wavy'
  waveAmplitude?: number
  waveFrequency?: number
  itemSize?: number
  gap?: number
  padding?: number
  fadeEdges?: boolean
  fadeDistance?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function WavyTicker({
  items = [],
  speed = 45,
  slowdownOnHover = 0.25,
  waveStyle = 'wavy',
  waveAmplitude = 18,
  waveFrequency = 0.006,
  itemSize = 72,
  gap = 28,
  padding = 32,
  fadeEdges = true,
  fadeDistance = 12,
  direction = 'left',
  className = '',
}: WavyTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [itemWidths, setItemWidths] = useState<number[]>([])
  const [containerWidth, setContainerWidth] = useState(1200)

  // Track container dimensions
  useEffect(() => {
    if (!containerRef.current) return
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Measure item widths after render
  useEffect(() => {
    if (itemRefs.current.length > 0 && items.length > 0) {
      const widths = itemRefs.current
        .slice(0, items.length)
        .map((ref) => (ref ? ref.offsetWidth || itemSize : itemSize))
      setItemWidths(widths)
    }
  }, [items, itemSize])

  // Calculate dynamic height based on wave effect
  const calculatedHeight = useMemo(() => {
    const waveHeight = waveStyle === 'wavy' ? waveAmplitude * 2.2 : 0
    const baseHeight = itemSize + waveHeight + padding * 2
    return Math.max(80, baseHeight)
  }, [itemSize, waveAmplitude, padding, waveStyle])

  // Animation loop using Framer Motion's useAnimationFrame
  useAnimationFrame((time, delta) => {
    const effectiveSpeed = isHovered ? speed * slowdownOnHover : speed
    setOffset((prev) => prev + (effectiveSpeed * delta) / 1000)
  })

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  if (!items || items.length === 0) return null

  const widthsToUse = itemWidths.length === items.length ? itemWidths : items.map(() => itemSize)
  const totalWidth = widthsToUse.reduce((sum, width) => sum + width + gap, 0)
  const viewportWidth = containerWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200)

  // Calculate repeats needed for continuous seamless loop
  const repeats = Math.max(3, Math.ceil(viewportWidth / (totalWidth || 1)) + 2)

  const allItems = Array.from({ length: repeats }, () => items).flat()
  const allWidths = Array.from({ length: repeats }, () => widthsToUse).flat()

  const loopLength = totalWidth || 1
  const wrappedOffset = ((offset % loopLength) + loopLength) % loopLength
  const finalOffset = direction === 'left' ? -wrappedOffset : wrappedOffset - loopLength

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: Math.max(80, calculatedHeight),
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        ...(fadeEdges && {
          maskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}%, black ${100 - fadeDistance}%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${fadeDistance}%, black ${100 - fadeDistance}%, transparent 100%)`,
        }),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${gap}px`,
          position: 'absolute',
          top: '50%',
          transform: `translateX(${finalOffset}px) translateY(-50%)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {allItems.map((item, index) => {
          let position = 0
          for (let i = 0; i < index; i++) {
            position += (allWidths[i] || itemSize) + gap
          }

          const itemWidth = allWidths[index] || itemSize
          const waveOffset =
            waveStyle === 'wavy'
              ? Math.sin((position + offset * (direction === 'left' ? 1 : -1)) * waveFrequency) * waveAmplitude
              : 0

          const isOriginalItem = index < items.length

          return (
            <div
              key={`wavy-item-${index}`}
              ref={isOriginalItem ? (el) => { itemRefs.current[index] = el } : undefined}
              style={{
                minWidth: itemWidth,
                height: itemSize,
                flexShrink: 0,
                transform: `translateY(${waveOffset}px)`,
                willChange: 'transform',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
