import v8 from 'v8';
import pc from 'picocolors';

export interface MemoryOptions {
  maxHeapUsageThresholdMb?: number; // threshold in MB, e.g. 1024 (1GB)
}

export function checkMemoryUsage(options?: MemoryOptions): boolean {
  try {
    const heapStats = v8.getHeapStatistics();
    const usedHeapMb = Math.round(heapStats.used_heap_size / 1024 / 1024);
    const totalHeapMb = Math.round(heapStats.heap_size_limit / 1024 / 1024);
    
    console.log(pc.blue('Memory Diagnostics:'));
    console.log(`  Used Heap: ${usedHeapMb} MB`);
    console.log(`  Total Heap Limit: ${totalHeapMb} MB`);

    const threshold = options?.maxHeapUsageThresholdMb || (totalHeapMb * 0.8); // 80% default threshold

    if (usedHeapMb > threshold) {
      console.warn(pc.yellow(`  [Warning] High memory usage detected (${usedHeapMb}MB exceeds threshold of ${threshold}MB).`));
      return false;
    }
    
    console.log(pc.green('  [OK] Memory usage looks healthy.'));
    return true;
  } catch (error) {
    console.warn(pc.yellow('  [Warning] Could not gather memory statistics.'));
    return false;
  }
}
