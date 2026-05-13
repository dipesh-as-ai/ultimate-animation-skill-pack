---
name: glsl-shaders
description: >
  Custom GLSL shader patterns for R3F — noise gradients, liquid morphing,
  fluid simulation, holographic effects, and dissolve transitions. This is
  what separates "nice 3D" from "how did they do that."
triggers:
  - shader
  - GLSL
  - custom material
  - noise effect
  - liquid effect
  - fluid animation
  - morphing
  - gradient shader
  - holographic
  - dissolve effect
---

# GLSL Shaders — Custom Visual Effects

## Why Shaders

CSS animates boxes. GSAP animates timelines. **Shaders animate pixels.**

Every pixel on screen runs your shader code simultaneously on the GPU.
This is how award sites create effects that look impossible:
- Liquid morphing blobs
- Noise-driven gradient fields
- Holographic iridescence
- Dissolve/burn transitions
- Fluid simulations
- Organic, flowing textures

---

## Mental Model

```
Vertex Shader       → WHERE each point appears (position, distortion)
Fragment Shader     → WHAT COLOR each pixel shows (color, texture, glow)
Uniforms            → VALUES you send from JavaScript (time, mouse, scroll)
```

Every shader needs at least:
- `uniform float uTime` — for animation (elapsed seconds)
- `uniform vec2 uResolution` — viewport size
- `uniform vec2 uMouse` — mouse position (optional)

---

## Setup in R3F

```tsx
import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// 1. Define your shader material
const MyShaderMaterial = shaderMaterial(
  // Uniforms (default values)
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color('#7928ca'),
    uColor2: new THREE.Color('#0070f3'),
  },
  // Vertex shader
  /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /* glsl */`
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    void main() {
      vec3 color = mix(uColor1, uColor2, vUv.x + sin(uTime) * 0.3);
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

// 2. Extend so R3F knows about it
extend({ MyShaderMaterial })

// 3. Use it
function ShaderPlane() {
  const matRef = useRef()
  useFrame((state) => {
    matRef.current.uTime = state.clock.elapsedTime
  })
  return (
    <mesh>
      <planeGeometry args={[4, 4, 32, 32]} />
      <myShaderMaterial ref={matRef} />
    </mesh>
  )
}
```

---

## Essential GLSL Functions

```glsl
// ── Noise (Simplex 2D) ──────────────────────────────────────
// Copy this into any shader that needs organic movement
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// ── Rotation matrix ──────────────────────────────────────────
mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

// ── SDF Circle ───────────────────────────────────────────────
float sdCircle(vec2 p, float r) { return length(p) - r; }

// ── Smooth minimum (blend two shapes) ────────────────────────
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}
```

---

## Shader Patterns

### 1. Noise Gradient Background
```glsl
// Fragment shader — organic shifting gradient
uniform float uTime;
varying vec2 vUv;

void main() {
  float n = snoise(vUv * 3.0 + uTime * 0.3);
  vec3 color1 = vec3(0.47, 0.16, 0.8);  // purple
  vec3 color2 = vec3(0.0, 0.44, 0.95);  // blue
  vec3 color3 = vec3(0.86, 0.14, 0.55); // pink
  vec3 col = mix(color1, color2, n * 0.5 + 0.5);
  col = mix(col, color3, snoise(vUv * 2.0 - uTime * 0.2) * 0.3 + 0.3);
  gl_FragColor = vec4(col, 1.0);
}
```

### 2. Liquid Morph Blob
```glsl
// Fragment — metaball-like liquid blob
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float d1 = sdCircle(uv - vec2(sin(uTime*0.5)*0.4, cos(uTime*0.7)*0.3), 0.4);
  float d2 = sdCircle(uv - vec2(cos(uTime*0.3)*0.5, sin(uTime*0.6)*0.4), 0.35);
  float d3 = sdCircle(uv - uMouse * 0.5, 0.3);
  float d = smin(smin(d1, d2, 0.5), d3, 0.5);
  d += snoise(uv * 4.0 + uTime * 0.5) * 0.08;
  vec3 col = mix(vec3(0.47, 0.16, 0.8), vec3(0.0, 0.44, 0.95), smoothstep(-0.1, 0.1, d));
  float glow = 0.01 / abs(d);
  col += glow * vec3(0.5, 0.3, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
```

### 3. Holographic / Iridescent Surface
```glsl
// Fragment — shifts color based on view angle
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
  vec3 iridescence = vec3(
    sin(fresnel * 6.28 + uTime * 0.5) * 0.5 + 0.5,
    sin(fresnel * 6.28 + uTime * 0.5 + 2.094) * 0.5 + 0.5,
    sin(fresnel * 6.28 + uTime * 0.5 + 4.188) * 0.5 + 0.5
  );
  vec3 base = vec3(0.05);
  vec3 col = mix(base, iridescence, fresnel);
  col += fresnel * 0.3; // edge glow
  gl_FragColor = vec4(col, 0.9);
}
```

### 4. Dissolve / Burn Transition
```glsl
// Fragment — dissolve based on scroll progress
uniform float uTime;
uniform float uProgress; // 0 = solid, 1 = dissolved
varying vec2 vUv;

void main() {
  float noise = snoise(vUv * 10.0 + uTime * 0.1);
  float edge = smoothstep(uProgress - 0.05, uProgress + 0.05, noise * 0.5 + 0.5);
  vec3 baseColor = vec3(0.9);
  vec3 edgeColor = vec3(1.0, 0.3, 0.0); // orange burn edge
  vec3 col = mix(edgeColor, baseColor, smoothstep(uProgress - 0.08, uProgress, noise * 0.5 + 0.5));
  float alpha = edge;
  gl_FragColor = vec4(col, alpha);
}
```

### 5. Vertex Distortion (Wavy Mesh)
```glsl
// Vertex shader — makes flat plane wave like water
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(pos.x * 4.0 + uTime * 2.0) * 0.15;
  pos.z += cos(pos.y * 3.0 + uTime * 1.5) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

---

## Performance Rules

1. Keep fragment shader math simple — runs per-pixel per-frame
2. Use `lowp` / `mediump` precision where possible on mobile
3. Avoid `if/else` branching in shaders — use `step()` and `smoothstep()`
4. Pre-compute values in vertex shader, pass via `varying`
5. Limit texture lookups — each one is expensive
6. Test on mobile — shaders that fly on desktop can crawl on phones

---

## Templates

- `templates/noise-gradient.tsx` — Full-screen animated noise gradient
- `templates/liquid-blob.tsx` — Mouse-reactive liquid morph
- `templates/dissolve-plane.tsx` — Scroll-driven dissolve transition
