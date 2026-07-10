import pc from 'picocolors';
import fs from 'fs';
import path from 'path';

export function checkFilePermissions(dirsToCheck: string[]): boolean {
  let isHealthy = true;

  for (const dir of dirsToCheck) {
    const fullPath = path.resolve(dir);
    
    try {
      // Check if directory exists
      if (!fs.existsSync(fullPath)) {
        console.error(pc.red(`[FILESYSTEM]                 FATAL: Required directory does not exist: ${fullPath}`));
        isHealthy = false;
        continue;
      }

      // Check Read/Write permissions
      fs.accessSync(fullPath, fs.constants.R_OK | fs.constants.W_OK);
      console.log(pc.green(`[FILESYSTEM]                 Directory ${fullPath} has proper read/write permissions.`));
    } catch (err) {
      console.error(pc.red(`[FILESYSTEM]                 FATAL: Cannot read/write to directory: ${fullPath}. File uploads will fail.`));
      isHealthy = false;
    }
  }

  return isHealthy;
}
