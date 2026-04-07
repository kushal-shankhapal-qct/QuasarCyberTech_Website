import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import CapabilityCardSimple from '../components/capabilities/cards/CapabilityCardSimple';
import PageHero from '../components/PageHero';
import Seo from '../components/seo/Seo';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { capabilities } from '../data/capabilitiesData';
import { createBreadcrumbSchema } from '../seo/schema';

const CapabilitiesOverview: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: SECTION_BACKGROUNDS.DARK, display: 'flex', flexDirection: 'column' }}>
            <Seo
                title="Top Enterprise Cybersecurity Services India — VAPT, SOC, Cloud & Compliance"
                description="QuasarCyberTech offers the full spectrum of enterprise cybersecurity services in India — VAPT, penetration testing, managed SOC, cloud security, RBI compliance, ISO 27001, vCISO, and cyber threat intelligence."
                path="/capabilities"
                image={ASSETS.capabilities.worldwideConnection}
                jsonLd={[
                    createBreadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Capabilities', path: '/capabilities' },
                    ]),
                ]}
            />
            <Navbar />

            <PageHero
                title="Cybersecurity"
                highlight="Capabilities"
                subtitle="QuasarCyberTech provides a comprehensive suite of security engineering and advisory services designed to protect your enterprise from the hardware layer to the cloud perimeter."
                backgroundOverride={GRADIENTS.CAPABILITIES_OVERVIEW_HERO_BG}
                breadcrumbPaths={['Home']}
                currentName="Capabilities"
                image={ASSETS.capabilities.worldwideConnection}
                imageRotate="-90deg"
                imageRotateMobile="0deg"
                imageScale={1.3}
                imagePositionX="center"
                imagePositionY="center"
                imageBlendSoftness="70%"
                imageBlendStartPercent="0%"
                scrollTargetId="pillars"
                scrollButtonText="Explore Capabilities"
                scrollMethod="motion"
            />

            {/* Redundant Manual Scroll Button Removed - PageHero now handles this */}

            {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
            <section id="pillars" className="capabilities-overview-section" style={{
                background: '#FFFFFF', // Use Pure White to match Homepage grid background
                paddingTop: LAYOUT_CONTROLS.section.paddingTop,
                paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
                paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}>
                    <div style={{ width: '100%' }}>
                        <div style={{ marginBottom: '48px' }}>
                            <h2 style={{
                                fontFamily: TYPOGRAPHY.fontHeading,
                                fontSize: 'clamp(32px, 4vw, 48px)',
                                fontWeight: 700,
                                color: COLORS.textOnLight,
                                marginBottom: '16px',
                                lineHeight: 1.15,
                                letterSpacing: '-0.01em',
                            }}>
                                Core <span style={{ color: COLORS.burgundy }}>Capabilities</span>
                            </h2>
                            <p style={{
                                color: COLORS.textSub,
                                fontSize: '1.125rem',
                                maxWidth: '600px',
                                lineHeight: 1.6,
                                fontFamily: TYPOGRAPHY.fontBody
                            }}>
                                Full-spectrum protection designed for the modern digital enterprise.
                            </p>
                        </div>

                        {/* Grid container with Height set to match homepage cards exactly */}
                                                <div className="capabilities-overview-grid" style={{
                            display: 'grid',
                                                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                            gap: '32px',
                            marginTop: '64px'
                        }}>
                            {capabilities.map((cap) => (
                                <div key={cap.id}>
                                    <CapabilityCardSimple
                                        title={cap.name}
                                                                                mobileTitle={cap.navLabel}
                                        desc={cap.cardDescription}
                                        href={`/capabilities/${cap.slug}`}
                                        img={cap.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                                        <style
                                                dangerouslySetInnerHTML={{
                                                        __html: `
                                                        @media (max-width: 64rem) {
                                                            .capabilities-overview-grid {
                                                                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                                                            }
                                                        }

                                                        @media (max-width: 40rem) {
                                                            .capabilities-overview-grid {
                                                                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                                                                gap: 1.125rem !important;
                                                            }
                                                        }
                                                    `,
                                                }}
                                        />
            </section>

            <CTASection theme="dark" />
            <Footer />
        </div>
    );
};

export default CapabilitiesOverview;
