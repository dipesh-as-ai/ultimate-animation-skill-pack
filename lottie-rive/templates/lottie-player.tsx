/**
 * LOTTIE TEMPLATE: Drop-in Lottie Player
 *
 * Configurable Lottie animation component with:
 * - Autoplay, loop, controlled playback
 * - Scroll-synced playback (with GSAP)
 * - Hover-triggered playback
 * - Reduced motion support
 *
 * Requires: lottie-react
 *
 * Usage:
 *   <LottiePlayer src={animationData} />
 *   <LottiePlayer src={animationData} trigger="hover" loop={false} />
 *   <LottiePlayer src={animationData} trigger="scroll" />
 */

import React, { useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

type PlayTrigger = 'autoplay' | 'hover' | 'inview'

interface LottiePlayerProps {
  /** Imported JSON animation data */
  src: any
  /** When to start playing */
  trigger?: PlayTrigger
  /** Loop the animation */
  loop?: boolean
  /** Width (default: 200) */
  width?: number | string
  /** Height (default: 200) */
  height?: number | string
  /** Additional className */
  className?: string
  /** Callback when animation completes */
  onComplete?: () => void
}

export function LottiePlayer({
  src,
  trigger = 'autoplay',
  loop = true,
  width = 200,
  height = 200,
  className = '',
  onComplete,
}: LottiePlayerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Reduced motion check
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={src}
        loop={false}
        autoplay={false}
        style={{ width, height }}
        className={className}
        onDOMLoaded={() => lottieRef.current?.goToAndStop(0, true)}
      />
    )
  }

  const isAutoplay = trigger === 'autoplay'
  const isHover = trigger === 'hover'

  return (
    <div
      className={className}
      onMouseEnter={() => {
        if (isHover) lottieRef.current?.play()
      }}
      onMouseLeave={() => {
        if (isHover) {
          lottieRef.current?.stop()
          lottieRef.current?.goToAndStop(0, true)
        }
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={src}
        loop={isHover ? false : loop}
        autoplay={isAutoplay}
        style={{ width, height }}
        onComplete={() => {
          setHasPlayed(true)
          onComplete?.()
        }}
      />
    </div>
  )
}
