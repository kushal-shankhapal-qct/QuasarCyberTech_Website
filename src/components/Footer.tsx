import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { themeConfig } from '../config/themeConfig';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerContentRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%', opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = footerContentRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x: `${x}px`, y: `${y}px`, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos(prev => ({ ...prev, opacity: 0 }));
  }, []);

  const footerLinks = {
    Product: [
      { label: 'QPulse', href: '/platforms' },
      { label: 'QStellar', href: '/platforms' },
      { label: 'Platforms', href: '/platforms' },
    ],
    Services: [
      { label: 'Application Security', href: '/services/application-security' },
      { label: 'Cloud Security', href: '/services/cloud-security' },
      { label: 'Red Teaming', href: '/services/red-team-adversary-simulation' },
      { label: 'All Services', href: '/services' }
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/resources/blogs' }
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/quasar-cybertech', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/', label: 'Facebook' }
  ];

  return (
    <footer className="relative overflow-hidden bg-white border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
      {/* Mouse tracking area — only the content div, not the entire footer */}
      <div
        className="max-w-7xl relative z-10 mx-auto px-8 pt-20 pb-8"
      >
        {/* ───── QUASARCYBERTECH Text Watermark — centered, with cursor glow ───── */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          {/* Base stroke text */}
          <span
            className="font-black tracking-[0.12em] uppercase select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(50px, 8vw, 110px)',
              lineHeight: '1',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(0,0,0,0.04)',
              transform: `translateY(${(themeConfig as any).footer?.watermarkOffsetY || '40px'})`,
            }}
          >
            QUASARCYBERTECH
          </span>
          {/* Glow layer that follows cursor */}
          <span
            className="font-black tracking-[0.12em] uppercase select-none whitespace-nowrap absolute"
            style={{
              fontSize: 'clamp(50px, 8vw, 110px)',
              lineHeight: '1',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(122, 15, 42, 0.4)',
              opacity: glowPos.opacity,
              transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: `translateY(${(themeConfig as any).footer?.watermarkOffsetY || '40px'}) scale(${(themeConfig as any).footer?.watermarkHoverScale || 1.05})`,
              maskImage: `radial-gradient(circle ${(themeConfig as any).footer?.watermarkGlowRadius || '140px'} at ${glowPos.x} ${glowPos.y}, black, transparent)`,
              WebkitMaskImage: `radial-gradient(circle ${(themeConfig as any).footer?.watermarkGlowRadius || '140px'} at ${glowPos.x} ${glowPos.y}, black, transparent)`,
            }}
          >
            QUASARCYBERTECH
          </span>
        </div>

        {/* Main Grid — Hover activation zone moved here for tighter control */}
        <div
          ref={footerContentRef}
          className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-16 relative z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Brand Column — 4/12 = 33% */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/src/assets/Logos/fulllogo_transparent_nobuffer.png"
                alt="Quasar CyberTech"
                className="h-16 w-auto"
                style={{ transform: `scale(${(themeConfig as any).footer?.logoScale || 1.1})`, transformOrigin: 'left' }}
              />
            </div>
            <p className="text-slate-800 text-[14px] leading-relaxed font-semibold mb-8 max-w-xs">
              Enterprise cybersecurity engineering designed for continuous visibility and accelerated remediation.
            </p>

            <div className="space-y-3 mb-8">
              <a href="mailto:contactus@quasarcybertech.com" className="flex items-center gap-3 text-[13px] text-slate-800 hover:text-[var(--brand-accent)] transition-colors font-bold">
                <Mail size={14} className="text-slate-900 shrink-0" /> contactus@quasarcybertech.com
              </a>
              <a href="tel:+919730691190" className="flex items-center gap-3 text-[13px] text-slate-800 hover:text-[var(--brand-accent)] transition-colors font-bold">
                <Phone size={14} className="text-slate-900 shrink-0" /> +91 97306 91190
              </a>
              <div className="flex items-start gap-3 text-[13px] text-slate-800 font-bold">
                <MapPin size={14} className="text-slate-900 shrink-0 mt-0.5" />
                <span>Nashik, Maharashtra – 422009</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-[var(--brand-accent)] border border-slate-100 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Icon size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-1">
              <h3 className="font-bold text-[11px] text-[var(--brand-accent)] tracking-[2px] uppercase mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-slate-700 hover:text-[var(--brand-accent)] font-semibold transition-colors duration-300 flex items-center group w-fit"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-y-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 relative z-10">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] ${(themeConfig as any).footer?.linkContrast || 'text-slate-500'} font-medium`}>
            <p>&copy; {currentYear} QuasarCyberTech. All rights reserved.</p>
            <p>Engineering Cyber Resilience for a Digital First World</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;