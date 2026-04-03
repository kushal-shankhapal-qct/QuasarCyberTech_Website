import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArticleCard from '../../components/blogs/ArticleCard';
import BlogSidebar from '../../components/blogs/SidebarWidget';
import PageHero from '../../components/PageHero';
import Seo from '../../components/seo/Seo';
import { blogsData, BLOG_CATEGORIES } from '../../data/blogsData';
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
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [subscribeName, setSubscribeName] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Refs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Data
  const featuredPost = blogsData.find(p => p.featured) ?? blogsData[0];

  // Scroll to top
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

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
  const filtered = blogsData.filter(p => {
    const matchCat = activeCategory === 'All Posts' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const latestPosts = [...blogsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  // Category counts
  const handleSubscribe = () => {
    if (!subscribeEmail) return;
    setSubscribeSuccess(true);
    setTimeout(() => setSubscribeSuccess(false), 4000);
    setSubscribeName('');
    setSubscribeEmail('');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo
        title="Cybersecurity Blog, Threat Research & Insights"
        description="Read QuasarCyberTech research on cyber threats, vulnerability intelligence, defensive engineering, cloud security, and incident response."
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
          imageOpacity={0.7}
          visualWidth="58%"
          maskStart="0%"
          maskEnd="80%"
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
            <div style={{
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
              <BlogSidebar
                latestPosts={latestPosts}
                subscribeName={subscribeName}
                setSubscribeName={setSubscribeName}
                subscribeEmail={subscribeEmail}
                setSubscribeEmail={setSubscribeEmail}
                subscribeSuccess={subscribeSuccess}
                handleSubscribe={handleSubscribe}
              />
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

function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    setEmail('');
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
          gap: '16px'
        }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '16px',
              color: '#FFFFFF',
              fontSize: '15px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              background: success ? '#2A5A3A' : COLORS.burgundy,
              color: '#FFFFFF',
              padding: '16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              border: 'none',
              transition: 'background 0.3s ease',
            }}
          >
            {success ? '✓ Subscription Active' : 'Join the Network'}
          </button>
        </div>
      </div>
    </section>
  );
}
