import React from 'react';
import { motion, useInView } from 'framer-motion';

// ---------------------------------------------------------
// TRUST INDICATORS VARIABLES
// ---------------------------------------------------------
export const trustVars = {
    // 1. Section Spacing
    paddingTop: '60px',
    paddingBottom: '40px',

    // 2. Left Column (Heading & Subheading) Container Controls
    leftColPaddingLeft: '22px',
    leftColPaddingRight: '40px',
    leftColPaddingTop: '40px',
    leftColPaddingBottom: '30px',
    leftCardMarginLeft: '20px',
    leftCardMarginRight: '0px',
    leftCardMarginTop: '40px',
    leftCardMarginBottom: '40px',
    leftCardMaxWidth: '100%',
    leftCardMinHeight: '100px',
    rightCardMarginRight: '2.5rem', // Aligned with header sideMargin

    // 3. Heading Controls
    headingWidth: '100%',
    headingSize: '37px',
    headingLineHeight: '1.2',
    headingMarginBottom: '16px',

    // 4. Subheading (Description) Controls
    subheadingSize: '14px',
    subheadingLineHeight: '1.6',
    subheadingColor: '#000000', // Pure Black
    subheadingMarginTop: '10px',
    subheadingMaxWidth: '384px', // max-w-sm

    // 5. Right Card Controls
    cardPaddingTop: '40px',
    cardPaddingBottom: '55px',
    cardPaddingX: '48px',

    // 6. Certificates Badges options
    certTextSize: '10px',
    badgesGap: '8px',
};

