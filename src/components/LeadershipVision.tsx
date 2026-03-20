import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { themeConfig, GRADIENTS, COLORS, SECTION_BACKGROUNDS, ALPHAS, TYPOGRAPHY } from '../config/themeConfig';
import SectionHeader from './SectionHeader';

export default function LeadershipVision() {
    return (
        <section 
            style={{ 
                background: SECTION_BACKGROUNDS.LIGHT,
                padding: '120px 2em',
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                <SectionHeader 
                    title="BUILDING THE FUTURE OF"
                    highlight="CYBERSECURITY"
                    suffix="ENGINEERING"
                    highlightColor={COLORS.teal}
                    subtitle="QuasarCyberTech is led by a vision to transform cybersecurity from a defensive posture into a proactive engineering discipline."
                    maxWidth="760px"
                />


                <div className="flex flex-col lg:flex-row gap-20 items-start mt-12">
                    {/* ─── PLACEMENT 7: FOUNDER PHOTO PLACEHOLDER ─── */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            width: '280px',
                            height: '320px',
                            background: `linear-gradient(160deg, ${COLORS.deepCyberBlue} 0%, rgba(20,10,18,0.95) 100%)`,
                            borderRadius: '0 0 24px 24px',
                            borderTop: `3px solid ${COLORS.burgundy}`,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                            flexShrink: 0
                        }}
                    >
                        {/* Foreground: name placeholder */}
                        <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                            <div style={{
                                width: '100px', height: '100px',
                                borderRadius: '50%',
                                background: 'rgba(43,196,182,0.1)',
                                border: `2px solid ${ALPHAS.teal20}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}>
                                <User size={48} color={COLORS.teal} strokeWidth={1} style={{ opacity: 0.5 }} />
                            </div>
                            <p style={{ ...TYPOGRAPHY.metricLabel, color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                                FOUNDER PHOTOGRAPH
                            </p>
                        </div>
                        
                        {/* Scrim at bottom for name overlay */}
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          height: '100px',
                          background: 'linear-gradient(transparent, rgba(4,11,29,0.95))',
                          display: 'flex', alignItems: 'flex-end',
                          padding: '0 32px 24px',
                          zIndex: 2
                        }}>
                          <div>
                            <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.teal, fontSize: '11px', marginBottom: '4px' }}>
                              Founder & CEO
                            </p>
                            <h4 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '20px', margin: 0 }}>
                                Professional Headshot
                            </h4>
                          </div>
                        </div>
                    </motion.div>

                    {/* Vision Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <blockquote 
                            style={{ 
                                ...TYPOGRAPHY.pageTitle,
                                fontFamily: TYPOGRAPHY.fontHeading, 
                                color: COLORS.deepCyberBlue, 
                                borderLeft: `6px solid ${COLORS.burgundy}`, 
                                paddingLeft: '32px', 
                                fontStyle: 'italic',
                                fontSize: 'clamp(24px, 2.5vw, 32px)',
                                fontWeight: 800,
                                lineHeight: 1.3,
                                marginBottom: '48px'
                            }}
                        >
                            "Our mission is to engineer high-resilience security ecosystems that empower enterprises to innovate without fear."
                        </blockquote>
                        <div style={{ 
                            ...TYPOGRAPHY.bodyLarge,
                            color: COLORS.textSub,
                            maxWidth: '640px'
                        }}>
                            <p style={{ marginBottom: '24px' }}>
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
