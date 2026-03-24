import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, GRADIENTS, LAYOUT_CONTROLS, SHADOWS } from '../config/themeConfig';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mapActive, setMapActive] = useState(false);
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
    <div style={{ background: '#F8FAFC', minHeight: '100vh', position: 'relative' }}>
      <Header />

      {/* ─── SECTION 1: HERO (STRICT SYSTEM SYNC) ─── */}
      <section style={{
        background: GRADIENTS.HERO_BG,
        minHeight: '90vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'flex-start',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        overflow: 'hidden'
      }}>
        {/* Subtle dot matrix overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${COLORS.gold}10 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '620px' }}>
            <h1 style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: '#FFFFFF',
              marginBottom: '32px',
              textAlign: 'left'
            }}>
              Let's <span style={{ color: COLORS.gold }}>Secure</span> Your Enterprise
            </h1>
            <p style={{
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'left',
              maxWidth: '100%',
              lineHeight: 1.8,
              marginBottom: '0'
            }}>
              Strategic cybersecurity consulting for the modern risk landscape. Connect with our technical advisors to define your enterprise security posture.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CARDS GRID ─── */}
      <section style={{ 
        maxWidth: '1280px', 
        margin: '-120px auto 80px',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '32px',
          alignItems: 'stretch'
        }}>
          {/* LEFT: FORM CARD (Grid 7 col) */}
          <div style={{
            gridColumn: 'span 7',
            background: '#FFFFFF',
            borderRadius: '4px',
            padding: '48px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            {!formSubmitted ? (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#040B1D', marginBottom: '32px', fontFamily: TYPOGRAPHY.fontHeading }}>
                   Request a Consultation
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                      <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Jane Doe" style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Work Email</label>
                      <input type="email" name="workEmail" required value={formData.workEmail} onChange={handleChange} placeholder="jane@company.com" style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inquiry Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your security requirements..."
                      style={{ ...inputStyle, minHeight: '130px', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: COLORS.burgundy,
                      color: '#ffffff',
                      padding: '16px',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = '#8C1F3F')}
                    onMouseOut={(e) => (e.currentTarget.style.background = COLORS.burgundy)}
                  >
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(214, 176, 92, 0.1)', color: '#D6B05C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '24px' }}>
                  ✓
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#040B1D', marginBottom: '16px', fontFamily: TYPOGRAPHY.fontHeading }}>Transmission Successful</h2>
                <p style={{ color: '#64748B', maxWidth: '320px', margin: '0 0 32px' }}>An advisor will review your technical requirements and respond within 24 business hours.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{ background: 'transparent', border: 'none', color: COLORS.burgundy, fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                >
                  New Message
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: INFO CARD (STRICT DESIGN REALIGNMENT) (Grid 5 col) ─── */}
          <div style={{
            gridColumn: 'span 5',
            background: '#040B1D', // Using actual darkBase
            borderRadius: '4px',
            padding: '48px',
            boxShadow: SHADOWS.darkCard,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '48px', fontFamily: TYPOGRAPHY.fontHeading }}>
                Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Office */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ color: COLORS.gold }}> <MapPin size={24} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: COLORS.gold, textTransform: 'uppercase', marginBottom: '10px' }}>STRATEGIC HUB</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Quasar CyberTech Private Limited</h4>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                      1, State Bank Colony, Indira Nagar, <br />
                      Nashik, Maharashtra – 422009, India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ color: COLORS.gold }}> <Mail size={24} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: COLORS.gold, textTransform: 'uppercase', marginBottom: '10px' }}>SECURE CHANNEL</span>
                    <a href="mailto:contactus@quasarcybertech.com" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>
                      contactus@quasarcybertech.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ color: COLORS.gold }}> <Phone size={24} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: COLORS.gold, textTransform: 'uppercase', marginBottom: '10px' }}>DIRECT LINE</span>
                    <a href="tel:+919730691190" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', textDecoration: 'none' }}>
                      +91 97306 91190
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Track */}
              <div style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px' }}>
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
                          width: '46px',
                          height: '46px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = COLORS.burgundy;
                          e.currentTarget.style.borderColor = COLORS.burgundy;
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
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
      </section>

      {/* ─── SECTION 3: ENTERPRISE MAP (HIGH FIDELITY) ─── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 100px', padding: `0 ${LAYOUT_CONTROLS.section.paddingX}` }}>
        <div 
          onClick={() => setMapActive(true)}
          style={{
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.08)',
            position: 'relative',
            cursor: mapActive ? 'default' : 'pointer'
          }}
        >
          {/* Overlay to catch interactions */}
          {!mapActive && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(4, 11, 29, 0.4)',
              backdropFilter: 'blur(1px)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ background: '#FFFFFF', padding: '12px 24px', borderRadius: '4px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', color: '#040B1D', letterSpacing: '0.1em' }}>
                Activate Map
              </div>
            </div>
          )}

          {/* Map with deeper blue/dark filter */}
          <div style={{ 
            filter: 'grayscale(1) invert(1) brightness(0.8) hue-rotate(190deg) saturate(1.8)', 
            lineHeight: 0 
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.231912000038!2d73.78251627522837!3d19.976105081422666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa179531b99bd65f1%3A0xa9162e0b222e964c!2sQuasar%20CyberTech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1774001754293!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block', pointerEvents: mapActive ? 'auto' : 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #E2E8F0',
  borderRadius: '4px',
  fontSize: '0.95rem',
  color: '#040B1D',
  background: '#FFFFFF',
  outline: 'none',
  fontFamily: TYPOGRAPHY.fontBody,
  transition: 'border-color 0.2s ease',
};

export default Contact;
