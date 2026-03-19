import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, ShieldAlert, Cpu, ArrowRight, Building2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import WorldMap from '../components/ui/world-map';
import logoSymbol from '../assets/Logos/icononly_transparent_nobuffer.png';

/* ───────── PAGE CONFIGURATION ───────── */
const CONTAINER_WIDTH = 'max-w-[1280px] mx-auto px-8 relative z-10';

/* ───────── WORLD MAP DATA ───────── */
const officeConnections = [
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 19.0760, lng: 72.8777 } },
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 12.9716, lng: 77.5946 } },
    { start: { lat: 19.9975, lng: 73.7898, label: 'hq' }, end: { lat: 32.7767, lng: -96.7970, label: 'client' } },
    { start: { lat: 19.9975, lng: 73.7898, label: 'hq' }, end: { lat: 51.5074, lng: -0.1278, label: 'client' } },
];

/* ───────── OPERATIONAL PHILOSOPHY DATA ───────── */
const philosophyItems = [
    {
        num: '01',
        title: 'Threat Modeling First',
        body: 'Every engagement begins from the adversary\'s perspective. We map attack paths before we recommend defenses.',
    },
    {
        num: '02',
        title: 'Engineering Over Checkbox',
        body: 'Security is built into architecture by design. Point-in-time audits without remediation pathways are not our model.',
    },
    {
        num: '03',
        title: 'Continuous Validation',
        body: 'Threat landscapes change daily. Our engagements and platform telemetry reflect current posture, not last quarter\'s snapshot.',
    },
    {
        num: '04',
        title: 'Outcome Accountability',
        body: 'We measure security posture improvement — not report length. Every engagement closes with verified remediation evidence.',
    },
];


/* ───────── COUNT-UP COMPONENT (Local) ───────── */
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

