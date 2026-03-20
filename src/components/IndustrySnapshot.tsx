import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

import ind01 from '../assets/Banking_and_Financial Services.jpg';
import ind02 from '../assets/CyberLock.jpg';
import ind03 from '../assets/saas-concept-collage.jpg';
import ind04 from '../assets/industries/ind_04.png';
import ind05 from '../assets/industries/ind_05.png';
import ind06 from '../assets/Managed_IT_Services.jpg';

const industriesData = [
  { name: 'Banking & Financial Services', category: 'FINANCIAL', desc: 'Secure governance and technical validation for RBI guidelines and international standards.', image: ind01, slug: 'banking' },
  { name: 'FinTech & Digital Payments', category: 'PAYMENTS', desc: 'Security for cloud-native microservices, APIs, and high-velocity transaction logic.', image: ind02, slug: 'fintech' },
  { name: 'SaaS & Technology Platforms', category: 'CLOUD NATIVE', desc: 'End-to-end security for software providers, from code integrity to cloud isolation.', image: ind03, slug: 'saas' },
  { name: 'E-commerce & Digital Platforms', category: 'LOGISTICS', desc: 'Protection of high-volume marketplaces against bot attacks and payment fraud.', image: ind04, slug: 'ecommerce' },
  { name: 'Healthcare & HealthTech', category: 'HEALTHCARE', desc: 'Safeguarding personal data and ensuring integrity of clinical and medical ecosystems.', image: ind05, slug: 'healthcare' },
  { name: 'Enterprise & Manufacturing', category: 'INDUSTRIAL', desc: 'Operational resilience and convergence security for IT and Industrial OT environments.', image: ind06, slug: 'enterprise' },
];

export default function IndustrySnapshot() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ 
      background: '#F5F7FA', 
      backgroundImage: `repeating-linear-gradient(135deg, rgba(43,196,182,0.035) 0px, rgba(43,196,182,0.035) 1px, transparent 1px, transparent 56px)`,
      padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX}`,
      fontFamily: TYPOGRAPHY.fontBody
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px', fontFamily: TYPOGRAPHY.fontHeading }}>
          Industries We <span style={{ color: COLORS.teal }}>Secure</span>
        </h2>
        <p style={{ color: COLORS.textSub, maxWidth: '680px', fontSize: '15px', lineHeight: 1.7, marginBottom: '48px' }}>
          Cybersecurity expertise tailored to the risk landscape of modern digital industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesData.map((industry, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <Link 
                key={industry.name} 
                to={`/industries/${industry.slug}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <article
                  style={{
                    background: '#FFFFFF',
                    borderTop: `4px solid ${COLORS.burgundy}`,
                    borderRadius: '0 0 8px 8px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 12px 32px rgba(11,31,59,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
                    zIndex: isHovered ? 1 : 0
                  }}
                >
                  {/* Top Photo area: fixed height 200px */}
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={industry.image} 
                      alt={industry.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.4s ease',
                        transform: isHovered ? 'scale(1.04)' : 'scale(1)'
                      }} 
                    />
                    {/* Brand tint overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(160deg, rgba(107,15,43,0.15) 0%, rgba(11,31,59,0.25) 100%)',
                      opacity: isHovered ? 0.6 : 1,
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none'
                    }} />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <p style={{
                        color: COLORS.teal,
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: TYPOGRAPHY.fontBody,
                        margin: 0
                      }}>
                        {industry.category}
                      </p>
                      <div className="card-arrow-icon" style={{ transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(4px)' : 'none' }}>
                        <ArrowRight size={16} color={COLORS.teal} />
                      </div>
                    </div>

                    <h3 style={{
                      color: '#0B1F3B',
                      fontWeight: 700,
                      fontSize: '1rem',
                      lineHeight: 1.3,
                      fontFamily: TYPOGRAPHY.fontHeading,
                      margin: '0 0 10px 0',
                    }}>
                      {industry.name}
                    </h3>
                    <p style={{
                      color: '#4a5568',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      fontFamily: TYPOGRAPHY.fontBody,
                      margin: '0 0 18px 0',
                      flex: 1
                    }}>
                      {industry.desc}
                    </p>
                    
                    <div style={{ 
                      color: COLORS.teal, 
                      fontSize: '0.78rem', 
                      fontWeight: 600,
                      marginTop: 'auto',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px'
                    }}>
                      Explore Industry <span style={{ transition: 'transform 0.2s ease', transform: isHovered ? 'translateX(3px)' : 'none' }}>→</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link 
            to="/industries"
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
              boxShadow: '0 4px 12px rgba(107,15,43,0.2)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#8B1439'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.burgundy; }}
          >
            Explore All Industry Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
