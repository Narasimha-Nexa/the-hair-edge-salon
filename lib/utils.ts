import { salonConfig } from "@/config/salon.config";

export function normalizeWhatsAppNumber(number: string): string {
  return number.replace(/[^0-9]/g, "");
}

export function generateWhatsAppUrl(message: string): string {
  const normalized = normalizeWhatsAppNumber(salonConfig.contact.whatsapp);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}

export function generateQuickBookingMessage(serviceName: string): string {
  return `Hello ${salonConfig.business.name},

I would like to request an appointment.

Service: ${serviceName}

Please let me know the available appointment time.

Thank you.
Source: Website`;
}

function formatPreferredDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return dateString;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPreferredTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const h = Number(hours);
  if (Number.isNaN(h) || minutes === undefined) return timeString;
  const meridiem = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${minutes} ${meridiem} (${hours}:${minutes})`;
}

function formatPhoneNumber(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, "");
  if (clean.length === 12 && clean.startsWith("91")) {
    return `+91 ${clean.slice(2)}`;
  }
  if (clean.length === 10) {
    return `+91 ${clean}`;
  }
  return phone.trim();
}

export function generateBookingMessage(
  name: string,
  phone: string,
  service: string,
  preferredDate?: string,
  preferredTime?: string
): string {
  let message = `✂️ *Appointment Booking Request*

Hello *${salonConfig.business.name}*,
I would like to request an appointment. Please review my details below:

🧑 *Client Name:* ${name.trim()}
📞 *Phone Number:* ${formatPhoneNumber(phone)}
✂️ *Requested Service:* ${service}`;

  if (preferredDate) {
    message += `\n🗓️ *Preferred Date:* ${formatPreferredDate(preferredDate)}`;
  }
  if (preferredTime) {
    message += `\n⏰ *Preferred Time:* ${formatPreferredTime(preferredTime)}`;
  }

  message += `
⏳ *Status:* Pending Confirmation
🌐 *Source:* Website Booking Form

Please let me know the available appointment time, and please call me to confirm my appointment.`;

  message += `

Thank you.`;

  return message;
}

export function generateCallUrl(): string {
  const cleaned = salonConfig.contact.phone.replace(/[^0-9+]/g, "");
  return `tel:${cleaned}`;
}

export function generateDirectionsUrl(): string {
  if (salonConfig.google.directionsUrl) {
    return salonConfig.google.directionsUrl;
  }
  const { latitude, longitude } = salonConfig.address;
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

export function generateWriteReviewUrl(): string {
  if (salonConfig.google.writeReviewUrl) {
    return salonConfig.google.writeReviewUrl;
  }
  return `https://search.google.com/local/writereview?placeid=${salonConfig.google.placeId}`;
}

export function generateReviewsUrl(): string {
  if (salonConfig.google.reviewsUrl) {
    return salonConfig.google.reviewsUrl;
  }
  return salonConfig.google.mapsUrl;
}
