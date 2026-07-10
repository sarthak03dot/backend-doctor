import React from 'react';
import CodeBlock from '../components/CodeBlock';
import Pagination from '../components/Pagination';
import { useScrollSpy } from '../hooks/useScrollSpy';

const ApiReference: React.FC = () => {
  const activeId = useScrollSpy([
    'run-diagnostics', 
    'security-options', 
    'smtp', 
    'cors', 
    'network', 
    'environment', 
    'performance-checks',
    'standalone-modules', 
    'standardized-api', 
    'middlewares',
    'slow-query-profiler',
    'rate-limiter',
    'uptime-doctor',
    'api-logger'
  ]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
    <div className="animate-fade-in" style={{ flex: 1, maxWidth: '800px', minWidth: 0 }}>
      <h1>API Reference</h1>

      <h2 id="run-diagnostics" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}><code>runDiagnostics(options)</code></h2>
      <p>This is the core of the library. Call this asynchronously before starting your server. Below is the complete configuration object.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3 id="security-options" style={{ scrollMarginTop: '80px' }}>Security Options</h3>
        <p>Configures deep security checks, ensuring production-grade safety.</p>
        <CodeBlock code={`import { runDiagnostics } from 'backend-doctor';

await runDiagnostics({
  security: {
    jwtSecret: process.env.JWT_SECRET, // Warns if < 32 characters
    checkAwsKeys: true,                // Fails if AWS keys are missing
    helmet: true                       // Warns if you explicitly disable Helmet checks
  }
});`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="smtp" style={{ scrollMarginTop: '80px' }}>SMTP Mail Server Verification</h3>
        <p>Verifies your mail server credentials by establishing a real, authenticated SMTP TCP connection, guaranteeing that critical OTP and welcome emails will send successfully.</p>
        <CodeBlock code={`await runDiagnostics({
  smtp: {
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
});`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="cors" style={{ scrollMarginTop: '80px' }}>CORS Validation</h3>
        <p>Flags fatal security flaws, such as setting <code>origin: '*'</code> while simultaneously allowing <code>credentials: true</code>.</p>
        <CodeBlock code={`const corsOptions = {
  origin: '*',
  credentials: true
};

await runDiagnostics({
  corsOptions // Will throw a fatal security warning!
});`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="network" style={{ scrollMarginTop: '80px' }}>Network & External Services</h3>
        <p>Verifies Database and Redis connectivity by pinging the raw TCP socket to bypass ORM timeouts.</p>
        <CodeBlock code={`await runDiagnostics({
  port: 3000,                                     // Fails if port is already in use
  databaseUri: process.env.POSTGRES_URI,          // TCP ping to DB
  redisUri: process.env.REDIS_URL                 // TCP ping to Redis
});`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="environment" style={{ scrollMarginTop: '80px' }}>Environment & File System</h3>
        <p>Validates required environment variables and checks directory read/write permissions. Can also check dependencies.</p>
        <CodeBlock code={`await runDiagnostics({
  requiredEnvVars: ['STRIPE_SECRET_KEY', 'NODE_ENV'],
  uploadDirs: ['/tmp/uploads', './public/images'], // Ensures directories exist and are writable
  checkDependencies: true // Warns on deprecated packages
});`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="performance-checks" style={{ scrollMarginTop: '80px' }}>Memory & CPU Thresholds</h3>
        <p>Checks V8 heap usage and system CPU load to warn of potential bottlenecks before accepting traffic.</p>
        <CodeBlock code={`await runDiagnostics({
  memory: {
    maxHeapUsageThresholdMb: 1024 // Warns if usage exceeds 1GB
  },
  cpu: {
    maxLoadThreshold: 0.8 // Warns if load average exceeds 80% per core
  }
});`} />
      </div>

      <h2 id="standalone-modules" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>Standalone Modules</h2>
      <p>If you don't want to run the entire <code>runDiagnostics</code> suite, you can import and use any of the diagnostic modules standalone in your own scripts or health-check endpoints.</p>
      <CodeBlock code={`import { 
  checkDatabase, 
  checkRedis, 
  checkMailServer,
  checkSystem 
} from 'backend-doctor';

// Returns a boolean indicating health
const isDbHealthy = await checkDatabase(process.env.DB_URI);
const isRedisHealthy = await checkRedis(process.env.REDIS_URL);
const isSystemHealthy = checkSystem();`} />

      <h2 id="standardized-api" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>Standardized API Responses (<code>api</code>)</h2>
      <p>Stop reinventing the JSON response format in every project. Use the `api` utility to enforce a strict, predictable response structure.</p>
      <CodeBlock code={`import { api } from 'backend-doctor';

// Success Response
res.json(api.success({ id: 123 }, 'User created successfully'));
// Output: { success: true, message: 'User created successfully', data: { id: 123 } }

// Error Response
res.json(api.error('Validation failed', { code: 400, field: 'email' }));
// Output: { success: false, message: 'Validation failed', error: { code: 400, field: 'email' } }`} />

      <h2 id="middlewares" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>Middlewares</h2>
      
      <div style={{ marginTop: '2rem' }}>
        <h3 id="slow-query-profiler" style={{ scrollMarginTop: '80px' }}>Slow Query Profiler</h3>
        <p>Logs a warning in the console if a request takes longer than the specified threshold.</p>
        <CodeBlock code={`import { slowQueryProfiler } from 'backend-doctor';
// Warns if any route takes > 500ms
app.use(slowQueryProfiler(500));`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="rate-limiter" style={{ scrollMarginTop: '80px' }}>Rate Limiter</h3>
        <p>A simple, in-memory rate limiter to protect your endpoints from brute force attacks.</p>
        <CodeBlock code={`import { rateLimiter } from 'backend-doctor';
// Allow maximum 5 requests per minute per IP
app.use('/login', rateLimiter({ maxRequests: 5, windowMs: 60000 }));`} />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3 id="uptime-doctor" style={{ scrollMarginTop: '80px' }}>Uptime & Healthcheck</h3>
        <p>Instantly attach a <code>/health</code> endpoint to report application uptime and status.</p>
        <CodeBlock code={`import { uptimeDoctorMiddleware } from 'backend-doctor';
// Handles GET /health and returns uptime
app.use(uptimeDoctorMiddleware);`} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 id="api-logger" style={{ scrollMarginTop: '80px' }}>API Logger</h3>
        <p>A powerful middleware that logs every incoming request to the terminal with IP, Country (from Cloud headers), OS, Browser, Status Code, and Response Time.</p>
        <CodeBlock code={`import { apiLogger } from 'backend-doctor';
// Attach it early in your middleware chain
app.use(apiLogger());`} />
      </div>
      <Pagination 
        prev={{ title: 'Health Checks', path: '/diagnostics' }} 
      />
    </div>
    
    {/* Right Sidebar - On This Page */}
    <div className="toc-sidebar" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px' }}>
      <h5 style={{ textTransform: 'uppercase', color: 'var(--text-primary)', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>On this page</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <li><a href="#run-diagnostics" className={`toc-link ${activeId === 'run-diagnostics' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>runDiagnostics</a></li>
        <li><a href="#security-options" className={`toc-link ${activeId === 'security-options' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>Security Options</a></li>
        <li><a href="#smtp" className={`toc-link ${activeId === 'smtp' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>SMTP Mail Server</a></li>
        <li><a href="#cors" className={`toc-link ${activeId === 'cors' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>CORS Validation</a></li>
        <li><a href="#network" className={`toc-link ${activeId === 'network' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>Network & Services</a></li>
        <li><a href="#environment" className={`toc-link ${activeId === 'environment' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>Environment & FS</a></li>
        <li><a href="#performance-checks" className={`toc-link ${activeId === 'performance-checks' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', paddingLeft: '1.8rem', display: 'block', transition: 'all 0.2s' }}>Memory & CPU</a></li>
        <li><a href="#standalone-modules" className={`toc-link ${activeId === 'standalone-modules' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s', marginTop: '0.25rem' }}>Standalone Modules</a></li>
        <li><a href="#standardized-api" className={`toc-link ${activeId === 'standardized-api' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s', marginTop: '0.25rem' }}>Standardized API</a></li>
        <li><a href="#middlewares" className={`toc-link ${activeId === 'middlewares' || activeId === 'slow-query-profiler' || activeId === 'rate-limiter' || activeId === 'uptime-doctor' || activeId === 'api-logger' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s', marginTop: '0.25rem' }}>Middlewares</a></li>
      </ul>
    </div>
    </div>
  );
};

export default ApiReference;
