/**
 * CSS TEMPLATE: Micro-Interactions Library
 *
 * React components for common micro-interactions:
 * button press, card lift, link underline, icon rotate,
 * input glow, toggle switch, and spotlight hover.
 *
 * All pure CSS transitions — no JS animation libraries needed.
 *
 * Usage:
 *   <ButtonPress>Click me</ButtonPress>
 *   <CardLift>Card content</CardLift>
 *   <SpotlightCard>Hover me</SpotlightCard>
 */

import React, { useRef, useCallback } from 'react'

// ─── BUTTON PRESS ────────────────────────────────────────────────────────────
interface ButtonPressProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function ButtonPress({ children, style, ...props }: ButtonPressProps) {
  return (
    <button
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.97)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      {...props}
    >
      {children}
    </button>
  )
}

// ─── CARD LIFT ───────────────────────────────────────────────────────────────
interface CardLiftProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function CardLift({ children, className, style }: CardLiftProps) {
  return (
    <div
      className={className}
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {children}
    </div>
  )
}

// ─── SPOTLIGHT CARD ──────────────────────────────────────────────────────────
interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Spotlight radius in px */
  radius?: number
}

export function SpotlightCard({ children, className, style, radius = 200 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left - radius / 2}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top - radius / 2}px`)
    ref.current.style.setProperty('--spotlight-opacity', '1')
  }, [radius])

  const onMouseLeave = useCallback(() => {
    ref.current?.style.setProperty('--spotlight-opacity', '0')
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute',
        width: radius, height: radius,
        background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent)',
        borderRadius: '50%',
        transform: 'translate(var(--mouse-x, -50%), var(--mouse-y, -50%))',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
        opacity: 'var(--spotlight-opacity, 0)',
      }} />
      {children}
    </div>
  )
}
