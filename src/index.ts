import { checkEnvVariables } from './env-doctor';
import { checkCORS } from './cors-doctor';
import { checkSystem } from './system-doctor';
import { checkPort } from './port-doctor';
import { checkDatabase } from './db-doctor';
import { checkRedis } from './redis-doctor';
import { checkSecurity, SecurityOptions } from './security-doctor';
import { setupCrashDoctor } from './crash-doctor';
import { setupGracefulShutdown } from './shutdown-doctor';
import { checkEcosystem } from './ecosystem-doctor';
import { checkDNS } from './dns-doctor';
import { checkDiskSpace } from './disk-doctor';
import { checkMailServer, SmtpOptions } from './mail-doctor';
import { checkFilePermissions } from './fs-doctor';
import { checkLockfiles } from './lockfile-doctor';
import { checkMemoryUsage, MemoryOptions } from './memory-doctor';
import { checkCpuUsage, CpuOptions } from './cpu-doctor';
import { checkDependencies } from './dependency-doctor';
import { setupUptimeDoctor, uptimeDoctorMiddleware } from './uptime-doctor';

// Export standalone utilities
export { api, ApiResponse } from './api-response';
export { slowQueryProfiler } from './api-profiler';
export { rateLimiter } from './rate-limiter';
export { uptimeDoctorMiddleware } from './uptime-doctor';
export { apiLogger } from './api-logger';

export interface DoctorOptions {
  requiredEnvVars?: string[];
  corsOptions?: any;
  port?: number;
  databaseUri?: string;
  redisUri?: string;
  security?: SecurityOptions;
  smtp?: SmtpOptions;
  uploadDirs?: string[];
  enableCrashDoctor?: boolean;
  onShutdown?: () => Promise<void>;
  memory?: MemoryOptions;
  cpu?: CpuOptions;
  checkDependencies?: boolean;
  enableUptimeDoctor?: boolean;
}

export async function runDiagnostics(options: DoctorOptions = {}): Promise<void> {
  console.log('\nRunning "Everything in the Universe" Backend Diagnostics...\n');

  let hasErrors = false;

  // 1. Ecosystem & Config Checks
  if (!checkEcosystem()) hasErrors = true;
  if (!checkLockfiles()) hasErrors = true;
  if (options.checkDependencies !== false) {
    if (!checkDependencies()) hasErrors = true;
  }

  // 2. Hardware/System Checks
  if (!checkSystem()) hasErrors = true;
  if (!checkDiskSpace('/')) hasErrors = true;
  if (!checkMemoryUsage(options.memory)) hasErrors = true;
  if (!checkCpuUsage(options.cpu)) hasErrors = true;

  // 3. Network Checks
  if (!(await checkDNS())) hasErrors = true;

  // 4. Env Checks
  if (!checkEnvVariables(options.requiredEnvVars)) hasErrors = true;

  // 5. Security Checks
  if (options.security) {
    if (!checkSecurity(options.security)) hasErrors = true;
  }

  // 6. CORS Checks
  if (options.corsOptions) {
    if (!checkCORS(options.corsOptions)) hasErrors = true;
  }

  // 7. FS Checks (File Uploads)
  if (options.uploadDirs) {
    if (!checkFilePermissions(options.uploadDirs)) hasErrors = true;
  }

  // 8. Port Checks
  if (options.port) {
    if (!(await checkPort(options.port))) hasErrors = true;
  }

  // 9. Database/External Services Checks
  if (options.databaseUri) {
    if (!(await checkDatabase(options.databaseUri))) hasErrors = true;
  }
  if (options.redisUri) {
    if (!(await checkRedis(options.redisUri))) hasErrors = true;
  }
  if (options.smtp) {
    if (!(await checkMailServer(options.smtp))) hasErrors = true;
  }

  // 10. Setup Global Interceptors
  if (options.enableCrashDoctor !== false) {
    setupCrashDoctor();
  }

  if (options.onShutdown !== undefined) {
    setupGracefulShutdown(options.onShutdown);
  }

  if (options.enableUptimeDoctor !== false) {
    setupUptimeDoctor();
  }

  if (hasErrors) {
    console.warn('\n  Diagnostics completed with warnings. Your app is highly likely to crash or behave unexpectedly in production.\n');
  } else {
    console.log('\nAll Diagnostics passed! Your environment is absolutely flawless.\n');
  }
}
