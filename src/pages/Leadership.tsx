import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Trophy, Handshake, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

const values = [
    { icon: Target, title: 'Integrity', desc: 'Integrity in every engagement.' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Innovation as a way of life.' },
    { icon: Users, title: 'Customer-Centricity', desc: 'Customer-Centricity in all solutions.' },
    { icon: Trophy, title: 'Excellence', desc: 'Excellence through expertise.' },
    { icon: Handshake, title: 'Collaboration', desc: 'Collaboration for greater impact.' }
];

export default function Leadership() {
    return (
        <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
            <Header />

            <main>
                {/* 1. HERO SECTION (Dark System) */}
                <section
                    style={{
                        position: 'relative',
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        background: GRADIENTS.HERO_BG,
                        overflow: 'hidden',
                        paddingLeft: '2.5em',
                        paddingRight: '2.0em',
                        paddingBottom: '3em',
                        paddingTop: '0em',
                        fontFamily: TYPOGRAPHY.fontBody,
                    }}
                >
                    {/* Breadcrumbs */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'absolute',
                        top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY})`,
                        left: `calc(${LAYOUT_CONTROLS.breadcrumbs.left} + ${LAYOUT_CONTROLS.breadcrumbs.offsetX})`,
                        fontSize: '12px',
                        fontFamily: TYPOGRAPHY.fontBody,
                        zIndex: 10,
                    }}>
                        <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Leadership & Vision</span>
                    </div>

                    <div style={{ maxWidth: '720px', position: 'relative', zIndex: 10 }}>
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
                            Led by <span style={{ color: COLORS.gold }}>Vision</span>,<br />
                            Driven by Resilience
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            style={{
                                ...TYPOGRAPHY.bodyLarge,
                                color: 'rgba(255,255,255,0.76)',
                                textAlign: 'left',
                                maxWidth: '50%', // Restricted to 50%
                                marginBottom: '42px',
                                lineHeight: 1.8
                            }}
                        >
                            QuasarCyberTech is guided by a commitment to transform cybersecurity from a defensive posture into a proactive engineering discipline. We build for the future, ensuring your enterprise scales securely.
                        </motion.p>
                    </div>
                </section>

                {/* 2. VISION & MISSION (Light) */}
                <section style={{ 
                    background: '#FFFFFF', 
                    padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <div style={{ color: COLORS.burgundy, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Vision</div>
                                <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.deepCyberBlue, marginBottom: '24px', fontSize: '2.5rem' }}>A Secure, Sustainable Digital Future</h2>
                                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#475569' }}>
                                    "To be a global leader in IT innovation, driving transformative solutions that empower businesses, enhance efficiency, and shape a secure, sustainable digital future for everyone."
                                </p>
                            </div>
                            <div>
                                <div style={{ color: COLORS.burgundy, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Mission</div>
                                <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.deepCyberBlue, marginBottom: '24px', fontSize: '2.5rem' }}>Empowering Enterprise Growth</h2>
                                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#475569' }}>
                                    "To deliver cutting-edge IT solutions and services that empower businesses to innovate, adapt, and excel in a dynamic digital landscape, fostering growth through technology, expertise, and collaboration."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. CORE VALUES GRID (Dark Rhythm) */}
                <section style={{ 
                    background: GRADIENTS.HERO_BG, 
                    padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <SectionHeader 
                            title="Our Core"
                            highlight="Values"
                            isDark={true}
                            subtitle="The principles that define our engagement and engineering culture."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
                            {values.map((v, i) => (
                                <div key={i} style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '32px', 
                                    borderRadius: '4px', 
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                >
                                    <v.icon size={28} color={COLORS.gold} style={{ marginBottom: '20px' }} />
                                    <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>{v.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EXECUTIVE LEADERSHIP (Homepage Sync) */}
                <section style={{ 
                    background: '#FFFFFF', 
                    padding: `120px ${LAYOUT_CONTROLS.section.paddingX}`,
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                            {/* Founder Card Sync */}
                            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                                <div style={{ 
                                    background: `linear-gradient(160deg, ${COLORS.deepCyberBlue} 0%, rgba(20,10,18,0.95) 100%)`,
                                    borderRadius: '0 0 24px 24px',
                                    borderTop: `5px solid ${COLORS.burgundy}`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                }}>
                                    <img src="/src/assets/Kishor_Sir.png" alt="Founder" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        height: '100px',
                                        background: 'linear-gradient(transparent, rgba(4,11,29,0.95))',
                                        display: 'flex', alignItems: 'flex-end',
                                        padding: '0 32px 24px',
                                        zIndex: 2
                                    }}>
                                        <div>
                                            <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.burgundy, fontSize: '11px', marginBottom: '4px' }}>Founder & CEO</p>
                                            <h4 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '20px', margin: 0 }}>Kishor Sonawane</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 items-start">
                                <blockquote style={{ 
                                    fontFamily: TYPOGRAPHY.fontHeading,
                                    color: COLORS.deepCyberBlue,
                                    borderLeft: `6px solid ${COLORS.burgundy}`,
                                    paddingLeft: '32px',
                                    fontStyle: 'italic',
                                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                                    fontWeight: 800,
                                    lineHeight: 1.3,
                                    marginBottom: '40px'
                                }}>
                                    "Our mission is to engineer high-resilience security ecosystems that empower enterprises to innovate without fear."
                                </blockquote>
                                <div style={{ color: '#64748B', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    <p style={{ marginBottom: '24px' }}>
                                        QuasarCyberTech was founded on the principle that cybersecurity should be an engineering discipline, not just a defensive posture. In an era of rapid digital evolution, we believe in building security that scales with your ambition.
                                    </p>
                                    <p>
                                        From our signature SECURE framework to our evolving platform ecosystem, every solution we deliver is designed to provide continuous visibility, accelerated remediation, and unwavering governance for the modern enterprise.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. FINAL CTA (Standardized) */}
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
                            <span style={{ color: COLORS.burgundy }}>Build</span> the Secure Future <br />
                            with QuasarCyberTech
                        </h2>

                        <p
                            className="mb-14 max-w-2xl font-medium leading-relaxed"
                            style={{
                                fontFamily: TYPOGRAPHY.fontBody,
                                fontSize: '18px',
                                color: 'rgba(8, 16, 38, 0.7)',
                            }}
                        >
                            Partner with our leadership to assess your current posture and strengthen your core defense strategy.
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
                                    Connect with Leadership
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
