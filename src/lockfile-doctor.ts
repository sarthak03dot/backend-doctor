import pc from 'picocolors';
import fs from 'fs';
import path from 'path';

export function checkLockfiles(): boolean {
  const cwd = process.cwd();
  
  const hasNpm = fs.existsSync(path.join(cwd, 'package-lock.json'));
  const hasYarn = fs.existsSync(path.join(cwd, 'yarn.lock'));
  const hasPnpm = fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'));
  const hasBun = fs.existsSync(path.join(cwd, 'bun.lockb'));

  const lockfilesCount = [hasNpm, hasYarn, hasPnpm, hasBun].filter(Boolean).length;

  if (lockfilesCount > 1) {
    console.error(pc.red(`[LOCKFILE]                 FATAL: Multiple package manager lockfiles detected in your repository! This will confuse CI/CD deployment pipelines (e.g., Render/Railway). Please delete the extra lockfiles.`));
    return false;
  } else if (lockfilesCount === 0) {
    console.warn(pc.yellow(`[LOCKFILE]                 WARNING: No lockfile detected. Deployments may produce unpredictable results because dependency versions are not locked.`));
    return false;
  } else {
    console.log(pc.green(`[LOCKFILE]                 Single lockfile detected. Deployments will be deterministic.`));
    return true;
  }
}
