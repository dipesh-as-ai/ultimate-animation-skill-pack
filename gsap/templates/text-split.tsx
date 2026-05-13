/**
 * GSAP TEMPLATE: Text Split Animation
 *
 * Splits text into characters or words and animates them in with stagger.
 * Uses split-type (free alternative to GSAP Club SplitText).
 *
 * Requires: gsap, split-type, gsap/ScrollTrigger
 * Install:  npm install split-type
 */

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

type SplitMode = "chars" | "words" | "lines"

interface TextSplitProps {
  children: string
  /** What to split into */
  mode?: SplitMode
  /** Stagger delay between elements */
  stagger?: number
  /** Total animation duration per element */
  duration?: number
  /** Distance from Y */
  fromY?: number
  /** Trigger on scroll or immediately */
  triggerOnScroll?: boolean
  /** HTML tag to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
  className?: string
  style?: React.CSSProperties
}

export function TextSplit({
  children,
  mode = "chars",
  stagger = 0.02,
  duration = 0.6,
  fromY = 80,
  triggerOnScroll = true,
  as: Tag = "div",
  className = "",
  style,
}: TextSplitProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split the text
    const splitTypes = mode === "chars" ? "chars,words" : mode
    const text = new SplitType(el, { types: splitTypes as any })

    const targets =
      mode === "chars" ? text.chars :
      mode === "words" ? text.words :
      text.lines

    if (!targets || targets.length === 0) return

    const animConfig: gsap.TweenVars = {
      opacity: 0,
      y: fromY,
      rotateX: mode === "chars" ? -90 : 0,
      stagger,
      duration,
      ease: mode === "chars" ? "back.out(1.7)" : "expo.out",
    }

    if (triggerOnScroll) {
      animConfig.scrollTrigger = {
        trigger: el,
        start: "top 85%",
        once: true,
      }
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, animConfig)
    }, el)

    return () => {
      ctx.revert()
      text.revert()
    }
  }, [children, mode, stagger, duration, fromY, triggerOnScroll])

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={className} style={{ ...style, willChange: "transform, opacity" }}>
      {children}
    </Tag>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  // Character-by-character hero headline
  <TextSplit as="h1" mode="chars" stagger={0.02} fromY={60}>
    Shadow Monarch
  </TextSplit>

  // Word-by-word subtitle
  <TextSplit as="p" mode="words" stagger={0.07} fromY={40}>
    Arise from the shadows and claim your throne
  </TextSplit>
*/
