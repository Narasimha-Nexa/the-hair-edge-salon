/**
 * Lightweight analytics event layer.
 *
 * Events are pushed to `dataLayer` (and to `gtag` when present). Nothing is
 * sent anywhere until `NEXT_PUBLIC_GA_ID` is configured — the loader in
 * app/layout.tsx only injects the Google tag when that variable is set, so
 * the site makes zero tracking requests out of the box.
 */

export type AnalyticsEvent =
  | "hero_booking_click"
  | "booking_modal_open"
  | "service_booking_click"
  | "whatsapp_booking_request"
  | "whatsapp_click"
  | "phone_click"
  | "directions_click"
  | "google_review_click"
  | "view_all_services_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
