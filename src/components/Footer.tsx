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
      { label: 'QPulse',   href: 'https://qpulse.quasarcybertech.com', external: true },
      { label: 'QRGT',     href: '/contact', external: false },
      { label: 'QLeap',    href: 'https://qleap-ed.com', external: true },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Banking & Financial Services', href: '/industries/banking',     external: false },
      { label: 'FinTech & Digital Payments',   href: '/industries/fintech',     external: false },
      { label: 'SaaS & Technology',            href: '/industries/saas',        external: false },
      { label: 'E-commerce & Digital',         href: '/industries/ecommerce',   external: false },
      { label: 'Healthcare & HealthTech',      href: '/industries/healthcare',  external: false },
      { label: 'Enterprise & Manufacturing',   href: '/industries/enterprise',  external: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',          href: '/aboutus',          external: false },
      { label: 'Blogs',             href: '/blogs',            external: false },
      { label: 'Careers',           href: '/careers',          external: false },
      { label: 'Contact',           href: '/contact',          external: false },
      { label: 'Privacy Policy',    href: '/privacy-policy',   external: false },
      { label: 'Terms & Conditions',href: '/terms-conditions', external: false },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/quasar-cybertech',                          label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/',                                 label: 'Instagram' },
  { icon: Facebook,  href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/',          label: 'Facebook'  },
];

