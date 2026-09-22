import type { ServiceCategory } from "@/types/salon";

export const salonConfig = {
  business: {
    name: "Hair Edge Unisex Salon Madhapur",
    tagline: "Premium Hair, Beauty & Grooming",
    description:
      "Professional salon services for hair, beauty and grooming in Madhapur, Hyderabad.",
    category: "Unisex Salon",
  },

  contact: {
    // Public phone matches the Google Business Profile exactly (local SEO NAP consistency).
    phone: "+918985310570",
    phoneDisplay: "+91 89853 10570",
    // Separate WhatsApp line used for booking (wa.me links).
    whatsapp: "+916304884778",
    whatsappDisplay: "+91 63048 84778",
    email: "",
  },

  address: {
    full:
      "1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar, Madhapur, Hyderabad, Telangana 500081, India",
    short: "Madhapur, Hyderabad, Telangana 500081",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    postalCode: "500081",
    latitude: 17.4440901,
    longitude: 78.3880971,
  },

  google: {
    placeId: "ChIJVVVVKV6RyzsR82Zy8PIOmmA",
    cid: "6960892610633426675",
    mapsUrl:
      "https://www.google.com/maps/place/Hair+Edge+Unisex+Salon+madhapur/@17.4440901,78.3880971,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb915e29555555:0x609a0ef2f07266f3!8m2!3d17.4440901!4d78.3880971!16s%2Fg%2F11g8cj8bwx",
    directionsUrl: "",
    writeReviewUrl: "",
    reviewsUrl: "",
  },

  // Opening hours mirror the Google Business Profile (8:00 AM - 11:30 PM daily).
  hours: {
    monday: "08 AM - 11:30 PM",
    tuesday: "08 AM - 11:30 PM",
    wednesday: "08 AM - 11:30 PM",
    thursday: "08 AM - 11:30 PM",
    friday: "08 AM - 11:30 PM",
    saturday: "08 AM - 11:30 PM",
    sunday: "08 AM - 11:30 PM",
  },

  social: {
    instagram: "https://www.instagram.com/hairedgeunisex/",
    facebook: "",
    youtube: "",
  },

  branding: {
    primary: "#050505",
    surface: "#111111",
    gold: "#C9A227",
    goldLight: "#E0C45C",
    white: "#FFFFFF",
    muted: "#B5B5B5",
  },

  assets: {
    logo: "",
    hero: "/images/services/hair-rebonding.avif",
    menu: "/images/menu.png",
    fallbackService: "/images/services/hair-styling.avif",
  },

  features: {
    about: true,
    services: true,
    menu: true,
    reviews: true,
    contact: true,
    hours: true,
    social: true,
    gallery: true,
    team: false,
    transformations: false,
  },

  gallery: {
    title: "Our Work",
    subtitle: "A glimpse of our services and styles",
    images: [
      "/images/services/hair-colour.avif",
      "/images/services/hair-cut.avif",
      "/images/services/hair-styling.avif",
      "/images/services/make-up.avif",
      "/images/services/facial.avif",
      "/images/services/hair-keratin.avif",
    ],
  },

  team: [
    {
      id: "stylist-1",
      name: "Priya Sharma",
      role: "Senior Hair Stylist",
      specialty: "Hair Colour & Styling",
      experience: "10+ years",
      image: "",
      instagram: "",
    },
    {
      id: "stylist-2",
      name: "Rahul Kumar",
      role: "Barber & Beard Specialist",
      specialty: "Beard Grooming & Cuts",
      experience: "8+ years",
      image: "",
      instagram: "",
    },
    {
      id: "stylist-3",
      name: "Anita Reddy",
      role: "Beauty Therapist",
      specialty: "Facials & Skin Care",
      experience: "7+ years",
      image: "",
      instagram: "",
    },
    {
      id: "stylist-4",
      name: "Vikram Singh",
      role: "Hair Treatment Expert",
      specialty: "Keratin & Rebonding",
      experience: "9+ years",
      image: "",
      instagram: "",
    },
  ],

  transformations: {
    title: "Transformations",
    subtitle: "Real clients, real results",
    items: [],
  },

  brands: {
    title: "Brands We Trust",
    subtitle: "Premium products for premium results",
    logos: [
      { name: "L'Oréal Professionnel", logo: "/images/brands/loreal.svg" },
      { name: "Wella Professionals", logo: "/images/brands/wella.svg" },
      { name: "Schwarzkopf Professional", logo: "/images/brands/schwarzkopf.svg" },
      { name: "Olaplex", logo: "/images/brands/olaplex.svg" },
      { name: "Kérastase", logo: "/images/brands/kerastase.svg" },
    ],
  },

  cta: {
    primary: "Book via WhatsApp",
    secondary: "Explore Services",
    directions: "Get Directions",
    review: "Write a Review on Google",
  },

  reviews: {
    featured: [] as { name: string; rating: number; text: string; date: string }[],
    all: [] as { name: string; rating: number; text: string; date: string }[],
  },

  categories: [
    {
      id: "hair-styling",
      name: "Hair Styling",
      icon: "✂️",
      featured: true,
      accent: "#C9A227",
      services: [
        {
          id: "hair-styling",
          name: "Hair Styling",
          description:
            "Create a polished, stylish look tailored to your personality and occasion.",
          image: "/images/services/hair-styling.avif",
          price: "From ₹1,200",
          duration: "45-60 min",
          featured: true,
        },
        {
          id: "hair-cut",
          name: "Hair Cut",
          description:
            "Get a fresh, well-shaped haircut designed to complement your face and personal style.",
          image: "/images/services/hair-cut.avif",
          price: "From ₹600",
          duration: "30-45 min",
          featured: true,
        },
        {
          id: "hair-colour",
          name: "Hair Colour",
          description:
            "Refresh your look with professional hair colouring for a vibrant, beautiful finish.",
          image: "/images/services/hair-colour.avif",
          price: "From ₹2,500",
          duration: "60-90 min",
          featured: true,
        },
        {
          id: "hair-straightening",
          name: "Hair Straightening",
          description:
            "Achieve smoother, straighter-looking hair with a professional salon straightening service.",
          image: "/images/services/hair-straightening.avif",
          price: "From ₹4,000",
          duration: "120-180 min",
        },
        {
          id: "hair-blow-dry",
          name: "Hair Blow Dry",
          description:
            "Add volume, smoothness and a polished finish with a professional blow-dry.",
          image: "/images/services/hair-blow-dry.avif",
          price: "From ₹800",
          duration: "30-40 min",
        },
        {
          id: "hair-curling",
          name: "Hair Curling",
          description:
            "Create beautiful curls and waves for an elegant, stylish and finished look.",
          image: "/images/services/hair-curling.avif",
          price: "From ₹1,000",
          duration: "40-50 min",
        },
        {
          id: "hair-rebonding",
          name: "Hair Rebonding",
          description:
            "Transform your hair with a smoother, straighter appearance and a sleek salon finish.",
          image: "/images/services/hair-rebonding.avif",
          price: "From ₹5,000",
          duration: "180-240 min",
        },
      ],
    },
    {
      id: "beard-grooming",
      name: "Beard Grooming",
      icon: "🪒",
      accent: "#B8901F",
      services: [
        {
          id: "beard-styling",
          name: "Beard Styling",
          description:
            "Shape and style your beard to create a clean, defined look that suits your face.",
          image: "/images/services/beard-styling.avif",
          price: "From ₹400",
          duration: "20-30 min",
          featured: true,
        },
        {
          id: "beard-shaving",
          name: "Beard Shaving",
          description:
            "Enjoy a smooth, clean shave with professional salon grooming.",
          image: "/images/services/beard-shaving.avif",
          price: "From ₹300",
          duration: "15-20 min",
        },
        {
          id: "beard-trimming",
          name: "Beard Trimming",
          description:
            "Keep your beard neat, balanced and well-defined with professional trimming.",
          image: "/images/services/beard-trimming.avif",
          price: "From ₹250",
          duration: "15-20 min",
        },
      ],
    },
    {
      id: "waxing",
      name: "Waxing",
      icon: "✨",
      accent: "#D4A843",
      services: [
        {
          id: "full-body-waxing",
          name: "Full Body Waxing",
          description:
            "Enjoy smooth, clean-looking skin with professional full-body waxing.",
          image: "/images/services/full-body-waxing.avif",
          price: "From ₹3,500",
          duration: "90-120 min",
        },
        {
          id: "underarms-waxing",
          name: "Under Arms Waxing",
          description:
            "Achieve smooth, fresh-looking underarms with professional waxing care.",
          image: "/images/services/underarms-waxing.avif",
          price: "From ₹300",
          duration: "15 min",
        },
        {
          id: "full-leg-waxing",
          name: "Full Leg Waxing",
          description:
            "Keep your legs smooth and clean-looking with professional full-leg waxing.",
          image: "/images/services/full-leg-waxing.avif",
          price: "From ₹1,200",
          duration: "40-50 min",
        },
        {
          id: "full-arm-waxing",
          name: "Full Arm Waxing",
          description:
            "Get smooth, well-groomed arms with professional full-arm waxing.",
          image: "/images/services/full-arm-waxing.avif",
          price: "From ₹800",
          duration: "30-40 min",
        },
        {
          id: "half-arm-waxing",
          name: "Half Arm Waxing",
          description:
            "Professional waxing for smooth and well-groomed skin on the lower or upper arm area.",
          image: "/images/services/half-arm-waxing.avif",
          price: "From ₹500",
          duration: "20 min",
        },
        {
          id: "face-waxing",
          name: "Face Waxing",
          description:
            "Remove unwanted facial hair and enjoy a smoother, cleaner-looking finish.",
          image: "/images/services/face-waxing.avif",
          price: "From ₹400",
          duration: "20 min",
          featured: true,
        },
        {
          id: "half-leg-waxing",
          name: "Half Leg Waxing",
          description:
            "Professional waxing for smooth, well-groomed skin on the lower or upper leg area.",
          image: "/images/services/half-leg-waxing.avif",
          price: "From ₹700",
          duration: "25 min",
        },
      ],
    },
    {
      id: "hair-care",
      name: "Hair Care",
      icon: "💆",
      accent: "#C49A2A",
      services: [
        {
          id: "hair-spa",
          name: "Hair Spa",
          description:
            "Give your hair nourishing care with a relaxing salon hair spa experience.",
          image: "/images/services/hair-spa.avif",
          price: "From ₹1,500",
          duration: "45-60 min",
          featured: true,
        },
        {
          id: "hair-wash",
          name: "Hair Wash",
          description:
            "Refresh your hair and scalp with a professional salon hair wash.",
          image: "/images/services/hair-wash.avif",
          price: "From ₹300",
          duration: "15-20 min",
        },
      ],
    },
    {
      id: "face-care",
      name: "Face Care",
      icon: "🧴",
      accent: "#E0C45C",
      services: [
        {
          id: "face-bleach",
          name: "Face Bleach",
          description:
            "Refresh and brighten the appearance of your skin with professional face bleach care.",
          image: "/images/services/face-bleach.avif",
          price: "From ₹500",
          duration: "30 min",
        },
        {
          id: "face-clean-up",
          name: "Face Clean Up",
          description:
            "Give your skin a fresh, clean and refreshed appearance with a professional clean-up.",
          image: "/images/services/face-clean-up.avif",
          price: "From ₹800",
          duration: "40 min",
        },
        {
          id: "face-d-tan",
          name: "Face D-Tan",
          description:
            "Refresh the appearance of tanned skin and bring back a more even-looking glow.",
          image: "/images/services/face-d-tan.avif",
          price: "From ₹1,000",
          duration: "45 min",
        },
        {
          id: "facial",
          name: "Facial",
          description:
            "Enjoy a relaxing facial designed to cleanse, refresh and nourish your skin.",
          image: "/images/services/facial.avif",
          price: "From ₹1,500",
          duration: "60 min",
          featured: true,
        },
      ],
    },
    {
      id: "massage",
      name: "Massage",
      icon: "🤲",
      accent: "#B8901F",
      services: [
        {
          id: "head-massage",
          name: "Head Massage",
          description:
            "Relax and unwind with a soothing head massage designed for a refreshing salon experience.",
          image: "/images/services/head-massage.avif",
          price: "From ₹600",
          duration: "30 min",
          featured: true,
        },
      ],
    },
    {
      id: "manicure-pedicure",
      name: "Manicure & Pedicure",
      icon: "💅",
      accent: "#D4A843",
      services: [
        {
          id: "pedicure",
          name: "Pedicure",
          description:
            "Give your feet and nails professional care for a clean, refreshed and well-groomed finish.",
          image: "/images/services/pedicure.avif",
          price: "From ₹800",
          duration: "45 min",
          featured: true,
        },
        {
          id: "manicure",
          name: "Manicure",
          description:
            "Pamper your hands and nails with professional grooming and finishing care.",
          image: "/images/services/manicure.avif",
          price: "From ₹600",
          duration: "35 min",
        },
      ],
    },
    {
      id: "threading",
      name: "Threading",
      icon: "🪡",
      accent: "#C9A227",
      services: [
        {
          id: "full-face-threading",
          name: "Full Face Threading",
          description:
            "Achieve a clean, defined facial look with precise professional threading.",
          image: "/images/services/full-face-threading.avif",
          price: "From ₹400",
          duration: "25 min",
          featured: true,
        },
        {
          id: "eye-brow-threading",
          name: "Eye Brow Threading",
          description:
            "Shape and define your eyebrows for a neat and balanced appearance.",
          image: "/images/services/eye-brow-threading.avif",
          price: "From ₹150",
          duration: "10 min",
        },
        {
          id: "forehead-threading",
          name: "Forehead Threading",
          description:
            "Remove unwanted hair around the forehead area with precise threading.",
          image: "/images/services/forehead-threading.avif",
          price: "From ₹100",
          duration: "5 min",
        },
        {
          id: "chin-threading",
          name: "Chin Threading",
          description:
            "Enjoy a clean, smooth-looking chin area with professional threading.",
          image: "/images/services/chin-threading.avif",
          price: "From ₹100",
          duration: "5 min",
        },
        {
          id: "lip-threading",
          name: "Lip Threading",
          description:
            "Remove unwanted hair around the upper lip area with precise salon threading.",
          image: "/images/services/lip-threading.avif",
          price: "From ₹100",
          duration: "5 min",
        },
        {
          id: "cheek-threading",
          name: "Cheek Threading",
          description:
            "Clean and define the cheek area with professional facial threading.",
          image: "/images/services/cheek-threading.avif",
          price: "From ₹150",
          duration: "10 min",
        },
        {
          id: "sideburn-threading",
          name: "Sideburn Threading",
          description:
            "Keep the sideburn area neat and well-groomed with precise threading.",
          image: "/images/services/sideburn-threading.avif",
          price: "From ₹150",
          duration: "10 min",
        },
      ],
    },
    {
      id: "hair-treatment",
      name: "Hair Treatment",
      icon: "🧪",
      accent: "#B8901F",
      services: [
        {
          id: "hair-keratin",
          name: "Hair Keratin",
          description:
            "Give your hair a smoother, shinier and more manageable-looking finish with professional keratin care.",
          image: "/images/services/hair-keratin.avif",
          price: "From ₹4,500",
          duration: "120-180 min",
          featured: true,
        },
      ],
    },
    {
      id: "makeup",
      name: "Make Up",
      icon: "💄",
      accent: "#E0C45C",
      services: [
        {
          id: "make-up",
          name: "Make Up",
          description:
            "Enhance your natural beauty with professional makeup for your special occasion or event.",
          image: "/images/services/make-up.avif",
          price: "From ₹2,500",
          duration: "60-90 min",
          featured: true,
        },
      ],
    },
  ] as ServiceCategory[],

  services: [
    { id: "hair-styling", name: "Hair Styling" },
    { id: "hair-cut", name: "Hair Cut" },
    { id: "hair-colour", name: "Hair Colour" },
    { id: "hair-straightening", name: "Hair Straightening" },
    { id: "hair-blow-dry", name: "Hair Blow Dry" },
    { id: "hair-curling", name: "Hair Curling" },
    { id: "hair-rebonding", name: "Hair Rebonding" },
    { id: "beard-styling", name: "Beard Styling" },
    { id: "beard-shaving", name: "Beard Shaving" },
    { id: "beard-trimming", name: "Beard Trimming" },
    { id: "full-body-waxing", name: "Full Body Waxing" },
    { id: "underarms-waxing", name: "Under Arms Waxing" },
    { id: "full-leg-waxing", name: "Full Leg Waxing" },
    { id: "full-arm-waxing", name: "Full Arm Waxing" },
    { id: "half-arm-waxing", name: "Half Arm Waxing" },
    { id: "face-waxing", name: "Face Waxing" },
    { id: "half-leg-waxing", name: "Half Leg Waxing" },
    { id: "hair-spa", name: "Hair Spa" },
    { id: "hair-wash", name: "Hair Wash" },
    { id: "face-bleach", name: "Face Bleach" },
    { id: "face-clean-up", name: "Face Clean Up" },
    { id: "face-d-tan", name: "Face D-Tan" },
    { id: "facial", name: "Facial" },
    { id: "head-massage", name: "Head Massage" },
    { id: "pedicure", name: "Pedicure" },
    { id: "manicure", name: "Manicure" },
    { id: "full-face-threading", name: "Full Face Threading" },
    { id: "eye-brow-threading", name: "Eye Brow Threading" },
    { id: "forehead-threading", name: "Forehead Threading" },
    { id: "chin-threading", name: "Chin Threading" },
    { id: "lip-threading", name: "Lip Threading" },
    { id: "cheek-threading", name: "Cheek Threading" },
    { id: "sideburn-threading", name: "Sideburn Threading" },
    { id: "hair-keratin", name: "Hair Keratin" },
    { id: "make-up", name: "Make Up" },
  ],

  seo: {
    title: "Hair Edge Unisex Salon | Madhapur, Hyderabad",
    description:
      "Hair Edge Unisex Salon in Madhapur, Hyderabad. Explore services, view the salon menu, check Google reviews, find the location and book via WhatsApp.",
    keywords: [
      "Hair Edge Unisex Salon",
      "Hair Edge Madhapur",
      "Unisex Salon Madhapur",
      "Salon Madhapur Hyderabad",
      "Hair Salon Madhapur",
    ],
  },
};
