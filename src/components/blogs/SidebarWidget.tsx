import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';
import { COLORS } from '../../config/themeConfig';
import { BLOG_CATEGORIES } from '../../data/blogsData';
import type { BlogPost } from '../../data/blogsData';
import { ASSETS } from '@/constants/assets';

const GOLD = COLORS.gold;
const CARD_DARK = 'rgba(255,255,255,0.04)';
const BORDER_SUBTLE = '1px solid rgba(255,255,255,0.08)';

interface SidebarProps {
  latestPosts: BlogPost[];
  categoryCounts: Record<string, number>;
  allTags: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
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
  categoryCounts,
  allTags,
  activeCategory,
  setActiveCategory,
  subscribeEmail,
  setSubscribeEmail,
  subscribeSuccess,
  handleSubscribe,
}: SidebarProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* ── Widget 1: Latest Posts ─────────────────────────── */}
      <div style={widgetCard}>
        <div style={widgetLabelStyle}>Latest Posts</div>
        <div>
          {latestPosts.map((post, i) => {
            const err = imgErrors[post.id];
            const isHov = hoveredPost === post.id;
            return (
              <Link
                key={post.id}
                to={`/blogs/${post.id}`}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: i < latestPosts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {!err && post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    onError={() => setImgErrors(p => ({ ...p, [post.id]: true }))}
                    style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: '56px', height: '56px', borderRadius: '6px', background: 'rgba(56,8,26,0.6)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={ASSETS.logos.qct.icon} alt="" style={{ width: '24px', opacity: 0.2, filter: 'brightness(0) invert(1)' }} />
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isHov ? GOLD : '#FFFFFF',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'color 0.2s ease',
                    marginBottom: '4px',
                  }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{post.date}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Widget 2: Categories ───────────────────────────── */}
      <div style={widgetCard}>
        <div style={widgetLabelStyle}>Categories</div>
        <div>
          {BLOG_CATEGORIES.filter(c => c !== 'All Posts').map(cat => {
            const isActive = activeCategory === cat;
            return (
              <CategoryRow
                key={cat}
                cat={cat}
                count={categoryCounts[cat] ?? 0}
                isActive={isActive}
                onClick={() => setActiveCategory(cat)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Widget 3: Tags ─────────────────────────────────── */}
      <div style={widgetCard}>
        <div style={widgetLabelStyle}>Tags</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allTags.map(tag => {
            const isHov = hoveredTag === tag;
            return (
              <span
                key={tag}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: isHov ? `1px solid ${GOLD}` : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  color: isHov ? GOLD : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>

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
              style={{ width: 'auto', height: '1em', objectFit: 'contain' }}
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

// ── CategoryRow sub-component ────────────────────────────────────────────────
function CategoryRow({ cat, count, isActive, onClick }: { cat: string; count: number; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '9px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        borderLeft: isActive ? `3px solid ${GOLD}` : '3px solid transparent',
        background: hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        marginBottom: '2px',
        transition: 'all 0.18s ease',
      }}
    >
      <span style={{ fontSize: '14px', color: isActive || hov ? GOLD : '#FFFFFF', transition: 'color 0.18s ease', fontWeight: isActive ? 600 : 400 }}>
        {cat}
      </span>
      <span style={{ fontSize: '12px', color: GOLD, fontWeight: 600 }}>({count})</span>
    </div>
  );
}
