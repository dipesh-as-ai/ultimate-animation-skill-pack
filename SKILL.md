---
name: ultimate-animations
description: >
  Production-grade animation system for modern websites. 11 modules covering
  CSS keyframes, GSAP ScrollTrigger, Framer Motion, Three.js / R3F, GLSL shaders,
  particles, smooth scroll (Lenis), Lottie/Rive, Theatre.js cinematic sequencing,
  and a full glassmorphism design system. From micro-interactions to full 3D.
version: 2.0.0
stack: React / Next.js, Vanilla CSS, GSAP 3, Framer Motion 11, Three.js, Theatre.js, Lenis, TSParticles
triggers:
  - animation
  - scroll effect
  - parallax
  - page transition
  - micro-interaction
  - hover effect
  - glassmorphism
  - 3D scene
  - particles
  - cinematic
  - keyframes
  - stagger
  - text animation
  - magnetic button
  - custom cursor
  - smooth scroll
  - Lenis
  - shader
  - GLSL
  - liquid effect
  - noise gradient
  - dissolve
  - Lottie
  - Rive
  - After Effects
  - TSParticles
  - Vanta
  - constellation
---

# Ultimate Animation Skill Pack v2.0

> The difference between a website and an *experience* is motion.
> This skill pack turns you into that difference.

---

## ⚡ Start Here — How to Use This Pack

### If you are a DEVELOPER importing this skill pack:

1. **Read this file first** (`SKILL.md`) — it's the master index
2. **Use the Decision Tree below** — find what you need → it points you to the right module
3. **Read that module's `.md` file** — every module has one (e.g. `gsap/GSAP.md`)
4. **Copy templates** from the `templates/` folder inside each module
5. **Use `presets/`** for consistent easing, timing, colors, and themes
6. **Read `RECIPES.md`** for full-page composition blueprints

### If you are an AI AGENT reading this skill pack:

1. **Check `presets/animation-meta.json`** — structured metadata for intelligent pattern selection
2. Parse the **Decision Tree** to select the right animation approach
3. Read the target module's `.md` file for rules, patterns, and constraints
4. Reference `templates/*.tsx` for drop-in React components
5. Import tokens from `presets/` — never hardcode easing, color, or timing values:
   - `presets/easings.js` — easing curves
   - `presets/colors.js` — color palette
   - `presets/themes.js` — dark/light theme tokens
   - `presets/responsive-motion.ts` — mobile-adaptive values
6. **Read `RECIPES.md`** for full-page composition (which templates to combine)
7. Follow the **5 Laws** below — they apply to every animation in every module

### The 3 Tiers — Start at Tier 1, go deeper as needed:

| Tier | When | Modules |
|------|------|--------|
| **Tier 1 — UI** | Every project | `css/` · `gsap/` · `framer/` · `glass/` · `presets/` · `scroll/` |
| **Tier 2 — Visual** | Portfolio, agency, landing pages | `threejs/` · `particles/` · `lottie-rive/` |
| **Tier 3 — Shader** | Award-winning, high-fidelity sites | `shaders/` · `theatre/` |

> **Rule of thumb:** If you only need hovers and scroll reveals, stay in Tier 1.
> Only go deeper when the design demands it.

### Scenario Routing — "User says X → Go to Y"

