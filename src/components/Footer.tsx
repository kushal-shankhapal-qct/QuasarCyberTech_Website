import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';

const logoIcon = ASSETS.logos.qct.icon;
const logoTextImg = ASSETS.logos.qct.textLight;
const watermarkLogo = ASSETS.logos.qct.icon; // Using icon for watermark too

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
      { label: 'QRGT', href: '/platforms#qrgt', external: false },
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
      { label: 'About QuasarCyberTech', href: '/about' },
      { label: 'Leadership & Vision', href: '/leadership' },
      { label: 'Advisory Board', href: '/company/advisory-board' },
      { label: 'Blogs', href: '/insights' },
      { label: 'Careers', href: '/careers' },
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
  const SHOW_WATERMARK = false; // Watermark visibility toggled in code

  return (
    <footer style={{
      background: '#1A0A10',
      borderTop: '2px solid rgba(107, 21, 48, 0.60)',
      fontFamily: TYPOGRAPHY.fontBody,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ───── WATERMARK ───── */}
      {SHOW_WATERMARK && (
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
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ───── MAIN FOOTER GRID (5 Columns) ───── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1.2fr 1fr 1fr 1fr',
          gap: '48px',
          padding: '48px 2em 48px'
        }}>

          {/* COLUMN 1: Branding & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Logo (Top, Big and Centered) */}
            <div style={{
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <img
                src={logoIcon}
                alt="QuasarCyberTech Icon"
                style={{
                  height: '64px', // Sized proportionally
                  width: 'auto',
                  filter: 'brightness(1.1) saturate(1.2)'
                }}
              />
              <img
                src={logoTextImg}
                alt="QuasarCyberTech Text"
                style={{
                  width: '180px', // Sized proportionally to text logo in navbar
                  height: 'auto',
                  filter: 'brightness(1.1)'
                }}
              />
            </div>

            {/* Socials (Middle, Horizontal) */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', justifyContent: 'center' }}>
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
                      border: '1px solid rgba(214, 176, 92, 0.25)',
                      backgroundColor: 'rgba(214, 176, 92, 0.06)',
                      color: '#D6B05C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(214, 176, 92, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(214, 176, 92, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            {/* Address & Contact (Bottom, Vertical) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start', width: '100%' }}>
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
                  border: '1px solid rgba(214, 176, 92, 0.25)',
                  backgroundColor: 'rgba(214, 176, 92, 0.06)',
                  color: '#D6B05C',
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
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.15)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(214, 176, 92, 0.25)',
                  backgroundColor: 'rgba(214, 176, 92, 0.06)',
                  color: '#D6B05C',
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
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.15)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(214, 176, 92, 0.25)',
                  backgroundColor: 'rgba(214, 176, 92, 0.06)',
                  color: '#D6B05C',
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
                          transform: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? 'translateX(4px)' : 'translateX(0)',
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
                          transform: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? 'translateX(4px)' : 'translateX(0)',
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
            Resilience Engineered, Security Delivered
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
