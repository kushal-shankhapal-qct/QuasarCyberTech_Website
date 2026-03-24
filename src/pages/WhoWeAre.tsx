import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Compass, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import WorldMap from '../components/ui/world-map';
import TrustIndicators from '../components/TrustIndicators';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

/* ───────── WORLD MAP DATA ───────── */
const officeConnections = [
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 19.0760, lng: 72.8777 } },
    { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 12.9716, lng: 77.5946 } },
    { start: { lat: 19.9975, lng: 73.7898, label: 'hq' }, end: { lat: 32.7767, lng: -96.7970, label: 'client' } },
    { start: { lat: 19.9975, lng: 73.7898, label: 'hq' }, end: { lat: 51.5074, lng: -0.1278, label: 'client' } },
];

export default function WhoWeAre() {
    return (
        <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
            <Header />

            <main>
                {/* 1. HERO SECTION (Homepage System Match) */}
                <section
                    style={{
                        position: 'relative',
                        minHeight: '100vh',
                        display: 'grid',
                        gridTemplateColumns: '52% 48%',
                        alignItems: 'end',
                        background: GRADIENTS.HERO_BG,
                        overflow: 'hidden',
                        fontFamily: TYPOGRAPHY.fontBody,
                    }}
                >
                    {/* Breadcrumbs - Positioned relative to section */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'absolute',
                        top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY})`,
                        left: `calc(${LAYOUT_CONTROLS.breadcrumbs.left} + ${LAYOUT_CONTROLS.breadcrumbs.offsetX})`,
                        fontSize: '12px',
                        fontFamily: TYPOGRAPHY.fontBody,
                        zIndex: 20,
                    }}>
                        <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>About Us</span>
                    </div>

                    {/* Left Column (Text Content) */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        paddingLeft: '2.5em',
                        paddingBottom: '3em',
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{
                                ...TYPOGRAPHY.heroTitle,
                                fontFamily: TYPOGRAPHY.fontHeading,
                                color: COLORS.textOnDark,
                                marginBottom: '28px',
                                lineHeight: 1.05
                            }}
                        >
                            Engineering <span style={{ color: COLORS.gold }}>Security</span><br />
                            at Enterprise Scale
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            style={{
                                ...TYPOGRAPHY.bodyLarge,
                                color: 'rgba(255,255,255,0.76)',
                                textAlign: 'left',
                                maxWidth: '100%',
                                marginBottom: '42px',
                                lineHeight: 1.8
                            }}
                        >
                            QuasarCyberTech is a cybersecurity engineering firm delivering high-resilience security ecosystems across applications, cloud environments, and enterprise infrastructure. We build security into the architecture not on top of it.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}
                        >
                            <Link
                                to="/capabilities"
                                style={{
                                    ...TYPOGRAPHY.buttonLarge,
                                    background: COLORS.burgundy,
                                    color: '#FFFFFF',
                                    border: '1px solid transparent',
                                    borderRadius: '4px',
                                    padding: '14px 34px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Explore Capabilities
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column (Visual) */}
                    <div style={{
                        position: 'relative',
                        height: '100vh',
                        maskImage: `
                            linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
                            linear-gradient(to bottom, transparent 0%, black 15%)
                        `,
                        WebkitMaskImage: `
                            linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
                            linear-gradient(to bottom, transparent 0%, black 15%)
                        `,
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                    }}>
                        <img
                            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                            alt="About High-resilience Security"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.8,
                                filter: 'brightness(0.9)'
                            }}
                        />
                    </div>
                </section>


                {/* 2. COMPANY OVERVIEW (Standardized) */}
                <section style={{
                    background: '#FFFFFF',
                    padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'flex-start' }}>
                            <div style={{ gridColumn: 'span 7' }}>
                                <SectionHeader
                                    title="Who We"
                                    highlight="Are"
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '10px' }}>
                                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569', fontWeight: 500 }}>
                                        Founded on the principles of engineering excellence and adversary-driven defense, QuasarCyberTech provides the technical depth needed to secure modern digital enterprises.
                                    </p>
                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#64748B' }}>
                                        We move beyond traditional 'checkbox' security. Our approach is rooted in deep technical validation and architecture-first security design. Whether we are red-teaming critical infrastructure or engineering cloud-native defense systems, our goal remains constant: to build resilience that scales.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                gridColumn: 'span 5',
                                background: '#F8FAFC',
                                border: '1px solid rgba(0,0,0,0.05)',
                                borderRadius: '4px',
                                padding: '48px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.02)'
                            }}>
                                <h3 style={{ ...TYPOGRAPHY.cardTitle, color: COLORS.deepCyberBlue, marginBottom: '28px', fontSize: '1.25rem' }}>Our DNA</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {[
                                        { icon: Target, title: "Threat Modeling First", text: "We map attack paths before we recommend defenses." },
                                        { icon: Compass, title: "Engineering Focus", text: "Built for architecture-level resilience, not just compliance." },
                                        { icon: Shield, title: "Continuous Validation", text: "Security posture reflected in telemetry, not static snapshots." }
                                    ].map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'rgba(107,21,48,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <item.icon size={20} color={COLORS.burgundy} />
                                            </div>
                                            <div>
                                                <div style={{ color: '#0B1F3B', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{item.title}</div>
                                                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metrics Bar - Homepage Sync */}
                        <div style={{ marginTop: '100px', paddingTop: '60px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            <TrustIndicators isDark={false} />
                        </div>
                    </div>
                </section>

                {/* 3. GLOBAL PRESENCE (Dark Section with Map) */}
                <section style={{
                    background: GRADIENTS.HERO_BG,
                    padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                        <SectionHeader
                            title="Global"
                            highlight="Presence"
                            isDark={true}
                            subtitle="Strategic operations distributed across key technology corridors for localized response and global coverage."
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12 items-center">
                            {/* HQ & Locations */}
                            <div className="lg:col-span-4">
                                <div style={{
                                    borderLeft: `3px solid ${COLORS.burgundy}`,
                                    padding: '24px 32px',
                                    background: 'rgba(255,255,255,0.02)',
                                    marginBottom: '32px'
                                }}>
                                    <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Nashik — Headquarters</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        #1, State Bank Colony, Indira Nagar, Maharashtra – 422009
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { city: 'Mumbai', role: 'Security Operations' },
                                        { city: 'Bengaluru', role: 'Engineering Hub' },
                                        { city: 'Dallas', role: 'US Operations' }
                                    ].map((loc, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <div style={{ width: '8px', height: '8px', background: COLORS.gold, borderRadius: '50%' }} />
                                            <div>
                                                <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{loc.city}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{loc.role}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* World Map */}
                            <div className="lg:col-span-8" style={{ minHeight: '400px', position: 'relative' }}>
                                <WorldMap
                                    dots={officeConnections}
                                    lineColor={COLORS.gold}
                                    secondaryLineColor={COLORS.burgundy}
                                    dotColor="rgba(255,255,255,0.18)" // Brightened base dots
                                />
                                
                                {/* Map Legend */}
                                <div style={{ 
                                    position: 'absolute', 
                                    bottom: '0', 
                                    right: '20px', 
                                    display: 'flex', 
                                    gap: '24px', 
                                    background: 'rgba(0,0,0,0.3)', 
                                    padding: '12px 20px', 
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(8px)',
                                    zIndex: 20
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '10px', height: '10px', background: COLORS.gold, borderRadius: '50%', boxShadow: `0 0 10px ${COLORS.gold}` }} />
                                        <span style={{ color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Office Locations</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '100%', maxWidth: '10px', height: '10px', background: COLORS.burgundy, borderRadius: '50%', boxShadow: `0 0 10px ${COLORS.burgundy}` }} />
                                        <span style={{ color: '#FFFFFF', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enterprise Clients</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FINAL CTA (Standardized) */}
                <section className="relative overflow-hidden text-left"
                    style={{
                        background: '#F8FAFC',
                        paddingTop: LAYOUT_CONTROLS.section.paddingTop,
                        paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        fontFamily: TYPOGRAPHY.fontBody
                    }}>

                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6B1530 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="w-full relative z-10"
                        style={{
                            paddingLeft: '2.5em',
                            paddingRight: '2.5em',
                        }}>

                        <h2
                            className="font-[900] mb-8 tracking-tighter leading-[1.05] max-w-4xl"
                            style={{
                                fontFamily: TYPOGRAPHY.fontHeading,
                                fontSize: ' clamp(36px, 6vw, 56px)',
                                color: COLORS.deepCyberBlue,
                            }}
                        >
                            <span style={{ color: COLORS.burgundy }}>Build</span> Resilient <br />
                            Security Foundations
                        </h2>

                        <p
                            className="mb-14 max-w-2xl font-medium leading-relaxed"
                            style={{
                                fontFamily: TYPOGRAPHY.fontBody,
                                fontSize: '18px',
                                color: 'rgba(8, 16, 38, 0.7)',
                            }}
                        >
                            Engage with our experts to assess your current posture and strengthen your defense strategy.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                            <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: COLORS.burgundy,
                                    color: '#FFFFFF',
                                    padding: '16px 40px',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 16px rgba(107, 21, 48, 0.2)',
                                    transition: 'all 0.3s ease',
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#8B1F40';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(107, 21, 48, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = COLORS.burgundy;
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(107, 21, 48, 0.2)';
                                    }}
                                >
                                    Talk to a Security Expert
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
