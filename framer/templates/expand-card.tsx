/**
 * FRAMER TEMPLATE: Expand Card — Layout Animation
 *
 * Click to expand, click to collapse. Uses Framer's layout animation
 * for smooth DOM reflow without measuring anything manually.
 *
 * Requires: framer-motion
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ExpandCardProps {
  title: string
  body: string
  className?: string
}

export function ExpandCard({ title, body, className = "" }: ExpandCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className={className}
      style={{
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: 16,
      }}
      initial={{ borderRadius: 16 }}
      transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      <motion.h3 layout="position" style={{ margin: 0 }}>
        {title}
      </motion.h3>

      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: 12 }}
          >
            {body}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <ExpandCard
    title="What is glassmorphism?"
    body="Glassmorphism is a design trend that uses frosted glass effects..."
    className="glass-card"
  />
*/
