import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

// In-memory response cache: caps upstream Google Places usage even when the
// framework cache is bypassed (cold starts, cache-busting traffic patterns).
const CACHE_TTL_MS = 5 * 60 * 1000;
let responseCache: { body: unknown; at: number } | null = null;

export async function GET(request: NextRequest) {
  // Per-IP budget so bursts cannot drain the Places API quota (billing DoS).
  const rl = rateLimit(`place:${clientKey(request)}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  if (responseCache && Date.now() - responseCache.at < CACHE_TTL_MS) {
    return NextResponse.json(responseCache.body);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  if (!placeId) {
    return NextResponse.json(
      { error: "Google Place ID not configured" },
      { status: 500 }
    );
  }

  try {
    const fieldMask = [
      "id",
      "displayName",
      "formattedAddress",
      "internationalPhoneNumber",
      "rating",
      "userRatingCount",
      "reviews",
      "googleMapsUri",
      "websiteUri",
      "regularOpeningHours",
      "photos",
    ].join(",");

    const response = await fetch(
      `${PLACES_API_BASE}/${placeId}?key=${apiKey}`,
      {
        headers: {
          "X-Goog-FieldMask": fieldMask,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "Failed to fetch place data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const body = {
      name: data.displayName?.text || "",
      address: data.formattedAddress || "",
      phone: data.internationalPhoneNumber || "",
      rating: data.rating || 0,
      ratingCount: data.userRatingCount || 0,
      photos: (data.photos || []).map((photo: { name?: string }) => {
        const name = photo.name || "";
        return {
          url: name ? `/api/google-photo/${name.replace("places/", "")}` : "",
        };
      }),
      reviews: (data.reviews || []).slice(0, 5).map(
        (review: {
          rating?: number;
          text?: { text?: string };
          authorAttribution?: {
            displayName?: string;
            photoUri?: string;
          };
          relativePublishTimeDescription?: string;
          googleMapsUri?: string;
        }) => ({
          rating: review.rating,
          text: review.text?.text || "",
          authorName: review.authorAttribution?.displayName || "Anonymous",
          authorPhoto: review.authorAttribution?.photoUri || "",
          timeAgo: review.relativePublishTimeDescription || "",
          reviewUrl: review.googleMapsUri || "",
        })
      ),
      mapsUrl: data.googleMapsUri || "",
      openingHours: data.regularOpeningHours?.weekdayDescriptions || [],
    };

    responseCache = { body, at: Date.now() };
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
