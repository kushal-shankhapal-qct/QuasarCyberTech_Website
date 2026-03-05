import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import {
    Shield,
    Target,
    ShieldAlert,
    Cpu,
    ArrowRight,
    Building2,
    Wifi,
    CheckCircle2,
    Users,
    Compass,
    Lightbulb,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import WorldMap from '../components/ui/world-map';
import { themeConfig } from '../config/themeConfig';

/* ───────── PAGE CONFIGURATION ───────── */
const SECTION_SPACING = 'py-24';
const CONTAINER_WIDTH = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16';
const BRAND_GRADIENT = 'from-[#7A0F2A] to-[#1A0409]';
const CARD_RADIUS = '28px';

/* ───────── COMPONENTS ───────── */

const MetricCard = ({ value, label, idx }: { value: string, label: string, idx: number }) => {
    const accentHeight = idx === 0 ? '70%' : idx === 1 ? '80%' : idx === 2 ? '90%' : '100%';
    return (
        <div
            className="flex flex-col items-start relative z-10 p-8 transition-all hover:scale-[1.02] group"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255,255,255,1)',
                borderRadius: '0 24px 24px 0',
                border: 'none',
            }}
        >
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: accentHeight }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.1 + (idx * 0.1) }}
                className="absolute bottom-0 left-0 w-[4px] bg-[var(--brand-accent)]"
            />
            <div className="text-[36px] md:text-[42px] font-black text-slate-900 leading-none mb-3 pl-3 tracking-tighter">
                {value}
            </div>
            <div className="text-[10px] text-slate-500 tracking-[1.5px] uppercase pl-3 font-bold">
                {label}
            </div>
        </div>
    );
};

const CapabilityCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div
        className="p-6 group transition-all flex flex-col h-full"
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), 0 10px 25px -5px rgba(0,0,0,0.08)',
            borderRadius: '0 24px 24px 0',
            borderLeft: '4px solid var(--brand-navy)',
        }}
    >
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shrink-0 group-hover:bg-[var(--brand-navy)] transition-colors">
            <Icon className="w-6 h-6 text-[var(--brand-navy)] group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight leading-tight">
            {title}
        </h3>
        <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
            {desc}
        </p>
    </div>
);

const ValueCard = ({ icon: Icon, title, desc, idx }: { icon: any, title: string, desc: string, idx: number }) => (
    <div
        className="p-8 group relative overflow-hidden transition-all hover:scale-[1.02]"
        style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 15px 45px -10px rgba(0,0,0,0.08), inset 0 2px 5px rgba(255,255,255,1)',
            border: '1px solid rgba(0,0,0,0.04)'
        }}
    >
        {/* Hover Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[var(--brand-navy)] to-[var(--brand-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:border-[var(--brand-navy)]/20 group-hover:bg-[var(--brand-navy)]/5 transition-all">
            <Icon className="w-6 h-6 text-[var(--brand-navy)] group-hover:scale-110 transition-transform" />
        </div>
        <h4 className="text-[18px] font-bold text-slate-900 mb-3 tracking-tight">{title}</h4>
        <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

/* ───────── WORLD MAP DATA ───────── */
const officeConnections = [
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 19.0760, lng: 72.8777 } },
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 12.9716, lng: 77.5946 } },
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 32.7767, lng: -96.7970 } },
];

