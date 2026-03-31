import React from 'react';
import { useInView, motion } from 'framer-motion';

import { themeConfig, GRADIENTS, COLORS, SECTION_BACKGROUNDS, BRAND_CONTROLS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

const METRICS_DURATION = 0.8; // Faster animation as requested

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
                <span className="flex items-center">
                    <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsSymbolColor }}>
                        ×
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

export default function TrustIndicators({ isDark = false, centered = false }: { isDark?: boolean; centered?: boolean }) {
    // ── Padding/Margin controls ──────────────────────────────────────────
    const METRICS_PADDING_TOP = '30px';
    const METRICS_PADDING_BOTTOM = '1em';
    const METRICS_MARGIN_BELOW = '0px';   // gap before partners if needed
    const GLOBAL_IMPACT_HEADER_TOP_GAP = '32px'; // Matched to Partners header top gap
    const GLOBAL_IMPACT_HEADER_SIDE_PADDING = '2.5rem';
    const GLOBAL_IMPACT_HEADER_BOTTOM_GAP = '28px';
    // ─────────────────────────────────────────────────────────────────────

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
                        fontSize: 'clamp(32px, 4vw, 42px)', // Standard section heading size
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
                            {/* Desktop/Tablet Dividers - Reduced height to 40% and centered */}
                            {idx % 4 !== 3 && (
                                <div className="hidden lg:block absolute right-0 top-[30%] bottom-[30%] w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}
                            {idx % 2 === 0 && (
                                <div className="hidden sm:block lg:hidden absolute right-0 top-[30%] bottom-[30%] w-px bg-[#0B1F3B] opacity-[0.1]" />
                            )}
                            <CountUp end={metric.value} suffix={metric.suffix} label={metric.label} delay={0.1 + (idx * 0.05)} duration={METRICS_DURATION} isDark={isDark} />

                            {/* Refinement 2: Gradient Bottom Separators for Mobile/Tablet Wrap */}
                            {(idx < metrics.length - 1) && (
                                <div className="lg:hidden absolute bottom-0 left-[15%] right-[15%] h-px"
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
