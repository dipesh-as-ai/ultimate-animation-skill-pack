/**
 * THEATRE.JS — CINEMATIC SCENE TEMPLATE
 * Copy this file and replace "Scene" with your scene name.
 * Works with: React 18+, Theatre.js ^0.6
 */

import { useEffect, useRef } from 'react'
import { getProject, types } from '@theatre/core'

// ─── DEV ONLY: Dynamic import prevents Studio from bundling in prod ──────────
if (import.meta.env.DEV) {
  import('@theatre/studio').then((s) => s.default.initialize())
}
// ─────────────────────────────────────────────────────────────────────────────
const project = getProject('MyApp')

// ─── 2. SHEET + OBJECTS ─────────────────────────────────────────────────────
const sheet = project.sheet('Scene')

const objects = {
  title: sheet.object('title', {
    opacity: types.number(0, { range: [0, 1] }),
    y:       types.number(40, { range: [-200, 200] }),
    blur:    types.number(12, { range: [0, 40] }),
  }),
  subtitle: sheet.object('subtitle', {
    opacity: types.number(0, { range: [0, 1] }),
    y:       types.number(30, { range: [-200, 200] }),
  }),
  cta: sheet.object('cta', {
    opacity: types.number(0, { range: [0, 1] }),
    scale:   types.number(0.8, { range: [0, 2] }),
  }),
}

// ─── 3. COMPONENT ────────────────────────────────────────────────────────────
export function CinematicScene() {
  const refs = {
    title:    useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    cta:      useRef<HTMLButtonElement>(null),
  }

  useEffect(() => {
    const unsubs = [
      objects.title.onValuesChange(({ opacity, y, blur }) => {
        const el = refs.title.current
        if (!el) return
        el.style.opacity   = String(opacity)
        el.style.transform = `translateY(${y}px)`
        el.style.filter    = `blur(${blur}px)`
      }),
      objects.subtitle.onValuesChange(({ opacity, y }) => {
        const el = refs.subtitle.current
        if (!el) return
        el.style.opacity   = String(opacity)
        el.style.transform = `translateY(${y}px)`
      }),
      objects.cta.onValuesChange(({ opacity, scale }) => {
        const el = refs.cta.current
        if (!el) return
        el.style.opacity   = String(opacity)
        el.style.transform = `scale(${scale})`
      }),
    ]

    // Play on mount
    sheet.sequence.play({ iterationCount: 1, range: [0, 2.5] })

    return () => unsubs.forEach(fn => fn())
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <h1 ref={refs.title} style={{ willChange: 'transform, opacity, filter' }}>
        Title Here
      </h1>
      <p ref={refs.subtitle} style={{ willChange: 'transform, opacity' }}>
        Subtitle here
      </p>
      <button ref={refs.cta} style={{ willChange: 'transform, opacity' }}>
        CTA
      </button>
    </section>
  )
}
