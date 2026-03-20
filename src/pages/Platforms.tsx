import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Shield, Database, Activity, Target, ExternalLink } from 'lucide-react';
import { COLORS, TYPOGRAPHY, ALPHAS, GRADIENTS } from '../config/themeConfig';

// Import Logos
import qStellarLogo from '../assets/Logos/Cropped_QStelllar_fulllogo_transparent.png';
import qPulseLogo from '../assets/Logos/QPulse_Logo_No_Buffer.png';
import qrgtLogo from '../assets/logos copy/Platforms/QRGT.png';

export default function Platforms() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#6B1530] selection:text-white">
      <Header />
      
      <main className="pt-20">
        {/* ─── HERO SECTION ─── */}
        <section style={{ 
          background: GRADIENTS.HERO_BG,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Anchor content to bottom
          alignItems: 'flex-start',
          paddingLeft: '2.5em',
          paddingRight: '2em',
          paddingBottom: '3em',
          paddingTop: '0em',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle glow */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '20%', 
            width: '800px', 
            height: '400px', 
            background: 'radial-gradient(circle, rgba(43,196,182,0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ maxWidth: '720px', position: 'relative', zIndex: 10 }}
          >
            <h1 style={{ 
              ...TYPOGRAPHY.heroTitle,
              fontFamily: TYPOGRAPHY.fontHeading,
              color: COLORS.textOnDark,
              marginBottom: '28px'
            }}>
              Security <span style={{ color: COLORS.teal }}>Platforms</span> & Ecosystem
            </h1>
            <p style={{ 
              ...TYPOGRAPHY.bodyLarge,
              color: 'rgba(255,255,255,0.76)', 
              textAlign: 'justify',
              maxWidth: '100%', 
              marginBottom: '42px',
            }}>
              QuasarCyberTech combines cybersecurity consulting expertise with platform innovation — delivering continuous visibility, accelerated remediation, and intelligence-driven security operations for the modern enterprise.
            </p>
          </motion.div>
        </section>

        {/* ─── PLATFORM 01: QStellar ─── */}
        <section style={{ 
          background: '#0B1F3B', 
          minHeight: '480px', 
          display: 'flex', 
          borderTop: '1px solid rgba(43,196,182,0.1)',
          flexWrap: 'wrap'
        }}>
          {/* Text Column */}
          <div style={{ flex: '1 1 500px', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              color: 'rgba(43,196,182,0.6)', 
              letterSpacing: '0.2em',
              marginBottom: '12px',
              fontWeight: 700
            }}>01</span>
            
            <img src={qStellarLogo} alt="QStellar" style={{ height: '48px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', lineHeight: 1.3 }}>
              AI-Powered Asset Intelligence & <br/>Vulnerability Management
            </h2>
            
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QStellar gives security teams continuous visibility into their asset landscape — automatically discovering, prioritizing, and tracking vulnerabilities with AI-assisted intelligence. Move from point-in-time snapshots to always-on risk awareness.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '40px', maxWidth: '500px' }}>
              {['Asset Discovery', 'Vulnerability Prioritization', 'Risk-Based Intelligence', 'AI-Assisted Visibility'].map(chip => (
                <div key={chip} style={{ 
                  background: 'rgba(43,196,182,0.1)', 
                  border: '1px solid rgba(43,196,182,0.25)', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500
                }}>
                  {chip}
                </div>
              ))}
            </div>

            <a href="https://qstellar.co" target="_blank" rel="noopener noreferrer" style={{
              background: '#6B1530',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              width: 'fit-content',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#8B1E3F'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B1530'}
            >
              Visit QStellar Website <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>

          {/* Visual Column */}
          <div style={{ flex: '1 1 500px', background: '#081428', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              width: '100%',
              maxWidth: '520px',
              aspectRatio: '16/10',
              background: 'linear-gradient(135deg, #0d1f35 0%, #071428 100%)',
              border: '1px solid rgba(43,196,182,0.15)',
              borderTop: '3px solid #D6B05C',
              borderRadius: '0 0 12px 12px',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              padding: '40px'
            }}>
              {/* Abstract Node Map */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                 {/* CSS Dots & Lines */}
                 <div style={{ position: 'absolute', top: '20%', left: '15%', width: '8px', height: '8px', background: '#2BC4B6', borderRadius: '50%', boxShadow: '0 0 10px #2BC4B6' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '25%', width: '10px', height: '10px', background: '#D6B05C', borderRadius: '50%', boxShadow: '0 0 12px #D6B05C' }} />
                  <div style={{ position: 'absolute', top: '70%', left: '20%', width: '8px', height: '8px', background: '#2BC4B6', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', top: '35%', left: '50%', width: '12px', height: '12px', background: '#2BC4B6', borderRadius: '50%', boxShadow: '0 0 15px #2BC4B6' }} />
                  <div style={{ position: 'absolute', top: '65%', left: '60%', width: '8px', height: '8px', background: '#D6B05C', borderRadius: '50%', boxShadow: '0 0 10px #D6B05C' }} />
                  <div style={{ position: 'absolute', top: '20%', left: '80%', width: '8px', height: '8px', background: '#2BC4B6', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', top: '55%', left: '85%', width: '8px', height: '8px', background: '#2BC4B6', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', top: '30%', left: '35%', width: '6px', height: '6px', background: '#2BC4B6', borderRadius: '50%', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', top: '60%', left: '40%', width: '6px', height: '6px', background: '#2BC4B6', borderRadius: '50%', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', top: '15%', left: '65%', width: '6px', height: '6px', background: '#D6B05C', borderRadius: '50%', opacity: 0.4 }} />
                  <div style={{ position: 'absolute', top: '80%', left: '75%', width: '6px', height: '6px', background: '#2BC4B6', borderRadius: '50%', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', top: '40%', left: '70%', width: '7px', height: '7px', background: '#2BC4B6', borderRadius: '50%', opacity: 0.5 }} />
                  <div style={{ position: 'absolute', top: '50%', left: '10%', width: '6px', height: '6px', background: '#D6B05C', borderRadius: '50%', opacity: 0.4 }} />
                  
                  {/* Lines */}
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2 }}>
                    <line x1="15%" y1="20%" x2="25%" y2="45%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="25%" y1="45%" x2="50%" y2="35%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="50%" y1="35%" x2="80%" y2="20%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="50%" y1="35%" x2="60%" y2="65%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="60%" y1="65%" x2="85%" y2="55%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="25%" y1="45%" x2="20%" y2="70%" stroke="#2BC4B6" strokeWidth="1" />
                    <line x1="15%" y1="20%" x2="35%" y2="30%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="35%" y1="30%" x2="50%" y2="35%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="20%" y1="70%" x2="40%" y2="60%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="40%" y1="60%" x2="60%" y2="65%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="50%" y1="35%" x2="65%" y2="15%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="65%" y1="15%" x2="80%" y2="20%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="60%" y1="65%" x2="70%" y2="40%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="70%" y1="40%" x2="85%" y2="55%" stroke="#2BC4B6" strokeWidth="0.5" />
                    <line x1="10%" y1="50%" x2="25%" y2="45%" stroke="#2BC4B6" strokeWidth="0.5" />
                  </svg>

                 <div style={{ position: 'absolute', bottom: '-10px', left: '0', fontFamily: 'monospace', fontSize: '0.65rem', color: 'rgba(43,196,182,0.4)', letterSpacing: '0.1em' }}>
                   ASSET INTELLIGENCE NETWORK // LIVE MAP
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PLATFORM 02: QPulse (FLIPPED) ─── */}
        <section style={{ 
          background: '#F5F7FA', 
          minHeight: '480px', 
          display: 'flex', 
          flexWrap: 'wrap-reverse',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Diagonal Texture */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(43,196,182,0.035) 0px, rgba(43,196,182,0.035) 1px, transparent 1px, transparent 56px)',
            pointerEvents: 'none'
          }} />

          {/* Visual Column */}
          <div style={{ flex: '1 1 500px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px', position: 'relative' }}>
            <div style={{
              width: '100%',
              maxWidth: '520px',
              aspectRatio: '16/10',
              background: '#0B1F3B',
              border: '1px solid rgba(43,196,182,0.1)',
              borderTop: '3px solid #2BC4B6',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 30px 60px rgba(11,31,59,0.25)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {[
                { cve: 'CVE-2024-3829', title: 'Critical Zero-Day Exploit in Enterprise Gateway', date: 'Mar 18' },
                { cve: 'INTEL-RPT-08', title: 'Ransomware Group "Luminance" Targeting Financial Hubs', date: 'Mar 15' },
                { cve: 'TECH-FOCUS', title: 'Advanced Behavioral Detection Patterns for LLM Apps', date: 'Mar 12' }
              ].map((row, i) => (
                <div key={i} style={{ 
                  borderLeft: '3px solid #2BC4B6', 
                  paddingLeft: '16px', 
                  paddingBottom: '16px', 
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#2BC4B6', fontWeight: 700 }}>{row.cve}</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{row.date}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, margin: 0 }}>{row.title}</h4>
                </div>
              ))}
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>THREAT INTELLIGENCE FEED // UPDATED HOURLY</span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div style={{ flex: '1 1 500px', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              color: 'rgba(11,31,59,0.4)', 
              letterSpacing: '0.2em',
              marginBottom: '12px',
              fontWeight: 700
            }}>02</span>
            
            <img src={qPulseLogo} alt="QPulse" style={{ height: '42px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: '#0B1F3B', lineHeight: 1.3 }}>
              Cybersecurity Intelligence & <br/>Insights Portal
            </h2>
            
            <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QPulse delivers curated cybersecurity intelligence, threat landscape updates, and security research to enterprise teams and practitioners. Stay ahead of emerging threats with analyst-grade insights from the QuasarCyberTech ecosystem.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '40px', maxWidth: '500px' }}>
              {['Threat Intelligence', 'CVE Analysis', 'Security Research', 'Industry Updates'].map(chip => (
                <div key={chip} style={{ 
                  background: 'rgba(11,31,59,0.08)', 
                  border: '1px solid rgba(11,31,59,0.15)', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  color: '#0B1F3B',
                  fontWeight: 600
                }}>
                  {chip}
                </div>
              ))}
            </div>

            <a href="https://qpulse.quasarcybertech.com" target="_blank" rel="noopener noreferrer" style={{
              background: '#6B1530',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              width: 'fit-content',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(107,21,48,0.2)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#8B1E3F'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B1530'}
            >
              Explore QPulse Portal <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>
        </section>

        {/* ─── PLATFORM 03: QRGT ─── */}
        <section style={{ 
          background: '#040B1D', 
          minHeight: '480px', 
          display: 'flex', 
          borderTop: '1px solid rgba(107,21,48,0.1)',
          flexWrap: 'wrap'
        }}>
          {/* Text Column */}
          <div style={{ flex: '1 1 500px', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.75rem', 
              color: 'rgba(107,21,48,0.6)', 
              letterSpacing: '0.2em',
              marginBottom: '12px',
              fontWeight: 700
            }}>03</span>
            
            <img src={qrgtLogo} alt="QRGT" style={{ height: '42px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '24px' }} />
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', lineHeight: 1.3 }}>
              Penetration Testing as a Service <br/>(PTaaS) Platform
            </h2>
            
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '540px' }}>
              QRGT transforms traditional penetration testing into a continuous, governed program. Track findings, manage remediation workflows, and maintain complete visibility into your application security posture — all in one platform.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '40px', maxWidth: '500px' }}>
              {['Continuous Testing', 'Governed Remediation', 'Risk & Findings Management', 'Lifecycle-Driven AppSec'].map(chip => (
                <div key={chip} style={{ 
                  background: 'rgba(107,21,48,0.1)', 
                  border: '1px solid rgba(107,21,48,0.3)', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500
                }}>
                  {chip}
                </div>
              ))}
            </div>

            <a href="/platforms/qrgt" style={{
              background: '#6B1530',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              width: 'fit-content',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#8B1E3F'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B1530'}
            >
              Explore QRGT Platform <ArrowRight size={18} style={{ marginLeft: '10px' }} />
            </a>
          </div>

          {/* Visual Column */}
          <div style={{ flex: '1 1 500px', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
             <div style={{
              width: '100%',
              maxWidth: '520px',
              aspectRatio: '16/10',
              background: 'linear-gradient(135deg, #0d1f35, #1a0a14)',
              border: '1px solid rgba(107,21,48,0.25)',
              borderTop: '3px solid #6B1530',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Active Findings</span>
                <span style={{ fontSize: '0.75rem', color: COLORS.teal, fontFamily: 'monospace' }}>PTAAS-ID: QX-99</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { sev: 'CRITICAL', title: 'SQL Injection — /api/v1/users', color: '#fc8181', bg: 'rgba(220,38,38,0.15)' },
                  { sev: 'HIGH', title: 'Broken Authentication — /admin/login', color: '#fdba74', bg: 'rgba(234,88,12,0.15)' },
                  { sev: 'MEDIUM', title: 'CORS Resource Sharing Misconfig', color: '#fde68a', bg: 'rgba(202,138,4,0.15)' }
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ 
                      fontSize: '0.6rem', 
                      fontWeight: 800, 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      background: row.bg, 
                      color: row.color,
                      border: `1px solid ${row.color}33`
                    }}>{row.sev}</div>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>{row.title}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', textAlign: 'center', paddingBottom: '4px' }}>
                <span style={{ fontSize: '0.65rem', color: '#2BC4B6', opacity: 0.6, fontFamily: 'monospace', letterSpacing: '0.1em' }}>LIVE FINDINGS DASHBOARD // ACTIVE SCAN: 88%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QLEAP ECOSYSTEM BANNER ─── */}
        <section style={{ background: '#6B1530', padding: '60px 20px' }}>
           <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
              <div style={{ flex: '1 1 500px' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                  <span style={{ color: '#D6B05C' }}>QLeap</span> — Cybersecurity Training & Talent
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6 }}>
                  SOC analyst training, certifications, and enterprise cybersecurity workforce development. Building the next generation of cybersecurity practitioners through immersive, real-world simulations.
                </p>
              </div>
              <a href="https://qleap-ed.com" target="_blank" rel="noopener noreferrer" style={{
                padding: '14px 28px',
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.8)',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#6B1530';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              >
                Visit QLeap Platform <ExternalLink size={18} style={{ marginLeft: '10px', display: 'inline' }} />
              </a>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
