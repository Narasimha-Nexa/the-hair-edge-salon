import { salonConfig } from "@/config/salon.config";

export interface Faq {
  q: string;
  a: string;
}

export function getSiteFaqs(): Faq[] {
  const phone = salonConfig.contact.phoneDisplay;
  const { opensLabel, closesLabel } = salonConfig.hoursSpec;

  return [
    {
      q: "Where is Hair Edge Unisex Salon located in Madhapur?",
      a: "Hair Edge Unisex Salon is located at 1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar, Madhapur, Hyderabad, Telangana 500081. Near Hitech City Metro Station.",
    },
    {
      q: "What are the opening hours of Hair Edge Salon Madhapur?",
      a: `Hair Edge Unisex Salon Madhapur is open daily from ${opensLabel} to ${closesLabel}, including weekends and public holidays.`,
    },
    {
      q: "How to book an appointment at Hair Edge Unisex Salon?",
      a: `You can book an appointment via WhatsApp by clicking the 'Book Appointment' button on our website or calling ${phone}. We confirm availability and send confirmation via WhatsApp.`,
    },
    {
      q: "What services does Hair Edge Salon Madhapur offer?",
      a: "We offer hair cut, hair colour, keratin treatment, hair rebonding, hair straightening, beard grooming, waxing (full body, face, legs, arms), facial, bridal makeup, hair spa, hair styling, threading, manicure, pedicure, and head massage.",
    },
    {
      q: "Does Hair Edge Salon offer bridal makeup packages?",
      a: "Yes, we offer premium bridal makeup packages including pre-bridal packages, engagement makeup, reception makeup, and complete bridal trousseau styling. Book a consultation via WhatsApp.",
    },
    {
      q: "How much does a hair cut cost at Hair Edge Salon Madhapur?",
      a: "Hair cut pricing depends on hair length, style complexity, and stylist level. The exact cost is confirmed with you on WhatsApp before the service begins.",
    },
    {
      q: "Is parking available at Hair Edge Salon Madhapur?",
      a: "Yes, two-wheeler and four-wheeler parking is available near the salon. Located opposite Hitech Theater Lane with easy access from main road.",
    },
    {
      q: "Which areas does Hair Edge Salon serve in Hyderabad?",
      a: "We serve clients from Madhapur, Hitech City, Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Kukatpally, Miyapur, and surrounding areas in Hyderabad.",
    },
  ];
}
