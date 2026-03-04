import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { themeConfig } from '../config/themeConfig';

/* ───────── ADJUSTABLE VARIABLES ───────── */
const SECTION_PADDING_TOP = '60px';
const SECTION_PADDING_BOTTOM = '100px';
// Hardcoded to guarantee exact match with CTA section
const TESTIMONIAL_BG = 'var(--cta-bg)';  // radial-gradient from styles.css: #3d0715 → #070B19 → #03050A

export default function Testimonials() {
    const testimonials = [
        {
            quote: "QuasarCyberTech profoundly transformed our security posture across the Healthcare Sector. By identifying critical vulnerabilities and executing rigorous Application Security Testing, they prevented potentially disastrous breaches before they occurred.",
            name: 'Healthcare Partner',
            role: 'Co-Founder, Top Tier Hospital Group',
            initials: 'HP'
        },
        {
            quote: "When standardizing our manufacturing ICS networks, QuasarCyberTech's proactive engagement and outcome-oriented approach minimized downtime completely. Their deep alignment with industry standards ensured our supply chain remained fully protected.",
            name: 'Manufacturing Director',
            role: 'Senior Director, Global Manufacturing Firm',
            initials: 'MD'
        }
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{
                paddingTop: SECTION_PADDING_TOP,
                paddingBottom: SECTION_PADDING_BOTTOM,
                background: TESTIMONIAL_BG,
            }}
        >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-[40px] md:text-[52px] font-[800] leading-[1.1] text-white mb-4 tracking-tight">
                        What Our <br />
                        <span className="text-white/70">Clients</span> Say
                    </h2>
                    <p className="text-white/60 text-[15px] max-w-2xl font-medium leading-relaxed">
                        Trusted by enterprise leaders across industries for measurable security outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="relative p-10 flex flex-col"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)',
                                borderRadius: `0 ${themeConfig.industry.cardRadius || '32px'} ${themeConfig.industry.cardRadius || '32px'} 0`,
                                borderLeft: '4px solid var(--brand-accent)',
                            }}
                        >
                            <div className="mb-6">
                                <Quote className="w-8 h-8 text-white/30" />
                            </div>

                            <p className="text-[16px] text-white/80 leading-relaxed mb-8 flex-grow font-medium">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                                <div className="w-[48px] h-[48px] rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                    <span className="text-[13px] font-black text-white/80">{testimonial.initials}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-white">{testimonial.name}</span>
                                    <span className="text-[13px] font-medium text-white/50">{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
