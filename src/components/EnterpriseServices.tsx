import React from 'react';
import { Link } from 'react-router-dom';
import {
    Code, Smartphone, Server, Cloud, Target,
    Shield, Search, ClipboardCheck, Cpu, Activity
} from 'lucide-react';

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
        <section className="py-[120px] relative">
            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                        Enterprise Security Services
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Engineering resilience across applications, infrastructure, and digital ecosystems.
                    </p>
                </div>

                <div className="bg-[#F8FAFC] p-4 lg:p-8 rounded-3xl border border-gray-200/50 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {services.map((service, idx) => {
                            const Icon = service.Icon;
                            return (
                                <Link
                                    key={idx}
                                    to={service.href}
                                    className="group flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="mb-4 text-[#0F172A] group-hover:text-[#8B1E3F] transition-colors relative z-10">
                                        <Icon className="w-8 h-8 stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-[17px] font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#8B1E3F] transition-colors relative z-10">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-auto relative z-10">
                                        {service.desc}
                                    </p>

                                    {/* Hover Underline Accent */}
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#8B1E3F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
