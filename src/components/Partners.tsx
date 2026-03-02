import React from 'react';
import { motion } from 'framer-motion';

export default function Partners() {
    const partners = [
        { name: 'VANAPS Consulting', id: 1 },
        { name: 'D-Link', id: 2 },
        { name: 'ManageEngine', id: 3 },
    ];

    return (
        <section className="py-20 bg-[#F4F7FA] border-t border-[#E1E6EB] flex flex-col items-center justify-center">
            <div className="text-center mb-10">
                <h2 className="text-[12px] font-bold tracking-widest text-[#52606D] uppercase mb-1">The Trusted Ecosystem</h2>
                <h3 className="text-2xl font-bold text-[#1F2933] tracking-tight">Our Partners</h3>
            </div>

            <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity">
                {partners.map((partner, idx) => (
                    <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                    >
                        {/* Pure Text Logo Placeholder instead of relying on external images that might fail */}
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#1E2A38] uppercase">
                            {partner.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
