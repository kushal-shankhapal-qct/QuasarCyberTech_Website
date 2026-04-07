import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    MoveRight,
    ArrowRight
} from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS } from '../config/themeConfig';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { capabilities as capabilitiesData } from '../data/capabilitiesData';

import { ASSETS } from '@/constants/assets';


const heroImages: Record<string, string> = {
    'cyber-advisory-risk-governance': ASSETS.capabilities.advisory,
    'compliance-regulatory-assurance': ASSETS.capabilities.compliance,
    'offensive-security-engineering': ASSETS.capabilities.offensive,
    'cloud-infrastructure-security': ASSETS.capabilities.cloud,
    'managed-defense-operations': ASSETS.capabilities.defense,
    'cyber-intelligence-security-research': ASSETS.capabilities.intelligence,
};

// Industry image mapping
const industryImages: Record<string, string> = {
    'banking': ASSETS.industries.banking,
    'fintech': ASSETS.industries.fintech,
    'saas': ASSETS.industries.saas,
    'ecommerce': ASSETS.industries.ecommerce,
    'healthcare': ASSETS.industries.healthcare,
    'enterprise': ASSETS.industries.enterprise,
};

// Keywords for Freepik Search (Fallback for missing images)
const serviceKeywords: Record<string, string> = {
    'RBI Cyber Security Framework Compliance': 'Banking regulation compliance dashboard security illustration',
    'ISO 27001 Consulting': 'ISO 27001 certification standard document security audit',
    'SOC2 Readiness': 'SOC2 compliance report security trust abstract illustration',
    'Regulatory Gap Assessment': 'Security audit checklist gap analysis compliance',
    'Risk & Compliance Monitoring': 'Real-time security compliance monitoring dashboard',
    'Web Application VAPT': 'Web application security testing hacker penetration testing',
    'Mobile & API Security Testing': 'Mobile app security API endpoint testing illustration',
    'Red Team Assessments': 'Red team adversary simulation cyber attack operation',
    'Secure Code Review': 'Software source code security review developer illustration',
    'LLM Penetration Testing': 'AI large language model security testing prompt injection',
    'Agentic AI Security Review': 'Autonomous AI agents security workflow governance',
    'Cloud Security Assessment': 'Cloud infrastructure security assessment AWS Azure GCP',
    'AWS / Azure Security Assessment': 'AWS Azure cloud platform security configuration',
    'Kubernetes / Container Security': 'Kubernetes container security orchestration hardening',
    'Cloud Security Posture Management (CSPM)': 'CSPM cloud security posture management dashboard',
    'Cloud Compliance Review': 'Cloud regulatory compliance data sovereignty security',
    'Managed SOC': 'Cyber security operations center SOC team monitoring',
    'Threat Detection & Monitoring': 'Advanced threat detection network security monitoring',
    'Incident Response': 'Cyber incident response plan emergency forensics',
    'Threat Hunting': 'Proactive threat hunting cyber investigator dashboard',
    'Social Engineering & Phishing Simulations': 'Phishing simulation social engineering awareness training',
    'Cyber Threat Intelligence (CTI) as a Service': 'Actionable threat intelligence feeds security researcher',
    'Dark Web Brand Intelligence': 'Dark web monitoring brand protection cyber crime',
    'Brand Reputation Monitoring': 'Online brand reputation protection impersonation detection',
    'Vulnerability Research': 'Cyber security research vulnerability disclosure zero-day',
    'Security Advisories': 'Security advisory technical notification vulnerability alert',
};

