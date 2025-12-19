'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      {/* Hero Section */}
      <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '100px',
          marginBottom: '2rem',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          ✨ THE FUTURE OF HOSPITALITY
        </div>

        <h1 className="text-gradient" style={{
          fontSize: '4.5rem',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          fontWeight: 700
        }}>
          Seamless Check-In <br />
          For Modern Guests
        </h1>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.25rem',
          marginBottom: '3rem',
          maxWidth: '600px',
          marginInline: 'auto'
        }}>
          Skip the reception queues. Verify your identity in seconds using DigiLocker and start your stay instantly.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/verify">
            <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Check In Now
            </button>
          </Link>
        </div>
      </div>

      {/* Reception QR Concept - Educational */}
      <div className="animate-fade-in" style={{
        marginTop: '6rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            width: '48px',
            height: '48px',
            background: 'var(--primary-glow)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            📱
          </div>
          <h3 className="text-gradient">Scan & Go</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            Simply scan the QR code at the reception desk to begin your digital identity verification.
          </p>
        </div>

        <div className="glass-card" style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            width: '48px',
            height: '48px',
            background: 'var(--primary-glow)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🛡️
          </div>
          <h3 className="text-gradient">Secure Verification</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            We use Government-backed DigiLocker to securely verify your Aadhaar details in one click.
          </p>
        </div>

        <div className="glass-card" style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            width: '48px',
            height: '48px',
            background: 'var(--primary-glow)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🛎️
          </div>
          <h3 className="text-gradient">Instant Access</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            The hotel staff receives your verification instantly, and you're ready to get your keys.
          </p>
        </div>
      </div>

      <footer style={{ marginTop: '6rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        <p>Are you a hotel owner? <Link href="/onboard" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register your property here</Link></p>
      </footer>
    </main>
  );
}
