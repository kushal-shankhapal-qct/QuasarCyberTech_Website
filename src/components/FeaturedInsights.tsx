import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { themeConfig } from '../config/themeConfig';

const insightsVars = themeConfig.insights;

export default function FeaturedInsights() {
    const insights = [
        {
            title: 'Emerging Cloud Attack Patterns in 2026',
            category: 'Research',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        },
        {
            title: 'Zero Trust Architecture: Implementation Lessons',
            category: 'Architecture',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        },
        {
            title: 'Modern Red Teaming in Hybrid Environments',
            category: 'Offensive Security',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
    };

    return (
        <section
            className="relative overflow-hidden"
            style={{
                paddingTop: '100px', // Reduced top whitespace
                paddingBottom: '120px',
                backgroundColor: 'var(--bg-blog)',
                color: 'var(--text-primary)'
            }}
        >
            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8" style={{ marginTop: 'var(--research-heading-margin-top)' }}>
                    <div className="text-left">
                        <h2 className="text-[40px] md:text-[52px] font-[800] leading-[1.1] text-black mb-4 tracking-tight">
                            <span style={{ color: 'var(--brand-accent)' }}>Security</span> Research <br />
                            & Intelligence
                        </h2>
                        <p className="text-[var(--text-muted)] text-[15px] max-w-xl font-medium leading-relaxed opacity-80">
                            Proprietary analysis on emerging threat vectors, zero-day research, and architectural defense.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-[var(--brand-accent-soft)] flex items-center justify-center hover:bg-black/5 transition-all group scale-90"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform opacity-60 text-[var(--brand-accent)]" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-[var(--brand-accent-soft)] flex items-center justify-center hover:bg-black/5 transition-all group scale-90"
                        >
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-60 text-[var(--brand-accent)]" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-visible pb-12">
                    <div className="flex gap-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{ transform: `translateX(-${currentIndex * 35}%)` }}>
                        {insights.map((item, idx) => (
                            <div key={idx}
                                className={`w-[280px] md:w-[340px] group flex flex-col bg-[var(--blog-card-surface)] rounded-[var(--blog-card-radius)] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] shrink-0 mb-4`} // Added margin bottom for shadow room
                                style={{ borderLeft: '4px solid #7A0F2A' }}
                            >
                                <div className="w-full max-w-full aspect-[16/9] overflow-hidden bg-[#0A0A0A] relative shrink-0"> {/* Width constraints prevent aspect explosion */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-6 flex flex-col flex-1" style={{ minHeight: '180px' }}> {/* Controlled padding */}
                                    <div className="text-[10px] font-black text-[var(--brand-accent)] tracking-[3px] uppercase mb-2">
                                        {item.category}
                                    </div>
                                    <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-4 leading-tight group-hover:text-[var(--brand-accent)] transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <div className="mt-auto pb-2">
                                        <Link
                                            to={item.href}
                                            className="inline-flex items-center text-[var(--text-primary)] font-bold text-[12px] uppercase tracking-widest group-hover:text-[var(--brand-accent)] transition-colors"
                                        >
                                            <span className="relative">
                                                Read Research
                                                <span className="absolute bottom-[-2px] left-0 w-6 h-[2px] bg-[var(--brand-accent)] group-hover:w-full transition-all duration-300" />
                                            </span>
                                            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
