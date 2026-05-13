---
name: particle-systems
description: >
  Drop-in particle backgrounds and effects using TSParticles and Vanta.js.
  Use when you want particles/constellation/fog without writing Three.js.
  For custom GPU particles, use threejs/ or shaders/ instead.
triggers:
  - particles
  - constellation
  - floating dots
  - particle background
  - TSParticles
  - Vanta
  - net effect
  - starfield
---

# Particle Systems — Drop-in Effects

## When to Use What

| Need | Library | Effort |
|------|---------|--------|
| Quick particle background (dots, lines, snow) | **TSParticles** | Low |
| Ready-made 3D animated background | **Vanta.js** | Very low |
| Custom particle behavior + physics | **R3F + InstancedMesh** | Medium |
| GPU-based 10k+ particles | **R3F + Shaders** | High |

---

## TSParticles

### Installation
```bash
npm install @tsparticles/react @tsparticles/slim
```

### React Usage
```tsx
import { useCallback } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useState } from 'react'

export function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 80, density: { enable: true, width: 800, height: 800 } },
          color: { value: '#ffffff' },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.3 } },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
```

### Popular Presets

#### Constellation (Connected Dots)
```js
particles: {
  number: { value: 60 },
  links: { enable: true, distance: 180, opacity: 0.15 },
  move: { speed: 0.5 },
  size: { value: { min: 1, max: 2 } },
  opacity: { value: { min: 0.2, max: 0.5 } },
}
```

#### Snow
```js
particles: {
  number: { value: 100 },
  color: { value: '#ffffff' },
  opacity: { value: { min: 0.2, max: 0.7 } },
  size: { value: { min: 1, max: 4 } },
  move: { speed: 1, direction: 'bottom', outModes: { bottom: 'out', top: 'out' } },
  wobble: { enable: true, distance: 10, speed: 5 },
  links: { enable: false },
}
```

#### Fireflies
```js
particles: {
  number: { value: 30 },
  color: { value: '#ffd700' },
  opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 1 } },
  size: { value: { min: 2, max: 5 } },
  move: { speed: 0.3, random: true },
  links: { enable: false },
}
```

---

## Vanta.js — Zero-Config 3D Backgrounds

### Installation
```bash
npm install vanta three
```

### React Usage
```tsx
import { useRef, useEffect, useState } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'

export function VantaNetBackground({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (!vantaEffect && ref.current) {
      setVantaEffect(
        NET({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x7928ca,
          backgroundColor: 0x050510,
          points: 12,
          maxDistance: 20,
          spacing: 18,
        })
      )
    }
    return () => { if (vantaEffect) vantaEffect.destroy() }
  }, [vantaEffect])

  return (
    <div ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      {children}
    </div>
  )
}
```

### Available Vanta Effects
| Effect | Look |
|--------|------|
| `NET` | Connected point network |
| `WAVES` | Ocean-like sine waves |
| `BIRDS` | Flocking bird simulation |
| `FOG` | Atmospheric fog layers |
| `CLOUDS` | Volumetric clouds |
| `RINGS` | Rotating concentric rings |
| `DOTS` | Floating dot grid |
| `GLOBE` | Spinning wireframe globe |
| `CELLS` | Organic cell-like patterns |
| `HALO` | Sun-like halo glow |
| `TRUNK` | Tree trunk growth |
| `TOPOLOGY` | Topographic terrain |

---

## Performance Rules

1. **TSParticles**: Keep particle count under 150 on mobile
2. **Vanta.js**: Uses Three.js under the hood — one Vanta per page max
3. **Both**: Use `position: fixed; z-index: -1` to keep behind UI
4. **Cleanup**: Always destroy on unmount to prevent memory leaks
5. **Reduced motion**: Disable or reduce particles for `prefers-reduced-motion`
