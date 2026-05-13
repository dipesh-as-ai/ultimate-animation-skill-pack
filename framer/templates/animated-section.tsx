/**
 * FRAMER TEMPLATE: AnimatedSection — Scroll-Triggered Entrance
 *
 * Wraps any content to animate it in when it scrolls into view.
 * Uses useInView for lightweight viewport detection.
 *
 * Requires: framer-motion
 */

import { motion, useInView, type Variant } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  /** Animation variant — default fadeUp */
  variant?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "blurIn"
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Only animate once */
  once?: boolean
  className?: string
  style?: React.CSSProperties
}

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
}

export function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  once = true,
  className = "",
  style,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
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
  <AnimatedSection variant="fadeUp">
    <h2>This fades up on scroll</h2>
  </AnimatedSection>

  <AnimatedSection variant="blurIn" delay={0.2}>
    <p>This blurs in with a delay</p>
  </AnimatedSection>
*/
