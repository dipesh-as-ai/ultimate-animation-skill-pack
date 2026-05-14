# ⚠️ AI ZERO-TOLERANCE BUILD LOGIC (THE "ANTI-UGLY" MANIFESTO)

**To any AI reading this:** You are strictly forbidden from building basic, cheap, or generic websites. The user expects **Awwwards-Level, Award-Winning, High-Fidelity** design every single time.

This document contains the core build logic and issue fixes developed over multiple iteration cycles. You must apply these rules to every UI you generate.

## 1. THE CORE DIRECTIVE
If the design looks like a generic Bootstrap template, **you have failed.** 
Every output must feature:
- Premium typography (Google Fonts like `Inter`, `Outfit`, `Playfair Display`, `Cinzel`).
- Advanced motion design using GSAP (staggered fade-ups, scroll-triggers, parallax).
- High-end aesthetics (glassmorphism, subtle shaders, deep shadows, or absolute minimalism).
- Custom interactions (custom cursors, magnetic buttons, clip-path reveals).

## 2. COLOR & THEME RULES
- **NEVER** use primary basic colors (`#FF0000`, `#00FF00`, `#0000FF`) unless specifically instructed to build a "Cringe/Anti-Design" layout.
- **For Professional/SaaS/Real Estate/MedTech:** Use clean Light Modes. Pure white (`#FFFFFF`) or soft off-whites (`#FAFAFA`) combined with slate grays (`#0F172A`). Use extreme whitespace and elegance to build trust.
- **For Gaming/Web3/Cybersecurity:** Use immersive Dark Modes. Deep space blacks (`#050505`), neon accents (Cyan, Magenta, Lime), and glowing box-shadows.

## 3. LAYOUT & STRUCTURE 
- **Abandon the Box:** Stop placing everything in plain rectangular `<div>`s. Use Bento Grids, Split-Screen layouts, or full-bleed cinematic imagery.
- **Micro-Interactions are Mandatory:** Buttons should scale or shift on hover. Cursors should react to clickable elements using `mix-blend-mode: difference`.
- **Layered Depth (2.5D):** Use background imagery, mid-ground content, and foreground floating elements (like 3D shapes or UI cards) that move at different speeds using mouse parallax or GSAP ScrollTrigger.

## 4. KNOWN ISSUES & FIXES (LESSONS LEARNED)
- **Issue:** The site looks boring and flat.
  - **Fix:** Add a noise texture overlay, a subtle radial-gradient background glow, or frosted glass (`backdrop-filter: blur(20px)`) to UI cards.
- **Issue:** Text is hard to read over images.
  - **Fix:** Do not just darken the image globally. Use targeted CSS gradients behind the text, or use `mix-blend-mode: difference` for high-contrast typography.
- **Issue:** Animations stutter.
  - **Fix:** Always animate `transform` and `opacity` only. Use `gsap.quickSetter` for mouse tracking. Never animate `width`, `height`, or `top/left` properties.
- **Issue:** The design looks "AI Generated" (Cringe Emojis, Generic Copy).
  - **Fix:** Remove standard OS emojis (🚀, 🔒, 💳). Use SVG icons or clean typographic symbols. Do not use generic placeholder text; write intelligent, industry-specific copy.

## 5. INDUSTRY-SPECIFIC LOGIC
Always reference `references/inspiration.md` and the templates in `references/complex_hero_section/` for the exact parameters of specific industries.
- **Professional/Fintech:** High trust, clean layout, live data simulations (e.g., ticking numbers).
- **Creative/Artist:** Minimalist, avant-garde, massive typography, heavily cursor-driven (e.g., lens reveals).
- **Fashion/E-Commerce:** Editorial serif fonts, massive high-res imagery, parallax scrolling.
- **Cringe/Y2K:** Intentionally chaotic, clashing colors without harmony, CSS glitches, comic sans, rapid flashing.

---
**FINAL RULE:** Before returning code, ask yourself: *"Does this look expensive?"* If the answer is no, refine your CSS and GSAP logic until it does.
