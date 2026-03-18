import React from 'react';

interface StatusPillProps {
    label: string;
    showPulse?: boolean;
}

export default function StatusPill({ label, showPulse = false }: StatusPillProps) {
    return (
        <div
            className="inline-flex items-center"
            style={{
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            {showPulse && (
                <div className="relative flex h-[7px] w-[7px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-500"></span>
                </div>
            )}
            <span
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#0A0A0F',
                }}
            >
                {label}
            </span>
        </div>
    );
}
