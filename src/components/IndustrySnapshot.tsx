import { Link } from 'react-router-dom';
import { Landmark, Activity, Factory, Layers, Shield, ShoppingBag } from 'lucide-react';

import { themeConfig } from '../config/themeConfig';

const industryVars = themeConfig.industry;

export default function IndustrySnapshot() {
    const industries = [
        { name: 'BFSI', href: '/industries/bfsi', desc: 'Financial security and regulatory compliance.', Icon: Landmark },
        { name: 'Healthcare', href: '/industries/healthcare', desc: 'PHI data protection and HIPAA alignment.', Icon: Activity },
        { name: 'Manufacturing', href: '/industries/manufacturing', desc: 'OT/ICS security and IP protection.', Icon: Factory },
        { name: 'SaaS', href: '/industries/saas', desc: 'Cloud-native application security and IAM.', Icon: Layers },
        { name: 'Government', href: '/industries/government', desc: 'Secure infrastructure and sovereign cloud.', Icon: Shield },
        { name: 'Retail', href: '/industries/retail', desc: 'PCI-DSS compliance and supply chain security.', Icon: ShoppingBag }
    ];

    return (
        <section
            className="relative overflow-hidden"
            style={{ paddingTop: '100px', paddingBottom: '100px', background: 'var(--sector-bg)' }}
        >
            <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-left">
                    <h2 className="text-[40px] md:text-[52px] font-[800] leading-[1.1] text-[var(--text-on-dark)] mb-4 tracking-tight">
                        Sector-Specific <br />
                        <span style={{ color: 'var(--brand-accent)' }}>Security</span> Strategy
                    </h2>
                    <p className="text-[var(--text-on-dark)] text-[15px] max-w-2xl font-medium leading-relaxed opacity-90">
                        Security strategies aligned with sector-specific risk and regulatory environments.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
                {industries.map((ind, idx) => {
                    const Icon = ind.Icon;
                    return (
                        <Link
                            key={idx}
                            to={ind.href}
                            className={`group relative border border-[var(--brand-accent-soft)] rounded-r-none border-l-[4px] border-l-[var(--brand-accent)] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 overflow-hidden flex flex-col justify-between min-h-[140px]`}
                            style={{
                                backgroundColor: `rgba(${themeConfig.industry.clay.bgColor}, ${themeConfig.industry.clay.bgOpacity})`,
                                backdropFilter: `blur(${themeConfig.industry.clay.blur})`,
                                WebkitBackdropFilter: `blur(${themeConfig.industry.clay.blur})`,
                                boxShadow: `${themeConfig.industry.clay.innerShadow}, ${themeConfig.industry.clay.shadow}`,
                                borderRadius: `0 ${themeConfig.industry.cardRadius || '32px'} ${themeConfig.industry.cardRadius || '32px'} 0`
                            }}
                        >
                            <div className="absolute top-4 right-4 text-4xl font-black select-none transition-opacity"
                                style={{
                                    opacity: 'var(--sector-number-opacity)',
                                    color: 'var(--sector-number-color)',
                                    mixBlendMode: 'var(--sector-number-blend-mode)' as any,
                                    filter: `contrast(var(--sector-number-contrast))`
                                }}>
                                0{idx + 1}
                            </div>

                            <div className="relative z-10">
                                <Icon
                                    className="text-[var(--brand-accent)] mb-5 opacity-80 group-hover:scale-110 transition-transform"
                                    style={{ width: 'var(--sector-icon-size)', height: 'var(--sector-icon-size)', strokeWidth: 'var(--sector-icon-stroke)' }}
                                />
                                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-accent)] transition-colors tracking-tight">
                                    {ind.name}
                                </h3>
                                <p className="text-[var(--text-muted)] text-[12px] leading-relaxed font-medium opacity-80 line-clamp-2">
                                    {ind.desc}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}
