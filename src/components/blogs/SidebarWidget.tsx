import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';
import { COLORS } from '../../config/themeConfig';
import type { BlogPost } from '../../data/blogsData';
import { ASSETS } from '@/constants/assets';
import { encryptFormPayload } from '../../lib/formCrypto';

const GOLD         = COLORS.gold;
const CARD_DARK    = 'rgba(255,255,255,0.04)';
const BORDER_SUBTLE = '1px solid rgba(255,255,255,0.08)';
const API_BASE_URL  = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

interface SidebarProps {
  latestPosts: BlogPost[];
}

const widgetCard: React.CSSProperties = {
  background:   CARD_DARK,
  border:       BORDER_SUBTLE,
  borderRadius: '10px',
  padding:      '20px',
  marginBottom: '20px',
};

function SidebarNewsletter() {
  const [email,       setEmail]       = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState('');

  const handleSubscribe = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setError('Please enter your email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) { setError('Enter a valid email address.'); return; }

    setError('');
    setSubmitting(true);

    let envelope: ReturnType<typeof encryptFormPayload>;
    try {
      envelope = encryptFormPayload({ email: trimmed, source: 'sidebar' });
    } catch {
      setError('Security initialisation failed. Please refresh and try again.');
      setSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timer      = window.setTimeout(() => controller.abort(), 12000);

    try {
      const res  = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(envelope),
        signal:  controller.signal,
      });
      const json = await res.json().catch(() => ({})) as { success?: boolean; error?: string };

      if (!res.ok || !json.success) throw new Error(json.error ?? `Error ${res.status}`);

      setSuccess(true);
      setEmail('');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      }
    } finally {
      window.clearTimeout(timer);
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      ...widgetCard,
      background: 'linear-gradient(135deg, rgba(56,8,26,0.7), rgba(0,1,18,0.9))',
      border:     '1px solid rgba(201,168,76,0.2)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <Mail size={22} style={{ color: GOLD, marginBottom: '10px', display: 'block', margin: '0 auto 10px' }} />
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Stay Ahead of Threats</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
          Get the latest security insights delivered monthly.
        </div>
      </div>

      {success ? (
        <div style={{
          background:   'rgba(42,90,58,0.4)',
          border:       '1px solid rgba(42,90,58,0.7)',
          borderRadius: '7px',
          padding:      '12px',
          textAlign:    'center',
          fontSize:     '13px',
          fontWeight:   600,
          color:        '#6EE7A0',
        }}>
          ✓ Subscribed! Check your inbox.
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
            disabled={submitting}
            style={{
              width:        '100%',
              background:   'rgba(255,255,255,0.06)',
              border:       `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '7px',
              padding:      '10px 14px',
              color:        '#FFFFFF',
              fontSize:     '13px',
              outline:      'none',
              boxSizing:    'border-box',
              marginBottom: error ? '6px' : '10px',
              opacity:      submitting ? 0.6 : 1,
            }}
          />
          {error && (
            <p style={{ fontSize: '11px', color: 'rgba(239,68,68,0.9)', marginBottom: '10px', lineHeight: 1.4 }}>{error}</p>
          )}
          <button
            onClick={handleSubscribe}
            disabled={submitting}
            style={{
              width:        '100%',
              background:   COLORS.burgundy,
              color:        '#FFFFFF',
              textAlign:    'center',
              padding:      '11px',
              borderRadius: '7px',
              fontWeight:   600,
              fontSize:     '14px',
              cursor:       submitting ? 'not-allowed' : 'pointer',
              transition:   'background 0.3s ease',
              border:       'none',
              opacity:      submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </>
      )}
    </div>
  );
}

export default function BlogSidebar({ latestPosts: _latestPosts }: SidebarProps) {
  return (
    <div>
      {/* ── Newsletter widget ─────────────────────────────── */}
      <SidebarNewsletter />

      {/* ── QPulse Promo ──────────────────────────────────── */}
      <div style={{ ...widgetCard, border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(214,176,92,0.03)' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <img
            src={ASSETS.logos.platforms.qpulseLight}
            alt="QuasarCyberTech | QPulse Platform"
            style={{ width: '128px', height: 'auto', maxWidth: '128px', flexShrink: 0, objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
              Live Threat Intelligence
            </div>
            <a
              href="https://qpulse.quasarcybertech.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '13px', color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}
            >
              Visit QPulse Portal <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
