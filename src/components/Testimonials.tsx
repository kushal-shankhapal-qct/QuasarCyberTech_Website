import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#FFFFFF] border-t border-[#E1E6EB] relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[13px] font-bold tracking-widest text-[#52606D] uppercase mb-2">The Leaders' Voice</h2>
                    <h3 className="text-3xl font-bold text-[#1F2933] tracking-tight">
                        Proven <span className="text-[#8B1E3F]">Trust</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Case Study / Testimonial 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#F4F7FA]/60 backdrop-blur-md rounded-[16px] border border-[#E1E6EB] shadow-sm p-10 flex flex-col relative"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.04]">
                            {/* Decorative huge quote mark element */}
                            <span className="text-8xl font-serif text-[#1E2A38] leading-none">"</span>
                        </div>

                        <p className="text-[16px] text-[#52606D] italic leading-relaxed mb-8 relative z-10 flex-grow">
                            "QuasarCyberTech profoundly transformed our security posture across the Healthcare Sector. By identifying critical vulnerabilities and executing rigorous Application Security Testing, they prevented potentially disastrous breaches before they occurred. Their expertise is unmatched."
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                            {/* Headshot Placeholder */}
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#E1E6EB] border border-white flex items-center justify-center text-[#52606D]">
                                <span className="text-xs font-semibold">HP</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-[#1F2933]">Healthcare Partner</span>
                                <span className="text-[13px] font-medium text-[#8B1E3F]">Co-Founder, Top Tier Hospital Group</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Case Study / Testimonial 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#FFFFFF] backdrop-blur-md rounded-[16px] border border-[#E1E6EB] shadow-sm p-10 flex flex-col relative"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.04]">
                            {/* Decorative huge quote mark element */}
                            <span className="text-8xl font-serif text-[#1E2A38] leading-none">"</span>
                        </div>

                        <p className="text-[16px] text-[#52606D] italic leading-relaxed mb-8 relative z-10 flex-grow">
                            "When standardizing our manufacturing ICS networks, QuasarCyberTech's proactive engagement and outcome-oriented approach minimized downtime completely. Their deep alignment with industry standards ensured our supply chain remained fully protected against advanced persistent threats."
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                            {/* Headshot Placeholder */}
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#E1E6EB] border border-white flex items-center justify-center text-[#52606D]">
                                <span className="text-xs font-semibold">MD</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-[#1F2933]">Manufacturing Director</span>
                                <span className="text-[13px] font-medium text-[#8B1E3F]">Senior Director, Global Manufacturing Firm</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
