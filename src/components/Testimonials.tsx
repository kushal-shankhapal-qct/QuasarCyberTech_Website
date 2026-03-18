import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionEyebrow from './shared/SectionEyebrow';
import { themeConfig, COLORS, SECTION_BACKGROUNDS } from '../config/themeConfig';

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
                background: SECTION_BACKGROUNDS.LIGHT,
                paddingTop: `calc(${themeConfig.global.verticalSpacing} * 0.5)`,
                paddingBottom: themeConfig.global.verticalSpacing
            }}
        >


            <div 
                className="max-w-[1440px] mx-auto relative z-10"
                style={{
                    paddingLeft: themeConfig.global.sectionMarginLeft || '4rem',
                    paddingRight: themeConfig.global.sectionMarginRight || '4rem',
                }}
            >
                <div className="text-left mb-16 relative">
                    <SectionEyebrow
                        text="WHAT OUR CLIENTS SAY"
                        noBox
                        className="absolute -top-[10px]"
                        style={{ left: '0rem' }}
                    />
                    <div style={{ marginLeft: '2.5rem', paddingTop: '10px' }}>
                        <h2
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                fontSize: themeConfig.global.sectionTitleSize || '40px',
                                color: COLORS.deepCyberBlue,
                                lineHeight: themeConfig.global.sectionTitleLineHeight || '1.1',
                                marginBottom: '12px',
                            }}
                        >
                            Trusted by <span style={{ color: COLORS.burgundy }}>Enterprise Leaders</span><br />
                            Across Industries
                        </h2>
                    </div>
                </div>

                <div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    style={{
                        paddingLeft: themeConfig.global.contentMarginLeft || '6.5rem',
                        paddingRight: themeConfig.global.sectionMarginRight || '4rem',
                    }}
                >
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className={`relative px-8 py-6 flex flex-col bg-white group transition-all duration-700 overflow-hidden rounded-[32px] md:rounded-y-none ${idx === 0 ? 'md:rounded-l-none md:rounded-r-[40px]' : 'md:rounded-r-none md:rounded-l-[40px]'}`}
                            style={{
                                border: '1px solid rgba(0,0,0,0.06)',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f6f6f7 100%)',
                                minHeight: '240px',
                                boxShadow: themeConfig.global.unifiedShadows?.cardSoft || '0 10px 30px rgba(0,0,0,0.06)',
                            }}
                        >
                             {/* Sharp Vertical Accent Line (Left for card 0, Right for card 1) */}
                            <div
                                className="absolute top-0 bottom-0 w-[5px] transition-all duration-500"
                                style={{
                                    background: COLORS.teal,
                                    left: idx === 0 ? '0' : 'auto',
                                    right: idx === 1 ? '0' : 'auto'
                                }}
                            />

                            <div className="mb-6 relative">
                                <Quote className="w-10 h-10" style={{ color: COLORS.teal }} fill="currentColor" fillOpacity={0.15} />
                            </div>

                            <p className="text-[14.5px] text-[#4A4A5A] leading-relaxed mb-5 flex-grow font-medium italic opacity-90 group-hover:opacity-100 transition-opacity text-justify px-2">
                                "{testimonial.quote}"
                            </p>

                            <div
                                className="flex items-center gap-4 mt-auto p-4 rounded-xl transition-all duration-300"
                                style={{
                                    backgroundColor: '#F8F9FA',
                                    border: '1px solid rgba(0,0,0,0.03)',
                                    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.7)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.8)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.7)';
                                }}
                            >
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-black text-[#0A0A0F] group-hover:text-[#6B1530] transition-colors">{testimonial.name}</span>
                                    <span className="text-[12px] font-bold text-[#6B1530] uppercase tracking-wider">{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
