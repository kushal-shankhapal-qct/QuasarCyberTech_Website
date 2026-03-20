import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../config/themeConfig';

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

  return (
    <div className="service-area-panel" style={{ marginTop: '64px' }}>
      {/* ─── DESKTOP VIEW ─── */}
      <div className="hidden md:flex" style={{ display: 'flex', minHeight: '520px', borderRadius: '16px', overflow: 'hidden', background: '#0B1F3B', border: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Left Panel (35%) */}
        <div style={{ flex: '0 0 35%', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
          {services.map((svc, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              style={{
                padding: '24px 32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                borderLeft: activeIndex === i ? `4px solid ${COLORS.burgundy}` : '4px solid transparent',
                background: activeIndex === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                opacity: activeIndex === i ? 1 : 0.5,
              }}
              onMouseOver={(e) => { if (activeIndex !== i) e.currentTarget.style.opacity = '1'; }}
              onMouseOut={(e) => { if (activeIndex !== i) e.currentTarget.style.opacity = '0.5'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: COLORS.teal, fontSize: '14px', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading }}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600 }}>
                  {svc.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel (65%) */}
        <div style={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {/* Service Image */}
              <div style={{ height: '260px', width: '100%', background: '#1a2f4a', overflow: 'hidden' }}>
                {services[activeIndex].image ? (
                  <img 
                    src={services[activeIndex].image} 
                    alt={services[activeIndex].name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : null}
              </div>

              {/* Service Details */}
              <div style={{ padding: '48px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 800, marginBottom: '20px', fontFamily: TYPOGRAPHY.fontHeading }}>
                  {services[activeIndex].name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '500px' }}>
                  {services[activeIndex].description}
                </p>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: COLORS.teal, fontWeight: 700, textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Talk to an Expert <ArrowRight size={16} />
                </Link>
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
                        <img src={svc.image} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