const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<{ col: number; idx: number } | null>(null);

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      background: '#1A0A10',
      borderTop: '0.125rem solid rgba(107,21,48,0.60)',
      fontFamily: TYPOGRAPHY.fontBody,
    }}>

      {/* ── ALL RESPONSIVE RULES ── */}
      <style dangerouslySetInnerHTML={{ __html: `

        /* ── Outer shell: brand | nav-group ── */
        .ft-outer {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 3rem 4rem;
          align-items: start;
          padding: 3.5rem ${LAYOUT_CONTROLS.global.paddingX};
        }

        /* ── Inner nav grid: 4 columns ── */
        .ft-nav-group {
          display: grid;
          grid-template-columns: 2fr 1fr 1.4fr 1fr;
          gap: 1rem 2.5rem;
          align-items: start;
          min-width: 0;
        }

        /* ── Large screens ── */
        @media (min-width: 1400px) {
          .ft-outer {
            grid-template-columns: 240px 1fr;
            padding: 4.5rem ${LAYOUT_CONTROLS.global.paddingX} 4rem;
          }
          .ft-nav-group { gap: 1rem 3.5rem; }
        }

        /* ── Medium: 900–1100px ── */
        @media (max-width: 1100px) {
          .ft-outer {
            grid-template-columns: 200px 1fr;
            gap: 2rem 2.5rem;
          }
          .ft-nav-group { gap: 1rem 1.5rem; }
        }

        /* ── Tablet: stack brand on top, nav below in 2×2 ── */
        @media (max-width: 860px) {
          .ft-outer {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 3rem ${LAYOUT_CONTROLS.global.paddingX};
          }
          .ft-nav-group {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 2rem;
          }
          .ft-brand {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            gap: 2.5rem;
            flex-wrap: wrap;
          }
          .ft-brand-logo { margin-top: 0 !important; }
          .ft-brand-right {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 1;
            min-width: 200px;
          }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width: 600px) {
          .ft-outer {
            padding: 2.5rem ${LAYOUT_CONTROLS.global.paddingX};
            gap: 2rem;
          }
          .ft-brand {
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: left;
            gap: 1.25rem;
          }
          .ft-brand-right {
            align-items: flex-start !important;
            min-width: 0;
            width: 100%;
          }
          .ft-brand-logo {
            width: 100%;
            display: flex !important;
            justify-content: center;
            margin-bottom: 1rem !important;
          }
          .ft-brand-logo img {
            margin: 0 auto;
          }
          .ft-socials {
            justify-content: center !important;
            width: 100%;
          }
          .ft-contacts { align-items: flex-start !important; width: 100%; }
          .ft-contact-row {
            justify-content: flex-start;
            width: 100%;
            max-width: none;
          }
          .ft-nav-group {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem 1rem;
          }
        }

        /* ── Small mobile ≤ 400px: single col nav ── */
        @media (max-width: 400px) {
          .ft-nav-group { grid-template-columns: 1fr; }
          .ft-brand-logo img { width: 9rem !important; }
        }

        /* ── Bottom bar ── */
        @media (max-width: 640px) {
          .ft-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.4rem !important;
            padding: 1.25rem ${LAYOUT_CONTROLS.global.paddingX} !important;
          }
        }

        /* ── Shared ── */
        .ft-link {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1.55;
          word-break: break-word;
        }
        .ft-link:hover { color: #fff; }

        .ft-col-heading {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1rem;
          padding-bottom: 0.55rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: block;
          width: 100%;
        }

        .ft-icon-btn {
          width: 2.25rem; height: 2.25rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(214,176,92,0.22);
          background: rgba(214,176,92,0.05);
          color: #D6B05C;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .ft-icon-btn:hover {
          background: rgba(214,176,92,0.14);
          transform: translateY(-3px);
        }

        .ft-contact-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255,255,255,0.65);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease;
          min-width: 0;
        }
        .ft-contact-row:hover { color: #fff; }
        .ft-contact-row:hover .ft-icon-btn {
          background: rgba(214,176,92,0.14);
          transform: translateY(-3px);
        }
        .ft-contact-row span {
          word-break: normal;
          overflow-wrap: anywhere;
          min-width: 0;
        }
        .ft-contact-text--email {
          white-space: nowrap;
          overflow-wrap: normal;
        }
      `}} />

      {/* ── MAIN GRID ── */}
      <div className="ft-outer">

        {/* ── BRAND COLUMN ── */}
        <div className="ft-brand" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Logo */}
          <div className="ft-brand-logo" style={{ marginTop: '-2.5rem', marginBottom: '1.25rem' }}>
            <img src={logoOver} alt="QuasarCyberTech" style={{ width: '13rem', height: 'auto', display: 'block' }} />
          </div>

          <div className="ft-brand-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Socials */}
            <div className="ft-socials" style={{ display: 'flex', gap: '0.6rem' }}>
              {socialLinks.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="ft-icon-btn" aria-label={s.label}>
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Contact details */}
            <div className="ft-contacts" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="mailto:contactus@quasarcybertech.com" className="ft-contact-row">
                <div className="ft-icon-btn"><Mail size={15} /></div>
                <span className="ft-contact-text--email">contactus@quasarcybertech.com</span>
              </a>
              <a href="tel:+919730691190" className="ft-contact-row">
                <div className="ft-icon-btn"><Phone size={15} /></div>
                <span>+91 97306 91190</span>
              </a>
              <a href="https://maps.app.goo.gl/GZa9schp9LXZgKpx8" target="_blank" rel="noopener noreferrer"
                className="ft-contact-row">
                <div className="ft-icon-btn"><MapPin size={15} /></div>
                <span>#1, State Bank Colony, Indira Nagar,<br />Maharashtra – 422009</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── NAV COLUMNS GROUP ── */}
        <div className="ft-nav-group">
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
                        style={{ color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#fff' : 'rgba(255,255,255,0.6)' }}
                      >
                        <span>{link.label}</span>
                        <span style={{ fontSize: '0.6rem', opacity: 0.45, marginLeft: '0.15rem' }}>↗</span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="ft-link"
                        onMouseEnter={() => setHoveredLink({ col: cIdx, idx: lIdx })}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ color: hoveredLink?.col === cIdx && hoveredLink?.idx === lIdx ? '#fff' : 'rgba(255,255,255,0.6)' }}
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
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: `0 ${LAYOUT_CONTROLS.global.paddingX}` }} />

      <div className="ft-bottom-bar" style={{
        padding: `1.1rem ${LAYOUT_CONTROLS.global.paddingX}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.8rem',
      }}>
        <span>© 2024 – Present, QuasarCyberTech, Inc. All rights reserved.</span>
        <span>Resilience Engineered, Security Delivered</span>
      </div>
    </footer>
  );
};

export default Footer;
