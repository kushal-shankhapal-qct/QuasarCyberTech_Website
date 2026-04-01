import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Seo from '../components/seo/Seo';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, GRADIENTS, LAYOUT_CONTROLS, SHADOWS } from '../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { createBreadcrumbSchema, createContactPageSchema } from '../seo/schema';

// ─── CONFIGURATION OVERRIDES ───
const CONFIG = {
  layout: {
    heroPaddingTop: 'clamp(6rem, 8vh, 5rem)',
    heroMinHeight: '100vh',
    cardsLiftUpFromHero: '2.5rem',             // Smaller value => cards move lower
  },
  card: {
    paddingX: '2.5rem',
    paddingTop: '3rem',
    paddingBottom: '1.5rem',
    contentBottomGap: '1.5rem',
    innerGap: '2rem',
    topAccentHeight: '4px',
    rightPanel: {
      // Master controls for right card vertical rhythm
      paddingX: '2.5rem',
      paddingTop: '3rem',
      paddingBottom: '1.5rem',
      sectionGap: '2rem',

      // Logo block
      logoHeight: '13em',
      logoMarginBottom: '1rem',

      // Email/Phone/Follow blocks
      infoGroupsGap: '1.5rem',
      infoRowGap: '16px',
      infoLabelMarginBottom: '0.3em',
      followGroupGap: '12px',
      followRowsGap: '12px',
      socialItemGap: '12px',
      socialIconSize: '40px',
      socialIconRadius: '12px',

      // Map block
      mapTopGap: '15.5em',
      mapMarginX: '2.5rem',
      mapMarginBottom: '0rem',
      mapHeight: '300px',
      mapBorderRadius: '12px',
    }
  }
};

const PHONE_UTILS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js';
const CONTACT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwYbyTXPZQQaecwG6iXObk3t1T9ZjcGY_shbdtBSRt36D7rXy-Izs8R-uonO9uoLI-U0w/exec';

