'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  return (
    <main style={{
      width: '100%',
      overflowX: 'hidden',
      paddingBottom: '6rem'
    }}>
      {/* Modal for Onboarding Info */}
      {showOnboardModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 7, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-card animate-fade-in" style={{
            maxWidth: '440px',
            width: '100%',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            border: '1px solid var(--border-glass)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📧</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="text-gradient">Contact Us</h3>

            <div style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              marginBottom: '2.5rem',
              lineHeight: '1.6'
            }}>
              Please contact us at <strong style={{ color: 'var(--accent)' }}>hello@easyhotelcheckin.com</strong> for hotel onboardation.
              <br /><br />
              Seamless onboardation will be live soon! We appreciate your patience.
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={() => setShowOnboardModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 60%)'
      }}>
        <div className="animate-fade-in" style={{ maxWidth: '900px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(34, 211, 238, 0.1)',
            borderRadius: '100px',
            marginBottom: '2rem',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            color: 'var(--accent)',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}>
            VERIFIED. PAPERLESS. INSTANT.
          </div>

          <h1 className="text-gradient" style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: '1',
            marginBottom: '1.5rem',
            fontWeight: 800
          }}>
            EasyHotelCheckIn
          </h1>

          <p style={{
            color: 'var(--text-main)',
            fontSize: 'clamp(1.25rem, 3vw, 1.8rem)',
            fontWeight: 500,
            marginBottom: '1.5rem',
            opacity: 0.9
          }}>
            Digital Reception Reimagined.
          </p>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.25rem',
            marginBottom: '3rem',
            maxWidth: '650px',
            marginInline: 'auto',
            lineHeight: '1.6'
          }}>
            Complete guest check-in in <strong>under 60 seconds</strong> — without photocopies, queues, or manual errors.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/verify">
              <button className="btn-primary" style={{ padding: '16px 48px', fontSize: '1.1rem' }}>
                Start Checking In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Page 2: The Problem */}
      <section style={{ padding: 'clamp(3rem, 10vw, 6rem) 1rem', background: 'rgba(10, 15, 24, 0.4)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem' }} className="text-gradient">The Problem <br /> Hotels Face Today</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
            Traditional check-ins are slow, manual, and high-risk. During peak hours, paperwork takes precedence over hospitality.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            <ProblemCard text="Aadhaar and ID photocopies piling up" />
            <ProblemCard text="Risk of fake or unverifiable IDs" />
            <ProblemCard text="Manual data entry and storage errors" />
            <ProblemCard text="Compliance and audit anxiety" />
          </div>
        </div>
      </section>

      {/* Page 3: The Solution / How it works */}
      <section style={{ padding: 'clamp(4rem, 12vw, 8rem) 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>How It <span className="text-gradient">Works</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Secure, government-backed digital verification in 4 simple steps.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem'
          }}>
            <StepCard number="1" title="Scan QR Code" desc="Guest scans a QR at your reception desk using any phone." />
            <StepCard number="2" title="Verify Identity" desc="A branded check-in page opens instantly. Fast & simple." />
            <StepCard number="3" title="DigiLocker Flow" desc="Verify Aadhaar via DigiLocker in a few taps." />
            <StepCard number="4" title="Instant Record" desc="Hotel receives verified details & photo automatically." />
          </div>
        </div>
      </section>

      {/* Page 4: Trust & CTA */}
      <section style={{ padding: 'clamp(3rem, 10vw, 6rem) 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', borderRadius: 'clamp(20px, 5vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem' }}>Built for <span className="text-gradient">Trust</span></h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(1rem, 5vw, 3rem)',
              marginBottom: '3rem'
            }}>
              <TrustPoint text="No photocopies required" />
              <TrustPoint text="No data stored locally" />
              <TrustPoint text="Traceable & Audit-ready" />
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              borderRadius: '24px',
              border: '1px solid var(--border-glass)'
            }}>
              <h3 style={{ marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>Get Started with a Free Pilot</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Experience faster check-ins and smoother operations with no-obligation.</p>
              <button
                className="btn-primary"
                style={{ width: '100%', maxWidth: '300px' }}
                onClick={() => setShowOnboardModal(true)}
              >
                Register Your Hotel
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: 'clamp(2rem, 8vw, 4rem) 1rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} EasyHotelCheckIn | Digital Reception Reimagined</p>
      </footer>
    </main>
  );
}

function ProblemCard({ text }: { text: string }) {
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.05)',
      border: '1px dashed rgba(239, 68, 68, 0.2)',
      padding: '1.25rem 1.5rem',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#ef4444',
      fontSize: '0.95rem',
      fontWeight: 500
    }}>
      <span style={{ fontSize: '1.2rem' }}>✕</span>
      {text}
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        width: '44px',
        height: '44px',
        background: 'var(--primary)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-glow)'
      }}>
        {number}
      </div>
      <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h4>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );
}

function TrustPoint({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
      <span style={{ fontSize: '1.2rem' }}>✓</span>
      <span style={{ color: 'var(--text-main)' }}>{text}</span>
    </div>
  );
}
