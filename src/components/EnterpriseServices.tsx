import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, SECTION_BACKGROUNDS, SHADOWS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import CapabilityCardSimple from './capabilities/cards/CapabilityCardSimple';

import { ASSETS } from '@/constants/assets';

const services = [
  {
    title: 'Cyber Advisory & Risk Governance',
    desc: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    href: '/capabilities/cyber-advisory-risk-governance',
    img: ASSETS.capabilities.advisory,
  },
  {
    title: 'Compliance & Regulatory Assurance',
    desc: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    href: '/capabilities/compliance-regulatory-assurance',
    img: ASSETS.capabilities.compliance,
  },
  {
    title: 'Offensive Security Engineering',
    desc: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    href: '/capabilities/offensive-security-engineering',
    img: ASSETS.capabilities.offensive,
  },
  {
    title: 'Cloud & Infrastructure Security',
    desc: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    href: '/capabilities/cloud-infrastructure-security',
    img: ASSETS.capabilities.cloud,
  },
  {
    title: 'Managed Defense Operations',
    desc: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    href: '/capabilities/managed-defense-operations',
    img: ASSETS.capabilities.defense,
  },
  {
    title: 'Cyber Intelligence & Security Research',
    desc: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    href: '/capabilities/cyber-intelligence-security-research',
    img: ASSETS.capabilities.intelligence,
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
            Core <span style={{ color: COLORS.burgundy }}>Capabilities</span>
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
            <CapabilityCardSimple
              key={service.title}
              title={service.title}
              desc={service.desc}
              href={service.href}
              img={service.img}
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
    </section>
  );
}
