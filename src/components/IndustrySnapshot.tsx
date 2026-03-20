import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';

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
    <section style={{ background: SECTION_BACKGROUNDS.LIGHT, padding: '100px 2em' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ color: COLORS.textOnLight, fontWeight: 900, fontSize: 'clamp(30px, 4.2vw, 44px)', lineHeight: 1.08, marginBottom: '10px', fontFamily: TYPOGRAPHY.fontHeading }}>
          Industries We <span style={{ color: COLORS.teal }}>Secure</span>
        </h2>
        <p style={{ color: COLORS.textSub, maxWidth: '680px', fontSize: '15px', lineHeight: 1.7, marginBottom: '48px', fontFamily: TYPOGRAPHY.fontBody }}>
          Cybersecurity expertise tailored to the risk landscape of modern digital industries.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {industriesData.map((industry, i) => (
            <Link 
              key={industry.name} 
              to={`/industries/${industry.slug}`}
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <article
                style={{
                  borderRadius: '0 0 16px 16px',
                  borderTop: `3px solid ${hoveredIndex === i ? COLORS.burgundy : 'rgba(107,21,48,0.3)'}`,
                  height: '320px',                    // taller than capability cards
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: hoveredIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredIndex === i ? '0 30px 60px rgba(0,0,0,0.4)' : '0 15px 30px rgba(0,0,0,0.2)',
                  fontFamily: TYPOGRAPHY.fontBody,
                }}
              >
                {/* Background image */}
                <img src={industry.image} alt={industry.name} style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: hoveredIndex === i ? 'scale(1.1)' : 'scale(1.02)',
                  filter: 'brightness(0.75) saturate(0.8)',
                }} />

                {/* Gradient overlay — dark at bottom where text sits */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(4,11,29,0.15) 0%, rgba(4,11,29,0.55) 45%, rgba(4,11,29,0.92) 100%)',
                }} />

                {/* Category badge — top left */}
                <div style={{
                  position: 'absolute', top: '20px', left: '20px',
                  background: 'rgba(43,196,182,0.15)',
                  border: '1px solid rgba(43,196,182,0.4)',
                  color: COLORS.teal,
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '5px 12px', borderRadius: '4px',
                  backdropFilter: 'blur(8px)',
                  transform: hoveredIndex === i ? 'translateX(4px)' : 'none',
                  transition: 'transform 0.4s ease',
                }}>
                  {industry.category}
                </div>

                {/* Text — pinned to bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px',
                  transform: hoveredIndex === i ? 'translateY(-4px)' : 'none',
                  transition: 'transform 0.4s ease',
                }}>
                  <h3 style={{ 
                    color: '#fff', 
                    fontWeight: 700, 
                    fontSize: '20px', 
                    marginBottom: '10px',
                    fontFamily: TYPOGRAPHY.fontHeading 
                  }}>
                    {industry.name}
                  </h3>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '13.5px', 
                    lineHeight: 1.6,
                    marginBottom: '16px',
                    opacity: hoveredIndex === i ? 1 : 0.9,
                    transition: 'opacity 0.4s ease',
                  }}>
                    {industry.desc}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: COLORS.teal, 
                    fontSize: '12px', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Explore Industry <span style={{ transition: 'transform 0.3s ease', transform: hoveredIndex === i ? 'translateX(6px)' : 'none' }}>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
