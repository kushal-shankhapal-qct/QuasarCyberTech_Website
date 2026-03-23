import React, { useState, useEffect } from 'react';
import { useDevToggles, type CapabilitiesHeroVariant, type CardHoverVariant } from '../devToggles';

export default function DevTogglePanel() {
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { toggles, updateToggle } = useDevToggles();

  useEffect(() => {
    setIsLocalhost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }, []);

  if (!isLocalhost) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#1C0D14',
          border: '1px solid rgba(214,176,92,0.4)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        ⚙
      </button>
    );
  }

  const renderButton = (label: string, value: string, currentVal: string, onChange: (val: any) => void) => {
    const active = value === currentVal;
    return (
      <button
        onClick={() => onChange(value)}
        style={{
          background: active ? '#6B1530' : 'transparent',
          color: active ? 'white' : 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '4px',
          padding: '3px 8px',
          fontSize: '10px',
          fontFamily: 'monospace',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      background: '#1C0D14',
      border: '1px solid rgba(214,176,92,0.4)',
      borderRadius: '8px',
      padding: '12px 16px',
      fontFamily: 'monospace',
      fontSize: '11px',
      color: 'rgba(255,255,255,0.7)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      minWidth: '200px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#D6B05C', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
          DEV TOGGLES
        </span>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
        >
          ×
        </button>
      </div>
      
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }} />

      <div style={{ marginBottom: '12px' }}>
        <div style={{ marginBottom: '6px', opacity: 0.8 }}>HERO VARIANT (Capabilities)</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {renderButton('Orbital', 'orbital', toggles.capabilitiesHeroVariant, (v: CapabilitiesHeroVariant) => updateToggle('capabilitiesHeroVariant', v))}
          {renderButton('Staggered', 'staggered', toggles.capabilitiesHeroVariant, (v: CapabilitiesHeroVariant) => updateToggle('capabilitiesHeroVariant', v))}
          {renderButton('Vortex', 'vortex', toggles.capabilitiesHeroVariant, (v: CapabilitiesHeroVariant) => updateToggle('capabilitiesHeroVariant', v))}
        </div>
      </div>

      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }} />

      <div>
        <div style={{ marginBottom: '6px', opacity: 0.8 }}>CARD HOVER VARIANT</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {renderButton('Flip', 'flip', toggles.cardHoverVariant, (v: CardHoverVariant) => updateToggle('cardHoverVariant', v))}
          {renderButton('Slide Up', 'slideup', toggles.cardHoverVariant, (v: CardHoverVariant) => updateToggle('cardHoverVariant', v))}
        </div>
      </div>
    </div>
  );
}
