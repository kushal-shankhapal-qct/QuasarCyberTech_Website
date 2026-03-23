import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, GRADIENTS, TYPOGRAPHY } from '../config/themeConfig';
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
                background: GRADIENTS.DARK_SECTION_BG_INSIGHTS,
                padding: '120px 2em',
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                {/* Change 1 — Section header */}
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

                {/* Change 2 — QPulse placeholder zone (add ABOVE existing cards) */}
                <div style={{
                    border: `1px solid rgba(43,196,182,0.2)`,
                    borderTop: `3px solid ${COLORS.gold}`,
                    borderRadius: '0 0 16px 16px',
                    background: 'rgba(43,196,182,0.03)',
                    padding: '32px',
                    marginBottom: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                }}>
                    {/* Left: QPulse branding + description */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{
                                background: 'rgba(43,196,182,0.12)',
                                border: `1px solid rgba(43,196,182,0.3)`,
                                color: COLORS.gold,
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '4px 12px',
                                borderRadius: '4px',
                            }}>
                                QPulse
                            </span>
                            <span style={{ color: COLORS.textMuted, fontSize: '12px' }}>
                                Live Intelligence Feed
                            </span>
                        </div>
                        <p style={{
                            color: 'rgba(255,255,255,0.55)',
                            fontSize: '14px',
                            lineHeight: 1.6,
                            maxWidth: '480px',
                            margin: 0,
                        }}>
                            QPulse is QuasarCyberTech's cybersecurity intelligence portal — 
                            publishing curated threat analysis, vulnerability advisories, and 
                            industry insights. Live feed integration coming soon.
                        </p>
                    </div>

                    {/* Right: CTA to QPulse */}
                    <a
                        href="https://qpulse.quasarcybertech.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'transparent',
                            color: COLORS.gold,
                            border: `1px solid rgba(214,176,92,0.4)`,
                            borderTop: `2px solid ${COLORS.gold}`,
                            borderRadius: '0 0 8px 8px',
                            padding: '12px 24px',
                            fontSize: '13px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                        }}
                    >
                        Visit QPulse Portal ↗
                    </a>
                </div>

                {/* Change 3 — Divider label */}
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
                        Featured Articles
                    </span>
                    <div style={{
                        flex: 1,
                        height: '1px',
                        background: 'rgba(255,255,255,0.08)',
                    }} />
                </div>

                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '32px',
                    }}
                >
                    {insights.map((item, idx) => {
                        const tint = item.type === 'threat' 
                            ? 'rgba(107,21,48,0.4)' 
                            : item.type === 'tech' 
                                ? 'rgba(43,196,182,0.12)' 
                                : 'rgba(214,176,92,0.12)';
                        
                        // Default to gold top border. Burgundy on hover.
                        const defaultAccent = COLORS.gold;

                        return (
                            <div key={idx}
                                style={{
                                    borderRadius: '0 0 16px 16px',
                                    borderTop: `3px solid ${defaultAccent}`,
                                    background: 'rgba(255,255,255,0.04)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease, border-top-color 0.3s ease',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.borderTopColor = COLORS.burgundy;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderTopColor = defaultAccent;
                                }}
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
                                    <div style={{ ...TYPOGRAPHY.eyebrow, color: defaultAccent, fontSize: '10px', marginBottom: '12px' }}>
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
                                        <Link to={item.href} style={{ color: COLORS.gold, fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Read on QPulse <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Change 4 — Standard CTA below cards */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '48px',
                    width: '100%'
                }}>
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
                        transition: 'background 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#8B1E3F';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = COLORS.burgundy;
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                        Explore All Insights →
                    </a>
                </div>
            </div>
        </section>
    );
}
