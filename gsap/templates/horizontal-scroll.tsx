/**
 * GSAP TEMPLATE: Horizontal Scroll Section
 *
 * Pins a section and scrolls its content horizontally as the user scrolls vertically.
 * Common on portfolio sites, product showcases, and timelines.
 *
 * Requires: gsap (with ScrollTrigger registered)
 */

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  /** Extra scroll distance multiplier (default: 1) */
  scrollMultiplier?: number
}

export function HorizontalScroll({
  children,
  className = "",
  scrollMultiplier = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth * scrollMultiplier}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [scrollMultiplier])

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <HorizontalScroll>
    <div style={{ width: '100vw', padding: '4rem' }}>Section 1</div>
    <div style={{ width: '100vw', padding: '4rem' }}>Section 2</div>
    <div style={{ width: '100vw', padding: '4rem' }}>Section 3</div>
    <div style={{ width: '100vw', padding: '4rem' }}>Section 4</div>
  </HorizontalScroll>
*/
