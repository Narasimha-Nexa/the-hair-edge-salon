export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  duration?: string;
  featured?: boolean;
  isPlaceholder?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  accent?: string;
  featured?: boolean;
  services: Service[];
}

export interface GooglePlaceReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
}

export interface GooglePlaceData {
  name: string;
  address: string;
  phone: string;
  rating: number;
  ratingCount: number;
  reviews: GooglePlaceReview[];
  mapsUrl: string;
  directionsUrl: string;
  writeReviewUrl: string;
  reviewsUrl: string;
  openingHours: string[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  instagram?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Transformation {
  id: string;
  service: string;
  before: string;
  after: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface GalleryConfig {
  title: string;
  subtitle: string;
  images: string[];
}

export interface TeamConfig {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface TransformationsConfig {
  title: string;
  subtitle: string;
  items: Transformation[];
}

export interface BrandsConfig {
  title: string;
  subtitle: string;
  logos: Brand[];
}
