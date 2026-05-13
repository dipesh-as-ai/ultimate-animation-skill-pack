/**
 * TEMPLATE: Theatre.js Cinematic Hero Section
 *
 * Full-page hero with director-style entrance sequence:
 * eyebrow → headline → subtext → CTA → background bloom
 *
 * USAGE:
 *   1. Replace content strings
 *   2. Run in dev mode to set keyframes with Theatre.js Studio
 *   3. Export state.json and import it here
 *   4. Remove studio.initialize() before shipping
 */

import { useEffect, useRef } from 'react'
import { getProject, types } from '@theatre/core'

// ─── DEV ONLY: Uncomment to enable Theatre.js Studio ─────────────────────
// import studio from '@theatre/studio'
// if (import.meta.env.DEV) studio.initialize()
// ──────────────────────────────────────────────────────────────────────────

// ─── PRODUCTION: Load exported state ─────────────────────────────────────
// import state from './hero-state.json'
// const project = getProject('Hero', { state })
// ──────────────────────────────────────────────────────────────────────────

const project = getProject('Hero')
const sheet = project.sheet('Entrance')

const objs = {
  eyebrow: sheet.object('Eyebrow', {
    opacity: types.number(0, { range: [0, 1] }),
    y:       types.number(20, { range: [-100, 100] }),
  }),
  headline: sheet.object('Headline', {
    opacity:       types.number(0, { range: [0, 1] }),
    y:             types.number(40, { range: [-100, 100] }),
    letterSpacing: types.number(0.08, { range: [-0.1, 0.5] }),
  }),
  subtext: sheet.object('Subtext', {
    opacity: types.number(0, { range: [0, 1] }),
    y:       types.number(30, { range: [-100, 100] }),
  }),
  cta: sheet.object('CTA', {
    opacity: types.number(0, { range: [0, 1] }),
    scale:   types.number(0.9, { range: [0, 2] }),
  }),
  bg: sheet.object('Background', {
    scale:   types.number(1.05, { range: [0.5, 2] }),
    opacity: types.number(0.3, { range: [0, 1] }),
  }),
}

export function CinematicHero() {
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef  = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLButtonElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubs = [
      objs.eyebrow.onValuesChange(({ opacity, y }) => {
        if (!eyebrowRef.current) return
        eyebrowRef.current.style.opacity = String(opacity)
        eyebrowRef.current.style.transform = `translateY(${y}px)`
      }),
      objs.headline.onValuesChange(({ opacity, y, letterSpacing }) => {
        if (!headlineRef.current) return
        headlineRef.current.style.opacity = String(opacity)
        headlineRef.current.style.transform = `translateY(${y}px)`
        headlineRef.current.style.letterSpacing = `${letterSpacing}em`
      }),
      objs.subtext.onValuesChange(({ opacity, y }) => {
        if (!subtextRef.current) return
        subtextRef.current.style.opacity = String(opacity)
        subtextRef.current.style.transform = `translateY(${y}px)`
      }),
      objs.cta.onValuesChange(({ opacity, scale }) => {
        if (!ctaRef.current) return
        ctaRef.current.style.opacity = String(opacity)
        ctaRef.current.style.transform = `scale(${scale})`
      }),
      objs.bg.onValuesChange(({ scale, opacity }) => {
        if (!bgRef.current) return
        bgRef.current.style.opacity = String(opacity)
        bgRef.current.style.transform = `scale(${scale})`
      }),
    ]

    sheet.sequence.play({ iterationCount: 1 })

    return () => unsubs.forEach(u => u())
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, #1a1a2e 0%, #0f0f0f 100%)', willChange: 'transform, opacity' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800, padding: '0 2rem' }}>
        <p ref={eyebrowRef} style={{ opacity: 0, fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem', willChange: 'transform, opacity' }}>
          YOUR EYEBROW TEXT
        </p>

        <h1 ref={headlineRef} style={{ opacity: 0, fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', willChange: 'transform, opacity' }}>
          Your Cinematic<br />Headline Here
        </h1>

        <p ref={subtextRef} style={{ opacity: 0, marginTop: '1.5rem', fontSize: '1.125rem', color: '#aaa', maxWidth: 520, margin: '1.5rem auto 0', willChange: 'transform, opacity' }}>
          Supporting text that contextualizes your headline.
        </p>

        <button ref={ctaRef} style={{ opacity: 0, marginTop: '2.5rem', padding: '0.875rem 2.5rem', background: '#fff', color: '#000', border: 'none', borderRadius: 4, fontSize: '1rem', fontWeight: 600, cursor: 'pointer', willChange: 'transform, opacity' }}>
          Get Started
        </button>
      </div>
    </section>
  )
}
