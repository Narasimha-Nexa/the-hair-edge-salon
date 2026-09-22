import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const PLACES_API_BASE = "https://places.googleapis.com/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Per-IP budget: every accepted request is proxied to Google with our API
  // key, so unthrottled traffic would drain the Places quota (billing DoS).
  const rl = rateLimit(`photo:${clientKey(request)}`, {
    limit: 120,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  // Strict allowlist: a Google photo resource is a single alphanumeric
  // token. Rejects traversal, query/hash injection and any extra path
  // segment; the upstream host stays fixed to places.googleapis.com (no SSRF).
  const bare = params.path.join("/").replace(/^places\//, "");
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(bare)) {
    return NextResponse.json({ error: "Invalid photo reference" }, { status: 400 });
  }
  const name = `places/${bare}`;

  const widthParam = request.nextUrl.searchParams.get("w") || "1600";
  const width = Math.min(Math.max(parseInt(widthParam, 10) || 1600, 400), 2400);

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