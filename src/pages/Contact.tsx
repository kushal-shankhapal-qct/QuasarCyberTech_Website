import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, GRADIENTS, SHADOWS } from '../config/themeConfig';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/quasar-cybertech', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/quasarcybertech/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/', label: 'Facebook' }
  ];

  return (
    <div style={{ background: '#F5F7FA', minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      {/* ─── SECTION 1: HERO (FULL VIEWPORT) ─── */}
      <section style={{
        background: GRADIENTS.HERO_BG,
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Anchor content to bottom
        alignItems: 'flex-start',
        paddingLeft: '2.5em',
        paddingRight: '2em',
        paddingBottom: '3em',
        paddingTop: '0em',
        overflow: 'visible'
      }}>
        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(43,196,182,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '720px', width: '100%', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark,
            marginBottom: '28px'
          }}>
            Let's <span style={{ color: COLORS.gold }}>Secure</span> Your Enterprise
          </h1>
          <p style={{
            ...TYPOGRAPHY.bodyLarge,
            color: 'rgba(255,255,255,0.76)',
            textAlign: 'justify',
            maxWidth: '100%',
            marginBottom: '42px'
          }}>
            Tell us about your security challenges. Our team responds within 24 hours.
          </p>
        </div>

        {/* ─── PEEKING CARDS ROW ─── */}
        <div style={{
          position: 'absolute',
          bottom: '-590px',
          left: '2.5em',
          right: '2em',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px',
          zIndex: 10,
          alignItems: 'stretch'
        }} className="cards-overlap-row">
          {/* LEFT: FORM CARD */}
          <div style={{ height: '100%' }}>
            {!formSubmitted ? (
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 12px 32px rgba(11,31,59,0.12)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0B1F3B', marginBottom: '32px', fontFamily: TYPOGRAPHY.fontHeading }}>
                  Request a Consultation
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Full Name</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Jane Doe" style={inputStyle} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Enterprise" style={inputStyle} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Work Email</label>
                    <input type="email" name="workEmail" required value={formData.workEmail} onChange={handleChange} placeholder="jane@company.com" style={inputStyle} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" style={inputStyle} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Message / How can we help?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your security goals..."
                      style={{ ...inputStyle, minHeight: '120px', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#6B1530',
                      color: '#ffffff',
                      padding: '16px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = '#8B1E3F')}
                    onMouseOut={(e) => (e.currentTarget.style.background = '#6B1530')}
                  >
                    Send Message <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '60px 40px',
                textAlign: 'center',
                boxShadow: '0 12px 32px rgba(11,31,59,0.12)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(214, 176, 92, 0.1)', color: '#D6B05C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                  ✓
                </div>
                <h3 style={{ color: '#0B1F3B', fontWeight: 800, margin: 0, fontSize: '1.2rem' }}>Message Sent</h3>
                <p style={{ color: '#4a5568', margin: 0, fontSize: '0.95rem' }}>Our team will be in touch within 24 hours.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{ background: 'transparent', border: 'none', color: '#D6B05C', fontWeight: 700, cursor: 'pointer', marginTop: '20px', fontSize: '0.9rem', textDecoration: 'underline' }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: INFO CARD (DARK) */}
          <div style={{ height: '100%' }}>
            <div style={{
              background: '#040B1D',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Dot matrix for card */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(43,196,182,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 1,
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '40px', fontFamily: TYPOGRAPHY.fontHeading }}>
                  Contact Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a 
                    href="https://maps.app.goo.gl/GZa9schp9LXZgKpx8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      padding: '16px 0', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      const title = e.currentTarget.querySelector('h4') as HTMLElement;
                      if (title) title.style.color = '#D6B05C';
                    }}
                    onMouseLeave={e => {
                      const title = e.currentTarget.querySelector('h4') as HTMLElement;
                      if (title) title.style.color = '#ffffff';
                    }}
                  >
                    <div style={{ color: '#D6B05C', marginTop: '2px' }}> <MapPin size={18} /> </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: '#D6B05C', textTransform: 'uppercase', marginBottom: '6px' }}>OUR OFFICE</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', transition: 'color 0.2s ease' }}>Quasar CyberTech Private Limited</h4>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>Nashik, MH – 422009, India</p>
                    </div>
                  </a>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', width: '100%' }} />
                </div>

                <InfoBlock icon={Mail} label="EMAIL US" value="contactus@quasarcybertech.com" isLink href="mailto:contactus@quasarcybertech.com" isDark />
                <InfoBlock icon={Phone} label="CALL US" value="+91 97306 91190" isDark />

                {/* Updated Follow Us Section */}
                <div style={{ marginTop: '48px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: '#2BC4B6', textTransform: 'uppercase' }}>FOLLOW US</span>
                  <div style={{ display: 'flex', gap: '14px', marginTop: '16px' }}>
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
                            background: 'rgba(43,196,182,0.10)',
                            border: '1px solid rgba(43,196,182,0.15)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#2BC4B6',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(43,196,182,0.20)';
                            e.currentTarget.style.borderColor = 'rgba(43,196,182,0.30)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(43,196,182,0.10)';
                            e.currentTarget.style.borderColor = 'rgba(43,196,182,0.15)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: MAP & FILLER ─── */}
      <section style={{
        paddingTop: 'calc(80px + 640px)',
        background: '#F5F7FA',
        position: 'relative'
      }}>
        <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2646.323191200038!2d73.78251627522837!3d19.976105081422666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa179531b99bd65f1%3A0xa9162e0b222e964c!2sQuasar%20CyberTech%20Private%20Limited!5e1!3m2!1sen!2sin!4v1774001754293!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="QuasarCyberTech Office Location"
          />
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .cards-overlap-row {
            grid-template-columns: 1fr !important;
            left: 20px !important;
            right: 20px !important;
            bottom: -800px !important;
          }
          section[style*="paddingTop: calc(80px + 640px)"] {
            paddingTop: calc(800px + 80px + 200px) !important;
          }
        }
        @media (max-width: 768px) {
          section[style*="paddingTop: 35vh"] { padding-top: 25vh !important; padding-left: 20px !important; padding-right: 20px !important; }
          iframe { height: 300px !important; }
        }
      `}} />
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '0.9rem',
  color: '#0B1F3B',
  background: '#fafafa',
  outline: 'none',
  fontFamily: TYPOGRAPHY.fontBody,
  transition: 'all 0.2s ease',
};

const InfoBlock: React.FC<{ icon: any, label: string, value: string, isLink?: boolean, href?: string, isDark?: boolean, noBorder?: boolean }> = ({ icon: Icon, label, value, isLink, href, isDark, noBorder }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      padding: '16px 0',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      borderBottom: noBorder ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(11,31,59,0.08)')
    }}>
      <div style={{ color: '#2BC4B6', marginTop: '2px' }}> <Icon size={18} /> </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: '#2BC4B6', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</span>
        {isLink ? (
          <a href={href} 
             target={href?.startsWith('http') ? '_blank' : '_self'} 
             rel={href?.startsWith('http') ? 'noopener noreferrer' : ''} 
             onMouseEnter={() => setHovered(true)} 
             onMouseLeave={() => setHovered(false)} 
             style={{ 
               fontSize: '1rem', 
               color: hovered ? '#2BC4B6' : (isDark ? 'rgba(255,255,255,0.95)' : '#0B1F3B'), 
               fontWeight: 500, 
               textDecoration: 'none', 
               transition: 'color 0.2s ease', 
               margin: 0 
             }} 
          > {value} </a>
        ) : (
          <span style={{ fontSize: '1rem', color: isDark ? 'rgba(255,255,255,0.95)' : '#0B1F3B', fontWeight: 500, margin: 0 }}>{value}</span>
        )}
      </div>
    </div>
  );
};

export default Contact;
