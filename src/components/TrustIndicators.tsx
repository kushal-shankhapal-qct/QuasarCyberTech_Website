import React from 'react';
import { useInView, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { themeConfig } from '../config/themeConfig';

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
    { name: 'Caniphish', logo: partner1, isLight: false, scale: themeConfig.trusted.carousel.logoScales.default },
    { name: 'D-Link', logo: partner2, isLight: false, scale: themeConfig.trusted.carousel.logoScales.dLink },
    { name: 'Sophos', logo: partner3, isLight: false, scale: themeConfig.trusted.carousel.logoScales.default },
    { name: 'Burpsuite', logo: partner4, isLight: false, scale: themeConfig.trusted.carousel.logoScales.burpSuite },
    { name: 'Manage Engine', logo: partner5, isLight: false, scale: themeConfig.trusted.carousel.logoScales.default },
    { name: 'Ninja One', logo: partner6, isLight: false, scale: themeConfig.trusted.carousel.logoScales.ninjaOne },
    { name: 'Rapid 7', logo: partner7, isLight: false, scale: themeConfig.trusted.carousel.logoScales.rapid7 },
    { name: 'Satcom', logo: partner8, isLight: true, scale: themeConfig.trusted.carousel.logoScales.satcom },
    { name: 'Tenable One', logo: partner9, isLight: false, scale: themeConfig.trusted.carousel.logoScales.default },
    { name: 'Vicirus', logo: partner10, isLight: false, scale: themeConfig.trusted.carousel.logoScales.vicirus },
];

// Heading configuration variables for easy tuning
const trustVars = {
    headingSizeMobile: '28px',
    headingSizeDesktop: '36px',
    line1Weight: 300,
    line2Weight: 900,
    line2Scale: '100%', // Increased as requested
    lineSpacing: '1.2',
    letterSpacing: '-0.01em',
    subheadingSize: '16px',
    subheadingMaxWidth: '400px',
    subheadingMarginTop: '20px',
};

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
                <div className="w-full relative">

                    {/* SPLIT LAYOUT: Text Left, Metrics Right */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 mb-24">

                        {/* LEFT HALF — STATEMENT (Aligned with Hero) */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left" style={{ paddingLeft: '2.2rem' }}>
                            <h2 className="m-0 p-0 uppercase"
                                style={{
                                    fontSize: `clamp(${trustVars.headingSizeMobile}, 4vw, ${trustVars.headingSizeDesktop})`,
                                    textAlign: 'left',
                                    lineHeight: trustVars.lineSpacing,
                                    letterSpacing: trustVars.letterSpacing,
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <span className="block whitespace-nowrap" style={{ fontWeight: trustVars.line1Weight }}>
                                    TRUSTED BY
                                </span>
                                <span className="block whitespace-nowrap"
                                    style={{
                                        fontWeight: trustVars.line2Weight,
                                        fontSize: trustVars.line2Scale
                                    }}
                                >
                                    <span style={{ color: 'var(--brand-accent)' }}>ENTERPRISES</span> WORLDWIDE
                                </span>
                            </h2>
                            <p style={{
                                fontSize: trustVars.subheadingSize,
                                color: 'var(--text-muted)',
                                marginTop: trustVars.subheadingMarginTop,
                                maxWidth: trustVars.subheadingMaxWidth,
                                fontWeight: 500,
                                lineHeight: '1.6'
                            }}>
                                Security outcomes backed by measurable delivery, operational depth, and global scale.
                            </p>
                        </div>

                        {/* RIGHT HALF — METRICS GRID (Spaced out more) */}
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-2 gap-12 pr-4 lg:pr-12">
                                {metrics.map((metric, idx) => {
                                    const accentHeight = idx === 0 ? '70%' : idx === 1 ? '80%' : idx === 2 ? '90%' : '100%';
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-start relative z-10 p-7 transition-all hover:scale-[1.02] shrink-0 min-w-[200px]"
                                            style={{
                                                backgroundColor: `rgba(${themeConfig.trusted.clay.bgColor}, ${themeConfig.trusted.clay.bgOpacity})`,
                                                backdropFilter: `blur(${themeConfig.trusted.clay.blur})`,
                                                WebkitBackdropFilter: `blur(${themeConfig.trusted.clay.blur})`,
                                                boxShadow: `${themeConfig.trusted.clay.innerShadow}, ${themeConfig.trusted.clay.shadow}`,
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                                borderTop: 'none',
                                                borderBottom: 'none',
                                                borderRadius: `0 ${themeConfig.trusted.cardRadius} ${themeConfig.trusted.cardRadius} 0`
                                            }}
                                        >
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

                            <style>{`
                                .trust-ticker-swiper .swiper-wrapper {
                                    transition-timing-function: linear !important;
                                }
                                .trust-ticker-swiper {
                                    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23333333'%3E%3Cpath d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'/%3E%3Cpath d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10'/%3E%3Cpath d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v13a7 7 0 0 0 7 7h1.41a2 2 0 0 0 1.42-.59l4.88-4.88a2 2 0 0 0 0-2.82l-.2-.2a2 2 0 0 0-2.82 0l-3.69 3.69'/%3E%3Cpath d='M22 13V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4'/%3E%3C/svg%3E") 12 12, grab !important;
                                }
                                .trust-ticker-swiper:active {
                                    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'/%3E%3Cpath d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10'/%3E%3Cpath d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v13a7 7 0 0 0 7 7h1.41a2 2 0 0 0 1.42-.59l4.88-4.88a2 2 0 0 0 0-2.82l-.2-.2a2 2 0 0 0-2.82 0l-3.69 3.69'/%3E%3Cpath d='M22 13V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4'/%3E%3C/svg%3E") 12 12, grabbing !important;
                                }
                            `}</style>

                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={parseInt(themeConfig.trusted.carousel.gap || '60')}
                                slidesPerView="auto"
                                loop={true}
                                speed={4000}
                                autoplay={{
                                    delay: 0,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                allowTouchMove={true}
                                className="trust-ticker-swiper w-full flex items-center"
                            >
                                {/* Duplicating the list slightly more ensures Swiper has enough items to infinitely loop seamlessly on ultra-wide screens */}
                                {[...partners, ...partners].map((partner, idx) => (
                                    <SwiperSlide key={idx} style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
                                        <div className="inline-flex items-center justify-center shrink-0 h-[48px] px-4 sm:px-10 group relative select-none">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                draggable={false}
                                                className="h-full w-auto object-contain mix-blend-multiply opacity-85 transition-opacity duration-200 pointer-events-none"
                                                style={{
                                                    filter: partner.isLight ? 'invert(1)' : 'brightness(0)',
                                                    transform: `scale(${partner.scale || 1})`,
                                                    maxHeight: '48px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.85'}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
}
