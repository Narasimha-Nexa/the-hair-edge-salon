interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

/**
 * Fixed-window per-key rate limiter (in-memory, best effort).
 *
 * Applied to the Google Places proxy routes so a single client cannot drain
 * the API quota (billing denial of service). On multi-instance hosts this is
 * per-instance — good enough as defence in depth alongside framework caching.
 */
export function rateLimit(
  key: string,
  { limit = 60, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Keep the map bounded: purge expired buckets when it grows, and as a last
  // resort clear everything so memory can never grow without limit.
  if (buckets.size > MAX_BUCKETS) {
    buckets.forEach((bucket, key) => {
      if (bucket.resetAt <= now) buckets.delete(key);
    });
    if (buckets.size > MAX_BUCKETS) buckets.clear();
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { ok: true, retryAfterSec: 0 };
}

/** Best-effort client identity: first X-Forwarded-For hop, else local. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "local";
}
