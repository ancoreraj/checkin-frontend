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
            padding: '2rem'
        }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                {loading ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
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
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <h3>Organization Not Found</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                        <Link href="/onboard">
                            <button className="btn-primary" style={{ width: '100%' }}>Register Organization</button>
                        </Link>
                    </div>
                ) : (
                    <div className="glass-card animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                margin: '0 auto 1.5rem auto',
                                boxShadow: 'var(--shadow-glow)'
                            }}>
                                🏨
                            </div>
                            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                {organization.name}
                            </h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 500 }}>
                                Luxury Digital Reception
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(150, 150, 150, 0.03)',
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1px solid var(--border-glass)',
                            marginBottom: '2rem',
                            color: 'var(--text-muted)'
                        }}>
                            <p style={{ fontSize: '0.95rem', textAlign: 'center', lineHeight: '1.5' }}>
                                Welcome! To ensure a seamless stay, please verify your identity securely via <strong>Aadhaar</strong>.
                                <br /> This takes less than 60 seconds.
                            </p>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', padding: '18px', fontSize: '1.2rem', borderRadius: '14px' }}
                            onClick={() => setShowModal(true)}
                            disabled={verifying}
                        >
                            {verifying ? 'Preparing your stay...' : 'Check In Now'}
                        </button>

                        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                            SECURE GUEST AUTHENTICATION 🛡️
                        </p>
                    </div>
                )}
            </div>

            {/* Premium Education Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div className="glass-card animate-fade-in" style={{ maxWidth: '450px', border: '1px solid var(--border-glass)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛎️</div>
                            <h3>Digital Verification</h3>
                        </div>

                        <div style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', textAlign: 'center', lineHeight: '1.6' }}>
                            You are being redirected to <strong>DigiLocker</strong>, the official Government of India portal.
                            <br /><br />
                            Your <strong>Aadhaar</strong> details will be shared securely with <strong>{organization.name}</strong> to complete your check-in instantly.
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: 1, background: 'rgba(150, 150, 150, 0.05)', border: '1px solid var(--border-glass)' }}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-primary"
                                style={{ flex: 2 }}
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
