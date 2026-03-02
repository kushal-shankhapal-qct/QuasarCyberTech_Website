import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, ShieldAlert, Wrench, ArrowRight, Clock, CalendarDays, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../shared/Breadcrumbs';

export interface SubServiceCategory {
    title: string;
    items: string[];
}

export interface EngagementModel {
    type: 'recurring' | 'project' | 'hybrid';
    sla?: string;
    duration?: string;
    description: string;
}

export interface ServicePageProps {
    seoTitle: string; // Hybrid naming SEO title (e.g. Cloud Security Posture Management)
    heroSubtitle: string; // The proprietary or generic subtext
    heroDescription: string;
    threatLandscape: string; // Industry challenge
    subServices: SubServiceCategory[];
    methodology: { step: string; title: string; description: string }[];
    toolsAndStandards: string[];
    engagementModel: EngagementModel; // Section 6
    advantages?: { title: string; description: string; icon?: React.ElementType }[]; // Section 7
    caseStudyPreview?: { title: string; impact: string; description: string }; // Optional legacy support
    crossLinkBanner?: { title: string; description: string; linkText: string; linkHref: string; iconNode?: React.ReactNode; isExternal?: boolean };
    relatedServices?: { title: string; linkHref: string; description: string }[];
}

export default function ServicePageTemplate({
    seoTitle,
    heroSubtitle,
    heroDescription,
    threatLandscape,
    subServices,
    methodology,
    toolsAndStandards,
    engagementModel,
    advantages,
    caseStudyPreview,
    crossLinkBanner,
    relatedServices
}: ServicePageProps) {
    const [activeCategory, setActiveCategory] = useState<number | null>(0);

    const renderEngagementIcon = () => {
        switch (engagementModel.type) {
            case 'recurring': return <Clock className="w-8 h-8 text-[#8B1E3F]" />;
            case 'project': return <CalendarDays className="w-8 h-8 text-[#8B1E3F]" />;
            case 'hybrid': return <Briefcase className="w-8 h-8 text-[#8B1E3F]" />;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-[100px] pb-20">
                {/* Breadcrumbs for SEO and Navigation */}
                <div className="max-w-7xl mx-auto px-6 mb-8 mt-4">
                    <Breadcrumbs />
                </div>

                {/* Section 1: Hero */}
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-4 tracking-tight">
                            {seoTitle}
                        </h1>
                        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-6 tracking-wide">
                            {heroSubtitle}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {heroDescription}
                        </p>
                    </motion.div>
                </section>

                {/* Section 2: Threat Landscape */}
                <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-16 mb-20 border-y border-gray-800">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <ShieldAlert className="w-12 h-12 text-[#8B1E3F] mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-6">Threat Landscape</h2>
                        <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-[#8B1E3F] pl-6 text-left inline-block">
                            "{threatLandscape}"
                        </p>
                    </div>
                </section>

                {/* Section 3: Expandable Sub-Service Modules */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-2 text-center">Core Capabilities</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore our specialized sub-services within this pillar.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-3">
                            {subServices.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveCategory(activeCategory === idx ? null : idx)}
                                    className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all duration-300 flex justify-between items-center ${activeCategory === idx
                                        ? 'bg-[#8B1E3F] text-white shadow-lg shadow-[#8B1E3F]/20'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                                        }`}
                                >
                                    {cat.title}
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeCategory === idx ? 'rotate-180' : ''}`} />
                                </button>
                            ))}
                        </div>
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {activeCategory !== null && (
                                    <motion.div
                                        key={activeCategory}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white border text-[#0F172A] border-gray-200 rounded-2xl p-8 shadow-sm h-full"
                                    >
                                        <h3 className="text-2xl font-bold mb-6 text-[#0F172A] border-b border-gray-100 pb-4">
                                            {subServices[activeCategory].title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {subServices[activeCategory].items.map((item, i) => (
                                                <div key={i} className="flex items-start">
                                                    <CheckCircle2 className="w-5 h-5 text-[#8B1E3F] mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Section 4: Methodology */}
                <section className="bg-gray-50 py-20 mb-20 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Our Methodology</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {methodology.map((step, idx) => (
                                <div key={idx} className="relative">
                                    {idx !== methodology.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-1/2 w-full border-t-2 border-dashed border-gray-300"></div>
                                    )}
                                    <div className="relative z-10 bg-white w-16 h-16 rounded-full border-4 border-gray-50 shadow-md flex items-center justify-center text-xl font-bold text-[#8B1E3F] mb-6 mx-auto">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-center text-[#0F172A] mb-3">{step.title}</h3>
                                    <p className="text-gray-600 text-center text-sm leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 5: Tools & Standards */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="flex flex-col md:flex-row items-center justify-between bg-[#0F172A] rounded-3xl p-10 md:p-14 overflow-hidden relative shadow-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1E3F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="md:w-1/3 mb-8 md:mb-0 relative z-10">
                            <Wrench className="w-10 h-10 text-[#8B1E3F] mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-4">Tools & Standards</h2>
                            <p className="text-gray-400">We leverage industry-leading technologies and adhere to global compliance frameworks.</p>
                        </div>
                        <div className="md:w-2/3 md:pl-12 relative z-10">
                            <div className="flex flex-wrap gap-3">
                                {toolsAndStandards.map((tool, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/10 font-medium text-sm backdrop-blur-sm">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: Engagement Model */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Engagement Model</h2>
                    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm text-center">
                        <div className="w-16 h-16 bg-[#8B1E3F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            {renderEngagementIcon()}
                        </div>
                        <div className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-full mb-6 uppercase tracking-wider">
                            {engagementModel.type} Engagement
                        </div>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                            {engagementModel.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 border-t border-gray-100 pt-8 mt-8">
                            {engagementModel.sla && (
                                <div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Service Level Objective</div>
                                    <div className="text-xl font-black text-[#0F172A]">{engagementModel.sla}</div>
                                </div>
                            )}
                            {engagementModel.duration && (
                                <div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Typical Duration</div>
                                    <div className="text-xl font-black text-[#0F172A]">{engagementModel.duration}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Optional Case Study Preview */}
                {caseStudyPreview && (
                    <section className="max-w-7xl mx-auto px-6 mb-24">
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Proven Impact</h2>
                        <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-200 rounded-2xl p-8 lg:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
                            <div className="md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 md:pr-10">
                                <div className="text-5xl font-black text-[#8B1E3F] mb-2">{caseStudyPreview.impact}</div>
                                <div className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Key Metric</div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{caseStudyPreview.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{caseStudyPreview.description}</p>
                                <Link to="/resources" className="inline-flex items-center text-[#8B1E3F] font-bold hover:text-[#C41E5E] transition-colors">
                                    Read Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Cross Link Banner */}
                {crossLinkBanner && (
                    <section className="max-w-7xl mx-auto px-6 mb-24">
                        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between border border-[#8B1E3F]/30 shadow-2xl shadow-[#8B1E3F]/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1E3F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="md:w-2/3 relative z-10 flex items-start">
                                {crossLinkBanner.iconNode && <div className="mr-6 bg-[#8B1E3F]/20 p-4 rounded-xl shrink-0 border border-[#8B1E3F]/30">{crossLinkBanner.iconNode}</div>}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{crossLinkBanner.title}</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">{crossLinkBanner.description}</p>
                                </div>
                            </div>
                            <div className="md:w-1/3 mt-8 md:mt-0 flex shrink-0 md:justify-end relative z-10">
                                {crossLinkBanner.isExternal ? (
                                    <a href={crossLinkBanner.linkHref} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap px-8 py-4 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center shadow-lg">
                                        {crossLinkBanner.linkText} <ArrowRight className="w-5 h-5 ml-2 text-[#8B1E3F]" />
                                    </a>
                                ) : (
                                    <Link to={crossLinkBanner.linkHref} className="whitespace-nowrap px-8 py-4 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center shadow-lg">
                                        {crossLinkBanner.linkText} <ArrowRight className="w-5 h-5 ml-2 text-[#8B1E3F]" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 7: Advantages / Differentiators */}
                {advantages && advantages.length > 0 && (
                    <section className="bg-[#FCFBF9] py-20 mb-20 border-y border-gray-100">
                        <div className="max-w-7xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Why QuasarCyberTech</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {advantages.map((adv, idx) => {
                                    const Icon = adv.icon;
                                    return (
                                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            {Icon && <Icon className="w-10 h-10 text-[#8B1E3F] mb-4" />}
                                            <h3 className="text-xl font-bold text-[#0F172A] mb-3">{adv.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{adv.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 8: CTA */}
                <section className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Secure Your Infrastructure Today</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Partner with QuasarCyberTech to build a resilient security posture tailored to your specific needs.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-8 py-4 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6B1530] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#8B1E3F]/20"
                    >
                        Schedule a Strategy Call
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
}
