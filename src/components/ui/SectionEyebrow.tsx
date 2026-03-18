import React from 'react';

interface SectionEyebrowProps {
    label: string;
    accentColor?: string;
}

export default function SectionEyebrow({ label, accentColor = 'var(--brand-primary)' }: SectionEyebrowProps) {
    return (
        <div
            className="flex items-center gap-[10px] mb-4 uppercase tracking-[0.14em]"
            style={{
                fontSize: '11px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                color: 'var(--text-muted)'
            }}
        >
            <span
                style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: accentColor,
                }}
            />
            {label}
        </div>
    );
}
