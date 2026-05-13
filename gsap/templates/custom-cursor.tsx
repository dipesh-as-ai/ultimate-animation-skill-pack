/**
 * GSAP TEMPLATE: Custom Cursor
 *
 * Dual-element cursor: a small dot that follows instantly
 * and a larger ring that follows with lag. Scales up on hoverable elements.
 *
 * Requires: gsap
 *
 * Add this CSS to your globals:
 *
 * .cursor-dot {
 *   width: 6px; height: 6px;
 *   background: white;
 *   border-radius: 50%;
 *   position: fixed; top: 0; left: 0;
 *   pointer-events: none;
 *   z-index: 9999;
 *   transform: translate(-50%, -50%);
 *   mix-blend-mode: difference;
 * }
 * .cursor-ring {
 *   width: 36px; height: 36px;
 *   border: 1.5px solid rgba(255,255,255,0.6);
 *   border-radius: 50%;
 *   position: fixed; top: 0; left: 0;
 *   pointer-events: none;
 *   z-index: 9998;
 *   transform: translate(-50%, -50%);
 *   mix-blend-mode: difference;
 * }
 */

import { useEffect } from "react"
import { gsap } from "gsap"

/**
 * Hook: initializes the custom cursor system.
 * Call once in your root layout component.
 *
 * Requires two empty divs in your DOM:
 *   <div className="cursor-dot" />
 *   <div className="cursor-ring" />
 */
export function useCustomCursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot")
    const ring = document.querySelector<HTMLElement>(".cursor-ring")

    if (!dot || !ring) {
      console.warn("Custom cursor: .cursor-dot or .cursor-ring not found in DOM")
      return
    }

    const onMove = (e: MouseEvent) => {
      // Dot follows instantly
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" })
      // Ring follows with smooth lag
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" })
    }

    window.addEventListener("mousemove", onMove)

    // Scale up on hoverable elements
    const hoverables = document.querySelectorAll<HTMLElement>("a, button, [data-cursor-hover]")
    const enterHandler = () => gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power2.out" })
    const leaveHandler = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" })

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enterHandler)
      el.addEventListener("mouseleave", leaveHandler)
    })

    // Hide system cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", onMove)
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enterHandler)
        el.removeEventListener("mouseleave", leaveHandler)
      })
      document.body.style.cursor = ""
    }
  }, [])
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  // In your root layout:
  import { useCustomCursor } from './custom-cursor'

  export default function Layout({ children }) {
    useCustomCursor()
    return (
      <>
        <div className="cursor-dot" />
        <div className="cursor-ring" />
        {children}
      </>
    )
  }
*/
