"use client";

import type { ServiceCategory } from "@/types/salon";

interface CategoryFilterProps {
  categories: ServiceCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allServicesCount = categories.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <div className="mb-10" role="group" aria-label="Service categories">
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => onCategoryChange("all")}
          className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary ${
            activeCategory === "all"
              ? "bg-salon-gold text-salon-primary border-salon-gold shadow-[0_0_20px_rgba(201,162,39,0.3)]"
              : "bg-transparent text-salon-muted border-white/20 hover:border-salon-gold/50 hover:text-salon-white"
          }`}
        >
          All Services
          <span className="ml-1.5 text-xs opacity-70">({allServicesCount})</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-[var(--cat-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary ${
              activeCategory === category.id
                ? "bg-[var(--cat-accent)] text-salon-primary border-[var(--cat-accent)] shadow-[0_0_20px_rgba(201,162,39,0.3)]"
                : "bg-transparent text-salon-muted border-white/20 hover:border-[var(--cat-accent)]/50 hover:text-salon-white"
            }`}
            style={{ "--cat-accent": category.accent || "#C9A227" } as React.CSSProperties}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
            <span className="ml-1.5 text-xs opacity-70">({category.services.length})</span>
          </button>
        ))}
      </div>
    </div>
  );
}