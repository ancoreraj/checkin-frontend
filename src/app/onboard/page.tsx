'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerOrganization } from '@/lib/api';

export default function OnboardPage() {
    const [name, setName] = useState('');
    const [emails, setEmails] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
            const data = await registerOrganization(name, emailList);

            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.message || 'Failed to register');
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
            padding: 'clamp(1rem, 5vw, 2rem)'
        }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                <Link href="/" style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '1.5rem'
                }}>
                    ← Back Home
                </Link>

                <h2 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    Onboard Your Hotel
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Get started by registering your company. We'll generate a unique ID for your digital reception.
                </p>

                {!result ? (
                    <div className="glass-card" style={{ padding: 'clamp(1.25rem, 5vw, 2.5rem)' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label className="input-label">Organization Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Grand Vista Hotel"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Admin Emails</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="manager@hotel.com, frontdesk@hotel.com"
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                    required
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                                    Comma separated. These IDs receive verification reports.
                                </span>
                            </div>

                            {error && (
                                <div style={{
                                    padding: '12px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '10px',
                                    color: 'var(--error)',
                                    fontSize: '0.85rem',
                                    marginBottom: '20px'
                                }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '10px', padding: '16px' }}
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register Organization'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: 'clamp(1.5rem, 5vw, 3rem)' }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>✅</div>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Registration Successful</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                            Your organization has been registered. Save your <strong>Organization ID</strong> for API calls.
                        </p>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '24px 16px',
                            borderRadius: '16px',
                            border: '1px dashed var(--border-glass)',
                            marginBottom: '2.5rem'
                        }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Your Organization ID:
                            </p>
                            <code style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--accent)', wordBreak: 'break-all', fontWeight: 700 }}>
                                {result.nameId}
                            </code>
                        </div>

                        <Link href={`/verify/${result.nameId}`}>
                            <button className="btn-primary" style={{ width: '100%', padding: '16px' }}>
                                View Hotel Portal
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
