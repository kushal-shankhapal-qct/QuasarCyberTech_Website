import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import qPulseLogo from '../assets/QPulse_Latest_News.png';
import qStellarLogo from '../assets/QStellar.png';

import { themeConfig } from '../config/themeConfig';
import MarqueeBackground from './MarqueeBackground';

const platformVars = themeConfig.platform;

export default function PlatformHighlights() {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                paddingTop: platformVars.paddingTop || '60px',
                paddingBottom: platformVars.paddingBottom || '120px',
                background: 'var(--platforms-bg)',
            }}
        >
            <MarqueeBackground />

            {/* Ultra-subtle mesh texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Header Strip: Compact Full-width Clay Background */}
            <div
                className="relative z-10 w-full py-6"
                style={{
                    marginBottom: themeConfig.platform.headerStripMarginBottom || '8px',
                    backgroundColor: `rgba(${themeConfig.platform.clay.bgColor}, ${themeConfig.platform.clay.bgOpacity})`,
                    backdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                    WebkitBackdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                    boxShadow: `${themeConfig.platform.clay.innerShadow}, ${themeConfig.platform.clay.shadow}`,
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left" style={{ paddingLeft: '2.2rem' }}>
                        <h2 className="text-[34px] md:text-[40px] font-black leading-[1.1] text-[#111111] mb-1 tracking-tighter">
                            Our Native <span style={{ color: '#7A0F2A' }}>Security Platforms</span>
                        </h2>
                        <p className="text-[#555555] text-[14px] max-w-xl font-medium leading-relaxed mt-2">
                            Proprietary engineering designed for continuous visibility and accelerated remediation.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Card 1: Qpulse */}
                    <div
                        className="group transition-all flex flex-col overflow-hidden h-full max-h-[480px]"
                        style={{
                            backgroundColor: `rgba(${themeConfig.platform.clay.bgColor}, ${themeConfig.platform.clay.bgOpacity})`,
                            backdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                            WebkitBackdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                            borderRadius: `0 ${themeConfig.platform.cardRadius} ${themeConfig.platform.cardRadius} 0`,
                            boxShadow: `${themeConfig.platform.clay.innerShadow}, ${themeConfig.platform.clay.shadow}`,
                            borderLeft: `4px solid var(--brand-accent)`,
                        }}
                    >
                        <div className="p-8 relative flex flex-col h-full">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                className="absolute left-[-4px] bottom-0 w-[4px] bg-[var(--brand-accent)] z-20"
                            />

                            <div className="text-[12px] font-bold text-[var(--brand-accent)] tracking-[0.2em] uppercase mb-3">
                                Security Intelligence
                            </div>
                            <h3 className="text-[var(--text-primary)] mb-3 tracking-tight">
                                <span className="block font-black text-[28px] lg:text-[34px] leading-tight mb-1">QPulse</span>
                                <span className="block font-medium text-[var(--text-muted)] text-[16px] lg:text-[18px] opacity-70 leading-tight">Continuous Risk Intelligence</span>
                            </h3>
                            <p className="text-[var(--text-muted)] text-[13px] font-medium leading-[1.4] mb-6 line-clamp-2 opacity-90">
                                Centralize vulnerability intelligence, remediation tracking, and compliance visibility through a unified risk management platform.
                            </p>

                            <div className="flex flex-row gap-8 flex-1 min-h-0">
                                {/* Left Section: Bullets */}
                                <div className="flex-[0.8] flex flex-col justify-between py-2">
                                    <ul className="space-y-3">
                                        {[
                                            'Asset-centric risk prioritization',
                                            'Executive-ready reporting',
                                            'Integrated remediation workflows'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <div className="w-4 h-4 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-[var(--brand-accent)]" />
                                                </div>
                                                <span className="text-[var(--text-primary)] font-semibold text-[12px] leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="https://qpulse.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--brand-accent)] text-white font-bold rounded-lg hover:bg-[#5a111b] transition-all w-max shadow-lg shadow-[var(--brand-accent-soft)] hover:scale-105 text-[12px] mt-4"
                                    >
                                        Explore Qpulse <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </a>
                                </div>

                                {/* Right Section: Screenshot */}
                                <div className="flex-[1.2] relative h-full min-h-0">
                                    <div className="relative flex h-full overflow-hidden shadow-sm">
                                        <div className="flex-1 h-full overflow-hidden">
                                            <img
                                                src={qPulseLogo}
                                                alt="QPulse Platform Screenshot"
                                                className="w-full h-full object-cover object-left-top"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: QStellar */}
                    <div
                        className="group transition-all flex flex-col overflow-hidden h-full max-h-[480px]"
                        style={{
                            backgroundColor: `rgba(${themeConfig.platform.clay.bgColor}, ${themeConfig.platform.clay.bgOpacity})`,
                            backdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                            WebkitBackdropFilter: `blur(${themeConfig.platform.clay.blur})`,
                            borderRadius: `0 ${themeConfig.platform.cardRadius} ${themeConfig.platform.cardRadius} 0`,
                            boxShadow: `${themeConfig.platform.clay.innerShadow}, ${themeConfig.platform.clay.shadow}`,
                            borderLeft: `4px solid var(--brand-accent)`,
                        }}
                    >
                        <div className="p-8 relative flex flex-col h-full">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }}
                                className="absolute left-[-4px] bottom-0 w-[4px] bg-[var(--brand-accent)] z-20"
                            />

                            <div className="text-[12px] font-bold text-[var(--brand-accent)] tracking-[0.2em] uppercase mb-3">
                                Posture Engineering
                            </div>
                            <h3 className="text-[var(--text-primary)] mb-3 tracking-tight">
                                <span className="block font-black text-[28px] lg:text-[34px] leading-tight mb-1">QStellar</span>
                                <span className="block font-medium text-[var(--text-muted)] text-[16px] lg:text-[18px] opacity-70 leading-tight">Security Posture Engineering</span>
                            </h3>
                            <p className="text-[var(--text-muted)] text-[13px] font-medium leading-[1.4] mb-6 line-clamp-2 opacity-90">
                                Gain real-time visibility into infrastructure misconfigurations, attack surfaces, and cloud security gaps.
                            </p>

                            <div className="flex flex-row gap-8 flex-1 min-h-0">
                                {/* Left Section: Bullets */}
                                <div className="flex-[0.8] flex flex-col justify-between py-2">
                                    <ul className="space-y-3">
                                        {[
                                            'Cloud and network posture monitoring',
                                            'Misconfiguration detection',
                                            'Continuous exposure management'
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <div className="w-4 h-4 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-[var(--brand-accent)]" />
                                                </div>
                                                <span className="text-[var(--text-primary)] font-semibold text-[12px] leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="https://qstellar.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--brand-accent)] text-white font-bold rounded-xl hover:bg-[#5a111b] transition-all w-max shadow-lg shadow-[var(--brand-accent-soft)] hover:scale-105 text-[12px] mt-4"
                                    >
                                        Explore QStellar <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </a>
                                </div>

                                {/* Right Section: Screenshot */}
                                <div className="flex-[1.2] relative h-full min-h-0">
                                    <div className="relative flex h-full overflow-hidden shadow-sm">
                                        <div className="flex-1 h-full overflow-hidden">
                                            <img
                                                src={qStellarLogo}
                                                alt="QStellar Platform Screenshot"
                                                className="w-full h-full object-cover object-left-top"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