export default function WhoWeAre() {
    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ color: '#0A0A0F' }}>
            <Header />

            <main>
                {/* 1. HERO SECTION */}
                <section
                    className="relative flex items-center overflow-visible z-[20] min-h-[90vh] pb-[60px]"
                >
                    {/* Vortex Backdrop Component */}
                    <div
                        className="absolute top-1/2 right-0 z-[10] pointer-events-none flex items-center justify-center overflow-visible"
                        style={{
                            width: '800px',
                            height: '800px',
                            transform: `translate(51%, calc(-50% - 40px)) perspective(1500px) rotateX(45deg) rotateY(-15deg) rotateZ(35deg) scale(1.3)`
                        }}
                    >
                        <motion.div
                            className="w-full h-full flex items-center justify-center relative z-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
                        >
                            <img
                                src={logoSymbol}
                                alt="Swirling Vortex"
                                className="w-[82%] h-[82%] object-contain"
                                style={{ opacity: 0.9 }}
                            />
                        </motion.div>
                    </div>

                    <div className={CONTAINER_WIDTH}>
                        <div className="lg:max-w-[65%]">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    fontSize: '68px',
                                    color: '#0A0A0F',
                                    lineHeight: 1.05,
                                    marginBottom: '40px',
                                    marginTop: '80px',
                                }}
                            >
                                Engineering Security <br />
                                <span style={{ color: '#1a202c', fontWeight: 700, fontSize: '90%' }}>at Enterprise Scale</span>
                            </motion.h1>

                            {/* Editorial two-part text split */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col lg:flex-row gap-16 items-start"
                            >
                                <div className="lg:w-full">
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 600,
                                            fontSize: '22px',
                                            color: '#0A0A0F',
                                            lineHeight: 1.6,
                                            maxWidth: '500px',
                                            marginBottom: '24px'
                                        }}
                                    >
                                        We build security into the architecture.<br />Not on top of it.
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            color: '#4A4A5A',
                                            lineHeight: 1.8,
                                            maxWidth: '600px'
                                        }}
                                    >
                                        Quasar CyberTech is a cybersecurity engineering firm delivering enterprise-grade security across applications, cloud environments, infrastructure, and enterprise systems.
                                    </p>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mt-12">
                                <Link to="/services">
                                    <Button variant="secondary" icon={<ArrowRight size={18} />}>
                                        Explore Services
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="primary">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. ENTERPRISE SNAPSHOT (Glass Metrics Bar) */}
                <section className="relative z-[30] -mt-[60px] pb-12">
                    <div className={CONTAINER_WIDTH}>
                        <div
                            style={{
                                maxWidth: '960px',
                                margin: '0 auto',
                                background: 'rgba(255,255,255,0.72)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.85)',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                padding: '32px 48px',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            }}
                        >
                            {[
                                { value: 1600, suffix: '+', label: 'Engagements Delivered', techLabel: 'ENGAGEMENTS' },
                                { value: 15, suffix: '+', label: 'Countries Served', techLabel: 'COUNTRIES' },
                                { value: 98, suffix: '%', label: 'Client Retention', techLabel: 'RETENTION' },
                                { value: 24, suffix: '×7', label: 'Security Operations', techLabel: 'AVAILABILITY' },
                            ].map((m, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center px-4 relative">
                                    <div style={{ fontSize: '10px', fontFamily: 'var(--font-hero)', color: '#8A8F9E', letterSpacing: '0.12em', marginBottom: '8px' }}>
                                        {m.techLabel}
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-hero)', fontSize: '36px', fontWeight: 800, color: '#0A0A0F', lineHeight: 1, marginBottom: '6px' }}>
                                        <CountUp end={m.value} suffix={m.suffix} delay={idx * 0.1} duration={2} />
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4A4A5A', fontWeight: 500 }}>
                                        {m.label}
                                    </div>
                                    {idx < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[40px] bg-black/5" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* 3. CAPABILITY PILLARS */}
                <section className="py-24" style={{ backgroundColor: '#F4F4F6' }}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { icon: Target, title: 'Offensive Security', desc: 'Advanced penetration testing, red teaming, and phishing simulations designed to identify real-world attack paths.' },
                                { icon: ShieldAlert, title: 'Defensive Operations', desc: '24/7 monitoring, incident response, and managed detection engineered for rapid containment and remediation.' },
                                { icon: Compass, title: 'Governance & Risk', desc: 'Strategic advisory, compliance enablement, and risk management aligned with global standards.' },
                                { icon: Cpu, title: 'Security Engineering', desc: 'Architecture hardening, cloud security, and infrastructure defense built for resilience by design.' },
                            ].map((cap, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 group transition-all flex flex-col h-full"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), 0 10px 25px -5px rgba(0,0,0,0.08)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shrink-0">
                                        <cap.icon className="w-6 h-6" style={{ color: '#3D3D4E' }} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '19px', color: '#0A0A0F', marginBottom: '12px' }}>
                                        {cap.title}
                                    </h3>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4A5A', lineHeight: 1.6 }}>
                                        {cap.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. VISION & MISSION */}
                <section className="py-24">
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="p-12 bg-white relative group"
                                style={{ borderLeft: '3px solid #C41E3A', borderRadius: '0 12px 12px 0', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.1)' }}>
                                <div className="flex items-center gap-[10px] mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: '#6B6B80', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                                    <span style={{ width: '20px', height: '2px', backgroundColor: '#C41E3A' }} />
                                    Vision
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '30px', color: '#0A0A0F', marginBottom: '24px', lineHeight: 1.2 }}>To be a global leader in IT innovation, driving transformative solutions.</h3>
                                <p style={{ fontFamily: 'var(--font-body)', color: '#4A4A5A', lineHeight: 1.7 }}>
                                    Driving solutions that empower businesses, enhance efficiency, and shape a secure, sustainable digital future for everyone.
                                </p>
                            </div>
                            <div className="p-12 bg-white relative group"
                                style={{ borderLeft: '3px solid #C41E3A', borderRadius: '0 12px 12px 0', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.1)' }}>
                                <div className="flex items-center gap-[10px] mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: '#6B6B80', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                                    <span style={{ width: '20px', height: '2px', backgroundColor: '#C41E3A' }} />
                                    Mission
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '30px', color: '#0A0A0F', marginBottom: '24px', lineHeight: 1.2 }}>Delivering cutting-edge solutions that empower business.</h3>
                                <p style={{ fontFamily: 'var(--font-body)', color: '#4A4A5A', lineHeight: 1.7 }}>
                                    Helping organizations to innovate, adapt, and excel in a dynamic digital landscape, fostering growth through technology and expertise.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. OPERATIONAL PHILOSOPHY (replaces Core Values) */}
                <section className="py-24" style={{ backgroundColor: '#F4F4F6' }}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="mb-16">
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: '#0A0A0F', fontSize: '44px', lineHeight: 1.1 }}>
                                How We<br />Operate
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {philosophyItems.map((item) => (
                                <div key={item.num} className="relative">
                                    {/* Ghost number */}
                                    <div
                                        className="absolute top-0 left-0 pointer-events-none select-none"
                                        style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 800,
                                            fontSize: '72px',
                                            color: 'rgba(0,0,0,0.05)',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {item.num}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10" style={{ paddingTop: '40px' }}>
                                        <div
                                            style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '11px',
                                                color: '#6B6B80',
                                                letterSpacing: '0.14em',
                                                marginBottom: '12px',
                                            }}
                                        >
                                            {item.num}
                                        </div>
                                        <h3
                                            style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontWeight: 600,
                                                fontSize: '17px',
                                                color: '#0A0A0F',
                                                marginBottom: '12px',
                                            }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontFamily: 'var(--font-body)',
                                                fontWeight: 400,
                                                fontSize: '14px',
                                                color: '#4A4A5A',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {item.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. GLOBAL PRESENCE SECTION */}
                <section className="py-24 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)', backgroundColor: '#F4F4F6' }}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                            {/* LEFT: Locations */}
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-[10px] mb-4" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: '#6B6B80', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                                    <span style={{ width: '20px', height: '2px', backgroundColor: '#C41E3A' }} />
                                    Infrastructure
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '36px', color: '#0A0A0F', lineHeight: 1.1, marginBottom: '24px' }}>
                                    Global Presence
                                </h2>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4A4A5A', maxWidth: '400px', marginBottom: '32px', lineHeight: 1.6 }}>
                                    Strategic operations distributed across key technology corridors for localized response and global coverage.
                                </p>

                                {/* HQ */}
                                <div className="p-6 mb-4 flex items-center gap-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div className="w-14 h-14 rounded-2xl bg-[#0F1E3D]/5 flex items-center justify-center shrink-0">
                                        <Building2 className="w-7 h-7" style={{ color: '#0F1E3D' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '17px', color: '#0A0A0F' }}>Nashik — Headquarters</h3>
                                            <span className="px-2 py-0.5 bg-[#0F1E3D]/10 text-[#0F1E3D] text-[9px] font-black rounded tracking-widest uppercase shrink-0">HQ</span>
                                        </div>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4A5A' }}>
                                            #1, State Bank Colony, Indira Nagar, Maharashtra – 422009
                                        </p>
                                    </div>
                                </div>

                                {/* Satellite locations */}
                                <div className="grid grid-cols-3 gap-4 mb-6 pt-4">
                                    {[
                                        { city: 'Mumbai', label: 'Operations', dotColor: '#0A0A0F' },
                                        { city: 'Bengaluru', label: 'Engineering', dotColor: '#0A0A0F' },
                                        { city: 'Dallas', label: 'Remote Operations', dotColor: 'rgba(0,0,0,0.2)' },
                                    ].map((loc) => (
                                        <div key={loc.city} className="p-4 flex flex-col items-center text-center gap-2 border-r last:border-0 border-black/5">
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: loc.dotColor }} />
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 800, color: loc.city === 'Dallas' ? 'rgba(0,0,0,0.5)' : '#0A0A0F' }}>{loc.city}</div>
                                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#6B6B80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{loc.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0A0A0F' }} />
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6B6B80' }}>Onsite office</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(0,0,0,0.15)' }} />
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6B6B80' }}>Remote operations</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Map */}
                            <div className="relative min-h-[400px] flex">
                                <div className="flex-1 overflow-hidden" style={{
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    borderRadius: '16px',
                                    boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)',
                                    border: '1px solid rgba(0,0,0,0.02)'
                                }}>
                                    <WorldMap
                                        lineColor="#0F1E3D"
                                        secondaryLineColor="#C41E3A"
                                        dots={officeConnections}
                                    />

                                    <div className="absolute bottom-8 left-8 flex items-center gap-6 z-20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F1E3D' }} />
                                            <span style={{ fontFamily: 'var(--font-hero)', fontSize: '10px', color: '#6B6B80', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Operational Hubs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C41E3A' }} />
                                            <span style={{ fontFamily: 'var(--font-hero)', fontSize: '10px', color: '#6B6B80', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Client Nodes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. FINAL CTA */}
                <section className="relative w-full overflow-hidden"
                    style={{
                        paddingTop: '80px',
                        paddingBottom: '80px',
                        background: 'var(--cta-bg)'
                    }}
                >
                    <div className="max-w-[1280px] relative z-10 mx-auto px-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '64px', color: '#FFFFFF', marginBottom: '32px', lineHeight: 1.1, maxWidth: '700px', letterSpacing: '-0.02em' }}>
                                Build Resilient <br />
                                <span style={{ color: 'var(--brand-accent)' }}>Security</span> Foundations
                            </h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: 'rgba(255,255,255,0.8)', marginBottom: '56px', maxWidth: '600px', lineHeight: 1.6 }}>
                                Engage with our experts to assess your current posture and strengthen your defense strategy.
                            </p>
                            <Link
                                to="/contact"
                                className="group inline-flex items-center justify-center px-10 py-4 bg-[#FFFFFF] text-[#C41E3A] hover:bg-[#F8F9FA] hover:scale-105 active:scale-95 font-bold uppercase tracking-widest text-[14px] rounded-md transition-all shadow-2xl shadow-black/40"
                                style={{ fontFamily: 'var(--font-hero)' }}
                            >
                                Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
