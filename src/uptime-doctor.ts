import pc from 'picocolors';

export function uptimeDoctorMiddleware(req: any, res: any, next: any) {
  if (req.path === '/health' || req.path === '/healthcheck') {
    return res.status(200).json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }
  next();
}

export function setupUptimeDoctor(): boolean {
  console.log(pc.blue('Uptime Diagnostics:'));
  console.log(pc.green(`  [OK] App is running. Current Uptime: ${process.uptime().toFixed(2)} seconds.`));
  console.log(pc.gray('  [Info] You can use uptimeDoctorMiddleware for a /health endpoint.'));
  return true;
}
