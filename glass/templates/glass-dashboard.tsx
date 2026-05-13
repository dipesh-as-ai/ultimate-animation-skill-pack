/**
 * EXAMPLE: Full Glass Dashboard
 *
 * Shows the glass system in action:
 * - Gradient mesh background
 * - Glass cards with colored tints
 * - Glass nav
 * - Stat cards with shimmer
 *
 * This is a reference example. Not a component you import directly.
 *
 * ⚠️ DEPENDENCY: This template imports from sibling files (glass-card.tsx,
 * glass-nav.tsx). Copy the entire glass/templates/ folder together.
 */

import { GlassCard } from './glass-card'
import { GlassNav } from './glass-nav'

const STATS = [
  { label: 'Revenue',     value: '$84.2K', change: '+12%', tint: 'blue'   as const },
  { label: 'Users',       value: '24,801', change: '+8%',  tint: 'purple' as const },
  { label: 'Conversion',  value: '3.6%',   change: '+0.4%', tint: 'rose'  as const },
  { label: 'Churn',       value: '1.2%',   change: '-0.1%', tint: 'amber' as const },
]

export function GlassDashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at 15% 20%, #7c3aed 0%, transparent 45%),
        radial-gradient(ellipse at 85% 15%, #2563eb 0%, transparent 45%),
        radial-gradient(ellipse at 50% 90%, #db2777 0%, transparent 45%),
        #0a0a0f
      `,
      fontFamily: 'system-ui, sans-serif',
      color: '#fff',
      padding: '0 2rem 4rem',
    }}>
      <GlassNav
        logo="DASHBOARD"
        links={[
          { label: 'Overview', href: '#' },
          { label: 'Analytics', href: '#' },
          { label: 'Reports', href: '#' },
        ]}
        cta={{ label: 'Export', href: '#' }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 100 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Good morning, Master
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem' }}>
          Here's what's happening with your products today.
        </p>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {STATS.map(stat => (
            <GlassCard key={stat.label} variant="colored" tint={stat.tint}>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: 4 }}>
                  {stat.change} this month
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Main content */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <GlassCard>
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                Revenue Over Time
              </h2>
              <div style={{ height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
                Chart Component Here
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                Top Channels
              </h2>
              {['Organic', 'Paid', 'Referral', 'Email'].map((ch, i) => (
                <div key={ch} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>{ch}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{[42, 31, 18, 9][i]}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
