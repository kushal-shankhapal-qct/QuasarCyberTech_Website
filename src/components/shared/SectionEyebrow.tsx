import React from 'react';
import { themeConfig } from '../../config/themeConfig';

interface SectionEyebrowProps {
    text: string;
    className?: string;
    accentColor?: string;
    noBox?: boolean;
    style?: React.CSSProperties;
}

const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
    text,
    className = "",
    accentColor = themeConfig.global.eyebrowAccentColor,
    noBox = false,
    style = {}
}) => {
    const accentLineStyle = themeConfig.global.eyebrowAccentLine
        ? { background: themeConfig.global.eyebrowAccentLine }
        : { backgroundColor: accentColor };

    const eyebrowFont = themeConfig.global.eyebrowFont || 'var(--font-body)';

    if (noBox) {
        return (
            <div className={`flex items-center gap-[10px] ${className}`}
                style={{
                    fontSize: '11px',
                    fontFamily: eyebrowFont,
                    fontWeight: 600,
                    color: '#1F6FEB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    ...style
                }}
            >
                <span style={{ width: '20px', height: '2px', ...accentLineStyle }} />
                {text}
            </div>
        );
    }

    return (
        <div
            className={`inline-flex items-center px-4 py-1.5 rounded-full border border-black/5 bg-white shadow-sm gap-3 ${className}`}
            style={{
                zIndex: 40,
                ...style
            }}
        >
            <span
                style={{ width: '18px', height: '2px', ...accentLineStyle }}
            />
            <span
                className="text-[10px] font-black tracking-[0.15em] text-[#1F6FEB] uppercase"
                style={{ fontFamily: eyebrowFont }}
            >
                {text}
            </span>
        </div>
    );
};

export default SectionEyebrow;
