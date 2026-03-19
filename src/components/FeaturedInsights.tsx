import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionEyebrow from './shared/SectionEyebrow';
import { themeConfig, GRADIENTS, COLORS, SECTION_BACKGROUNDS } from '../config/themeConfig';
import Button from './ui/Button';

export default function FeaturedInsights() {
    const config = themeConfig.insights;
    const insights = [
        {
            title: 'Top Cybersecurity Threats Businesses Should Watch Out for in 2025',
            category: 'Cyber Security',
            href: '/resources/blogs'
        },
        {
            title: 'AI in Cybersecurity: A Powerful Ally or a Looming Threat?',
            category: 'Blogs & Articles',
            href: '/resources/blogs'
        },
        {
            title: 'A Glance On The Evolution Of Information and Communication Technology – Part 1',
            category: 'Technology',
            href: '/resources/blogs'
        },
        {
            title: 'Staff Augmentation vs. Traditional Hiring: Which Is Right for Your Business?',
            category: 'Staff Augmentation',
            href: '/resources/blogs'
        },
        {
            title: 'Moneygram Suffers Data Breach, Exposing Customer Information',
            category: 'Advisory',
            href: '/resources/blogs'
        },
        {
            title: 'Data Leak of Star Health & Allied Insurance',
            category: 'Cyber Security',
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
                background: '#040B1D',
                paddingTop: '100px',
                paddingBottom: '100px'
            }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" />

            <div
                className="max-w-[1440px] relative z-10 mx-auto"
                style={{
                    paddingLeft: themeConfig.global.sectionMarginLeft || '4rem',
                    paddingRight: themeConfig.global.sectionMarginRight || '4rem',
                }}
            >
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 relative">
                    <div className="text-left relative">

                        <div style={{ marginLeft: '0rem', paddingTop: '10px' }}>
                            <h2 className="font-black leading-[1.05] mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-heading)', fontSize: themeConfig.global.sectionTitleSize || '44px', color: '#FFFFFF' }}>
                                <span style={{ color: '#FFFFFF' }}>Cybersecurity</span>{' '}
                                <span style={{ color: '#D6B05C' }}>Insights</span>
                                <br /> & Research
                            </h2>
                            <p className="text-[15px] max-w-lg font-medium leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)' }}>
                                Curated intelligence, research insights, and security perspectives from the QuasarCyberTech ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-2">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center hover:bg-[#F8F9FA] transition-all group shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform text-[#6B1530]" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center hover:bg-[#F8F9FA] transition-all group shadow-sm"
                        >
                            <ArrowRight className="w-5 h-5 transition-transform text-[#6B1530]" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-visible pb-8">
                    <div className="flex gap-6 transition-all duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
                        style={{ transform: `translateX(-${currentIndex * (100 / insights.length)}%)` }}>
                        {insights.map((item, idx) => (
                            <div key={idx}
                                className="w-[260px] md:w-[320px] relative group flex flex-col transition-all duration-500 hover:translate-y-[-8px] shrink-0"
                                style={{
                                    borderRadius: '0 0 16px 16px',
                                    borderTop: '3px solid #2BC4B6',
                                    background: 'rgba(255,255,255,0.04)',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Image zone - 160px tall */}
                                <div className="w-full relative shrink-0" style={{ height: '160px', background: 'linear-gradient(135deg, #0B1F3B 0%, #0d2844 100%)' }}>
                                    {/* Hex grid pattern */}
                                    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    {/* QPulse badge */}
                                    <div className="absolute top-4 left-4" style={{ background: 'rgba(43,196,182,0.15)', padding: '4px 12px', borderRadius: '4px' }}>
                                        <span style={{ color: '#2BC4B6', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>QPulse</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div
                                        className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                                        style={{ color: '#8B949E' }}
                                    >
                                        {item.category}
                                    </div>
                                    <h3 className="text-[16px] font-bold text-white mb-3 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: '#8B949E', fontSize: '13px', lineHeight: 1.5, marginBottom: '12px' }} className="line-clamp-2">
                                        Security insights and analysis from QPulse.
                                    </p>
                                    <div style={{ color: '#D6B05C', fontSize: '11px', marginBottom: '12px' }}>
                                        Dec 2024
                                    </div>
                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                                        <Link to={item.href} className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                            <span style={{ color: '#2BC4B6', fontSize: '12px', fontWeight: 600 }}>Read on QPulse →</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
