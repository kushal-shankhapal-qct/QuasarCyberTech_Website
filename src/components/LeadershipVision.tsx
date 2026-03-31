import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { themeConfig, GRADIENTS, COLORS, SECTION_BACKGROUNDS, ALPHAS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import SectionHeader from './SectionHeader';

export default function LeadershipVision({ isDark = false }: { isDark?: boolean }) {
    return (
        <section
            style={{
                background: isDark ? GRADIENTS.HERO_BG : SECTION_BACKGROUNDS.LIGHT,
                padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
                overflow: 'hidden',
                fontFamily: TYPOGRAPHY.fontBody
            }}
        >
            <div className="w-full">
                <SectionHeader
                    title="BUILDING THE FUTURE OF"
                    highlight="CYBERSECURITY"
                    suffix="ENGINEERING"
                    isDark={isDark}
                    highlightColor={isDark ? COLORS.gold : COLORS.burgundy}
                    subtitle="QuasarCyberTech is led by a vision to transform cybersecurity from a defensive posture into a proactive engineering discipline."
                    maxWidth="760px"
                />


                <div className="flex flex-col lg:flex-row gap-16 lg:items-stretch mt-12">
                    {/* ─── LEFT: FOUNDER COLUMN ─── */}
                    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                flex: 1,
                                background: `linear-gradient(160deg, ${COLORS.deepCyberBlue} 0%, rgba(20,10,18,0.95) 100%)`,
                                borderRadius: '0 0 24px 24px',
                                borderTop: `5px solid ${COLORS.burgundy}`,
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, ${COLORS.burgundy} 0%, ${COLORS.deepCyberBlue} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Decorative elements */}
                                <div style={{ 
                                    position: 'absolute', 
                                    width: '150%', 
                                    height: '150%', 
                                    border: '1px solid rgba(255,255,255,0.05)', 
                                    borderRadius: '50%',
                                    top: '-25%',
                                    left: '-25%'
                                }} />
                                <User size={120} strokeWidth={1} color="rgba(255,255,255,0.2)" />
                                
                                {/* Overlay gradient for text readability */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)'
                                }} />
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
                                    <p style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.burgundy, fontSize: '11px', marginBottom: '4px' }}>
                                        Founder & CEO
                                    </p>
                                    <h4 style={{ ...TYPOGRAPHY.cardTitle, color: '#FFFFFF', fontSize: '20px', margin: 0 }}>
                                        Kishor Sonawane
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Vision Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 flex flex-col items-start"
                        style={{ paddingLeft: '20px' }}
                    >
                        <div style={{ maxWidth: '780px' }}> {/* Shared container to sync Quote and Para widths */}
                            <div
                                style={{
                                    ...TYPOGRAPHY.pageTitle,
                                    fontFamily: TYPOGRAPHY.fontHeading,
                                    color: isDark ? COLORS.gold : COLORS.deepCyberBlue,
                                    borderLeft: `6px solid ${isDark ? COLORS.gold : COLORS.burgundy}`,
                                    paddingLeft: '32px',
                                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                                    fontWeight: 800,
                                    lineHeight: 1.3,
                                    marginBottom: '40px',
                                    width: '100%'
                                }}
                            >
                                Our mission is to engineer high-resilience security ecosystems that empower enterprises to innovate without fear.
                            </div>
                            <div style={{
                                ...TYPOGRAPHY.bodyLarge,
                                color: isDark ? 'rgba(255,255,255,0.7)' : COLORS.textSub,
                                textAlign: 'justify',
                                lineHeight: 1.7,
                                fontWeight: 400 // Slightly firmer weight
                            }}>
                                <p style={{ marginBottom: '24px' }}>
                                    QuasarCyberTech was founded on the principle that cybersecurity should be an engineering discipline, not just a defensive posture. In an era of rapid digital evolution, we believe in building security that scales with your ambition.
                                </p>
                                <p>
                                    From our signature SECURE framework to our evolving platform ecosystem, every solution we deliver is designed to provide continuous visibility, accelerated remediation, and unwavering governance for the modern enterprise.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