export default function WhoWeAre() {
    return (
        <div className="min-h-screen bg-white text-[var(--text-primary)] font-sans">
            <Header />

            <main>
                {/* 1. HERO SECTION (Light Background) */}
                <section className={`${SECTION_SPACING} pt-40 relative overflow-hidden bg-[var(--bg-hero)] pb-12`}>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />

                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
                            <div className="lg:col-span-6 flex flex-col items-start text-left">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-[48px] md:text-[68px] font-black text-slate-900 leading-[1.05] tracking-tighter mb-8"
                                >
                                    Engineering Security <br />
                                    <span className="text-slate-400">at Enterprise Scale</span>
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="text-[16px] md:text-[17px] font-bold text-[var(--brand-accent)] mb-6 tracking-[0.2em] uppercase">
                                        Resilience Engineered, Security Delivered.
                                    </div>
                                    <p className="text-[17px] md:text-[18px] text-slate-600 font-medium leading-relaxed mb-12 max-w-2xl text-justify">
                                        We combine offensive expertise, defensive operations, and proprietary platforms to build resilient digital ecosystems for modern enterprises. Our engineering-led approach ensures that security is not just a checkbox, but a foundational pillar of your digital growth.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                                        <Link
                                            to="/services"
                                            className="w-full sm:w-auto px-10 py-5 bg-[var(--brand-accent)] text-white font-black tracking-[0.1em] text-[14px] uppercase rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--brand-accent-soft)] flex items-center justify-center gap-3"
                                        >
                                            Explore Services <ArrowRight size={18} />
                                        </Link>
                                        <Link
                                            to="/contact"
                                            className="w-full sm:w-auto px-10 py-5 border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] font-black tracking-[0.1em] text-[14px] uppercase rounded-xl transition-all hover:bg-[var(--brand-accent)] hover:text-white flex items-center justify-center"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Image Placeholder (40%) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="lg:col-span-4 hidden lg:block"
                            >
                                <div className="aspect-square relative flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white overflow-hidden"
                                        style={{
                                            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                                            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02), 0 20px 40px -10px rgba(122,15,42,0.1)'
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[var(--brand-accent-soft)] opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center p-12">
                                            <Shield className="w-32 h-32 text-[var(--brand-accent)] opacity-10" />
                                        </div>
                                    </div>
                                    {/* Glass Overlay Element */}
                                    <div
                                        className="absolute -bottom-6 -right-6 p-8 bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl z-10"
                                        style={{ width: '200px' }}
                                    >
                                        <div className="h-2 w-12 bg-[var(--brand-accent)] rounded-full mb-4" />
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full bg-slate-900/10 rounded-full" />
                                            <div className="h-1.5 w-2/3 bg-slate-900/10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. ENTERPRISE SNAPSHOT (Metrics) */}
                <section className="pt-12 pb-6 relative z-10 -mt-16">
                    <div className={CONTAINER_WIDTH}>
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Metrics</span>
                            <h2 className="text-[28px] font-black text-slate-900 mt-2">Trusted by Enterprise Teams Worldwide</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <MetricCard value="1600+" label="Engagements Delivered" idx={0} />
                            <MetricCard value="15+" label="Countries Served" idx={1} />
                            <MetricCard value="98%" label="Client Retention" idx={2} />
                            <MetricCard value="24/7" label="Security Operations" idx={3} />
                        </div>
                    </div>
                </section>

                {/* 3. WHO WE ARE OVERVIEW */}
                <section className="py-12">
                    <div className={CONTAINER_WIDTH}>
                        <div className="max-w-4xl mx-auto text-left">
                            <p className="text-[22px] md:text-[26px] font-bold text-slate-900 leading-[1.4] tracking-tight">
                                Quasar CyberTech is a cybersecurity engineering firm delivering enterprise-grade security across applications, infrastructure, and cloud environments.
                                <span className="text-slate-400"> We integrate offensive testing, defensive monitoring, governance advisory, and proprietary security platforms to strengthen digital resilience at scale.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. CAPABILITY PILLARS */}
                <section className={`${SECTION_SPACING} bg-[var(--bg-services)]`}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <CapabilityCard
                                icon={Target}
                                title="Offensive Security"
                                desc="Advanced penetration testing, red teaming, and phishing simulations designed to identify real-world attack paths."
                            />
                            <CapabilityCard
                                icon={ShieldAlert}
                                title="Defensive Operations"
                                desc="24/7 monitoring, incident response, and managed detection engineered for rapid containment and remediation."
                            />
                            <CapabilityCard
                                icon={Compass}
                                title="Governance & Risk"
                                desc="Strategic advisory, compliance enablement, and risk management aligned with global standards."
                            />
                            <CapabilityCard
                                icon={Cpu}
                                title="Security Engineering"
                                desc="Architecture hardening, cloud security, and infrastructure defense built for resilience by design."
                            />
                        </div>
                    </div>
                </section>

                {/* 5. VISION & MISSION */}
                <section className={SECTION_SPACING}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="p-12 rounded-[48px] bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,1)] transition-transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--brand-navy)] opacity-10 group-hover:opacity-100 transition-opacity" />
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--brand-navy)]/5 rounded text-[var(--brand-navy)] text-[10px] font-black uppercase tracking-widest mb-6">Vision</div>
                                <h3 className="text-[30px] font-black text-slate-900 mb-6 leading-tight tracking-tight">To be a global leader in IT innovation, driving transformative solutions.</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    Driving solutions that empower businesses, enhance efficiency, and shape a secure, sustainable digital future for everyone.
                                </p>
                            </div>
                            <div className="p-12 rounded-[48px] bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,1)] transition-transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-2 h-full bg-[var(--brand-accent)] opacity-10 group-hover:opacity-100 transition-opacity" />
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--brand-accent-soft)] rounded text-[var(--brand-accent)] text-[10px] font-black uppercase tracking-widest mb-6">Mission</div>
                                <h3 className="text-[30px] font-black text-slate-900 mb-6 leading-tight tracking-tight">Delivering cutting-edge solutions that empower business.</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    Helping organizations to innovate, adapt, and excel in a dynamic digital landscape, fostering growth through technology and expertise.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CORE VALUES */}
                <section className={`${SECTION_SPACING} bg-[var(--card-surface-secondary)]`}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="mb-16">
                            <div className="text-[10px] font-black text-[var(--brand-accent)] uppercase tracking-[0.3em] mb-4">Our DNA</div>
                            <h2 className="text-[36px] md:text-[44px] font-black text-slate-900 tracking-tight leading-none">Core Values</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <ValueCard idx={0} icon={Shield} title="Integrity" desc="Integrity in every engagement. We prioritize transparency and ethics above all else." />
                            <ValueCard idx={1} icon={Lightbulb} title="Innovation" desc="Innovation as a way of life. Constantly evolving our tactics to stay ahead of adversaries." />
                            <ValueCard idx={2} icon={Users} title="Customer-Centricity" desc="Security outcomes aligned to real business goals, not just technical checkboxes." />
                            <ValueCard idx={3} icon={Award} title="Excellence" desc="Execution driven by deep technical expertise and a commitment to meticulous quality." />
                        </div>
                    </div>
                </section>


                {/* 8. GLOBAL PRESENCE SECTION */}
                <section className={`${SECTION_SPACING} bg-[var(--bg-services)] border-t border-black/5`}>
                    <div className={CONTAINER_WIDTH}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

                            {/* LEFT: HQ + Locations */}
                            <div className="flex flex-col h-full">
                                <div className="inline-block px-4 py-1.5 bg-[var(--brand-accent-soft)] rounded-sm text-[10px] font-bold text-[var(--brand-accent)] tracking-widest uppercase mb-4 w-fit">
                                    Infrastructure
                                </div>
                                <h2 className="text-[36px] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                                    Global <span className="text-[var(--brand-accent)]">Presence</span>
                                </h2>
                                <p className="text-[14px] text-slate-500 font-medium max-w-md mb-8 leading-relaxed">
                                    Strategic operations distributed across key technology corridors for localized response and global coverage.
                                </p>

                                {/* HQ Information (Minimal Style) */}
                                <div
                                    className="p-6 mb-4 flex items-center gap-5 transition-colors hover:bg-white/50"
                                    style={{
                                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--brand-navy)]/5 flex items-center justify-center shrink-0">
                                        <Building2 className="w-7 h-7 text-[var(--brand-navy)]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Nashik — Headquarters</h3>
                                            <span className="px-2 py-0.5 bg-[var(--brand-navy)]/10 text-[var(--brand-navy)] text-[9px] font-black rounded tracking-widest uppercase shrink-0">HQ</span>
                                        </div>
                                        <p className="text-[13px] text-slate-500 font-medium">
                                            #1, State Bank Colony, Indira Nagar, Maharashtra – 422009
                                        </p>
                                    </div>
                                </div>

                                {/* Satellite locations */}
                                <div className="grid grid-cols-3 gap-4 mb-auto pt-4">
                                    {[
                                        { city: 'Mumbai', label: 'Operations', icon: Building2, color: 'var(--brand-accent)' },
                                        { city: 'Bengaluru', label: 'Engineering', icon: Target, color: 'var(--brand-navy)' },
                                        { city: 'Dallas', label: 'Americas', icon: Wifi, color: 'var(--brand-accent)' },
                                    ].map((loc) => (
                                        <div
                                            key={loc.city}
                                            className="p-4 flex flex-col items-center text-center gap-2 border-r last:border-0 border-black/5"
                                        >
                                            <loc.icon className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: loc.color }} />
                                            <div>
                                                <div className="text-[14px] font-black text-slate-900 tracking-tight">{loc.city}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{loc.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: Map Overlay */}
                            <div className="relative min-h-[400px] flex">
                                <div className="flex-1 overflow-hidden" style={{
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    borderRadius: '32px',
                                    boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)',
                                    border: '1px solid rgba(0,0,0,0.02)'
                                }}>
                                    <WorldMap
                                        lineColor="#7A0F2A"
                                        dots={officeConnections}
                                    />

                                    <div className="absolute bottom-8 right-8 flex items-center gap-6 z-20">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#7A0F2A]" />
                                            <span className="text-[10px] font-black text-[#888] uppercase tracking-wider">Operational Hubs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 9. FINAL CTA (Dark Gradient) */}
                <section className="relative w-full overflow-hidden"
                    style={{
                        paddingTop: '80px',
                        paddingBottom: '80px',
                        backgroundColor: '#7A0F2A',
                        background: 'var(--cta-bg)'
                    }}
                >
                    <div className="max-w-7xl relative z-10 mx-auto px-8 lg:px-12 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-3xl">
                                Build Resilient <br />
                                <span style={{ color: 'var(--brand-accent)' }}>Security</span> Foundations
                            </h2>
                            <p className="text-xl md:text-2xl text-white/80 mb-14 max-w-2xl font-medium leading-relaxed">
                                Engage with our experts to assess your current posture and strengthen your defense strategy.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[#FFFFFF] text-[var(--brand-accent)] hover:bg-[#F8F9FA] hover:scale-105 active:scale-95 font-black uppercase tracking-widest text-[14px] rounded-lg transition-all shadow-2xl shadow-black/40"
                                >
                                    Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
