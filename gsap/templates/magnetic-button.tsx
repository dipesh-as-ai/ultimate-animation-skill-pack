/**
 * GSAP TEMPLATE: Magnetic Button
 *
 * Button that gets pulled toward the cursor — premium portfolio effect.
 * Uses GSAP for smooth interpolation with elastic snap-back.
 *
 * Requires: gsap
 */

import { useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"

interface MagneticButtonProps {
  children: React.ReactNode
  /** Pull strength — 0.1 (subtle) to 1.0 (strong). Default 0.4 */
  strength?: number
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function MagneticButton({
  children,
  strength = 0.4,
  className = "",
  style,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const bounds = el.getBoundingClientRect()
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY

      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      })
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [strength])

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </button>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  <MagneticButton strength={0.35} onClick={() => console.log('click')}>
    Hover Me
  </MagneticButton>
*/
