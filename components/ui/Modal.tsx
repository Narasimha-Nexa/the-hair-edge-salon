"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const modal = modalRef.current;
    if (modal) {
      const focusableSelectors = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      focusableElementsRef.current = Array.from(modal.querySelectorAll(focusableSelectors)) as HTMLElement[];

      const all = focusableElementsRef.current;
      const firstFocusable = all.find(
        (el) => el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA"
      ) || all[0];
      const lastFocusable = all[all.length - 1];

      firstFocusable?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCloseRef.current();
          return;
        }

        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable?.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable?.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-salon-surface border border-white/10 rounded-2xl p-6 sm:p-8 focus:outline-none"
        tabIndex={-1}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h2 id="modal-title" className="font-heading text-xl sm:text-2xl text-salon-white mb-2">
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-description" className="text-salon-muted text-sm">
                {description}
              </p>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-salon-white text-3xl hover:text-salon-gold transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface rounded-full w-10 h-10 flex items-center justify-center"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}