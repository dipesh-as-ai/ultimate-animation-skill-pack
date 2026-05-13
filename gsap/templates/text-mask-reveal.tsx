/**
 * GSAP TEMPLATE: Masked Text Reveal
 *
 * Each line clips in from bottom with a sliding mask — Apple keynote style.
 * Professional headline reveal for hero sections and section headings.
 *
 * Requires: gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   <MaskedTextReveal as="h1">Your Headline Here</MaskedTextReveal>
 *   <MaskedTextReveal as="h2" delay={0.3}>Staggered subtitle</MaskedTextReveal>
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MaskedTextRevealProps {
  children: string
  /** HTML tag */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Duration of each line reveal (seconds) */
  duration?: number
  /** Stagger between lines (seconds) */
  stagger?: number
  /** Trigger on scroll (default: true) */
  triggerOnScroll?: boolean
  className?: string
  style?: React.CSSProperties
}

export function MaskedTextReveal({
  children,
  as: Tag = 'h1',
  delay = 0,
  duration = 0.8,
  stagger = 0.12,
  triggerOnScroll = true,
  className = '',
  style,
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lines = container.querySelectorAll('.mask-line-inner')
    if (!lines.length) return

    const animConfig: gsap.TweenVars = {
      yPercent: 110,
      duration,
      stagger,
      delay,
      ease: 'expo.out',
    }

    if (triggerOnScroll) {
      animConfig.scrollTrigger = {
        trigger: container,
        start: 'top 85%',
        once: true,
      }
    }

    const ctx = gsap.context(() => {
      gsap.from(lines, animConfig)
    }, container)

    return () => ctx.revert()
  }, [children, delay, duration, stagger, triggerOnScroll])

  // Split text by newlines or <br> — wrap each line in a mask container
  const textLines = children.split(/\n|\\n/).filter(Boolean)

  return (
    // @ts-expect-error — dynamic tag
    <Tag
      ref={containerRef}
      className={className}
      style={{ ...style, willChange: 'transform' }}
    >
      {textLines.map((line, i) => (
        <span
          key={i}
          className="mask-line"
          style={{
            display: 'block',
            overflow: 'hidden',
            lineHeight: 1.1,
          }}
        >
          <span
            className="mask-line-inner"
            style={{
              display: 'block',
              willChange: 'transform',
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
