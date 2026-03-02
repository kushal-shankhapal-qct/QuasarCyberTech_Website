import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import { themeConfig } from '../config/themeConfig';

const platformVars = themeConfig.platform;

export default function PlatformHighlights() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ paddingTop: platformVars.paddingTop, paddingBottom: platformVars.paddingBottom }}
        >
            {/* Ultra-subtle mesh texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="max-w-7xl relative z-10" style={{ marginLeft: platformVars.sideMargin }}>
                <div className="text-left mb-12">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">
                        Our Native Security Platforms
                    </h2>
                    <p className="text-black text-[15px] max-w-2xl font-medium leading-relaxed opacity-80">
                        Proprietary engineering designed for continuous visibility and accelerated remediation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 pr-[2.5rem]">

                    {/* Card 1: Qpulse */}
                    <motion.div
                        whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`group ${platformVars.cardBg} ${platformVars.cardBlur} rounded-r-[40px] rounded-l-none border ${platformVars.cardBorder} border-l-[4px] border-l-[#8B1E3F] shadow-sm transition-all flex flex-col overflow-hidden h-full max-h-[480px]`}
                    >
                        <div className="p-8 relative flex flex-col h-full">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                className="absolute left-[-4px] bottom-0 w-[4px] bg-[#8B1E3F] z-20"
                            />

                            <div className="text-[10px] font-bold text-[#8B1E3F] tracking-[0.2em] uppercase mb-4">
                                Security Intelligence
                            </div>
                            <h3
                                className="font-bold text-[#0F172A] mb-2 tracking-tight truncate"
                                style={{ fontSize: platformVars.cardTitleSize, lineHeight: platformVars.cardTitleLineHeight }}
                            >
                                Qpulse — Continuous Risk Intelligence
                            </h3>
                            <p className="text-black text-[13px] font-medium leading-[1.4] mb-6 line-clamp-2 opacity-90">
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
                                                <div className="w-4 h-4 rounded-full bg-[#8B1E3F]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-[#8B1E3F]" />
                                                </div>
                                                <span className="text-black font-semibold text-[12px] leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="https://qpulse.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-5 py-2.5 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6B1530] transition-all w-max shadow-lg shadow-[#8B1E3F]/20 hover:scale-105 text-[12px] mt-4"
                                    >
                                        Explore Qpulse <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </a>
                                </div>

                                {/* Right Section: Screenshot */}
                                <div className="flex-[1.2] relative h-full">
                                    <div className={`absolute inset-0 ${platformVars.screenshotBg} rounded-xl border ${platformVars.screenshotBorder} shadow-inner flex items-center justify-center group-hover:bg-white/50 transition-colors overflow-hidden`}>
                                        <div className="absolute top-2 left-3 flex gap-1 z-10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10 text-center px-4">
                                            Platform Screenshot Area
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: QStellar */}
                    <motion.div
                        whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`group ${platformVars.cardBg} ${platformVars.cardBlur} rounded-r-[40px] rounded-l-none border ${platformVars.cardBorder} border-l-[4px] border-l-[#8B1E3F] shadow-sm transition-all flex flex-col overflow-hidden h-full max-h-[480px]`}
                    >
                        <div className="p-8 relative flex flex-col h-full">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }}
                                className="absolute left-[-4px] bottom-0 w-[4px] bg-[#8B1E3F] z-20"
                            />

                            <div className="text-[10px] font-bold text-[#8B1E3F] tracking-[0.2em] uppercase mb-4">
                                Posture Engineering
                            </div>
                            <h3
                                className="font-bold text-[#0F172A] mb-2 tracking-tight truncate"
                                style={{ fontSize: platformVars.cardTitleSize, lineHeight: platformVars.cardTitleLineHeight }}
                            >
                                QStellar — Security Posture Engineering
                            </h3>
                            <p className="text-black text-[13px] font-medium leading-[1.4] mb-6 line-clamp-2 opacity-90">
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
                                                <div className="w-4 h-4 rounded-full bg-[#8B1E3F]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-[#8B1E3F]" />
                                                </div>
                                                <span className="text-black font-semibold text-[12px] leading-tight">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="https://qstellar.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-5 py-2.5 bg-[#8B1E3F] text-white font-bold rounded-xl hover:bg-[#6B1530] transition-all w-max shadow-lg shadow-[#8B1E3F]/20 hover:scale-105 text-[12px] mt-4"
                                    >
                                        Explore QStellar <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </a>
                                </div>

                                {/* Right Section: Screenshot */}
                                <div className="flex-[1.2] relative h-full">
                                    <div className={`absolute inset-0 ${platformVars.screenshotBg} rounded-xl border ${platformVars.screenshotBorder} shadow-inner flex items-center justify-center group-hover:bg-white/50 transition-colors overflow-hidden`}>
                                        <div className="absolute top-2 left-3 flex gap-1 z-10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10 text-center px-4">
                                            Platform Screenshot Area
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
