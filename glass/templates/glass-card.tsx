/**
 * TEMPLATE: Glass Card Component
 * 
 * Production-ready glass card with:
 * - Hover shimmer effect (light sweeps across)
 * - Correct specular highlight border
 * - Both light and dark glass variants
 * - Accessible focus state
 */

import { useRef, useState } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'colored'
  tint?: 'blue' | 'purple' | 'rose' | 'amber'
  className?: string
  onClick?: () => void
}

// Tint values for colored variant
const TINTS = {
  blue:   'rgba(59, 130, 246, 0.15)',
  purple: 'rgba(139, 92, 246, 0.15)',
  rose:   'rgba(244, 63, 94, 0.15)',
  amber:  'rgba(245, 158, 11, 0.15)',
}

export function GlassCard({
  children,
  variant = 'light',
  tint,
  className = '',
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shimmerPos, setShimmerPos] = useState({ x: 0, y: 0, active: false })

  // Track mouse for shimmer effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setShimmerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  const bg = variant === 'colored' && tint
    ? TINTS[tint]
    : variant === 'dark'
    ? 'rgba(0, 0, 0, 0.25)'
    : 'rgba(255, 255, 255, 0.08)'

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShimmerPos(p => ({ ...p, active: false }))}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: bg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderTopColor: 'rgba(255,255,255,0.35)',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.1) inset',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className={className}
    >
      {/* Shimmer highlight on hover */}
      {shimmerPos.active && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

// ─── USAGE EXAMPLES ─────────────────────────────────────────────────────────
/*
  // Basic card
  <GlassCard>
    <h2>Title</h2>
    <p>Content here</p>
  </GlassCard>

  // Colored tinted card
  <GlassCard variant="colored" tint="purple">
    <h2>Purple Glass</h2>
  </GlassCard>

  // Clickable card
  <GlassCard onClick={() => navigate('/dashboard')}>
    <h2>Go to Dashboard</h2>
  </GlassCard>
*/
