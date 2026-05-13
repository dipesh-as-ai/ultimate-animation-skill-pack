/**
 * ULTIMATE ANIMATION SKILL PACK — COLOR SYSTEM
 *
 * Unified color palette for consistent, premium aesthetics.
 * Import from here — never hardcode hex values in animations.
 *
 * Usage:
 *   import { palette, gradients } from '@/presets/colors'
 *   background: gradients.aurora
 *   color: palette.text.primary
 */

// ─── SURFACE SCALE ───────────────────────────────────────────────────────────
// Dark theme depth layers — use higher numbers for elevated surfaces
export const surface = {
  0: '#030308',    // deepest void (page background)
  1: '#050510',    // base layer
  2: '#0a0a1a',    // card surface
  3: '#12122a',    // elevated surface
  4: '#1a1a3e',    // highest elevation
}

// ─── ACCENT FAMILIES ─────────────────────────────────────────────────────────
// Each accent includes base, glow (for shadows/bloom), and muted (for tints)
export const accent = {
  violet: {
    base: '#7c4dff',
    glow: 'rgba(124, 77, 255, 0.4)',
    muted: 'rgba(124, 77, 255, 0.12)',
    light: '#a78bfa',
    dark: '#5b21b6',
  },
  blue: {
    base: '#3a86ff',
    glow: 'rgba(58, 134, 255, 0.4)',
    muted: 'rgba(58, 134, 255, 0.12)',
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  cyan: {
    base: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    muted: 'rgba(6, 182, 212, 0.12)',
    light: '#22d3ee',
    dark: '#0e7490',
  },
  rose: {
    base: '#ff006e',
    glow: 'rgba(255, 0, 110, 0.4)',
    muted: 'rgba(255, 0, 110, 0.12)',
    light: '#fb7185',
    dark: '#be123c',
  },
  amber: {
    base: '#ffbe0b',
    glow: 'rgba(255, 190, 11, 0.4)',
    muted: 'rgba(255, 190, 11, 0.12)',
    light: '#fcd34d',
    dark: '#b45309',
  },
  emerald: {
    base: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    muted: 'rgba(16, 185, 129, 0.12)',
    light: '#34d399',
    dark: '#047857',
  },
}

// ─── TEXT HIERARCHY ──────────────────────────────────────────────────────────
export const text = {
  primary:   'rgba(255, 255, 255, 0.92)',
  secondary: 'rgba(255, 255, 255, 0.55)',
  faint:     'rgba(255, 255, 255, 0.30)',
  disabled:  'rgba(255, 255, 255, 0.15)',
  inverse:   'rgba(15, 10, 30, 0.90)',
}

// ─── GLASS SURFACES ──────────────────────────────────────────────────────────
export const glass = {
  bg:          'rgba(255, 255, 255, 0.06)',
  bgHover:     'rgba(255, 255, 255, 0.10)',
  bgActive:    'rgba(255, 255, 255, 0.14)',
  bgStrong:    'rgba(255, 255, 255, 0.12)',
  border:      'rgba(255, 255, 255, 0.12)',
  borderHover: 'rgba(255, 255, 255, 0.20)',
}

// ─── GRADIENT PRESETS ────────────────────────────────────────────────────────
export const gradients = {
  // Hero-grade gradients
  aurora:     'linear-gradient(135deg, #7c3aed, #2563eb, #db2777)',
  midnight:   'linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a1a2e, #0a0a0a)',
  fire:       'linear-gradient(135deg, #ff006e, #ff6030, #ffbe0b)',
  ocean:      'linear-gradient(135deg, #0070f3, #06b6d4, #10b981)',
  sunset:     'linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)',
  neon:       'linear-gradient(135deg, #7c4dff, #ff006e)',

  // Animated mesh backgrounds (use with background-size: 400% 400%)
  meshAurora:  'linear-gradient(135deg, #0a0a0a, #1a0a2e, #0a1a2e, #0a0a0a)',
  meshCosmic:  'radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #2563eb 0%, transparent 50%), radial-gradient(ellipse at 60% 10%, #db2777 0%, transparent 40%), #0a0a0f',
  meshNebula:  'radial-gradient(ellipse at 15% 30%, #7c4dff 0%, transparent 45%), radial-gradient(ellipse at 85% 70%, #3a86ff 0%, transparent 45%), radial-gradient(ellipse at 50% 90%, #06b6d4 0%, transparent 40%), #030308',

  // Text gradients
  textFade:    'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
  textViolet:  'linear-gradient(135deg, #a78bfa, #7c3aed, #4f46e5)',
  textSunset:  'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #ff006e)',
}

// ─── CSS CUSTOM PROPERTIES ───────────────────────────────────────────────────
// Paste into :root {} in globals.css for CSS-native access
export const cssColorVariables = `
:root {
  /* Surfaces */
  --surface-0: #030308;
  --surface-1: #050510;
  --surface-2: #0a0a1a;
  --surface-3: #12122a;
  --surface-4: #1a1a3e;

  /* Accent — Violet (default) */
  --accent: #7c4dff;
  --accent-glow: rgba(124, 77, 255, 0.4);
  --accent-muted: rgba(124, 77, 255, 0.12);

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-faint: rgba(255, 255, 255, 0.30);

  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-bg-hover: rgba(255, 255, 255, 0.10);
  --glass-border: rgba(255, 255, 255, 0.12);

  /* Gradients */
  --gradient-aurora: linear-gradient(135deg, #7c3aed, #2563eb, #db2777);
  --gradient-mesh: radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 50%),
                   radial-gradient(ellipse at 80% 80%, #2563eb 0%, transparent 50%),
                   radial-gradient(ellipse at 60% 10%, #db2777 0%, transparent 40%),
                   #0a0a0f;
}
`

// ─── PALETTE BUNDLE ──────────────────────────────────────────────────────────
// Single import for everything
export const palette = {
  surface,
  accent,
  text,
  glass,
  gradients,
}
