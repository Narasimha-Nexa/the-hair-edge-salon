export interface Area {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1a: string;
  h1b: string;
  intro: string;
  nearby: string;
  travel: string;
  highlights: string[];
}

export const areas: Area[] = [
  {
    slug: "madhapur",
    name: "Madhapur",
    metaTitle: "Salon in Madhapur, Hyderabad",
    metaDescription:
      "Hair Edge Unisex Salon in Madhapur — hair cut, colour, keratin, beard grooming & bridal makeup. 4.6★ near Hitech City Metro. Open daily till 11:30 PM. Book via WhatsApp.",
    h1a: "Hair Salon in Madhapur",
    h1b: "Hair Edge Unisex Salon",
    intro:
      "Hair Edge Unisex Salon is located in the heart of Madhapur, Hyderabad — opposite Hitech Theater Lane, beside Adi Restaurant. Whether you need a precision hair cut, global colour, keratin smoothing, beard sculpting, or bridal makeup, our certified stylists deliver salon-quality results for clients across Madhapur.",
    nearby:
      "We’re minutes from Ayyappa Society, Pedda Amberpet, and the Madhapur main road, with easy parking near the salon.",
    travel:
      "From Hitech City Metro Station it’s a short auto or walk; from Gachibowli and Kondapur most clients reach us in 15–25 minutes via the ORR.",
    highlights: [
      "Walk-ins welcome, appointments recommended",
      "Open daily 8:00 AM – 11:30 PM",
      "Premium products: L’Oréal, Wella, Olaplex, Kérastase",
      "WhatsApp booking with instant confirmation",
    ],
  },
  {
    slug: "hitech-city",
    name: "Hitech City",
    metaTitle: "Salon Near Hitech City, Hyderabad",
    metaDescription:
      "Looking for a salon near Hitech City? Hair Edge in Madhapur is 5–10 min away — hair cut, colour, keratin, beard & bridal makeup. 4.6★ rated. Book on WhatsApp.",
    h1a: "Salon Near Hitech City",
    h1b: "Hair Edge Unisex Salon Madhapur",
    intro:
      "Working in Hitech City and need a reliable salon after hours? Hair Edge Unisex Salon in Madhapur is the closest premium unisex option to Cyber Towers, Hitec City Metro, and the surrounding IT corridor — open daily until 11:30 PM for after-work appointments.",
    nearby:
      "Serving software professionals and residents near Cyber Towers, Madhapur Phase 1 & 2, and Pedda Amberpet.",
    travel:
      "5–10 minutes from Hitech City Metro Station; convenient auto and cab access from Cyber Towers and Infinity Towers.",
    highlights: [
      "Late-night slots till 11:30 PM for office goers",
      "Quick beard trim & hair cut between meetings",
      "Keratin, rebonding & colour specialists",
      "Corporate-friendly WhatsApp booking",
    ],
  },
  {
    slug: "gachibowli",
    name: "Gachibowli",
    metaTitle: "Salon in Gachibowli, Hyderabad",
    metaDescription:
      "Premium unisex salon serving Gachibowli — Hair Edge Madhapur offers hair cut, colour, keratin, facial & bridal makeup. 15 min from Gachibowli. Book via WhatsApp.",
    h1a: "Unisex Salon for Gachibowli",
    h1b: "Hair Edge Salon Madhapur",
    intro:
      "Clients from Gachibowli choose Hair Edge Unisex Salon for transparent pricing, certified stylists, and a full menu of hair, skin, and grooming services — from budget-friendly hair cuts to luxury bridal packages.",
    nearby:
      "Popular with residents near Gachibowli Road, IOC X Roads, and financial district apartments who want a step up from neighbourhood salons.",
    travel:
      "Typically 15–25 minutes from Gachibowli via Gachibowli–Miyapur road or ORR, with parking near the salon.",
    highlights: [
      "Full hair, skin & bridal menu in one place",
      "4.6★ Google rating with 1,100+ reviews",
      "Pre-bridal & wedding packages",
      "Easy WhatsApp consult before you travel",
    ],
  },
  {
    slug: "kondapur",
    name: "Kondapur",
    metaTitle: "Salon in Kondapur, Hyderabad",
    metaDescription:
      "Hair salon serving Kondapur — Hair Edge Unisex Salon Madhapur for hair cut, colour, keratin, waxing & bridal makeup. Trusted 4.6★ salon. Book on WhatsApp.",
    h1a: "Hair Salon Serving Kondapur",
    h1b: "Hair Edge Unisex Salon",
    intro:
      "Kondapur families and professionals trust Hair Edge for consistent colour work, damage-controlled smoothing treatments, and hygienic grooming services. Our team handles everything from kids’ hair cuts to full bridal trousseau styling.",
    nearby:
      "We also welcome clients from Serilingampally, Ramanthapur, and the Kondapur–Madhapur stretch.",
    travel:
      "About 15–20 minutes from Kondapur main road; straight shot via Madhapur circle with nearby two-wheeler and car parking.",
    highlights: [
      "Family-friendly unisex salon",
      "Threading, waxing & facials for all ages",
      "Keratin & rebonding with aftercare guidance",
      "Clear quotes confirmed before the service",
    ],
  },
  {
    slug: "jubilee-hills",
    name: "Jubilee Hills",
    metaTitle: "Salon Near Jubilee Hills, Hyderabad",
    metaDescription:
      "Salon near Jubilee Hills — Hair Edge Madhapur offers premium hair colour, keratin, beard grooming & bridal makeup without the premium-area price tag.",
    h1a: "Salon Near Jubilee Hills",
    h1b: "Hair Edge Unisex Salon Madhapur",
    intro:
      "Want Jubilee Hills–level styling without the wait or markup? Hair Edge Unisex Salon delivers editorial-quality colour, cuts, and bridal looks from our Madhapur studio — preferred by clients who want value and craftsmanship together.",
    nearby:
      "Convenient for clients coming from Road No. 36, Film Nagar, and the Jubilee Hills–Madhapur corridor.",
    travel:
      "Approx. 20–30 minutes depending on traffic via Road No. 36 or ORR exit toward Madhapur.",
    highlights: [
      "Editorial colour & balayage specialists",
      "Premium bridal & engagement makeup",
      "International product brands",
      "Private consult via WhatsApp before you visit",
    ],
  },
  {
    slug: "banjara-hills",
    name: "Banjara Hills",
    metaTitle: "Salon Near Banjara Hills, Hyderabad",
    metaDescription:
      "Trusted unisex salon for Banjara Hills clients — hair cut, global colour, keratin, facial & bridal packages at Hair Edge Madhapur. Open daily till 11:30 PM.",
    h1a: "Salon Near Banjara Hills",
    h1b: "Hair Edge Unisex Salon",
    intro:
      "Banjara Hills clients book Hair Edge for reliable colour correction, keratin treatments, and complete bridal packages — with the same care you’d expect from a high-street salon, at Madhapur pricing.",
    nearby:
      "Serving Road No. 12, CVR Nagar, and travel from Banjara Hills Road No. 2 via the ORR.",
    travel:
      "Around 20–30 minutes from Banjara Hills depending on ORR traffic; we’ll confirm your slot on WhatsApp before you leave.",
    highlights: [
      "Colour correction & global colour",
      "Pre-bridal timeline planning",
      "Hygienic, sterilised tools every client",
      "Open all 7 days including holidays",
    ],
  },
  {
    slug: "kukatpally",
    name: "Kukatpally",
    metaTitle: "Salon in Kukatpally, Hyderabad",
    metaDescription:
      "Unisex salon for Kukatpally & KPHB — Hair Edge Madhapur for hair cut, colour, keratin, threading & bridal makeup. 4.6★ rated salon in Hyderabad.",
    h1a: "Salon Serving Kukatpally",
    h1b: "Hair Edge Unisex Salon Madhapur",
    intro:
      "From KPHB to Kukatpally Main Road, clients come to Hair Edge for no-nonsense pricing, skilled stylists, and a complete beauty menu under one roof — hair, skin, nails, and bridal.",
    nearby:
      "Also popular with residents of JNTU, Miyapur, and Balanagar who want a full-service salon.",
    travel:
      "20–30 minutes from Kukatpally via NH44 / Madhapur approach; metro to Hitech City + short auto is a smart option.",
    highlights: [
      "Complete under-one-roof beauty menu",
      "Student & professional friendly pricing tiers",
      "Express services for busy schedules",
      "Book slots 2–3 hours ahead on WhatsApp",
    ],
  },
  {
    slug: "miyapur",
    name: "Miyapur",
    metaTitle: "Salon in Miyapur, Hyderabad",
    metaDescription:
      "Hair & beauty salon for Miyapur — Hair Edge Unisex Salon Madhapur for hair cut, colour, keratin, waxing & bridal makeup. Book your appointment on WhatsApp.",
    h1a: "Unisex Salon for Miyapur",
    h1b: "Hair Edge Salon Madhapur",
    intro:
      "Miyapur clients choose Hair Edge for weekend appointments that actually run on time — precision cuts, long-lasting colour, smoothing treatments, and bridal artistry with documented results.",
    nearby:
      "Great option for Miyapur, Bachupally, and Gundlapochampally residents who prefer a dedicated salon team over unisex chains.",
    travel:
      "20–30 minutes via Miyapur–Madhapur route; metro to Hitech City then auto is often fastest in peak traffic.",
    highlights: [
      "Weekend slots book up — reserve early",
      "Before/after transformations portfolio",
      "Kid-friendly hair cuts available",
      "Transparent “from” pricing on services",
    ],
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