| User / Prompt Says | Start From |
|---------------------|------------|
| "Build me a landing page" / "full animated page" | `RECIPES.md` → Full-page composition blueprints |
| "Add a hover effect" / "button animation" | `css/templates/micro-interactions.tsx` |
| "Make this scroll-triggered" / "reveal on scroll" | `gsap/templates/scroll-reveal.tsx` |
| "Stagger these cards" / "animate a grid" | `gsap/` or `framer/` → Stagger Grid templates |
| "Split this text" / "animate each letter" | `gsap/templates/text-split.tsx` |
| "Masked headline reveal" / "clip text" | `gsap/templates/text-mask-reveal.tsx` |
| "Running text" / "marquee" / "scrolling banner" | `gsap/templates/text-marquee.tsx` |
| "Animated number" / "counter" / "stats" | `gsap/templates/text-counter.tsx` |
| "Logo carousel" / "trusted by" / "brand strip" | `css/templates/logo-marquee.tsx` |
| "Add page transitions" / "animate between routes" | `framer/templates/page-transition.tsx` |
| "Make a glassmorphism card" / "frosted glass" | `glass/GLASS.md` → full design system |
| "Add smooth scroll" / "buttery scroll" | `scroll/templates/use-smooth-scroll.tsx` |
| "Make the background alive" / "animated background" | `css/templates/ambient-background.tsx` |
| "Add particles" / "constellation dots" / "snow" | `particles/templates/particle-background.tsx` |
| "Liquid effect" / "noise gradient" / "dissolve" | `shaders/SHADERS.md` → GLSL templates |
| "3D scene" / "floating objects" / "WebGL" | `threejs/THREEJS.md` → R3F |
| "Cinematic sequence" / "timeline multiple objects" | `theatre/THEATRE.md` → Theatre.js |
| "Lottie animation" / "After Effects export" | `lottie-rive/templates/lottie-player.tsx` |
| "Interactive animation with states" / "Rive" | `lottie-rive/LOTTIE-RIVE.md` → Rive |
| "Image reveal" / "clip-path wipe" | `gsap/templates/image-reveal.tsx` |
| "Stacking cards" / "pinned scroll" | `gsap/templates/sticky-cards.tsx` |
| "Scroll video" / "Apple-style video scrub" | `gsap/templates/scroll-video.tsx` |
| "Morphing blob" / "SVG shape animation" | `framer/templates/morphing-shape.tsx` |
| "Interactive animation with states" / "Rive" | `lottie-rive/templates/rive-interactive.tsx` |
| "What easing should I use?" | `presets/easings.js` |
| "What colors should I use?" | `presets/colors.js` |
| "Mobile safe animation" / "responsive" | `presets/responsive-motion.ts` |
| "Dark mode / light mode" / "theme tokens" | `presets/themes.js` |

---

## Quick Decision Tree

Read this first before writing a single line of animation code.

```
What are you animating?
│
├── Simple hover / button press / toggle
│   └── → css/CSS.md → Micro-interactions
│
├── Element entering the viewport
│   ├── React component  → framer/FRAMER.md → Entrance Variants
│   └── Plain HTML/JS    → gsap/GSAP.md → ScrollTrigger Reveals
│
├── Scroll-driven parallax / pinning / horizontal scroll
│   └── → gsap/GSAP.md → ScrollTrigger Patterns + SCROLL section
│
├── Page / route transition
│   ├── Next.js App Router  → framer/FRAMER.md → Page Transitions
│   └── Multi-page site     → gsap/GSAP.md → Page Timeline
│
├── Text animation (split, typewriter, scramble)
│   └── → gsap/GSAP.md → Text Animations
│
├── Staggered list / card grid entrance
│   ├── React  → framer/FRAMER.md → Stagger Variants
│   └── JS     → gsap/GSAP.md → Stagger Patterns
│
├── Cursor effects / magnetic buttons
│   └── → gsap/GSAP.md → Cursor & Magnetic section
│
├── Gradient / background atmosphere / grain
│   └── → css/CSS.md → Animated Backgrounds
│
├── Loading screen / preloader
│   └── → gsap/GSAP.md → Loader Timeline
│
├── Glassmorphism / frosted glass UI
│   └── → glass/GLASS.md → Full design system
│
├── Cinematic multi-element sequence (10+ objects)
│   └── → theatre/THEATRE.md → Timeline Sequencing
│
├── Smooth scroll feel (buttery, weighted, momentum)
│   └── → scroll/SCROLL.md → Lenis + GSAP integration
│
├── Designer-exported animation (After Effects, Rive editor)
│   ├── Static playback (logo, illustration) → lottie-rive/LOTTIE-RIVE.md → Lottie
│   └── Interactive with states (toggle, hover) → lottie-rive/LOTTIE-RIVE.md → Rive
│
├── Particle background (dots, constellation, snow, fog)
│   ├── Zero-config drop-in  → particles/PARTICLES.md → TSParticles or Vanta.js
│   └── Custom GPU particles → threejs/THREEJS.md → InstancedMesh
│
├── Custom shader effect (liquid, noise gradient, dissolve, holographic)
│   └── → shaders/SHADERS.md → GLSL + R3F ShaderMaterial
│
└── 3D scene / WebGL / models
    └── → threejs/THREEJS.md → R3F Scenes & Particles
```

---

## Stack — Install Once Per Project

```bash
# ── Core Animation ─────────────────────────────────────────────
npm install gsap framer-motion

# ── GSAP ScrollTrigger (bundled in gsap, just import) ──────────
# import { ScrollTrigger } from "gsap/ScrollTrigger"

# ── Text Splitting (free alternative to GSAP Club SplitText) ──
npm install split-type

# ── 3D (only if using Three.js scenes) ────────────────────────
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three

# ── Cinematic Sequencing (only if using Theatre.js) ───────────
npm install @theatre/core @theatre/studio

# ── Smooth Scroll (Lenis — buttery scroll feel) ───────────────
npm install lenis

# ── Designer-Exported Animations ──────────────────────────────
npm install lottie-react            # After Effects → Lottie
npm install @rive-app/react-canvas  # Rive interactive animations

# ── Particle Systems (drop-in backgrounds) ────────────────────
npm install @tsparticles/react @tsparticles/slim  # TSParticles
npm install vanta                                  # Vanta.js 3D backgrounds

# ── Optional Utilities ─────────────────────────────────────────
npm install @formkit/auto-animate   # zero-config list animations
```

