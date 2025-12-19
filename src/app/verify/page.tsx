'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initiateKYC } from '@/lib/api';

export default function VerifyPage() {
    const [orgId, setOrgId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleStartKYC = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await initiateKYC(orgId);
            console.log(data, ' Initiate Response ');

            if (data.success) {
                // Redirect the user to the Decentro UI Stream URL
                const redirectUrl = data.data.decentroKycResponse.data.url;
                window.location.href = redirectUrl;
            } else {
                setError(data.message || 'Failed to initiate KYC');
            }
        } catch (err) {
            setError('Connection to backend failed. Make sure server is running.');
        } finally {
            setLoading(false);
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
                <Link href="/" style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '2rem'
                }}>
                    ← Back to Dashboard
                </Link>

                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Start Verification
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                    Enter your Hotel ID to start a new check-in session for your customer.
                </p>

                <div className="glass-card">
                    <form onSubmit={handleStartKYC}>
                        <div className="input-group">
                            <label className="input-label">Hotel ID (nameId)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. 1234-abcd_acme_corp"
                                value={orgId}
                                onChange={(e) => setOrgId(e.target.value)}
                                required
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                                Don't have an ID? <Link href="/onboard" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Create one here</Link>.
                            </span>
                        </div>

                        {error && (
                            <div style={{
                                padding: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '10px',
                                color: 'var(--error)',
                                fontSize: '0.9rem',
                                marginBottom: '20px'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                            disabled={loading}
                        >
                            {loading ? 'Initiating...' : (
                                <>
                                    Start Identity Check <span>→</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        Trusted by organizations for secure Aadhaar verification.
                    </p>
                </div>
            </div>
        </main>
    );
}
