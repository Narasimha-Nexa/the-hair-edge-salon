"use client";

import { useState } from "react";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Transformation } from "@/types/salon";

export default function Transformations() {
  const transformationsConfig = (salonConfig as any).transformations as { title: string; subtitle: string; items: Transformation[] } | undefined;

  if (!salonConfig.features.transformations || !transformationsConfig?.items?.length) return null;

  return (
    <section id="transformations" className="py-20 md:py-28 bg-salon-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={transformationsConfig.title}
          subtitle={transformationsConfig.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformationsConfig.items.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TransformationCardProps {
  item: Transformation;
  index: number;
}

function TransformationCard({ item, index }: TransformationCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <article
      className="group relative bg-salon-primary border border-white/10 rounded-2xl overflow-hidden hover:border-salon-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-salon-gold/5 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3]">
        <div className="absolute inset-0">
          <Image
            src={item.before}
            alt={`${item.service} - Before`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={item.after}
            alt={`${item.service} - After`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-salon-gold pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-salon-gold rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3.5 h-3.5 text-salon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
          <span className="text-salon-white/70 font-medium">Before</span>
          <span className="text-salon-gold font-medium">After</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg text-salon-white mb-1">{item.service}</h3>
        <p className="text-salon-muted text-sm">Drag the slider to compare</p>
        <div
          className="mt-4 relative h-2 bg-salon-surface rounded-full overflow-hidden"
          role="slider"
          aria-label="Before after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onKeyDown={(e) => {
            const step = 10;
            if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + step));
            if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - step));
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div
            className="absolute top-0 bottom-0 bg-salon-gold rounded-full transition-all duration-100"
            style={{ width: `${sliderPosition}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-salon-gold rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2"
            style={{ left: `${sliderPosition}%` }}
            aria-hidden="true"
          >
            <svg className="w-3.5 h-3.5 text-salon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}