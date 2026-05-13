/**
 * GSAP TEMPLATE: Batch Stagger Grid
 *
 * Reveals a grid of cards with staggered timing as they scroll into view.
 * Uses ScrollTrigger.batch() for optimal performance on large grids.
 *
 * Requires: gsap (with ScrollTrigger registered)
 */

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StaggerGridProps {
  children: React.ReactNode
  /** CSS selector for child items to stagger */
  itemSelector?: string
  /** Delay between each item (seconds) */
  stagger?: number
  /** Animation duration per item */
  duration?: number
  /** Distance to travel from (px) */
  fromY?: number
  className?: string
  style?: React.CSSProperties
}

export function StaggerGrid({
  children,
  itemSelector = ".stagger-item",
  stagger = 0.12,
  duration = 0.9,
  fromY = 80,
  className = "",
  style,
}: StaggerGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(itemSelector, {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: fromY,
            stagger,
            duration,
            ease: "expo.out",
          })
        },
        start: "top 88%",
        once: true,
      })
    }, container)

    return () => ctx.revert()
  }, [itemSelector, stagger, duration, fromY])

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <StaggerGrid itemSelector=".card" stagger={0.1}>
    {cards.map(card => (
      <div key={card.id} className="card stagger-item">
        {card.content}
      </div>
    ))}
  </StaggerGrid>
*/
