# GSAP.md — GreenSock Animation Platform Patterns

> GSAP is the professional's tool. It handles what CSS and Framer can't.
> ScrollTrigger, SplitText, timelines, magnetic effects, counters, loaders.

---

## Setup (do this once per project)

```js
// lib/gsap.js — centralized GSAP setup
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global defaults — override per-animation as needed
gsap.defaults({
  ease: "expo.out",
  duration: 0.8,
});

// Smooth scroll setup (pairs with SCROLL.md)
ScrollTrigger.defaults({
  markers: false, // set true while debugging, false in production
});

export { gsap, ScrollTrigger };
```

---

## 1. ScrollTrigger — Element Reveals

The most-used pattern. Elements fade/slide in as you scroll.

```js
// Basic reveal — attach to any element
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",       // trigger when top of el hits 85% of viewport
          end: "top 50%",
          toggleActions: "play none none none",  // play once, don't reverse
        },
      });
    }, el);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return ref;
}

// Usage:
// const cardRef = useReveal();
// <div ref={cardRef}>Content</div>
```

```js
// Batch reveal — multiple elements staggered
// Use this for grids, lists, card sections
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function revealBatch(selector) {
  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0,
        y: 80,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
      });
    },
    start: "top 88%",
    once: true, // only trigger once per element
  });
}

// Usage in useEffect:
// revealBatch(".card");
// revealBatch(".grid-item");
```

---

## 2. Text Animations

### Split Text — Character / Word / Line

```js
import { gsap } from "@/lib/gsap";
import SplitType from "split-type"; // npm install split-type

// Animate each character from below
export function animateTextChars(selector) {
  const text = new SplitType(selector, { types: "chars,words" });

  gsap.from(text.chars, {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      once: true,
    },
  });

  return () => text.revert(); // call on unmount
}

// Word-by-word slide up (cleaner for headings)
export function animateTextWords(selector) {
  const text = new SplitType(selector, { types: "words" });

  gsap.from(text.words, {
    opacity: 0,
    y: 50,
    stagger: 0.07,
    duration: 0.8,
    ease: "expo.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      once: true,
    },
  });

  return () => text.revert();
}

// Scramble text on hover (use TextPlugin)
export function scrambleOnHover(element) {
  const original = element.textContent;
  const chars = "!@#$%^&*ABCDEFabcdef0123456789";

  element.addEventListener("mouseenter", () => {
    gsap.to(element, {
      duration: 0.6,
      text: {
        value: original,
        delimiter: "",
        scramble: true,
        chars,
        speed: 0.5,
      },
      ease: "none",
    });
  });
}
```

### Typewriter Effect

```js
// Clean typewriter with cursor
export function typewriter(selector, phrases, options = {}) {
  const el = document.querySelector(selector);
  const { speed = 0.05, pauseBetween = 1.5 } = options;

  let tl = gsap.timeline({ repeat: -1 });

  phrases.forEach((phrase) => {
    tl.to(el, {
      duration: phrase.length * speed,
      text: phrase,
      ease: "none",
    })
    .to({}, { duration: pauseBetween }) // pause
    .to(el, {
      duration: 0.5,
      text: "",
      ease: "none",
    });
  });

  return tl;
}
```

---

## 3. Page Loader / Preloader

```js
// Full preloader — covers viewport, reveals site underneath
// Run this before any other animations

export function runPreloader(onComplete) {
  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: "expo.inOut" },
  });

  tl
    // Counter from 0 to 100
    .to(".loader-count", {
      duration: 2,
      textContent: "100",
      roundProps: "textContent",
      ease: "power1.inOut",
    })
    // Logo or brand mark entrance
    .from(".loader-logo", {
      y: 40,
      opacity: 0,
      duration: 0.6,
    }, "-=1.5")
    // Slide loader off screen upward
    .to(".loader", {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    }, "+=0.3")
    // Reveal hero content underneath
    .from(".hero-content > *", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "expo.out",
    }, "-=0.5");

  return tl;
}
```

---

## 4. Magnetic Button Effect

Cursor pulls button toward mouse — premium feel, used on portfolio sites.

```js
// React component
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function MagneticButton({ children, strength = 0.4, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const bounds = el.getBoundingClientRect();

    const onMove = (e) => {
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
}
```

---

## 5. Custom Cursor

```js
// Cursor that follows mouse with lag — feels premium
export function initCustomCursor() {
  const cursor = document.querySelector(".cursor-dot");
  const follower = document.querySelector(".cursor-ring");

  let mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: "none",
    });

    // Ring follows with lag
    gsap.to(follower, {
      x: mouseX,
      y: mouseY,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // Scale up on hoverable elements
  document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(follower, { scale: 2.5, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(follower, { scale: 1, duration: 0.3 });
    });
  });
}

/* Required CSS:
.cursor-dot {
  width: 6px; height: 6px;
  background: white;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  width: 36px; height: 36px;
  border: 1.5px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
}
*/
```

---

## 6. Animated Counter

```js
// Counts up when scrolled into view
export function animateCounter(selector, end, options = {}) {
  const { duration = 2, prefix = "", suffix = "", separator = "," } = options;

  const el = document.querySelector(selector);
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = Math.round(obj.val)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
          el.textContent = `${prefix}${formatted}${suffix}`;
        },
      });
    },
  });
}

// Usage:
// animateCounter(".stat-1", 10000, { suffix: "+", separator: "," })
// animateCounter(".stat-2", 99, { suffix: "%" })
```

---

## 7. Horizontal Scroll Section

```js
// Pin a section and scroll it horizontally
export function horizontalScroll(sectionSelector, trackSelector) {
  const section = document.querySelector(sectionSelector);
  const track = document.querySelector(trackSelector);

  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

  gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
```

---

## GSAP Cleanup Rules

**Always clean up. Memory leaks break SPAs.**

```js
// In React useEffect:
useEffect(() => {
  const ctx = gsap.context(() => {
    // All your gsap code here
  }, containerRef);

  return () => ctx.revert(); // ✅ kills all animations + ScrollTriggers
}, []);
```

```js
// In vanilla JS (Next.js page unmount):
const st = ScrollTrigger.create({ ... });
return () => st.kill();
```
