/**
 * FRAMER TEMPLATE: Stagger Grid
 *
 * Container + item variant pair for staggered grid/list entrances.
 * Children animate in one by one with configurable delay.
 *
 * Requires: framer-motion
 */

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface StaggerGridProps {
  children: React.ReactNode
  /** Delay between each child (seconds) */
  stagger?: number
  /** Initial delay before first child */
  delayChildren?: number
  className?: string
  style?: React.CSSProperties
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function StaggerGrid({
  children,
  stagger = 0.1,
  delayChildren = 0.2,
  className = "",
  style,
}: StaggerGridProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "", style }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <StaggerGrid stagger={0.12} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
    {cards.map(card => (
      <StaggerItem key={card.id}>
        <Card>{card.content}</Card>
      </StaggerItem>
    ))}
  </StaggerGrid>
*/
