'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-card)',
                backdropFilter: 'var(--glass-blur)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2000,
                transition: 'var(--transition-smooth)',
                fontSize: '1.2rem',
                boxShadow: 'var(--card-shadow)',
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
