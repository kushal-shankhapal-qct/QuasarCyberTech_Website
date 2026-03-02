import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe2, Award, Users, ArrowRight } from 'lucide-react';

export default function WhoWeAre() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-20">
                {/* 1. Hero */}
                <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight">
                            We Secure The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1E3F] to-[#C41E5E]">Digital Frontier</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            QuasarCyberTech was founded by former intelligence community operators with a singular mission: to provide uncompromising, enterprise-grade cybersecurity to the private sector.
                        </p>
                    </motion.div>
                </section>

                {/* 2. Company Overview / Stats */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Founded', value: '2015' },
                            { label: 'Global Employees', value: '500+' },
                            { label: 'Threats Intercepted', value: '2B+' },
                            { label: 'Client Retention', value: '98%' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="text-4xl font-black text-[#8B1E3F] mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Global Presence */}
                <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-24 mb-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <Globe2 className="w-12 h-12 text-[#8B1E3F] mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-6">Global Scale. Local Context.</h2>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                With SOCs spanning 3 continents, we provide true follow-the-sun protection. We understand regional compliance regulations, local threat actor behaviors, and cultural business nuances.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-white font-medium">
                                <div className="flex items-center"><div className="w-2 h-2 bg-[#8B1E3F] rounded-full mr-3"></div> San Francisco, HQ</div>
                                <div className="flex items-center"><div className="w-2 h-2 bg-[#8B1E3F] rounded-full mr-3"></div> London, UK</div>
                                <div className="flex items-center"><div className="w-2 h-2 bg-[#8B1E3F] rounded-full mr-3"></div> Singapore</div>
                                <div className="flex items-center"><div className="w-2 h-2 bg-[#8B1E3F] rounded-full mr-3"></div> Dubai, UAE</div>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full aspect-video bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888034505-1845140cc53f?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                            <p className="text-gray-500 relative z-10 font-medium">Interactive Map Placeholder</p>
                        </div>
                    </div>
                </section>

                {/* 4. Certifications & Recognitions */}
                <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
                    <Award className="w-12 h-12 text-[#8B1E3F] mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-12">Industry Recognized Excellence</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['CREST Accredited', 'ISO 27001 Certified', 'SOC 2 Type II', 'Gartner Cool Vendor 2024', 'Forrester Wave Leader'].map((cert, i) => (
                            <div key={i} className="px-6 py-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm flex items-center">
                                <ShieldCheck className="w-5 h-5 text-green-600 mr-3" /> {cert}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Leadership Preview */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Executive Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Chen', title: 'Chief Executive Officer', bg: 'bg-gray-200' },
                            { name: 'Marcus Sterling', title: 'Chief Technology Officer', bg: 'bg-gray-300' },
                            { name: 'Dr. Elena Rostova', title: 'Chief Information Security Officer', bg: 'bg-gray-200' },
                        ].map((leader, idx) => (
                            <div key={idx} className="group">
                                <div className={`aspect-square ${leader.bg} rounded-3xl mb-6 overflow-hidden relative`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6"></div>
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A]">{leader.name}</h3>
                                <p className="text-[#8B1E3F] font-medium">{leader.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. CTA */}
                <section className="max-w-4xl mx-auto px-6 text-center">
                    <div className="p-12 bg-gray-50 rounded-3xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Join Our Mission</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Whether you're looking for an enterprise security partner or the next step in your career.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="/contact" className="px-8 py-4 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6B1530] transition-colors">
                                Contact Us
                            </a>
                            <a href="/careers" className="px-8 py-4 bg-white text-[#0F172A] font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                View Careers
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
