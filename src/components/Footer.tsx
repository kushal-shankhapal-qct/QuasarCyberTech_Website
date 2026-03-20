import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import fullLogo from '../assets/logos copy/QuasarCyberTech/QuasarCyberTech_Logo_Over.png';
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
      { label: 'QRGT', href: '/platforms/qrgt', external: false },
      { label: 'QStellar', href: 'https://qstellar.co', external: true },
      { label: 'QLeap', href: 'https://qleap-ed.com', external: true },
      { label: 'QPulse', href: '/insights', external: false },
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
      background: COLORS.darkBase,
      borderTop: '1px solid rgba(43,196,182,0.15)',
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
          opacity: 0.07,
          zIndex: 0,
          scale: 2.6
        }}
      >
        <img
          src={watermarkLogo}
          alt="Watermark"
          style={{ width: '400px', height: 'auto', filter: 'grayscale(100%)' }}
        />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ───── MAIN FOOTER GRID (5 Columns) ───── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1.2fr 1fr 1fr 1fr',
          gap: '48px',
          padding: '64px 2em 48px'
        }}>

          {/* COLUMN 1: Branding & Details */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <img
                src={fullLogo}
                alt="QuasarCyberTech"
                style={{
                  height: '120px',
                  width: 'auto',
                  display: 'inline-block',
                }}
              />
            </div>

            {/* Address & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: 'rgba(214, 176, 92, 0.05)',
                  color: COLORS.gold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={18} />
                </div>
                Nashik, MH – 422009
              </div>
              <a href="mailto:contactus@quasarcybertech.com" style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = COLORS.gold;
                  icon.style.color = '#4E0E26';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.05)';
                  icon.style.color = COLORS.gold;
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: 'rgba(214, 176, 92, 0.05)',
                  color: COLORS.gold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Mail size={18} />
                </div>
                contactus@quasarcybertech.com
              </a>
              <a href="tel:+910000000000" style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = COLORS.gold;
                  icon.style.color = '#4E0E26';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.firstChild as HTMLElement;
                  icon.style.backgroundColor = 'rgba(214, 176, 92, 0.05)';
                  icon.style.color = COLORS.gold;
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: 'rgba(214, 176, 92, 0.05)',
                  color: COLORS.gold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={18} />
                </div>
                +91 00000 00000
              </a>
            </div>

            {/* Socials - Keep style as-is */}
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
                      border: '1px solid rgba(255,255,255,0.05)',
                      backgroundColor: 'rgba(214, 176, 92, 0.05)',
                      color: COLORS.gold,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.gold;
                      e.currentTarget.style.color = '#4E0E26'; // Match origin social text color
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(214, 176, 92, 0.05)';
                      e.currentTarget.style.color = COLORS.gold;
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
                color: COLORS.gold,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(43,196,182,0.18)',
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
                          color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? COLORS.teal : 'rgba(255,255,255,0.65)',
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
                        <span style={{ fontSize: '10px', opacity: 0.5 }}>↗</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? COLORS.teal : 'rgba(255,255,255,0.65)',
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
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          color: 'rgba(255,255,255,0.45)',
          fontSize: '13px'
        }}>
          <div>
            &copy; {currentYear} QuasarCyberTech. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</Link>
            <Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Preference</Link>
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
