import express from 'express';
import { runDiagnostics, apiLogger, uptimeDoctorMiddleware } from '../src/index';

const app = express();
const port = process.env.PORT || 3000;

app.use(apiLogger());
app.use(uptimeDoctorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello from backend-doctor demo!');
});

async function startServer() {
  // 1. Run Diagnostics before starting the server
  await runDiagnostics({
    port: Number(port),
    requiredEnvVars: ['NODE_ENV'], 
    enableCrashDoctor: true,
    enableUptimeDoctor: true,
    checkDependencies: true,
    memory: { maxHeapUsageThresholdMb: 1024 },
    cpu: { maxLoadThreshold: 0.8 }
  });

  // 2. Start the server
  app.listen(port, () => {
    console.log(`🚀 Demo server is running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);
