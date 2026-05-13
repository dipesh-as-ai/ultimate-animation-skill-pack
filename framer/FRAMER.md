# FRAMER.md — Framer Motion 11 Patterns

> Framer Motion is the React-native animation layer.
> Declarative, gesture-aware, layout-aware. Best DX for React projects.

---

## Setup

```js
// No setup required — just install and import
// npm install framer-motion

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
```

---

## 1. Entrance Variants — The Core System

Variants are reusable animation states. Define once, use everywhere.

```js
// variants.js — import these wherever needed
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }, // overshoot spring
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```

```jsx
// Usage — scroll-triggered entrance
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/variants";

export function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
```

---

## 2. Stagger — Grid / List Entrance

```js
// Container stagger variant
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,    // delay between each child
      delayChildren: 0.2,      // initial delay before first child
    },
  },
};

// Child variant — pair with staggerContainer
export const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
```

```jsx
// Card grid with stagger
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/variants";

export function CardGrid({ cards }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {cards.map((card) => (
        <motion.div key={card.id} variants={staggerItem} className="card">
          {card.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 3. Page Transitions — Next.js App Router

```jsx
// app/template.jsx — wraps every page route
"use client";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function Template({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
```

```jsx
// Curtain wipe transition — more cinematic
const curtainVariants = {
  initial: { scaleY: 0, originY: 0 },
  animate: { scaleY: 0, originY: 0 },
  exit: {
    scaleY: 1,
    originY: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export function CurtainTransition({ children }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      {children}
    </>
  );
}
```

---

## 4. Gesture Animations

### Hover Card with 3D Tilt

```jsx
export function TiltCard({ children }) {
  return (
    <motion.div
      className="card"
      whileHover={{
        rotateX: 8,
        rotateY: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.97 }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
```

### Hover Button with Shine

```jsx
export function ShineButton({ children, ...props }) {
  return (
    <motion.button
      className="relative overflow-hidden px-8 py-3 bg-white text-black font-semibold rounded-full"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
        variants={{
          hover: {
            translateX: "200%",
            transition: { duration: 0.6, ease: "easeInOut" },
          },
        }}
      />
      {children}
    </motion.button>
  );
}
```

### Drag Card

```jsx
export function DragCard({ children }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      whileHover={{ cursor: "grab" }}
      className="card select-none"
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Layout Animations

Framer's secret weapon — animate between DOM layout states automatically.

```jsx
// Expanding card — click to expand, click to collapse
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExpandCard({ title, body }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout                            // ← magic: animates layout changes
      onClick={() => setExpanded(!expanded)}
      className="card overflow-hidden cursor-pointer"
      initial={{ borderRadius: 16 }}
    >
      <motion.h3 layout="position">{title}</motion.h3>
      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {body}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

```jsx
// Shared layout transition — element moves between positions
// e.g., thumbnail expands to full image
import { motion } from "framer-motion";

export function Gallery({ items, selected, onSelect }) {
  return (
    <>
      <div className="grid">
        {items.map((item) => (
          <motion.img
            key={item.id}
            layoutId={`image-${item.id}`}    // ← same layoutId = shared transition
            src={item.src}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.img
              layoutId={`image-${selected.id}`}
              src={selected.src}
              className="max-w-2xl rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 6. Scroll-Based with useScroll + useTransform

```jsx
// Parallax hero — element moves at different speed than scroll
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}
```

```jsx
// Scroll progress bar
import { useScroll, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-white z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

## 7. AnimatePresence — List Add / Remove

```jsx
// Animated list where items fade in/out
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedList({ items, onRemove }) {
  return (
    <ul>
      <AnimatePresence mode="popLayout">  {/* popLayout = smooth reflow */}
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.label}
            <button onClick={() => onRemove(item.id)}>×</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
```

---

## Framer Motion Rules

```
✅ Always wrap top-level router with <AnimatePresence>
✅ Use layout prop for any element that changes size/position
✅ Use layoutId for shared element transitions between routes
✅ Use useInView({ once: true }) — don't re-animate on scroll back
✅ Prefer variants over inline animate props for reusability
✅ useSpring() for physics-based smooth following effects
❌ Never nest <AnimatePresence> inside conditionals
❌ Don't animate width/height — use scaleX/scaleY or layout prop
❌ Don't use motion.div for every element — only animated ones
```
