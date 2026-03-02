import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logoSymbol from '../assets/Logos/icononly_transparent_nobuffer.png';

export default function FinalCTA() {
    return (
        <section className="relative py-32 bg-[#FFFFFF] border-t border-[#E1E6EB] flex items-center justify-center overflow-hidden">
            {/* Subtle Glowing Quasar Orbit Effect behind the content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] md:size-[900px] z-0 pointer-events-none opacity-[0.06]">
                <motion.div
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
                >
                    <img src={logoSymbol} alt="" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
                <h2 className="text-[14px] font-bold tracking-widest text-[#8B1E3F] uppercase mb-4">Final Strategy</h2>

                <h3 className="text-4xl md:text-5xl font-extrabold text-[#1F2933] tracking-tight leading-tight max-w-[800px] mb-8">
                    Empowering Your Digital Transformation to Enhance Overall Cyber <span className="text-[#8B1E3F] relative whitespace-nowrap">Well-being<svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" fill="none" stroke="#CA9C88" strokeWidth="2" strokeDasharray="10 4" /></svg></span>
                </h3>

                <Link
                    to="/contact"
                    className="px-10 py-5 bg-gradient-to-r from-[#1E2A38] to-[#2F6F78] text-white text-[16px] font-bold rounded-xl hover:from-[#2F6F78] hover:to-[#1E2A38] transition-all duration-300 shadow-[0_12px_40px_rgba(30,42,56,0.3)] hover:shadow-[0_18px_50px_rgba(47,111,120,0.5)] flex items-center gap-3 group translate-y-2 hover:-translate-y-1 relative overflow-hidden"
                >
                    <div className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="relative z-10">Talk to a Client Specialist</span>
                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
