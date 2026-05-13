/**
 * GSAP TEMPLATE: Scroll-Driven Video — Apple-Style Frame Scrub
 *
 * Video plays forward/backward as user scrolls. Frame-accurate.
 * The signature Apple product page pattern.
 *
 * Requires: gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   <ScrollVideo src="/hero-sequence.mp4" />
 *   <ScrollVideo src="/product.mp4" startAt={0.3} endAt={0.8} />
 *
 * TIP: Use short (5-15s), high-quality MP4 videos. Preload with
 * <link rel="preload" as="video" href="/video.mp4"> for instant start.
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollVideoProps {
  /** Path to MP4 video */
  src: string
  /** Scroll height multiplier (default: 3 = 3x viewport height of scroll) */
  scrollLength?: number
  /** Start playback at this fraction of video (0–1) */
  startAt?: number
  /** End playback at this fraction of video (0–1) */
  endAt?: number
  /** Border radius */
  borderRadius?: number
  /** Sticky position from top */
  stickyTop?: number
  className?: string
  style?: React.CSSProperties
}

export function ScrollVideo({
  src,
  scrollLength = 3,
  startAt = 0,
  endAt = 1,
  borderRadius = 0,
  stickyTop = 0,
  className = '',
  style,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    // Wait for video metadata to load
    const onLoaded = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: `+=${window.innerHeight * scrollLength}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress
            const targetTime = duration * (startAt + progress * (endAt - startAt))
            video.currentTime = Math.min(Math.max(targetTime, 0), duration)
          },
        })
      }, container)

      return () => ctx.revert()
    }

    if (video.readyState >= 1) {
      onLoaded()
    } else {
      video.addEventListener('loadedmetadata', onLoaded, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [src, scrollLength, startAt, endAt])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: '100vh',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'sticky',
          top: stickyTop,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          borderRadius,
          display: 'block',
        }}
      />
    </div>
  )
}
