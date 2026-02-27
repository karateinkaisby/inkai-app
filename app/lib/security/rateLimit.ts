import "server-only";

type Bucket = {
  tokens: number;
  lastRefill: number;
};

const RATE_LIMIT_BUCKETS = new Map<string, Bucket>();

type RateLimitOptions = {
  /** Maksimal request dalam window (default 20) */
  max?: number;
  /** Window dalam ms (default 60_000 = 1 menit) */
  windowMs?: number;
};

export function checkRateLimit(
  key: string,
  { max = 20, windowMs = 60_000 }: RateLimitOptions = {},
): { ok: true } | { ok: false } {
  const now = Date.now();
  const bucket = RATE_LIMIT_BUCKETS.get(key) ?? {
    tokens: max,
    lastRefill: now,
  };

  // Refill sederhana: reset penuh setiap window
  if (now - bucket.lastRefill >= windowMs) {
    bucket.tokens = max;
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    RATE_LIMIT_BUCKETS.set(key, bucket);
    return { ok: false as const };
  }

  bucket.tokens -= 1;
  RATE_LIMIT_BUCKETS.set(key, bucket);
  return { ok: true as const };
}

