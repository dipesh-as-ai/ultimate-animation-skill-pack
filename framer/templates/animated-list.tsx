/**
 * FRAMER TEMPLATE: Animated List — Add/Remove with AnimatePresence
 *
 * Items fade in when added, slide out when removed.
 * Uses popLayout mode for smooth reflow.
 *
 * Requires: framer-motion
 */

import { motion, AnimatePresence } from "framer-motion"

interface ListItem {
  id: string | number
  label: string
}

interface AnimatedListProps {
  items: ListItem[]
  onRemove?: (id: string | number) => void
  className?: string
}

export function AnimatedList({ items, onRemove, className = "" }: AnimatedListProps) {
  return (
    <ul className={className} style={{ listStyle: "none", padding: 0, margin: 0 }}>
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span>{item.label}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ×
              </button>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
/*
  const [items, setItems] = useState([
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
  ])

  <AnimatedList
    items={items}
    onRemove={(id) => setItems(prev => prev.filter(i => i.id !== id))}
  />
*/
