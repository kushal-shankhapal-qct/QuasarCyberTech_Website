import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ALPHAS, COLORS, SECTION_BACKGROUNDS, SHADOWS } from '../config/themeConfig';

// Import SVC Images from Set 2
import svc1 from '../assets/logos copy/SVCs_Set_2/SVC_1.png';
import svc2 from '../assets/logos copy/SVCs_Set_2/SVC_2.png';
import svc3 from '../assets/logos copy/SVCs_Set_2/SVC_3.png';
import svc4 from '../assets/logos copy/SVCs_Set_2/SVC_4.png';
import svc5 from '../assets/logos copy/SVCs_Set_2/SVC_5.png';
import svc6 from '../assets/logos copy/SVCs_Set_2/SVC_6.png';

const services = [
  {
    title: 'Cyber Advisory & Risk Governance',
    desc: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    href: '/capabilities/cyber-advisory',
    img: svc1,
  },
  {
    title: 'Compliance & Regulatory Assurance',
    desc: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    href: '/capabilities/compliance',
    img: svc2,
  },
  {
    title: 'Offensive Security Engineering',
    desc: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    href: '/capabilities/offensive-security',
    img: svc3,
  },
  {
    title: 'Cloud & Infrastructure Security',
    desc: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    href: '/capabilities/cloud-security',
    img: svc4,
  },
  {
    title: 'Managed Defense Operations',
    desc: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    href: '/capabilities/managed-defense',
    img: svc5,
  },
  {
    title: 'Cyber Intelligence & Security Research',
    desc: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    href: '/capabilities/cyber-intelligence',
    img: svc6,
  },
];

export default function EnterpriseServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '80px max(24px, calc((100vw - 1200px) / 2))' }}>
      <div style={{ 
        maxWidth: '1040px', 
        margin: '0 auto', 
        textAlign: 'left', 
        marginBottom: '40px' 
      }}>
        <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 38px)', lineHeight: 1.08, marginBottom: '10px' }}>
          Core <span style={{ color: COLORS.teal }}>Capabilities</span>
        </h2>
        <p style={{ color: COLORS.textSub, maxWidth: '640px', fontSize: '15px', lineHeight: 1.7 }}>
          QuasarCyberTech delivers end-to-end cybersecurity services spanning advisory, engineering, offensive validation, cloud security, and managed defense.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px',
        maxWidth: '1040px',
        margin: '0 auto', // Center the grid
      }}>
        {services.map((service, index) => (
          <Link
            to={service.href}
            key={service.title}
            style={{
              borderRadius: '10px',
              background: COLORS.cardOnLight,
              boxShadow: SHADOWS.lightCard,
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              border: '1px solid rgba(0,0,0,0.04)'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                height: '150px',
                background: '#F1F4FB', // New requested background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '16px', // Reduced padding to "zoom in"
              }}
            >
              <img 
                src={service.img} 
                alt={service.title} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  opacity: 0.95,
                  transition: 'transform 0.5s ease',
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                }} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to bottom, transparent, rgba(11, 31, 59, 0.02))' 
              }} />
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={{ color: COLORS.teal, fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em' }}>
                  SVC.{String(index + 1).padStart(2, '0')}
                </p>
                <div style={{ 
                  opacity: hoveredIndex === index ? 1 : 0, 
                  transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'all 0.3s ease'
                }}>
                  <ArrowRight size={16} color={COLORS.teal} />
                </div>
              </div>
              <h3 style={{ color: COLORS.textOnLight, fontWeight: 700, fontSize: '16px', marginBottom: '10px', lineHeight: 1.3 }}>
                {service.title}
              </h3>
              <p style={{ color: COLORS.textSub, fontSize: '13px', lineHeight: 1.6, marginBottom: '0' }}>
                {service.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '56px', textAlign: 'center' }}>
        <Link 
          to="/capabilities"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: COLORS.burgundy,
            color: '#FFFFFF',
            padding: '16px 42px',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 16px rgba(107, 21, 48, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.burgundyHover;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(107, 21, 48, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COLORS.burgundy;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(107, 21, 48, 0.2)';
          }}
        >
          Explore all capabilities
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

