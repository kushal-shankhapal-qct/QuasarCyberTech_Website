import React from 'react';
import { motion } from 'framer-motion';
import SectionEyebrow from './shared/SectionEyebrow';
import { themeConfig, GRADIENTS, COLORS } from '../config/themeConfig';

export default function LeadershipVision() {
    return (
        <section 
            className="relative py-[120px] overflow-hidden"
            style={{ 
                background: '#F5F7FA',
                paddingTop: themeConfig.global.verticalSpacing,
                paddingBottom: themeConfig.global.verticalSpacing 
            }}
        >
            <div 
                className="max-w-[1440px] relative z-10 mx-auto"
                style={{
                    paddingLeft: themeConfig.global.sectionMarginLeft || '4rem',
                    paddingRight: themeConfig.global.sectionMarginRight || '4rem',
                }}
            >
                {/* Section Header */}
                <div className="mb-20 text-left relative">

                    <div style={{ marginLeft: '0rem', paddingTop: '10px' }}>
                        <h2 
                            className="mt-6 font-black tracking-tight"
                            style={{ 
                                fontFamily: 'var(--font-heading)',
                                fontSize: themeConfig.global.sectionTitleSize || '44px',
                                color: COLORS.deepCyberBlue,
                                lineHeight: '1.05',
                                marginBottom: '15px',
                            }}
                        >
                            Building the Future of <br />
                            <span style={{ color: '#2BC4B6' }}>Cybersecurity</span> Engineering
                        </h2>
                    </div>
                </div>

                {/* Founder Vision Block */}
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Founder Photo Placeholder - Book Page Style */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[40%] relative overflow-hidden"
                        style={{
                            width: '320px',
                            height: '380px',
                            borderRadius: '0 0 24px 24px',
                            borderTop: '4px solid #2BC4B6',
                            background: 'linear-gradient(135deg, #0B1F3B 0%, #1a3560 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        {/* Placeholder initials */}
                        <span style={{ color: '#2BC4B6', fontSize: '48px', fontWeight: 900 }}>QCT</span>
                        <div className="absolute bottom-6 left-6 z-20">
                            <h4 style={{ color: '#0B1F3B', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Founder Name</h4>
                            <p style={{ color: '#6B1530', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Founder & CEO</p>
                        </div>
                    </motion.div>

                    {/* Vision Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[60%]"
                    >
                        {/* Eyebrow label */}
                        <p style={{ color: '#2BC4B6', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                            Leadership & Vision
                        </p>
                        <blockquote 
                            className="text-[24px] md:text-[32px] font-bold leading-tight mb-8"
                            style={{ fontFamily: 'var(--font-heading)', color: '#0B1F3B', borderLeft: '4px solid #6B1530', paddingLeft: '20px', fontStyle: 'italic' }}
                        >
                            "Our mission is to engineer high-resilience security ecosystems that empower enterprises to innovate without fear."
                        </blockquote>
                        <div className="space-y-6 text-[16px] leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-body)', color: '#5A6478' }}>
                            <p>
                                QuasarCyberTech was founded on the principle that cybersecurity should be an engineering discipline, not just a defensive posture. In an era of rapid digital evolution, we believe in building security that scales with your ambition.
                            </p>
                            <p>
                                From our signature SECURE framework to our evolving platform ecosystem, every solution we deliver is designed to provide continuous visibility, accelerated remediation, and unwavering governance for the modern enterprise.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
