import React from 'react';
import { Link } from 'react-router-dom';
import {
    Code, Smartphone, Server, Cloud, Target,
    Shield, Search, ClipboardCheck, Cpu, Activity
} from 'lucide-react';

import { themeConfig } from '../config/themeConfig';

const serviceVars = themeConfig.services;

export default function EnterpriseServices() {
    const services = [
        {
            title: 'Application Security',
            desc: 'Secure SDLC, code review, API testing, DevSecOps integration.',
            href: '/services/application-security',
            Icon: Code
        },
        {
            title: 'Mobile Security',
            desc: 'iOS & Android security testing, reverse engineering, runtime analysis.',
            href: '/services/mobile-security',
            Icon: Smartphone
        },
        {
            title: 'Network Security',
            desc: 'Infrastructure testing, segmentation validation, perimeter defense review.',
            href: '/services/network-security',
            Icon: Server
        },
        {
            title: 'Cloud Security',
            desc: 'Cloud configuration audits, IAM review, container security.',
            href: '/services/cloud-security',
            Icon: Cloud
        },
        {
            title: 'Red Team & Adversary Simulation',
            desc: 'Advanced attack emulation and breach simulation.',
            href: '/services/red-team-adversary-simulation',
            Icon: Target
        },
        {
            title: 'Managed Security Operations',
            desc: 'Continuous monitoring, SOC support, detection engineering.',
            href: '/services/managed-security-operations',
            Icon: Shield
        },
        {
            title: 'Incident Response & Threat Hunting',
            desc: 'Rapid containment, forensic investigation, proactive threat discovery.',
            href: '/services/incident-response',
            Icon: Search
        },
        {
            title: 'Risk & Compliance',
            desc: 'Regulatory mapping, gap assessment, audit readiness.',
            href: '/services/risk-compliance',
            Icon: ClipboardCheck
        },
        {
            title: 'Architecture & Engineering',
            desc: 'Secure architecture design, zero-trust frameworks, security engineering.',
            href: '/services/architecture-engineering',
            Icon: Cpu
        },
        {
            title: 'Digital Risk & Monitoring',
            desc: 'External attack surface monitoring, brand impersonation tracking.',
            href: '/services/digital-risk-monitoring',
            Icon: Activity
        }
    ];

    return (
        <section
            className="relative"
            style={{ paddingTop: serviceVars.paddingTop, paddingBottom: serviceVars.paddingBottom }}
        >
            <div className="max-w-[1600px] relative z-10" style={{ marginLeft: '2.5rem' }}>
                <div className="text-left mb-12">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight">
                        Enterprise Security Services
                    </h2>
                    <p className="text-black text-[15px] max-w-2xl font-medium leading-relaxed opacity-80">
                        Engineering resilience across applications, infrastructure, and digital ecosystems.
                    </p>
                </div>

                {/* Container Card with dynamic border rounding matching config */}
                <div className={`${serviceVars.gridBg} ${serviceVars.gridBlur} p-4 lg:p-8 border border-white/40 shadow-sm mr-[2.5rem] 
                    ${serviceVars.borderDirection === 'left' ? 'border-l-[4px] border-l-[#8B1E3F] rounded-r-[40px] rounded-l-none' : ''}
                    ${serviceVars.borderDirection === 'right' ? 'border-r-[4px] border-r-[#8B1E3F] rounded-l-[40px] rounded-r-none' : ''}
                    ${serviceVars.borderDirection === 'top' ? 'border-t-[4px] border-t-[#8B1E3F] rounded-b-[40px] rounded-t-none' : ''}
                    ${serviceVars.borderDirection === 'bottom' ? 'border-b-[4px] border-b-[#8B1E3F] rounded-t-[40px] rounded-b-none' : ''}
                    ${!['left', 'right', 'top', 'bottom'].includes(serviceVars.borderDirection) ? 'rounded-[40px]' : ''}
                `}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {services.map((service, idx) => {
                            const Icon = service.Icon;
                            return (
                                <Link
                                    key={idx}
                                    to={service.href}
                                    className={`group flex flex-col ${serviceVars.cardBg} ${serviceVars.cardBlur} border border-white/50 border-l-[4px] border-l-[#8B1E3F] rounded-r-2xl rounded-l-none p-6 hover:-translate-y-1 transition-all duration-150 relative overflow-hidden shadow-sm hover:shadow-md`}
                                >
                                    <div className="mb-4 text-[#0F172A] group-hover:text-[#8B1E3F] transition-colors relative z-10">
                                        <Icon className="w-8 h-8 stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#8B1E3F] transition-colors relative z-10">
                                        {service.title}
                                    </h3>
                                    <p className="text-black text-[13px] leading-relaxed line-clamp-2 mt-auto relative z-10 font-medium">
                                        {service.desc}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
