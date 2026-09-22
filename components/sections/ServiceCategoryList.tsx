"use client";

import Link from "next/link";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import type { ServiceCategory } from "@/types/salon";

interface ServiceCategoryListProps {
  categories: ServiceCategory[];
}

export default function ServiceCategoryList({ categories }: ServiceCategoryListProps) {
  return (
    <div className="space-y-16">
      {categories.map((category, catIndex) => (
        <section
          key={category.id}
          id={category.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${catIndex * 100}ms` }}
        >
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
            <span className="text-3xl" aria-hidden="true">{category.icon}</span>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-salon-white">
                {category.name}
              </h2>
              <p className="text-salon-muted text-sm">
                {category.services.length} services available
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {category.services.map((service, svcIndex) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative bg-salon-primary border border-white/10 rounded-2xl overflow-hidden hover:border-salon-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-salon-gold/10 hover:-translate-y-1"
                style={{ animationDelay: `${svcIndex * 50}ms` } as React.CSSProperties}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {service.featured && (
                    <div className="absolute top-3 left-3 bg-salon-gold text-salon-primary text-xs font-medium px-2.5 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-salon-white mb-2 group-hover:text-salon-gold transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-salon-muted text-sm mb-4 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-sm" aria-hidden="true">
                    {service.duration && (
                      <span className="text-salon-muted/70 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}