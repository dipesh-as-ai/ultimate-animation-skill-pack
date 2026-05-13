/**
 * ULTIMATE ANIMATION SKILL PACK — RESPONSIVE MOTION
 *
 * Adapts animation values to screen size and device capabilities.
 * Mobile: Reduced distances, no cursor/parallax, lower DPR
 * Tablet: Medium values, no cursor, basic parallax
 * Desktop: Full experience
 *
 * Usage:
 *   const m = useResponsiveMotion()
 *   gsap.from(el, { y: m.y, duration: m.duration })
 *   if (m.enableCursor) initCustomCursor()
 */

import { useState, useEffect, useMemo } from 'react'

export const breakpoints = { mobile: 480, tablet: 768, laptop: 1024, desktop: 1440 }

type DeviceTier = 'mobile' | 'tablet' | 'desktop'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
}

export function useDeviceTier(): DeviceTier {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.laptop}px)`)
  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

interface MotionConfig {
  y: number; x: number; duration: number; stagger: number
  enableCursor: boolean; enableParallax: boolean; enableShaders: boolean
  enableParticles: boolean; enableBloom: boolean; enableLenis: boolean
  dpr: [number, number]; particleCount: number
  tier: DeviceTier; isMobile: boolean
}

const configs: Record<DeviceTier, MotionConfig> = {
  mobile: {
    y: 30, x: 20, duration: 0.5, stagger: 0.06,
    enableCursor: false, enableParallax: false, enableShaders: false,
    enableParticles: true, enableBloom: false, enableLenis: false,
    dpr: [1, 1.5], particleCount: 30, tier: 'mobile', isMobile: true,
  },
  tablet: {
    y: 45, x: 35, duration: 0.6, stagger: 0.08,
    enableCursor: false, enableParallax: true, enableShaders: true,
    enableParticles: true, enableBloom: false, enableLenis: true,
    dpr: [1, 1.5], particleCount: 50, tier: 'tablet', isMobile: false,
  },
  desktop: {
    y: 60, x: 60, duration: 0.8, stagger: 0.1,
    enableCursor: true, enableParallax: true, enableShaders: true,
    enableParticles: true, enableBloom: true, enableLenis: true,
    dpr: [1, 2], particleCount: 80, tier: 'desktop', isMobile: false,
  },
}

export function useResponsiveMotion(): MotionConfig {
  const tier = useDeviceTier()
  return useMemo(() => configs[tier], [tier])
}

/** Vanilla JS version for non-React contexts */
export function getResponsiveMotion(): MotionConfig {
  if (typeof window === 'undefined') return configs.desktop
  const w = window.innerWidth
  if (w <= breakpoints.tablet) return configs.mobile
  if (w <= breakpoints.laptop) return configs.tablet
  return configs.desktop
}
