import { NextRequest, NextResponse } from "next/server";

const PLACES_API_BASE = "https://places.googleapis.com/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  const name = params.path.join("/");
  if (!name.startsWith("places/")) {
    return NextResponse.json({ error: "Invalid photo reference" }, { status: 400 });
  }

  const scriptUrl = request.nextUrl.searchParams.get("w") || "1600";
  const width = Math.min(Math.max(parseInt(scriptUrl, 10) || 1600, 400), 2400);

  try {
    const response = await fetch(
      `${PLACES_API_BASE}/${name}/media?key=${apiKey}&maxWidthPx=${width}`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch photo" },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buffer.byteLength),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}