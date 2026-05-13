/**
 * FRAMER TEMPLATE: 3D Tilt Card
 *
 * Card that tilts toward the cursor on hover with perspective.
 * Premium portfolio/SaaS card effect.
 *
 * Requires: framer-motion
 */

import { motion } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  /** Max tilt angle in degrees */
  maxTilt?: number
  className?: string
  style?: React.CSSProperties
}

export function TiltCard({
  children,
  maxTilt = 8,
  className = "",
  style,
}: TiltCardProps) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000, ...style }}
      whileHover={{
        rotateX: maxTilt,
        rotateY: -maxTilt,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <TiltCard maxTilt={10} className="glass-card">
    <h3>Premium Card</h3>
    <p>Tilts on hover</p>
  </TiltCard>
*/
