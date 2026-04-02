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
    heroPaddingTop: 'clamp(5rem, 8vh, 6rem)',
    heroMinHeight: '100vh',
    cardsLiftUpFromHero: '13rem',             // Smaller value => cards move lower
  },
  card: {
    paddingX: '3rem',
    paddingTop: '3rem',
    paddingBottom: '1.5rem',
    contentBottomGap: '1.5rem',
    innerGap: '2rem',
    topAccentHeight: '4px',
    rightPanel: {
      // Master controls for right card vertical rhythm
      paddingX: '3rem',
      paddingTop: '3rem',
      paddingBottom: '1.5rem',
      sectionGap: '2rem',

      // Logo block
      logoHeight: '8.25em',
      logoMarginBottom: '1rem',

      // Email/Phone/Follow blocks
      infoGroupsGap: '1rem',
      infoRowGap: '16px',
      infoLabelMarginBottom: '0.3em',
      followGroupGap: '12px',
      followRowsGap: '12px',
      socialItemGap: '12px',
      socialIconSize: '40px',
      socialIconRadius: '12px',

      // Map block
      mapTopGap: '1.25rem',
      mapMarginX: '3rem',
      mapMarginBottom: '1.6rem',
      mapHeight: '220px',
      mapBorderRadius: '12px',
    }
  }
};

const PHONE_UTILS_URL = import.meta.env.VITE_PHONE_UTILS_URL?.trim() || 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js';
const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL?.trim() || '';
const SUBMIT_TIMEOUT_MS = 12000;
const CONTACT_DESKTOP_SIDE_MARGIN = '3rem';

const stripUnsupportedControlChars = (value: string): string =>
  Array.from(value)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return !(code <= 31 || code === 127) || code === 9 || code === 10 || code === 13;
    })
    .join('');

const FIELD_MAX_LENGTH = {
  name: 80,
  company: 100,
  designation: 80,
  email: 120,
  message: 1000,
} as const;

