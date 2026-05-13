/**
 * FRAMER TEMPLATE: Page Transition — Next.js App Router
 *
 * Wraps page content with enter/exit animations.
 * Use as app/template.tsx in Next.js App Router.
 *
 * Requires: framer-motion
 */

"use client"
import { motion } from "framer-motion"

type TransitionStyle = "slide" | "fade" | "scale" | "blur"

interface PageTransitionProps {
  children: React.ReactNode
  /** Transition style */
  style?: TransitionStyle
}

const transitionVariants: Record<TransitionStyle, {
  initial: Record<string, any>
  enter: Record<string, any>
  exit: Record<string, any>
}> = {
  slide: {
    initial: { opacity: 0, y: 20, filter: "blur(8px)" },
    enter: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(8px)" },
  },
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(20px)" },
    enter: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(20px)" },
  },
}

export function PageTransition({
  children,
  style: transitionStyle = "slide",
}: PageTransitionProps) {
  const variants = transitionVariants[transitionStyle]

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── USAGE (Next.js App Router) ──────────────────────────────────────────────
/*
  // app/template.tsx
  import PageTransition from '@/components/page-transition'

  export default function Template({ children }: { children: React.ReactNode }) {
    return <PageTransition style="slide">{children}</PageTransition>
  }
*/
