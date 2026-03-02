import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
    { value: '1,600+', label: 'Projects Completed' },
    { value: '800+', label: 'Companies Satisfied' },
    { value: '300+', label: 'Technologies' },
    { value: '600+', label: 'Experts/Attendees' },
];

export default function Milestones() {
    return (
        <section className="relative py-24 bg-[#F8FAFC] border-t border-[#E1E6EB] overflow-hidden flex items-center justify-center">

            {/* Floating Geometric Petals effect simulating anti-gravity rosette */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                <motion.svg
                    viewBox="0 0 500 500"
                    className="w-[800px] h-[800px]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M 250, 250 m -220, 0 a 220,220 0 1,1 440,0 a 220,220 0 1,1 -440,0" fill="none" stroke="#1E2A38" strokeWidth="4" />
                    <path d="M 250, 250 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="none" stroke="#8B1E3F" strokeWidth="2" />
                    <rect x="150" y="150" width="200" height="200" fill="none" transform="rotate(45 250 250)" stroke="#CA9C88" strokeWidth="2" />
                </motion.svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-[13px] font-bold tracking-widest text-[#52606D] uppercase mb-2">Proven Strategic Impact</h2>
                    <h3 className="text-3xl font-bold text-[#1F2933] tracking-tight">
                        Data & Milestones
                    </h3>
                </div>

                {/* Data Ribbon */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/40 backdrop-blur-md border border-white/60 p-10 rounded-[20px] shadow-[0_12px_40px_rgba(30,42,56,0.04)] justify-items-center">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.15,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="flex flex-col items-center justify-center text-center p-4"
                        >
                            {/* Floating Number */}
                            <motion.div
                                animate={{ y: [-3, 3, -3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                                className="text-[44px] md:text-[56px] font-extrabold text-[#1E2A38] tracking-tighter drop-shadow-sm mb-2"
                                style={{
                                    background: 'linear-gradient(135deg, #1E2A38 0%, #2F6F78 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                {metric.value}
                            </motion.div>
                            <span className="text-[14px] md:text-[15px] font-bold text-[#52606D] uppercase tracking-wide">
                                {metric.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