const CapabilityIndividual: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const capability = capabilitiesData.find(c => c.slug === slug);
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);

    useEffect(() => {
        if (!capability) return;

        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const index = capability.services.findIndex(s =>
                s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
            );
            if (index !== -1) {
                setActiveServiceIndex(index);
                setTimeout(() => {
                    const element = document.getElementById('service-area-grid');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [slug, capability]);

    if (!capability) {
        return <Navigate to="/capabilities" />;
    }

    const currentHeroImage = heroImages[slug || ''] || ASSETS.capabilities.worldwideConnection;

    return (
        <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
            <Navbar />

            {/* ─── SECTION 1: HERO (Standardized with PageHero) ─── */}
            <PageHero
                title={capability.name.split(' ').slice(0, -1).join(' ')}
                highlight={capability.name.split(' ').slice(-1).join(' ')}
                subtitle={capability.subtitle}
                image={currentHeroImage}
                scrollTargetId="capability-scope"
                scrollButtonText="See Details"
                breadcrumbPaths={["Home", "Capabilities"]}
                currentName={capability.name}
                imageScale={1}
                maskStart="20%"
                imageOpacity={0.85}
                imagePositionX="center"
                imagePositionY="center"
                imageBlendSoftness="70%"
                imageBlendStartPercent="0%"
            />

            {/* ─── SECTION 2: STRATEGIC SCOPE (ALIGNED PANEL) ─── */}
            <section id="capability-scope" style={{
                background: '#FFFFFF',
                paddingTop: '64px',
                paddingBottom: '64px',
                paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                paddingRight: LAYOUT_CONTROLS.section.paddingX,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div className="cap-scope-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px', alignItems: 'flex-start' }}>
                        {/* Left Content (7-col) */}
                        <div className="cap-scope-content" style={{ gridColumn: 'span 7' }}>
                            <SectionHeader
                                title="Strategic"
                                highlight="Scope"
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '10px' }}>
                                {capability.overview.body.map((paragraph, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#475569' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                        </div>

                        {/* Right Data Panel (5-col) - Moved Up */}
                        <div style={{
                            gridColumn: 'span 5',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(0,0,0,0.08)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                            marginTop: '0px', // Removed 100px gap per user request
                            boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
                        }}>
                            {capability.overview.proofPoints.map((point, i) => (
                                <div key={i} style={{
                                    background: '#F8FAFC',
                                    padding: '28px 32px',
                                    borderBottom: i < capability.overview.proofPoints.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                                }}>
                                    <div style={{ color: COLORS.gold, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                        {point.label}
                                    </div>
                                    <div style={{ color: '#040B1D', fontSize: '1.05rem', fontWeight: 700, marginTop: '8px', lineHeight: 1.4 }}>
                                        {point.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 3: SERVICE AREAS ─── */}
            <section style={{
                background: GRADIENTS.CAPABILITY_INDIVIDUAL_SERVICE_AREAS_BG,
                paddingTop: '64px',
                paddingBottom: '64px',
                paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                paddingRight: LAYOUT_CONTROLS.section.paddingX,
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '80px', textAlign: 'left' }}>
                        <SectionHeader
                            title="Service"
                            highlight="Areas"
                            isDark={true}
                        />
                    </div>

                    <div id="service-area-grid" className="cap-service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '64px' }}>
                        {/* Left Menu (Span 5) */}
                        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {capability.services.map((svc, i) => (
                                <div
                                    key={i}
                                    id={svc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                                    onMouseEnter={() => setActiveServiceIndex(i)}
                                    style={{
                                        flex: 1,
                                        padding: '12px 0', // Further reduced per user request
                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '24px',
                                        transition: 'all 0.3s ease',
                                        opacity: activeServiceIndex === i ? 1 : 0.35,
                                        borderLeft: activeServiceIndex === i ? `2px solid ${COLORS.gold}` : '2px solid transparent',
                                        paddingLeft: activeServiceIndex === i ? '20px' : '0'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span style={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.8rem',
                                            color: activeServiceIndex === i ? COLORS.gold : 'rgba(255,255,255,0.5)',
                                            fontWeight: 700
                                        }}>
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <h3 style={{
                                        color: '#FFFFFF',
                                        fontSize: '0.9rem', // Scaled down further to keep menu compact
                                        fontWeight: 700,
                                        textTransform: activeServiceIndex === i ? 'uppercase' : 'none',
                                        letterSpacing: activeServiceIndex === i ? '0.05em' : 'normal',
                                        margin: 0
                                    }}>
                                        {svc.name}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Right Visual Container */}
                        <div style={{ gridColumn: 'span 7', position: 'relative' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeServiceIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '2px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: '420px' // Slightly reduced
                                    }}
                                >
                                    {capability.services[activeServiceIndex]?.image ? (
                                        <div style={{ position: 'relative' }}>
                                            <img
                                                src={capability.services[activeServiceIndex].image}
                                                alt={`QuasarCyberTech | ${capability.services[activeServiceIndex]?.title || capability.services[activeServiceIndex]?.name || 'Service Visual'}`}
                                                style={{ width: '100%', height: '260px', objectFit: 'cover', objectPosition: 'center center', opacity: 0.9 }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                height: '3px',
                                                width: '60px',
                                                background: COLORS.gold,
                                                zIndex: 10
                                            }} />
                                        </div>
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '260px',
                                            background: 'linear-gradient(135deg, #1A0B12 0%, #0B1F3B 100%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '40px',
                                            textAlign: 'center',
                                            position: 'relative'
                                        }}>
                                            <div style={{ color: COLORS.gold, marginBottom: '12px', opacity: 0.8 }}>
                                                <Zap size={32} />
                                            </div>
                                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '16px', textTransform: 'uppercase' }}>
                                                Image Asset Pending
                                            </p>
                                            <div style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px dashed rgba(255,255,255,0.1)',
                                                padding: '12px 20px',
                                                borderRadius: '4px',
                                                maxWidth: '80%'
                                            }}>
                                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '4px' }}>
                                                    Freepik Search:
                                                </p>
                                                <p style={{ color: COLORS.gold, fontSize: '0.85rem', fontWeight: 700 }}>
                                                    "{serviceKeywords[capability.services[activeServiceIndex].name] || 'Cybersecurity visual illustration'}"
                                                </p>
                                            </div>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                height: '3px',
                                                width: '60px',
                                                background: COLORS.gold,
                                                zIndex: 10
                                            }} />
                                        </div>
                                    )}
                                    <div style={{ padding: '40px 32px', flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.75)',
                                            fontSize: '1rem',
                                            lineHeight: 1.7, // Increased line-height for better filling
                                            margin: 0,
                                            whiteSpace: 'pre-line' // Preserve newlines from data
                                        }}>
                                            {capability.services[activeServiceIndex]?.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 4: DELIVERY APPROACH ─── */}
            <section style={{
                backgroundColor: '#F5F7FA',
                backgroundImage: 'radial-gradient(circle, rgba(107, 21, 48, 0.10) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                paddingTop: '56px',
                paddingBottom: '56px',
                paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                paddingRight: LAYOUT_CONTROLS.section.paddingX
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '80px', textAlign: 'left' }}>
                        <SectionHeader title="Delivery" highlight="Approach" />
                    </div>

                    <div className="cap-delivery-steps" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '48px' }}>
                        {capability.delivery.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div style={{ flex: 1, position: 'relative', textAlign: 'left' }}>
                                    <div style={{
                                        fontSize: '6rem', // Scaled down from 8rem
                                        fontWeight: 800,
                                        color: '#6B1530',
                                        lineHeight: 1,
                                        marginBottom: '24px',
                                        fontFamily: TYPOGRAPHY.fontHeading
                                    }}>
                                        0{idx + 1}
                                    </div>
                                    <h4 style={{ color: '#0B1F3B', fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                                        {step.title}
                                    </h4>
                                    <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                                        {step.description}
                                    </p>
                                </div>
                                {idx < capability.delivery.length - 1 && (
                                    <div style={{ paddingTop: '110px', color: '#D6B05C' }}>
                                        <MoveRight size={32} strokeWidth={1} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── SECTION 6: INDUSTRY APPLICATION (ALIGNED DARK) ─── */}
            <section style={{
                background: GRADIENTS.CAPABILITY_INDIVIDUAL_INDUSTRY_APPLICATION_BG,
                paddingTop: '48px',
                paddingBottom: '48px',
                paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                paddingRight: LAYOUT_CONTROLS.section.paddingX
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '64px', textAlign: 'left' }}>
                        <SectionHeader title="Industry" highlight="Application" isDark={true} />
                    </div>

                    <div className="cap-industry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                        {capability.industries.map(ind => (
                            <Link key={ind.slug} to={`/industries/${ind.slug}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: `2px`,
                                    borderTop: `4px solid ${COLORS.burgundy}`,
                                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                                    borderRight: '1px solid rgba(255,255,255,0.05)',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s ease',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                    position: 'relative',
                                    height: '100%'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,21,48,0.2)';
                                        e.currentTarget.style.borderTopColor = COLORS.gold;
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                                        e.currentTarget.style.borderTopColor = COLORS.burgundy;
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                    }}
                                >
                                    <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column' }}>
                                        <h4 style={{
                                            color: '#FFFFFF',
                                            fontWeight: 700,
                                            fontSize: '17px',
                                            margin: '0 0 12px 0',
                                            fontFamily: TYPOGRAPHY.fontHeading,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {ind.name}
                                            <ArrowRight size={14} color={COLORS.gold} />
                                        </h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                                            {ind.useCase}
                                        </p>
                                    </div>
                                    <div style={{ height: '200px', overflow: 'hidden', opacity: 0.85 }}>
                                        <img src={industryImages[ind.slug]} alt={`QuasarCyberTech | ${ind.name} Industry`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SECTION 7: FINAL CTA (LIGHT MODE) ─── */}
            <CTASection
                theme="light"
                title={<>Strengthen Your <br /><span style={{ color: COLORS.burgundy }}>{capability.name}</span> Program</>}
                subtitle={`Discuss Your ${capability.name} Strategy with Our Experts`}
            />

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
              @media (max-width: 1024px) {
                .cap-scope-grid { gap: 40px !important; }
                .cap-service-grid { gap: 32px !important; }
              }
              @media (max-width: 768px) {
                /* Strategic Scope: stack text and data panel */
                .cap-scope-grid {
                  display: flex !important;
                  flex-direction: column !important;
                }
                .cap-scope-grid > div {
                  grid-column: span 12 !important;
                }
                /* Service Areas: stack list above visual */
                .cap-service-grid {
                  display: flex !important;
                  flex-direction: column !important;
                  gap: 32px !important;
                }
                .cap-service-grid > div {
                  grid-column: span 12 !important;
                }
                /* Delivery Steps: wrap */
                .cap-delivery-steps {
                  flex-wrap: wrap !important;
                  gap: 24px !important;
                }
                /* Industry cards: 1 column */
                .cap-industry-grid {
                  grid-template-columns: 1fr !important;
                }
              }
              @media (max-width: 480px) {
                .cap-industry-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}} />
        </div>
    );
};

export default CapabilityIndividual;
