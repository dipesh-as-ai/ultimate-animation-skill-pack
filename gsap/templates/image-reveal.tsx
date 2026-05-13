/**
 * GSAP TEMPLATE: Image Reveal — Masked Wipe
 *
 * Image revealed by a sliding clip-path mask triggered on scroll.
 * Premium portfolio/case study pattern.
 *
 * Requires: gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   <ImageReveal src="/hero.jpg" alt="Project" />
 *   <ImageReveal src="/hero.jpg" direction="left" duration={1.2} />
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealDirection = 'left' | 'right' | 'up' | 'down'

interface ImageRevealProps {
  /** Image source URL */
  src: string
  alt?: string
  /** Direction the mask wipes from */
  direction?: RevealDirection
  /** Animation duration */
  duration?: number
  /** Image scale at start (zooms out during reveal) */
  startScale?: number
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string
  /** Border radius */
  borderRadius?: number
  className?: string
  style?: React.CSSProperties
}

const clipPaths: Record<RevealDirection, { from: string; to: string }> = {
  left:  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
  right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  up:    { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  down:  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
}

export function ImageReveal({
  src,
  alt = '',
  direction = 'left',
  duration = 1.0,
  startScale = 1.3,
  aspectRatio = '16/9',
  borderRadius = 12,
  className = '',
  style,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const clips = clipPaths[direction]

    const ctx = gsap.context(() => {
      // Mask wipe
      gsap.fromTo(container, {
        clipPath: clips.from,
      }, {
        clipPath: clips.to,
        duration,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      })

      // Image scale (Ken Burns feel)
      gsap.fromTo(img, {
        scale: startScale,
      }, {
        scale: 1,
        duration: duration + 0.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [src, direction, duration, startScale])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: 'hidden',
        borderRadius,
        aspectRatio,
        clipPath: clipPaths[direction].from,
        willChange: 'clip-path',
        ...style,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
