import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { blogsData } from '../data/blogsData';

const insights = blogsData.slice(0, 5).map(b => ({
    id: b.id,
    title: b.title,
    category: b.category,
    date: b.date,
    type: b.category.toLowerCase().includes('advisory') ? 'advisory' : 
          b.category.toLowerCase().includes('tech') ? 'tech' : 'threat',
    href: `/blogs/${b.id}`,
    image: b.image
}));

export default function FeaturedInsights() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

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
                background: GRADIENTS.HOME_INSIGHTS_BG,
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
                    <p style={{ ...TYPOGRAPHY.bodyLarge, color: 'rgba(255,255,255,0.78)', maxWidth: '760px', margin: '0', lineHeight: '1.7', textAlign: 'justify' }}>
                        Curated intelligence, research insights, and security perspectives 
                        from the QuasarCyberTech ecosystem.
                    </p>
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
                        const isHovered = hoveredCardId === item.id;
                        const tint = item.type === 'threat' 
                            ? 'rgba(107,21,48,0.4)' 
                            : item.type === 'tech' 
                                 ? 'rgba(43,196,182,0.12)' 
                                 : 'rgba(214,176,92,0.12)';
                        
                        const defaultAccent = COLORS.gold;
                        const hoverAccent = COLORS.burgundy;

                        return (
                            <Link
                                key={idx}
                                to={item.href}
                                onMouseEnter={() => setHoveredCardId(item.id)}
                                onMouseLeave={() => setHoveredCardId(null)}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                            <motion.div
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
                                        loading="lazy"
                                        decoding="async"
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
                                        <span style={{ color: COLORS.gold, fontSize: '12px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Read Full Blog <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px', width: '100%' }}>
                    <Link to="/blogs" style={{
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
                        Explore All Blogs →
                    </Link>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}
