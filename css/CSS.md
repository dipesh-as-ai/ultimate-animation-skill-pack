# CSS.md — CSS Animations, Keyframes & Visual Effects

> CSS handles what doesn't need JS — micro-interactions, backgrounds,
> glassmorphism, gradients, and simple entrances.
> If CSS can do it cleanly, CSS should do it.

---

## 1. Master Keyframes Library

Drop this into your global `globals.css`. Every keyframe is production-ready.

```css
/* ==========================================
   ULTIMATE KEYFRAMES LIBRARY
   Import once, use everywhere via class names
   ========================================== */

/* --- Entrances --- */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeRight {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes zoomOut {
  from { opacity: 0; transform: scale(1.2); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes flipIn {
  from { opacity: 0; transform: perspective(400px) rotateX(-30deg); }
  to   { opacity: 1; transform: perspective(400px) rotateX(0); }
}

/* --- Attention Seekers --- */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-8px) rotate(1deg); }
  66%       { transform: translateY(-4px) rotate(-1deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50%       { transform: translateY(-20%); animation-timing-function: cubic-bezier(0,0,0.2,1); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(3deg); }
}

/* --- Loaders / Progress --- */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes progressBar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* --- Backgrounds --- */
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes aurora {
  0%, 100% { transform: translateX(0) translateY(0) scale(1); }
  33%       { transform: translateX(30px) translateY(-20px) scale(1.05); }
  66%       { transform: translateX(-20px) translateY(10px) scale(0.95); }
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* --- Text --- */
@keyframes textReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* --- Utility Classes --- */
.animate-fadeUp     { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fadeDown   { animation: fadeDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fadeLeft   { animation: fadeLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fadeRight  { animation: fadeRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-zoomIn     { animation: zoomIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.animate-float      { animation: float 3s ease-in-out infinite; }
.animate-floatSlow  { animation: floatSlow 6s ease-in-out infinite; }
.animate-pulse      { animation: pulse 2s ease-in-out infinite; }
.animate-spin       { animation: spin 1s linear infinite; }
.animate-shimmer    { animation: shimmer 2s linear infinite; }

/* Delay utilities */
.delay-100  { animation-delay: 100ms; }
.delay-200  { animation-delay: 200ms; }
.delay-300  { animation-delay: 300ms; }
.delay-500  { animation-delay: 500ms; }
.delay-700  { animation-delay: 700ms; }
.delay-1000 { animation-delay: 1000ms; }
```

---

## 2. Micro-Interactions

Small, fast, satisfying. These make your UI feel alive.

```css
/* Button press feedback */
.btn {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
.btn:active { transform: translateY(0px) scale(0.97); box-shadow: none; }

/* Link underline slide */
.link-underline {
  position: relative;
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.link-underline:hover::after { width: 100%; }

/* Icon rotate on hover */
.icon-hover {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-hover:hover { transform: rotate(15deg) scale(1.1); }

/* Card lift */
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

/* Input focus glow */
.input-glow {
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
  outline: none;
}
.input-glow:focus {
  border-color: rgba(255,255,255,0.4);
  box-shadow: 0 0 0 3px rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.05);
}

/* Toggle switch */
.toggle {
  width: 44px; height: 24px;
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.25s ease;
}
.toggle::after {
  content: '';
  width: 18px; height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px; left: 3px;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toggle.on {
  background: rgba(255,255,255,0.8);
}
.toggle.on::after { transform: translateX(20px); }
```

---

## 3. Animated Backgrounds

```css
/* Animated gradient mesh — luxury feel */
.gradient-mesh {
  background: linear-gradient(135deg, #0a0a0a, #1a0a2e, #0a1a2e, #0a0a0a);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

/* Aurora effect — ethereal background */
.aurora-bg {
  position: relative;
  overflow: hidden;
  background: #050510;
}
.aurora-bg::before,
.aurora-bg::after {
  content: '';
  position: absolute;
  width: 60vw; height: 60vw;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: aurora 8s ease-in-out infinite;
}
.aurora-bg::before {
  background: radial-gradient(circle, #7928ca, transparent);
  top: -20%; left: -20%;
}
.aurora-bg::after {
  background: radial-gradient(circle, #0070f3, transparent);
  bottom: -20%; right: -20%;
  animation-delay: -4s;
}

/* Noise grain overlay — adds texture to dark backgrounds */
.grain::after {
  content: '';
  position: fixed;
  inset: -200%;
  width: 400%; height: 400%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 999;
}

/* Conic gradient rotation */
.conic-spin {
  background: conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #ff006e);
  animation: rotateGlow 4s linear infinite;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.6;
}

/* Shimmer skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 25%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

---

## 4. Glassmorphism System

```css
/* Tier 1 — Subtle glass (cards, panels) */
.glass-1 {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

/* Tier 2 — Standard glass (modals, nav) */
.glass-2 {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Tier 3 — Heavy glass (hero elements) */
.glass-3 {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glass hover state */
.glass-hover {
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.glass-hover:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}
```

---

## 5. Text Effects

```css
/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-purple {
  background: linear-gradient(135deg, #a78bfa, #7c3aed, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated gradient text */
.text-gradient-animate {
  background: linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #ff006e);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s linear infinite;
}

/* Text reveal via clip-path */
.text-reveal {
  animation: textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Glow text */
.text-glow {
  text-shadow:
    0 0 20px rgba(255,255,255,0.5),
    0 0 60px rgba(255,255,255,0.2);
}

/* Typewriter cursor */
.typewriter-cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  opacity: 0.7;
}
```

---

## 6. Border & Glow Effects

```css
/* Animated border gradient */
.border-gradient {
  position: relative;
  background: #0a0a0a;
  border-radius: 16px;
}
.border-gradient::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.1));
  z-index: -1;
}

/* Rotating border glow */
.glow-border {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}
.glow-border::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: conic-gradient(from 0deg, transparent 0deg, #7928ca 90deg, transparent 180deg);
  animation: rotateGlow 3s linear infinite;
  z-index: 0;
}
.glow-border-inner {
  position: relative;
  z-index: 1;
  background: #0a0a0a;
  border-radius: 15px;
  margin: 1px;
}

/* Spotlight hover on card */
.spotlight {
  position: relative;
  overflow: hidden;
}
.spotlight::before {
  content: '';
  position: absolute;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.08), transparent);
  border-radius: 50%;
  transform: translate(var(--mouse-x, -50%), var(--mouse-y, -50%));
  pointer-events: none;
  transition: opacity 0.3s;
  opacity: 0;
}
.spotlight:hover::before { opacity: 1; }
/* Pair with JS: el.addEventListener('mousemove', e => {
  el.style.setProperty('--mouse-x', e.offsetX - 100 + 'px');
  el.style.setProperty('--mouse-y', e.offsetY - 100 + 'px');
}) */
```

---

## CSS Performance Rules

```css
/* Always add this to elements that will animate */
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation completes to free GPU memory */
.animation-done {
  will-change: auto;
}

/* Prevent animation on reduced motion users */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
