import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { capabilities } from '../data/capabilitiesData';

const logoOver = ASSETS.logos.qct.over;

const footerColumns = [
  {
    title: 'Capabilities',
    links: capabilities.map(cap => ({
      label: cap.name,
      href: `/capabilities/${cap.slug}`,
      external: false,
    })),
  },
  {
    title: 'Platforms',
    links: [
      { label: 'QStellar', href: 'https://qstellar.co', external: true },
      { label: 'QPulse', href: 'https://qpulse.quasarcybertech.com', external: true },
      { label: 'QRGT', href: '/contact', external: false },
      { label: 'QLeap', href: 'https://qleap-ed.com', external: true },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Banking & Financial Services', href: '/industries/banking', external: false },
      { label: 'FinTech & Digital Payments', href: '/industries/fintech', external: false },
      { label: 'SaaS & Technology', href: '/industries/saas', external: false },
      { label: 'E-commerce & Digital', href: '/industries/ecommerce', external: false },
      { label: 'Healthcare & HealthTech', href: '/industries/healthcare', external: false },
      { label: 'Enterprise & Manufacturing', href: '/industries/enterprise', external: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/aboutus', external: false },
      { label: 'Blogs', href: '/blogs', external: false },
      { label: 'Careers', href: '/careers', external: false },
      { label: 'Contact', href: '/contact', external: false },
      { label: 'Privacy Policy', href: '/privacy-policy', external: false },
      { label: 'Terms & Conditions', href: '/terms-conditions', external: false },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/quasar-cybertech', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/', label: 'Facebook' },
];

const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<{ col: number; idx: number } | null>(null);
  const FOOTER_LOGO_WIDTH = '14rem'; // 224px

  // --- FOOTER CONFIG (FC) ---
  const FC = {
    fontLink: '0.875rem', // 14px
    fontHeading: '0.75rem', // 12px
    linkGap: '0.65rem',
    colGap: '2rem',
    logoOffsetTopDesktop: '-3rem',
    logoOffsetTopMobile: '-2rem',
  };

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A0A10',
        borderTop: '0.125rem solid rgba(107, 21, 48, 0.60)', // 2px
        fontFamily: TYPOGRAPHY.fontBody,
      }}
    >
      {/* ── STYLE BLOCK — all responsive rules in one place ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ───────────────────────────────────────────
           OUTER GRID: branding col | nav cols block
           ─────────────────────────────────────────── */
        .ft-grid {
          display: grid;
          grid-template-columns: max-content repeat(4, max-content);
          gap: ${FC.colGap};
          align-items: start;
          justify-content: space-between;
          max-width: none;
          margin: 0 auto;
          padding: 3rem ${LAYOUT_CONTROLS.global.paddingX};
        }

        @media (max-width: 1024px) {
          .ft-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
            padding: 3rem ${LAYOUT_CONTROLS.global.paddingX};
          }
        }

        /* ── Small tablet ≤ 768px: branding full-width top, 2-col nav below ── */
        @media (max-width: 768px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2.5rem ${LAYOUT_CONTROLS.global.paddingX};
          }
          .ft-nav-cols {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem 2rem;
          }
          .ft-brand {
            text-align: center;
          }
          .ft-brand-logo {
            margin-left: auto !important;
            margin-right: auto !important;
            justify-content: center !important;
          }
          .ft-brand .ft-contacts { align-items: center !important; }
          .ft-brand .ft-socials {
            justify-content: center !important;
            width: auto !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .ft-brand .ft-contact-row {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
            text-align: left;
          }
        }

        /* ── Large screens (1400px+) ── */
        @media (min-width: 1400px) {
          .ft-grid {
            padding: 4.5rem ${LAYOUT_CONTROLS.global.paddingX} 4rem;
          }
        }

        /* ── Mobile ≤ 480px: single column everything ── */
        @media (max-width: 480px) {
          .ft-grid {
            padding: 2rem ${LAYOUT_CONTROLS.global.paddingX};
            gap: 2rem;
          }
          .ft-nav-cols {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .ft-brand-logo {
            margin-bottom: 1.15rem !important;
            margin-top: ${FC.logoOffsetTopMobile} !important;
          }
          .ft-brand-logo img {
            width: 10rem !important;
          }
          .ft-contact-row {
            font-size: 0.82rem !important;
            gap: 0.7rem !important;
          }
          .ft-icon-btn {
            width: 2.25rem;
            height: 2.25rem;
          }
        }

        @media (max-width: 640px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 2.5rem ${LAYOUT_CONTROLS.global.paddingX};
          }
        }

        /* ── Shared link styles ── */
        .ft-link {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: ${FC.fontLink};
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          line-height: 1.5;
        }
        .ft-link:hover { color: #fff; transform: translateX(2px); }

        .ft-col-heading {
          font-size: ${FC.fontHeading};
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          display: block;
          width: 100%;
        }

        .ft-icon-btn {
          width: 2.5rem; height: 2.5rem;
          border-radius: 0.625rem;
          border: 1px solid rgba(214,176,92,0.25);
          background: rgba(214,176,92,0.06);
          color: #D6B05C;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .ft-socials .ft-icon-btn:hover {
          background: rgba(214,176,92,0.15);
          transform: translateY(-4px);
        }

        .ft-contact-row {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.3s ease;
          min-width: 0;
        }
        .ft-contact-row:hover {
          color: #fff;
          transform: translateY(-2px);
        }
        .ft-contact-row:hover .ft-icon-btn {
          background: rgba(214,176,92,0.15);
          transform: translateY(-4px);
        }
        .ft-contact-row span { word-break: break-word; }

        @media (max-width: 640px) {
          .ft-bottom-bar {
            justify-content: flex-start !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
            padding: 1.5rem ${LAYOUT_CONTROLS.global.paddingX} !important;
          }
          .ft-bottom-divider {
            margin: 0 ${LAYOUT_CONTROLS.global.paddingX} !important;
          }
        }
      `}} />

      {/* ── MAIN GRID ── */}
      <div className="ft-grid">

        {/* Column 1: Branding */}
        <div className="ft-brand" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Logo */}
          <div className="ft-brand-logo" style={{ marginTop: FC.logoOffsetTopDesktop, marginBottom: '1.4rem', display: 'flex', justifyContent: 'center' }}>
            <img src={logoOver} alt="QuasarCyberTech | Logo" style={{ width: FOOTER_LOGO_WIDTH, height: 'auto' }} />
          </div>

          {/* Socials */}
          <div className="ft-socials" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', width: '100%', justifyContent: 'center' }}>
            {socialLinks.map(s => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-icon-btn" aria-label={s.label}>
                  <Icon size={17} />
                </a>
              );
            })}
          </div>

          {/* Contact details */}
          <div className="ft-contacts" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'flex-start' }}>
            <a href="mailto:contactus@quasarcybertech.com" className="ft-contact-row">
              <div className="ft-icon-btn"><Mail size={16} /></div>
              <span>contactus@quasarcybertech.com</span>
            </a>
            <a href="tel:+919730691190" className="ft-contact-row">
              <div className="ft-icon-btn"><Phone size={16} /></div>
              <span>+91 97306 91190</span>
            </a>
            <a href="https://maps.app.goo.gl/GZa9schp9LXZgKpx8" target="_blank" rel="noopener noreferrer"
              className="ft-contact-row">
              <div className="ft-icon-btn"><MapPin size={16} /></div>
              <span>
                #1, State Bank Colony, Indira Nagar,
                <br />
                Maharashtra - 422009
              </span>
            </a>
          </div>
        </div>

        {/* Columns 2-5: Nav columns */}
        {footerColumns.map((col, cIdx) => (
          <div
            key={col.title}
            className="ft-col"
            style={{ minWidth: 'max-content', width: 'max-content', maxWidth: '100%' }}
          >
              <span className="ft-col-heading">{col.title}</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: FC.linkGap }}>
                {col.links.map((link, lIdx) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ft-link"
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#fff' : 'rgba(255,255,255,0.65)',
                          gap: '0.45rem',
                        }}
                      >
                        <span>{link.label}</span>
                        <span style={{ fontSize: '0.625rem', opacity: 0.5, marginLeft: '0.2rem' }}>↗</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="ft-link"
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#fff' : 'rgba(255,255,255,0.65)' }}
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

      {/* Geo presence — keyword anchor for local SEO */}
      <div style={{
        padding: `0.6rem ${LAYOUT_CONTROLS.global.paddingX}`,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.22)',
        fontSize: '0.7rem',
        lineHeight: '1.6',
        letterSpacing: '0.03em',
      }}>
        Cybersecurity consulting company serving enterprises across India — Mumbai · Bangalore · Delhi NCR · Pune · Hyderabad · Chennai · Nashik
      </div>

      {/* Divider */}
      <div
        className="ft-bottom-divider"
        style={{ 
          height: '0.0625rem', 
          borderTop: '0.0625rem solid rgba(255,255,255,0.1)', 
          margin: `0 ${LAYOUT_CONTROLS.global.paddingX}` 
        }} 
      />

      <div className="ft-bottom-bar" style={{
        maxWidth: 'none',
        margin: '0 auto',
        padding: `1.25rem ${LAYOUT_CONTROLS.global.paddingX}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.8rem 3rem',
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.8rem',
      }}>
        <div style={{ opacity: 0.7, fontSize: '0.85rem', textAlign: 'left' }}>
          © 2024 - Present, QuasarCyberTech, Inc. All rights reserved.
        </div>
        <div style={{ opacity: 0.7, fontSize: '0.85rem', textAlign: 'right' }}>
          Resilience Engineered, Security Delivered
        </div>
      </div>
    </footer>
  );
};

export default Footer;
