"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { categories, type Category } from "@/data/posts"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selected: Category
  onChange: (category: Category) => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
          className={cn(
            "relative",
            selected === category && "gradient-primary text-white border-0"
          )}
        >
          {selected === category && (
            <motion.div
              layoutId="category-indicator"
              className="absolute inset-0 gradient-primary rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </Button>
      ))}
    </div>
  )
}
