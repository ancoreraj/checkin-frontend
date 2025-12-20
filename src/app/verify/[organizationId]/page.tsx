'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getOrganizationDetails, initiateKYC } from '@/lib/api';

export default function DirectVerifyPage() {
    const params = useParams();
    const { organizationId } = params;

    const [organization, setOrganization] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrg = async () => {
            if (typeof organizationId !== 'string') return;
            try {
                const data = await getOrganizationDetails(organizationId);
                if (data.success) {
                    setOrganization(data.data);
                } else {
                    setError('Organization not found');
                }
            } catch (err) {
                setError('Failed to load organization details');
            } finally {
                setLoading(false);
            }
        };

        if (organizationId) {
            fetchOrg();
        }
    }, [organizationId]);

    const handleStartKYC = async () => {
        setShowModal(false);
        setVerifying(true);
        setError('');

        try {
            const data = await initiateKYC(organizationId as string);
            if (data.success) {
                const redirectUrl = data.data.decentroKycResponse.data.url;
                window.location.href = redirectUrl;
            } else {
                setError(data.message || 'Failed to initiate KYC');
                setVerifying(false);
            }
        } catch (err) {
            setError('Connection to backend failed.');
            setVerifying(false);
        }
    };

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: 'clamp(1rem, 5vw, 2rem)'
        }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                {loading ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid rgba(255,255,255,0.1)',
                            borderTopColor: 'var(--primary)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto'
                        }}></div>
                    </div>
                ) : error ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚠️</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Hotel Not Found</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>{error}</p>
                        <Link href="/">
                            <button className="btn-primary" style={{ width: '100%' }}>Back to Home</button>
                        </Link>
                    </div>
                ) : (
                    <div className="glass-card animate-fade-in" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '0.5rem' }}>
                            <div style={{
                                width: ' clamp(60px, 15vw, 80px)',
                                height: 'clamp(60px, 15vw, 80px)',
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                                borderRadius: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                                margin: '0 auto 1.5rem auto',
                                boxShadow: 'var(--shadow-glow)'
                            }}>
                                🏨
                            </div>
                            <h2 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                                {organization.name}
                            </h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Digital Reception
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(150, 150, 150, 0.03)',
                            padding: 'clamp(1rem, 4vw, 1.5rem)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-glass)',
                            marginBottom: '2rem',
                            color: 'var(--text-muted)'
                        }}>
                            <p style={{ fontSize: '0.95rem', textAlign: 'center', lineHeight: '1.6' }}>
                                Welcome! Please verify your identity securely via <strong>Aadhaar</strong> to complete your check-in.
                            </p>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '14px' }}
                            onClick={() => setShowModal(true)}
                            disabled={verifying}
                        >
                            {verifying ? 'Preparing stay...' : 'Check In Now'}
                        </button>

                        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>
                            SECURE GUEST AUTHENTICATION 🛡️
                        </p>
                    </div>
                )}
            </div>

            {/* Premium Redirection Modal */}
            {showModal && (
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
                        boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛎️</div>
                            <h3 style={{ fontSize: '1.5rem' }}>Digital Verification</h3>
                        </div>

                        <div style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.95rem',
                            marginBottom: '2.5rem',
                            textAlign: 'center',
                            lineHeight: '1.6'
                        }}>
                            You are being redirected to <strong>DigiLocker</strong>, the official Government of India portal.
                            <br /><br />
                            Aadhaar details will be shared securely with <strong>{organization.name}</strong> to finalize your check-in.
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: '14px' }}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-primary"
                                style={{ flex: 2, padding: '14px' }}
                                onClick={handleStartKYC}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}
