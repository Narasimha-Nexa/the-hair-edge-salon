"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Service } from "@/types/salon";
import { salonConfig } from "@/config/salon.config";

interface ServiceCardProps {
  service: Service;
  onBook: (serviceName: string) => void;
  featured?: boolean;
}

/**
 * Mobile-first service card (2-col phone grid → 2-col at md → 3-col at lg).
 *
 * Layout: photo (badge only) → title below the image (2-line clamp) →
 * duration value row → description → single-line "Book Now"
 * CTA. Only the explicit controls are interactive: the title links to the
 * detail page and the button opens the booking modal (the card itself is
 * not a click target, so keyboard and pointer behaviour stay predictable).
 */
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
      className="group flex flex-col bg-salon-primary border border-white/10 rounded-2xl overflow-hidden transition-[border-color,transform,box-shadow] duration-500 hover:border-[var(--card-accent)]/60 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.45)] focus-within:border-[var(--card-accent)]/70"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image || salonConfig.assets.fallbackService}
          alt={service.name}
          fill
          quality={85}
          sizes="(max-width: 1023px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {(featured || service.featured) && (
          <span className="absolute top-2 left-2 bg-[var(--card-accent)] text-salon-primary text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full tracking-wide">
            Most Popular
          </span>
        )}
      </div>

      <div className="flex flex-col grow p-3 sm:p-4">
        <h3 className="font-heading text-[15px] sm:text-base md:text-lg leading-snug text-salon-white mb-1.5 line-clamp-2 min-h-[2.75em]">
          <Link
            href={`/services/${service.id}`}
            className="block hover:text-salon-gold transition-colors rounded focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
          >
            {service.name}
          </Link>
        </h3>

        {service.duration && (
          <p className="text-[11px] sm:text-xs mb-2 text-salon-muted">{service.duration}</p>
        )}

        <p className="block text-salon-muted text-xs leading-relaxed line-clamp-2 mb-3">
          {service.description}
        </p>

        <button
          type="button"
          onClick={() => onBook(service.name)}
          aria-label={`Book ${service.name} via WhatsApp`}
          className="mt-auto w-full bg-[var(--card-accent)] text-salon-primary py-2.5 sm:py-3 px-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap hover:brightness-110 active:scale-[0.98] transition-[filter,transform] duration-300 flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
        >
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Book Now
        </button>
      </div>
    </article>
  );
}
