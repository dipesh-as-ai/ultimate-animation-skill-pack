---
name: lottie-rive
description: >
  Designer-exported animations using Lottie (After Effects) and Rive
  (interactive state machines). Use when hand-coding an animation would
  take too long, or when you need complex character/illustration animation.
triggers:
  - Lottie
  - Rive
  - After Effects animation
  - animated illustration
  - animated logo
  - animated icon
  - state machine animation
  - json animation
---

# Lottie & Rive — Designer-Exported Animations

## When to Use What

```
Need an animation that's...
│
├── An exported After Effects animation (logo, illustration, icon)
│   └── → Lottie ✅
│
├── An interactive animation with states (hover, click, toggle)
│   └── → Rive ✅ (state machines are built-in)
│
├── A simple loading spinner or micro-icon
│   └── → CSS keyframes (don't overcomplicate it)
│
├── A scroll-triggered entrance or stagger
│   └── → GSAP or Framer Motion (code is better here)
│
└── A game-like or character animation with branching logic
    └── → Rive ✅
```

| Feature | Lottie | Rive |
|---------|--------|------|
| Source tool | After Effects → Bodymovin | Rive Editor (free, web-based) |
| File format | JSON (.json) or dotLottie (.lottie) | .riv binary |
| Bundle size | ~50KB player + JSON size | ~60KB runtime |
| Interactivity | Play/pause/seek | Full state machines, inputs, listeners |
| React support | `lottie-react` | `@rive-app/react-canvas` |
| Best for | Illustrations, logos, icons | Interactive elements, game UI, toggles |
| Performance | Good (canvas or SVG) | Excellent (WebAssembly canvas) |

---

## Lottie

### Installation
```bash
npm install lottie-react
# or for vanilla JS:
npm install lottie-web
```

### React Usage
```tsx
import Lottie from 'lottie-react'
import animationData from './my-animation.json'

export function AnimatedLogo() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  )
}
```

### Controlled Playback
```tsx
import { useRef } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import animationData from './hero-animation.json'

export function HeroAnimation() {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        onComplete={() => console.log('Animation done!')}
      />
      <button onClick={() => lottieRef.current?.play()}>Play</button>
      <button onClick={() => lottieRef.current?.pause()}>Pause</button>
      <button onClick={() => lottieRef.current?.goToAndStop(30, true)}>
        Go to frame 30
      </button>
    </div>
  )
}
```

### Scroll-Synced Lottie (with GSAP)
```tsx
import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollLottie({ path }: { path: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const anim: AnimationItem = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path,
    })

    const totalFrames = anim.totalFrames

    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * totalFrames)
        anim.goToAndStop(frame, true)
      },
    })

    return () => {
      anim.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [path])

  return <div ref={containerRef} style={{ width: '100%', maxWidth: 600 }} />
}
```

### Where to Get Lottie Files
- **LottieFiles.com** — Huge free library of animations
- **Export from After Effects** — Install Bodymovin plugin → export as JSON
- **IconScout / Lordicon** — Animated icon libraries

---

## Rive

### Installation
```bash
npm install @rive-app/react-canvas
```

### React Usage
```tsx
import { useRive } from '@rive-app/react-canvas'

export function InteractiveToggle() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/toggle.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })

  return (
    <RiveComponent
      style={{ width: 200, height: 200 }}
      onClick={() => {
        // Trigger a state machine input
        const inputs = rive?.stateMachineInputs('State Machine 1')
        const trigger = inputs?.find(i => i.name === 'Toggle')
        trigger?.fire()
      }}
    />
  )
}
```

### Hover-Reactive Rive Animation
```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export function HoverButton() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/button.riv',
    stateMachines: 'HoverState',
    autoplay: true,
  })

  const hoverInput = useStateMachineInput(rive, 'HoverState', 'isHovering')

  return (
    <RiveComponent
      style={{ width: 300, height: 80, cursor: 'pointer' }}
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
    />
  )
}
```

### Where to Create Rive Files
- **rive.app** — Free web-based editor (like Figma for animation)
- **Rive Community** — Free assets and remixable files

---

## Performance Rules

1. **Lottie**: Prefer `canvas` renderer over `svg` for complex animations (>50 layers)
2. **Rive**: Already uses WebAssembly — minimal optimization needed
3. **Both**: Lazy-load animation files — don't bundle them in your JS
4. **File size**: Keep Lottie JSONs under 100KB; optimize with LottieFiles compressor
5. **Reduced motion**: Respect `prefers-reduced-motion` — pause or show static frame

```tsx
// Reduced motion check
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) {
  // Show static first frame instead
  lottieRef.current?.goToAndStop(0, true)
}
```

---

## Decision Summary

| Situation | Use |
|-----------|-----|
| Animated logo on landing page | Lottie |
| Loading/success/error state illustration | Lottie |
| Interactive toggle/button with states | Rive |
| Scroll-synced illustration reveal | Lottie + GSAP ScrollTrigger |
| Character with idle/walk/run states | Rive |
| Simple spinning icon | CSS `@keyframes` (don't overengineer) |
