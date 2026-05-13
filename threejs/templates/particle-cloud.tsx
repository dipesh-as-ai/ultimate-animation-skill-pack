/**
 * TEMPLATE: 50k Particle Cloud with Noise Drift
 * 
 * GPU-efficient point cloud. Particles drift using simplex noise.
 * Customize: count, color, size, speed, noise frequency.
 */

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleCloudProps {
  count?: number
  color?: string
  size?: number
  speed?: number
  spread?: number
}

export function ParticleCloud({
  count = 50_000,
  color = '#88aaff',
  size = 0.015,
  speed = 0.08,
  spread = 8,
}: ParticleCloudProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate initial positions once
  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random()) * spread

      positions[i3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
      phases[i]         = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [count, spread])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime * speed
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const phase = phases[i]
      // Simple sinusoidal drift — replace with simplex noise for organic feel
      pos[i3 + 1] += Math.sin(t + phase) * 0.0005
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}

// ─── USAGE ──────────────────────────────────────────────────────────────────
/*
  import { Canvas } from '@react-three/fiber'
  import { ParticleCloud } from './particles-points'

  <Canvas camera={{ position: [0, 0, 10] }}>
    <ParticleCloud count={30000} color="#aaddff" spread={6} />
  </Canvas>
*/
