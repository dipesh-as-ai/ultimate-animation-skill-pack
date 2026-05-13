/**
 * PRESET: useReducedMotion() Hook
 *
 * Detects if the user prefers reduced motion (accessibility).
 * Use this in every animation component to respect user preferences.
 *
 * IMPORTANT: Every template in this skill pack should use this hook
 * to conditionally disable or simplify animations.
 */

import { useState, useEffect } from 'react'

/**
 * Returns true if the user has enabled "Reduce motion" in their OS settings.
 *
 * Usage:
 *   const prefersReduced = useReducedMotion()
 *   if (prefersReduced) return <StaticVersion />
 *
 *   // OR: adjust animation values
 *   const duration = prefersReduced ? 0 : 1.2
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mql.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

/**
 * GSAP-compatible: Call this at the top of any GSAP component.
 * Returns a wrapper that sets duration to 0 when reduced motion is on.
 *
 * Usage:
 *   const { duration, shouldAnimate } = useGsapReducedMotion()
 *   if (!shouldAnimate) return
 *   gsap.from(el, { y: 60, opacity: 0, duration })
 */
export function useGsapReducedMotion(normalDuration = 1) {
  const prefersReduced = useReducedMotion()
  return {
    shouldAnimate: !prefersReduced,
    duration: prefersReduced ? 0 : normalDuration,
  }
}

// ─── VANILLA JS (non-React) ──────────────────────────────────
/*
  // For GSAP without React:
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReduced) {
    gsap.from('.hero', { y: 60, opacity: 0, duration: 1.2 })
  }
*/
