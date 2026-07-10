import pc from 'picocolors';

export function checkEnvVariables(requiredVars: string[] = []): boolean {
  let isHealthy = true;

  // Check NODE_ENV
  if (!process.env.NODE_ENV) {
    console.warn(pc.yellow('[ENV]                 NODE_ENV is not set. It is recommended to explicitly set NODE_ENV to "development" or "production".'));
    isHealthy = false;
  } else {
    console.log(pc.green(`[ENV]                 NODE_ENV is set to "${process.env.NODE_ENV}"`));
  }

  // Check required custom vars
  const missingVars: string[] = [];
  requiredVars.forEach((v) => {
    if (!process.env[v]) {
      missingVars.push(v);
    }
  });

  if (missingVars.length > 0) {
    console.error(pc.red(`[ENV]                 Missing required environment variables: ${missingVars.join(', ')}`));
    isHealthy = false;
  } else if (requiredVars.length > 0) {
    console.log(pc.green(`[ENV]                 All ${requiredVars.length} required environment variables are present.`));
  }

  return isHealthy;
}
