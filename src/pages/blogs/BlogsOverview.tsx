import React, { useEffect, useState, useRef, useCallback } from 'react';
import { encryptFormPayload } from '../../lib/formCrypto';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArticleCard from '../../components/blogs/ArticleCard';
import BlogSidebar from '../../components/blogs/SidebarWidget';
import PageHero from '../../components/PageHero';
import Seo from '../../components/seo/Seo';
import { blogsData, BLOG_CATEGORIES, type BlogPost } from '../../data/blogsData';
import { fetchBlogs } from '../../api/blogs';
import { COLORS, GRADIENTS } from '../../config/themeConfig';
import { ASSETS } from '@/constants/assets';
import { createBreadcrumbSchema } from '../../seo/schema';

// ─── Design tokens ───────────────────────────────────────────────────────────
const DARK_BG = '#000112';
const GOLD = COLORS.gold;
const BLOGS_DESKTOP_SIDE_MARGIN = '3rem';

export default function BlogsOverview() {
  // State
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>(blogsData); // static seed → replaced on mount
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Refs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Data
  const featuredPost = posts.find(p => p.featured) ?? posts[0];

  // Scroll to top
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  // Live fetch — replaces static seed with API data on mount
  useEffect(() => {
    fetchBlogs().then(setPosts).catch(() => { /* static seed stays */ });
  }, []);

  // Initialize tag filter from URL query param (?tag=AI, ?tag=Zero+Trust, etc.)
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSearchQuery(tagParam);
      setInputValue(tagParam);
    }
  }, []);

  // Sticky filter bar detection
  useEffect(() => {
    const handleScroll = () => {
      const bar = filterBarRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      setIsFilterSticky(rect.top <= 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  const handleSearch = useCallback((value: string) => {
    setInputValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  // Filter logic
  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All Posts' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const latestPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo
        title="Cybersecurity Blog India — Threat Research, VAPT Insights & Security Trends 2026"
        description="Expert cybersecurity research from QuasarCyberTech — ransomware threats, penetration testing insights, zero trust architecture, cloud security, SOC operations, and the latest cyber attack trends in India."
        path="/blogs"
        image={featuredPost?.image || ASSETS.blogs.threats}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
          ]),
        ]}
      />
      <Navbar />

      <main>
        {/* ─── HERO SECTION ─── */}
        <PageHero
          title="Cybersecurity"
          highlight="Insights & Research"
          subtitle="Expert analysis on emerging threats, vulnerability research, defensive engineering patterns, and the future of enterprise cybersecurity."
          backgroundOverride={GRADIENTS.BLOGS_OVERVIEW_HERO_BG}
          breadcrumbPaths={['Home']}
          currentName="Cybersecurity Insights"
          visualVariant="standard"
          image={ASSETS.capabilities.intelligence}
          imageScale={1}
          imageRotate="0deg"
          imageOpacity={0.6}
          visualWidth="50%"
          maskStart="0%"
          imagePositionX="center"
          imagePositionY="center"
          imageBlendSoftness="100%"
          imageBlendStartPercent="0%"
          maskEnd="100%"
          scrollTargetId="blog-content"
          scrollButtonText="Browse Articles"
        />

        {/* ─── FILTER BAR ─── */}
        <div
          id="blog-content"
          ref={filterBarRef}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: isFilterSticky ? 'rgba(0,1,18,0.88)' : 'transparent',
            backdropFilter: isFilterSticky ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isFilterSticky ? 'blur(12px)' : 'none',
            borderBottom: isFilterSticky ? '1px solid rgba(255,255,255,0.06)' : 'none',
            transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
          }}
        >
          <div className="blogs-filter-inner" style={{ width: '100%', margin: '0 auto', padding: `20px ${BLOGS_DESKTOP_SIDE_MARGIN}` }}>
            <div 
              className="blogs-filter-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'nowrap',
              }}>
              {/* Search */}
              <div style={{ position: 'relative', width: '280px', flexShrink: 0 }}>
                <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={inputValue}
                  onChange={e => handleSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.06)',
                    border: searchFocused ? `1px solid ${GOLD}` : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '10px 16px 10px 40px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              {/* Category pills */}
              <div
                className="no-scrollbar"
                style={{
                  display: 'flex',
                  gap: '10px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                  flex: 1,
                  whiteSpace: 'nowrap' as const,
                  scrollbarWidth: 'none',
                }}>
                {BLOG_CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); }}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        border: isActive ? `1px solid ${GOLD}` : '1px solid rgba(255,255,255,0.1)',
                        background: isActive ? 'rgba(214,176,92,0.1)' : 'rgba(255,255,255,0.04)',
                        color: isActive ? GOLD : 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MAIN CONTENT ─── */}
        <section className="blogs-content-section" style={{ background: DARK_BG, padding: `48px ${BLOGS_DESKTOP_SIDE_MARGIN} 80px` }}>
          <div className="blogs-main-layout" style={{ width: '100%', margin: '0 auto', display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

            {/* LEFT: Article Grid */}
            <div style={{ flex: '1', minWidth: 0 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
                  No articles found in this category.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                  {filtered.map((post, i) => (
                    <ArticleCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <aside className="blogs-sidebar-wrap" style={{ flex: '0 0 320px', position: 'sticky', top: '100px' }}>
              <BlogSidebar latestPosts={latestPosts} />
            </aside>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterCTA />
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 64rem) {
              .blogs-filter-inner {
                padding-left: var(--page-padding-x) !important;
                padding-right: var(--page-padding-x) !important;
              }

              .blogs-filter-wrap {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 16px !important;
              }

              .blogs-filter-wrap > div:first-child {
                width: 100% !important;
              }

              .blogs-content-section {
                padding-left: var(--page-padding-x) !important;
                padding-right: var(--page-padding-x) !important;
              }

              .blogs-main-layout {
                flex-direction: column !important;
                gap: 2rem !important;
              }

              .blogs-sidebar-wrap {
                position: static !important;
                top: auto !important;
                width: 100% !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

function NewsletterCTA() {
  const [email,      setEmail]      = useState('');
  const [name,       setName]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState('');

  const handleSubmit = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) { setError('Please enter your email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) { setError('Enter a valid email address.'); return; }

    setError('');
    setSubmitting(true);

    let envelope: ReturnType<typeof encryptFormPayload>;
    try {
      envelope = encryptFormPayload({
        email:  trimmedEmail,
        name:   name.trim() || undefined,
        source: 'overview',
      });
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
      setName('');
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
    <section style={{
      background: GRADIENTS.BLOGS_OVERVIEW_NEWSLETTER_BG,
      padding: '100px 3rem',
    }}>
      <div style={{
        width: '100%',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '80px',
        alignItems: 'center'
      }}>
        {/* Left Content */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', marginBottom: '16px' }}>
            Stay Informed
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '24px' }}>
            Cybersecurity Insights,<br />
            <span style={{ color: GOLD }}>Delivered to Your Inbox.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Expert threat analysis monthly', 'Zero spam commitment', 'One-click unsubscribe'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: GOLD }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {success ? (
            <div style={{
              background:   'rgba(42,90,58,0.35)',
              border:       '1px solid rgba(42,90,58,0.6)',
              borderRadius: '10px',
              padding:      '24px',
              textAlign:    'center',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✓</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#6EE7A0', marginBottom: '6px' }}>You're subscribed!</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Check your inbox for a welcome email.</div>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={submitting}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                  padding: '14px 16px', color: '#FFFFFF', fontSize: '15px', outline: 'none',
                  opacity: submitting ? 0.6 : 1,
                }}
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                disabled={submitting}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px', padding: '14px 16px', color: '#FFFFFF',
                  fontSize: '15px', outline: 'none', opacity: submitting ? 0.6 : 1,
                }}
              />
              {error && (
                <p style={{ fontSize: '13px', color: 'rgba(239,68,68,0.85)', marginTop: '-4px' }}>{error}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  background:    COLORS.burgundy,
                  color:         '#FFFFFF',
                  padding:       '16px',
                  borderRadius:  '8px',
                  fontWeight:    700,
                  fontSize:      '15px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor:        submitting ? 'not-allowed' : 'pointer',
                  border:        'none',
                  transition:    'background 0.3s ease',
                  opacity:       submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Subscribing…' : 'Join the Network'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
