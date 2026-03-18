import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ClipboardCheck, Cloud, Eye, Shield, Target } from 'lucide-react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, SHADOWS } from '../config/themeConfig';

const services = [
  {
    title: 'Cyber Advisory & Risk Governance',
    desc: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    href: '/capabilities/cyber-advisory',
    Icon: Shield,
  },
  {
    title: 'Compliance & Regulatory Assurance',
    desc: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    href: '/capabilities/compliance',
    Icon: ClipboardCheck,
  },
  {
    title: 'Offensive Security Engineering',
    desc: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    href: '/capabilities/offensive-security',
    Icon: Target,
  },
  {
    title: 'Cloud & Infrastructure Security',
    desc: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    href: '/capabilities/cloud-security',
    Icon: Cloud,
  },
  {
    title: 'Managed Defense Operations',
    desc: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    href: '/capabilities/managed-defense',
    Icon: Activity,
  },
  {
    title: 'Cyber Intelligence & Security Research',
    desc: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    href: '/capabilities/cyber-intelligence',
    Icon: Eye,
  },
];

export default function EnterpriseServices() {
  return (
    <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '100px max(24px, calc((100vw - 1200px) / 2))' }}>
      <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px' }}>
        Core <span style={{ color: COLORS.teal }}>Capabilities</span>
      </h2>
      <p style={{ color: COLORS.textSub, maxWidth: '680px', fontSize: '15px', lineHeight: 1.7, marginBottom: '34px' }}>
        QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
        {services.map((service, index) => (
          <Link
            to={service.href}
            key={service.title}
            style={{
              borderRadius: '0 0 16px 16px',
              borderTop: `3px solid ${COLORS.burgundy}`,
              background: COLORS.cardOnLight,
              boxShadow: SHADOWS.lightCard,
              overflow: 'hidden',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              textDecoration: 'none',
              display: 'block',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-6px)';
              event.currentTarget.style.boxShadow = SHADOWS.lightCardHover;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.boxShadow = SHADOWS.lightCard;
            }}
          >
            <div
              style={{
                height: '140px',
                background: `linear-gradient(135deg, ${COLORS.deepCyberBlue} 0%, ${COLORS.darkBase} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `radial-gradient(circle, ${ALPHAS.teal08} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              <service.Icon size={48} strokeWidth={1} color={COLORS.teal} style={{ opacity: 0.8, position: 'relative' }} />
            </div>

            <div style={{ padding: '20px 24px 24px' }}>
              <p style={{ color: COLORS.teal, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                SVC.{String(index + 1).padStart(2, '0')}
              </p>
              <h3 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '17px', marginBottom: '10px' }}>{service.title}</h3>
              <p style={{ color: COLORS.textSub, fontSize: '14px', lineHeight: 1.65, marginBottom: '20px' }}>{service.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ArrowRight size={16} color={COLORS.teal} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
