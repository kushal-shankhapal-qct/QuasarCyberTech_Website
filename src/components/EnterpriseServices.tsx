import React from 'react';
import { Link } from 'react-router-dom';
import {
    Code, Cloud, Target, Shield, ArrowRight, ArrowLeft
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import { themeConfig } from '../config/themeConfig';

/* ───────── ADJUSTABLE VARIABLES ───────── */
const CARD_BORDER_RADIUS = themeConfig.services.mainCardRadius || '24px';  // right-side rounding
const IMAGE_ASPECT = '16/10';
const CTA_MARGIN_BOTTOM = '40px';  // space below the "View All Services" button
const SECTION_PADDING_TOP = '100px';
const SECTION_PADDING_BOTTOM = '60px';  // tighter bottom

export default function EnterpriseServices() {
    const services = [
        {
            title: 'Application Security',
            desc: 'Secure SDLC, code review, API testing, and DevSecOps integration for modern application stacks.',
            href: '/services/application-security',
            Icon: Code,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'
        },
        {
            title: 'Cloud Security',
            desc: 'Cloud configuration audits, IAM review, container security, and multi-cloud posture management.',
            href: '/services/cloud-security',
            Icon: Cloud,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'
        },
        {
            title: 'Red Team & Adversary Simulation',
            desc: 'Advanced attack emulation, breach simulation, and adversarial threat modeling.',
            href: '/services/red-team-adversary-simulation',
            Icon: Target,
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop'
        },
        {
            title: 'Managed Security Operations',
            desc: 'Continuous monitoring, SOC support, detection engineering, and 24x7 incident coverage.',
            href: '/services/managed-security-operations',
            Icon: Shield,
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop'
        }
    ];

    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);

    return (
        <section
            className="relative"
            style={{ paddingTop: SECTION_PADDING_TOP, paddingBottom: SECTION_PADDING_BOTTOM, backgroundColor: 'var(--bg-services)' }}
        >
            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
                    .services-swiper {
                        cursor: grab;
                        overflow: visible !important;
                    }
                    .services-swiper:active {
                        cursor: grabbing;
                    }
                `}</style>

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="text-left">
                        <h2 className="text-[40px] md:text-[52px] font-[800] leading-[1.1] text-black mb-4 tracking-tight">
                            Enterprise <br />
                            <span style={{ color: 'var(--brand-accent)' }}>Security</span> Services
                        </h2>
                        <p className="text-[var(--text-muted)] text-[15px] max-w-xl font-medium leading-relaxed opacity-90">
                            Engineering resilience across applications, infrastructure, and digital ecosystems.
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

                <div className="relative mb-12">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={themeConfig.services.carousel.gap}
                        slidesPerView="auto"
                        loop={true}
                        speed={themeConfig.services.carousel.speed}
                        autoplay={{
                            delay: 6000,
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
                        className="services-swiper"
                    >
                        {services.map((service, idx) => (
                            <SwiperSlide key={idx} style={{ width: 'auto' }}>
                                <Link
                                    to={service.href}
                                    className="group flex flex-col overflow-hidden transition-all duration-300 w-[280px] md:w-[305px] h-full mb-4"
                                    style={{
                                        backgroundColor: `rgba(${themeConfig.services.clay.bgColor}, ${themeConfig.services.clay.bgOpacity})`,
                                        backdropFilter: `blur(${themeConfig.services.clay.blur})`,
                                        WebkitBackdropFilter: `blur(${themeConfig.services.clay.blur})`,
                                        boxShadow: `${themeConfig.services.clay.innerShadow}, ${themeConfig.services.clay.shadow}`,
                                        borderRadius: `0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS} 0`,
                                        borderLeft: '4px solid var(--brand-accent)',
                                    }}
                                >
                                    <div className="w-full overflow-hidden bg-[#0A0A0A] relative shrink-0" style={{ aspectRatio: IMAGE_ASPECT }}>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-[var(--brand-accent)] transition-colors tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-[var(--text-muted)] text-[13px] leading-relaxed line-clamp-3 font-medium opacity-90 mb-4">
                                            {service.desc}
                                        </p>
                                        <div className="mt-auto">
                                            <span className="inline-flex items-center text-[var(--brand-accent)] font-bold text-[12px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                                Learn More <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* See All Services CTA */}
                <div className="flex justify-center" style={{ marginTop: CTA_MARGIN_BOTTOM }}>
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] font-bold tracking-widest text-[13px] uppercase rounded-xl hover:bg-[var(--brand-accent)] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        View All Services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
