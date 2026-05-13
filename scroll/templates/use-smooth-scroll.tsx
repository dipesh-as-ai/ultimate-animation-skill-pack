/**
 * SCROLL TEMPLATE: useSmoothScroll Hook
 *
 * Drop-in Lenis + GSAP ScrollTrigger integration hook.
 * Handles setup, sync, cleanup, and reduced-motion check.
 *
 * Requires: lenis, gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   function Layout({ children }) {
 *     const lenis = useSmoothScroll()
 *     return <main>{children}</main>
 *   }
 */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollOptions {
  /** Scroll duration — higher = smoother, slower (default: 1.2) */
  duration?: number
  /** Disable on mobile (default: true — falls back to native) */
  disableOnMobile?: boolean
  /** Respect prefers-reduced-motion (default: true) */
  respectReducedMotion?: boolean
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const {
    duration = 1.2,
    disableOnMobile = true,
    respectReducedMotion = true,
  } = options

  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // Skip on mobile if configured
    if (disableOnMobile && window.innerWidth <= 768) {
      return
    }

    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for better frame sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [duration, disableOnMobile, respectReducedMotion])

  return lenisRef
}

/**
 * Utility: Scroll to element or position using Lenis.
 *
 * Usage:
 *   const lenis = useSmoothScroll()
 *   scrollTo(lenis, '#section-2')
 *   scrollTo(lenis, 0) // scroll to top
 */
export function scrollTo(
  lenisRef: React.RefObject<Lenis | null>,
  target: string | number,
  options: { offset?: number; duration?: number; immediate?: boolean } = {}
) {
  if (!lenisRef.current) return
  lenisRef.current.scrollTo(target, {
    offset: options.offset ?? -80,
    duration: options.duration ?? 1.5,
    immediate: options.immediate ?? false,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}
