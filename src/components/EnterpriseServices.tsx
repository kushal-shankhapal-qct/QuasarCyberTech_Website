import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, SHADOWS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

// Photo Imports
import imgAdvisory       from "../assets/capabilities/Cyber Advisory & Risk Governance.jpg";
import imgCompliance     from "../assets/capabilities/Compliance & Regulatory Assurance.jpg";
import imgOffensive      from "../assets/capabilities/Offensive Security Engineering.jpg";
import imgCloud          from "../assets/capabilities/Cloud & Infrastructure Security.jpg";
import imgManagedDefense from "../assets/capabilities/Managed Defense Operations_2.jpeg";
import imgIntelligence   from "../assets/capabilities/Cyber Intelligence & Security Research.webp";

const services = [
  {
    title: 'Cyber Advisory & Risk Governance',
    desc: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    href: '/capabilities/cyber-advisory-risk-governance',
    img: imgAdvisory,
  },
  {
    title: 'Compliance & Regulatory Assurance',
    desc: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    href: '/capabilities/compliance-regulatory-assurance',
    img: imgCompliance,
  },
  {
    title: 'Offensive Security Engineering',
    desc: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    href: '/capabilities/offensive-security-engineering',
    img: imgOffensive,
  },
  {
    title: 'Cloud & Infrastructure Security',
    desc: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    href: '/capabilities/cloud-infrastructure-security',
    img: imgCloud,
  },
  {
    title: 'Managed Defense Operations',
    desc: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    href: '/capabilities/managed-defense-operations',
    img: imgManagedDefense,
  },
  {
    title: 'Cyber Intelligence & Security Research',
    desc: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    href: '/capabilities/cyber-intelligence-security-research',
    img: imgIntelligence,
  },
];

export default function EnterpriseServices() {
  return (
    <section style={{ 
      background: SECTION_BACKGROUNDS.LIGHT, 
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <div style={{ width: '100%', margin: '0' }}>
        {/* ─── NEW SINGLE-COLUMN HEADER ─── */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: TYPOGRAPHY.fontHeading,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: COLORS.textOnLight,
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}>
            Core <span style={{ color: COLORS.teal }}>Capabilities</span>
          </h2>
          <p style={{
            fontFamily: TYPOGRAPHY.fontBody,
            fontSize: '16px',
            color: COLORS.textSub,
            maxWidth: '520px',
            lineHeight: 1.7,
            margin: 0,
          }}>
            QuasarCyberTech delivers end-to-end cybersecurity services spanning
            advisory, engineering, offensive validation, cloud security, and managed defense.
          </p>
        </div>

        {/* ─── 3x2 SERVICE GRID ─── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: LAYOUT_CONTROLS.grid.capabilityGap,
          width: '100%',
          margin: '0', 
        }}>
          {services.map((service, index) => (
            <Link
              to={service.href}
              key={service.title}
              className="capability-card group"
              style={{
                borderRadius: `0 ${LAYOUT_CONTROLS.card.capabilityCardRadius} ${LAYOUT_CONTROLS.card.capabilityCardRadius} 0`, 
                borderLeft: `${LAYOUT_CONTROLS.card.capabilityAccentThickness} solid ${COLORS.teal}`, 
                background: COLORS.cardOnLight,
                boxShadow: LAYOUT_CONTROLS.card.capabilityCardShadow, 
                overflow: 'hidden',
                transform: `scale(${LAYOUT_CONTROLS.card.capabilityCardScale})`, 
                transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-left-color 0.4s ease',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.0)'; 
                e.currentTarget.style.boxShadow = SHADOWS.lightCardHover;
                e.currentTarget.style.borderLeftColor = COLORS.burgundy;
                
                const img = e.currentTarget.querySelector('.photo-element') as HTMLElement;
                if (img) img.style.transform = 'scale(1.04)';

                const overlay = e.currentTarget.querySelector('.overlay-deepen-layer') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';

                const arrowContainer = e.currentTarget.querySelector('.card-arrow-icon') as HTMLElement;
                if (arrowContainer) {
                  arrowContainer.style.transform = 'translateX(4px)';
                  const svg = arrowContainer.querySelector('svg');
                  if (svg) svg.style.stroke = COLORS.burgundy;
                }

                const label = e.currentTarget.querySelector('.svc-label') as HTMLElement;
                if (label) label.style.color = COLORS.burgundy;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `scale(${LAYOUT_CONTROLS.card.capabilityCardScale})`;
                e.currentTarget.style.boxShadow = LAYOUT_CONTROLS.card.capabilityCardShadow;
                e.currentTarget.style.borderLeftColor = COLORS.teal;

                const img = e.currentTarget.querySelector('.photo-element') as HTMLElement;
                if (img) img.style.transform = 'scale(1.0)';

                const overlay = e.currentTarget.querySelector('.overlay-deepen-layer') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';

                const arrowContainer = e.currentTarget.querySelector('.card-arrow-icon') as HTMLElement;
                if (arrowContainer) {
                  arrowContainer.style.transform = 'translateX(0px)';
                  const svg = arrowContainer.querySelector('svg');
                  if (svg) svg.style.stroke = COLORS.teal;
                }

                const label = e.currentTarget.querySelector('.svc-label') as HTMLElement;
                if (label) label.style.color = COLORS.teal;
              }}
            >
              {/* Image zone */}
              <div style={{
                height: '210px', 
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                background: '#0B1F3B',
              }}>
                <img
                  className="photo-element"
                  src={service.img}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(160deg, rgba(107, 15, 43, 0.15) 0%, rgba(11, 31, 59, 0.25) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div 
                  className="overlay-deepen-layer"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(160deg, rgb(107, 15, 43) 0%, rgb(11, 31, 59) 100%)',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.4s ease',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p className="svc-label" style={{
                    color: COLORS.teal,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: TYPOGRAPHY.fontBody,
                    margin: 0,
                    transition: 'color 0.4s ease'
                  }}>
                    SVC.0{index + 1}
                  </p>
                  <div className="card-arrow-icon" style={{ transition: 'all 0.3s ease', display: 'flex' }}>
                    <ArrowRight size={16} color={COLORS.teal} style={{ transition: 'stroke 0.4s ease' }} />
                  </div>
                </div>

                <h3 style={{
                  color: COLORS.textOnLight,
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: 1.3,
                  fontFamily: TYPOGRAPHY.fontHeading,
                  margin: '0 0 10px 0',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: COLORS.textSub,
                  fontSize: '14px',
                  lineHeight: 1.65,
                  fontFamily: TYPOGRAPHY.fontBody,
                  margin: '0 0 18px 0',
                  flex: 1
                }}>
                  {service.desc}
                </p>
              </div>
            </Link>
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
    </section>
  );
}
