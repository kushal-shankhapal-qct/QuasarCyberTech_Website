import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import { Link } from 'react-router-dom';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';
import CapabilityCardFlip from '../components/capabilities/cards/CapabilityCardFlip';

import { ASSETS } from '@/constants/assets';

// Photo Imports removed - now using ASSETS constant
const imgHeroBg = ASSETS.backdrops.quasar; // Using Quasar backdrop for hero

const HERO_IMAGE_CONFIG = {
    objectPosition: 'right center',
    blendStart: '15%',
    blendMidpoint: '45%',
    blendEnd: '70%',
    opacity: 0.88,
    rotate: -90,                     // user requested rotate, not flip
    scale: 1.0,                     // scale up to fill space after rotate
    nudgeX: '0%',                    // push globe slightly right
};

const capPhotos = [
    ASSETS.capabilities.advisory,
    ASSETS.capabilities.compliance,
    ASSETS.capabilities.offensive,
    ASSETS.capabilities.cloud,
    ASSETS.capabilities.defense,
    ASSETS.capabilities.intelligence
];



const ServicesOverview: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* ─── SECTION 1: HERO (Two Column Structure) ─── */}
                <section
                    className="flex flex-row items-end"
                    style={{
                        background: GRADIENTS.HERO_BG,
                        minHeight: '100vh',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Breadcrumbs - Positioned relative to the section */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'absolute',
                        top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY})`,
                        left: `calc(${LAYOUT_CONTROLS.breadcrumbs.left} + ${LAYOUT_CONTROLS.breadcrumbs.offsetX})`,
                        fontSize: '12px',
                        fontFamily: TYPOGRAPHY.fontBody,
                        zIndex: 10,
                    }}>
                        <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Capabilities</span>
                    </div>

                    {/* Left column (Text) */}
                    <div
                        className="w-full md:w-[55%]"
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            paddingLeft: LAYOUT_CONTROLS.section.paddingX,
                            paddingBottom: '3rem',
                            paddingRight: LAYOUT_CONTROLS.section.paddingX,
                        }}
                    >


                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        boxSizing: 'border-box',
                        zIndex: 2,
                        maxWidth: '780px',
                    }}>
                        <h1 style={{
                            ...TYPOGRAPHY.heroTitle,
                            fontFamily: TYPOGRAPHY.fontHeading,
                            color: COLORS.textOnDark,
                            marginBottom: '28px',
                        }}>
                            Our Core <span style={{ color: COLORS.gold }}>Capabilities</span>
                        </h1>

                        <p style={{
                            ...TYPOGRAPHY.bodyLarge,
                            color: 'rgba(255,255,255,0.76)',
                            textAlign: 'left',
                            maxWidth: '90%',
                            marginBottom: '42px',
                            lineHeight: 1.7,
                            letterSpacing: '0.01em'
                        }}>
                            QuasarCyberTech delivers cybersecurity consulting and engineering designed for enterprise scale - from advisory and offensive security to managed defense and advanced security platforms.
                        </p>

                        <div style={{ display: 'flex', marginBottom: '24px' }}>
                            <Link to="/contact" style={{
                                ...TYPOGRAPHY.buttonLarge,
                                background: COLORS.burgundy,
                                color: '#FFFFFF',
                                border: '1px solid transparent',
                                padding: '14px 34px',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                            }}>
                                Talk to a Security Expert
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column (Image with Seamless Blend) */}
                <div
                    className="hidden md:block"
                    style={{
                        position: 'relative',
                        width: '45%',
                        alignSelf: 'stretch',
                        overflow: 'hidden',
                        flexShrink: 0,
                        WebkitMaskImage: `
                            linear-gradient(
                              to right,
                              transparent 0%,
                              rgba(0,0,0,0.3) ${HERO_IMAGE_CONFIG.blendStart},
                              rgba(0,0,0,0.7) ${HERO_IMAGE_CONFIG.blendMidpoint},
                              rgba(0,0,0,1) ${HERO_IMAGE_CONFIG.blendEnd}
                            ),
                            linear-gradient(to bottom, transparent 0%, black 10%)
                        `,
                        maskImage: `
                            linear-gradient(
                              to right,
                              transparent 0%,
                              rgba(0,0,0,0.3) ${HERO_IMAGE_CONFIG.blendStart},
                              rgba(0,0,0,0.7) ${HERO_IMAGE_CONFIG.blendMidpoint},
                              rgba(0,0,0,1) ${HERO_IMAGE_CONFIG.blendEnd}
                            ),
                            linear-gradient(to bottom, transparent 0%, black 10%)
                        `,
                        WebkitMaskComposite: 'destination-in',
                        maskComposite: 'intersect'
                    }}
                >
                    <img
                        src={imgHeroBg}
                        alt="Capabilities Hero Background"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: HERO_IMAGE_CONFIG.objectPosition,
                            display: 'block',
                            opacity: HERO_IMAGE_CONFIG.opacity,
                            transform: `rotate(${HERO_IMAGE_CONFIG.rotate}deg) scale(${HERO_IMAGE_CONFIG.scale}) translateX(${HERO_IMAGE_CONFIG.nudgeX})`,
                            zIndex: 0
                        }}
                    />
                </div>
            </section>

            <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
                {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
                <section id="pillars" style={{
                    background: '#FFFFFF', // Use Pure White to match Homepage grid background
                    padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`
                }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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
                                Cybersecurity <span style={{ color: COLORS.burgundy }}>Capabilities</span>
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
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                            gap: '32px',
                            marginTop: '64px'
                        }}>
                            {capabilitiesData.map((cap, i) => (
                                <div key={cap.slug} style={{ height: '324px' }}> {/* Reduced height per user request */}
                                    <CapabilityCardFlip
                                        title={cap.name}
                                        desc={cap.description}
                                        href={`/capabilities/${cap.slug}`}
                                        img={capPhotos[i]}
                                        index={i}
                                        theme="burgundy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection showMetrics={false} theme="dark" />
                <Footer />
            </div>
        </div>
    );
};

export default ServicesOverview;