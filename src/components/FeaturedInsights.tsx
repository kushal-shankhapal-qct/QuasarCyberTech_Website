import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

import qPulseLogoImg from '../assets/Logos/QPulse_Logo_No_Buffer.png';
import qPulseScreenshot from '../assets/logos copy/Platforms/QPulse_New.png';

// Blog Images
import blogImgThreats from '../config/Blogs_Images/Top Cybersecurity Threats Businesses Should Watch Out for in 2025.png';
import blogImgAI from '../config/Blogs_Images/AI in Cybersecurity_A Powerful Ally or a Looming Threat.png';
import blogImgMoneygram from '../config/Blogs_Images/Moneygram Suffers Data Breach, Exposing Customer Information.png';

const insights = [
    {
        title: 'Top Cybersecurity Threats Businesses Should Watch Out for in 2025',
        category: 'Threat Intelligence',
        date: 'Jan 2025',
        type: 'threat', 
        href: '/resources/blogs',
        image: blogImgThreats
    },
    {
        title: 'AI in Cybersecurity: A Powerful Ally or a Looming Threat?',
        category: 'Technology & AI',
        date: 'Feb 2025',
        type: 'tech', 
        href: '/resources/blogs',
        image: blogImgAI
    },
    {
        title: 'Moneygram Suffers Data Breach, Exposing Customer Information',
        category: 'Advisory & Risk',
        date: 'Dec 2024',
        type: 'advisory', 
        href: '/resources/blogs',
        image: blogImgMoneygram
    },
    {
        title: 'The Future of Cloud Security: Zero Trust Architectures',
        category: 'Cloud Security',
        date: 'Mar 2025',
        type: 'tech',
        href: '/resources/blogs',
        image: blogImgAI 
    }
];

