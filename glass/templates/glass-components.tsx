/**
 * GLASS UI — COMPONENT LIBRARY TEMPLATE
 * Copy and use. All components require a colorful background behind them.
 * Designed for dark theme. Swap --glass-bg values for light theme.
 */

import React from 'react'

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const css = `
  :root {
    --glass-bg:      rgba(255,255,255,0.06);
    --glass-bg-h:    rgba(255,255,255,0.10);
    --glass-border:  1px solid rgba(255,255,255,0.12);
    --glass-blur:    blur(16px) saturate(180%);
    --glass-shadow:  0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
    --glass-glow:    0 0 24px rgba(120,60,255,0.4), 0 8px 32px rgba(0,0,0,0.4);
    --accent:        #7c4dff;
    --text:          rgba(255,255,255,0.92);
    --text-muted:    rgba(255,255,255,0.5);
  }
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    padding: 24px;
    transition: background .3s, box-shadow .3s, border-color .3s;
    color: var(--text);
  }
  .glass-card:hover { background: var(--glass-bg-h); box-shadow: var(--glass-glow); border-color: rgba(120,60,255,.25); }

  .glass-btn {
    padding: 10px 24px;
    background: var(--glass-bg);
    backdrop-filter: blur(8px);
    border: var(--glass-border);
    border-radius: 8px;
    color: var(--text);
    font-weight: 600;
    cursor: pointer;
    transition: all .25s cubic-bezier(.4,0,.2,1);
    box-shadow: var(--glass-shadow);
  }
  .glass-btn:hover { background: var(--glass-bg-h); border-color: rgba(120,60,255,.4); box-shadow: var(--glass-glow); transform: translateY(-1px); }
  .glass-btn:active { transform: translateY(0); }

  .glass-input {
    width: 100%; padding: 12px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: var(--text); font-size: 14px;
    backdrop-filter: blur(8px);
    outline: none; transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box;
  }
  .glass-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,77,255,.2); }
  .glass-input::placeholder { color: rgba(255,255,255,.3); }
`

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

export function GlassCard({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <>
      <style>{css}</style>
      <div className={`glass-card ${className}`} style={style}>{children}</div>
    </>
  )
}

export function GlassButton({ children, onClick, variant = 'default' }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'accent'
}) {
  const accentStyle: React.CSSProperties = variant === 'accent' ? {
    background: 'linear-gradient(135deg, rgba(124,77,255,.3), rgba(80,40,200,.2))',
    borderColor: 'rgba(124,77,255,.5)',
  } : {}
  return (
    <button className="glass-btn" onClick={onClick} style={accentStyle}>
      {children}
    </button>
  )
}

export function GlassInput({ placeholder, value, onChange }: {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <input
      className="glass-input"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    />
  )
}
