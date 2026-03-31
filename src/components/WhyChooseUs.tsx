import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Target, ShieldCheck } from 'lucide-react';

const coreValues = [
    {
        title: 'Customized Solutions',
        description: 'We do not believe in one-size-fits-all. Our security strategies are uniquely tailored to match your specific operational footprint and threat model.',
        icon: Settings,
        color: '#0B1F3B', // Magenta accent
    },
    {
        title: 'Proactive Engagement',
        description: 'Threats never sleep, and neither do we. 24/7 active surveillance and responsive support ensure your defenses are never compromised.',
        icon: Clock,
        color: '#CA9C88', // Orange/warm accent
    },
    {
        title: 'Outcome Oriented',
        description: 'Security must enable business, not stagnate it. We focus heavily on maximizing ROI and reducing operational friction.',
        icon: Target,
        color: '#1E2A38', // Deep blue accent
    },
    {
        title: 'Aligning Industry Standards',
        description: 'We keep you compliant and ahead of the curve, deeply weaving global security protocols into your daily operations.',
        icon: ShieldCheck,
        color: '#2F6F78', // Teal accent
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#E1E6EB]">
            {/* Soft blurred background layer for depth */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#0B1F3B]/[0.02] to-transparent rounded-full blur-3xl translate-y-[-30%]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#2F6F78]/[0.02] to-transparent rounded-full blur-3xl translate-y-[20%]" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[13px] font-bold tracking-widest text-[#52606D] uppercase mb-2">Logical Differentiators</h2>
                    <h3 className="text-4xl font-bold text-[#1F2933] tracking-tight">
                        Why Choose <span className="text-[#0B1F3B]">QuasarCyberTech</span>
                    </h3>
                    <p className="mt-4 text-[16px] text-[#52606D] max-w-2xl mx-auto leading-relaxed">
                        We deliver highly secure, authoritative, and crisp cyber strategies without relying on outdated hacker clichés.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map((value, idx) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-[#F4F7FA]/50 backdrop-blur-sm border border-[#E1E6EB] p-8 rounded-xl relative group overflow-hidden hover:bg-[#FFFFFF] transition-all hover:shadow-[0_8px_30px_rgba(30,42,56,0.06)]"
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: value.color }}
                            />

                            <div
                                className="w-12 h-12 rounded-lg bg-white shadow-sm border border-[#E1E6EB] mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
                            >
                                <value.icon size={24} style={{ color: value.color }} strokeWidth={1.5} />
                            </div>

                            <h4 className="text-[18px] font-bold text-[#1F2933] mb-3 leading-tight">
                                {value.title}
                            </h4>
                            <p className="text-[14px] text-[#52606D] leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
