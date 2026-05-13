/**
 * FRAMER MOTION VARIANTS — Reusable animation states
 * Import: import { fadeUp, staggerContainer } from '@/presets/variants'
 */

// ─── ENTRANCE VARIANTS ──────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

// ─── STAGGER VARIANTS ────────────────────────────────────────────────────────

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

export const staggerContainerTight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

// ─── PAGE TRANSITIONS ────────────────────────────────────────────────────────

export const pageSlide = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  enter: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" } },
}

export const pageFade = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// ─── HOVER / GESTURE ─────────────────────────────────────────────────────────

export const hoverLift = {
  rest: { y: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  hover: { y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: { duration: 0.3 } },
}

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: "spring", stiffness: 500, damping: 30 } },
}

// ─── EXIT VARIANTS ───────────────────────────────────────────────────────────

export const exitUp = {
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } },
}

export const exitScale = {
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
}
