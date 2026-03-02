import React from 'react';
import { Link } from 'react-router-dom';

import { themeConfig } from '../config/themeConfig';

const industryVars = themeConfig.industry;

export default function IndustrySnapshot() {
    const industries = [
        { name: 'BFSI', href: '/industries/bfsi', desc: 'Financial security and regulatory compliance.' },
        { name: 'Healthcare', href: '/industries/healthcare', desc: 'PHI data protection and HIPAA alignment.' },
        { name: 'Manufacturing', href: '/industries/manufacturing', desc: 'OT/ICS security and IP protection.' },
        { name: 'SaaS', href: '/industries/saas', desc: 'Cloud-native application security and IAM.' },
        { name: 'Government', href: '/industries/government', desc: 'Secure infrastructure and sovereign cloud.' },
        { name: 'Retail', href: '/industries/retail', desc: 'PCI-DSS compliance and supply chain security.' }
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{ paddingTop: industryVars.paddingTop, paddingBottom: industryVars.paddingBottom }}
        >
            <div className="max-w-7xl relative z-10 mb-12" style={{ marginLeft: '2.5rem' }}>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">
                    Industry-Focused Security Expertise
                </h2>
                <p className="text-black text-[15px] max-w-2xl font-medium leading-relaxed opacity-80">
                    Security strategies aligned with sector-specific risk and regulatory environments.
                </p>
            </div>

            <div className="max-w-7xl relative z-10" style={{ marginLeft: '2.5rem', marginRight: '2.5rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industries.map((ind, idx) => (
                        <Link
                            key={idx}
                            to={ind.href}
                            className={`group relative ${industryVars.cardBg} ${industryVars.cardBlur} border border-white/50 rounded-r-2xl rounded-l-none border-l-[4px] border-l-[#8B1E3F] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-200 overflow-hidden flex flex-col`}
                        >
                            <div className="text-[11px] font-bold text-[#8B1E3F] tracking-[0.2em] uppercase mb-3">
                                Industry Sector
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#8B1E3F] transition-colors">
                                {ind.name}
                            </h3>
                            <p className="text-black text-[14px] leading-relaxed font-medium">
                                {ind.desc}
                            </p>

                            {/* Decorative background number or icon placeholder */}
                            <div className="absolute -bottom-6 -right-6 text-8xl font-black text-black/[0.03] select-none group-hover:text-[#8B1E3F]/[0.05] transition-colors">
                                0{idx + 1}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
