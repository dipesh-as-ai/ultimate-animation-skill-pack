/**
 * TEMPLATE: Theatre.js Scroll-Scrub
 * 
 * Maps page scroll position to Theatre.js sequence position.
 * Elements animate as the user scrolls — like a video scrubber.
 * 
 * USAGE: Drop this hook in any section. Pass sequenceDuration in seconds.
 */

import { useEffect } from 'react'
import { ISheet } from '@theatre/core'

interface UseScrollScrubOptions {
  sheet: ISheet
  sequenceDuration: number   // seconds — must match your exported sequence length
  scrollStart?: number       // px from top where scrub begins (default: 0)
  scrollDistance?: number    // px of scroll to traverse full sequence (default: window.innerHeight * 3)
}

export function useScrollScrub({
  sheet,
  sequenceDuration,
  scrollStart = 0,
  scrollDistance,
}: UseScrollScrubOptions) {
  useEffect(() => {
    const distance = scrollDistance ?? window.innerHeight * 3

    const onScroll = () => {
      const scrolled = window.scrollY - scrollStart
      const progress = Math.max(0, Math.min(1, scrolled / distance))
      sheet.sequence.position = progress * sequenceDuration
    }

    // Set initial position
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sheet, sequenceDuration, scrollStart, scrollDistance])
}

// ─── USAGE EXAMPLE ──────────────────────────────────────────────────────────
/*
  import { getProject } from '@theatre/core'
  import { useScrollScrub } from './scroll-scrub'

  const project = getProject('ScrollScene', { state })
  const sheet = project.sheet('ScrollSequence')

  export function ScrollSection() {
    useScrollScrub({ sheet, sequenceDuration: 4, scrollDistance: window.innerHeight * 4 })

    return (
      <div style={{ height: '500vh' }}>   // tall enough to scroll through
        <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
          // Your animated content here
        </div>
      </div>
    )
  }
*/
