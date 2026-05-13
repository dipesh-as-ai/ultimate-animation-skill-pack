/**
 * GSAP TEMPLATE: useReveal() — Scroll-Triggered Element Reveal
 *
 * Elements fade/slide in as they enter the viewport.
 * The most-used GSAP pattern on modern websites.
 *
 * Requires: gsap (with ScrollTrigger registered)
 */

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  x?: number
  duration?: number
  ease?: string
  start?: string
  delay?: number
}

/**
 * Hook: attach to any element to reveal it on scroll.
 *
 * Usage:
 *   const ref = useReveal()
 *   <div ref={ref}>I fade in on scroll</div>
 *
 *   const ref = useReveal({ y: 80, duration: 1.2 })
 */
export function useReveal(options: RevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const {
    y = 60,
    x = 0,
    duration = 1,
    ease = "expo.out",
    start = "top 85%",
    delay = 0,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        x,
        opacity: 0,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [y, x, duration, ease, start, delay])

  return ref
}

// ─── USAGE EXAMPLES ──────────────────────────────────────────────────────────
/*
  import { useReveal } from './scroll-reveal'

  function Section() {
    const titleRef = useReveal({ y: 40, duration: 0.8 })
    const cardRef  = useReveal({ y: 80, delay: 0.2 })

    return (
      <section>
        <h2 ref={titleRef}>Hello</h2>
        <div ref={cardRef}>Card content</div>
      </section>
    )
  }
*/
