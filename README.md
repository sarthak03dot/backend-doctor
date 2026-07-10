# Backend Doctor 🩺 

[![NPM Version](https://img.shields.io/npm/v/@sarthak03dot/backend-doctor?color=cb3837&logo=npm)](https://www.npmjs.com/package/@sarthak03dot/backend-doctor)
[![Documentation](https://img.shields.io/badge/docs-live-blue.svg?logo=react)](https://sarthak03dot.github.io/backend-doctor)

**The absolute ultimate startup diagnostic tool for Node.js backends.**

👉 **[View Live Documentation](https://sarthak03dot.github.io/backend-doctor)**

Catch environment mismatches, bad CORS setups, silent database timeouts, DNS resolution failures, out-of-disk-space errors, and lockfile conflicts *before* they consume hours of your debugging time in production.

## Why use this?
Every day, developers lose hours debugging why a backend that "worked locally" is failing on Render, Railway, or AWS. **Backend Doctor acts as your automated, omnipresent DevOps assistant.** It runs a massive battery of health checks when your app starts and prints beautiful, actionable errors in the terminal if absolutely anything is misconfigured.

## Installation

```bash
npm install @sarthak03dot/backend-doctor
```

## Quick Start

### 1. Zero-Code CLI
You can run a battery of ecosystem, filesystem, and dependency checks without writing any code:
```bash
npx @sarthak03dot/backend-doctor
```

### 2. Programmatic Usage
Import and run the diagnostics *before* you start your Express/Fastify server to check everything:

```typescript
import express from 'express';
import { runDiagnostics, slowQueryProfiler, api, rateLimiter } from '@sarthak03dot/backend-doctor';

async function bootstrap() {
  // 1. Run the ultimate diagnostics
  await runDiagnostics({
    port: 4000,
    databaseUri: process.env.DATABASE_URL,
    redisUri: process.env.REDIS_URL,
    // Provide SMTP credentials to test mail server connectivity
    smtp: { 
      host: 'smtp.sendgrid.net', 
      port: 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    },
    uploadDirs: ['./uploads', '/tmp'],
    requiredEnvVars: ['DATABASE_URL', 'JWT_SECRET'],
    corsOptions: { origin: '*', credentials: false },
    security: { jwtSecret: process.env.JWT_SECRET, checkAwsKeys: true },
    onShutdown: async () => {
       console.log('Closing DB connection securely...');
    }
  });

  const app = express();
  
  // 2. Attach Middlewares
  app.use(slowQueryProfiler(500)); // Warns if any route takes > 500ms
  app.use('/auth', rateLimiter({ maxRequests: 5 })); // Protect login routes from brute force

  // 3. Standardize your API responses
  app.get('/users', (req, res) => {
    res.json(api.success([{ id: 1 }], 'Fetched users'));
  });

  app.listen(4000, () => console.log('Server started!'));
}

bootstrap();
```

## Detailed Usage

### 1. `runDiagnostics(options)`
This is the core of the library. Call this asynchronously before starting your server.

**Options:**
- `requiredEnvVars` *(string[])*: Fails if any of these environment variables are missing.
- `corsOptions` *(object)*: Checks for dangerous CORS configurations (e.g., `origin: '*'` with `credentials: true`).
- `port` *(number)*: Checks if the port is already in use before your server attempts to bind to it.
- `databaseUri` *(string)*: Pings the database via TCP to ensure it's reachable.
- `redisUri` *(string)*: Pings the Redis server via TCP.
- `smtp` *(object)*: Checks if your mail server is reachable and active. Supports `host`, `port`, and `auth` (user, pass).
- `uploadDirs` *(string[])*: Ensures required directories exist and have Read/Write permissions.
- `security` *(object)*: Validates security setups (e.g., strong JWT secrets, AWS key presence).
- `memory` *(object)*: Validates V8 heap usage and alerts if it exceeds a threshold. Example: `{ maxHeapUsageThresholdMb: 1024 }`
- `cpu` *(object)*: Validates system load average. Example: `{ maxLoadThreshold: 0.8 }`
- `checkDependencies` *(boolean)*: Checks for deprecated dependencies in `package.json`.
- `enableUptimeDoctor` *(boolean)*: Logs current uptime on start.
- `enableCrashDoctor` *(boolean)*: Intercepts unhandled promise rejections and formats them cleanly (enabled by default).
- `onShutdown` *(function)*: Callback for graceful shutdown when `SIGINT` or `SIGTERM` signals are received.

### 2. Standardized API Responses (`api`)
Stop reinventing the JSON response format in every project. Use the `api` utility to enforce a strict, predictable response structure.

```typescript
import { api } from '@sarthak03dot/backend-doctor';

// Success Response
res.json(api.success({ id: 123 }, 'User created successfully'));
// Output: { success: true, message: 'User created successfully', data: { id: 123 } }

// Error Response
res.json(api.error('Validation failed', { code: 400, field: 'email' }));
// Output: { success: false, message: 'Validation failed', error: { code: 400, field: 'email' } }
```

### 3. Middlewares

**Slow Query Profiler:**
Logs a warning in the console if a request takes longer than the specified threshold.
```typescript
import { slowQueryProfiler } from '@sarthak03dot/backend-doctor';
app.use(slowQueryProfiler(500)); // Threshold in milliseconds
```

**Rate Limiter:**
A simple, in-memory rate limiter to protect your endpoints from brute force attacks.
```typescript
import { rateLimiter } from '@sarthak03dot/backend-doctor';
// Allow maximum 5 requests per minute per IP
app.use('/login', rateLimiter({ maxRequests: 5, windowMs: 60000 }));
```

**Uptime & Healthcheck:**
Instantly add a `/health` endpoint that returns your app's uptime.
```typescript
import { uptimeDoctorMiddleware } from '@sarthak03dot/backend-doctor';
app.use(uptimeDoctorMiddleware);
```

**API Logger:**
Logs every incoming request with IP, country, OS, browser, method, URL, status code, and response time.
```typescript
import { apiLogger } from '@sarthak03dot/backend-doctor';
app.use(apiLogger());
```

## What it Checks (The Universe)

- **DNS & Network:** Checks if your host can resolve external domains (DNS failures kill Stripe/AWS APIs).
- **Disk Space:** Warns if your server is at 99% capacity to prevent random 500 errors.
- **Lockfile Conflicts:** Prevents CI/CD failures by warning if both `yarn.lock` and `package-lock.json` exist.
- **SMTP/Email:** Pings your mail server to ensure OTPs and welcome emails won't fail silently.
- **File System:** Ensures your upload folders actually exist and have Read/Write permissions.
- **Ecosystem:** Validates Node 18+ and UTC timezone.
- **Port Conflicts:** Checks if `PORT` is already in use (`EADDRINUSE`).
- **Database/Redis:** Pings via TCP sockets to ensure the host is reachable before your ORM hangs.
- **Security:** Ensures `JWT_SECRET` is strong and AWS keys exist.
- **CORS:** Flags fatal anti-patterns (e.g. `origin: '*'` with `credentials: true`).
- **Memory & CPU:** Warns if V8 heap usage is alarmingly high or if CPU load is excessive.
- **Dependencies:** Validates `package.json` for notoriously old or deprecated dependencies.
- **Crash Doctor:** Intercepts ugly `UnhandledPromiseRejections` and formats them cleanly.

## Contributing

We love contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started with setting up the project, running tests, and submitting your Pull Request.

