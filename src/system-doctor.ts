import pc from 'picocolors';
import os from 'os';

export function checkSystem(): boolean {
  let isHealthy = true;

  const freeMemMB = Math.round(os.freemem() / 1024 / 1024);
  const totalMemMB = Math.round(os.totalmem() / 1024 / 1024);

  if (freeMemMB < 100) {
    console.warn(pc.yellow(`[SYSTEM]                 Low memory warning: Only ${freeMemMB}MB free out of ${totalMemMB}MB.`));
    isHealthy = false;
  } else {
    console.log(pc.green(`[SYSTEM]                 Memory healthy (${freeMemMB}MB free)`));
  }

  return isHealthy;
}