export default function TrustIndicators() {
    const metrics = [
        { value: 1600, suffix: '+', label: 'Engagements Delivered' },
        { value: 15, suffix: '+', label: 'Countries Served' },
        { value: 98, suffix: '%', label: 'Client Retention' },
        { value: 24, suffix: 'x7', label: 'Security Operations' }
    ];

    const certifications = [
        { label: 'ISO 27001', color: 'bg-[#8B1E3F]' },
        { label: 'CERT-In Empanelled', color: 'bg-[#0F172A]' },
        { label: 'CREST Aligned', color: 'bg-[#475569]' },
        { label: 'Gartner Recognized', color: 'bg-[#8B1E3F]' }
    ];

    // Helper component for count-up animation that waits for scroll intersection
    const CountUp = ({ end, suffix, index }: { end: number; suffix: string; index: number }) => {
        const [count, setCount] = React.useState(0);
        const ref = React.useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

        React.useEffect(() => {
            if (!isInView) return;

            let startTimestamp: number | null = null;
            let animationFrame: number;
            const duration = 1000 + (index * 100);

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setCount(Math.floor(easeProgress * end));

                if (progress < 1) {
                    animationFrame = window.requestAnimationFrame(step);
                }
            };

            animationFrame = window.requestAnimationFrame(step);

            return () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
            };
        }, [end, index, isInView]);

        return <span ref={ref}>{count}{suffix}</span>;
    };


    return (
        <section
            className="relative border-b border-gray-100/30"
            style={{ paddingTop: trustVars.paddingTop, paddingBottom: trustVars.paddingBottom }}
        >
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-stretch gap-0">

                    {/* Left 40%: Text Content wrapped in Card */}
                    <div className="lg:w-[40%] flex flex-col justify-center">
                        <div
                            className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl lg:rounded-r-none lg:rounded-l-[40px] flex flex-col justify-center my-auto"
                            style={{
                                paddingLeft: trustVars.leftColPaddingLeft,
                                paddingRight: trustVars.leftColPaddingRight,
                                paddingTop: trustVars.leftColPaddingTop,
                                paddingBottom: trustVars.leftColPaddingBottom,
                                marginLeft: trustVars.leftCardMarginLeft,
                                marginRight: trustVars.leftCardMarginRight,
                                marginTop: trustVars.leftCardMarginTop,
                                marginBottom: trustVars.leftCardMarginBottom,
                                maxWidth: trustVars.leftCardMaxWidth,
                                minHeight: trustVars.leftCardMinHeight
                            }}
                        >
                            <h2
                                className="font-bold text-[#0F172A] tracking-tight flex flex-col items-start"
                                style={{
                                    fontSize: trustVars.headingSize,
                                    lineHeight: trustVars.headingLineHeight,
                                    maxWidth: trustVars.headingWidth,
                                    marginBottom: trustVars.headingMarginBottom
                                }}
                            >
                                <span>Trusted by</span>
                                <span className="relative inline-block mt-0.5 whitespace-nowrap">
                                    Enterprises Worldwide
                                    {/* Accent line spanning ONLY the exact width of the lowercase text - Burgundy */}
                                    <span className="absolute -bottom-2 left-0 w-full h-[3.5px] bg-[#8B1E3F] rounded-full opacity-90" />
                                </span>
                            </h2>

                            <p
                                className="leading-relaxed font-medium"
                                style={{
                                    marginTop: trustVars.subheadingMarginTop,
                                    maxWidth: trustVars.subheadingMaxWidth,
                                    fontSize: trustVars.subheadingSize,
                                    lineHeight: trustVars.subheadingLineHeight,
                                    color: trustVars.subheadingColor
                                }}
                            >
                                Security outcomes backed by measurable delivery, operational depth, and global scale.
                            </p>
                        </div>
                    </div>

                    {/* Right 60%: Wrapped in a big card */}
                    <div className="lg:w-[60%] w-full relative flex flex-col justify-center">
                        <div
                            className="bg-white/90 backdrop-blur-md border text-center border-gray-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl lg:rounded-l-none lg:rounded-r-[40px] border-l-[4px] border-l-[#8B1E3F] flex flex-col justify-center my-auto"
                            style={{
                                paddingTop: trustVars.cardPaddingTop,
                                paddingBottom: trustVars.cardPaddingBottom,
                                paddingLeft: trustVars.cardPaddingX,
                                paddingRight: trustVars.cardPaddingX,
                                minHeight: '380px',
                                marginRight: trustVars.rightCardMarginRight
                            }}
                        >

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8 w-full">
                                {metrics.map((metric, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="bg-[#FCFBF9]/60 backdrop-blur-sm border border-gray-200/60 rounded-r-xl lg:rounded-r-[20px] rounded-l-none p-4 lg:p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group"
                                    >
                                        {/* Dynamic Filling Solid Accent Line on the LEFT edge */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1.5,
                                                ease: "easeInOut",
                                                delay: 0.2 + (idx * 0.1)
                                            }}
                                            className="absolute left-0 bottom-0 w-[4px] bg-[#8B1E3F]"
                                        />

                                        {/* Subtle background wash filling up */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                            className="absolute inset-0 bg-gradient-to-r from-[#8B1E3F]/[0.03] to-transparent pointer-events-none"
                                        />

                                        <div className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-1.5 tracking-tight relative z-10">
                                            <CountUp end={metric.value} suffix={metric.suffix} index={idx} />
                                        </div>
                                        <div className="text-[10px] lg:text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] leading-snug relative z-10">
                                            {metric.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Certification Badges Container - Forced Single Line */}
                            <div
                                className="flex flex-row flex-nowrap justify-center items-center w-full"
                                style={{ gap: trustVars.badgesGap }}
                            >
                                {certifications.map((cert, idx) => (
                                    <div
                                        key={idx}
                                        className="px-2 py-1.5 lg:px-3 lg:py-2 bg-[#FCFBF9]/80 backdrop-blur-sm border border-gray-200/60 rounded-full font-bold text-gray-600 uppercase tracking-tight shadow-sm flex flex-row items-center gap-1.5 whitespace-nowrap shrink"
                                        style={{ fontSize: trustVars.certTextSize }}
                                    >
                                        <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${cert.color} shadow-sm shrink-0`} />
                                        <span>{cert.label}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
