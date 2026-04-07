import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import SectionHeader from '../components/SectionHeader';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, SHADOWS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';
import Seo from '../components/seo/Seo';
import { createBreadcrumbSchema } from '../seo/schema';

const IO = {
  desktopPaddingX: '3rem',
};

import { ASSETS } from '@/constants/assets';
import PageHero from '../components/PageHero';

const IndustriesOverview: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: SECTION_BACKGROUNDS.DARK }}>
      <Seo
        title="Cybersecurity Solutions by Industry — Banking, FinTech, SaaS, Healthcare India"
        description="Industry-specific cybersecurity for banking, FinTech, SaaS, e-commerce, healthcare, and enterprise manufacturing in India. RBI compliance, DPDP Act, HIPAA, and DevSecOps consulting from QuasarCyberTech."
        path="/industries"
        image={ASSETS.industries.overviewHero}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
          ]),
        ]}
      />
      <Navbar />

      <PageHero
        title={<>Enterprise Solutions for<br /></>}
        highlight="Critical Industries"
        subtitle="QuasarCyberTech provides deep cybersecurity expertise and engineering tailored to the unique regulatory and operational requirements of global industry leaders."
        backgroundOverride={GRADIENTS.INDUSTRIES_OVERVIEW_HERO_BG}
        breadcrumbPaths={['Home']}
        currentName="Industries"
        image={ASSETS.industries.overviewHero}
        imageScale={1.2}
        imageOpacity={0.9}
        visualFullWidth={false}
        visualWidth="65%"
        maskStart="0%"
        maskEnd="75%"
        imagePositionX="center"
        imagePositionY="center"
        imageBlendSoftness="100%"
        imageBlendStartPercent="0%"
        gradientCenter="20% 60%"
        gradientRadius="55%"
        scrollTargetId="grid"
        scrollButtonText="Explore Industries"
        scrollMethod="motion"
      />

      {/* ─── SECTION 2: INDUSTRIES GRID (LIGHT) ─── */}
      <section id="grid" style={{
        background: SECTION_BACKGROUNDS.LIGHT,
        paddingTop: LAYOUT_CONTROLS.section.paddingTop,
        paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX
      }}>
        <div style={{ width: '100%' }}>
          <SectionHeader
            title="Across Every"
            highlight="Industry"
            subtitle="Deep domain knowledge in securing complex digital ecosystems."
          />

          <div className="industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            {industriesData.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                style={{
                  borderRadius: `0 0 4px 4px`,
                  borderTop: `4px solid ${COLORS.burgundy}`,
                  background: '#ffffff',
                  boxShadow: SHADOWS.lightCard,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(11,31,59,0.12)';
                  e.currentTarget.style.borderTopColor = COLORS.gold;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOWS.lightCard;
                  e.currentTarget.style.borderTopColor = COLORS.burgundy;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Photo area */}
                <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={ind.image}
                    alt={`QuasarCyberTech | ${ind.name} Industry`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(160deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Body */}
                <div style={{
                  padding: '24px 24px 20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    color: '#0B1F3B',
                    fontWeight: 700,
                    fontSize: '17px',
                    marginBottom: '8px',
                    fontFamily: TYPOGRAPHY.fontHeading,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {ind.name}
                    <ArrowRight size={14} color={COLORS.burgundy} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {ind.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .industries-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .industries-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
        }
      `}} />

      <CTASection theme="dark" showEyebrow={true} />
      <Footer />
    </div>
  );
};

export default IndustriesOverview;
