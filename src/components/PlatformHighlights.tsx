import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlatformHighlights() {
    return (
        <section className="py-[120px] relative overflow-hidden">
            {/* Ultra-subtle diagonal mesh texture (simulated with radial gradient overlay) */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1: Qpulse */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#8B1E3F]/30 transition-all flex flex-col h-full"
                    >
                        <div className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">
                            Platform
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                            Qpulse — Continuous Risk Intelligence
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            Centralize vulnerability intelligence, remediation tracking, and compliance visibility through a unified risk management platform.
                        </p>
                        <ul className="space-y-4 mb-12 text-[#0F172A] font-medium">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Asset-centric risk prioritization</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Executive-ready reporting</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Integrated remediation workflows</span>
                            </li>
                        </ul>
                        <a
                            href="https://qpulse.quasarcybertech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6B1530] transition-colors w-max"
                        >
                            Explore Qpulse <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </motion.div>

                    {/* Card 2: QStellar */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#8B1E3F]/30 transition-all flex flex-col h-full"
                    >
                        <div className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">
                            Platform
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                            QStellar — Security Posture Engineering
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            Gain real-time visibility into infrastructure misconfigurations, attack surfaces, and cloud security gaps.
                        </p>
                        <ul className="space-y-4 mb-12 text-[#0F172A] font-medium">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Cloud and network posture monitoring</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Misconfiguration detection</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                                <span className="text-gray-700">Continuous exposure management</span>
                            </li>
                        </ul>
                        <a
                            href="https://qstellar.quasarcybertech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6B1530] transition-colors w-max"
                        >
                            Explore QStellar <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

