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
            style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--bg-services)' }}
        >
            <div className="max-w-7xl relative z-10 mx-auto">
                {/* Container Card with dynamic border rounding matching config */}
                <div className={`bg-[var(--card-nested-surface)] backdrop-blur-md p-6 lg:p-8 border border-[var(--brand-accent-soft)] shadow-[0_8px_30px_rgba(0,0,0,0.02)] mx-4 sm:mx-6 lg:mx-8
                    ${serviceVars.borderDirection === 'left' ? 'border-l-[4px] border-l-[var(--brand-accent)] rounded-r-[40px] rounded-l-none' : ''}
                    ${serviceVars.borderDirection === 'right' ? 'border-r-[4px] border-r-[var(--brand-accent)] rounded-l-[40px] rounded-r-none' : ''}
                    ${serviceVars.borderDirection === 'top' ? 'border-t-[4px] border-t-[var(--brand-accent)] rounded-b-[40px] rounded-t-none' : ''}
                    ${serviceVars.borderDirection === 'bottom' ? 'border-b-[4px] border-b-[var(--brand-accent)] rounded-t-[40px] rounded-b-none' : ''}
                    ${!['left', 'right', 'top', 'bottom'].includes(serviceVars.borderDirection) ? 'rounded-[40px]' : ''}
                `}>
                    <div className="text-left mb-10 px-2">
                        <h2 className="text-[40px] md:text-[52px] font-[800] leading-[1.1] text-black mb-4 tracking-tight">
                            Enterprise <br />
                            <span style={{ color: 'var(--brand-accent)' }}>Security</span> Services
                        </h2>
                        <p className="text-[var(--text-muted)] text-[15px] max-w-2xl font-medium leading-relaxed opacity-90">
                            Engineering resilience across applications, infrastructure, and digital ecosystems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {services.map((service, idx) => {
                            const Icon = service.Icon;
                            return (
                                <Link
                                    key={idx}
                                    to={service.href}
                                    className={`group flex flex-col bg-[var(--card-surface-primary)] backdrop-blur-sm border border-[var(--brand-accent-soft)] border-l-[4px] border-l-[var(--brand-accent)] rounded-r-2xl rounded-l-none p-4 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg`}
                                >
                                    <div className="mb-3 text-[var(--brand-accent)] group-hover:scale-110 transition-transform relative z-10">
                                        <Icon className="w-6 h-6 stroke-[1.8]" />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-1 leading-snug group-hover:text-[var(--brand-accent)] transition-colors relative z-10 lg:min-h-[42px] content-start">
                                        {service.title}
                                    </h3>
                                    <p className="text-[var(--text-muted)] text-[12px] leading-relaxed line-clamp-3 mt-auto relative z-10 font-medium opacity-90">
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
