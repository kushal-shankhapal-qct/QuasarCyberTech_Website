import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, GRADIENTS, LAYOUT_CONTROLS, SHADOWS } from '../config/themeConfig';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    role: '',
    workEmail: '',
    phone: '',
    serviceInterest: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const scriptURL = 'https://script.google.com/macros/s/AKfycby_RaYmcdh3reQA0WhB41qaaFhhaZ8H_t-ogn1c9Gje6a-PiyKvnK27oWTVa9Jr3oQpIQ/exec';

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // With no-cors, we can't read the response properly, but if fetch completes, treat as success
      setFormSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        role: '',
        workEmail: '',
        phone: '',
        serviceInterest: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form', err);
      setError('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

      <style>{`
        .contact-form-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #040B1D;
          background: #FFFFFF;
          outline: none;
          font-family: ${TYPOGRAPHY.fontBody};
          transition: all 0.2s ease;
        }
        .contact-form-input:focus {
          border-color: #D6B05C;
          box-shadow: 0 0 0 3px rgba(214,176,92,0.15);
        }
        .contact-form-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #374151;
          display: block;
          margin-bottom: 5px;
        }
        .contact-info-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D6B05C;
          margin-bottom: 4px;
        }
        .contact-info-text {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
          text-decoration: none;
        }
        .contact-info-section {
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        select.contact-form-input {
          cursor: pointer;
        }
      `}</style>

      {/* ─── SECTION 1: HERO (MATCH HOMEPAGE) ─── */}
      <section style={{
        background: GRADIENTS.HERO_BG,
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '120px',
        paddingLeft: '2.5rem',
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        paddingBottom: '3rem',
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

        <div style={{ maxWidth: '1280px', margin: '0', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '620px' }}>
            <h1 style={{
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: '#FFFFFF',
              marginBottom: '28px',
              textAlign: 'left'
            }}>
              Let's <span style={{ color: COLORS.gold }}>Secure</span> Your Enterprise
            </h1>
            <p style={{
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)',
              textAlign: 'left',
              maxWidth: '100%',
              lineHeight: 1.8,
              marginBottom: '42px'
            }}>
              Tell us about your security challenge. We respond within 24 hours.
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
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {/* LEFT: FORM CARD */}
          <div style={{
            background: '#FFFFFF',
            borderTop: '4px solid #6B1530',
            borderRadius: '0 0 8px 8px',
            padding: '32px 36px',
            boxShadow: '0 4px 24px rgba(11,31,59,0.10)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {!formSubmitted ? (
              <>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0B1F3B', marginBottom: '24px', fontFamily: TYPOGRAPHY.fontHeading }}>
                  Request a Consultation
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  <div>
                    <label className="contact-form-label">Full Name</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="contact-form-input" />
                  </div>

                  <div>
                    <label className="contact-form-label">Company Name</label>
                    <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="contact-form-input" />
                  </div>

                  <div>
                    <label className="contact-form-label">Designation / Role</label>
                    <input type="text" name="role" required value={formData.role} onChange={handleChange} placeholder="e.g. CISO, IT Manager, Founder" className="contact-form-input" />
                  </div>

                  <div>
                    <label className="contact-form-label">Work Email</label>
                    <input type="email" name="workEmail" required value={formData.workEmail} onChange={handleChange} className="contact-form-input" />
                  </div>

                  <div>
                    <label className="contact-form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +1 555-0123 or +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="contact-form-input"
                    />
                  </div>

                  <div>
                    <label className="contact-form-label">Service of Interest</label>
                    <select name="serviceInterest" required value={formData.serviceInterest} onChange={handleChange} className="contact-form-input">
                      <option value="" disabled>Select a Service</option>
                      <option value="Cyber Advisory & Risk Governance">Cyber Advisory & Risk Governance</option>
                      <option value="Compliance & Regulatory Assurance">Compliance & Regulatory Assurance</option>
                      <option value="Offensive Security Engineering">Offensive Security Engineering</option>
                      <option value="Cloud & Infrastructure Security">Cloud & Infrastructure Security</option>
                      <option value="Managed Defense Operations">Managed Defense Operations</option>
                      <option value="Cyber Intelligence & Security Research">Cyber Intelligence & Security Research</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginBottom: '6px' }}>
                    <label className="contact-form-label">Tell us about your requirement</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your security challenge or goal..."
                      className="contact-form-input"
                      style={{ minHeight: '100px', resize: 'vertical' }}
                    />
                  </div>

                  {error && (
                    <div style={{ color: '#E53E3E', fontSize: '0.85rem', marginTop: '4px', textAlign: 'center' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: isSubmitting ? '#4A0E21' : '#6B1530',
                      color: '#ffffff',
                      padding: '16px',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      opacity: isSubmitting ? 0.8 : 1
                    }}
                    onMouseOver={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#8C1F3F' }}
                    onMouseOut={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#6B1530' }}
                  >
                    {isSubmitting ? 'SENDING...' : (
                      <>SEND MESSAGE <ArrowRight size={18} /></>
                    )}
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

          {/* RIGHT: INFO CARD */}
          <div style={{
            background: '#1C0D14',
            borderTop: '4px solid #D6B05C',
            borderRadius: '0 0 8px 8px',
            padding: '32px 36px',
            boxShadow: SHADOWS.darkCard,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Address Section */}
              <div className="contact-info-section" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <MapPin size={16} color="#D6B05C" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="contact-info-label">Address</div>
                    <a
                      href="https://goo.gl/maps/..."
                      target="_blank"
                      rel="noreferrer"
                      className="contact-info-text"
                      style={{ display: 'block' }}
                    >
                      Quasar CyberTech Private Limited<br />
                      1, State Bank Colony, Indira Nagar,<br />
                      Nashik, Maharashtra – 422009, India
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="contact-info-section">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Mail size={16} color="#D6B05C" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="contact-info-label">Email</div>
                    <a href="mailto:contactus@quasarcybertech.com" className="contact-info-text">
                      contactus@quasarcybertech.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Section */}
              <div className="contact-info-section">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Phone size={16} color="#D6B05C" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <a href="tel:+919730691190" className="contact-info-text">
                      +91 97306 91190
                    </a>
                  </div>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="contact-info-section" style={{ borderBottom: 'none' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: 16 }}></div> {/* spacer relative to icon bounds */}
                  <div>
                    <div className="contact-info-label">Follow Us</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              width: '36px',
                              height: '36px',
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = '#6B1530';
                              e.currentTarget.style.borderColor = '#6B1530';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <Icon size={16} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div style={{
              marginTop: 'auto',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.45)',
              paddingTop: '20px'
            }}>
              All inquiries are handled with strict confidentiality.
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: ENTERPRISE MAP ─── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto 100px', padding: `0 ${LAYOUT_CONTROLS.section.paddingX}` }}>
        <div style={{
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.08)',
          position: 'relative'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42339.375301872475!2d73.7853140781286!3d19.982802089484107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa179531b99bd65f1%3A0xa9162e0b222e964c!2sQuasar%20CyberTech%20Private%20Limited!5e1!3m2!1sen!2sin!4v1774342832620!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="QuasarCyberTech Office Location"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
