import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Assets
import { ASSETS } from '@/constants/assets';

// Config — single source of truth
import { NAVBAR_CONFIG as NC, COLORS, TYPOGRAPHY } from '../config/themeConfig';
import { navigationConfig } from '../config/navigationConfig';

// ─── Types ──────────────────────────────────────────────────────────────────
type SubItem = {
  label: string;
  href: string;
  desc?: string;
  isExternal?: boolean;
  icon?: string;
  LucideIcon?: any;
};

type NavMenu = {
  id: string;
  label: string;
  href: string;
  subItems?: SubItem[];
  megaMenuGroups?: Array<{ title: string; items: SubItem[] }>;
};

// ─── Component ──────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // State
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  
  // ── Refs for positioning ──
  const navRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dropdownPos, setDropdownPos] = useState<number>(0);

  // ── Scroll & Auto-hide ──
  useEffect(() => {
    let activityTimer: ReturnType<typeof setTimeout> | null = null;
    
    const handleScrollOrActivity = () => {
      const y = window.scrollY;
      const isPastHero = y > window.innerHeight * 0.85; // 85% of viewport height
      
      setScrolled(y > NC.scroll.logoTextHideAt);

      if (isPastHero) {
        // If scrolling down aggressively, hide immediately? Or just rely on 2s timeout?
        // Let's implement immediate hide on scroll down, and 2s timeout on idle/scroll up
        if (y > lastScrollY.current && !isHovered) {
             setIsVisible(false);
             setIsMobileOpen(false);
        } else {
             setIsVisible(true);
        }

        if (activityTimer) clearTimeout(activityTimer);
        
        if (!isHovered) {
           activityTimer = setTimeout(() => {
              setIsVisible(false);
              setIsMobileOpen(false);
           }, 2000);
        }
      } else {
        setIsVisible(true);
        if (activityTimer) clearTimeout(activityTimer);
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScrollOrActivity, { passive: true });
    
    // Also run once to set initial state
    handleScrollOrActivity();

    return () => {
      window.removeEventListener('scroll', handleScrollOrActivity);
      if (activityTimer) clearTimeout(activityTimer);
    };
  }, [isHovered]);

  // ── Calculate Dropdown Left ──
  const updateDropdownPos = (id: string) => {
    const el = navRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    
    // Choose width based on menu type
    let widthStr = NC.platformsMenu.width;
    if (id === 'industries') widthStr = NC.industriesMenu.width;
    if (id === 'company') widthStr = NC.companyMenu.width;
    if (id === 'blogs') widthStr = '220px'; 

    const wNum = parseInt(widthStr);
    
    // Align left edge of dropdown with left edge of trigger text
    const targetLeft = rect.left;
    const maxL = window.innerWidth - wNum - 16;
    
    // For standard dropdowns, keep exactly below text
    // (Special case for capabilities handled in render)
    setDropdownPos(Math.min(targetLeft, maxL));
  };
  
  // ─── Capability Header Routes ───
  const capabilityHeaderRoutes = [
    '/capabilities/cyber-advisory-risk-governance',
    '/capabilities/offensive-security-engineering',
    '/capabilities/cloud-infrastructure-security',
    '/capabilities/managed-defense-operations'
  ];

  const openDropdown = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
    updateDropdownPos(id);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => {
        setOpenMenu(null);
    }, 200); // slightly increased delay to prevent jitter
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // ── Build nav menus ──
  const navMenus: NavMenu[] = useMemo(
    () => navigationConfig.map((item) => ({
      id: item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: item.label,
      href: item.href,
      subItems: item.subItems as SubItem[] | undefined,
      megaMenuGroups: (item as any).megaMenuGroups,
    })),
    []
  );

  const isActivePath = (href: string) =>
    location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  // ─── Column Header with Text-Width Underline ───
  const ColumnHeader = ({ title, href }: { title: string; href: string }) => {
    const [h, setH] = useState(false);
    return (
      <Link 
        to={href}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          marginBottom: '16px', 
          textDecoration: 'none', 
          cursor: 'pointer' 
        }}
      >
        <span style={{
            color: NC.dropdown.columnHeader.color,
            fontSize: NC.dropdown.columnHeader.fontSize,
            fontWeight: NC.dropdown.columnHeader.fontWeight,
            letterSpacing: NC.dropdown.columnHeader.letterSpacing,
            textTransform: NC.dropdown.columnHeader.textTransform,
            marginBottom: '8px',
            display: 'inline-block',
            textDecoration: h ? 'underline' : 'none',
            transition: 'color 0.15s ease'
        }}>
            {title}
        </span>
        <div style={{
            height: NC.dropdown.columnHeader.separatorHeight,
            width: '100%',
            background: h ? NC.dropdown.columnHeader.color : NC.dropdown.columnHeader.separatorColor,
            display: 'inline-block',
            transition: 'background 0.2s ease'
        }} />
      </Link>
    );
  };
  // ─── Dropdown Item Renderer ───
  const renderDropdownItem = (sub: SubItem, hideIcon = false, isPlatformItem = false) => {
    const dItem = NC.dropdown.item;
    const isBlogs = openMenu === 'blogs';
    const isQrgt = sub.label === 'QRGT';
    const isQpulse = sub.label === 'QPulse';
    
    // External arrow symbol
    const ExternalArrow = () => (
      <span style={{ fontSize: '0.7rem', opacity: 0.35, marginLeft: 'auto', fontWeight: 700 }}>↗</span>
    );

    return (
      <Link
        key={`${sub.label}-${sub.href}`}
        to={sub.href}
        target={sub.isExternal ? '_blank' : undefined}
        rel={sub.isExternal ? 'noopener noreferrer' : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isPlatformItem ? '14px' : '12px',
          padding: isPlatformItem ? '12px 0' : `${dItem.paddingTop} 0`,
          color: dItem.color,
          textDecoration: 'none',
          borderBottom: isPlatformItem ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: `color ${dItem.transitionDuration}, padding-left ${dItem.transitionDuration}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = dItem.colorHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = dItem.color;
        }}
      >
        {!hideIcon && (sub.icon ? (
          <div style={{ 
            width: isPlatformItem ? '42px' : isBlogs ? '32px' : '32px', 
            height: isPlatformItem ? '42px' : isBlogs ? '32px' : '32px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 0,
            overflow: 'visible',
            borderRadius: isPlatformItem ? '2px' : '0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
              <div style={sub.label === 'QStellar' ? {
                background: '#FFFFFF',
                padding: '6px',
                borderRadius: '4px',
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              } : { height: '100%', display: 'flex', alignItems: 'center' }}>
                <img 
                  src={sub.icon} 
                  alt="" 
                  style={{ 
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain', 
                    opacity: 1 
                  }} 
                />
              </div>
            </div>
          </div>
        ) : sub.LucideIcon || (isBlogs && sub.label.includes('Articles')) ? (
          (() => {
            const Icon = sub.label.includes('Articles') ? BookOpen : sub.LucideIcon;
            return <Icon size={isBlogs ? 20 : 18} color={isBlogs ? '#D6B05C' : NC.dropdown.topAccentColor} strokeWidth={1.5} style={{ flexShrink: 0, opacity: 0.8 }} />;
          })()
        ) : null)}
        
        <div style={{ 
          fontSize: dItem.fontSize, 
          fontWeight: isPlatformItem ? '500' : '500', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          color: 'inherit',
          width: isPlatformItem ? '100%' : 'auto'
        }}>
          {sub.label}
          {sub.isExternal && isPlatformItem && <ExternalArrow />}
          {sub.isExternal && !isPlatformItem && <span style={{ fontSize: '10px', opacity: 0.4 }}>↗</span>}
        </div>
      </Link>
    );
  };

  // ── Dropdown accent line ──
  const DropdownAccent = () => (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: NC.dropdown.topAccentHeight,
      background: NC.dropdown.topAccentColor,
      opacity: NC.dropdown.topAccentOpacity,
      zIndex: 10,
    }} />
  );

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <header
      onMouseEnter={() => { setIsHovered(true); setIsVisible(true); }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: NC.wrapper.position,
        top: NC.wrapper.topDefault,
        left: 0,
        right: 0,
        zIndex: NC.wrapper.zIndex,
        background: NC.wrapper.background,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: 'none',
        boxShadow: 'none',
        paddingTop: (NC.wrapper as any).paddingTop || '18px',
        paddingLeft: NC.wrapper.paddingLeft,
        paddingRight: NC.wrapper.paddingRight,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: NC.wrapper.gap,
        transform: isVisible ? 'translateY(0)' : `translateY(${NC.scroll.hideTranslate})`,
        opacity: isVisible ? 1 : 0,
        transition: `transform ${NC.scroll.hideDuration} ${NC.scroll.easing}, opacity ${NC.scroll.hideDuration} ease`,
      }}
    >
      <style>{`@keyframes fadeSlideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}`}</style>

      <div style={{
        transform: `translate(${NC.wrapper.logoContainerNudgeX || '0px'}, ${NC.wrapper.logoContainerNudgeY || '0px'})`,
      }}>
        <Link
          to="/"
          aria-label="QuasarCyberTech Home"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center them relative to each other
            justifyContent: 'center',
            textDecoration: 'none',
            flexShrink: 0,
            width: '180px', // Fixed width to enable centering
            zIndex: 1002,
          }}
        >
          <div style={{
            height: NC.logoIcon.containerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate(${NC.wrapper.logoIconNudgeX || '0px'}, ${NC.wrapper.logoIconNudgeY || '0px'})`,
          }}>
            <img
              src={ASSETS.logos.qct.icon}
              alt="QuasarCyberTech"
              style={{
                height: NC.logoIcon.height,
                width: NC.logoIcon.width,
                opacity: NC.logoIcon.opacity,
              }}
            />
          </div>
          <AnimatePresence mode="wait">
            {(!scrolled && openMenu !== 'capabilities') && (
              <motion.div
                initial={{ opacity: 0, y: -5, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -5, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ 
                  overflow: 'hidden',
                  transform: `translate(${NC.wrapper.logoTextNudgeX || '0px'}, ${NC.wrapper.logoTextNudgeY || '0px'})`,
                }}
              >
                <img
                  src={ASSETS.logos.qct.textLight}
                  alt="QuasarCyberTech"
                  style={{
                    height: NC.logoText.height,
                    width: NC.logoText.width,
                    objectFit: 'contain',
                    display: 'block',
                    marginTop: NC.logoText.marginTop,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* ═══════════════ ZONE 2: NAV PILL ═══════════════ */}
      <nav
        className="hidden lg:flex"
        style={{
          position: 'absolute',
          left: '50%',
          transform: `translate(calc(-50% + ${NC.pill.nudgeX || '0px'}), ${NC.pill.nudgeY || '0px'})`,
          display: 'flex',
          alignItems: 'center',
          gap: NC.pill.gap,
          height: NC.pill.height,
          padding: `${NC.pill.paddingTop} ${NC.pill.paddingRight} ${NC.pill.paddingBottom} ${NC.pill.paddingLeft}`,
          borderRadius: NC.pill.borderRadius,
          background: scrolled ? NC.pill.backgroundScrolled : NC.pill.backgroundTop,
          backdropFilter: scrolled ? NC.pill.backdropFilterScrolled : NC.pill.backdropFilterTop,
          WebkitBackdropFilter: scrolled ? NC.pill.backdropFilterScrolled : NC.pill.backdropFilterTop,
          border: scrolled ? NC.pill.borderScrolled : NC.pill.borderTop,
          borderTop: scrolled ? (NC.pill.borderTopScrolled || NC.pill.borderScrolled) : NC.pill.borderTop,
          boxShadow: scrolled ? NC.pill.boxShadowScrolled : NC.pill.boxShadowTop,
          flexShrink: 0,
          transition: NC.pill.transition,
          zIndex: 1001,
        }}
      >
        {navMenus.map((menu) => {
          const hasDropdown = Boolean(menu.subItems?.length || menu.megaMenuGroups?.length);
          const active = isActivePath(menu.href);
          const isLinkHovered = hoveredLink === menu.id;

          return (
            <div
              key={menu.id}
              ref={(el) => { navRefs.current[menu.id] = el; }}
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => hasDropdown && openDropdown(menu.id)}
              onMouseLeave={() => hasDropdown && closeDropdown()}
            >
              <Link
                to={menu.href}
                onMouseEnter={() => setHoveredLink(menu.id)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  color: (active || isLinkHovered) ? NC.pill.link.colorActive : NC.pill.link.color,
                  fontSize: NC.pill.link.fontSize,
                  fontWeight: NC.pill.link.fontWeight, // No more 600 weight to avoid jitter
                  fontFamily: NC.pill.link.fontFamily,
                  letterSpacing: NC.pill.link.letterSpacing,
                  padding: `${NC.pill.link.paddingTop} ${NC.pill.link.paddingRight} ${NC.pill.link.paddingBottom} ${NC.pill.link.paddingLeft}`,
                  height: '100%',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  background: 'transparent',
                  borderRadius: '100px',
                  transition: 'all 0.15s ease',
                }}
              >
                {menu.label}
                {hasDropdown && (
                  <ChevronDown
                    size={10}
                    style={{
                      opacity: 0.5,
                      marginLeft: '2px',
                      transition: 'transform 0.2s ease',
                      transform: openMenu === menu.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* ━━━━━━━━━━━ DROPDOWN OVERLAYS ━━━━━━━━━━━ */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onMouseLeave={closeDropdown}
            style={openMenu === 'capabilities' ? {
              position: 'fixed' as const,
              top: `calc(${NC.wrapper.paddingTop} + ${NC.pill.height} + ${NC.dropdown.verticalOffset})`,
              left: '50%',
              x: `calc(-50% + ${NC.megaMenu.offsetX || '0px'})`,
              width: 'min(1024px, 94vw)', 
              background: NC.dropdown.background,
              backdropFilter: NC.dropdown.backdropFilter,
              WebkitBackdropFilter: NC.dropdown.backdropFilter,
              border: NC.dropdown.border,
              borderRadius: '0 0 16px 16px',
              boxShadow: NC.dropdown.boxShadow,
              zIndex: 999,
            } : {
              position: 'fixed' as const,
              top: `calc(${NC.wrapper.paddingTop} + ${NC.pill.height} + ${NC.dropdown.verticalOffset})`,
              left: `${dropdownPos}px`,
              width: openMenu === 'industries' ? NC.industriesMenu.width : 
                     openMenu === 'platforms-ecosystem' ? NC.platformsMenu.width : NC.companyMenu.width,
              background: NC.dropdown.background,
              backdropFilter: NC.dropdown.backdropFilter,
              WebkitBackdropFilter: NC.dropdown.backdropFilter,
              border: NC.dropdown.border,
              borderRadius: NC.dropdown.borderRadius,
              boxShadow: NC.dropdown.boxShadow,
              padding: `${NC.dropdown.paddingTop} ${NC.dropdown.paddingRight} ${NC.dropdown.paddingBottom} ${NC.dropdown.paddingLeft}`,
              zIndex: 999,
            }}
          >
            {/* Invisible bridge to prevent gap from triggering mouse leave */}
            <div style={{ position: 'absolute', top: `-${NC.dropdown.verticalOffset}`, left: 0, right: 0, height: NC.dropdown.verticalOffset, background: 'transparent' }} />
            
            <DropdownAccent />
            {/* List Dropdowns (Platforms, Industries, Insights, Company) */}
            {['platforms-ecosystem', 'industries', 'blogs', 'company'].includes(openMenu) && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {navMenus.find(m => m.id === openMenu)?.subItems?.map(item => 
                    renderDropdownItem(item, false, openMenu === 'platforms-ecosystem')
                  )}
                </div>
                
                {/* Footer Link for Platforms/Industries */}
                {(openMenu === 'platforms-ecosystem' || openMenu === 'industries') && (
                  <Link 
                    to={openMenu === 'platforms-ecosystem' ? "/platforms" : "/industries"} 
                    style={{ 
                      marginTop: '24px', 
                      textAlign: 'left', 
                      fontSize: '0.78rem', 
                      color: '#D6B05C', 
                      fontWeight: 600,
                      textDecoration: 'none', 
                      transition: 'opacity 0.2s ease',
                      opacity: 0.8
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                  >
                    {openMenu === 'platforms-ecosystem' ? 'Explore Ecosystem →' : 'Explore All Industries →'}
                  </Link>
                )}
              </div>
            )}

            {/* Mega Menu Content (Capabilities) */}
            {openMenu === 'capabilities' && (
              <div style={{ width: '100%' }}>
                <div style={{
                  width: '100%',
                  margin: '0 auto',
                  padding: '24px 32px', // Reduced inner paddings
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '24px',
                }}>
                  {navMenus.find(m => m.id === 'capabilities')?.megaMenuGroups?.map((group, idx) => (
                    <div key={group.title}>
                      <ColumnHeader title={group.title} href={capabilityHeaderRoutes[idx]} />
                      {group.items.map(item => renderDropdownItem(item, true))}
                    </div>
                  ))}
                </div>
                
                {/* Footer Link for Mega Menu */}
                <div style={{ padding: '0 32px 24px', textAlign: 'left' }}>
                  <Link 
                    to="/capabilities" 
                    style={{ 
                      fontSize: '0.78rem', 
                      color: '#D6B05C', 
                      fontWeight: 600,
                      textDecoration: 'none', 
                      transition: 'opacity 0.2s ease',
                      opacity: 0.8
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                  >
                    View All Capabilities →
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ ZONE 3: ACTION ═══════════════ */}
      <div className="hidden lg:flex" style={{ 
        flexShrink: 0, 
        zIndex: 1002, 
        transform: `translate(${NC.wrapper.contactNudgeX || '0px'}, ${NC.wrapper.contactNudgeY || '0px'})` 
      }}>
        <Link
          to={NC.contactButton.href}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = NC.contactButton.backgroundHover;
            e.currentTarget.style.boxShadow = NC.contactButton.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = NC.contactButton.background;
            e.currentTarget.style.boxShadow = NC.contactButton.boxShadow;
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: NC.contactButton.height,
            padding: `0 26px`,
            borderRadius: NC.contactButton.borderRadius,
            background: NC.contactButton.background,
            color: NC.contactButton.color,
            fontSize: NC.contactButton.fontSize,
            fontWeight: NC.contactButton.fontWeight,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: NC.contactButton.boxShadow,
          }}
        >
          {NC.contactButton.label}
        </Link>
      </div>

      {/* ═══════════════ MOBILE TOGGLE ═══════════════ */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden"
        aria-label="Toggle menu"
        style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px' }}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ═══════════════ MOBILE NAV ═══════════════ */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
            style={{
              position: 'absolute',
              top: '100%',
              left: '16px',
              right: '16px',
              background: NC.dropdown.background,
              border: NC.dropdown.border,
              borderRadius: NC.dropdown.borderRadius,
              overflow: 'hidden',
              boxShadow: NC.dropdown.boxShadow,
            }}
          >
            <div style={{ padding: '16px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
              {navMenus.map((menu) => (
                <div key={menu.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '8px' }}>
                  <Link
                    to={menu.href}
                    onClick={() => { if (!menu.subItems && !menu.megaMenuGroups) setIsMobileOpen(false); }}
                    style={{ display: 'block', color: '#FFFFFF', fontSize: '15px', fontWeight: 600, padding: '10px 0', textDecoration: 'none' }}
                  >
                    {menu.label}
                  </Link>
                  {menu.subItems && (
                    <div style={{ paddingLeft: '16px' }}>
                      {menu.subItems.map((sub) => (
                        <Link key={`${sub.label}-${sub.href}`} to={sub.href} onClick={() => setIsMobileOpen(false)}
                          style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', padding: '6px 0', textDecoration: 'none' }}
                        >{sub.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to={NC.contactButton.href} onClick={() => setIsMobileOpen(false)}
                style={{
                  display: 'block',
                  background: NC.contactButton.background,
                  color: NC.contactButton.color,
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  marginTop: '12px',
                }}
              >{NC.contactButton.label}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
