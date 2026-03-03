import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomeFinalCTA() {
    return (
        <section className="relative overflow-hidden"
            style={{
                paddingTop: '80px',
                paddingBottom: '80px',
                backgroundColor: '#7A0F2A',
                background: 'var(--cta-bg)'
            }}>
            <div className="max-w-7xl relative z-10 mx-auto px-8 lg:px-12 text-left">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-3xl">
                    Build Resilient <br />
                    <span style={{ color: 'var(--brand-accent)' }}>Security</span> Foundations
                </h2>
                <p className="text-xl md:text-2xl text-white/80 mb-14 max-w-2xl font-medium leading-relaxed">
                    Engage with our experts to assess your current posture and strengthen your defense strategy.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                    <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[#FFFFFF] text-[var(--brand-accent)] hover:bg-[#F8F9FA] hover:scale-105 active:scale-95 font-black uppercase tracking-widest text-[14px] rounded-lg transition-all shadow-2xl shadow-black/40"
                    >
                        Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
