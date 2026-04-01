import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';
import { COLORS } from '../../config/themeConfig';
import type { BlogPost } from '../../data/blogsData';
import { ASSETS } from '@/constants/assets';

const GOLD = COLORS.gold;
const CARD_DARK = 'rgba(255,255,255,0.04)';
const BORDER_SUBTLE = '1px solid rgba(255,255,255,0.08)';

interface SidebarProps {
  latestPosts: BlogPost[];
  subscribeName: string;
  setSubscribeName: (v: string) => void;
  subscribeEmail: string;
  setSubscribeEmail: (v: string) => void;
  subscribeSuccess: boolean;
  handleSubscribe: () => void;
}

const widgetCard: React.CSSProperties = {
  background: CARD_DARK,
  border: BORDER_SUBTLE,
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
};

const widgetLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: GOLD,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '16px',
};

export default function BlogSidebar({
  latestPosts,
  subscribeEmail,
  setSubscribeEmail,
  subscribeSuccess,
  handleSubscribe,
}: SidebarProps) {
  const [imgErrors] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* Latest posts, categories, and tags intentionally removed from sidebar
          because those are already represented in the main blogs area. */}

      {/* ── Widget 4: Newsletter ───────────────────────────── */}
      <div style={{
        ...widgetCard,
        background: 'linear-gradient(135deg, rgba(56,8,26,0.7), rgba(0,1,18,0.9))',
        border: '1px solid rgba(201,168,76,0.2)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <Mail size={22} style={{ color: GOLD, marginBottom: '10px', display: 'block', margin: '0 auto 10px' }} />
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Stay Ahead of Threats</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            Get the latest security insights delivered weekly.
          </div>
        </div>
        <input
          type="email"
          placeholder="Your Email Address"
          value={subscribeEmail}
          onChange={e => setSubscribeEmail(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '7px',
            padding: '10px 14px',
            color: '#FFFFFF',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: '10px',
          }}
        />
        <div
          onClick={handleSubscribe}
          style={{
            background: subscribeSuccess ? '#2A5A3A' : COLORS.burgundy,
            color: '#FFFFFF',
            textAlign: 'center',
            padding: '11px',
            borderRadius: '7px',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            userSelect: 'none',
          }}
        >
          {subscribeSuccess ? '✓ Subscribed!' : 'Subscribe'}
        </div>
      </div>

      {/* ── Widget 5: QPulse Promo ─────────────────────────── */}
      <div style={{ ...widgetCard, border: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            flexShrink: 0,
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0)'
          }}>
            <img
              src={ASSETS.logos.platforms.qpulseLight}
              alt="QPulse"
              style={{ width: 'auto', height: '1.6em', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
              Live Threat Intelligence
            </div>
            <Link
              to="/platforms"
              style={{ fontSize: '13px', color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}
            >
              Visit QPulse Portal <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
