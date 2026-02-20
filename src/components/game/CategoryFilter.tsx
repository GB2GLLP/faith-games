'use client'

import { useGameStore } from '@/stores/gameStore'

interface CategoryFilterProps {
  categories: readonly string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const { categories: selected, setCategories } = useGameStore()

  const toggle = (cat: string) => {
    if (selected.includes(cat)) {
      setCategories(selected.filter((c) => c !== cat))
    } else {
      setCategories([...selected, cat])
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-cream/80">Categories</label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`py-1.5 px-3 rounded-full text-sm font-medium transition-colors ${
              selected.includes(cat)
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-cream/5 text-cream/50 hover:bg-cream/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => setCategories([])}
          className="text-xs text-cream/30 hover:text-cream/50"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
