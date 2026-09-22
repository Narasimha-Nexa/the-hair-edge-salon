"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import { salonConfig } from "@/config/salon.config";
import { generateWhatsAppUrl, generateBookingMessage } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService = "",
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    service?: string;
    date?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errorAnnouncerRef = useRef<HTMLDivElement>(null);
  const firstInvalidRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isOpen && !preferredDate) {
      setPreferredDate(today);
    }
  }, [isOpen, preferredDate, today]);

  useEffect(() => {
    if (isOpen && preselectedService) {
      setService(preselectedService);
    }
  }, [isOpen, preselectedService]);

  const announceError = (message: string) => {
    if (errorAnnouncerRef.current) {
      errorAnnouncerRef.current.textContent = message;
    }
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; service?: string; date?: string } = {};
    let firstInvalid: HTMLInputElement | HTMLSelectElement | null = null;

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter a valid name (at least 2 characters)";
      if (!firstInvalid) firstInvalid = document.getElementById("modal-name") as HTMLInputElement;
    }

    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      if (!firstInvalid) firstInvalid = document.getElementById("modal-phone") as HTMLInputElement;
    }

    if (!service) {
      newErrors.service = "Please select a service";
      if (!firstInvalid) firstInvalid = document.getElementById("modal-service") as HTMLSelectElement;
    }

    if (preferredDate && preferredDate < today) {
      newErrors.date = "Preferred date cannot be in the past";
      if (!firstInvalid) firstInvalid = document.getElementById("modal-date") as HTMLInputElement;
    }

    setErrors(newErrors);
    firstInvalidRef.current = firstInvalid;

    if (firstInvalid) {
      setTimeout(() => firstInvalid?.focus({ preventScroll: true }), 0);
      const errorMsg = newErrors[Object.keys(newErrors)[0] as keyof typeof newErrors];
      announceError(errorMsg || "");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = generateBookingMessage(
      name.trim(),
      phone.trim(),
      service,
      preferredDate || undefined,
      preferredTime || undefined,
      callbackRequested
    );

    window.open(generateWhatsAppUrl(message), "_blank");
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setService(preselectedService);
    setPreferredDate("");
    setPreferredTime("");
    setCallbackRequested(false);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    onClose();
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  if (submitted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Booking Request Sent"
        description="Complete your booking in WhatsApp"
      >
        <div className="bg-salon-surface border border-salon-gold/30 p-8 text-center w-[90vw] max-w-md" role="status" aria-live="polite">
          <div className="w-12 h-12 bg-salon-gold/20 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-salon-white mb-2 font-heading text-lg">Your booking request is ready!</p>
          <p className="text-salon-muted text-sm mb-6">
            Please complete your booking in WhatsApp. We&apos;ll confirm availability shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors"
            >
              Book another appointment
            </button>
            <a
              href={`tel:${salonConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full inline-flex items-center justify-center gap-2 text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call us instead
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div ref={errorAnnouncerRef} role="status" aria-live="assertive" aria-atomic="true" className="sr-only" />
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Book Your Service"
        description="Fill in the details below to book via WhatsApp"
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="modal-name" className="block text-salon-muted text-sm mb-1.5">
              Name <span className="text-salon-gold" aria-hidden="true">*</span>
            </label>
            <input
              id="modal-name"
              type="text"
              name="name"
              autoComplete="name"
              inputMode="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
              className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-phone" className="block text-salon-muted text-sm mb-1.5">
              Phone Number <span className="text-salon-gold" aria-hidden="true">*</span>
            </label>
            <input
              id="modal-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phone")}
              aria-invalid={touched.phone && !!errors.phone}
              aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
              className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
              placeholder="+91 XXXXX XXXXX"
            />
            {touched.phone && errors.phone && (
              <p id="phone-error" className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-service" className="block text-salon-muted text-sm mb-1.5">
              Service <span className="text-salon-gold" aria-hidden="true">*</span>
            </label>
            <select
              id="modal-service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              onBlur={() => handleBlur("service")}
              aria-invalid={touched.service && !!errors.service}
              aria-describedby={touched.service && errors.service ? "service-error" : undefined}
              className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors appearance-none rounded-lg"
            >
              <option value="">Choose a service</option>
              {salonConfig.services.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            {touched.service && errors.service && (
              <p id="service-error" className="text-red-400 text-xs mt-1" role="alert">{errors.service}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-date" className="block text-salon-muted text-sm mb-1.5">
              Preferred Date <span className="text-salon-muted/60">(Optional)</span>
            </label>
            <input
              id="modal-date"
              type="date"
              name="date"
              autoComplete="off"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              onBlur={() => handleBlur("date")}
              min={today}
              aria-invalid={touched.date && !!errors.date}
              aria-describedby={touched.date && errors.date ? "date-error" : "date-hint"}
              className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
            />
            <p id="date-hint" className="text-salon-muted/60 text-xs mt-1">We&apos;ll confirm availability for your selected date</p>
            {touched.date && errors.date && (
              <p id="date-error" className="text-red-400 text-xs mt-1" role="alert">{errors.date}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-time" className="block text-salon-muted text-sm mb-1.5">
              Preferred Time <span className="text-salon-muted/60">(Optional)</span>
            </label>
            <select
              id="modal-time"
              name="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors appearance-none rounded-lg"
            >
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <p className="text-salon-muted/60 text-xs mt-1">Salon hours: 08 AM - 10 PM daily</p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-salon-primary/50 rounded-lg border border-white/10">
            <input
              id="modal-callback"
              type="checkbox"
              name="callback"
              checked={callbackRequested}
              onChange={(e) => setCallbackRequested(e.target.checked)}
              className="mt-1 w-4 h-4 accent-salon-gold border-white/30 rounded focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            />
            <label htmlFor="modal-callback" className="text-salon-white text-sm cursor-pointer leading-relaxed">
              Request a callback instead of WhatsApp
              <span className="text-salon-muted/60 block text-xs mt-0.5">We&apos;ll call you within 30 minutes during business hours</span>
            </label>
          </div>

          <p className="text-salon-muted/60 text-xs text-center">
            By submitting, you agree to be contacted via WhatsApp or phone for booking confirmation.
          </p>

          <button
            type="submit"
            className="w-full bg-[#25D366] text-white py-3.5 text-sm font-medium tracking-wider rounded-lg hover:bg-[#20BD5A] active:bg-[#1DA851] transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Book via WhatsApp
          </button>
        </form>
      </Modal>
    </>
  );
}