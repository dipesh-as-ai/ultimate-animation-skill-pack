---
name: smooth-scroll
description: >
  Smooth scroll system using Lenis + GSAP ScrollTrigger integration.
  Turns browser scroll into a buttery, weighted, Awwwards-tier experience.
  Covers setup, GSAP pairing, parallax, snap sections, and mobile handling.
triggers:
  - smooth scroll
  - Lenis
  - scroll feel
  - butter scroll
  - scroll hijack
  - parallax scroll
---

# Smooth Scroll — Lenis + GSAP Integration

## Why Lenis

Standard browser scroll is choppy and uncontrollable. Lenis creates a
**weighted, momentum-based scroll** that makes everything feel premium.
It's used by ~80% of Awwwards-winning sites.

| Feature | Native Scroll | Lenis |
|---------|--------------|-------|
| Feel | Snappy, digital | Weighted, analog |
| Momentum | None | Configurable inertia |
| GSAP ScrollTrigger | Works | Works (with proxy) |
| Mobile | Native | Falls back to native |
| Bundle size | 0KB | ~3KB |

---

## Installation

```bash
npm install lenis
```

---

## Setup — Basic

```ts
// lib/smooth-scroll.ts
import Lenis from 'lenis'

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,          // scroll duration (higher = slower, smoother)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,     // mobile touch sensitivity
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}
```

---

## Setup — With GSAP ScrollTrigger (The Real Pattern)

This is the pattern you will use 90% of the time. Lenis handles the scroll
feel, GSAP ScrollTrigger handles the animation triggers.

```ts
// lib/smooth-scroll.ts
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  // Connect Lenis scroll position to GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP's ticker instead of raw rAF for better sync
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000) // Lenis expects ms, GSAP ticker gives seconds
  })
  gsap.ticker.lagSmoothing(0) // Prevent GSAP from throttling

  return lenis
}
```

### React Hook Version

```tsx
// hooks/useSmoothScroll.ts
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return lenisRef
}

// Usage in layout:
// function Layout({ children }) {
//   useSmoothScroll()
//   return <main>{children}</main>
// }
```

---

## Scroll-to with Lenis

```ts
// Smooth scroll to element
lenis.scrollTo('#section-2', {
  offset: -80,      // offset from top (e.g., for fixed navbar)
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
})

// Smooth scroll to top
lenis.scrollTo(0)

// Scroll to element immediately (no animation)
lenis.scrollTo('#section-2', { immediate: true })
```

---

## Snap Sections

```ts
// After initializing Lenis, add GSAP snap:
ScrollTrigger.create({
  snap: {
    snapTo: 1 / (totalSections - 1),  // e.g., 1/4 for 5 sections
    duration: { min: 0.3, max: 0.6 },
    ease: 'power2.inOut',
  },
})
```

---

## Parallax with Lenis + GSAP

```ts
// Elements move at different speeds relative to scroll
gsap.to('.parallax-slow', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,   // ties animation to scroll position
  },
})

gsap.to('.parallax-fast', {
  yPercent: -60,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
})
```

---

## Scroll Progress Bar

```ts
// Animate a progress bar based on page scroll
gsap.to('.scroll-progress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3,
  },
})
```

```css
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 2px;
  background: white;
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
}
```

---

## Pause / Resume (for modals, overlays)

```ts
// When opening a modal
lenis.stop()

// When closing
lenis.start()
```

---

## Performance Rules

1. **Never use `overflow: hidden` on `<html>` or `<body>`** — breaks Lenis
2. **Use `scrub: true`** on ScrollTrigger when pairing with Lenis for smooth parallax
3. **Mobile**: Lenis auto-falls back to native touch scroll — don't fight it
4. **Disable for reduced-motion users**:
```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Skip Lenis, use native scroll
  return
}
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Lenis + ScrollTrigger not synced | Use `lenis.on('scroll', ScrollTrigger.update)` |
| Scroll feels too slow | Lower `duration` to 0.8–1.0 |
| Scroll feels too floaty | Increase easing decay or use `lerp` mode |
| Modal opens but page scrolls behind | Call `lenis.stop()` on modal open |
| Animations fire at wrong scroll positions | Make sure Lenis + GSAP ticker are connected |
