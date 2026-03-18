import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, ArrowRight, Zap, Database } from 'lucide-react';

export default function Platforms() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-[#0B1F3B] selection:text-white">
            {/* Notice: Product-led implies darker, sleeker theme (different from services) */}
            <Header />
            <main className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0B1F3B]/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0ea5e9]/10 rounded-full blur-[150px] pointer-events-none"></div>

                <section className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 font-semibold text-sm mb-6 tracking-wide uppercase">
                            Technology Ecosystem
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            Proprietary Security Platforms
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Force-multiply your security operations with our enterprise-grade SaaS platforms, engineered for speed, automation, and total visibility.
                        </p>
                    </motion.div>
                </section>

                <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Qpulse Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent hover:from-[#0B1F3B]/50 transition-colors duration-500"
                        >
                            <div className="bg-[#0f172a] rounded-[22px] p-8 md:p-12 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B1F3B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0B1F3B]/20 transition-colors duration-500"></div>

                                <div className="w-16 h-16 rounded-2xl bg-[#0B1F3B]/20 border border-[#0B1F3B]/30 flex items-center justify-center mb-8 relative z-10">
                                    <Activity className="w-8 h-8 text-[#0B1F3B]" />
                                </div>

                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight relative z-10">
                                    Qpulse<span className="text-[#0B1F3B]">.</span>
                                </h2>
                                <h3 className="text-xl font-medium text-gray-300 mb-6 relative z-10">
                                    Enterprise Threat Intelligence & Monitoring
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                    Accelerate your threat detection and response capabilities. Qpulse ingests billions of telemetry points, utilizing advanced behavioral analytics to identify anomalies before they escalate.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                                    <div className="flex items-center text-sm text-gray-300"><Zap className="w-4 h-4 text-[#0B1F3B] mr-2" /> Real-time Analytics</div>
                                    <div className="flex items-center text-sm text-gray-300"><Database className="w-4 h-4 text-[#0B1F3B] mr-2" /> Global Threat Feeds</div>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <a
                                        href="https://qpulse.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full justify-center items-center px-6 py-4 rounded-xl bg-white text-[#0f172a] font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Explore Qpulse <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* QStellar Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent hover:from-[#0ea5e9]/50 transition-colors duration-500"
                        >
                            <div className="bg-[#0f172a] rounded-[22px] p-8 md:p-12 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0ea5e9]/20 transition-colors duration-500"></div>

                                <div className="w-16 h-16 rounded-2xl bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 flex items-center justify-center mb-8 relative z-10">
                                    <ShieldCheck className="w-8 h-8 text-[#0ea5e9]" />
                                </div>

                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight relative z-10">
                                    QStellar<span className="text-[#0ea5e9]">.</span>
                                </h2>
                                <h3 className="text-xl font-medium text-gray-300 mb-6 relative z-10">
                                    Automated Security Governance & Compliance
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                    Transform compliance from a point-in-time audit to continuous assurance. QStellar automates evidence collection, maps controls to multiple frameworks, and streamlines audit readiness.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                                    <div className="flex items-center text-sm text-gray-300"><Zap className="w-4 h-4 text-[#0ea5e9] mr-2" /> Continuous Mapping</div>
                                    <div className="flex items-center text-sm text-gray-300"><Database className="w-4 h-4 text-[#0ea5e9] mr-2" /> 50+ Integrations</div>
                                </div>

                                <div className="mt-auto relative z-10">
                                    <a
                                        href="https://qstellar.quasarcybertech.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full justify-center items-center px-6 py-4 rounded-xl bg-[#0ea5e9] text-white font-bold hover:bg-[#0284c7] transition-colors"
                                    >
                                        Explore QStellar <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
