import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Assets
import logoIcon from '../assets/logos copy/QuasarCyberTech/icononly_transparent_nobuffer.png';
import logoTextImg from '../assets/logos copy/QuasarCyberTech/Qtextonly_Light.png';

// Config — single source of truth
import { NAVBAR_CONFIG as NC } from '../config/themeConfig';
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

  // ── Scroll ──
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > NC.scroll.logoTextHideAt);
      if (NC.scroll.revealOnScrollUp && y > 200) {
        if (y > lastScrollY.current && !isHovered) {
          setIsVisible(false);
          setIsMobileOpen(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHovered]);

  // ── Mouse near top → reveal ──
  useEffect(() => {
    if (!NC.scroll.revealOnMouseNearTop) return;
    const onMove = (e: MouseEvent) => {
      if (e.clientY < NC.scroll.mouseRevealZone) setIsVisible(true);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── Auto-hide ──
  useEffect(() => {
    if (!NC.scroll.autoHideOnHomepage && isHomepage) return;
    let tid: ReturnType<typeof setTimeout>;
    if (scrolled && isVisible && !isHovered) {
      tid = setTimeout(() => {
        if (!isHovered) { setIsVisible(false); setIsMobileOpen(false); }
      }, NC.scroll.autoHideDelay);
    }
    return () => clearTimeout(tid);
  }, [scrolled, isVisible, isHovered, isHomepage]);

  // ── Dropdown open/close ──
  const openDropdown = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), NC.dropdown.closeDelay);
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

  // ── Active indicator ──
  const renderActiveIndicator = () => {
    const ai = NC.pill.link.activeIndicator;
    if (ai.type === 'dot') {
      return (
        <span style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: ai.dotSize,
          height: ai.dotSize,
          borderRadius: '50%',
          background: ai.dotColor,
        }} />
      );
    }
    if (ai.type === 'line') {
      return (
        <span style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: ai.lineWidth,
          height: ai.lineHeight,
          background: ai.lineColor,
        }} />
      );
    }
    return null;
  };

  // ── Dropdown accent line ──
  const DropdownAccent = () => (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: NC.dropdown.topAccentHeight,
      background: NC.dropdown.topAccentColor,
      opacity: NC.dropdown.topAccentOpacity,
    }} />
  );

  // ── Link border radius based on position ──
  const getLinkRadius = (index: number, total: number) => {
    const L = NC.pill.link;
    if (total === 1) return NC.pill.borderRadius;
    if (index === 0) return L.borderRadiusFirst;
    if (index === total - 1) return L.borderRadiusLast;
    return L.borderRadiusMiddle;
  };

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
        // FIX 4: ALWAYS transparent — never changes
        background: NC.wrapper.background,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: 'none',
        boxShadow: 'none',
        // Fixed padding — never shifts
        padding: NC.wrapper.padding,
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

      {/* ═══════════════ ZONE 1: LOGO ═══════════════ */}
      <Link
        to="/"
        aria-label="QuasarCyberTech Home"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textDecoration: 'none',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* FIX 6: Icon in 46px container — vertical center matches pill */}
        <div style={{
          height: NC.logoIcon.containerHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <img
            src={logoIcon}
            alt="QuasarCyberTech"
            style={{
              height: NC.logoIcon.height,
              width: NC.logoIcon.width,
              opacity: NC.logoIcon.opacity,
            }}
          />
        </div>
        {/* FIX 5+6: Text below 46px container — collapses independently, icon never moves */}
        <div style={{
          overflow: 'hidden',
          maxHeight: scrolled ? '0px' : '28px',
          opacity: scrolled ? 0 : NC.logoText.opacity,
          transition: `max-height ${NC.logoText.transitionDuration} ${NC.logoText.transitionEasing}, opacity ${NC.logoText.transitionDuration} ${NC.logoText.transitionEasing}, margin-top ${NC.logoText.transitionDuration} ${NC.logoText.transitionEasing}`,
          marginTop: scrolled ? '0px' : NC.logoText.marginTop,
        }}>
          <img
            src={logoTextImg}
            alt="QuasarCyberTech"
            style={{
              height: NC.logoText.height,
              width: NC.logoText.width,
              display: 'block',
            }}
          />
        </div>
      </Link>

      {/* ═══════════════ ZONE 2: NAV PILL ═══════════════ */}
      {/* FIX 4: Pill goes from transparent (at-top) → clay (scrolled) */}
      <nav
        className="hidden lg:flex"
        style={{
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
          boxShadow: scrolled ? NC.pill.boxShadowScrolled : NC.pill.boxShadowTop,
          flexShrink: 0,
          transition: NC.pill.transition,
        }}
      >
        {navMenus.map((menu, index) => {
          const hasDropdown = Boolean(menu.subItems?.length || menu.megaMenuGroups?.length);
          const active = isActivePath(menu.href);
          const isOpen = openMenu === menu.id;
          const isLinkHovered = hoveredLink === menu.id;
          const radius = getLinkRadius(index, navMenus.length);

          return (
            <div
              key={menu.id}
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => hasDropdown && openDropdown(menu.id)}
              onMouseLeave={() => hasDropdown && closeDropdown()}
            >
              {/* FIX 2+3: Claymorphism inward press on hover — works even when active */}
              <Link
                to={menu.href}
                onMouseEnter={() => setHoveredLink(menu.id)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  color: (active || isLinkHovered) ? NC.pill.link.colorActive : NC.pill.link.color,
                  fontSize: NC.pill.link.fontSize,
                  fontWeight: active ? '600' : NC.pill.link.fontWeight,
                  fontFamily: NC.pill.link.fontFamily,
                  letterSpacing: NC.pill.link.letterSpacing,
                  padding: `${NC.pill.link.paddingTop} ${NC.pill.link.paddingRight} ${NC.pill.link.paddingBottom} ${NC.pill.link.paddingLeft}`,
                  height: NC.pill.link.height,
                  textDecoration: NC.pill.link.textDecoration,
                  textTransform: NC.pill.link.textTransform,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  // Claymorphism hover
                  background: isLinkHovered ? NC.pill.link.hoverBackground : 'transparent',
                  boxShadow: isLinkHovered ? NC.pill.link.hoverBoxShadow : 'none',
                  borderRadius: radius,
                  transition: 'all 0.15s ease',
                }}
              >
                {menu.label}

                {/* Chevron — rotates when open */}
                {hasDropdown && (
                  <ChevronDown
                    size={parseInt(NC.pill.link.chevron.size)}
                    style={{
                      color: NC.pill.link.chevron.color,
                      marginLeft: NC.pill.link.chevron.marginLeft,
                      transition: `transform ${NC.pill.link.chevron.transitionDuration} ease`,
                      transform: isOpen ? `rotate(${NC.pill.link.chevron.rotateOnOpen})` : 'rotate(0deg)',
                    }}
                  />
                )}

                {/* Active indicator (dot) */}
                {active && renderActiveIndicator()}
              </Link>

              {/* ── HOVER BRIDGE ── */}
              {isOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-24px',
                  right: '-24px',
                  height: '28px',
                  zIndex: 998,
                }} />
              )}

              {/* ━━━━━━━━━━━ MEGA MENU (Capabilities) ━━━━━━━━━━━ */}
              {menu.megaMenuGroups && isOpen && (
                <div
                  onMouseEnter={() => openDropdown(menu.id)}
                  onMouseLeave={closeDropdown}
                  style={{
                    position: NC.megaMenu.position,
                    top: NC.megaMenu.top,
                    left: NC.megaMenu.left,
                    right: NC.megaMenu.right,
                    zIndex: 999,
                    background: NC.dropdown.background,
                    backdropFilter: NC.dropdown.backdropFilter,
                    WebkitBackdropFilter: NC.dropdown.backdropFilter,
                    borderRadius: NC.dropdown.borderRadius,
                    boxShadow: NC.dropdown.boxShadow,
                    padding: `${NC.megaMenu.paddingTop} ${NC.megaMenu.paddingHorizontal} ${NC.megaMenu.paddingBottom}`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${NC.megaMenu.columns}, 1fr)`,
                    gap: NC.megaMenu.columnGap,
                    animation: NC.dropdown.openAnimation,
                    overflow: 'hidden',
                  }}
                >
                  <DropdownAccent />
                  {menu.megaMenuGroups.map((group) => (
                    <div key={group.title}>
                      <h4 style={{
                        color: NC.dropdown.columnHeader.color,
                        fontSize: NC.dropdown.columnHeader.fontSize,
                        fontWeight: NC.dropdown.columnHeader.fontWeight,
                        letterSpacing: NC.dropdown.columnHeader.letterSpacing,
                        textTransform: NC.dropdown.columnHeader.textTransform,
                        marginBottom: NC.dropdown.columnHeader.marginBottom,
                        paddingBottom: NC.dropdown.columnHeader.paddingBottom,
                        borderBottom: `${NC.dropdown.columnHeader.separatorHeight} solid ${NC.dropdown.columnHeader.separatorColor}`,
                      }}>
                        {group.title}
                      </h4>
                      {group.items.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          style={{
                            display: 'block',
                            color: NC.dropdown.item.color,
                            fontSize: NC.dropdown.item.fontSize,
                            fontWeight: NC.dropdown.item.fontWeight,
                            letterSpacing: NC.dropdown.item.letterSpacing,
                            padding: `${NC.dropdown.item.paddingTop} ${NC.dropdown.item.paddingRight} ${NC.dropdown.item.paddingBottom} ${NC.dropdown.item.paddingLeft}`,
                            textDecoration: NC.dropdown.item.textDecoration,
                            transition: `color ${NC.dropdown.item.transitionDuration}, padding-left ${NC.dropdown.item.transitionDuration}`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = NC.dropdown.item.colorHover;
                            e.currentTarget.style.paddingLeft = NC.dropdown.item.paddingLeftHover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = NC.dropdown.item.color;
                            e.currentTarget.style.paddingLeft = NC.dropdown.item.paddingLeft;
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* ━━━━━━━━━━━ STANDARD DROPDOWN ━━━━━━━━━━━ */}
              {menu.subItems && isOpen && (
                <div
                  onMouseEnter={() => openDropdown(menu.id)}
                  onMouseLeave={closeDropdown}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: menu.subItems.length > 4 ? NC.industriesMenu.width : NC.platformsMenu.width,
                    background: NC.dropdown.background,
                    backdropFilter: NC.dropdown.backdropFilter,
                    WebkitBackdropFilter: NC.dropdown.backdropFilter,
                    borderRadius: NC.dropdown.borderRadius,
                    boxShadow: NC.dropdown.boxShadow,
                    padding: `${NC.dropdown.paddingTop} ${NC.dropdown.paddingRight} ${NC.dropdown.paddingBottom} ${NC.dropdown.paddingLeft}`,
                    zIndex: 999,
                    marginTop: '12px',
                    animation: NC.dropdown.openAnimation,
                    overflow: 'hidden',
                    ...(menu.subItems.length > 4 ? {
                      display: 'grid',
                      gridTemplateColumns: `repeat(${NC.industriesMenu.gridColumns}, 1fr)`,
                      gap: NC.industriesMenu.itemGap,
                    } : {}),
                  }}
                >
                  <DropdownAccent />
                  {menu.subItems.map((sub) => {
                    const hasLogo = Boolean(sub.icon || sub.LucideIcon);
                    const di = NC.dropdown.iconItem;
                    const dItem = NC.dropdown.item;

                    const content = hasLogo ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: di.gap,
                        padding: `${di.paddingTop} ${di.paddingRight} ${di.paddingBottom} ${di.paddingLeft}`,
                        borderRadius: di.borderRadius,
                        background: di.background,
                        border: di.border,
                        transition: `background ${di.transitionDuration}, border ${di.transitionDuration}`,
                      }}>
                        {sub.icon ? (
                          <img src={sub.icon} alt="" style={{ width: '22px', height: '22px', objectFit: 'contain', flexShrink: 0 }} />
                        ) : sub.LucideIcon ? (
                          <sub.LucideIcon size={parseInt(di.iconSize)} color={di.iconColor} strokeWidth={di.iconStrokeWidth} style={{ flexShrink: 0 }} />
                        ) : null}
                        <div>
                          <div style={{ fontSize: di.labelFontSize, fontWeight: di.labelFontWeight, color: di.labelColor, lineHeight: 1.3 }}>
                            {sub.label}
                            {sub.isExternal && (
                              <span style={{ fontSize: NC.dropdown.externalBadge.fontSize, color: NC.dropdown.externalBadge.color, marginLeft: NC.dropdown.externalBadge.marginLeft }}>
                                {NC.dropdown.externalBadge.symbol}
                              </span>
                            )}
                          </div>
                          {sub.desc && (
                            <div style={{ fontSize: di.subLabelFontSize, color: di.subLabelColor, marginTop: '2px', lineHeight: 1.4, maxWidth: '220px' }}>
                              {sub.desc}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: `${dItem.paddingTop} ${dItem.paddingRight} ${dItem.paddingBottom} ${dItem.paddingLeft}` }}>
                        <span style={{ fontSize: dItem.fontSize, fontWeight: dItem.fontWeight, color: dItem.color }}>
                          {sub.label}
                          {sub.isExternal && (
                            <span style={{ fontSize: NC.dropdown.externalBadge.fontSize, color: NC.dropdown.externalBadge.color, marginLeft: NC.dropdown.externalBadge.marginLeft }}>
                              {NC.dropdown.externalBadge.symbol}
                            </span>
                          )}
                        </span>
                      </div>
                    );

                    const linkStyle: React.CSSProperties = {
                      textDecoration: 'none',
                      display: 'block',
                      borderRadius: hasLogo ? di.borderRadius : '6px',
                      transition: `background ${di.transitionDuration}`,
                    };

                    const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
                      if (hasLogo) {
                        e.currentTarget.style.background = di.backgroundHover;
                        const inner = e.currentTarget.querySelector('div') as HTMLElement;
                        if (inner) inner.style.border = di.borderHover;
                      } else {
                        const span = e.currentTarget.querySelector('span') as HTMLElement;
                        if (span) {
                          span.style.color = dItem.colorHover;
                          span.parentElement!.style.paddingLeft = dItem.paddingLeftHover;
                        }
                      }
                    };

                    const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
                      if (hasLogo) {
                        e.currentTarget.style.background = 'transparent';
                        const inner = e.currentTarget.querySelector('div') as HTMLElement;
                        if (inner) inner.style.border = di.border;
                      } else {
                        const span = e.currentTarget.querySelector('span') as HTMLElement;
                        if (span) {
                          span.style.color = dItem.color;
                          span.parentElement!.style.paddingLeft = dItem.paddingLeft;
                        }
                      }
                    };

                    return sub.isExternal ? (
                      <a key={sub.href} href={sub.href} target="_blank" rel="noopener noreferrer"
                        style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}
                      >{content}</a>
                    ) : (
                      <Link key={sub.href} to={sub.href}
                        style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}
                      >{content}</Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ═══════════════ ZONE 3: CONTACT US PILL ═══════════════ */}
      <div className="hidden lg:flex" style={{ flexShrink: 0, zIndex: 10 }}>
        <Link
          to={NC.contactButton.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: NC.contactButton.height,
            padding: `${NC.contactButton.paddingTop} ${NC.contactButton.paddingRight} ${NC.contactButton.paddingBottom} ${NC.contactButton.paddingLeft}`,
            borderRadius: NC.contactButton.borderRadius,
            background: NC.contactButton.background,
            color: NC.contactButton.color,
            fontSize: NC.contactButton.fontSize,
            fontWeight: NC.contactButton.fontWeight,
            fontFamily: NC.contactButton.fontFamily,
            letterSpacing: NC.contactButton.letterSpacing,
            textTransform: NC.contactButton.textTransform,
            textDecoration: NC.contactButton.textDecoration,
            border: NC.contactButton.border,
            boxShadow: NC.contactButton.boxShadow,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: `background ${NC.contactButton.transitionDuration} ease, box-shadow ${NC.contactButton.transitionDuration} ease`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = NC.contactButton.backgroundHover;
            e.currentTarget.style.boxShadow = NC.contactButton.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = NC.contactButton.background;
            e.currentTarget.style.boxShadow = NC.contactButton.boxShadow;
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
                        <Link key={sub.href} to={sub.href} onClick={() => setIsMobileOpen(false)}
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
