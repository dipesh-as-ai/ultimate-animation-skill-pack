---
name: theatrejs-cinematic
description: >
  Cinematic timeline sequencing with Theatre.js. Use for multi-element
  orchestrated sequences, scroll-synced timelines, and director-style control.
triggers:
  - cinematic animation
  - timeline sequencing
  - scroll scrub
  - orchestrated entrance
  - Theatre.js
---

# Theatre.js — Cinematic Timeline Sequencing

## When To Use Theatre.js vs Other Libraries

| Need | Use |
|------|-----|
| Scrub-able timeline (scroll, slider, audio) | ✅ Theatre.js |
| Director-style multi-object sequence | ✅ Theatre.js |
| Complex entrance choreography (10+ elements) | ✅ Theatre.js |
| Simple hover/tap micro-interactions | ❌ Use CSS or Framer Motion |
| Physics / spring animations | ❌ Use Framer Motion |
| Scroll parallax only | ❌ Use GSAP ScrollTrigger |
| 3D object animation | ✅ Theatre.js + Three.js |

---

## Installation

```bash
npm install @theatre/core @theatre/studio
npm install @theatre/r3f  # if using React Three Fiber
```

---

## Mental Model

```
Project
  └── Sheet ("Hero Section")
        ├── Object ("title")     ← {x, y, opacity, scale}
        ├── Object ("bg")        ← {blur, opacity, translateY}
        └── Object ("cta")       ← {opacity, letterSpacing}
```

1. **Project** — top-level container (one per app)
2. **Sheet** — a named timeline (like a "scene" in film)
3. **Sheet Object** — a thing being animated (DOM element, camera, light)
4. **Sequence** — the actual timeline with keyframes

---

## Workflow

### Step 1 — Scaffold the Project
```ts
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'

// DEV ONLY — NEVER ship this in production
if (import.meta.env.DEV) {
  studio.initialize()
}

// In production, load exported state:
// import state from './state.json'
// const project = getProject('My App', { state })
const project = getProject('My App')
```

### Step 2 — Create Sheet + Objects
```ts
import { types } from '@theatre/core'

const sheet = project.sheet('Hero')

const titleObj = sheet.object('title', {
  opacity: types.number(0, { range: [0, 1] }),
  y:       types.number(60, { range: [-200, 200] }),
  scale:   types.number(0.9, { range: [0, 2] }),
  blur:    types.number(8, { range: [0, 40] }),
})
```

### Step 3 — Subscribe to Values
```ts
titleObj.onValuesChange(({ opacity, y, scale, blur }) => {
  el.style.opacity   = String(opacity)
  el.style.transform = `translateY(${y}px) scale(${scale})`
  el.style.filter    = `blur(${blur}px)`
})
```

### Step 4 — Play or Scrub
```ts
// Auto-play
sheet.sequence.play({ iterationCount: 1, range: [0, 3] })

// Scroll-scrub
sheet.sequence.position = scrollProgress * totalDuration

// Loop ambient
sheet.sequence.play({ iterationCount: Infinity, range: [2, 5] })
```

### Step 5 — Export for Production
1. Open Studio panel in dev
2. Click **Export** → downloads `state.json`
3. Import it: `getProject('My App', { state })`
4. Remove `studio.initialize()` from production

---

## Performance Rules

- Keep object count under 50 per sheet
- Use `will-change: transform, opacity` on animated DOM elements
- Never animate `width`, `height`, or `top/left` — use `transform` only
- For 60fps scroll scrubbing, use `{ passive: true }` on scroll listener

---

## Critical Rules

1. **NEVER ship `studio.initialize()` in production** — loads heavy dev panel
2. Always export and commit `state.json` — it IS your animation data
3. Object property names must be stable — renaming breaks the state JSON
4. Use `sheet.sequence.pause()` before scrubbing; don't mix play + scrub
5. Normalize scroll to `[0, sequenceDuration]` range for scrub

---

## Templates

- `templates/cinematic-scene.tsx` — Multi-object entrance sequence
- `templates/hero-sequence.tsx` — Full hero with 5 animated objects
- `templates/scroll-scrub.tsx` — Scroll-driven timeline hook
