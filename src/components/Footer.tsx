import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import logoIcon from '../assets/logos copy/QuasarCyberTech/icononly_transparent_nobuffer.png';
import logoTextImg from '../assets/logos copy/QuasarCyberTech/Qtextonly_Light.png';
import watermarkLogo from '../assets/Logos/No_Text_Quasar_CyberTech_Logo.png';

const footerColumns = [
  {
    title: 'Capabilities',
    links: [
      { label: 'Cyber Advisory & Risk Governance', href: '/capabilities/cyber-advisory-risk-governance' },
      { label: 'Compliance & Regulatory Assurance', href: '/capabilities/compliance-regulatory-assurance' },
      { label: 'Offensive Security Engineering', href: '/capabilities/offensive-security-engineering' },
      { label: 'Cloud & Infrastructure Security', href: '/capabilities/cloud-infrastructure-security' },
      { label: 'Managed Defense Operations', href: '/capabilities/managed-defense-operations' },
      { label: 'Cyber Intelligence & Security Research', href: '/capabilities/cyber-intelligence-security-research' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'QStellar', href: 'https://qstellar.co', external: true },
      { label: 'QPulse', href: 'https://qpulse.quasarcybertech.com', external: true },
      { label: 'QRGT', href: '/platforms/qrgt', external: false },
      { label: 'QLeap', href: 'https://qleap-ed.com', external: true },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Banking & Financial Services', href: '/industries/banking' },
      { label: 'FinTech & Digital Payments', href: '/industries/fintech' },
      { label: 'SaaS & Technology', href: '/industries/saas' },
      { label: 'E-commerce & Digital', href: '/industries/ecommerce' },
      { label: 'Healthcare & HealthTech', href: '/industries/healthcare' },
      { label: 'Enterprise & Manufacturing', href: '/industries/enterprise' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About QuasarCyberTech', href: '/company/about' },
      { label: 'Leadership & Vision', href: '/company/leadership' },
      { label: 'Advisory Board', href: '/company/advisory-board' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/company/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/quasar-cybertech', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/', label: 'Facebook' }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<{ col: number, idx: number } | null>(null);

  return (
    <footer style={{
      background: '#6B1530',
      borderTop: '1px solid rgba(255,255,255,0.15)',
      fontFamily: TYPOGRAPHY.fontBody,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ───── WATERMARK ───── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-20%, -45%)',
          pointerEvents: 'none',
          opacity: 0.04,
          zIndex: 0,
          scale: 2.6
        }}
      >
        <img
          src={watermarkLogo}
          alt="Watermark"
          style={{ width: '400px', height: 'auto', filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ───── MAIN FOOTER GRID (5 Columns) ───── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1.2fr 1fr 1fr 1fr',
          gap: '48px',
          padding: '48px 2em 48px'
        }}>

          {/* COLUMN 1: Branding & Details */}
          <div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              <img
                src={logoIcon}
                alt="QuasarCyberTech"
                style={{
                  height: '48px',
                  width: 'auto',
                  filter: 'brightness(1.1) sepia(0.3) saturate(1.4)'
                }}
              />
              <img
                src={logoTextImg}
                alt="QuasarCyberTech"
                style={{
                  height: '24px',
                  width: 'auto',
                  marginBottom: '4px'
                }}
              />
              <span style={{ 
                color: '#D6B05C', 
                fontSize: '15px', 
                fontWeight: 700, 
                letterSpacing: '0.05em',
                marginTop: '-8px'
              }}>QuasarCyberTech</span>
            </div>

            {/* Address & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              <a 
                href="https://maps.app.goo.gl/GZa9schp9LXZgKpx8"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  alignItems: 'center', 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={18} />
                </div>
                Nashik, MH – 422009
              </a>
              <a href="mailto:contactus@quasarcybertech.com" style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(255,255,255,0.20)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Mail size={18} />
                </div>
                contactus@quasarcybertech.com
              </a>
              <a href="tel:+919730691190" style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(255,255,255,0.20)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={18} />
                </div>
                +91 97306 91190
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.20)',
                      backgroundColor: 'rgba(255,255,255,0.10)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.20)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMNS 2-5: Nav Columns */}
          {footerColumns.map((col, cIdx) => (
            <div key={col.title}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                display: 'inline-block',
                width: '100%'
              }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {col.links.map((link, lIdx) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#ffffff' : 'rgba(255,255,255,0.65)',
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none',
                          paddingLeft: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '4px' : '0',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {link.label}
                        <span style={{ fontSize: '10px', opacity: 0.5 }}>↗</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#ffffff' : 'rgba(255,255,255,0.65)',
                          fontSize: '13px',
                          fontWeight: 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          textDecoration: 'none',
                          paddingLeft: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '4px' : '0',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ───── BOTTOM BAR ───── */}
        <div style={{
          padding: '20px 2em',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          color: 'rgba(255,255,255,0.50)',
          fontSize: '0.8rem'
        }}>
          <div>
            &copy; {currentYear} QuasarCyberTech. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>Terms & Conditions</Link>
            <Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>Cookie Preference</Link>
          </div>

          <div style={{ opacity: 0.8 }}>
            Engineering Cyber Resilience for a Digital First World
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
