"use client";

import { useState } from "react";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!salonConfig.features.menu) return null;

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <section id="menu" className="py-20 md:py-28 bg-salon-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Menu"
          subtitle="View our complete service menu"
        />

        <div className="max-w-xl mx-auto">
          <div className="relative bg-salon-surface border border-white/10 p-4 overflow-hidden rounded-2xl">
            {salonConfig.assets.menu ? (
              <button
                onClick={handleOpenModal}
                className="relative aspect-square w-full group focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary rounded-lg overflow-hidden"
                aria-label="View full salon menu"
              >
                <Image
                  src={salonConfig.assets.menu}
                  alt="Salon Menu"
                  fill
                  sizes="(max-width: 640px) 100vw, 576px"
                  className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500 rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <span className="bg-salon-gold text-salon-primary px-6 py-3 text-sm font-medium tracking-wider shadow-lg">
                    VIEW FULL MENU
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={handleOpenModal}
                className="relative aspect-square w-full flex items-center justify-center bg-salon-primary/50 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary rounded-lg"
                aria-label="View full salon menu"
              >
                <p className="text-salon-muted text-center px-4">
                  Our current menu will be available here soon.
                </p>
              </button>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleOpenModal}
              className="border border-salon-gold text-salon-gold px-8 py-3 text-sm tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              VIEW FULL MENU
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Salon Menu"
        description="Complete service menu with pricing"
      >
        {salonConfig.assets.menu ? (
          <div className="relative w-[90vw] max-w-4xl h-[85vh]">
            <Image
              src={salonConfig.assets.menu}
              alt="Salon Menu - Full View"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="bg-salon-surface p-8 text-center">
            <p className="text-salon-muted">
              Menu image will be displayed here when available.
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}