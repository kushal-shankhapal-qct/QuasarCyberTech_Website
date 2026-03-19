import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';
import SectionHeader from './SectionHeader';

const insights = [
    {
        title: 'Top Cybersecurity Threats Businesses Should Watch Out for in 2025',
        category: 'Threat Intelligence',
        date: 'Jan 2025',
        type: 'threat', // burgundy
        href: '/resources/blogs'
    },
    {
        title: 'AI in Cybersecurity: A Powerful Ally or a Looming Threat?',
        category: 'Technology & AI',
        date: 'Feb 2025',
        type: 'tech', // teal
        href: '/resources/blogs'
    },
    {
        title: 'Moneygram Suffers Data Breach, Exposing Customer Information',
        category: 'Advisory & Risk',
        date: 'Dec 2024',
        type: 'advisory', // gold
        href: '/resources/blogs'
    }
];

export default function FeaturedInsights() {
    return (
        <section
            style={{
                background: SECTION_BACKGROUNDS.DARK,
                padding: '120px max(24px, calc((100vw - 1200px) / 2))',
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="max-w-[1200px] mx-auto">
                <SectionHeader 
                    isDark 
                    eyebrow="RESOURCES & RESEARCH"
                    title="CYBERSECURITY"
                    highlight="INSIGHTS & RESEARCH"
                    subtitle="Curated intelligence, research insights, and security perspectives from the QuasarCyberTech ecosystem."
                    maxWidth="740px"
                />

                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '32px',
                        marginTop: '48px'
                    }}
                >
                    {insights.map((item, idx) => {
                        // Color tints based on type
                        const tint = item.type === 'threat' 
                            ? 'rgba(107,21,48,0.4)' 
                            : item.type === 'tech' 
                                ? 'rgba(43,196,182,0.12)' 
                                : 'rgba(214,176,92,0.12)';
                        
                        const accent = item.type === 'threat' 
                            ? COLORS.burgundy 
                            : item.type === 'tech' 
                                ? COLORS.teal 
                                : COLORS.gold;

                        return (
                            <div key={idx}
                                style={{
                                    borderRadius: '0 0 16px 16px',
                                    borderTop: `3px solid ${accent}`,
                                    background: 'rgba(255,255,255,0.04)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {/* Image zone - different color temperature per card */}
                                <div style={{ 
                                    height: '180px', 
                                    background: `linear-gradient(135deg, ${tint} 0%, rgba(4,11,29,0.95) 100%)`,
                                    position: 'relative'
                                }}>
                                    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    
                                    {/* QPulse badge */}
                                    <div className="absolute top-4 left-4" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <span style={{ ...TYPOGRAPHY.eyebrow, fontSize: '9px', color: '#FFFFFF' }}>QPulse Insights</span>
                                    </div>
                                </div>

                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ ...TYPOGRAPHY.eyebrow, color: accent, fontSize: '10px', marginBottom: '12px' }}>
                                        {item.category}
                                    </div>
                                    <h3 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '18px', marginBottom: '14px', lineHeight: 1.35 }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ ...TYPOGRAPHY.bodySmall, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>
                                        Strategic analysis and technical insights from the QPulse intelligence engine.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div style={{ color: COLORS.gold, fontSize: '11px', fontWeight: 600 }}>{item.date}</div>
                                        <Link to={item.href} style={{ color: COLORS.teal, fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Read on QPulse <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
