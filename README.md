# Ultimate Animation Skill Pack v2.0

> Production-grade animation system for modern award-site-level websites.

**→ START HERE: Open [`SKILL.md`](SKILL.md) — it's the master index with a decision tree that routes you to the right module.**

## What's Inside

| Module | Files | Covers |
|--------|-------|--------|
| **css/** | CSS.md | 30+ keyframes, micro-interactions, animated backgrounds, text effects, border glow |
| **gsap/** | GSAP.md + 6 templates | ScrollTrigger reveals, stagger grids, text split, magnetic buttons, custom cursor, horizontal scroll |
| **framer/** | FRAMER.md + 6 templates | Entrance variants, stagger containers, page transitions, tilt cards, expand cards, animated lists |
| **glass/** | GLASS.md + 4 templates | Full glassmorphism design system — tokens, card, nav, button, input, modal, dashboard |
| **threejs/** | THREEJS.md + 3 templates | R3F scene setup, particle clouds, floating geometry, postprocessing |
| **theatre/** | THEATRE.md + 3 templates | Cinematic timeline sequencing, hero sequences, scroll-scrub hook |
| **shaders/** | SHADERS.md + 3 templates | GLSL noise gradients, liquid morph blobs, dissolve transitions, holographic surfaces |
| **particles/** | PARTICLES.md | TSParticles (constellation, snow, fireflies) + Vanta.js (12 ready-made 3D backgrounds) |
| **scroll/** | SCROLL.md | Lenis smooth scroll + GSAP parallax, snap sections, scroll progress bars |
| **lottie-rive/** | LOTTIE-RIVE.md | Lottie (After Effects export) + Rive (interactive state machines) |
| **presets/** | easings.js + variants.js | Centralized easing curves (GSAP/CSS/Framer), spring configs, Framer Motion variant library |

## Quick Start

### The Default Tech Stack 🛠️
For marketing sites, portfolios, and landing pages (where 60fps animation is the primary goal), the **assumed default is Vanilla HTML + CDN**. This completely eliminates Virtual DOM interference with GSAP.

```html
<!-- 1. Tailwind CSS via CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 2. Core Animation Stack via CDN -->
<script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```
*(If building a SaaS Dashboard or Web App with state, you may explicitly request React + Vite + Framer Motion).*

### Usage Steps
1. Read `SKILL.md` — the master decision tree tells you which module to use
2. Install additional module dependencies if needed (e.g., Three.js, Rive)
3. Import templates directly or use them as reference patterns
4. Import easings/variants from `presets/` for consistent animation feel

## The Animation Hierarchy

```
Tier 1 — UI Layer (most projects need only this)
├── CSS keyframes        → hovers, loaders, micro-interactions
├── GSAP                 → scroll triggers, text animations, timelines
└── Framer Motion        → React component animations, page transitions

Tier 2 — Visual Layer (portfolio & agency sites)
├── Three.js / R3F       → 3D scenes, models, environments
├── TSParticles / Vanta   → drop-in particle backgrounds
└── Lottie / Rive        → designer-exported animations

Tier 3 — Shader Layer (award-winning sites)
├── Custom GLSL          → liquid blobs, noise gradients, dissolves
├── Postprocessing       → bloom, chromatic aberration, depth of field
└── Theatre.js           → cinematic timeline control for 3D + DOM
```

## Installation

### Using CLI (Recommended)

```bash
# Install for your AI assistant
npx ultimate-anim init --ai claude        # Claude Code
npx ultimate-anim init --ai cursor        # Cursor
npx ultimate-anim init --ai windsurf      # Windsurf
npx ultimate-anim init --ai antigravity   # Antigravity
npx ultimate-anim init --ai gemini        # Gemini CLI
npx ultimate-anim init --ai copilot       # GitHub Copilot
npx ultimate-anim init --ai codex         # Codex CLI
npx ultimate-anim init --ai kiro          # Kiro
npx ultimate-anim init --ai roocode       # Roo Code
npx ultimate-anim init --ai opencode      # OpenCode
npx ultimate-anim init --ai continue      # Continue
npx ultimate-anim init --ai trae          # Trae
npx ultimate-anim init --ai all           # All platforms at once
```

### Global Install (Available for All Projects)

```bash
npx ultimate-anim init --ai claude --global
npx ultimate-anim init --ai cursor --global
```

### Other CLI Commands

```bash
npx ultimate-anim platforms     # List all supported platforms
npx ultimate-anim uninstall     # Auto-detect and remove
npx ultimate-anim help          # Show usage guide
```

### Manual Install

Copy this entire folder into your AI assistant's skills directory:

```bash
# Claude Code
cp -r ./ultimate-animations .claude/skills/ultimate-animations

# Cursor
cp -r ./ultimate-animations .cursor/skills/ultimate-animations
```

## Stack Support

- **React / Next.js** — all templates are React components
- **Vanilla JS** — GSAP.md, CSS.md, and SCROLL.md patterns work without React
- **TypeScript** — all templates are fully typed
- **Tailwind CSS** — Glass system includes Tailwind utilities

## File Count

- 12 modules
- 11 instruction documents (.md)
- 7 preset files (easings, variants, colors, themes, responsive-motion, reduced-motion, animation-meta)
- 25+ template components (.tsx)
- 3 reference instruction docs (AI_CORE_BUILD_LOGIC.md, EXECUTION_FLOW_PIPELINE.md, inspiration.md)
- **86+ premium HTML reference templates:**
  - 29 full-page industry UIs
  - 10 complex hero sections
  - 16 contact sections
  - 11 interactive 3D components
  - 20+ text animation patterns
- **150+ total skill pack files**

