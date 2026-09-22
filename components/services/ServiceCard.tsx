"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Service } from "@/types/salon";
import { salonConfig } from "@/config/salon.config";

interface ServiceCardProps {
  service: Service;
  onBook: (serviceName: string) => void;
  featured?: boolean;
}

export default function ServiceCard({
  service,
  onBook,
  featured = false,
}: ServiceCardProps) {
  const category = salonConfig.categories.find((c) =>
    c.services.some((s) => s.id === service.id)
  );
  const accent = category?.accent || "#C9A227";

  return (
    <article
      style={{ "--card-accent": accent } as CSSProperties}
      onClick={() => onBook(service.name)}
      className="group flex flex-col bg-salon-primary border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--card-accent)]/60 hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image || salonConfig.assets.fallbackService}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-salon-primary/90 via-salon-primary/15 to-transparent" />
        {(featured || service.featured) && (
          <span className="absolute top-3 left-3 bg-[var(--card-accent)] text-salon-primary text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
            Most Popular
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading text-xl md:text-2xl text-salon-white mb-1.5">
            {service.name}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            {service.duration && (
              <span className="text-salon-muted flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col grow p-5 pt-4">
        <p className="text-salon-muted text-sm leading-relaxed line-clamp-2 mb-5">
          {service.description}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBook(service.name);
          }}
          className="mt-auto w-full border border-[var(--card-accent)] text-[var(--card-accent)] py-3 px-4 text-sm font-medium tracking-wide rounded-lg hover:bg-[var(--card-accent)] hover:text-salon-primary transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Book This Service
        </button>
      </div>
    </article>
  );
}