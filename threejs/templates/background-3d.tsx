/**
 * THREE.JS / R3F — BACKGROUND SCENE TEMPLATE
 * Drop-in 3D background with particles + glowing orb + bloom.
 * Requires: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing
 */

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─── PARTICLES ───────────────────────────────────────────────────────────────
function Particles({ count = 8000, color = '#4422ff' }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 100
      arr[i * 3 + 1] = (Math.random() - 0.5) * 100
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color={color} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ─── FLOATING ORB ────────────────────────────────────────────────────────────
function Orb({ color = '#2200ff', emissive = '#110088', position = [0, 0, 0] as [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.7) * 0.4
    ref.current.rotation.z = clock.getElapsedTime() * 0.1
  })
  return (
    <Sphere ref={ref} args={[1.2, 64, 64]} position={position}>
      <MeshDistortMaterial color={color} emissive={emissive} emissiveIntensity={0.6}
        roughness={0.05} metalness={0.9} distort={0.35} speed={2.5} />
    </Sphere>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function Background3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 70 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} color="#4400ff" intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#ff0066" intensity={1} />

        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={3000} factor={3} fade />
          <Particles count={6000} color="#5533ff" />
          <Orb position={[2, 0, -2]} color="#3311ff" />
          <Orb position={[-2.5, 0.5, -3]} color="#ff1166" emissive="#880033" />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} levels={8} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
