import pc from 'picocolors';

export function checkEcosystem(): boolean {
  let isHealthy = true;

  // Check Node Version
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split('.')[0]);

  if (majorVersion < 18) {
    console.warn(pc.yellow(`[ECOSYSTEM]                 You are using Node.js v${nodeVersion}. Version 18+ is strongly recommended.`));
    isHealthy = false;
  } else {
    console.log(pc.green(`[ECOSYSTEM]                 Node.js v${nodeVersion} is modern and supported.`));
  }

  // Check Timezone
  const tz = process.env.TZ;
  const isUTC = new Date().getTimezoneOffset() === 0;

  if (!isUTC && tz !== 'UTC') {
    console.warn(pc.yellow(`[ECOSYSTEM]                 Server is not running in UTC timezone. This can break JWT expiries and Cron jobs. Set TZ=UTC in your environment.`));
    isHealthy = false;
  } else {
    console.log(pc.green(`[ECOSYSTEM]                 Server timezone is correctly configured (UTC).`));
  }

  return isHealthy;
}
