import React from 'react';
import { useInView, motion } from 'framer-motion';

import { themeConfig, GRADIENTS, COLORS, SECTION_BACKGROUNDS, BRAND_CONTROLS, TYPOGRAPHY } from '../config/themeConfig';

/* ───────── COUNT-UP COMPONENT ───────── */
const CountUp = ({ end, suffix, label, delay, duration, isDark = false }: { end: number; suffix: string; label: string; delay: number; duration: number; isDark?: boolean }) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    React.useEffect(() => {
        if (!isInView) return;

        let startTimestamp: number | null = null;
        let animationFrame: number;

        const timeoutId = setTimeout(() => {
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const p = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                setCount(Math.floor(p * end));

                if (p < 1) {
                    animationFrame = window.requestAnimationFrame(step);
                }
            };
            animationFrame = window.requestAnimationFrame(step);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
        };
    }, [end, duration, delay, isInView]);

    // Helper to render suffix with specific symbol coloring
    const renderSuffix = () => {
        if (suffix === '×7') {
            return (
                <span className="flex items-center ml-1">
                    <span style={{ ...TYPOGRAPHY.metricNumber, fontSize: '32px', color: BRAND_CONTROLS.metricsSymbolColor }}>
                        ×
                    </span>
                    <span style={{ ...TYPOGRAPHY.metricNumber, fontSize: '42px', color: BRAND_CONTROLS.metricsNumberColor }}>
                        7
                    </span>
                </span>
            );
        }
        return (
            <span style={{ ...TYPOGRAPHY.metricNumber, fontSize: '32px', color: BRAND_CONTROLS.metricsSymbolColor, marginLeft: '4px' }}>
                {suffix}
            </span>
        );
    };

    return (
        <div ref={ref} className="relative flex flex-col items-center justify-center w-full py-6 px-4">
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-2 flex flex-row items-end justify-center">
                    <div className="relative inline-flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <span style={{ ...TYPOGRAPHY.metricNumber, color: isDark ? '#FFFFFF' : BRAND_CONTROLS.metricsNumberColor }}>
                                {end > 999 ? count.toLocaleString() : count}
                            </span>
                            {renderSuffix()}
                        </div>
                        <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-black/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full"
                                style={{ background: BRAND_CONTROLS.metricsUnderlineColor }}
                                initial={{ width: '0%' }}
                                animate={isInView ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: duration, delay: delay, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Descriptor */}
                <div
                    className={`mt-6 text-center whitespace-pre-line ${label.includes('Monitoring') ? 'max-w-[120px]' : 'max-w-[150px]'}`}
                    style={{
                        ...TYPOGRAPHY.metricLabel,
                        color: isDark ? 'rgba(255,255,255,0.5)' : BRAND_CONTROLS.metricsLabelColor,
                        lineHeight: '1.4'
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    );
};

export default function TrustIndicators({ isDark = false }: { isDark?: boolean }) {
    const metrics = [
        { value: 120, suffix: '+', label: 'Security Engagements' },
        { value: 15, suffix: '+', label: 'Countries Served' },
        { value: 70, suffix: '+', label: 'Enterprise Apps Assessed' },
        { value: 24, suffix: '×7', label: 'Security Operations\nMonitoring' }
    ];

    return (
        <section
            className="relative w-full z-[0]"
            style={{
                background: isDark ? 'transparent' : SECTION_BACKGROUNDS.LIGHT,
                paddingTop: isDark ? '0px' : '100px',
                paddingBottom: isDark ? '0px' : '100px',
            }}
        >
            {/* Subtle dot grid texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0B1F3B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div
                className="w-full max-w-7xl mx-auto relative z-[15] flex flex-col justify-center"
                style={{
                    paddingLeft: themeConfig.global.containerPaddingX,
                    paddingRight: themeConfig.global.containerPaddingX,
                }}
            >
                {/* 4-column horizontal on desktop, 2x2 on tablet, 1-col on mobile */}
                <div className="relative z-[30] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center relative"
                        >
                            {/* Desktop/Tablet Dividers */}
                            {idx % 4 !== 3 && (
                                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}
                            {idx % 2 === 0 && (
                                <div className="hidden sm:block lg:hidden absolute right-0 top-0 bottom-0 w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}
                            
                            <CountUp end={metric.value} suffix={metric.suffix} label={metric.label} delay={0.1 + (idx * 0.05)} duration={1.5} isDark={isDark} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
