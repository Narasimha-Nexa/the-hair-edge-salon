"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CategoryFilter from "@/components/services/CategoryFilter";
import ServiceCategoryList from "@/components/sections/ServiceCategoryList";
import type { ServiceCategory } from "@/types/salon";

interface ServicesCatalogProps {
  categories: ServiceCategory[];
}

/**
 * URL-driven category state for /services: choosing a category writes
 * `?category=<id>` (shareable/bookmarkable) and shows only that section.
 * The full list is server-rendered first for SEO; the filter applies after
 * hydration, and `window.location` is read instead of `useSearchParams`
 * so the static HTML keeps every service link.
 */
export default function ServicesCatalog({ categories }: ServicesCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && categories.some((c) => c.id === param)) {
      setActive(param);
    }
  }, [categories]);

  const handleChange = (categoryId: string) => {
    setActive(categoryId);
    router.replace(
      categoryId === "all" ? pathname : `${pathname}?category=${encodeURIComponent(categoryId)}`,
      { scroll: false }
    );
  };

  const visible =
    active === "all" ? categories : categories.filter((c) => c.id === active);
  const activeCategory = categories.find((c) => c.id === active);

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategory={active}
        onCategoryChange={handleChange}
      />

      <ServiceCategoryList categories={visible} />

      {activeCategory && (
        <p className="text-center text-sm text-salon-muted mt-12">
          Showing {activeCategory.services.length} services in{" "}
          <span className="text-salon-white">{activeCategory.name}</span> ·{" "}
          <button
            type="button"
            onClick={() => handleChange("all")}
            className="text-salon-gold underline underline-offset-4 py-2 focus-visible:ring-2 focus-visible:ring-salon-gold rounded"
          >
            View all services
          </button>
        </p>
      )}
    </>
  );
}
