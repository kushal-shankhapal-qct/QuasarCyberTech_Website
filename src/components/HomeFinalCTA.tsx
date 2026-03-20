import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { themeConfig, GRADIENTS, COLORS } from '../config/themeConfig';

export default function HomeFinalCTA() {
    return (
        <section className="relative overflow-hidden text-left"
            style={{
                background: GRADIENTS.HERO_BG,
                paddingTop: themeConfig.cta?.paddingY || '100px',
                paddingBottom: themeConfig.cta?.paddingY || '100px',
            }}>

            {/* Hex grid pattern overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="w-full relative z-10"
                style={{
                    paddingLeft: '2em',
                    paddingRight: '2em',
                }}>
                {/* Eyebrow Removed */}
                <h2
                    className="font-[900] mb-8 tracking-tighter leading-[1.05] max-w-4xl"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '44px',
                        color: '#FFFFFF',
                    }}
                >
                    <span style={{ color: COLORS.gold }}>Secure</span> Your Digital <br />
                    Enterprise
                </h2>

                <p
                    className="mb-14 max-w-2xl font-medium leading-relaxed"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '17px',
                        color: '#8B949E',
                    }}
                >
                    Partner with QuasarCyberTech to strengthen cyber resilience, governance, and security operations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                    <Link to="/contact">
                        <button style={{
                            background: '#6B1530',
                            color: '#FFFFFF',
                            padding: '14px 34px',
                            fontWeight: 700,
                            fontSize: '13px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#8B1F40';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#6B1530';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                            Talk to a Security Expert
                        </button>
                    </Link>
                    <Link to="/capabilities">
                        <button style={{
                            background: 'transparent',
                            color: '#FFFFFF',
                            padding: '14px 34px',
                            fontWeight: 700,
                            fontSize: '13px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '4px',
                            border: '1px solid #6B1530',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(107,21,48,0.12)';
                            e.currentTarget.style.borderColor = '#8B1E3F';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#6B1530';
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
