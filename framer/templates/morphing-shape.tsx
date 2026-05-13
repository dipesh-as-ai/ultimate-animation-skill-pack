/**
 * FRAMER TEMPLATE: Morphing SVG Shape
 *
 * Animates between two (or more) SVG path definitions using
 * Framer Motion's `animate` on the `d` attribute.
 *
 * Award-site pattern for brand pages, hero backgrounds, and
 * decorative blob transitions.
 *
 * Requires: framer-motion
 *
 * Usage:
 *   <MorphingShape
 *     paths={[blobPath1, blobPath2, blobPath3]}
 *     fill="url(#gradient)"
 *     duration={4}
 *   />
 */

"use client"
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

interface MorphingShapeProps {
  /** Array of SVG path `d` strings to morph between */
  paths: string[]
  /** Fill color or gradient reference */
  fill?: string
  /** Stroke color */
  stroke?: string
  /** Stroke width */
  strokeWidth?: number
  /** Duration of each morph transition in seconds */
  duration?: number
  /** SVG viewBox (default: "0 0 500 500") */
  viewBox?: string
  /** Width */
  width?: number | string
  /** Height */
  height?: number | string
  className?: string
  style?: React.CSSProperties
}

// Example blob paths — replace with your own
export const BLOB_PATHS = {
  blob1: 'M440,320Q380,390,300,410Q220,430,160,380Q100,330,90,250Q80,170,140,110Q200,50,290,50Q380,50,430,120Q480,190,460,260Q440,330,440,320Z',
  blob2: 'M420,310Q370,370,300,400Q230,430,150,390Q70,350,60,260Q50,170,120,100Q190,30,280,60Q370,90,420,160Q470,230,440,270Q410,310,420,310Z',
  blob3: 'M430,300Q360,350,290,390Q220,430,140,400Q60,370,70,280Q80,190,130,120Q180,50,270,40Q360,30,420,110Q480,190,460,250Q440,310,430,300Z',
}

export function MorphingShape({
  paths,
  fill = 'rgba(124, 77, 255, 0.3)',
  stroke = 'none',
  strokeWidth = 0,
  duration = 4,
  viewBox = '0 0 500 500',
  width = '100%',
  height = '100%',
  className = '',
  style,
}: MorphingShapeProps) {
  const controls = useAnimation()

  useEffect(() => {
    if (paths.length < 2) return

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let currentIndex = 0

    const animateNext = async () => {
      currentIndex = (currentIndex + 1) % paths.length
      await controls.start({
        d: paths[currentIndex],
        transition: {
          duration,
          ease: [0.37, 0, 0.63, 1], // easeInOutCubic
        },
      })
      animateNext()
    }

    animateNext()
  }, [paths, duration, controls])

  if (!paths.length) return null

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      style={{ overflow: 'visible', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={paths[0]}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        animate={controls}
      />
    </svg>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  import { MorphingShape, BLOB_PATHS } from './morphing-shape'

  // Simple morphing blob background
  <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
    <MorphingShape
      paths={[BLOB_PATHS.blob1, BLOB_PATHS.blob2, BLOB_PATHS.blob3]}
      fill="rgba(124, 77, 255, 0.2)"
      duration={5}
    />
  </div>

  // With SVG gradient
  <svg width="0" height="0">
    <defs>
      <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c4dff" />
        <stop offset="100%" stopColor="#ff006e" />
      </linearGradient>
    </defs>
  </svg>
  <MorphingShape
    paths={[BLOB_PATHS.blob1, BLOB_PATHS.blob2]}
    fill="url(#blob-gradient)"
    width={400}
    height={400}
  />
*/