const MALICIOUS_PATTERNS: RegExp[] = [
  /<\s*script\b/i,
  /<\s*\/\s*script\s*>/i,
  /<\s*\/?\s*[a-z][^>]*>/i,
  /javascript\s*:/i,
  /data\s*:\s*text\/html/i,
  /vbscript\s*:/i,
  /on\w+\s*=/i,
  /(?:\b|_)(?:alert|prompt|confirm|eval|Function)\s*\(/i,
  /document\.(?:cookie|write)|window\.(?:location|open)/i,
];

const isMaliciousInput = (value: string): boolean => {
  if (!value) return false;
  return MALICIOUS_PATTERNS.some((pattern) => pattern.test(value));
};

const sanitizeInput = (value: string, maxLength?: number): string => {
  if (!value) return '';

  let sanitized = value
    .replace(/\r\n/g, '\n');

  sanitized = stripUnsupportedControlChars(sanitized)
    .replace(/<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/on\w+\s*=\s*/gi, '')
    .trim();

  if (typeof maxLength === 'number') {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
};

export default function Contact() {
  const right = CONFIG.card.rightPanel;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const phonePluginRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    designation: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (field: keyof typeof formState, value: string) => {
    const trimmed = value.trim();

    if (field !== 'phone' && field !== 'website' && isMaliciousInput(trimmed)) {
      return 'Invalid input detected. Please remove unsupported characters or code-like content.';
    }

    switch (field) {
      case 'name': {
        if (!trimmed) return 'Full Name is required.';
        if (trimmed.length > FIELD_MAX_LENGTH.name) return 'Full Name cannot exceed 80 characters.';
        if (!/^[A-Za-z][A-Za-z\s'-]{1,79}$/.test(trimmed)) return 'Use letters, spaces, apostrophe, or hyphen only.';
        return '';
      }
      case 'company': {
        if (!trimmed) return 'Company Name is required.';
        if (trimmed.length > FIELD_MAX_LENGTH.company) return 'Company Name cannot exceed 100 characters.';
        if (!/^[A-Za-z0-9][A-Za-z0-9\s.,&()'-]{1,99}$/.test(trimmed)) return 'Please enter a valid company name.';
        return '';
      }
      case 'designation': {
        if (!trimmed) return 'Designation / Role is required.';
        if (trimmed.length > FIELD_MAX_LENGTH.designation) return 'Designation / Role cannot exceed 80 characters.';
        if (!/^[A-Za-z0-9][A-Za-z0-9\s/&()'.,-]{1,79}$/.test(trimmed)) return 'Please enter a valid designation or role.';
        return '';
      }
      case 'email': {
        if (!trimmed) return 'Work Email is required.';
        if (trimmed.length > FIELD_MAX_LENGTH.email) return 'Work Email cannot exceed 120 characters.';
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
        if (trimmed.length > FIELD_MAX_LENGTH.message) return 'Requirement details cannot exceed 1000 characters.';
        return '';
      }
      case 'website': {
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
    const maxLength =
      field === 'name'
        ? FIELD_MAX_LENGTH.name
        : field === 'company'
          ? FIELD_MAX_LENGTH.company
          : field === 'designation'
            ? FIELD_MAX_LENGTH.designation
            : field === 'email'
              ? FIELD_MAX_LENGTH.email
              : field === 'message'
                ? FIELD_MAX_LENGTH.message
                : undefined;

    const sanitizedValue = sanitizeInput(value, maxLength);
    setFormState((prev) => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) {
      const msg = validateField(field, sanitizedValue);
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
      setErrors((prev) => {
        if (!prev.phone) {
          return prev;
        }

        const phoneError = !limitedDigits ? 'Phone Number is required.' : '';
        return { ...prev, phone: phoneError || undefined };
      });
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

  useEffect(() => {
    if (!isSubmitted || !formCardRef.current) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      const rect = formCardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const targetTop = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formState.website.trim()) {
      setSubmitError('Unable to process this submission. Please refresh and try again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    if (!CONTACT_WEBHOOK_URL) {
      setSubmitError('Contact service is not configured. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      fullName: sanitizeInput(formState.name, FIELD_MAX_LENGTH.name),
      companyName: sanitizeInput(formState.company, FIELD_MAX_LENGTH.company),
      role: sanitizeInput(formState.designation, FIELD_MAX_LENGTH.designation),
      workEmail: sanitizeInput(formState.email, FIELD_MAX_LENGTH.email),
      phone: formState.phone.trim(),
      serviceInterest: sanitizeInput(formState.service, 80),
      message: sanitizeInput(formState.message, FIELD_MAX_LENGTH.message),
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        // Send as a simple request so Apps Script is not blocked by OPTIONS preflight.
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const responseText = (await response.text()).trim();
      if (!response.ok || !/success/i.test(responseText)) {
        throw new Error(responseText || 'Unexpected response from server.');
      }

      setIsSubmitted(true);
      setSubmitError('');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setSubmitError('Request timed out. Please check your connection and try again.');
      } else {
        setSubmitError('Unable to send your message right now. Please try again in a moment.');
      }
      console.error('Contact form submission failed:', error);
    } finally {
      window.clearTimeout(timeoutId);
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
          paddingLeft: CONTACT_DESKTOP_SIDE_MARGIN,
          paddingRight: CONTACT_DESKTOP_SIDE_MARGIN,
          zIndex: 10
        }}>
          <div style={{
            width: '100%',
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
              ref={formCardRef}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                padding: `3rem 3rem ${CONFIG.card.contentBottomGap}`,
                boxShadow: SHADOWS.lightCard,
                border: '1px solid #E2E8F0',
                borderTop: `${CONFIG.card.topAccentHeight} solid ${COLORS.burgundy}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {!isSubmitted ? (
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

                <form className="contact-form-grid" onSubmit={handleSubmit} noValidate style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '16px', rowGap: '1rem', flex: 1 }}>
                  <input
                    type="text"
                    name="website"
                    value={formState.website}
                    onChange={(e) => setField('website', e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Full Name */}
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      maxLength={FIELD_MAX_LENGTH.name}
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
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="company" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      maxLength={FIELD_MAX_LENGTH.company}
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
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="designation" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Designation / Role</label>
                    <input
                      type="text"
                      id="designation"
                      required
                      maxLength={FIELD_MAX_LENGTH.designation}
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
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Work Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      maxLength={FIELD_MAX_LENGTH.email}
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
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Phone Number</label>
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
                  <div className="contact-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="service" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Service of Interest</label>
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
                      <option value="cyber-advisory">Cyber Security Advisory & Risk Governance</option>
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
                  <div className="contact-field contact-field-full" style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                    <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}><span style={{ color: '#DC2626' }}>*</span> Tell us about your requirement</label>
                    <textarea
                      id="message"
                      required
                      maxLength={FIELD_MAX_LENGTH.message}
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#6B1530] text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#8B1E3F] hover:scale-[1.02] shadow-lg shadow-maroon/20"
                    style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer', gridColumn: '1 / -1' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Confirm Submission'}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  {submitError && (
                    <p style={{ margin: 0, color: '#B91C1C', fontSize: '0.85rem', fontWeight: 600, gridColumn: '1 / -1' }}>
                      {submitError}
                    </p>
                  )}
                </form>
                </>
              ) : (
                <div
                  style={{
                    height: '100%',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '3rem',
                  }}
                >
                  <div style={{ maxWidth: '560px' }}>
                    <h2
                      style={{
                        margin: 0,
                        marginBottom: '14px',
                        color: COLORS.burgundy,
                        fontFamily: TYPOGRAPHY.fontHeading,
                        fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                      }}
                    >
                      Request Received
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        color: '#0F172A',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        fontWeight: 500,
                      }}
                    >
                      Thank you. We have received your inquiry. Our experts will connect with you soon.
                    </p>
                  </div>
                </div>
              )}
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
                gap: '1.25rem',
              }}>
                {/* 1. LOGO */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: right.logoMarginBottom }}>
                  <img
                    src={ASSETS.logos.qct.over}
                    alt="QuasarCyberTech"
                    style={{ height: right.logoHeight, width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                {/* 2. FOLLOW US */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Follow Us</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
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
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            width: 'fit-content'
                          }}
                          onMouseOver={(e) => {
                            const iconWrap = e.currentTarget.querySelector('[data-social-icon]') as HTMLElement | null;
                            if (iconWrap) {
                              iconWrap.style.backgroundColor = 'rgba(214, 176, 92, 0.15)';
                              iconWrap.style.transform = 'translateY(-4px)';
                            }
                          }}
                          onMouseOut={(e) => {
                            const iconWrap = e.currentTarget.querySelector('[data-social-icon]') as HTMLElement | null;
                            if (iconWrap) {
                              iconWrap.style.backgroundColor = 'rgba(214, 176, 92, 0.06)';
                              iconWrap.style.transform = 'translateY(0)';
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
                        </a>
                      ))}
                  </div>
                </div>

                {/* 3. CONTACT INFO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        border: '1px solid rgba(214, 176, 92, 0.25)',
                        backgroundColor: 'rgba(214, 176, 92, 0.06)',
                        color: COLORS.gold,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      <Mail size={16} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.28rem' }}>Email</div>
                      <a href="mailto:contactus@quasarcybertech.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.95rem', opacity: 0.9 }}>
                        contactus@quasarcybertech.com
                      </a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        border: '1px solid rgba(214, 176, 92, 0.25)',
                        backgroundColor: 'rgba(214, 176, 92, 0.06)',
                        color: COLORS.gold,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      <Phone size={16} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.28rem' }}>Phone</div>
                      <a href="tel:+919730691190" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.95rem', opacity: 0.9 }}>
                        +91 97306 91190
                      </a>
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
          @media (max-width: 64rem) {
            #contact-form {
              padding-left: var(--page-padding-x) !important;
              padding-right: var(--page-padding-x) !important;
            }

            .contact-form-grid {
              grid-template-columns: 1fr !important;
            }

            .contact-field,
            .contact-field-full {
              grid-column: 1 / -1 !important;
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
