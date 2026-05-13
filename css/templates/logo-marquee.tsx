/**
 * CSS TEMPLATE: Logo Marquee — Infinite Logo Carousel
 *
 * Smooth, auto-scrolling logo banner for "Trusted by" sections.
 * Pure CSS animation — no JS needed. Zero bundle impact.
 *
 * Usage:
 *   <LogoMarquee logos={[
 *     { src: '/logos/stripe.svg', alt: 'Stripe' },
 *     { src: '/logos/vercel.svg', alt: 'Vercel' },
 *     { src: '/logos/linear.svg', alt: 'Linear' },
 *   ]} />
 *   <LogoMarquee logos={logos} speed={40} direction="right" />
 */

import React from 'react'

interface Logo {
  src: string
  alt: string
}

interface LogoMarqueeProps {
  logos: Logo[]
  /** Animation duration in seconds (lower = faster) */
  speed?: number
  /** Direction */
  direction?: 'left' | 'right'
  /** Logo height in px */
  logoHeight?: number
  /** Gap between logos in px */
  gap?: number
  /** Pause on hover */
  pauseOnHover?: boolean
  className?: string
}

export function LogoMarquee({
  logos,
  speed = 30,
  direction = 'left',
  logoHeight = 32,
  gap = 64,
  pauseOnHover = true,
  className = '',
}: LogoMarqueeProps) {
  const animDirection = direction === 'left' ? 'normal' : 'reverse'
  const duration = logos.length * (speed / 10)

  // Double the logos for seamless loop
  const allLogos = [...logos, ...logos]

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap,
          width: 'max-content',
          animation: `logoMarquee ${duration}s linear infinite`,
          animationDirection: animDirection,
          ...(pauseOnHover ? {} : {}),
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = 'running'
        }}
      >
        {allLogos.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            style={{
              height: logoHeight,
              width: 'auto',
              objectFit: 'contain',
              opacity: 0.5,
              filter: 'brightness(0) invert(1)',
              transition: 'opacity 0.3s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5' }}
          />
        ))}
      </div>

      <style>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="logoMarquee"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
