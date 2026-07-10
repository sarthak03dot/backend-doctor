import pc from 'picocolors';

const ipStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  message?: string;
}

/**
 * Basic in-memory rate limiter middleware for basic protection.
 */
export function rateLimiter(options: RateLimiterOptions = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const maxRequests = options.maxRequests || 100;
  const message = options.message || 'Too many requests from this IP, please try again later.';

  return function (req: any, res: any, next: Function) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    const record = ipStore.get(ip);

    if (!record) {
      ipStore.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (now > record.resetTime) {
      ipStore.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      console.warn(pc.yellow(`[RATE LIMIT]                 Blocked IP: ${ip} for exceeding ${maxRequests} requests.`));
      return res.status(429).json({ success: false, message, error: 'Rate limit exceeded' });
    }

    next();
  };
}
