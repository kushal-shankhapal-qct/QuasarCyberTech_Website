import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import CapabilityCardSimple from './capabilities/cards/CapabilityCardSimple';

import { capabilities } from '@/data/capabilitiesData';

export default function CapabilitiesGrid() {
  return (
    <section className="home-capabilities-section" style={{ 
      background: SECTION_BACKGROUNDS.LIGHT, 
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.global.paddingX}`,
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <div style={{ width: '100%', margin: '0' }}>
        {/* ─── NEW SINGLE-COLUMN HEADER ─── */}
        <div className="home-capabilities-header" style={{ marginBottom: '3rem', maxWidth: '45rem' }}>
          <h2 style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: COLORS.textOnLight,
            marginBottom: '1rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>
            Core <span style={{ color: COLORS.burgundy }}>Capabilities</span>
          </h2>
          <p style={{
            ...TYPOGRAPHY.bodyLarge,
            color: COLORS.textSub,
            maxWidth: '47.5rem',
            lineHeight: '1.7',
            textAlign: 'justify',
            margin: 0,
          }}>
            QuasarCyberTech delivers end-to-end cybersecurity services spanning
            advisory, engineering, offensive validation, cloud security, and managed defense.
          </p>
        </div>

        {/* ─── 3x2 SERVICE GRID ─── */}
        <div className="home-capabilities-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: LAYOUT_CONTROLS.grid.capabilityGap,
          width: '100%',
          margin: '0', 
        }}>
          {capabilities.map((cap) => (
            <CapabilityCardSimple
              key={cap.id}
              title={cap.name}
              mobileTitle={cap.navLabel}
              desc={cap.cardDescription}
              href={`/capabilities/${cap.slug}`}
              img={cap.image}
            />
          ))}
        </div>

        {/* ─── CENTERED BOTTOM CTA ─── */}
        <div className="capabilities-cta" style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'center', 
        }}>
          <Link
            to="/capabilities"
            style={{
              background: COLORS.burgundy,
              color: '#FFFFFF',
              padding: '0.75rem 1.75rem', 
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '0.5rem', 
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.burgundyHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.burgundy; }}
          >
            Explore All Capabilities <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 1024px) {
            .home-capabilities-section {
              padding-left: 3rem !important;
              padding-right: 3rem !important;
            }
            .home-capabilities-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 640px) {
            .home-capabilities-section {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .home-capabilities-header {
              margin-bottom: 2rem !important;
            }
            .home-capabilities-header p {
              text-align: left !important;
            }
            .home-capabilities-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 0.875rem !important;
            }
          }
        `,
        }}
      />
    </section>
  );
}
