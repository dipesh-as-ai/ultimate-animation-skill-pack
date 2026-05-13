---
name: threejs-r3f
description: >
  3D scenes, particle systems, WebGL effects, and shader animations using
  Three.js and React Three Fiber. Covers scene setup, particles, floating
  geometry, GLTF models, postprocessing, and performance rules.
triggers:
  - 3D scene
  - particle system
  - Three.js
  - React Three Fiber
  - R3F
  - WebGL
  - 3D background
  - shader effect
  - bloom effect
---

# Three.js / React Three Fiber — 3D Scenes & Particles

## Stack

| Package | Purpose |
|---------|---------|
| `three` | Core WebGL engine |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Helpers: cameras, controls, loaders, shaders |
| `@react-three/postprocessing` | Bloom, DOF, chromatic aberration |
| `leva` | Dev UI — tweak values live |

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three leva
```

---

## Core Architecture

### Canvas Setup
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <YourMesh />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

### useFrame — Animation Loop
```tsx
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6030" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}
```

---

## Postprocessing
```tsx
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

<EffectComposer>
  <Bloom luminanceThreshold={0.2} intensity={1.2} levels={8} mipmapBlur />
  <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.002, 0.002]} />
  <Vignette darkness={0.5} offset={0.3} />
</EffectComposer>
```

---

## SSR Guard (Next.js)
```tsx
import dynamic from 'next/dynamic'
const Scene3D = dynamic(() => import('./Scene3DInner'), { ssr: false })
```

---

## Performance Rules

1. **`dpr={[1, 2]}`** — never render at > 2x pixel ratio
2. Reuse geometries and materials (`useMemo`)
3. Use `frameloop="demand"` for static scenes
4. `depthWrite={false}` on transparent particles
5. Keep draw calls < 100 for 60fps on mobile
6. For particles > 10k, use `InstancedMesh` or shader approach
7. Dispose on unmount: `useEffect(() => () => mesh.geometry.dispose(), [])`

---

## Decision Tree
```
3D need?
├── Static decorative background → Stars + ParticleField + Bloom
├── Interactive 3D object → Mesh + OrbitControls
├── Many identical objects → InstancedMesh
├── Complex animated scene → R3F + Theatre.js
├── Custom visual effect → ShaderMaterial (GLSL)
└── Physics-based objects → @react-three/rapier
```

---

## Templates

- `templates/background-3d.tsx` — Drop-in 3D background with particles + orbs
- `templates/floating-geometry.tsx` — Floating icosahedra with bloom
- `templates/particle-cloud.tsx` — 50k particle cloud with drift
