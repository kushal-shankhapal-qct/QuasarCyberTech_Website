import React from 'react';
import { COLORS, BRAND_CONTROLS } from '../../config/themeConfig';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export default function Button({ variant = 'primary', children, icon, className = '', style, ...props }: ButtonProps) {
    const baseClasses = "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-semibold text-[15px] transition-all duration-300 cursor-pointer w-fit active:scale-[0.98]";

    // ── PRIMARY: Gold Outline ──
    const primaryStyle = {
        backgroundColor: BRAND_CONTROLS.heroPrimaryBg,
        color: BRAND_CONTROLS.heroPrimaryText,
        border: `1.5px solid ${BRAND_CONTROLS.heroPrimaryBorder}`,
        boxShadow: 'none',
        ...style
    };

    // ── SECONDARY: Solid Burgundy ──
    const secondaryStyle = {
        backgroundColor: BRAND_CONTROLS.heroSecondaryBg,
        color: BRAND_CONTROLS.heroSecondaryText,
        border: 'none',
        boxShadow: '0 4px 12px rgba(107, 21, 48, 0.25)',
        ...style
    };

    // ── GHOST: Text only ──
    const ghostStyle = {
        backgroundColor: 'transparent',
        color: 'rgba(255,255,255,0.7)',
        border: 'none',
        ...style
    };

    const variantClassMap: Record<string, string> = {
        primary: 'hover:opacity-90 hover:-translate-y-[2px]',
        secondary: 'hover:opacity-90 hover:-translate-y-[2px]',
        ghost: 'hover:bg-white/10 hover:text-white',
    };

    const resolvedStyle = variant === 'primary' ? primaryStyle : variant === 'secondary' ? secondaryStyle : ghostStyle;

    return (
        <button
            className={`group ${baseClasses} ${variantClassMap[variant] ?? ''} ${className}`}
            style={resolvedStyle}
            {...(props as any)}
        >
            {children}
            {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
        </button>
    );
}
