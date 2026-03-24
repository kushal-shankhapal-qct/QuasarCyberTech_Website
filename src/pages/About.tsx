import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS, SHADOWS } from '../config/themeConfig';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: '#040B1D', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Header />
      
      <main>
        {/* ─── SECTION 1: HERO (Standardized Architecture) ─── */}
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
            background: GRADIENTS.HERO_BG,
            overflow: 'hidden',
            fontFamily: TYPOGRAPHY.fontBody,
          }}
        >
          {/* Breadcrumbs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'absolute',
            top: `calc(${LAYOUT_CONTROLS.breadcrumbs.top} + ${LAYOUT_CONTROLS.breadcrumbs.offsetY})`,
            left: `calc(${LAYOUT_CONTROLS.breadcrumbs.left} + ${LAYOUT_CONTROLS.breadcrumbs.offsetX})`,
            fontSize: '12px',
            fontFamily: TYPOGRAPHY.fontBody,
            zIndex: 20,
          }}>
            <Link to="/" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: LAYOUT_CONTROLS.breadcrumbs.arrowColor, opacity: 0.8 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>About Us</span>
          </div>

          {/* Left Content (60%) */}
          <div style={{ 
            flex: '0 0 60%', 
            paddingLeft: '2.5rem', 
            paddingRight: '4rem', 
            paddingBottom: '3rem', 
            position: 'relative', 
            zIndex: 10 
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                ...TYPOGRAPHY.heroTitle,
                fontFamily: TYPOGRAPHY.fontHeading,
                color: COLORS.textOnDark,
                marginBottom: '28px',
                lineHeight: 1.05
              }}
            >
              Engineering <span style={{ color: COLORS.gold }}>Trust</span> in a<br />
              Connected World
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                ...TYPOGRAPHY.bodyLarge,
                color: 'rgba(255,255,255,0.76)',
                textAlign: 'left',
                maxWidth: '100%',
                marginBottom: '42px',
                lineHeight: 1.8
              }}
            >
              QuasarCyberTech is a premier cybersecurity engineering firm dedicated to protecting the world's most critical digital infrastructures. We combine deep offensive security expertise with defensive architectural rigour.
            </motion.p>
          </div>

          {/* Right Visual (40%) with Standard Masking */}
          <div style={{ 
            flex: '0 0 40%', 
            height: '100vh', 
            position: 'relative',
            maskImage: `
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
              linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskImage: `
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 45%, black 70%),
              linear-gradient(to bottom, transparent 0%, black 15%)
            `,
            WebkitMaskComposite: 'destination-in',
            maskComposite: 'intersect'
          }}>
            <img 
              src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg" // Modern tech office/cityscape
              alt="QuasarCyberTech Mission" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, filter: 'brightness(0.9)' }} 
            />
          </div>
        </section>

        {/* ─── SECTION 2: CONTENT (Light Rhythm) ─── */}
        <section style={{ background: '#FFFFFF', padding: '120px 2.5rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeader eyebrow="OUR MISSION" title="Empowering" highlight="Security" />
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', marginTop: '30px' }}>
                  At QuasarCyberTech, our mission is to empower organizations with the technical resilience needed to thrive in an era of unprecedented cyber threats. We don't just secure systems; we engineer trust.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ background: '#F8FAFC', padding: '40px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.05)' }}
              >
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.deepCyberBlue, fontFamily: TYPOGRAPHY.fontHeading }}>Our Values</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Excellence', desc: 'Superior engineering in every engagement.' },
                    { title: 'Integrity', desc: 'Unwavering ethics and transparency.' },
                    { title: 'Innovation', desc: 'Proactive defense against emerging threats.' }
                  ].map((v, i) => (
                    <li key={i} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: '8px', height: '8px', background: COLORS.gold, borderRadius: '50%', marginTop: '10px' }} />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{v.title}</div>
                        <div style={{ color: '#64748B', fontSize: '0.95rem' }}>{v.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}