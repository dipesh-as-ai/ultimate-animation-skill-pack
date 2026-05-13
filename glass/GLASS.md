---
name: glass-ui
description: >
  Glassmorphism design system — frosted glass cards, panels, modals, navbars,
  buttons, inputs. Covers design tokens, component CSS, Tailwind utilities,
  light/dark themes, background requirements, and browser fallbacks.
triggers:
  - glass card
  - glassmorphism
  - frosted glass
  - blur panel
  - backdrop blur
  - translucent UI
  - acrylic material
---

# Glass UI — Frosted Glass Design System

## What Makes Glass UI Work

Five properties must ALL be right or the effect looks cheap:

| Property | Value Range | Notes |
|---|---|---|
| `backdrop-filter: blur()` | 8px – 24px | Requires a visible background behind it |
| `background` | rgba(255,255,255, 0.05–0.15) | Dark theme: white tint. Light theme: 0.4–0.7 |
| `border` | 1px solid rgba(255,255,255, 0.1–0.2) | The subtle border is what sells it |
| `box-shadow` | see tokens | Depth + glow |
| Background layer | Required | Stars, gradient, 3D scene, blurred image |

**Most common mistake**: using glass on a plain solid background — it looks like a semi-transparent box.

---

## Design Tokens

```css
:root {
  /* Glass surfaces */
  --glass-bg:           rgba(255, 255, 255, 0.06);
  --glass-bg-hover:     rgba(255, 255, 255, 0.10);
  --glass-bg-active:    rgba(255, 255, 255, 0.14);
  --glass-bg-strong:    rgba(255, 255, 255, 0.12);

  /* Borders */
  --glass-border:       1px solid rgba(255, 255, 255, 0.12);
  --glass-border-glow:  1px solid rgba(120, 80, 255, 0.3);

  /* Blur */
  --glass-blur:         blur(16px) saturate(180%);
  --glass-blur-heavy:   blur(24px) saturate(200%);
  --glass-blur-light:   blur(8px)  saturate(150%);

  /* Shadows */
  --glass-shadow:       0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
  --glass-shadow-elevated: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,50,255,0.15), inset 0 1px 0 rgba(255,255,255,0.15);
  --glass-shadow-glow:  0 0 20px rgba(100,50,255,0.4), 0 8px 32px rgba(0,0,0,0.4);

  /* Text */
  --glass-text:         rgba(255, 255, 255, 0.92);
  --glass-text-muted:   rgba(255, 255, 255, 0.55);
  --glass-text-faint:   rgba(255, 255, 255, 0.3);

  /* Tints */
  --glass-blue:   rgba(59, 130, 246, 0.12);
  --glass-purple: rgba(139, 92, 246, 0.12);
  --glass-rose:   rgba(244, 63, 94, 0.12);
  --glass-amber:  rgba(245, 158, 11, 0.12);

  /* Accent */
  --accent:             #7c4dff;
  --accent-glow:        rgba(124, 77, 255, 0.4);
}
```

---

## Component CSS Patterns

### Glass Card
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  border-radius: 16px;
  box-shadow: var(--glass-shadow);
  padding: 24px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  background: var(--glass-bg-hover);
  box-shadow: var(--glass-shadow-glow);
  border-color: rgba(124, 77, 255, 0.25);
}
```

### Glass Navbar
```css
.glass-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: rgba(10, 6, 20, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  z-index: 100;
}
```

### Glass Button
```css
.glass-btn {
  padding: 10px 24px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur-light);
  border: var(--glass-border);
  border-radius: 8px;
  color: var(--glass-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--glass-shadow);
}
.glass-btn:hover {
  background: var(--glass-bg-hover);
  border-color: rgba(124, 77, 255, 0.4);
  box-shadow: var(--glass-shadow-glow);
  transform: translateY(-1px);
}
.glass-btn:active {
  transform: translateY(0);
  background: var(--glass-bg-active);
}
```

### Glass Modal
```css
.glass-modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: grid; place-items: center;
  z-index: 1000;
}
.glass-modal {
  width: min(520px, 90vw);
  background: rgba(15, 10, 30, 0.85);
  backdrop-filter: var(--glass-blur-heavy);
  border: var(--glass-border-glow);
  border-radius: 20px;
  box-shadow: var(--glass-shadow-elevated);
  padding: 32px;
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
```

### Glass Input
```css
.glass-input {
  width: 100%; padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--glass-text);
  font-size: 14px;
  backdrop-filter: blur(8px);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.glass-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.2);
}
.glass-input::placeholder { color: var(--glass-text-faint); }
```

---

## Background Requirements

Glass only works on rich backgrounds. Options:

### Gradient mesh
```css
background:
  radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 50%),
  radial-gradient(ellipse at 80% 80%, #2563eb 0%, transparent 50%),
  radial-gradient(ellipse at 60% 10%, #db2777 0%, transparent 40%),
  #0a0a0f;
```

### 3D scene (see threejs/THREEJS.md)
Position Canvas behind UI with `position: fixed; z-index: -1`.

### Full-bleed image
Use a high-quality, colorful image. Glass on flat/muted images looks weak.

---

## Light Theme Variant
```css
.light-theme {
  --glass-bg:       rgba(255, 255, 255, 0.5);
  --glass-bg-hover: rgba(255, 255, 255, 0.65);
  --glass-border:   1px solid rgba(255, 255, 255, 0.8);
  --glass-shadow:   0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
  --glass-text:     rgba(15, 10, 30, 0.9);
  --glass-text-muted: rgba(15, 10, 30, 0.5);
}
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Glass on solid background | Always have colorful/blurred background |
| No border | Add `border: 1px solid rgba(255,255,255,0.12)` |
| Too much blur (>30px) | Cap at 24px; beyond looks like fog |
| Too opaque (>0.5) | Keep bg at 0.05–0.15 for dark themes |
| Missing `-webkit-backdrop-filter` | Always add Safari vendor prefix |
| Text unreadable | Bump text opacity or add `text-shadow` |
| `backdrop-filter` not working | Parent must NOT have `overflow: hidden` |

---

## Browser Fallback
```css
@supports not (backdrop-filter: blur(1px)) {
  .glass-card {
    background: rgba(15, 10, 30, 0.85);
  }
}
```

---

## Templates

- `templates/glass-card.tsx` — Card with shimmer hover effect
- `templates/glass-nav.tsx` — Floating navigation bar
- `templates/glass-components.tsx` — Card + Button + Input library
- `templates/glass-dashboard.tsx` — Full dashboard example
