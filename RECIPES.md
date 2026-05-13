# RECIPES.md — Full-Page Composition Blueprints

> Individual animations are ingredients. Recipes combine them into award-winning pages.
> Use these blueprints when building a complete page — they tell you which
> modules to layer, what order to compose, and how to time everything.

---

## Recipe 1: "The Gravity" — Dark Agency Landing Page

**Vibe:** Cinematic, moody, high-contrast — like visiting a design studio's portfolio.

### Layers (back → front):
```
1. Background:    css/templates/ambient-background.tsx (variant="aurora")
2. Smooth scroll: scroll/templates/use-smooth-scroll.tsx
3. Hero:          theatre/templates/hero-sequence.tsx (cinematic entrance)
4. Text:          gsap/templates/text-mask-reveal.tsx (headline)
                  gsap/templates/text-split.tsx (subtitle — word mode)
5. Section cards: glass/templates/glass-card.tsx with colored tints
                  gsap/templates/scroll-reveal.tsx (batch stagger)
6. Stats row:     gsap/templates/text-counter.tsx (3 stat columns)
7. CTA:           gsap/templates/magnetic-button.tsx
8. Cursor:        gsap/templates/custom-cursor.tsx (full-page overlay)
9. Marquee:       gsap/templates/text-marquee.tsx (section divider)
```

### Timing Orchestration:
```
Page load → ambient background renders instantly
         → hero sequence plays (1.5s entrance, 5 elements staggered)
         → custom cursor fades in (0.3s delay after hero completes)

Scroll:   → text-mask-reveal triggers at each section heading (top 85%)
         → glass cards batch-stagger in (0.12s between cards)
         → stat counters animate at 80% viewport
         → marquee always running (ambient)
```

### Install:
```bash
npm install gsap lenis @theatre/core @theatre/studio framer-motion split-type
```

---

## Recipe 2: "Glass Dashboard" — SaaS Admin Panel

**Vibe:** Clean, sophisticated, functional — like Linear or Raycast.

### Layers:
```
1. Background:    css/templates/ambient-background.tsx (variant="minimal")
2. Nav:           glass/templates/glass-nav.tsx (fixed top)
3. Cards:         glass/templates/glass-card.tsx (stat cards with tints)
4. Entrance:      framer/templates/stagger-grid.tsx (stagger cards)
5. Page swap:     framer/templates/page-transition.tsx (style="blur")
6. Interactions:  css/templates/micro-interactions.tsx (button press, card lift)
```

### Timing:
```
Route change → page blur transition (0.5s)
            → stagger cards enter (0.1s between, 0.6s each)
            → nav is always visible (no animation)
```

### Install:
```bash
npm install framer-motion
```

---

## Recipe 3: "The Void" — Immersive 3D Portfolio

**Vibe:** Deep space, WebGL hero, shaders — like an Awwwards SOTD.

### Layers:
```
1. Background 3D: threejs/templates/floating-geometry.tsx (with bloom)
2. Smooth scroll: scroll/templates/use-smooth-scroll.tsx
3. Hero text:     gsap/templates/text-split.tsx (char-by-char, delayed)
4. Shader divider: shaders/templates/noise-gradient.tsx (between sections)
5. Project cards: gsap/templates/image-reveal.tsx (clip-path mask wipe)
                  gsap/templates/sticky-cards.tsx (pinned case studies)
6. Cursor:        gsap/templates/custom-cursor.tsx
7. Grain:         css/CSS.md → .grain overlay (always on)
```

### Timing:
```
Page load → 3D scene renders immediately (background layer)
         → text-split animates chars (0.02s stagger, 0.8s delay)
         → cursor appears after hero text completes

Scroll:  → noise-gradient fills viewport as scrub between sections
        → image-reveal clips open with Ken Burns zoom-out
        → sticky-cards pin and stack (ScrollTrigger pinned)
```

### Mobile Fallback:
```
- Replace floating-geometry with ambient-background (variant="cosmic")
- Disable custom cursor
- Disable noise-gradient shader → replace with css/aurora-bg
- Keep text-split and image-reveal (they're lightweight)
```

### Install:
```bash
npm install gsap lenis three @react-three/fiber @react-three/drei @react-three/postprocessing split-type
```

---

## Recipe 4: "Clean Launch" — SaaS Product Landing Page

**Vibe:** Bright, professional, conversion-focused — like Stripe or Vercel.

### Layers:
```
1. Background:    css/templates/ambient-background.tsx (variant="minimal")
2. Nav:           glass/templates/glass-nav.tsx
3. Hero:          gsap/templates/text-mask-reveal.tsx (headline)
                  framer/templates/animated-section.tsx (hero content)
4. Logo strip:    css/templates/logo-marquee.tsx ("Trusted by")
5. Feature grid:  framer/templates/stagger-grid.tsx
6. Stats:         gsap/templates/text-counter.tsx (3 metrics)
7. Testimonials:  framer/templates/expand-card.tsx (click-to-expand)
8. CTA section:   gsap/templates/scroll-reveal.tsx
9. Page feel:     scroll/templates/use-smooth-scroll.tsx
```

### Timing:
```
Page load → hero text mask-reveal (0.8s, immediate)
         → hero CTA fades up (0.3s delay after headline)
         → logo marquee always running

Scroll:  → features stagger in (grid, 0.1s between)
        → stats count up at viewport entry
        → testimonial cards reveal one-by-one
```

### Install:
```bash
npm install gsap framer-motion lenis
```

---

## Recipe 5: "Cinematic Scroll" — Editorial / Case Study

**Vibe:** Story-driven, scroll-controlled, long-form — like Apple product pages.

### Layers:
```
1. Background:    css/templates/ambient-background.tsx (variant="nebula")
2. Smooth scroll: scroll/templates/use-smooth-scroll.tsx
3. Hero:          theatre/templates/scroll-scrub.tsx (scroll-driven)
4. Sections:      gsap/templates/sticky-cards.tsx (pinned case studies)
5. Transitions:   shaders/templates/dissolve-plane.tsx (between sections)
6. Images:        gsap/templates/image-reveal.tsx (left/right alternating)
7. Text:          gsap/templates/text-marquee.tsx (section dividers)
                  gsap/templates/text-mask-reveal.tsx (section headings)
8. Stats:         gsap/templates/text-counter.tsx
9. Horizontal:    gsap/templates/horizontal-scroll.tsx (gallery section)
```

### Timing:
```
All animations tied to scroll position via scrub:
- Theatre.js sequence plays 0% → 100% over hero viewport
- dissolve-plane tied to scroll progress between sections
- sticky-cards pin naturally via ScrollTrigger
- horizontal-scroll section pins and scrolls its track
```

### Install:
```bash
npm install gsap lenis @theatre/core three @react-three/fiber @react-three/drei split-type
```

---

## Universal Rules — Apply to ALL Recipes

1. **Always add `ambient-background` as the foundation layer** — pages without ambient motion feel dead
2. **Always add `use-smooth-scroll`** on desktop — it's 3KB for an instant premium upgrade
3. **Import easings from `presets/easings.js`** — never hardcode
4. **Import colors from `presets/colors.js`** — never hardcode hex values
5. **Check `presets/responsive-motion.ts`** — disable cursor/shaders/parallax on mobile
6. **Check `presets/themes.js`** — adapt particle colors + glass for light/dark mode
7. **Consult `presets/animation-meta.json`** — choose appropriate intensity per project type
8. **Use `presets/reduced-motion.ts`** — skip or simplify for `prefers-reduced-motion` users
