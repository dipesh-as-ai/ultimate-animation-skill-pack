/**
 * LOTTIE-RIVE TEMPLATE: Rive Interactive Component
 *
 * Renders a Rive animation with state machine support.
 * State machines enable interactive animations that respond
 * to user input (hover, click, scroll triggers).
 *
 * Requires: @rive-app/react-canvas
 *
 * Usage:
 *   <RiveInteractive src="/animations/toggle.riv" stateMachine="State Machine 1" />
 *   <RiveInteractive src="/button.riv" stateMachine="ButtonSM" autoplay />
 */

import React from 'react'
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'

interface RiveInteractiveProps {
  /** Path to .riv file */
  src: string
  /** Name of the state machine to use */
  stateMachine?: string
  /** Name of the artboard (defaults to first) */
  artboard?: string
  /** Autoplay on mount */
  autoplay?: boolean
  /** Width */
  width?: number | string
  /** Height */
  height?: number | string
  /** Fit mode */
  fit?: 'contain' | 'cover' | 'fill' | 'none'
  /** Additional className */
  className?: string
  style?: React.CSSProperties
}

const fitMap: Record<string, Fit> = {
  contain: Fit.Contain,
  cover: Fit.Cover,
  fill: Fit.Fill,
  none: Fit.None,
}

export function RiveInteractive({
  src,
  stateMachine = 'State Machine 1',
  artboard,
  autoplay = true,
  width = 300,
  height = 300,
  fit = 'contain',
  className = '',
  style,
}: RiveInteractiveProps) {
  // Reduced motion check
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    autoplay: prefersReduced ? false : autoplay,
    layout: new Layout({
      fit: fitMap[fit] || Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  return (
    <div className={className} style={{ width, height, ...style }}>
      <RiveComponent
        style={{ width: '100%', height: '100%' }}
        onMouseEnter={() => rive?.play()}
        onMouseLeave={() => {
          if (!autoplay) rive?.pause()
        }}
      />
    </div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  // Basic interactive button
  <RiveInteractive
    src="/animations/cta-button.riv"
    stateMachine="ButtonStates"
    width={200}
    height={60}
  />

  // Character animation that plays on hover
  <RiveInteractive
    src="/animations/mascot.riv"
    stateMachine="Idle"
    autoplay={false}
    fit="contain"
    width={400}
    height={400}
  />
*/
