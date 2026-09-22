"use client";

import { useState, useEffect, useRef } from "react";
import { salonConfig } from "@/config/salon.config";
import { generateWhatsAppUrl, generateBookingMessage } from "@/lib/utils";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

export default function BookingForm({ preselectedService = "" }: { preselectedService?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string; date?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errorAnnouncerRef = useRef<HTMLDivElement>(null);
  const firstInvalidRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!preferredDate) {
      setPreferredDate(today);
    }
  }, [preferredDate, today]);

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
      if (!firstInvalid) firstInvalid = document.getElementById("booking-name") as HTMLInputElement;
    }

    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      if (!firstInvalid) firstInvalid = document.getElementById("booking-phone") as HTMLInputElement;
    }

    if (!service) {
      newErrors.service = "Please select a service";
      if (!firstInvalid) firstInvalid = document.getElementById("booking-service") as HTMLSelectElement;
    }

    if (preferredDate && preferredDate < today) {
      newErrors.date = "Preferred date cannot be in the past";
      if (!firstInvalid) firstInvalid = document.getElementById("booking-date") as HTMLInputElement;
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
      preferredTime || undefined
    );

    window.open(generateWhatsAppUrl(message), "_blank");
    setSubmitted(true);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  if (submitted) {
    return (
      <>
        <div ref={errorAnnouncerRef} role="status" aria-live="polite" className="sr-only" />
        <div className="bg-salon-surface border border-salon-gold/30 p-8 text-center" role="status" aria-live="polite">
          <div className="w-12 h-12 bg-salon-gold/20 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-salon-white mb-2">Your WhatsApp booking request is ready.</p>
          <p className="text-salon-muted text-sm">
            Please complete your booking in WhatsApp. We&apos;ll confirm availability shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-salon-gold text-sm font-medium hover:text-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface"
          >
            Book another appointment
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={errorAnnouncerRef} role="status" aria-live="assertive" aria-atomic="true" className="sr-only" />
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="booking-name" className="block text-salon-muted text-sm mb-2">
            Your Name <span className="text-salon-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            name="name"
            autoComplete="name"
            inputMode="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? "booking-name-error" : undefined}
            className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
            placeholder="Enter your name"
          />
          {touched.name && errors.name && (
            <p id="booking-name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="booking-phone" className="block text-salon-muted text-sm mb-2">
            Phone Number <span className="text-salon-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="booking-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={touched.phone && errors.phone ? "booking-phone-error" : undefined}
            className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white placeholder-salon-muted/50 focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
            placeholder="+91 XXXXX XXXXX"
          />
          {touched.phone && errors.phone && (
            <p id="booking-phone-error" className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="booking-service" className="block text-salon-muted text-sm mb-2">
            Select Service <span className="text-salon-gold" aria-hidden="true">*</span>
          </label>
          <select
            id="booking-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            onBlur={() => handleBlur("service")}
            aria-invalid={touched.service && !!errors.service}
            aria-describedby={touched.service && errors.service ? "booking-service-error" : undefined}
            className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors appearance-none rounded-lg"
          >
            <option value="">Choose a service</option>
            {salonConfig.services.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {touched.service && errors.service && (
            <p id="booking-service-error" className="text-red-400 text-xs mt-1" role="alert">{errors.service}</p>
          )}
        </div>

        <div>
          <label htmlFor="booking-date" className="block text-salon-muted text-sm mb-2">
            Preferred Date <span className="text-salon-muted/60">(Optional)</span>
          </label>
          <input
            id="booking-date"
            type="date"
            name="date"
            autoComplete="off"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            onBlur={() => handleBlur("date")}
            min={today}
            aria-invalid={touched.date && !!errors.date}
            aria-describedby={touched.date && errors.date ? "booking-date-error" : "booking-date-hint"}
            className="w-full bg-salon-primary border border-white/20 px-4 py-3 text-salon-white focus:border-salon-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary transition-colors rounded-lg"
          />
          <p id="booking-date-hint" className="text-salon-muted/60 text-xs mt-1">We&apos;ll confirm availability for your selected date</p>
          {touched.date && errors.date && (
            <p id="booking-date-error" className="text-red-400 text-xs mt-1" role="alert">{errors.date}</p>
          )}
        </div>

        <div>
          <label htmlFor="booking-time" className="block text-salon-muted text-sm mb-2">
            Preferred Time <span className="text-salon-muted/60">(Optional)</span>
          </label>
          <select
            id="booking-time"
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

        <button
          type="submit"
          className="w-full bg-salon-gold text-salon-primary py-4 text-sm font-medium tracking-wider hover:bg-salon-gold-light active:bg-salon-gold transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
        >
          SEND BOOKING REQUEST VIA WHATSAPP
        </button>
      </form>
    </>
  );
}