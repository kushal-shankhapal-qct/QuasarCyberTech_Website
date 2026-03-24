import React from 'react';
import { Link } from 'react-router-dom';
import { themeConfig, GRADIENTS, COLORS, TYPOGRAPHY, SECTION_BACKGROUNDS, LAYOUT_CONTROLS } from '../config/themeConfig';

export default function HomeFinalCTA() {
    return (
        <section className="relative overflow-hidden text-left"
            style={{
                background: '#F8FAFC', // Light Background
                paddingTop: LAYOUT_CONTROLS.section.paddingTop,
                paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
                borderTop: '1px solid rgba(0,0,0,0.05)',
                fontFamily: TYPOGRAPHY.fontBody
            }}>

            {/* Subtle light pattern overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6B1530 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="w-full relative z-10"
                style={{
                    paddingLeft: '2.5em',
                    paddingRight: '2.5em',
                }}>
                
                <h2
                    className="font-[900] mb-8 tracking-tighter leading-[1.05] max-w-4xl"
                    style={{
                        fontFamily: TYPOGRAPHY.fontHeading,
                        fontSize: ' clamp(36px, 6vw, 56px)',
                        color: COLORS.deepCyberBlue,
                    }}
                >
                    <span style={{ color: COLORS.burgundy }}>Secure</span> Your Digital <br />
                    Enterprise
                </h2>

                <p
                    className="mb-14 max-w-2xl font-medium leading-relaxed"
                    style={{
                        fontFamily: TYPOGRAPHY.fontBody,
                        fontSize: '18px',
                        color: 'rgba(8, 16, 38, 0.7)',
                    }}
                >
                    Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <button style={{
                            background: COLORS.burgundy,
                            color: '#FFFFFF',
                            padding: '16px 40px',
                            fontWeight: 700,
                            fontSize: '13px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 8px 16px rgba(107, 21, 48, 0.2)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#8B1F40';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(107, 21, 48, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = COLORS.burgundy;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(107, 21, 48, 0.2)';
                        }}
                        >
                            Talk to a Security Expert
                        </button>
                    </Link>
                    <Link to="/capabilities" style={{ textDecoration: 'none' }}>
                        <button style={{
                            background: 'transparent',
                            color: COLORS.burgundy,
                            padding: '16px 40px',
                            fontWeight: 700,
                            fontSize: '13px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            borderRadius: '4px',
                            border: `2px solid ${COLORS.burgundy}`,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(107,21,48,0.05)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                            Explore Capabilities
                        </button>
                    </Link>
                </div>
            </div>
        </section >
    );
}
