import React from 'react';
import { useInView, motion } from 'framer-motion';

import { COLORS, BRAND_CONTROLS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

const METRICS_DURATION = 0.8; // Faster animation as requested

const getMetricLabelMaxWidth = (label: string) => {
    if (label.includes('Vulnerabilities')) return 'min(14rem, 100%)';
    if (label.includes('Monitoring')) return 'min(11rem, 100%)';
    return 'min(10rem, 100%)';
};

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
        if (suffix === 'x7') {
            return (
                <span className="flex items-center">
                    <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsSymbolColor }}>
                        x
                    </span>
                    <span style={{ ...TYPOGRAPHY.metricNumber, color: isDark ? '#FFFFFF' : BRAND_CONTROLS.metricsNumberColor }}>
                        7
                    </span>
                </span>
            );
        }
        return (
            <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsSymbolColor, marginLeft: '4px' }}>
                {suffix}
            </span>
        );
    };

    return (
        <div ref={ref} className="relative flex flex-col items-center justify-center w-full min-w-0 py-5 sm:py-6 px-4 sm:px-5">
            <div className="relative z-10 flex w-full flex-col items-center">
                <div className="relative mb-2 flex flex-row items-end justify-center max-w-full">
                    <div className="relative inline-flex flex-col items-center">
                        <div className="flex flex-row items-center whitespace-nowrap">
                            <span
                                style={{
                                    ...TYPOGRAPHY.metricNumber,
                                    fontSize: 'clamp(2.3rem, 7vw, 4rem)',
                                    color: isDark ? '#FFFFFF' : BRAND_CONTROLS.metricsNumberColor
                                }}
                            >
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
                    className="mt-5 sm:mt-6 text-center whitespace-pre-line text-balance"
                    style={{
                        ...TYPOGRAPHY.metricLabel,
                        fontSize: 'clamp(0.7rem, 1.9vw, 0.75rem)',
                        color: isDark ? 'rgba(255,255,255,0.5)' : BRAND_CONTROLS.metricsLabelColor,
                        lineHeight: '1.45',
                        maxWidth: getMetricLabelMaxWidth(label)
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    );
};

export default function TrustIndicators({ isDark = false, centered = false }: { isDark?: boolean; centered?: boolean }) {
    // ── Padding/Margin controls ──────────────────────────────────────────
    const METRICS_PADDING_BOTTOM = '1em';
    const METRICS_MARGIN_BELOW = '0px';   // gap before partners if needed
    const GLOBAL_IMPACT_HEADER_TOP_GAP = '4.5rem'; // Increased separation from hero
    const GLOBAL_IMPACT_HEADER_SIDE_PADDING = '3rem';
    const GLOBAL_IMPACT_HEADER_BOTTOM_GAP = '1.75rem'; // 28px
    // ─────────────────────────────────────────────────────────────────────

    const metrics = [
        { value: 60, suffix: '+', label: 'Security Engagements' },
        { value: 2000, suffix: '+', label: 'Security Vulnerabilities Reported' },
        { value: 100, suffix: '%', label: 'Client Retention' },
        { value: 24, suffix: 'x7', label: 'Security Operations\nMonitoring' }
    ];

    return (
        <section
            className="relative w-full z-[0]"
            style={{
                background: isDark ? 'transparent' : '#FFFFFF',
                paddingTop: isDark ? '0px' : '0px',
                paddingBottom: isDark ? '0px' : METRICS_PADDING_BOTTOM,
                marginBottom: isDark ? '0px' : METRICS_MARGIN_BELOW,
            }}
        >
            {/* Header stays consistent with Partners header */}
            {!isDark && (
                <div style={{ textAlign: centered ? 'center' : 'left', padding: `${GLOBAL_IMPACT_HEADER_TOP_GAP} ${GLOBAL_IMPACT_HEADER_SIDE_PADDING} ${GLOBAL_IMPACT_HEADER_BOTTOM_GAP}` }}>
                    <h3 style={{
                        fontFamily: TYPOGRAPHY.fontHeading,
                        fontSize: 'clamp(2rem, 4vw, 2.625rem)', // 32px -> 42px
                        color: '#1A1A1A',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '-0.02em',
                    }}>
                        Our <span style={{ color: COLORS.burgundy }}>Global</span> Impact
                    </h3>
                </div>
            )}

            <div
                className="w-full relative z-[15] flex flex-col justify-center"
                style={{
                    paddingLeft: LAYOUT_CONTROLS.global.paddingX,
                    paddingRight: LAYOUT_CONTROLS.global.paddingX,
                }}
            >
                {/* 4-column horizontal on desktop, 2x2 on mobile/tablet */}
                <div className="relative z-[30] grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center relative min-w-0"
                        >
                            {/* Desktop Dividers */}
                            {idx % 4 !== 3 && (
                                <div className="hidden lg:block absolute right-0 top-[30%] bottom-[30%] w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}
                            {/* Mobile/Tablet Vertical Divider (between col 1 and 2 in the 2x2 grid) */}
                            {idx % 2 === 0 && (
                                <div className="block lg:hidden absolute right-0 top-[30%] bottom-[30%] w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}

                            <CountUp end={metric.value} suffix={metric.suffix} label={metric.label} delay={0.1 + (idx * 0.05)} duration={METRICS_DURATION} isDark={isDark} />

                            {/* Mobile/Tablet Horizontal Dividers (only under row 1 of the 2x2) */}
                            {(idx < 2) && (
                                <div className="block lg:hidden absolute bottom-[-24px] left-[15%] right-[15%] h-px"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(11,31,59,0.12) 20%, rgba(11,31,59,0.12) 80%, transparent 100%)'
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
