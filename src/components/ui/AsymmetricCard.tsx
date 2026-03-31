import React from 'react';

interface AsymmetricCardProps {
    children: React.ReactNode;
    className?: string;
    accentColor?: string;
    onClick?: () => void;
}

export default function AsymmetricCard({ children, className = '', accentColor = 'var(--brand-primary)', onClick }: AsymmetricCardProps) {
    return (
        <div
            onClick={onClick}
            className={`relative group bg-white overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
            style={{
                borderRadius: '0px 24px 0px 24px', // Asymmetric: Top-Left 0, Top-Right 24, Bottom-Right 0, Bottom-Left 24
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                transition: 'all 300ms ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Accent Edge Line */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-300"
                style={{ backgroundColor: accentColor, opacity: 0.8 }}
            />
            {children}
        </div>
    );
}
