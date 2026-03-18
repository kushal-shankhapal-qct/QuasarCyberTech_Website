import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, Factory, CloudUpload, Landmark, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Industries() {
    const industries = [
        { name: 'BFSI', icon: Landmark, desc: 'Secure high-value financial transactions and ensure compliance with strict global regulatory frameworks like PCI-DSS and NYDFS.' },
        { name: 'Healthcare', icon: HeartPulse, desc: 'Protect patient data, secure connected medical devices (IoMT), and maintain HIPAA compliance without disrupting clinical workflows.' },
        { name: 'Manufacturing', icon: Factory, desc: 'Bridge the IT/OT gap. Defend industrial control systems (ICS) from ransomware that threatens production line availability.' },
        { name: 'SaaS & Technology', icon: CloudUpload, desc: 'Embed security into your SDLC. Achieve SOC 2 compliance rapidly to unlock enterprise B2B sales pipelines.' },
        { name: 'Government', icon: Building2, desc: 'Defend critical national infrastructure against sophisticated nation-state actors with Zero Trust architectures.' },
        { name: 'Retail & eCommerce', icon: ShoppingBag, desc: 'Protect consumer data, secure supply chains, and mitigate automated bot-driven fraud during peak traffic seasons.' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20">
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight">
                            Securing Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1F3B] to-[#C41E5E]">Sector</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Cyber threats are universally present, but their impact differs by industry. We apply domain-specific threat intelligence to secure your unique operational environment.
                        </p>
                    </motion.div>
                </section>

                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((ind, i) => (
                            <Link to={`/industries/${ind.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={i} className="group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="h-full bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-[#0B1F3B]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-[#0B1F3B] group-hover:scale-110 group-hover:bg-[#0B1F3B] group-hover:text-white transition-all duration-300">
                                        <ind.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{ind.name}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{ind.desc}</p>

                                    <div className="mt-auto flex items-center text-[#0B1F3B] font-bold">
                                        View Industry Solutions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mx-4 lg:mx-auto max-w-7xl p-12 bg-[#0F172A] rounded-3xl text-center relative overflow-hidden mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/20 to-transparent mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-6">Don't see your industry listed?</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Our core methodologies apply across all verticals. Contact us to discuss your specific security challenges.
                        </p>
                        <Link to="/contact" className="px-8 py-4 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-gray-100 transition-colors inline-block">
                            Speak to an Expert
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
