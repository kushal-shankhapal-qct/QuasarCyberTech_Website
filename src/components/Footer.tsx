import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';
import footerIcon from '../assets/Logos/No_Text_Quasar_CyberTech_Logo.png';
import footerText from '../assets/Logos/QuasarCyberTech_Text_Only_Logo_Over.png';
import qWatermark from '../assets/Logos/Q_Upscaled.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Roadmap', href: '#' }
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Compliance', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="relative border-t overflow-hidden" style={{ background: 'var(--footer-bg)', color: 'var(--text-primary)', borderColor: 'rgba(0,0,0,0.05)' }}>
      {/* Background Q Watermark */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={qWatermark}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-auto object-contain opacity-[0.08] select-none"
          style={{ filter: 'invert(1)' }}
        />
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col items-center px-2 text-center">
            <div className="flex items-center gap-5 mb-6">
              <img src="/src/assets/Logos/fulllogo_transparent_nobuffer.png" alt="Quasar CyberTech" className="h-16 w-auto" />
            </div>
            <p className="text-slate-500 mb-6 max-w-sm text-[14px] leading-relaxed font-medium mx-auto">
              Enterprise cybersecurity engineering designed for continuous visibility and accelerated remediation in a digital-first world.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-[var(--brand-accent)] hover:text-white border border-slate-100 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Icon size={18} className="text-slate-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:pl-8">
              <h3 className="font-black text-[11px] text-[var(--brand-accent)] tracking-[2px] uppercase mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-slate-500 hover:text-[var(--brand-accent)] font-medium transition-colors duration-300 flex items-center group w-fit"
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

        {/* Divider - Streamlined */}
        <div className="pt-6 border-t border-slate-100/50">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--brand-accent)]" />
              <a href="mailto:hello@quasarcybertech.com" className="text-sm text-slate-500 hover:text-[var(--brand-accent)] transition-colors">
                hello@quasarcybertech.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[var(--brand-accent)]" />
              <a href="tel:+1234567890" className="text-sm text-slate-500 hover:text-[var(--brand-accent)] transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; {currentYear} QuasarCyberTech. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--brand-accent)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--brand-accent)] transition-colors">Terms</a>
              <a href="#" className="hover:text-[var(--brand-accent)] transition-colors text-slate-400">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;