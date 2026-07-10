import React from 'react';
import CodeBlock from '../components/CodeBlock';
import PackageManager from '../components/PackageManager';
import Pagination from '../components/Pagination';
import { useScrollSpy } from '../hooks/useScrollSpy';

const GettingStarted: React.FC = () => {
  const activeId = useScrollSpy(['why', 'installation', 'usage', 'next']);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
    <div className="animate-fade-in" style={{ flex: 1, maxWidth: '800px', minWidth: 0 }}>
      <h1>Getting Started</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        A complete, idiot-proof guide to getting <code>backend-doctor</code> running in your Node.js application in under 2 minutes.
      </p>

      <h2 id="why" style={{ scrollMarginTop: '80px' }}>1. Why do I need this? (The Pre-Flight Check)</h2>
      <p>
        Imagine a pilot trying to fly an airplane without checking if the engines work first. If an engine is broken, they'll only find out <em>while crashing</em> in the air. 
      </p>
      <p>
        Your backend server is the same way. If you start your server, but your database is unreachable, your API keys are missing, or your email service is down, your app will crash or silently fail in production. 
      </p>
      <div className="alert">
        <p><strong>backend-doctor is your automated pre-flight check.</strong> It runs a series of tests <em>before</em> your server actually starts. If anything is broken, it stops the server immediately and tells you exactly what is wrong, saving you hours of confusing debugging.</p>
      </div>

      <h2 id="installation" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>2. Installation</h2>
      <p>Install the package using your favorite package manager:</p>
      <PackageManager />

      <h2 id="usage" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>3. How to Use (Step-by-Step)</h2>
      
      <h3>Option 1: Zero-Code CLI</h3>
      <p>Want to check your environment without modifying code? Just run:</p>
      <CodeBlock code={`npx backend-doctor`} />

      <h3>Option 2: Programmatic Integration</h3>
      <p>
        To permanently protect your server, you only need to do <strong>two things</strong> in your main server file (usually <code>index.js</code> or <code>server.ts</code>).
      </p>

      <h4>Step A: Import it</h4>
      <p>First, import the <code>runDiagnostics</code> function at the top of your file.</p>
      <CodeBlock code={`import { runDiagnostics } from 'backend-doctor';`} />

      <h3>Step B: Run it before your server starts</h3>
      <p>
        Call the diagnostic check <strong>before</strong> you call <code>app.listen()</code>. Below is a comprehensive, production-ready setup that utilizes all the advanced features of Backend Doctor.
      </p>
      <CodeBlock code={`import express from 'express';
import { runDiagnostics, slowQueryProfiler, rateLimiter, uptimeDoctorMiddleware } from 'backend-doctor';

async function startServer() {
  // 1. Run the pre-flight checks FIRST
  await runDiagnostics({
    port: 4000,
    databaseUri: process.env.DATABASE_URL,
    redisUri: process.env.REDIS_URL,
    requiredEnvVars: ['DATABASE_URL', 'JWT_SECRET', 'AWS_ACCESS_KEY_ID'],
    security: {
      jwtSecret: process.env.JWT_SECRET,
      checkAwsKeys: true,
      helmet: true
    },
    uploadDirs: ['./uploads', '/tmp/processing'],
    enableCrashDoctor: true,
    enableUptimeDoctor: true,
    checkDependencies: true,
    memory: { maxHeapUsageThresholdMb: 1024 },
    cpu: { maxLoadThreshold: 0.8 },
    onShutdown: async () => {
      console.log('Cleaning up connections...');
      // await db.disconnect();
    }
  });

  // 2. Only if the checks pass, start the actual server
  const app = express();
  
  // 3. Mount Backend Doctor middlewares
  app.use(uptimeDoctorMiddleware); // Instantly adds a /health endpoint
  app.use(slowQueryProfiler(500)); // Warn if requests take > 500ms
  app.use('/api', rateLimiter({ maxRequests: 100, windowMs: 60000 }));

  app.get('/', (req, res) => res.send('Server is healthy!'));

  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
}

// Start everything
startServer();`} />

      <h2 id="next" style={{ marginTop: '3rem', scrollMarginTop: '80px' }}>What happens next?</h2>
      <p>
        When you run your server, backend-doctor will print a beautiful, color-coded checklist in your terminal. If everything is green, your server starts. If something is red, it halts and explains the problem!
      </p>

      <Pagination 
        prev={{ title: 'Introduction', path: '/' }} 
        next={{ title: 'Core Diagnostics', path: '/diagnostics' }} 
      />
    </div>
    {/* Right Sidebar - On This Page */}
    <div className="toc-sidebar" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px' }}>
      <h5 style={{ textTransform: 'uppercase', color: 'var(--text-primary)', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>On this page</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <li><a href="#why" className={`toc-link ${activeId === 'why' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>1. Why do I need this?</a></li>
        <li><a href="#installation" className={`toc-link ${activeId === 'installation' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>2. Installation</a></li>
        <li><a href="#usage" className={`toc-link ${activeId === 'usage' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>3. How to Use</a></li>
        <li><a href="#next" className={`toc-link ${activeId === 'next' ? 'active' : ''}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}>What happens next?</a></li>
      </ul>
    </div>
    </div>
  );
};

export default GettingStarted;
