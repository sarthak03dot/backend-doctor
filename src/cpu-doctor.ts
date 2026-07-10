import os from 'os';
import pc from 'picocolors';

export interface CpuOptions {
  maxLoadThreshold?: number; // e.g. 0.8 for 80%
}

export function checkCpuUsage(options?: CpuOptions): boolean {
  try {
    const cpus = os.cpus();
    const loadAvg = os.loadavg(); // Returns 1, 5, 15 min load avg

    console.log(pc.blue('CPU Diagnostics:'));
    console.log(`  CPU Cores: ${cpus.length}`);
    console.log(`  Load Average (1m, 5m, 15m): ${loadAvg.map(l => l.toFixed(2)).join(', ')}`);

    // Load avg is per system, so load / cores is the relative load
    const relative1mLoad = loadAvg[0] / cpus.length;
    const threshold = options?.maxLoadThreshold || 0.8;

    if (relative1mLoad > threshold) {
       console.warn(pc.yellow(`  [Warning] High CPU load detected (Load: ${relative1mLoad.toFixed(2)}, Threshold: ${threshold}).`));
       return false;
    }

    console.log(pc.green('  [OK] CPU load is within acceptable limits.'));
    return true;
  } catch (error) {
    console.warn(pc.yellow('  [Warning] Could not gather CPU statistics.'));
    return false;
  }
}
