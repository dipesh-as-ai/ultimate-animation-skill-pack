/**
 * GSAP TEMPLATE: Text Marquee — Infinite Scrolling Text Banner
 *
 * Award-site signature: continuous horizontal text scroll.
 * Used for brand statements, section dividers, decorative headlines.
 *
 * Requires: gsap
 *
 * Usage:
 *   <TextMarquee text="Design is intelligence made visible" />
 *   <TextMarquee text="PORTFOLIO 2026" speed={40} separator="✦" />
 *   <TextMarquee text="Scroll down" direction="right" />
 */

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface TextMarqueeProps {
  /** Text to repeat in the marquee */
  text: string
  /** Scroll speed in px/s (default: 50) */
  speed?: number
  /** Direction of scroll */
  direction?: 'left' | 'right'
  /** Character between repetitions (default: " — ") */
  separator?: string
  /** Number of text copies (default: auto-calculated) */
  repeat?: number
  /** Font size */
  fontSize?: string
  /** Text color */
  color?: string
  /** Font weight */
  fontWeight?: number
  /** Uppercase */
  uppercase?: boolean
  /** Letter spacing */
  letterSpacing?: string
  className?: string
}

export function TextMarquee({
  text,
  speed = 50,
  direction = 'left',
  separator = ' — ',
  repeat = 4,
  fontSize = 'clamp(2rem, 5vw, 4rem)',
  color = 'rgba(255, 255, 255, 0.08)',
  fontWeight = 700,
  uppercase = true,
  letterSpacing = '0.05em',
  className = '',
}: TextMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const fullText = Array(repeat).fill(`${text}${separator}`).join('')
    const textWidth = track.scrollWidth / 2

    const duration = textWidth / speed

    const ctx = gsap.context(() => {
      gsap.fromTo(track, {
        x: direction === 'left' ? 0 : -textWidth,
      }, {
        x: direction === 'left' ? -textWidth : 0,
        duration,
        ease: 'none',
        repeat: -1,
      })
    }, track)

    return () => ctx.revert()
  }, [text, speed, direction, separator, repeat])

  const repeated = Array(repeat * 2).fill(`${text}${separator}`).join('')

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontSize,
          fontWeight,
          color,
          textTransform: uppercase ? 'uppercase' : 'none',
          letterSpacing,
          willChange: 'transform',
          userSelect: 'none',
        }}
      >
        {repeated}
      </div>
    </div>
  )
}
