/**
 * CSS TEMPLATE: Ambient Background — Living Page Foundation
 *
 * Drop-in background component that makes any page feel alive with
 * gradient mesh, floating orbs, and film grain — all CSS, zero JS, zero WebGL.
 *
 * Works as the foundation layer behind glass cards, content, and overlays.
 *
 * Usage:
 *   <AmbientBackground />                        // default dark aurora
 *   <AmbientBackground variant="cosmic" />        // purple nebula
 *   <AmbientBackground variant="minimal" />       // subtle, content-focused
 *   <AmbientBackground enableGrain={false} />      // no grain overlay
 */

import React from 'react'

type AmbientVariant = 'aurora' | 'cosmic' | 'nebula' | 'minimal'

interface AmbientBackgroundProps {
  /** Visual intensity preset */
  variant?: AmbientVariant
  /** Enable film grain texture overlay */
  enableGrain?: boolean
  /** Enable floating orbs */
  enableOrbs?: boolean
  /** Custom CSS class */
  className?: string
}

const variantStyles: Record<AmbientVariant, {
  background: string
  orb1: string; orb2: string; orb3: string
}> = {
  aurora: {
    background: '#050510',
    orb1: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(37,99,235,0.20), transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(219,39,119,0.15), transparent 70%)',
  },
  cosmic: {
    background: '#030308',
    orb1: 'radial-gradient(circle, rgba(124,77,255,0.30), transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(58,134,255,0.20), transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)',
  },
  nebula: {
    background: '#0a0510',
    orb1: 'radial-gradient(circle, rgba(168,85,247,0.28), transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(236,72,153,0.20), transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(251,146,60,0.12), transparent 70%)',
  },
  minimal: {
    background: '#050510',
    orb1: 'radial-gradient(circle, rgba(124,77,255,0.10), transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(58,134,255,0.08), transparent 70%)',
    orb3: 'none',
  },
}

export function AmbientBackground({
  variant = 'aurora',
  enableGrain = true,
  enableOrbs = true,
  className = '',
}: AmbientBackgroundProps) {
  const v = variantStyles[variant]

  return (
    <div
      className={`ambient-bg ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: v.background,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Floating gradient orbs with slow CSS drift */}
      {enableOrbs && (
        <>
          <div style={{
            position: 'absolute',
            width: '60vw', height: '60vw',
            top: '-15%', left: '-10%',
            background: v.orb1,
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'ambientOrb1 12s ease-in-out infinite',
            willChange: 'transform',
          }} />
          <div style={{
            position: 'absolute',
            width: '50vw', height: '50vw',
            bottom: '-10%', right: '-5%',
            background: v.orb2,
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'ambientOrb2 15s ease-in-out infinite',
            willChange: 'transform',
          }} />
          {v.orb3 !== 'none' && (
            <div style={{
              position: 'absolute',
              width: '35vw', height: '35vw',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: v.orb3,
              borderRadius: '50%',
              filter: 'blur(60px)',
              animation: 'ambientOrb3 18s ease-in-out infinite',
              willChange: 'transform',
            }} />
          )}
        </>
      )}

      {/* Film grain texture overlay */}
      {enableGrain && (
        <div style={{
          position: 'absolute',
          inset: '-200%',
          width: '400%', height: '400%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 10,
        }} />
      )}

      {/* Inject keyframes */}
      <style>{`
        @keyframes ambientOrb1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          33%      { transform: translateX(30px) translateY(-20px) scale(1.05); }
          66%      { transform: translateX(-20px) translateY(10px) scale(0.97); }
        }
        @keyframes ambientOrb2 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          40%      { transform: translateX(-25px) translateY(-15px) scale(1.03); }
          70%      { transform: translateX(15px) translateY(20px) scale(0.96); }
        }
        @keyframes ambientOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-45%, -55%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="ambient-bg"] div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
