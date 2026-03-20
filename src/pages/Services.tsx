import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS, ALPHAS } from '../config/themeConfig';
import { capabilitiesData } from '../data/capabilitiesData';

import svc1 from '../assets/logos copy/SVCs_Set_2/SVC_1.png';
import svc2 from '../assets/logos copy/SVCs_Set_2/SVC_2.png';
import svc3 from '../assets/logos copy/SVCs_Set_2/SVC_3.png';
import svc4 from '../assets/logos copy/SVCs_Set_2/SVC_4.png';
import svc5 from '../assets/logos copy/SVCs_Set_2/SVC_5.png';
import svc6 from '../assets/logos copy/SVCs_Set_2/SVC_6.png';

// Capability Photos
import imgAdvisory from "../assets/capabilities/Cyber Advisory & Risk Governance.jpg";
import imgCompliance from "../assets/capabilities/Compliance & Regulatory Assurance.jpg";
import imgOffensive from "../assets/capabilities/Offensive Security Engineering.jpg";
import imgCloud from "../assets/capabilities/Cloud & Infrastructure Security.jpg";
import imgManagedDefense from "../assets/capabilities/Managed Defense Operations_2.jpeg";
import imgIntelligence from "../assets/capabilities/Cyber Intelligence & Security Research.webp";

const svcImagesLabels = [
  { img: svc1, code: 'SVC.01', name: 'Cyber Advisory & Risk Governance' },
  { img: svc2, code: 'SVC.02', name: 'Compliance & Regulatory Assurance' },
  { img: svc3, code: 'SVC.03', name: 'Offensive Security Engineering' },
  { img: svc4, code: 'SVC.04', name: 'Cloud & Infrastructure Security' },
  { img: svc5, code: 'SVC.05', name: 'Managed Defense Operations' },
  { img: svc6, code: 'SVC.06', name: 'Intelligence & Security Research' },
];

const capPhotos = [imgAdvisory, imgCompliance, imgOffensive, imgCloud, imgManagedDefense, imgIntelligence];

const ServicesOverview: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.DARK, minHeight: '100vh' }}>
      <Navbar />

      {/* ─── SECTION 1: HERO (Two Column) ─── */}
      {/* ─── SECTION 1: HERO (Two Column) ─── */}
      <section
        style={{
          background: GRADIENTS.HERO_BG,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Anchor content to bottom
          alignItems: 'flex-start',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          paddingBottom: '3em',
          paddingTop: '0em',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100%',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
          boxSizing: 'border-box',
          zIndex: 2
        }} className="hero-columns-container">
          <style>{`
            @media (max-width: 1024px) {
              .hero-columns-container { flex-direction: column !important; align-items: flex-start !important; }
              .constellation-wrapper { margin-top: 100px !important; margin-left: 0 !important; transform: scale(0.8) !important; align-self: center !important; }
            }
          `}</style>

          {/* Left Column */}
          <div style={{ maxWidth: '720px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              fontSize: '12px',
              fontFamily: TYPOGRAPHY.fontBody,
            }}>
              <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
              <span style={{ color: COLORS.teal, opacity: 0.6 }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Capabilities</span>
            </div>

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
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px',
            }}>
              QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
            </p>

            <div style={{ display: 'flex' }}>
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

          {/* Right Column — SVC Grid (Refined) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 170px)',
            gap: '12px',
            paddingTop: '32px'
          }}>
            {svcImagesLabels.map((svc) => (
              <div key={svc.code} style={{
                width: '170px',
                position: 'relative',
                overflow: 'hidden',
                borderLeft: `3px solid ${COLORS.gold}`,
                borderRadius: '0 12px 12px 0',
                background: '#040B1D',
                cursor: 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                  e.currentTarget.style.borderLeftColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.borderLeftColor = COLORS.gold;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Image Top */}
                <div style={{ height: '84px', overflow: 'hidden' }}>
                  <img src={svc.img} alt={svc.code} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                </div>
                {/* Name Below */}
                <div style={{
                  background: COLORS.burgundy,
                  padding: '8px 10px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {svc.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        {/* ─── SECTION 2: CAPABILITIES GRID (LIGHT) ─── */}
        <section id="pillars" style={{
          background: SECTION_BACKGROUNDS.LIGHT,
          backgroundImage: `
            linear-gradient(rgba(11, 31, 59, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11, 31, 59, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader
              title="Cybersecurity"
              highlight="Capabilities"
              subtitle="Full-spectrum protection designed for the modern digital enterprise."
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginTop: '64px' }}>
              {capabilitiesData.map((cap, i) => {
                return (
                  <Link
                    key={cap.slug}
                    to={`/capabilities/${cap.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.article
                      whileHover={{ y: -4 }}
                      style={{
                        background: '#FFFFFF',
                        borderTop: `4px solid ${COLORS.teal}`,
                        borderRadius: '0 0 8px 8px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
                        e.currentTarget.style.borderTopColor = COLORS.burgundy;
                        const img = e.currentTarget.querySelector('.card-photo') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1.04)';
                        const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLDivElement;
                        if (overlay) overlay.style.opacity = '0.6';

                        // Internal elements burgundy
                        const label = e.currentTarget.querySelector('.cap-label') as HTMLParagraphElement;
                        if (label) label.style.color = COLORS.burgundy;
                        const explore = e.currentTarget.querySelector('.cap-explore') as HTMLDivElement;
                        if (explore) {
                          explore.style.color = COLORS.burgundy;
                          explore.style.borderBottomColor = COLORS.burgundy;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        e.currentTarget.style.borderTopColor = COLORS.teal;
                        const img = e.currentTarget.querySelector('.card-photo') as HTMLImageElement;
                        if (img) img.style.transform = 'scale(1)';
                        const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLDivElement;
                        if (overlay) overlay.style.opacity = '1';

                        // Revert internal elements
                        const label = e.currentTarget.querySelector('.cap-label') as HTMLParagraphElement;
                        if (label) label.style.color = COLORS.teal;
                        const explore = e.currentTarget.querySelector('.cap-explore') as HTMLDivElement;
                        if (explore) {
                          explore.style.color = COLORS.teal;
                          explore.style.borderBottomColor = COLORS.teal;
                        }
                      }}
                    >
                      {/* Photo Area */}
                      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                        <img
                          className="card-photo"
                          src={capPhotos[i]}
                          alt={cap.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transition: 'transform 0.4s ease',
                          }}
                        />
                        <div
                          className="card-overlay"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(160deg, rgba(107,15,43,0.15) 0%, rgba(11,31,59,0.25) 100%)',
                            transition: 'opacity 0.4s ease',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>

                      {/* Body */}
                      <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <p className="cap-label" style={{
                            color: COLORS.teal,
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: 0,
                            transition: 'color 0.3s ease'
                          }}>
                            SVC.0{i + 1}
                          </p>
                          <div className="cap-explore" style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: COLORS.teal,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            borderBottom: `2px solid ${COLORS.teal}`,
                            paddingBottom: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.3s ease'
                          }}>
                            Explore Capability <ArrowRight size={14} />
                          </div>
                        </div>

                        <h3 style={{
                          color: '#0B1F3B',
                          fontWeight: 700,
                          fontSize: '17px',
                          lineHeight: 1.3,
                          marginBottom: '10px',
                          fontFamily: TYPOGRAPHY.fontHeading
                        }}>
                          {cap.name}
                        </h3>
                        <p style={{
                          color: '#4a5568',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          marginBottom: '18px',
                          flex: 1
                        }}>
                          {cap.description}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection showMetrics={false} />
        <Footer />
      </div>
    </div>
  );
};

export default ServicesOverview;