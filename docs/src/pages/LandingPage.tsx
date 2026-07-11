import React, { useRef } from 'react';
import { ShieldAlert, Server, Mail, HardDrive, Database, Globe } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import AutoTypingTerminal from '../components/AutoTypingTerminal';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Pagination from '../components/Pagination';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.gsap-hero-title',
      { y: 30, opacity: 0, filter: 'blur(12px)', scale: 0.98 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2 }
    )
    .fromTo('.gsap-hero-p',
      { y: 20, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
      "-=0.8"
    )
    .fromTo('.gsap-hero-btn',
      { y: 20, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15 },
      "-=0.8"
    )
    .fromTo('.gsap-hero-terminal',
      { y: 40, opacity: 0, scale: 0.95, filter: 'blur(15px)' },
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' },
      "-=0.6"
    );

    // Feature Cards Scroll Animation
    gsap.fromTo('.gsap-feature-card',
      { y: 60, opacity: 0, filter: 'blur(10px)', scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.gsap-feature-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate orbs slightly in and then continuously float
    gsap.fromTo('.glow-orb-1',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, ease: 'power2.out', onComplete: () => {
        gsap.to('.glow-orb-1', { y: -30, x: 20, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }}
    );
    gsap.fromTo('.glow-orb-2',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, delay: 0.5, ease: 'power2.out', onComplete: () => {
        gsap.to('.glow-orb-2', { y: 40, x: -30, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }}
    );

  }, { scope: container });

  return (
    <div ref={container} className="landing-container">
      <div className="hero-wrapper" style={{ position: 'relative' }}>
        {/* Animated Background Elements */}
        <div className="cyber-grid-wrapper">
          <div className="cyber-grid" />
        </div>
        <div className="glow-orb-1" style={{ opacity: 0 }} />
        <div className="glow-orb-2" style={{ opacity: 0 }} />
        
        <section className="hero" style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="gsap-hero-title" style={{ margin: '0 auto 1.5rem auto', opacity: 0 }}>
            The ultimate <span className="text-gradient">startup diagnostic tool</span> for Node.js backends.
          </h1>
        <p className="gsap-hero-p" style={{ opacity: 0 }}>
          Catch environment mismatches, bad CORS setups, silent database timeouts, DNS resolution failures, out-of-disk-space errors, and lockfile conflicts <b>before</b> they consume hours of your debugging time in production.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <Link to="/getting-started" className="button-primary gsap-hero-btn" style={{ opacity: 0 }}>
            Get Started
          </Link>
          <a href="https://github.com/sarthak03dot/backend-doctor" target="_blank" rel="noreferrer" className="button-primary gsap-hero-btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', opacity: 0 }}>
            View GitHub
          </a>
        </div>

        <div className="gsap-hero-terminal" style={{ opacity: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="terminal-glow-container">
            <AutoTypingTerminal />
          </div>
        </div>
      </section>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What it Checks (The Universe)</h2>
        <div className="feature-grid gsap-feature-grid">
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="DNS & Network" 
              description="Checks if your host can resolve external domains. DNS failures kill Stripe/AWS APIs." 
              Icon={Globe} 
              color="#3b82f6" 
            />
          </div>
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="Database/Redis" 
              description="Pings via TCP sockets to ensure the host is reachable before your ORM hangs." 
              Icon={Database} 
              color="#10b981" 
            />
          </div>
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="SMTP/Email" 
              description="Pings your mail server to ensure OTPs and welcome emails won't fail silently." 
              Icon={Mail} 
              color="#f59e0b" 
            />
          </div>
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="Security & CORS" 
              description="Ensures JWT_SECRET is strong, AWS keys exist, and flags fatal anti-patterns like origin: '*' with credentials." 
              Icon={ShieldAlert} 
              color="#ef4444" 
            />
          </div>
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="Disk, CPU & Memory" 
              description="Warns if your server is at 99% capacity, CPU load is excessive, or available memory is dangerously low." 
              Icon={HardDrive} 
              color="#8b5cf6" 
            />
          </div>
          <div className="gsap-feature-card" style={{ opacity: 0 }}>
            <FeatureCard 
              title="Crash Doctor" 
              description="Intercepts ugly UnhandledPromiseRejections and formats them cleanly." 
              Icon={Server} 
              color="#ec4899" 
            />
          </div>
        </div>
      </section>
      
      <Pagination next={{ title: 'Getting Started', path: '/getting-started' }} />
    </div>
  );
};

export default LandingPage;
