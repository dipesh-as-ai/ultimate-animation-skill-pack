/**
 * GSAP TEMPLATE: Animated Counter — Slot-Machine Style Digits
 *
 * Counts up when scrolled into view with smooth number animation.
 * Supports prefix, suffix, separator, and decimal formatting.
 *
 * Requires: gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   <AnimatedCounter end={10000} suffix="+" />
 *   <AnimatedCounter end={99} suffix="%" duration={1.5} />
 *   <AnimatedCounter end={84200} prefix="$" separator="," />
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  /** Target number */
  end: number
  /** Starting number (default: 0) */
  start?: number
  /** Animation duration in seconds */
  duration?: number
  /** Text before number */
  prefix?: string
  /** Text after number */
  suffix?: string
  /** Thousands separator */
  separator?: string
  /** Decimal places */
  decimals?: number
  /** Easing function */
  ease?: string
  /** HTML tag */
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  style?: React.CSSProperties
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  ease = 'power2.out',
  as: Tag = 'span',
  className = '',
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: start }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: end,
            duration,
            ease,
            onUpdate: () => {
              const value = decimals > 0
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toString()

              const formatted = decimals > 0
                ? value.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
                : value.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

              el.textContent = `${prefix}${formatted}${suffix}`
            },
          })
        },
      })
    }, el)

    // Set initial display
    el.textContent = `${prefix}${start}${suffix}`

    return () => ctx.revert()
  }, [end, start, duration, prefix, suffix, separator, decimals, ease])

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {prefix}{start}{suffix}
    </Tag>
  )
}
