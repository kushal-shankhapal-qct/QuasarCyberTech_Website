import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomeFinalCTA() {
    return (
        <section className="py-[140px] relative overflow-hidden">
            {/* Subtle overlay texture or pattern for depth, not noisy */}
            <div className="absolute inset-0 bg-[#000000] opacity-10 mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    Build Resilient Security Foundations
                </h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
                    Engage with our experts to assess your current posture and strengthen your defense strategy.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-[#8B1E3F] hover:bg-gray-50 hover:scale-105 active:scale-95 font-bold rounded-xl transition-all shadow-xl shadow-black/20"
                    >
                        Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
