import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import { themeConfig } from '../config/themeConfig';

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
        },
        {
            title: 'Quantum-Resistant Cryptography Strategies',
            category: 'Intelligence',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        }
    ];

    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);

    return (
        <section
            className="relative overflow-hidden"
            style={{
                paddingTop: '80px',
                paddingBottom: '80px',
                backgroundColor: 'var(--bg-blog)',
                color: 'var(--text-primary)'
            }}
        >
            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
                    .insights-swiper {
                        cursor: grab;
                        overflow: visible !important;
                    }
                    .insights-swiper:active {
                        cursor: grabbing;
                    }
                `}</style>

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
                            ref={prevRef}
                            className="w-12 h-12 rounded-full border border-[var(--brand-accent-soft)] flex items-center justify-center hover:bg-black/5 transition-all group scale-90"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform opacity-60 text-[var(--brand-accent)]" />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-12 h-12 rounded-full border border-[var(--brand-accent-soft)] flex items-center justify-center hover:bg-black/5 transition-all group scale-90"
                        >
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-60 text-[var(--brand-accent)]" />
                        </button>
                    </div>
                </div>

                <div className="relative pb-12">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={themeConfig.insights.carousel.gap}
                        slidesPerView="auto"
                        loop={true}
                        speed={themeConfig.insights.carousel.speed}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        className="insights-swiper"
                    >
                        {insights.map((item, idx) => (
                            <SwiperSlide key={idx} style={{ width: 'auto' }}>
                                <div
                                    className={`w-[260px] md:w-[320px] group flex flex-col overflow-hidden transition-all duration-500 hover:scale-[1.02] shrink-0 mb-4 h-full`}
                                    style={{
                                        borderTop: '4px solid var(--brand-accent)',
                                        borderRadius: themeConfig.insights.cardRadius || '24px',
                                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                        boxShadow: '0 20px 50px -15px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                    }}
                                >
                                    <div className="w-full max-w-full aspect-[16/10] overflow-hidden bg-[#0A0A0A] relative shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1" style={{ minHeight: '160px' }}>
                                        <div className="text-[10px] font-black text-[var(--brand-accent)] tracking-[3px] uppercase mb-2">
                                            {item.category}
                                        </div>
                                        <h3 className="text-[18px] font-bold text-white mb-4 leading-tight group-hover:text-[var(--brand-accent)] transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <div className="mt-auto pb-2">
                                            <Link
                                                to={item.href}
                                                className="inline-flex items-center text-slate-300 font-bold text-[12px] uppercase tracking-widest group-hover:text-[var(--brand-accent)] transition-colors"
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
