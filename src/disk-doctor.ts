import pc from 'picocolors';
import fs from 'fs';

export function checkDiskSpace(pathToCheck: string = '/'): boolean {
  try {
    const stat = fs.statfsSync(pathToCheck);
    // stat.bavail = free blocks available to unprivileged user
    // stat.bsize = block size
    const availableSpaceBytes = stat.bavail * stat.bsize;
    const totalSpaceBytes = stat.blocks * stat.bsize;
    
    const availableGB = (availableSpaceBytes / (1024 * 1024 * 1024)).toFixed(2);
    const totalGB = (totalSpaceBytes / (1024 * 1024 * 1024)).toFixed(2);
    
    const percentageFree = (availableSpaceBytes / totalSpaceBytes) * 100;

    if (percentageFree < 5) {
      console.warn(pc.yellow(`[DISK]                 CRITICAL WARNING: Only ${percentageFree.toFixed(1)}% (${availableGB}GB) disk space left on ${pathToCheck}. Database or logs may crash soon.`));
      return false;
    } else {
      console.log(pc.green(`[DISK]                 Storage healthy: ${availableGB}GB free out of ${totalGB}GB on ${pathToCheck}.`));
      return true;
    }
  } catch (error) {
    console.warn(pc.yellow(`[DISK]                 Could not determine disk space for ${pathToCheck}. Error: ${(error as Error).message}`));
    return true; // Don't fail the whole app if statfs isn't supported on their OS
  }
}
