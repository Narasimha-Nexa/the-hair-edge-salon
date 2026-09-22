"use client";

import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Brand } from "@/types/salon";

export default function Brands() {
  const brandsConfig = (salonConfig as any).brands as { title: string; subtitle: string; logos: Brand[] } | undefined;

  if (!brandsConfig?.logos?.length) return null;

  const wordmark = (name: string) => {
    const parts = name.split(/[\s,]+/).filter(Boolean);
    return {
      primary: (parts[0] || "").toUpperCase(),
      secondary: parts.slice(1).join(" ").toUpperCase(),
    };
  };

  return (
    <section id="brands" className="py-16 md:py-24 bg-salon-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={brandsConfig.title}
          subtitle={brandsConfig.subtitle}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 md:gap-x-20">
          {brandsConfig.logos.map((brand, index) => {
            const { primary, secondary } = wordmark(brand.name);
            return (
              <div
                key={brand.name}
                className="flex flex-col items-center text-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="font-heading text-lg md:text-xl text-salon-white tracking-[0.18em] uppercase leading-none">
                  {primary}
                </span>
                {secondary && (
                  <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-salon-gold/80">
                    {secondary}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-salon-muted/70 text-sm mt-12 max-w-xl mx-auto leading-relaxed">
          We use salon-grade professional products only, so your results last longer and your hair stays healthy.
        </p>
      </div>
    </section>
  );
}