export default function FeaturedInsights() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // Scroll by one card width (380px) + gap (32px)
            const scrollAmount = 380 + 32;
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section
            style={{
                background: GRADIENTS.DARK_SECTION_BG_INSIGHTS,
                padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                {/* Section header */}
                <div style={{ marginBottom: '48px' }}>
                    <h2 style={{ 
                        color: COLORS.textOnDark, 
                        fontWeight: 900, 
                        fontSize: 'clamp(32px, 5vw, 48px)', 
                        lineHeight: 1.1, 
                        marginBottom: '10px',
                        fontFamily: TYPOGRAPHY.fontHeading 
                    }}>
                        <span style={{ color: COLORS.gold }}>Cybersecurity</span> Insights & Research
                    </h2>
                    <p style={{ color: COLORS.textMuted, fontSize: '16px', maxWidth: '560px', marginTop: '12px', lineHeight: 1.6 }}>
                        Curated intelligence, research insights, and security perspectives 
                        from the QuasarCyberTech ecosystem.
                    </p>
                </div>

                {/* Expanded QPulse Feature Section */}
                <div style={{
                    border: `1px solid rgba(214,176,92,0.2)`,
                    borderTop: `3px solid ${COLORS.gold}`,
                    borderRadius: '0 0 16px 16px',
                    background: 'rgba(11,31,59,0.4)',
                    padding: '48px',
                    marginBottom: '64px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '40px',
                    flexWrap: 'wrap',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ flex: '1', minWidth: '300px', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <img src={qPulseLogoImg} alt="QPulse" style={{ height: '44px', width: 'auto' }} />
                            <div style={{ width: '1px', height: '24px', background: 'rgba(214,176,92,0.3)' }} />
                            <div style={{
                                color: COLORS.gold,
                                fontSize: '1.4rem', 
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                                fontFamily: TYPOGRAPHY.fontHeading,
                            }}>
                                QPulse
                            </div>
                        </div>
                        
                        <h3 style={{ 
                          color: '#FFFFFF', 
                          fontSize: '24px', 
                          fontWeight: 800, 
                          marginBottom: '16px',
                          lineHeight: 1.2
                        }}>
                          Live Threat Intelligence & <br/> Security Advisories
                        </h3>

                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '15.5px',
                            lineHeight: 1.7,
                            maxWidth: '520px',
                            marginBottom: '32px',
                        }}>
                            QPulse is QuasarCyberTech's dedicated cybersecurity research engine. 
                            We publish curated threat analysis, high-impact vulnerability advisories, 
                            and strategic industry insights to keep your enterprise ahead of evolving risks. 
                            Real-time intelligence feed integration is coming soon.
                        </p>

                        <a
                            href="https://qpulse.quasarcybertech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: COLORS.gold,
                                color: '#0B1F3B',
                                borderRadius: '4px',
                                padding: '14px 28px',
                                fontSize: '13.5px',
                                fontWeight: 800,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#E5C16C'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = COLORS.gold; }}
                        >
                            Visit QPulse Portal ↗
                        </a>
                    </div>

                    <div style={{ flex: '1.2', minWidth: '360px', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                        <img src={qPulseScreenshot} alt="QPulse Screenshot" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9 }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,59,0.4), transparent)' }} />
                    </div>
                </div>

                {/* Divider label with Scroll Controls */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '32px',
                }}>
                    <span style={{
                        color: COLORS.textMuted,
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                    }}>
                        Latest Blog Articles
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => scroll('left')} style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={() => scroll('right')} style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Carousel Area (Draggable removed per request) */}
                <div 
                    ref={scrollRef}
                    style={{ 
                        display: 'flex', 
                        gap: '32px',
                        overflowX: 'auto',
                        paddingBottom: '24px',
                        paddingTop: '12px', // Added padding to prevent hover cutoff
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                    className="no-scrollbar"
                >
                    {insights.map((item, idx) => {
                        const [isHovered, setIsHovered] = useState(false);
                        const tint = item.type === 'threat' 
                            ? 'rgba(107,21,48,0.4)' 
                            : item.type === 'tech' 
                                 ? 'rgba(43,196,182,0.12)' 
                                 : 'rgba(214,176,92,0.12)';
                        
                        const defaultAccent = COLORS.gold;
                        const hoverAccent = COLORS.burgundy;

                        return (
                            <motion.div 
                                key={idx}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                // whileHover={{ y: -8 }} // Removed per request to avoid accent cutoff
                                style={{
                                    minWidth: '380px',
                                    borderRadius: '0 0 16px 16px',
                                    borderTop: `4px solid ${isHovered ? hoverAccent : defaultAccent}`,
                                    background: 'rgba(255,255,255,0.04)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.2)',
                                    flexShrink: 0,
                                    transition: 'all 0.3s ease',
                                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' // Subtle lift that respects border
                                }}
                            >
                                <div style={{ 
                                    height: '214px', 
                                    background: `linear-gradient(135deg, ${tint} 0%, rgba(4,11,29,0.95) 100%)`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {item.image ? (
                                      <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        style={{ 
                                          width: '100%', 
                                          height: '100%', 
                                          objectFit: 'cover',
                                          opacity: 0.85
                                        }} 
                                      />
                                    ) : (
                                      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    )}
                                </div>

                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ ...TYPOGRAPHY.eyebrow, color: isHovered ? hoverAccent : defaultAccent, fontSize: '10px', marginBottom: '12px', transition: 'color 0.3s ease' }}>
                                        {item.category}
                                    </div>
                                    <h3 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '18px', marginBottom: '14px', lineHeight: 1.35 }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ ...TYPOGRAPHY.bodySmall, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>
                                        Technical deep-dives and security perspectives from our internal expert team.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div style={{ color: COLORS.gold, fontSize: '11px', fontWeight: 600 }}>{item.date}</div>
                                        <Link to={item.href} style={{ color: COLORS.gold, fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Read Full Blog <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', width: '100%' }}>
                    <a href="/insights" style={{
                        background: COLORS.burgundy,
                        color: '#fff',
                        padding: '14px 34px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#8B1E3F'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = COLORS.burgundy; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        Explore All Insights →
                    </a>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}
