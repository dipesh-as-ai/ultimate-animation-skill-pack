/**
 * TEMPLATE: Floating Geometry Scene
 * 
 * Multiple icosahedra floating in space with postprocessing bloom.
 * The "default impressive 3D background" template.
 * 
 * Customize: geometry type, material, count, postprocessing.
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Single floating mesh with random initial state
function FloatingMesh({ position, scale, rotationSpeed }: {
  position: [number, number, number]
  scale: number
  rotationSpeed: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.x = t * rotationSpeed[0]
    ref.current.rotation.y = t * rotationSpeed[1]
    ref.current.rotation.z = t * rotationSpeed[2]
    // Gentle float
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.3
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={1}
        roughness={0.1}
        emissive="#334466"
        emissiveIntensity={0.3}
        wireframe={false}
      />
    </mesh>
  )
}

// Generate N meshes with random properties
function FloatingField({ count = 12 }: { count?: number }) {
  const meshes = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.8,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.3,
      ] as [number, number, number],
    })),
  [count])

  return (
    <>
      {meshes.map((props, i) => (
        <FloatingMesh key={i} {...props} />
      ))}
    </>
  )
}

export function FloatingGeometryScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, background: '#080818' }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#aabbff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff4488" />

      <FloatingField count={16} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.05}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  )
}
