'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCheckInStatus } from '@/lib/api';

enum CheckInStatus {
    INITIATED = 'INITIATED',
    SESSION_STARTED = 'SESSION_STARTED',
    SESSION_COMPLETED = 'SESSION_COMPLETED',
    SESSION_FAILED = 'SESSION_FAILED',
    EMAIL_SENT = 'EMAIL_SENT',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export default function StatusPage() {
    const params = useParams();
    const { checkInId } = params;

    const [statusData, setStatusData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isTimedOut, setIsTimedOut] = useState(false);
    const pollInterval = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchStatus = async () => {
        try {
            if (typeof checkInId !== 'string') return;
            const data = await getCheckInStatus(checkInId);

            if (data.success) {
                setStatusData(data.data);

                // Stop polling if we reached a terminal state
                const terminalStates = [
                    CheckInStatus.SESSION_COMPLETED,
                    CheckInStatus.EMAIL_SENT,
                    CheckInStatus.COMPLETED,
                    CheckInStatus.SESSION_FAILED,
                    CheckInStatus.FAILED
                ];

                if (terminalStates.includes(data.data.status)) {
                    stopPolling();
                }
            } else {
                setError(data.message || 'Failed to fetch status');
            }
        } catch (err) {
            console.error('Polling error:', err);
        } finally {
            setLoading(false);
        }
    };

    const stopPolling = () => {
        if (pollInterval.current) {
            clearInterval(pollInterval.current);
            pollInterval.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    useEffect(() => {
        if (checkInId) {
            fetchStatus();
            // Start polling every 3 seconds
            pollInterval.current = setInterval(fetchStatus, 3000);

            // Global timeout after 60 seconds
            timeoutRef.current = setTimeout(() => {
                if (pollInterval.current) {
                    stopPolling();
                    setIsTimedOut(true);
                }
            }, 60000); // 1 minute
        }

        return () => stopPolling();
    }, [checkInId]);

    const isSuccess = statusData?.status === CheckInStatus.SESSION_COMPLETED ||
        statusData?.status === CheckInStatus.EMAIL_SENT ||
        statusData?.status === CheckInStatus.COMPLETED;

    const isFailure = statusData?.status === CheckInStatus.SESSION_FAILED ||
        statusData?.status === CheckInStatus.FAILED;

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

                {loading && !statusData ? (
                    <div style={{ textAlign: 'center' }}>
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid rgba(255,255,255,0.1)',
                                borderTopColor: 'var(--primary)',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 1.5rem auto'
                            }}></div>
                            <h3>Analyzing Verification...</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Hang tight, we're fetching your status.</p>
                        </div>
                    </div>
                ) : isTimedOut ? (
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
                        <h3>Verification taking longer than usual</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            We haven't received an update yet. This usually happens if the DigiLocker process is still in progress.
                        </p>
                        <button
                            className="btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                                setIsTimedOut(false);
                                setLoading(true);
                                fetchStatus();
                                // Restart polling
                                pollInterval.current = setInterval(fetchStatus, 3000);
                                // Restart timeout
                                timeoutRef.current = setTimeout(() => {
                                    if (pollInterval.current) {
                                        stopPolling();
                                        setIsTimedOut(true);
                                    }
                                }, 60000);
                            }}
                        >
                            Refresh Status
                        </button>
                    </div>
                ) : error ? (
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                        <h3>Something went wrong</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                        <Link href="/">
                            <button className="btn-primary" style={{ width: '100%' }}>Return Home</button>
                        </Link>
                    </div>
                ) : statusData && (
                    <div className="glass-card animate-fade-in" style={{ textAlign: 'center' }}>
                        {/* <div style={{ marginBottom: '2rem' }}>
                            {isSuccess ? (
                                <div style={{ fontSize: '4rem', animation: 'scaleUp 0.5s ease-out' }}>✨</div>
                            ) : isFailure ? (
                                <div style={{ fontSize: '4rem' }}>🛑</div>
                            ) : (
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '4px solid rgba(99, 102, 241, 0.2)',
                                    borderTopColor: 'var(--primary)',
                                    borderRadius: '50%',
                                    animation: 'spin 1.5s linear infinite',
                                    margin: '0 auto'
                                }}></div>
                            )}
                        </div> */}

                        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            {isSuccess ? 'Check-in Complete!' : isFailure ? 'Check-in Failed' : 'Preparing Your Stay...'}
                        </h2>

                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', minHeight: '3em', fontSize: '1.1rem' }}>
                            {statusData.message}
                        </p>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-glass)',
                            marginBottom: '2rem',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Status:</span>
                                <span className={`status-badge ${isSuccess ? 'status-success' : isFailure ? 'status-error' : 'status-pending'}`}>
                                    {statusData.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Reference ID:</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                    {statusData.checkInId.substring(0, 13)}...
                                </span>
                            </div>
                        </div>

                        <Link href="/">
                            <button className="btn-primary" style={{ width: '100%' }}>
                                {isSuccess || isFailure ? 'Back to Home' : 'Cancel & Reset'}
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scaleUp {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </main>
    );
}
