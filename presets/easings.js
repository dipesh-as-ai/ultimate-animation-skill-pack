/**
 * ULTIMATE ANIMATION SKILL PACK — EASING CURVES
 * 
 * Centralized easing values for consistent animation feel across
 * CSS, GSAP, and Framer Motion. Import from here — never hardcode.
 * 
 * Reference: https://easings.net
 */

// ─── GSAP EASING NAMES ──────────────────────────────────────────────────────
// Use these strings directly in gsap.to({ ease: "..." })
export const gsapEasings = {
  // Entrances — decelerate into final position
  entrance:       "expo.out",
  entranceSoft:   "power3.out",
  entranceSpring: "back.out(1.7)",
  entranceBounce: "bounce.out",

  // Exits — accelerate out of view
  exit:           "expo.in",
  exitSoft:       "power2.in",

  // Transitions — smooth both ways
  smooth:         "power2.inOut",
  smoothSlow:     "expo.inOut",
  smoothCinematic: "sine.inOut",

  // Special
  linear:         "none",
  elastic:        "elastic.out(1, 0.4)",
  snappy:         "power4.out",
}

// ─── CSS CUBIC-BEZIER VALUES ─────────────────────────────────────────────────
// Use in CSS: transition-timing-function: cubic-bezier(...)
// Use in Framer Motion: ease: [...]
export const cubicBezier = {
  // The "award-site" default — fast start, smooth finish
  expo:           [0.16, 1, 0.3, 1],

  // Material Design standard
  material:       [0.4, 0, 0.2, 1],

  // Apple-style
  apple:          [0.25, 0.1, 0.25, 1],

  // Overshoot (spring feel without physics)
  springy:        [0.34, 1.56, 0.64, 1],

  // Heavy deceleration (hero text entrance)
  heavyOut:       [0.08, 0.82, 0.17, 1],

  // Smooth in-out (page transitions)
  smoothInOut:    [0.65, 0, 0.35, 1],

  // Snap — quick start, abrupt stop
  snap:           [0.85, 0, 0.15, 1],

  // Ease in (for exits only)
  easeIn:         [0.55, 0, 1, 0.45],

  // Ease out (for entrances only)
  easeOut:        [0, 0.55, 0.45, 1],
}

// ─── CSS CUSTOM PROPERTIES ───────────────────────────────────────────────────
// Paste this into your globals.css :root block
export const cssEasingVariables = `
:root {
  --ease-expo:        cubic-bezier(0.16, 1, 0.3, 1);
  --ease-material:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-apple:       cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-springy:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-heavy-out:   cubic-bezier(0.08, 0.82, 0.17, 1);
  --ease-smooth:      cubic-bezier(0.65, 0, 0.35, 1);
  --ease-snap:        cubic-bezier(0.85, 0, 0.15, 1);
  --ease-in:          cubic-bezier(0.55, 0, 1, 0.45);
  --ease-out:         cubic-bezier(0, 0.55, 0.45, 1);
}
`

// ─── FRAMER MOTION SPRING CONFIGS ────────────────────────────────────────────
// Use in Framer: transition={{ type: "spring", ...spring.snappy }}
export const spring = {
  // Default — natural, balanced
  default:   { stiffness: 300, damping: 30 },

  // Snappy — quick, minimal overshoot
  snappy:    { stiffness: 500, damping: 30 },

  // Bouncy — playful, noticeable overshoot
  bouncy:    { stiffness: 400, damping: 15 },

  // Gentle — slow, smooth
  gentle:    { stiffness: 150, damping: 20 },

  // Heavy — feels like dragging something massive
  heavy:     { stiffness: 200, damping: 40, mass: 2 },

  // Wobbly — dramatic overshoot
  wobbly:    { stiffness: 180, damping: 12 },

  // Stiff — fast settle, almost no overshoot
  stiff:     { stiffness: 700, damping: 50 },
}

// ─── TIMING TOKENS ───────────────────────────────────────────────────────────
// Standardized durations in seconds
export const duration = {
  micro:     0.15,    // button press, toggle
  fast:      0.25,    // hover effects, small transitions
  normal:    0.4,     // standard entrance
  slow:      0.7,     // hero entrance, modal
  cinematic: 1.0,     // dramatic reveals
  glacial:   1.5,     // full-page transitions
}

// ─── STAGGER TOKENS ──────────────────────────────────────────────────────────
export const stagger = {
  tight:  0.03,   // characters
  normal: 0.08,   // words, small items
  loose:  0.12,   // cards, list items
  wide:   0.2,    // large sections
}
