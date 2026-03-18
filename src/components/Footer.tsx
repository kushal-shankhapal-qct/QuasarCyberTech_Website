import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { themeConfig } from '../config/themeConfig';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Products',
      links: [
        { label: 'QPulse', href: '/products' },
        { label: 'QStellar', href: '/products' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Application Security', href: '/services/application-security' },
        { label: 'Network Security', href: '/services/network-security' },
        { label: 'Cloud Security', href: '/services/cloud-security' },
        { label: 'Red Team & Adversary Simulation', href: '/services/red-team-adversary-simulation' },
        { label: 'Managed Security Operations', href: '/services/managed-security-operations' },
        { label: 'Incident Response & Threat Hunting', href: '/services/incident-response' },
        { label: 'Risk & Compliance', href: '/services/risk-compliance' },
        { label: 'Architecture & Engineering', href: '/services/architecture-engineering' },
        { label: 'Digital Risk & Monitoring', href: '/services/digital-risk-monitoring' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/resources/blogs' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/quasar-cybertech', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/', label: 'Facebook' }
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: themeConfig.footer.backgroundColor }}>
      {/* ───── CENTERED Q WATERMARK ───── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0"
        style={{ scale: 2.2 }}
      >
        <img
          src="/src/assets/Logos/icon_nobuffer.png"
          alt="Watermark"
          className="w-[400px] h-auto grayscale"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 relative z-10">

        {/* ───── MAIN FOOTER GRID (4 Columns) ───── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* COLUMN 1: Branding & Details */}
          <div className="flex flex-col items-start justify-start text-left">
            <div className="mb-10 flex justify-start w-full">
              <img
                src="/src/assets/Logos/fulllogo_transparent_nobuffer.png"
                alt="Quasar CyberTech"
                className="w-auto brightness-200"
                style={{ height: `${20 * (themeConfig.footer?.logoScale || 2.5)}px` }}
              />
            </div>

            {/* Address & Contact - Vertical Stack */}
            <div className="flex flex-col gap-3 items-start justify-start mb-8 w-full" style={{ color: themeConfig.footer.textColor }}>
              <span className="text-[13px] font-medium flex items-center justify-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center opacity-80"
                  style={{ backgroundColor: themeConfig.footer.iconBg, color: themeConfig.footer.iconColor }}>
                  <MapPin size={14} />
                </div>
                Nashik, MH – 422009
              </span>
              <a href="mailto:contactus@quasarcybertech.com" className="text-[13px] font-medium transition-colors flex items-center justify-start gap-4 hover:text-[#D6B05C]">
                <div
                  className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center opacity-80"
                  style={{ backgroundColor: themeConfig.footer.iconBg, color: themeConfig.footer.iconColor }}>
                  <Mail size={14} />
                </div>
                contactus@quasarcybertech.com
              </a>
              <a href="tel:+910000000000" className="text-[13px] font-medium transition-colors flex items-center justify-start gap-4 hover:text-[#D6B05C]">
                <div
                  className="w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center opacity-80"
                  style={{ backgroundColor: themeConfig.footer.iconBg, color: themeConfig.footer.iconColor }}>
                  <Phone size={14} />
                </div>
                +91 00000 00000
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-4 justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    style={{
                      borderColor: 'rgba(255,255,255,0.05)',
                      backgroundColor: themeConfig.footer.iconBg,
                      color: themeConfig.footer.iconColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themeConfig.footer.iconHoverBg || '#D6B05C';
                      e.currentTarget.style.color = themeConfig.footer.iconHoverText || '#4E0E26';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = themeConfig.footer.iconBg || 'rgba(214, 176, 92, 0.05)';
                      e.currentTarget.style.color = themeConfig.footer.iconColor || '#D6B05C';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMNS 2, 3, 4: Categories */}
          {footerLinks.map((category) => (
            <div
              key={category.title}
              className="flex flex-col items-start"
              style={{ paddingLeft: themeConfig.footer.columnsMarginLeft || '0px' }}
            >
              <h3
                className="font-black text-[10.5px] tracking-[0.25em] uppercase mb-8"
                style={{ color: themeConfig.footer.headingColor }}
              >
                {category.title}
              </h3>
              <ul className="flex flex-col" style={{ gap: themeConfig.footer.linkSpacing || '16px' }}>
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14.5px] font-bold transition-all duration-300 inline-block hover:translate-x-1"
                      style={{ color: themeConfig.footer.linkColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = themeConfig.footer.linkHoverColor || '#D6B05C'}
                      onMouseLeave={(e) => e.currentTarget.style.color = themeConfig.footer.linkColor || 'rgba(255, 255, 255, 0.95)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ───── LOWER SECTION (3-Tier Strip) ───── */}
        <div className="pt-8 border-t border-white/5 relative z-10">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] font-medium"
            style={{ color: themeConfig.footer.textColor }}
          >
            {/* LEFT: Copyright */}
            <div className="text-center md:text-left order-2 md:order-1">
              &copy; {currentYear} QuasarCyberTech. All rights reserved.
            </div>

            {/* MIDDLE: Legals */}
            <div className="flex justify-center flex-wrap gap-6 md:gap-8 order-1 md:order-2">
              <Link to="/privacy" className="hover:text-[#D6B05C] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#D6B05C] transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-[#D6B05C] transition-colors">Cookies</Link>
            </div>

            {/* RIGHT: Motto */}
            <div className="text-center md:text-right order-3">
              Engineering Cyber Resilience for a Digital First World
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;