import React from 'react';
import { motion, useInView } from 'framer-motion';

// ---------------------------------------------------------
// TRUST INDICATORS VARIABLES
// ---------------------------------------------------------
export const trustVars = {
    // 1. Spacing Controls (Adjust gap from Hero here)
    paddingTop: '60px',       // Decreased to bring it closer to the hero section
    paddingBottom: '120px',

    // 2. Heading Controls
    headingWidth: '100%',
    headingSize: '46px',      // Optimized size to hit exactly 2 lines
    headingLineHeight: '1.15',
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
            className="relative border-b border-gray-100/50"
            style={{ paddingTop: trustVars.paddingTop, paddingBottom: trustVars.paddingBottom }}
        >
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left 40%: Text Content */}
                    <div className="lg:w-[40%] text-center lg:text-left relative -mt-8">
                        {/* Subtle vertical accent divider line (visible on desktop) */}
                        <div className="hidden lg:block absolute -right-12 top-0 bottom-0 w-px bg-gray-200" />

                        <h2
                            className="font-bold text-[#0F172A] mb-6 tracking-tight relative mx-auto lg:mx-0"
                            style={{
                                fontSize: trustVars.headingSize,
                                lineHeight: trustVars.headingLineHeight,
                                maxWidth: trustVars.headingWidth
                            }}
                        >
                            Trusted by Enterprises <br className="hidden lg:block" />
                            <span className="relative inline-block">
                                Worldwide
                                {/* Accent line spanning ONLY the exact width of the lowercase text */}
                                <span className="absolute -bottom-2 left-0 w-full h-[3.5px] bg-[#8B1E3F] rounded-full opacity-90" />
                            </span>
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed mt-10 lg:pr-8">
                            Security outcomes backed by measurable delivery, operational depth, and global scale.
                        </p>
                    </div>

                    {/* Right 60%: Metrics Grid & Badges */}
                    <div className="lg:w-[60%] w-full">
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {metrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="bg-white border border-gray-200/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3 tracking-tight">
                                        <CountUp end={metric.value} suffix={metric.suffix} index={idx} />
                                    </div>
                                    <div className="text-[13px] font-bold text-gray-500 uppercase tracking-widest leading-snug lg:px-4">
                                        {metric.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Certification Badges on a single line (Desktop) */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                            {certifications.map((cert, idx) => (
                                <div
                                    key={idx}
                                    className="px-2 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-xl text-[11.5px] xl:text-[12.5px] font-bold text-gray-700 uppercase tracking-tight shadow-sm flex items-center justify-center gap-2"
                                >
                                    <div className={`w-2 h-2 rounded-full ${cert.color} shadow-sm`} />
                                    <span className="truncate">{cert.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
