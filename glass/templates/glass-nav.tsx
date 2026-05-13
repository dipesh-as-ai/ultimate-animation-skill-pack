/**
 * TEMPLATE: Floating Glass Navigation Bar
 * 
 * Sticky nav that appears on scroll with a glass effect.
 * Starts transparent at top, becomes glass as you scroll down.
 */

import { useEffect, useState } from 'react'

interface NavLink { label: string; href: string }

interface GlassNavProps {
  links?: NavLink[]
  logo?: React.ReactNode
  cta?: { label: string; href: string }
}

export function GlassNav({
  links = [],
  logo = 'BRAND',
  cta,
}: GlassNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? 12 : 0,
        left: scrolled ? '5%' : 0,
        right: scrolled ? '5%' : 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 2rem',
        background: scrolled ? 'rgba(255,255,255,0.08)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
        borderRadius: scrolled ? 14 : 0,
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.02em' }}>
        {logo}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      {cta && (
        <a
          href={cta.href}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 8,
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
        >
          {cta.label}
        </a>
      )}
    </nav>
  )
}
