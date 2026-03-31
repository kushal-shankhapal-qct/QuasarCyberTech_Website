import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { COLORS, TYPOGRAPHY } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { capabilities } from '../data/capabilitiesData';

const logoIcon = ASSETS.logos.qct.icon;
const logoTextImg = ASSETS.logos.qct.textLight;

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
      { label: 'QRGT', href: '/platforms#qrgt', external: false },
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
      { label: 'About Us', href: '/about', external: false },
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
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<{ col: number; idx: number } | null>(null);
  const FOOTER_LOGO_ICON_SIZE = '58px';
  const FOOTER_LOGO_TEXT_WIDTH = '190px';

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A0A10',
        borderTop: '2px solid rgba(107, 21, 48, 0.60)',
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
          grid-template-columns: 220px 1fr;
          gap: 3rem;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 2.5rem;
        }

        /* ───────────────────────────────────────────
           INNER NAV GRID: 4 columns side by side
           (this is the DEFAULT — desktop)
           ─────────────────────────────────────────── */
        .ft-nav-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: start;
          min-width: 0;
        }

        /* ── Tablet ≤ 1024px: narrow gap, 2-col nav ── */
        @media (max-width: 1024px) {
          .ft-grid {
            grid-template-columns: 190px 1fr;
            gap: 2rem;
            padding: 3rem 2rem;
          }
          .ft-nav-cols {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem 2rem;
          }
        }

        /* ── Small tablet ≤ 768px: branding full-width top, 2-col nav below ── */
        @media (max-width: 768px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2.5rem 1.75rem;
          }
          .ft-nav-cols {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem 2rem;
          }
          .ft-brand {
            text-align: center;
          }
          .ft-brand .ft-contacts { align-items: center !important; }
          .ft-brand .ft-socials { justify-content: center !important; }
          .ft-brand .ft-contact-row {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
            text-align: left;
          }
        }

        /* ── Mobile ≤ 480px: single column everything ── */
        @media (max-width: 480px) {
          .ft-grid {
            padding: 2rem 1.25rem;
            gap: 2rem;
          }
          .ft-nav-cols {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .ft-brand-logo {
            margin-bottom: 1.15rem !important;
          }
          .ft-brand-logo img.ft-brand-icon {
            height: 58px !important;
          }
          .ft-brand-logo img.ft-brand-text {
            width: 150px !important;
          }
          .ft-contact-row {
            font-size: 0.82rem !important;
            gap: 0.7rem !important;
          }
          .ft-icon-btn {
            width: 36px;
            height: 36px;
          }
        }

        /* ── Narrow mobile ≤ 640px: stack nav columns for readability ── */
        @media (max-width: 640px) {
          .ft-nav-cols {
            grid-template-columns: 1fr;
            gap: 1.35rem;
          }
        }

        /* ── Shared link styles ── */
        .ft-link {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          line-height: 1.4;
        }
        .ft-link:hover { color: #fff; transform: translateX(2px); }

        .ft-col-heading {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          display: block;
        }

        .ft-icon-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(214,176,92,0.25);
          background: rgba(214,176,92,0.06);
          color: #D6B05C;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s;
        }
        .ft-icon-btn:hover { background: rgba(214,176,92,0.15); }

        .ft-contact-row {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
          min-width: 0;
        }
        .ft-contact-row:hover { color: #fff; }
        .ft-contact-row span { word-break: break-word; }
      `}} />

      {/* ── MAIN GRID ── */}
      <div className="ft-grid">

        {/* Column 1: Branding */}
        <div className="ft-brand" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Logo */}
          <div className="ft-brand-logo" style={{ marginBottom: '1.4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <img className="ft-brand-icon" src={logoIcon} alt="QCT Icon" style={{ height: FOOTER_LOGO_ICON_SIZE, width: 'auto' }} />
            <img className="ft-brand-text" src={logoTextImg} alt="QuasarCyberTech" style={{ width: FOOTER_LOGO_TEXT_WIDTH, height: 'auto' }} />
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

        {/* Columns 2-5: Nav columns — grouped so responsive rules can target them together */}
        <div className="ft-nav-cols">
          {footerColumns.map((col, cIdx) => (
            <div key={col.title} style={{ minWidth: 0 }}>
              <span className="ft-col-heading">{col.title}</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
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
                        style={{ color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#fff' : 'rgba(255,255,255,0.65)' }}
                      >
                        {link.label}
                        <span style={{ fontSize: '10px', opacity: 0.5 }}>↗</span>
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
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.25rem 2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.8rem',
      }}>
        <div style={{ opacity: 0.7, fontSize: '0.78rem' }}>
          © {currentYear} QuasarCyberTech. All rights reserved.
        </div>
        <div style={{ opacity: 0.7, fontSize: '0.78rem' }}>
          Resilience Engineered, Security Delivered
        </div>
      </div>
    </footer>
  );
};

export default Footer;
