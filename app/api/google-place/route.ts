import { NextResponse } from "next/server";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

export async function GET() {
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

    return NextResponse.json({
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
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
