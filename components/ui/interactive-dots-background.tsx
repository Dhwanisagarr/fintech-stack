'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'

export interface InteractiveDotsBackgroundProps {
  dotColor?: string
  dotSize?: number
  spacing?: number
  proximityRadius?: number
  maxOpacity?: number
  backgroundOpacity?: number
  gridType?: 'dots-lines' | 'lines' | 'dots' | 'plus' | 'plus-lines'
  className?: string
}

export default function InteractiveDotsBackground({
  dotColor = '#52525b', // zinc-600
  dotSize = 4,
  spacing = 56,
  proximityRadius = 180,
  maxOpacity = 0.85,
  backgroundOpacity = 0.12,
  gridType = 'dots-lines',
  className = '',
}: InteractiveDotsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateDimensions = () => {
      setDimensions({
        width: el.offsetWidth || window.innerWidth,
        height: el.offsetHeight || window.innerHeight,
      })
    }

    updateDimensions()
    const observer = new ResizeObserver(updateDimensions)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const dots = useMemo(() => {
    const dotsArray = []
    const cols = Math.ceil(dimensions.width / spacing) + 1
    const rows = Math.ceil(dimensions.height / spacing) + 1
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + spacing / 2
        const y = row * spacing + spacing / 2
        dotsArray.push({ x, y, key: `${col}-${row}` })
      }
    }
    return dotsArray
  }, [dimensions.width, dimensions.height, spacing])

  const getOpacity = (dotX: number, dotY: number) => {
    const distance = Math.sqrt(Math.pow(mousePos.x - dotX, 2) + Math.pow(mousePos.y - dotY, 2))
    if (distance > proximityRadius) return backgroundOpacity
    const hoverOpacity = (1 - distance / proximityRadius) * maxOpacity
    return Math.max(backgroundOpacity, hoverOpacity)
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      className={className}
    >
      {/* SVG Grid Lines */}
      {(gridType === 'dots-lines' || gridType === 'lines') && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: Math.ceil(dimensions.width / spacing) + 1 }).map((_, i) => {
            const x = i * spacing + spacing / 2
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={dimensions.height}
                stroke={dotColor}
                strokeWidth={1}
                opacity={backgroundOpacity}
              />
            )
          })}
          {Array.from({ length: Math.ceil(dimensions.height / spacing) + 1 }).map((_, i) => {
            const y = i * spacing + spacing / 2
            return (
              <line
                key={`h-${i}`}
                x1={0}
                y1={y}
                x2={dimensions.width}
                y2={y}
                stroke={dotColor}
                strokeWidth={1}
                opacity={backgroundOpacity}
              />
            )
          })}
        </svg>
      )}

      {/* Dots */}
      {(gridType === 'dots-lines' || gridType === 'dots') &&
        dots.map((dot) => {
          const opacity = getOpacity(dot.x, dot.y)
          return (
            <div
              key={dot.key}
              style={{
                position: 'absolute',
                left: dot.x,
                top: dot.y,
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: opacity > backgroundOpacity ? '#ffffff' : dotColor,
                opacity,
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.15s ease-out, background-color 0.15s ease-out',
                pointerEvents: 'none',
                boxShadow: opacity > 0.4 ? '0 0 8px rgba(255, 255, 255, 0.6)' : 'none',
              }}
            />
          )
        })}
    </div>
  )
}
