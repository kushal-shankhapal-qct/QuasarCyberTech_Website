import React from 'react';
import { Link } from 'react-router-dom';

export default function IndustrySnapshot() {
    const industries = [
        { name: 'BFSI', href: '/industries/bfsi' },
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'Manufacturing', href: '/industries/manufacturing' },
        { name: 'SaaS', href: '/industries/saas' },
        { name: 'Government', href: '/industries/government' },
        { name: 'Retail', href: '/industries/retail' }
    ];

    return (
        <section className="py-[120px] overflow-hidden border-y border-gray-200/40">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">
                    Industry-Focused Security Expertise
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Security strategies aligned with sector-specific risk and regulatory environments.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-6 w-max mx-auto px-4">
                    {industries.map((ind, idx) => (
                        <Link
                            key={idx}
                            to={ind.href}
                            className="group relative bg-white border border-gray-200/80 rounded-xl px-12 py-8 min-w-[220px] text-center shadow-sm hover:shadow-md hover:border-[#8B1E3F]/40 transition-all font-bold text-[#0F172A] overflow-hidden"
                        >
                            <span className="relative z-10">{ind.name}</span>

                            {/* Hover Top Border Accent */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#8B1E3F] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
