import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, SHADOWS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import CapabilityCardSimple from './capabilities/cards/CapabilityCardSimple';

import { capabilities } from '@/data/capabilitiesData';

export default function CapabilitiesGrid() {
  return (
    <section className="home-capabilities-section" style={{ 
      background: SECTION_BACKGROUNDS.LIGHT, 
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <div style={{ width: '100%', margin: '0' }}>
        {/* ─── NEW SINGLE-COLUMN HEADER ─── */}
        <div className="home-capabilities-header" style={{ marginBottom: '48px', maxWidth: '720px' }}>
          <h2 style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: COLORS.textOnLight,
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>
            Core <span style={{ color: COLORS.burgundy }}>Capabilities</span>
          </h2>
          <p style={{
            ...TYPOGRAPHY.bodyLarge,
            color: COLORS.textSub,
            maxWidth: '760px',
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
              desc={cap.cardDescription}
              href={`/capabilities/${cap.slug}`}
              img={cap.image}
            />
          ))}
        </div>

        {/* ─── CENTERED BOTTOM CTA ─── */}
        <div className="capabilities-cta" style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center', // Centered alignment
        }}>
          <Link
            to="/capabilities"
            style={{
              background: COLORS.burgundy,
              color: '#FFFFFF',
              padding: '12px 28px', 
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px', 
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
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
            .home-capabilities-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 640px) {
            .home-capabilities-header {
              margin-bottom: 32px !important;
            }
            .home-capabilities-grid {
              grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
              gap: 18px !important;
            }
          }
        `,
        }}
      />
    </section>
  );
}
