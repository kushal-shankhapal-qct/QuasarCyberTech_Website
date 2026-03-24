import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionHeader from '../../components/SectionHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS, SHADOWS } from '../../config/themeConfig';
import { blogsData } from '../../data/blogsData';

import { ASSETS } from '@/constants/assets';

export default function Blogs() {
    const [activeCategory, setActiveCategory] = useState('All Posts');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const categories = ['All Posts', 'Advisory', 'Blogs & Articles', 'Cyber Security', 'Staff Augmentation', 'Technology'];

    const filteredPosts = activeCategory === 'All Posts' 
        ? blogsData 
        : blogsData.filter(post => post.category === activeCategory);

    return (
        <div style={{ background: '#040B1D', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <Header />

            <main>
                {/* ─── HERO SECTION ─── */}
                <section style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    background: GRADIENTS.HERO_BG,
                    padding: `0 2.5rem 120px`,
                    overflow: 'hidden'
                }}>
                    {/* Visual Background Element */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                        animate={{ opacity: 0.07, rotate: 0, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            right: '-5%',
                            top: '10%',
                            width: '600px',
                            height: '600px',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    >
                        <img 
                            src={ASSETS.logos.qct.icon} 
                            alt="" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                filter: 'brightness(0) invert(1)' 
                            }} 
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ maxWidth: '800px', zIndex: 10 }}
                    >
                        <h1 style={{ ...TYPOGRAPHY.heroTitle, color: COLORS.textOnDark, marginBottom: '24px' }}>
                            Blogs
                        </h1>
                        <p style={{ ...TYPOGRAPHY.bodyLarge, color: 'rgba(255,255,255,0.7)', maxWidth: '600px' }}>
                            Expert analysis on emerging threats, defensive engineering patterns, and the future of enterprise cybersecurity.
                        </p>
                    </motion.div>
                </section>

                {/* ─── BLOG FEED SECTION ─── */}
                <section style={{ background: '#FFFFFF', padding: '120px 2.5rem' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        
                        {/* Categories Bar */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '80px', overflowX: 'auto', paddingBottom: '10px' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '100px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        border: activeCategory === cat ? `1px solid ${COLORS.burgundy}` : '1px solid rgba(0,0,0,0.1)',
                                        background: activeCategory === cat ? COLORS.burgundy : 'transparent',
                                        color: activeCategory === cat ? '#FFFFFF' : '#475569',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPosts.map((post, i) => {
                                const [isHovered, setIsHovered] = React.useState(false);
                                return (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        style={{
                                            background: '#FFFFFF',
                                            borderRadius: '0 0 16px 16px',
                                            overflow: 'hidden',
                                            borderTop: `4px solid ${isHovered ? COLORS.burgundy : COLORS.gold}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.05)',
                                            transition: 'all 0.3s ease',
                                            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
                                        }}
                                    >
                                        {/* Thumbnail Area */}
                                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#F8FAFC' }}>
                                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                                            <div style={{ position: 'absolute', top: '20px', left: '20px', background: COLORS.burgundy, color: '#FFFFFF', padding: '4px 12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {post.category}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <div style={{ color: isHovered ? COLORS.burgundy : COLORS.gold, fontSize: '10px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
                                                {post.category}
                                            </div>
                                            
                                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', lineHeight: 1.35 }}>{post.title}</h2>
                                            <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>{post.excerpt}</p>
                                            
                                            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ color: COLORS.gold, fontSize: '11px', fontWeight: 700 }}>{post.date}</div>
                                                <Link to={`/blogs/${post.id}`} style={{ color: COLORS.burgundy, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none' }}>
                                                    Read Full Blog <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
