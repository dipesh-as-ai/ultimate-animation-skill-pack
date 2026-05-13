/**
 * GSAP TEMPLATE: Sticky Card Stack
 *
 * Cards pin and stack on top of each other as user scrolls.
 * Award-site pattern for case studies, features, and comparison sections.
 *
 * Requires: gsap, gsap/ScrollTrigger
 *
 * Usage:
 *   <StickyCardStack cards={[
 *     { title: 'Design', content: '...', bgColor: '#1a0a2e' },
 *     { title: 'Develop', content: '...', bgColor: '#0a1a2e' },
 *     { title: 'Deploy', content: '...', bgColor: '#0a2e1a' },
 *   ]} />
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CardData {
  title: string
  content: React.ReactNode
  bgColor?: string
}

interface StickyCardStackProps {
  cards: CardData[]
  /** Card height (default: 70vh) */
  cardHeight?: string
  /** Vertical offset between stacked cards in px (default: 30) */
  stackOffset?: number
  className?: string
}

export function StickyCardStack({
  cards,
  cardHeight = '70vh',
  stackOffset = 30,
  className = '',
}: StickyCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cardEls = container.querySelectorAll<HTMLElement>('.sticky-card')

    const ctx = gsap.context(() => {
      cardEls.forEach((card, i) => {
        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: `top ${stackOffset * i + 80}px`,
          end: `+=${window.innerHeight * (cards.length - i)}`,
          pin: true,
          pinSpacing: false,
        })

        // Scale down previous cards slightly as new ones appear
        if (i < cardEls.length - 1) {
          gsap.to(card, {
            scale: 0.95 - i * 0.02,
            opacity: 0.6,
            scrollTrigger: {
              trigger: cardEls[i + 1],
              start: 'top bottom',
              end: `top ${stackOffset * (i + 1) + 80}px`,
              scrub: true,
            },
          })
        }
      })
    }, container)

    return () => ctx.revert()
  }, [cards, stackOffset])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="sticky-card"
          style={{
            height: cardHeight,
            background: card.bgColor || '#0a0a1a',
            borderRadius: 20,
            padding: 'clamp(2rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            marginBottom: 20,
            willChange: 'transform',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '1rem',
          }}>
            {card.title}
          </h2>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.125rem', maxWidth: 600 }}>
            {card.content}
          </div>
        </div>
      ))}
    </div>
  )
}
