"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GalleryConfig } from "@/types/salon";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [googlePhotos, setGooglePhotos] = useState<string[]>([]);

  const galleryConfig = (salonConfig as any).gallery as GalleryConfig | undefined;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-place")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const urls = (data?.photos || [])
          .filter((p: { url?: string }) => p?.url)
          .slice(0, 8)
          .map((p: { url: string }) => p.url);
        setGooglePhotos(urls);
      })
      .catch(() => {
        if (!cancelled) setGooglePhotos([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!salonConfig.features.gallery || !galleryConfig?.images?.length) return null;

  const images =
    googlePhotos.length > 0 ? googlePhotos : galleryConfig.images;

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section id="gallery" className="py-20 md:py-28 bg-salon-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={galleryConfig.title}
            subtitle={galleryConfig.subtitle}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => handleImageClick(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-salon-surface border border-white/10 group focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
                aria-label={`View ${galleryConfig.title} image ${index + 1} of ${images.length}`}
              >
                <Image
                  src={image}
                  alt={`Salon gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={85}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-12 h-12 rounded-full bg-salon-gold/90 text-salon-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-4 right-4 text-salon-white text-3xl hover:text-salon-gold transition-colors z-10 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-salon-white text-4xl hover:text-salon-gold transition-colors z-10 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full w-14 h-14 flex items-center justify-center"
            aria-label="Previous image"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-salon-white text-4xl hover:text-salon-gold transition-colors z-10 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full w-14 h-14 flex items-center justify-center"
            aria-label="Next image"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[72vh] max-h-[calc(100vw-2rem)] w-full max-w-5xl"
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Salon gallery image ${lightboxIndex + 1}`}
              fill
              sizes="95vw"
              quality={90}
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(index); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === lightboxIndex
                    ? "bg-salon-gold"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === lightboxIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
