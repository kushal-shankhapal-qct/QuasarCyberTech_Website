import React from 'react';
import { useInView, motion } from 'framer-motion';

import isoLogo from '../assets/Logos/Trust_Logos/ISO_27001_Final-Logo.jpg';
import certInLogo from '../assets/Logos/Trust_Logos/certin-logo.png';
import crestLogo from '../assets/Logos/Trust_Logos/Crest_Logo.png';

import partner1 from '../assets/Logos/Partners/Caniphish.png';
import partner2 from '../assets/Logos/Partners/D-Link.png';
import partner3 from '../assets/Logos/Partners/Sophos-1.png';
import partner4 from '../assets/Logos/Partners/burpsuite-1.png';
import partner5 from '../assets/Logos/Partners/manage-engine-2-1-1.png';
import partner6 from '../assets/Logos/Partners/ninja-one-1.png';
import partner7 from '../assets/Logos/Partners/rapid-7-1.png';
import partner8 from '../assets/Logos/Partners/satcom-1.png';
import partner9 from '../assets/Logos/Partners/tenable-one-1.png';
import partner10 from '../assets/Logos/Partners/vicirus-1.png';

const partners = [
    { name: 'Caniphish', logo: partner1, isLight: false, scale: 1 },
    { name: 'D-Link', logo: partner2, isLight: false, scale: 1.25 },
    { name: 'Sophos', logo: partner3, isLight: false, scale: 1 },
    { name: 'Burpsuite', logo: partner4, isLight: false, scale: 1.3 },
    { name: 'Manage Engine', logo: partner5, isLight: false, scale: 1 },
    { name: 'Ninja One', logo: partner6, isLight: false, scale: 1.25 },
    { name: 'Rapid 7', logo: partner7, isLight: false, scale: 1.25 },
    { name: 'Satcom', logo: partner8, isLight: true, scale: 1.25 }, // Light logos inverted to black via CSS below
    { name: 'Tenable One', logo: partner9, isLight: false, scale: 1 },
    { name: 'Vicirus', logo: partner10, isLight: false, scale: 1 },
];

export default function TrustIndicators() {
    const metrics = [
        { value: 1600, suffix: '+', label: 'Engagements Delivered' },
        { value: 15, suffix: '+', label: 'Countries Served' },
        { value: 98, suffix: '%', label: 'Client Retention' },
        { value: 24, suffix: 'x7', label: 'Security Operations' }
    ];

    const certifications = [
        { label: 'ISO 27001', logo: isoLogo },
        { label: 'CERT-In Empanelled', logo: certInLogo },
        { label: 'CREST Aligned', logo: crestLogo }
    ];

    const CountUp = ({ end, suffix, delay, duration }: { end: number; suffix: string; delay: number; duration: number }) => {
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
                    const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    setCount(Math.floor(easeProgress * end));

                    if (progress < 1) {
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

        return <span ref={ref}>{count}{suffix}</span>;
    };

    return (
        <section
            className="relative w-full z-[0] overflow-visible"
            style={{
                backgroundColor: 'transparent',
                paddingTop: '180px',
                paddingBottom: '80px',
                marginTop: '-80px',
            }}
        >
            {/* White surface layer */}
            <div className="absolute inset-0 bg-white/95 z-[5]" style={{ top: '80px' }} />

            <div className="w-full max-w-[1920px] mx-auto relative z-[15] px-4">
                <div className="max-w-[1400px] mx-auto">

                    {/* SPLIT LAYOUT: Text Left, Metrics Right */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 mb-24">

                        {/* LEFT HALF — STATEMENT (Centered in half) */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center items-center">
                            <h2 className="text-[24px] md:text-[30px] m-0 p-0 uppercase"
                                style={{
                                    textAlign: 'center',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <span className="block whitespace-nowrap" style={{ fontWeight: 300 }}>
                                    TRUSTED BY
                                </span>
                                <span className="block whitespace-nowrap"
                                    style={{
                                        fontWeight: 900,
                                        fontSize: '105%'
                                    }}
                                >
                                    <span style={{ color: 'var(--brand-accent)' }}>ENTERPRISES</span> WORLDWIDE
                                </span>
                            </h2>
                            <p className="text-[16px] text-[var(--text-muted)] mt-[20px] max-w-[400px] font-medium leading-relaxed">
                                Security outcomes backed by measurable delivery, operational depth, and global scale.
                            </p>
                        </div>

                        {/* RIGHT HALF — METRICS GRID (Spaced out more) */}
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-2 gap-12 pr-4 lg:pr-12">
                                {metrics.map((metric, idx) => {
                                    const accentHeight = idx === 0 ? '70%' : idx === 1 ? '80%' : idx === 2 ? '90%' : '100%';
                                    return (
                                        <div key={idx} className="flex flex-col items-start relative z-10 p-7 bg-[var(--card-surface-primary)] border border-[var(--brand-accent-soft)] rounded-r-[40px] shadow-sm transition-all hover:scale-[1.02] shrink-0 min-w-[200px]">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: accentHeight }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, ease: 'easeOut', delay: 0.1 + (idx * 0.1) }}
                                                className="absolute bottom-0 left-0 w-[4px] bg-[var(--brand-accent)]"
                                            />
                                            <div className="text-[36px] md:text-[42px] font-black text-[var(--text-primary)] leading-none mb-2 pl-3">
                                                <CountUp end={metric.value} suffix={metric.suffix} delay={0.1 + (idx * 0.1)} duration={1.5} />
                                            </div>
                                            <div className="text-[10px] text-[var(--text-muted)] tracking-[1.5px] uppercase pl-3 font-bold">
                                                {metric.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* PARTNER LOGO CAROUSEL */}
                    <div className="w-full relative mb-12" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                        <div className="absolute top-[0px] left-0 right-0 text-center uppercase"
                            style={{
                                color: 'var(--brand-accent)',
                                fontWeight: 900,
                                letterSpacing: '0.15em',
                                fontSize: '13px',
                                fontVariant: 'small-caps'
                            }}
                        >
                            Trusted Technology Partners
                        </div>

                        <div className="w-full mx-auto relative overflow-hidden flex items-center h-[48px] px-0 mt-8">
                            <div className="absolute top-[-50px] bottom-[-50px] left-0 w-[120px] bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                            <div className="absolute top-[-50px] bottom-[-50px] right-0 w-[120px] bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ ease: "linear", duration: 32, repeat: Infinity }}
                                className="flex w-max" style={{ gap: '84px' }}
                            >
                                {[...partners, ...partners].map((partner, idx) => (
                                    <div key={idx} className="inline-flex items-center justify-center shrink-0 h-[48px] px-10 group relative cursor-pointer">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="h-full w-auto object-contain mix-blend-multiply opacity-85 transition-opacity duration-200"
                                            style={{
                                                filter: partner.isLight ? 'invert(1)' : 'brightness(0)',
                                                transform: `scale(${partner.scale || 1})`
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* CERTIFICATIONS STRIP */}
                    <div className="flex flex-row flex-wrap justify-center items-center gap-24 w-full">
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="flex items-center">
                                {cert.logo && (
                                    <img
                                        src={cert.logo}
                                        alt={cert.label}
                                        className="h-[60px] lg:h-[70px] w-auto object-contain brightness-100 contrast-125"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
