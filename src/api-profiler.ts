import pc from 'picocolors';

/**
 * Express middleware to track slow requests.
 * Solves the problem: "Why is my API slow?"
 */
export function slowQueryProfiler(thresholdMs: number = 500) {
  return function (req: any, res: any, next: Function) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      if (duration > thresholdMs) {
        console.warn(
          pc.yellow(`[PROFILER]                 SLOW API DETECTED: ${req.method} ${req.originalUrl || req.url} took ${duration}ms`)
        );
      }
    });

    next();
  };
}