---

## The 5 Laws of Modern Web Animation

These apply to EVERY animation in EVERY file in this pack:

### Law 1 — GPU Only
Only animate `transform` and `opacity`. Everything else causes layout thrash.
```css
/* ✅ GPU composited — silky smooth */
transform: translateY(0) scale(1) rotate(0deg);
opacity: 1;

/* ❌ Causes layout recalculation — janky */
width: 100px; height: 200px; top: 50px; margin-top: 20px;
```

### Law 2 — Easing is Everything
Linear animations feel robotic. Always use a curve from `presets/`.
```js
// ❌ Robotic
{ duration: 0.3, ease: "linear" }

// ✅ Alive
{ duration: 0.6, ease: "expo.out" }
{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }  // custom cubic-bezier
```

### Law 3 — Orchestrate, Don't Scatter
One well-timed entrance sequence beats 20 random hover effects.
Plan your animation as a *timeline*, not isolated triggers.

### Law 4 — Intent Before Decoration
Every animation must answer: **why does this move?**
- Entrance → signals content is ready
- Hover → confirms interactivity
- Exit → provides closure
- Scroll → reveals narrative progression

### Law 5 — Performance Budget
- Max 3 animated properties simultaneously per element
- Never animate more than 30 DOM elements at once without virtualization
- Always `will-change: transform` on elements that will animate
- Always kill GSAP instances / unsubscribe Framer listeners on unmount

---

## File Index

```
ultimate-animations-skill/
│
├── SKILL.md                          ← YOU ARE HERE (master index)
├── RECIPES.md                        ← Full-page composition blueprints ★ NEW
│
├── css/
│   ├── CSS.md                        ← Keyframes, micro-interactions, backgrounds, text effects
│   └── templates/
│       ├── ambient-background.tsx     ← Living gradient orb background ★ NEW
│       ├── micro-interactions.tsx     ← ButtonPress, CardLift, SpotlightCard ★ NEW
│       └── logo-marquee.tsx           ← Infinite logo carousel ★ NEW
│
├── gsap/
│   ├── GSAP.md                       ← ScrollTrigger, timelines, text, loaders, magnetic cursor
│   └── templates/
│       ├── scroll-reveal.tsx          ← useReveal() hook
│       ├── stagger-grid.tsx           ← Batch stagger cards
│       ├── text-split.tsx             ← Character/word split entrance
│       ├── text-mask-reveal.tsx       ← Clip-path line-by-line reveal ★ NEW
│       ├── text-marquee.tsx           ← Infinite scrolling text banner ★ NEW
│       ├── text-counter.tsx           ← Scroll-triggered number counter ★ NEW
│       ├── image-reveal.tsx           ← Masked image wipe reveal ★ NEW
│       ├── sticky-cards.tsx           ← Scroll-pinned card stacking ★ NEW
│       ├── scroll-video.tsx           ← Apple-style scroll-scrubbed video ★ NEW
│       ├── magnetic-button.tsx        ← Cursor-follow button
│       ├── custom-cursor.tsx          ← Custom cursor follower (desktop only)
│       └── horizontal-scroll.tsx      ← Horizontal scroll section
│
├── framer/
│   ├── FRAMER.md                     ← Variants, stagger, gestures, layout, page transitions
│   └── templates/
│       ├── animated-section.tsx       ← Scroll-triggered entrance
│       ├── stagger-grid.tsx           ← Stagger container + items
│       ├── page-transition.tsx        ← Next.js route transitions
│       ├── tilt-card.tsx              ← 3D tilt hover card
│       ├── expand-card.tsx            ← Click-to-expand layout animation
│       ├── animated-list.tsx          ← AnimatePresence list add/remove
│       └── morphing-shape.tsx         ← SVG path morphing blobs ★ NEW
│
├── glass/
│   ├── GLASS.md                      ← Full glassmorphism design system
│   └── templates/
│       ├── glass-card.tsx             ← Card with shimmer hover
│       ├── glass-nav.tsx              ← Floating glass navbar
│       ├── glass-components.tsx       ← Card + Button + Input library
│       └── glass-dashboard.tsx        ← Full dashboard example
│
├── threejs/
│   ├── THREEJS.md                    ← R3F scenes, particles, shaders, performance
│   └── templates/
│       ├── background-3d.tsx          ← Drop-in 3D background
│       ├── floating-geometry.tsx      ← Floating icosahedra with bloom
│       └── particle-cloud.tsx         ← 50k particle cloud
│
├── theatre/
│   ├── THEATRE.md                    ← Cinematic timeline sequencing
│   └── templates/
│       ├── cinematic-scene.tsx        ← Multi-object entrance sequence
│       ├── hero-sequence.tsx          ← Full hero with 5 animated objects
│       └── scroll-scrub.tsx           ← Scroll-driven timeline hook
│
├── scroll/
│   ├── SCROLL.md                     ← Lenis smooth scroll + GSAP parallax + snap
│   └── templates/
│       └── use-smooth-scroll.tsx      ← Drop-in Lenis + GSAP hook ★ NEW
│
├── lottie-rive/
│   ├── LOTTIE-RIVE.md                ← Lottie (AE export) + Rive (state machines)
│   └── templates/
│       ├── lottie-player.tsx          ← Configurable Lottie component ★ NEW
│       └── rive-interactive.tsx       ← Rive state machine component ★ NEW
│
├── shaders/
│   ├── SHADERS.md                    ← GLSL patterns, noise, liquid, holographic, dissolve
│   └── templates/
│       ├── noise-gradient.tsx         ← Organic animated gradient background
│       ├── liquid-blob.tsx            ← Mouse-reactive metaball blob
│       └── dissolve-plane.tsx         ← Scroll-driven dissolve transition
│
├── particles/
│   ├── PARTICLES.md                  ← TSParticles presets + Vanta.js backgrounds
│   └── templates/
│       └── particle-background.tsx    ← 5-preset particle component ★ NEW
│
└── presets/
    ├── easings.js                    ← All easing curves
    ├── variants.js                   ← Reusable Framer Motion variants
    ├── colors.js                     ← Unified color palette ★ NEW
    ├── themes.js                     ← Dark/light theme tokens ★ NEW
    ├── responsive-motion.ts          ← Mobile-adaptive animation values ★ NEW
    ├── reduced-motion.ts             ← Accessibility hooks
    └── animation-meta.json           ← AI decision metadata ★ NEW
```

