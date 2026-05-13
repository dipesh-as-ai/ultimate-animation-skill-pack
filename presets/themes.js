/**
 * ULTIMATE ANIMATION SKILL PACK — THEME-AWARE ANIMATION TOKENS
 *
 * Animation values that adapt to dark and light themes.
 * Use this to ensure particles, glows, glass, and text effects
 * look premium on BOTH dark and light backgrounds.
 *
 * Usage:
 *   import { themes, getTheme } from '@/presets/themes'
 *   const t = getTheme('dark') // or detect from CSS/user preference
 */

// ─── DARK THEME (Default) ────────────────────────────────────────────────────
export const dark = {
  name: 'dark',

  // Background surfaces
  bg: {
    page: '#050510',
    card: 'rgba(255, 255, 255, 0.06)',
    cardHover: 'rgba(255, 255, 255, 0.10)',
    elevated: 'rgba(255, 255, 255, 0.12)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text colors
  text: {
    primary: 'rgba(255, 255, 255, 0.92)',
    secondary: 'rgba(255, 255, 255, 0.55)',
    faint: 'rgba(255, 255, 255, 0.30)',
    gradient: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    default: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.20)',
  },

  // Glass effects
  glass: {
    bg: 'rgba(255, 255, 255, 0.06)',
    blur: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    shadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  },

  // Particle configs
  particles: {
    color: '#ffffff',
    opacity: { min: 0.1, max: 0.4 },
    linkColor: '#ffffff',
    linkOpacity: 0.1,
  },

  // Glow / bloom effects
  glow: {
    accent: 'rgba(124, 77, 255, 0.4)',
    soft: 'rgba(255, 255, 255, 0.08)',
    text: '0 0 20px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)',
  },

  // Shader colors (vec3 normalized 0-1)
  shader: {
    color1: [0.47, 0.16, 0.8],   // violet
    color2: [0.0, 0.44, 0.95],    // blue
    color3: [0.86, 0.14, 0.55],   // pink
    bgColor: [0.02, 0.02, 0.06],  // near-black
  },

  // Three.js materials
  three: {
    emissive: '#334466',
    emissiveIntensity: 0.3,
    envMapIntensity: 1.0,
    bgColor: '#080818',
  },

  // Gradient mesh background
  meshBackground: `
    radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, #2563eb 0%, transparent 50%),
    radial-gradient(ellipse at 60% 10%, #db2777 0%, transparent 40%),
    #0a0a0f
  `,
}

// ─── LIGHT THEME ─────────────────────────────────────────────────────────────
export const light = {
  name: 'light',

  // Background surfaces
  bg: {
    page: '#fafafa',
    card: 'rgba(255, 255, 255, 0.65)',
    cardHover: 'rgba(255, 255, 255, 0.80)',
    elevated: 'rgba(255, 255, 255, 0.90)',
    overlay: 'rgba(255, 255, 255, 0.6)',
  },

  // Text colors
  text: {
    primary: 'rgba(15, 10, 30, 0.90)',
    secondary: 'rgba(15, 10, 30, 0.55)',
    faint: 'rgba(15, 10, 30, 0.30)',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, rgba(26,26,46,0.6) 100%)',
  },

  // Borders
  border: {
    subtle: 'rgba(0, 0, 0, 0.05)',
    default: 'rgba(0, 0, 0, 0.08)',
    strong: 'rgba(0, 0, 0, 0.15)',
  },

  // Glass effects
  glass: {
    bg: 'rgba(255, 255, 255, 0.50)',
    blur: 'blur(16px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.80)',
    shadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
  },

  // Particle configs
  particles: {
    color: '#1a1a2e',
    opacity: { min: 0.05, max: 0.15 },
    linkColor: '#1a1a2e',
    linkOpacity: 0.05,
  },

  // Glow / bloom effects
  glow: {
    accent: 'rgba(124, 77, 255, 0.2)',
    soft: 'rgba(0, 0, 0, 0.04)',
    text: '0 0 20px rgba(124,77,255,0.15), 0 0 60px rgba(124,77,255,0.05)',
  },

  // Shader colors (vec3 normalized 0-1)
  shader: {
    color1: [0.58, 0.40, 0.95],   // lighter violet
    color2: [0.30, 0.60, 1.0],    // lighter blue
    color3: [0.95, 0.40, 0.65],   // lighter pink
    bgColor: [0.96, 0.96, 0.98],  // near-white
  },

  // Three.js materials
  three: {
    emissive: '#aabbdd',
    emissiveIntensity: 0.15,
    envMapIntensity: 0.6,
    bgColor: '#f0f0f8',
  },

  // Gradient mesh background
  meshBackground: `
    radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.10) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 10%, rgba(219,39,119,0.08) 0%, transparent 40%),
    #fafafa
  `,
}

// ─── THEME UTILITIES ─────────────────────────────────────────────────────────

export const themes = { dark, light }

/**
 * Get theme config by name.
 * @param {'dark' | 'light'} name
 */
export function getTheme(name = 'dark') {
  return themes[name] || themes.dark
}

/**
 * Detect user's system theme preference.
 * Returns 'dark' or 'light'.
 */
export function detectSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
