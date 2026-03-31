import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { themeConfig, COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS, ALPHAS, GRADIENTS } from '../config/themeConfig';
import SectionHeader from './SectionHeader';

export default function Testimonials() {
    const testimonials = [
        {
            quote: "Working with Quasar CyberTech has been an excellent experience. Their team demonstrated deep expertise and professionalism throughout the project, helping us identify and mitigate critical vulnerabilities while strengthening our overall security posture. The actionable insights, clear communication, and collaborative approach made the process smooth and effective. We highly recommend Quasar CyberTech to any organization looking to enhance their cyber resilience.",
            name: 'Co-founder',
            role: 'Health Care Sector',
            initials: 'CH'
        },
        {
            quote: "We engaged Quasar CyberTech Pvt Ltd to conduct a comprehensive security assessment, including Vulnerability Assessment & Penetration Testing (VAPT), Application Security Testing, Configuration Audit of Network Infrastructure with Database Security Review. Their team demonstrated a deep understanding of cybersecurity principles and industry best practices. The assessments were thorough, clearly documented, and tailored to our business needs. Their findings and recommendations were not only insightful but also actionable, helping us significantly enhance our overall security posture.",
            name: 'Senior Director - IT',
            role: 'Manufacturing Sector',
            initials: 'SM'
        }
    ];

    return (
        <section
            className="relative z-[20] overflow-hidden w-full transition-colors duration-700"
            style={{
                background: '#FFFFFF',
                padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                {/* ─── Standardized Header for Light Section ─── */}
                <SectionHeader 
                    isDark={false}
                    title="Trusted by"
                    highlight="Enterprise Leaders"
                    suffix={<><br />Across Industries</>}
                    highlightColor={COLORS.burgundy}
                    maxWidth="740px"
                />

                {/* ─── Grid ─── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: LAYOUT_CONTROLS.grid.capabilityGap,
                }}>
                    {testimonials.map((testimonial, idx) => {
                        const [isHovered, setIsHovered] = useState(false);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`relative px-8 py-8 flex flex-col group transition-all duration-500 overflow-hidden ${idx === 0 ? 'md:rounded-l-none md:rounded-r-[40px]' : 'md:rounded-r-none md:rounded-l-[40px]'} rounded-[32px] md:rounded-y-none`}
                                style={{
                                    border: `1px solid rgba(0,0,0,0.05)`,
                                    background: '#FFFFFF',
                                    minHeight: '260px',
                                    boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
                                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                }}
                            >
                                {/* Sharp Vertical Accent Line */}
                                <div
                                    className="absolute top-0 bottom-0 w-[5px] transition-colors duration-500"
                                    style={{
                                        background: COLORS.gold,
                                        left: idx === 0 ? '0' : 'auto',
                                        right: idx === 1 ? '0' : 'auto'
                                    }}
                                />

                                <div className="mb-8 relative">
                                    <Quote 
                                        className="w-10 h-10 transition-colors duration-500" 
                                        style={{ color: COLORS.gold }} 
                                        fill="currentColor" 
                                        fillOpacity={0.15} 
                                    />
                                </div>

                                <p className="text-[14.5px] leading-relaxed mb-8 flex-grow font-medium italic transition-opacity text-justify px-2"
                                    style={{
                                        color: '#0B1F3B',
                                        opacity: isHovered ? 1 : 0.9
                                    }}
                                >
                                    "{testimonial.quote}"
                                </p>

                                {/* Author Block */}
                                <div
                                    className="flex items-center gap-4 mt-auto p-4 rounded-xl transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered ? 'rgba(214, 176, 92, 0.05)' : 'rgba(0,0,0,0.02)',
                                        border: `1px solid rgba(0,0,0,0.05)`,
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <span 
                                            className="text-[15px] font-black transition-colors duration-300"
                                            style={{ color: COLORS.burgundy }}
                                        >
                                            {testimonial.name}
                                        </span>
                                        <span 
                                            className="text-[12px] font-bold uppercase tracking-wider transition-colors duration-300"
                                            style={{ color: '#5A6478' }}
                                        >
                                            {testimonial.role}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