---

## Aesthetic Direction

This skill pack targets **award-site aesthetics** — Awwwards, Lapa Ninja, Minimal Gallery tier.

Reference aesthetic vocabulary:
- **Dark-first** — dark backgrounds make animations pop
- **High contrast** — white/cream text on near-black
- **Cinematic timing** — slow entrances (0.8–1.2s), fast exits (0.3–0.4s)
- **Negative space** — let animations breathe, don't crowd
- **Purposeful parallax** — depth layers, not gimmicks
- **Micro-feedback** — every interactive element responds to touch/hover

> If your animation could ship on a corporate WordPress site, it's not using this skill pack correctly.

---

## Animation Pre-Delivery Checklist

Run through this before shipping any animation work:

### Performance
- [ ] All animations use GPU-only properties (`transform`, `opacity`) — never `width`, `height`, `top`, `left`, `margin`
- [ ] No layout thrash — verify with Chrome DevTools "Layout Shift" panel
- [ ] Tested at 60fps on mobile (throttle CPU in DevTools)
- [ ] Heavy particle/shader scenes cap DPR at `[1, 1.5]` on mobile

### Timing & Easing
- [ ] Easing values imported from `presets/easings.js` — no hardcoded `linear` or `ease`
- [ ] Entrance animations: 0.8–1.2s
- [ ] Exit animations: 0.3–0.4s
- [ ] Micro-interactions: 0.15–0.3s
- [ ] Spring configs use damping 15–25 (not underdamped bouncy defaults)

### Accessibility
- [ ] `prefers-reduced-motion: reduce` is respected — disable or simplify all motion
- [ ] Focus states are visible on all interactive elements
- [ ] Animations don't block content from being read by screen readers
- [ ] No flashing content faster than 3 times per second

### Cleanup
- [ ] GSAP ScrollTrigger instances are killed on component unmount
- [ ] Theatre.js `studio.initialize()` is guarded behind `import.meta.env.DEV`
- [ ] Vanta.js / TSParticles instances are destroyed on unmount
- [ ] `useFrame` loops don't create garbage (no `new Vector3()` inside loops)

### Visual Quality
- [ ] Dark mode tested — animations visible against dark backgrounds
- [ ] Text animations don't leave split characters in broken state on fast navigation
- [ ] Scroll-triggered elements don't flash/jump on page load
- [ ] Glass elements have fallback for browsers without `backdrop-filter` support
