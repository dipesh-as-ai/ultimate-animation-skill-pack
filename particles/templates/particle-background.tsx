/**
 * PARTICLES TEMPLATE: Drop-in Particle Background
 *
 * Configurable TSParticles background with presets:
 * constellation, snow, fireflies, stars, fog.
 *
 * Requires: @tsparticles/react @tsparticles/slim
 *
 * Usage:
 *   <ParticleBackground preset="constellation" />
 *   <ParticleBackground preset="fireflies" />
 */

import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

type ParticlePreset = 'constellation' | 'snow' | 'fireflies' | 'stars' | 'fog'

interface ParticleBackgroundProps {
  preset?: ParticlePreset
  /** Override particle color */
  color?: string
  /** Override particle count */
  count?: number
  className?: string
}

const presetConfigs: Record<ParticlePreset, any> = {
  constellation: {
    particles: {
      number: { value: 60, density: { enable: true, width: 800, height: 800 } },
      color: { value: '#ffffff' },
      opacity: { value: { min: 0.2, max: 0.5 } },
      size: { value: { min: 1, max: 2 } },
      links: { enable: true, distance: 180, color: '#ffffff', opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.5, direction: 'none', outModes: { default: 'bounce' } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 200, links: { opacity: 0.3 } } },
    },
  },
  snow: {
    particles: {
      number: { value: 80 },
      color: { value: '#ffffff' },
      opacity: { value: { min: 0.2, max: 0.7 } },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, direction: 'bottom', outModes: { bottom: 'out', top: 'out' } },
      wobble: { enable: true, distance: 10, speed: 5 },
      links: { enable: false },
    },
  },
  fireflies: {
    particles: {
      number: { value: 25 },
      color: { value: '#ffd700' },
      opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 1, sync: false } },
      size: { value: { min: 2, max: 5 } },
      move: { enable: true, speed: 0.3, random: true, outModes: { default: 'bounce' } },
      links: { enable: false },
    },
  },
  stars: {
    particles: {
      number: { value: 120, density: { enable: true, width: 1200, height: 1200 } },
      color: { value: '#ffffff' },
      opacity: { value: { min: 0.1, max: 0.6 }, animation: { enable: true, speed: 0.5, sync: false } },
      size: { value: { min: 0.5, max: 2 } },
      move: { enable: true, speed: 0.15, direction: 'none', outModes: { default: 'out' } },
      links: { enable: false },
    },
  },
  fog: {
    particles: {
      number: { value: 8 },
      color: { value: '#ffffff' },
      opacity: { value: { min: 0.02, max: 0.06 } },
      size: { value: { min: 100, max: 300 } },
      move: { enable: true, speed: 0.2, direction: 'right', outModes: { default: 'out' } },
      links: { enable: false },
    },
  },
}

export function ParticleBackground({
  preset = 'constellation',
  color,
  count,
  className = '',
}: ParticleBackgroundProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  const config = JSON.parse(JSON.stringify(presetConfigs[preset]))
  if (color) config.particles.color.value = color
  if (count) config.particles.number.value = count

  return (
    <Particles
      id={`particles-${preset}`}
      className={className}
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        detectRetina: true,
        ...config,
      }}
    />
  )
}
