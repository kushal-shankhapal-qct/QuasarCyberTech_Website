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
            const { scrollLeft } = scrollRef.current;
            // Scroll by one card width (23.75rem) + gap (2rem)
            const scrollAmount = (23.75 + 2) * 16; 
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section
            style={{
                background: GRADIENTS.HOME_INSIGHTS_BG,
                padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.global.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                {/* Section header */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ 
                        color: COLORS.textOnDark, 
                        fontWeight: 900, 
                        fontSize: 'clamp(2rem, 5vw, 3rem)', 
                        lineHeight: 1.1, 
                        marginBottom: '0.625rem',
                        fontFamily: TYPOGRAPHY.fontHeading 
                    }}>
                        <span style={{ color: COLORS.gold }}>Cybersecurity</span> Insights & Research
                    </h2>
                    <p 
                        className="insights-intro"
                        style={{ ...TYPOGRAPHY.bodyLarge, color: 'rgba(255,255,255,0.78)', maxWidth: '47.5rem', margin: '0', lineHeight: '1.7', textAlign: 'justify' }}
                    >
                        Curated intelligence, research insights, and security perspectives 
                        from the QuasarCyberTech ecosystem.
                    </p>
                </div>

                {/* Divider label with Scroll Controls */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    <span style={{
                        color: COLORS.textMuted,
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                    }}>
                        Latest Insights
                    </span>
                    <div style={{ flex: 1, height: '0.0625rem', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => scroll('left')} style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '0.0625rem solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={() => scroll('right')} style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '0.0625rem solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Carousel Area (Draggable removed per request) */}
                <div 
                    ref={scrollRef}
                    style={{ 
                        display: 'flex', 
                        gap: '2rem',
                        overflowX: 'auto',
                        paddingBottom: '1.5rem',
                        paddingTop: '0.75rem', 
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
                                    minWidth: '23.75rem',
                                    borderRadius: '0 0 1rem 1rem',
                                    borderTop: `0.25rem solid ${isHovered ? hoverAccent : defaultAccent}`,
                                    background: 'rgba(255,255,255,0.04)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: isHovered ? '0 1.25rem 3.75rem rgba(0,0,0,0.4)' : '0 1.25rem 2.5rem rgba(0,0,0,0.2)',
                                    flexShrink: 0,
                                    transition: 'all 0.3s ease',
                                    transform: isHovered ? 'translateY(-0.25rem)' : 'translateY(0)'
                                }}
                            >
                                <div style={{ 
                                    height: '13.375rem', 
                                    background: `linear-gradient(135deg, ${tint} 0%, rgba(4,11,29,0.95) 100%)`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {item.image ? (
                                      <img 
                                        src={item.image} 
                                        alt={`QuasarCyberTech | ${item.title}`} 
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
                                      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 0.0625rem, transparent 0.0625rem)', backgroundSize: '1.25rem 1.25rem' }} />
                                    )}
                                </div>

                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ ...TYPOGRAPHY.eyebrow, color: isHovered ? hoverAccent : defaultAccent, fontSize: '0.625rem', marginBottom: '0.75rem', transition: 'color 0.3s ease' }}>
                                        {item.category}
                                    </div>
                                    <h3 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '1.125rem', marginBottom: '0.875rem', lineHeight: 1.35 }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ ...TYPOGRAPHY.bodySmall, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                        Technical deep-dives and security perspectives from our internal expert team.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div style={{ color: COLORS.gold, fontSize: '0.6875rem', fontWeight: 600 }}>{item.date}</div>
                                        <span style={{ color: COLORS.gold, fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', width: '100%' }}>
                    <Link to="/blogs" style={{
                        background: COLORS.burgundy,
                        color: '#fff',
                        padding: '0.875rem 2.125rem',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderRadius: '0.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#8B1E3F'; e.currentTarget.style.transform = 'translateY(-0.125rem)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = COLORS.burgundy; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        Explore All Blogs →
                    </Link>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              
              @media (max-width: 768px) {
                .insights-intro {
                  display: none !important;
                }
              }
            `}} />
        </section>
    );
}
