import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

interface Service {
  name: string;
  description: string;
  image?: string;
}

interface ServiceAreaPanelProps {
  services: Service[];
}

const ServiceAreaPanel: React.FC<ServiceAreaPanelProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  const toggleMobile = (index: number) => {
    setExpandedMobile(expandedMobile === index ? null : index);
  };

  // Logic to handle specific description override for Strategy Consulting
  const getDisplayDescription = (svc: Service) => {
    if (svc.name === "Cybersecurity Strategy Consulting") {
      return "Building multi-year security roadmaps aligned with your business growth objectives. We work with leadership teams to define risk tolerance, prioritize investments, and establish a governance structure that scales with your organization.";
    }
    return svc.description;
  };

  return (
    <div className="service-area-panel">
      {/* ─── DESKTOP VIEW ─── */}
      <div className="hidden md:flex" style={{ 
        display: 'flex', 
        alignItems: 'stretch', 
        minHeight: '520px', 
        borderRadius: '4px', 
        overflow: 'hidden', 
        border: '1px solid rgba(43,196,182,0.15)',
        background: '#040B1D',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left Panel (Service List) */}
        <div style={{ 
          flex: '0 0 35%', 
          borderRight: '1px solid rgba(43,196,182,0.12)', 
          padding: 0 
        }}>
          {services.map((svc, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              style={{
                minHeight: '72px', 
                padding: '20px 28px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                background: activeIndex === i ? 'rgba(43,196,182,0.06)' : 'transparent',
                borderLeft: activeIndex === i ? '3px solid #6B1530' : '3px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                position: 'relative'
              }}
              onMouseOver={(e) => { 
                if (activeIndex !== i) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  const nameEl = e.currentTarget.querySelector('.service-name') as HTMLSpanElement;
                  if (nameEl) nameEl.style.color = 'rgba(255,255,255,0.80)';
                }
              }}
              onMouseOut={(e) => { 
                if (activeIndex !== i) {
                  e.currentTarget.style.background = 'transparent';
                  const nameEl = e.currentTarget.querySelector('.service-name') as HTMLSpanElement;
                  if (nameEl) nameEl.style.color = 'rgba(255,255,255,0.50)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ 
                  color: activeIndex === i ? '#D6B05C' : 'rgba(214, 176, 92, 0.45)', 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  fontFamily: 'monospace',
                  minWidth: '28px'
                }}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span 
                  className="service-name"
                  style={{ 
                    color: activeIndex === i ? '#ffffff' : 'rgba(255,255,255,0.50)', 
                    fontSize: '1rem', 
                    fontWeight: activeIndex === i ? 600 : 500,
                    transition: 'color 0.2s ease'
                  }}
                >
                  {svc.name}
                </span>
              </div>
              {activeIndex === i && <ArrowRight size={14} color="#D6B05C" />}
            </div>
          ))}
        </div>

        {/* Right Panel (Detail View) */}
        <div style={{ flex: '0 0 65%', position: 'relative', display: 'flex', flexDirection: 'column', background: '#0d2137' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              {/* Image Area */}
              <div style={{ height: '300px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #0d1f35 0%, #1a0a14 100%)',
                  zIndex: 0
                }} />
                {services[activeIndex].image && (
                  <img 
                    src={services[activeIndex].image} 
                    alt={`QuasarCyberTech | ${services[activeIndex].name}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', position: 'relative', zIndex: 1 }}
                  />
                )}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  height: '30%',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(13, 33, 55, 0.6) 100%)',
                  zIndex: 2
                }} />
              </div>

              {/* Text Area (Left Aligned) */}
              <div style={{ padding: '32px 36px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700, marginBottom: '14px', fontFamily: TYPOGRAPHY.fontHeading }}>
                  {services[activeIndex].name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '24px', textAlign: 'left' }}>
                  {getDisplayDescription(services[activeIndex])}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <Link 
                    to="/contact" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      color: '#D6B05C', 
                      fontWeight: 700, 
                      textDecoration: 'none', 
                      fontSize: '0.78rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.transform = 'translateX(0)';
                    }}
                  >
                    TALK TO AN EXPERT <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── MOBILE VIEW (Accordion) ─── */}
      <div className="md:hidden" style={{ display: 'none' }}> {/* This will be shown via media queries or conditional rendering if needed, but I'll use inline responsive logic */}
        {/* Simple inline mobile check or just provide both */}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          .hidden.md\\:flex { display: none !important; }
          .md\\:hidden { display: block !important; }
        }
        @media (min-width: 768px) {
          .md\\:hidden { display: none !important; }
        }
      `}} />

      <div className="md:hidden" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
        {services.map((svc, i) => (
          <div key={i} style={{ borderBottom: i === services.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)', background: '#0B1F3B' }}>
            <button
              onClick={() => toggleMobile(i)}
              style={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: COLORS.teal, fontSize: '13px', fontWeight: 700 }}>{(i+1).toString().padStart(2, '0')}</span>
                <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600 }}>{svc.name}</span>
              </div>
              <ChevronDown size={18} color="#FFFFFF" style={{ transform: expandedMobile === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
            </button>
            <AnimatePresence>
              {expandedMobile === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 20px 24px', color: 'rgba(255,255,255,0.7)' }}>
                    {svc.image && (
                      <div style={{ height: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                        <img src={svc.image} alt={`QuasarCyberTech | ${svc.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{svc.description}</p>
                    <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: COLORS.teal, fontWeight: 700, textDecoration: 'none', fontSize: '13px' }}>
                      Talk to an Expert <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAreaPanel;