export default function Contact() {
  const right = CONFIG.card.rightPanel;

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const phonePluginRef = useRef<ReturnType<typeof intlTelInput> | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    designation: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (field: keyof typeof formState, value: string) => {
    const trimmed = value.trim();

    switch (field) {
      case 'name': {
        if (!trimmed) return 'Full Name is required.';
        if (!/^[A-Za-z][A-Za-z\s'\-]{1,79}$/.test(trimmed)) return 'Use letters, spaces, apostrophe, or hyphen only.';
        return '';
      }
      case 'company': {
        if (!trimmed) return 'Company Name is required.';
        if (!/^[A-Za-z0-9][A-Za-z0-9\s.,&()'\-]{1,99}$/.test(trimmed)) return 'Please enter a valid company name.';
        return '';
      }
      case 'designation': {
        if (!trimmed) return 'Designation / Role is required.';
        if (!/^[A-Za-z0-9][A-Za-z0-9\s/&()'\-.,]{1,79}$/.test(trimmed)) return 'Please enter a valid designation or role.';
        return '';
      }
      case 'email': {
        if (!trimmed) return 'Work Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Enter a valid work email address.';
        return '';
      }
      case 'phone': {
        const inputRaw = phoneInputRef.current?.value || '';
        const digits = (inputRaw || trimmed).replace(/\D/g, '');
        if (!digits) return 'Phone Number is required.';
        if (digits.length > 10) return 'Phone number cannot exceed 10 digits.';
        return '';
      }
      case 'service': {
        if (!trimmed) return 'Please select a service.';
        return '';
      }
      case 'message': {
        if (!trimmed) return 'Requirement details are required.';
        return '';
      }
      default:
        return '';
    }
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof typeof formState, string>> = {};

    (Object.keys(formState) as Array<keyof typeof formState>).forEach((field) => {
      const message = validateField(field, formState[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const setField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const msg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
    }
  };

  const markField = (field: keyof typeof formState) => {
    const msg = validateField(field, formState[field]);
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
  };

  useEffect(() => {
    const inputEl = phoneInputRef.current;
    if (!inputEl) {
      return;
    }

    const utilsScriptId = 'intl-tel-input-utils-script';
    if (!document.getElementById(utilsScriptId)) {
      const script = document.createElement('script');
      script.id = utilsScriptId;
      script.src = PHONE_UTILS_URL;
      script.async = true;
      document.body.appendChild(script);
    }

    const iti = intlTelInput(inputEl, {
      initialCountry: 'in',
      autoPlaceholder: 'aggressive',
      separateDialCode: true,
      nationalMode: true,
      formatAsYouType: true,
    });

    phonePluginRef.current = iti;

    const applyNumericPatternPlaceholder = () => {
      // Convert plugin example placeholders into neutral 123... patterns while preserving separators.
      const raw = (inputEl.getAttribute('placeholder') || '').replace(/e\.g\.?\s*/gi, '').trim();
      if (!raw) {
        inputEl.setAttribute('placeholder', '123-456-789');
        return;
      }

      let nextDigit = 1;
      const transformed = raw.replace(/\d/g, () => {
        const d = String(nextDigit);
        nextDigit = nextDigit === 9 ? 1 : nextDigit + 1;
        return d;
      });

      inputEl.setAttribute('placeholder', transformed);
    };

    const syncPhone = () => {
      const rawDigits = (inputEl.value || '').replace(/\D/g, '');
      const limitedDigits = rawDigits.slice(0, 10);

      if (rawDigits.length > 10) {
        inputEl.value = limitedDigits;
      }

      setFormState((prev) => ({ ...prev, phone: limitedDigits }));
      if (errors.phone) {
        const msg = validateField('phone', limitedDigits);
        setErrors((prev) => ({ ...prev, phone: msg || undefined }));
      }
    };

    inputEl.addEventListener('input', syncPhone);
    inputEl.addEventListener('countrychange', syncPhone);
    inputEl.addEventListener('countrychange', applyNumericPatternPlaceholder);
    syncPhone();
    // Delay one tick so intl-tel-input writes its placeholder first.
    window.setTimeout(applyNumericPatternPlaceholder, 0);

    return () => {
      inputEl.removeEventListener('input', syncPhone);
      inputEl.removeEventListener('countrychange', syncPhone);
      inputEl.removeEventListener('countrychange', applyNumericPatternPlaceholder);
      iti.destroy();
      phonePluginRef.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    const payload = {
      fullName: formState.name.trim(),
      companyName: formState.company.trim(),
      role: formState.designation.trim(),
      workEmail: formState.email.trim(),
      phone: formState.phone.trim(),
      serviceInterest: formState.service.trim(),
      message: formState.message.trim(),
    };

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        // Send as a simple request so Apps Script is not blocked by OPTIONS preflight.
        body: JSON.stringify(payload),
      });

      const responseText = (await response.text()).trim();
      if (!response.ok || !/success/i.test(responseText)) {
        throw new Error(responseText || 'Unexpected response from server.');
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError('Unable to send your message right now. Please try again in a moment.');
      console.error('Contact form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Seo
        title="Contact QuasarCyberTech"
        description="Talk to QuasarCyberTech about offensive security, managed SOC, cloud security, compliance, and enterprise cyber resilience programs."
        path="/contact"
        image={ASSETS.capabilities.advisory}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          createContactPageSchema(),
        ]}
      />
      <Navbar />

      <main>
        {/* ─── SECTION 1: HERO ─── */}
        <PageHero
          title="Let's"
          highlight="Connect"
          subtitle="Tell us about your security challenge. We respond within 24 hours to help you solve your most complex security engineering problems."
          visualVariant="none"
          breadcrumbPaths={["Home"]}
          currentName="Contact"
          paddingTopOverride={CONFIG.layout.heroPaddingTop}
          minHeightOverride={CONFIG.layout.heroMinHeight}
        />

        {/* ─── SECTION 2: THE CORE CONTACT MODULE ─── */}
        <section id="contact-form" style={{
          position: 'relative',
          marginTop: `-${CONFIG.layout.cardsLiftUpFromHero}`,
          paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
          paddingLeft: LAYOUT_CONTROLS.section.paddingX,
          paddingRight: LAYOUT_CONTROLS.section.paddingX,
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}>
            {/* LEFT CARD: THE FORM */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                padding: `3rem 3rem ${CONFIG.card.contentBottomGap}`,
                boxShadow: SHADOWS.lightCard,
                border: '1px solid #E2E8F0',
                borderTop: `${CONFIG.card.topAccentHeight} solid ${COLORS.burgundy}`,
                position: 'relative'
              }}
            >
              <>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '2rem',
                  fontFamily: TYPOGRAPHY.fontHeading
                }}>
                  Request a <span style={{ color: COLORS.burgundy }}>Consultation</span>
                </h2>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setField('name', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.name ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem'
                      }}
                      onBlur={() => { markField('name'); }}
                    />
                    {errors.name && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.name}</div>}
                  </div>

                  {/* Company Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="company" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="Acme Corporation"
                      value={formState.company}
                      onChange={(e) => setField('company', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.company ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem'
                      }}
                      onBlur={() => { markField('company'); }}
                    />
                    {errors.company && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.company}</div>}
                  </div>

                  {/* Designation / Role */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="designation" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Designation / Role</label>
                    <input
                      type="text"
                      id="designation"
                      required
                      placeholder="e.g. CISO, IT Manager, Founder"
                      value={formState.designation}
                      onChange={(e) => setField('designation', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.designation ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem'
                      }}
                      onBlur={() => { markField('designation'); }}
                    />
                    {errors.designation && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.designation}</div>}
                  </div>

                  {/* Work Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Work Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@enterprise.com"
                      value={formState.email}
                      onChange={(e) => setField('email', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.email ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem'
                      }}
                      onBlur={() => { markField('email'); }}
                    />
                    {errors.email && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.email}</div>}
                  </div>

                  {/* Phone Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Phone Number</label>
                    <div className="phone-input-container">
                      <input
                        id="phone"
                        ref={phoneInputRef}
                        type="tel"
                        name="phone"
                        autoComplete="off"
                        required
                        className="custom-phone-input"
                        inputMode="numeric"
                        onBlur={() => markField('phone')}
                      />
                    </div>
                    {errors.phone && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.phone}</div>}
                  </div>

                  {/* Service of Interest */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="service" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Service of Interest</label>
                    <select
                      id="service"
                      required
                      value={formState.service}
                      onChange={(e) => setField('service', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.service ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer'
                      }}
                      onBlur={() => { markField('service'); }}
                    >
                      <option value="">Select a Service</option>
                      <option value="cyber-advisory">Cyber Advisory & Risk Governance</option>
                      <option value="compliance">Compliance & Regulatory Assurance</option>
                      <option value="offensive-security">Offensive Security Engineering</option>
                      <option value="cloud-security">Cloud & Infrastructure Security</option>
                      <option value="managed-defense">Managed Defense Operations</option>
                      <option value="cyber-intelligence">Cyber Intelligence & Security Research</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.service}</div>}
                  </div>

                  {/* Tell us about your requirement */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Tell us about your requirement</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Briefly describe your security challenge or goal..."
                      value={formState.message}
                      onChange={(e) => setField('message', e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: errors.message ? '1px solid #DC2626' : '1px solid #E2E8F0',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem',
                        resize: 'none'
                      }}
                      onBlur={() => { markField('message'); }}
                    />
                    {errors.message && <div style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '-2px' }}>{errors.message}</div>}
                  </div>

                  {isSubmitted ? (
                    <div style={{
                      minHeight: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${COLORS.burgundy}22`,
                      background: `${COLORS.burgundy}10`,
                      borderRadius: '8px',
                      color: COLORS.burgundy,
                      fontWeight: 800,
                      fontSize: '1rem',
                      fontFamily: TYPOGRAPHY.fontHeading,
                      letterSpacing: '0.02em'
                    }}>
                      Message sent!
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#6B1530] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#8B1E3F] hover:scale-[1.02] shadow-lg shadow-maroon/20"
                      style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                      {isSubmitting ? 'Sending...' : 'Confirm Submission'}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                  {submitError && (
                    <p style={{ margin: 0, color: '#B91C1C', fontSize: '0.85rem', fontWeight: 600 }}>
                      {submitError}
                    </p>
                  )}
                </form>
              </>
            </motion.div>

            {/* RIGHT CARD: THE CONTACT MODULE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                background: GRADIENTS.CONTACT_RIGHT_CARD_BG,
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderTop: `${CONFIG.card.topAccentHeight} solid ${COLORS.gold}`,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: SHADOWS.darkCard,
                overflow: 'hidden'
              }}
            >
              <div style={{
                paddingLeft: right.paddingX,
                paddingRight: right.paddingX,
                paddingTop: right.paddingTop,
                paddingBottom: right.paddingBottom,
                display: 'flex',
                flexDirection: 'column',
                gap: right.sectionGap,
              }}>
                {/* 1. LOGO */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: right.logoMarginBottom }}>
                  <img
                    src={ASSETS.logos.qct.over}
                    alt="QuasarCyberTech"
                    style={{ height: right.logoHeight, width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                {/* 2. CONTACT INFO (Vertical Stack) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: right.infoGroupsGap }}>
                  {/* Email */}
                  <div style={{ display: 'flex', gap: right.infoRowGap, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: right.socialIconSize,
                        height: right.socialIconSize,
                        borderRadius: right.socialIconRadius,
                        border: '1px solid rgba(214, 176, 92, 0.25)',
                        backgroundColor: 'rgba(214, 176, 92, 0.06)',
                        color: COLORS.gold,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Mail size={18} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: right.infoLabelMarginBottom }}>Email</div>
                      <a href="mailto:contactus@quasarcybertech.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.95rem', opacity: 0.9 }}>
                        contactus@quasarcybertech.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: right.infoRowGap, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: right.socialIconSize,
                        height: right.socialIconSize,
                        borderRadius: right.socialIconRadius,
                        border: '1px solid rgba(214, 176, 92, 0.25)',
                        backgroundColor: 'rgba(214, 176, 92, 0.06)',
                        color: COLORS.gold,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Phone size={18} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: right.infoLabelMarginBottom }}>Phone</div>
                      <a href="tel:+919730691190" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.95rem', opacity: 0.9 }}>
                        +91 97306 91190
                      </a>
                    </div>
                  </div>

                  {/* Follow Us - Footer icon style + label on right */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: right.followGroupGap }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Follow Us</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: right.followRowsGap }}>
                      {[
                        { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/company/quasar-cybertech' },
                        { icon: Instagram, name: 'Instagram', href: 'https://www.instagram.com/quasarcybertech/' },
                        { icon: Twitter, name: 'Twitter', href: 'https://twitter.com/' }
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: right.socialItemGap,
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            width: 'fit-content'
                          }}
                          onMouseOver={(e) => {
                            const iconWrap = e.currentTarget.querySelector('[data-social-icon]') as HTMLElement | null;
                            const label = e.currentTarget.querySelector('[data-social-label]') as HTMLElement | null;
                            if (iconWrap) {
                              iconWrap.style.backgroundColor = 'rgba(214, 176, 92, 0.15)';
                              iconWrap.style.transform = 'translateY(-4px)';
                            }
                            if (label) {
                              label.style.color = '#FFFFFF';
                            }
                          }}
                          onMouseOut={(e) => {
                            const iconWrap = e.currentTarget.querySelector('[data-social-icon]') as HTMLElement | null;
                            const label = e.currentTarget.querySelector('[data-social-label]') as HTMLElement | null;
                            if (iconWrap) {
                              iconWrap.style.backgroundColor = 'rgba(214, 176, 92, 0.06)';
                              iconWrap.style.transform = 'translateY(0)';
                            }
                            if (label) {
                              label.style.color = 'rgba(255,255,255,0.9)';
                            }
                          }}
                        >
                          <span
                            data-social-icon
                            style={{
                              width: right.socialIconSize,
                              height: right.socialIconSize,
                              borderRadius: right.socialIconRadius,
                              border: '1px solid rgba(214, 176, 92, 0.25)',
                              backgroundColor: 'rgba(214, 176, 92, 0.06)',
                              color: COLORS.gold,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <social.icon size={18} />
                          </span>
                          <span data-social-label style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                            {social.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. THE MAP (Refined with Margin & Border Radius) */}
              <div style={{
                margin: `${right.mapTopGap} ${right.mapMarginX} ${right.mapMarginBottom}`,
                height: right.mapHeight,
                borderRadius: right.mapBorderRadius,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                marginTop: 0
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.7716067188735!2d73.78251627522837!3d19.976105081422666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa179531b99bd65f1%3A0xa9162e0b222e964c!2sQuasar%20CyberTech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1774602049988!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Responsive Fix for Contact Section */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 768px) {
            #contact-form {
              padding-left: 1.25rem !important;
              padding-right: 1.25rem !important;
            }
          }
        `}} />

        {/* Global Styles for Phone Input */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .phone-input-container {
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 8px 12px;
            background: #fff;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            min-height: 50px;
          }
          .phone-input-container:focus-within {
            border-color: #CBD5E1;
            box-shadow: none;
          }
          .custom-phone-input {
            width: 100%;
            border: none !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            padding-right: 8px !important;
            outline: none !important;
            font-size: 0.95rem !important;
            height: 36px !important;
            background: transparent !important;
            color: #0F172A !important;
            text-decoration: none !important;
            line-height: 36px !important;
          }
          .iti {
            width: 100%;
            display: flex;
            align-items: center;
          }
          .iti__selected-flag {
            background: #fff7e5;
            border-radius: 6px;
            padding: 0 10px 0 8px;
            border: 1px solid #f1ddac;
            transition: all 0.2s ease;
            margin-right: 6px;
          }
          .iti__selected-dial-code {
            color: #0F172A;
            font-size: 0.95rem;
            line-height: 36px;
            font-weight: 400;
            margin-left: 6px;
          }
          .iti__selected-flag:hover {
            background: #fff1cd;
          }
          .iti__flag { box-shadow: 0 1px 2px rgba(0,0,0,0.08) !important; }
          .iti__arrow {
            border-top-color: ${COLORS.burgundy};
            opacity: 0.9;
          }
          .iti__country-list {
            border-radius: 10px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);
            max-width: 330px;
          }
        `}} />
      </main>

      <Footer />
    </div>
  );
}
