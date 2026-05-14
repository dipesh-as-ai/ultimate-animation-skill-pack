# THE 5-PHASE EXECUTION PIPELINE (AI WORKFLOW)

**CRITICAL INSTRUCTION:** Do not attempt to build a complex website in a single step. GSAP animations will break if the DOM is not structurally sound. You MUST follow this 5-phase execution flow.

## PHASE 0: The Study (Reference Absorption)
* **Goal:** Learn from existing reference templates BEFORE writing a single line of code.
* **Rules:**
  - Identify the industry/niche of the project (SaaS, Gaming, Dental, Luxury, etc.).
  - Browse the relevant reference templates in `references/UIs/`, `references/complex_hero_section/`, and `references/Contact_section/` that match the industry.
  - Study the layout patterns, color palettes, typography choices, and animation orchestration.
  - Browse `references/3d_components/` and `references/Text_animations/` for advanced interaction patterns.
  - **DO NOT COPY** any reference. Absorb the aesthetic standard, then create something NEW and BETTER.
  - *Checkpoint:* You should be able to articulate 3 specific design decisions inspired by (but different from) the references.

## PHASE 1: The Skeleton (DOM Structure)
* **Goal:** Build the raw HTML semantic structure.
* **Rules:**
  - Create the layout using clean, semantic HTML5 tags (`<section>`, `<article>`, `<main>`).
  - Do not apply heavy CSS styling yet.
  - Wrap elements that will be animated later in specific target classes (e.g., `.gs-reveal`, `.gs-parallax`).
  - *Checkpoint:* If CSS is turned off, the page should still make logical sense.

## PHASE 2: The Grid (Base Styling & Responsiveness)
* **Goal:** Establish the layout and responsive boundaries.
* **Rules:**
  - Apply CSS Grid or Flexbox to build modern layouts (e.g., Asymmetric Bento Grids, Horizontal Scroll Tracks).
  - Ensure `max-width` and centering are applied so the UI doesn't break on ultrawide monitors.
  - Implement basic media queries to ensure the structure stacks correctly on mobile (`@media (max-width: 1024px)`).
  - *Checkpoint:* The page layout should look perfect and static. No animations yet.

## PHASE 3: The Paint (Aesthetics & Tokens)
* **Goal:** Apply the high-fidelity design layer.
* **Rules:**
  - Inject premium typography (Google Fonts).
  - Apply the defined color palette (from `presets/colors.js` or `inspiration.md`).
  - Add lighting effects: `box-shadow` for depth, `radial-gradient` for background ambient glows.
  - Apply glassmorphism (`backdrop-filter: blur(15px)`) where needed.
  - Add noise grain overlays, gradient meshes, or ambient backgrounds for visual depth.
  - *Checkpoint:* The site should now look like a static screenshot of an Awwwards winner.

## PHASE 4: The Motion (GSAP & Framer)
* **Goal:** Bring the UI to life.
* **Rules:**
  - Inject GSAP and ScrollTrigger.
  - Apply entrance staggers to the `.gs-reveal` classes.
  - Hook ScrollTrigger to horizontal containers or parallax image classes.
  - Implement Custom Cursors and Magnetic button logic (desktop only — check `presets/responsive-motion.ts`).
  - Initialize Lenis smooth scroll (see `scroll/SCROLL.md`).
  - **Golden Rule:** ONLY animate `transform` (x, y, scale, rotation) and `opacity`. NEVER animate layout properties like `width`, `height`, or `margin`.

## PHASE 5: The Quality Gate (Pre-Delivery Audit)
* **Goal:** Ensure the output meets award-winning standards.
* **Rules:**
  - Run through the Pre-Delivery Checklist in `SKILL.md` (Performance, Timing, Accessibility, Cleanup, Visual Quality).
  - Verify `prefers-reduced-motion` is respected.
  - Test dark mode if applicable.
  - Ask yourself: **"Does this look expensive?"** — If NO, go back to Phase 3.
  - *Checkpoint:* The final output should be indistinguishable from a professional agency build.

---
*By forcing this separation of concerns, you prevent GSAP from calculating dimensions on broken layouts, ensuring buttery-smooth 60fps performance.*

