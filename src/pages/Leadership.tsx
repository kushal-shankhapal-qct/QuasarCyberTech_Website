import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Trophy, Handshake, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';

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
                {/* 1. HERO SECTION (Homepage System Match) */}
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
                        paddingRight: '2em',
                        paddingBottom: '3em',
                        paddingTop: '0em',
                        fontFamily: TYPOGRAPHY.fontBody,
                    }}
                >
                    {/* Visual Asset (Absolute Right - Consistent with Home) */}
                    <div style={{
                        position: 'absolute',
                        right: '-12%', // Moved more right to prevent overlap and blurring issues
                        top: '0',
                        width: '60%', // Slightly wider to ensure coverage
                        height: '100vh',
                        zIndex: 1,
                        overflow: 'hidden',
                        maskImage: `
                            linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.7) 50%, black 80%),
                            linear-gradient(to bottom, transparent 0%, black 15%)
                        `,
                        WebkitMaskImage: `
                            linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.7) 50%, black 80%),
                            linear-gradient(to bottom, transparent 0%, black 15%)
                        `,
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                    }}>
                        <img 
                            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                            alt="Leadership" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'brightness(0.9)' }} 
                        />
                    </div>

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
                        zIndex: 20,
                    }}>
                        <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Leadership & Vision</span>
                    </div>                    <div style={{ maxWidth: '840px', position: 'relative', zIndex: 10 }}>
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
                            Visionary <span style={{ color: COLORS.gold }}>Leadership</span><br />
                            for the Future
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
                                    <img src={ASSETS.founder.kishor} alt="Founder" style={{ width: '100%', height: 'auto', display: 'block' }} />
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

                {/* 5. FINAL CTA (Standardized Dark) */}
                <CTASection 
                    theme="dark"
                    title="Connect with Leadership"
                    subtitle="Engage with our executive team to discuss strategic security partnerships and organizational resilience."
                    primaryAction={{ label: 'Request an Executive Briefing', link: '/contact' }}
                    secondaryAction={{ label: 'Explore Our Methodology', link: '/capabilities' }}
                    showMetrics={false}
                />

            </main>
            <Footer />
        </div>
    );
}
