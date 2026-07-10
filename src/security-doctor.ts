import pc from 'picocolors';

export interface SecurityOptions {
  jwtSecret?: string;
  checkAwsKeys?: boolean;
  helmet?: boolean;
}

export function checkSecurity(options: SecurityOptions): boolean {
  let isHealthy = true;

  // 1. JWT Secret Validation
  if (options.jwtSecret) {
    if (options.jwtSecret.length < 32) {
      console.warn(pc.yellow(`[SECURITY]                 WARNING: JWT_SECRET is extremely weak (${options.jwtSecret.length} chars). Use at least 32 random characters in production.`));
      isHealthy = false;
    } else {
      console.log(pc.green(`[SECURITY]                 JWT_SECRET meets complexity requirements.`));
    }
  }

  // 2. AWS Credentials
  if (options.checkAwsKeys) {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn(pc.yellow(`[SECURITY]                 AWS keys are missing but checkAwsKeys is true.`));
      isHealthy = false;
    } else {
      console.log(pc.green(`[SECURITY]                 AWS credentials detected in environment.`));
    }
  }

  // 3. Helmet Validation
  if (options.helmet === false) {
    console.warn(pc.yellow(`[SECURITY]                 Helmet is disabled. It is recommended to enable it in production.`));
    isHealthy = false;
  } else if (options.helmet) {
    console.log(pc.green(`[SECURITY]                 Helmet is enabled.`));
  }

  return isHealthy;
}
