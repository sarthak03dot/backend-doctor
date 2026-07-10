import pc from 'picocolors';

export function checkCORS(corsOptions: any): boolean {
  let isHealthy = true;

  if (!corsOptions) {
    console.warn(pc.yellow('[CORS]                 No CORS options provided to check.'));
    return false;
  }

  // Check for dangerous combination: origin '*' + credentials true
  if (corsOptions.origin === '*' && corsOptions.credentials === true) {
    console.error(pc.red(`[CORS]                 FATAL: Cannot set origin to '*' when credentials is true.`));
    isHealthy = false;
  }

  // Check for production wildcard
  if (process.env.NODE_ENV === 'production' && corsOptions.origin === '*') {
    console.warn(pc.yellow('[CORS]                 WARNING: Using origin "*" in production is dangerous. Restrict to specific domains.'));
    isHealthy = false;
  }

  if (isHealthy) {
    console.log(pc.green('[CORS]                 Configuration looks safe.'));
  }

  return isHealthy;
}
