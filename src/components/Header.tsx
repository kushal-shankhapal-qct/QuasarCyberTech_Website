import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import fullLogo from '../assets/logos copy/QuasarCyberTech/fulllogo_transparent_nobuffer.png';
import { navigationConfig } from '../config/navigationConfig';
import { ALPHAS, COLORS, SHADOWS } from '../config/themeConfig';

type NavMenu = {
  id: string;
  label: string;
  href: string;
  subItems?: Array<{ label: string; href: string; isExternal?: boolean }>;
  megaMenuGroups?: Array<{ title: string; items: Array<{ label: string; href: string }> }>;
};

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const open = (id: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpenMenu(id);
  };

  const close = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const navMenus: NavMenu[] = useMemo(
    () =>
      navigationConfig.map((item) => ({
        id: item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: item.label,
        href: item.href,
        subItems: item.subItems,
        megaMenuGroups: (item as any).megaMenuGroups,
      })),
    []
  );

  const isActive = (href: string) => location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '68px',
        background: isScrolled ? ALPHAS.darkGlassStrong : ALPHAS.darkGlass,
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        borderBottom: `1px solid ${isScrolled ? ALPHAS.teal20 : ALPHAS.teal12}`,
        boxShadow: isScrolled ? SHADOWS.nav : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease',
      }}
    >
      <style>{`@keyframes fadeSlideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}`}</style>
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Link to="/" aria-label="QuasarCyberTech Home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={fullLogo} alt="QuasarCyberTech" style={{ height: '38px', width: 'auto' }} />
        </Link>

        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              background: ALPHAS.deepBlueGlass,
              border: `1px solid ${ALPHAS.white08}`,
              borderRadius: '100px',
              padding: '0 28px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {navMenus.map((menu) => {
              const hasDropdown = Boolean(menu.subItems?.length || menu.megaMenuGroups?.length);
              const active = isActive(menu.href);
              return (
                <div
                  key={menu.id}
                  onMouseEnter={() => hasDropdown && open(menu.id)}
                  onMouseLeave={() => hasDropdown && close()}
                  style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  <Link
                    to={menu.href}
                    style={{
                      color: active ? COLORS.gold : COLORS.textOnDark,
                      opacity: active ? 1 : 0.82,
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '0 10px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      height: '100%',
                    }}
                  >
                    {menu.label}
                    {hasDropdown && <ChevronDown size={14} />}
                  </Link>
                  <span
                    style={{
                      position: 'absolute',
                      left: '10px',
                      right: '10px',
                      bottom: '6px',
                      height: '1.5px',
                      background: COLORS.burgundy,
                      transformOrigin: 'left',
                      transform: active || openMenu === menu.id ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  />

                  {menu.megaMenuGroups && openMenu === menu.id && (
                    <div
                      onMouseEnter={() => open(menu.id)}
                      onMouseLeave={close}
                      style={{
                        position: 'fixed',
                        top: '68px',
                        left: 0,
                        right: 0,
                        background: `rgb(11, 31, 59)`,
                        borderTop: `1px solid ${ALPHAS.teal20}`,
                        borderBottom: `1px solid ${ALPHAS.teal12}`,
                        boxShadow: SHADOWS.dropdown,
                        padding: '36px max(48px, calc((100vw - 1200px) / 2))',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '40px',
                        animation: 'fadeSlideDown 0.18s ease',
                        zIndex: 999,
                      }}
                    >
                      {menu.megaMenuGroups.map((group) => (
                        <div key={group.title}>
                          <h4
                            style={{
                              color: COLORS.teal,
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              marginBottom: '18px',
                              paddingBottom: '10px',
                              borderBottom: `1px solid ${ALPHAS.teal20}`,
                            }}
                          >
                            {group.title}
                          </h4>
                          {group.items.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              style={{
                                display: 'block',
                                color: COLORS.textOnDark,
                                fontSize: '13px',
                                fontWeight: 500,
                                padding: '7px 0',
                                opacity: 0.82,
                                textDecoration: 'none',
                                transition: 'color 0.15s, padding-left 0.15s, opacity 0.15s',
                              }}
                              onMouseEnter={(event) => {
                                event.currentTarget.style.color = COLORS.teal;
                                event.currentTarget.style.opacity = '1';
                                event.currentTarget.style.paddingLeft = '6px';
                              }}
                              onMouseLeave={(event) => {
                                event.currentTarget.style.color = COLORS.textOnDark;
                                event.currentTarget.style.opacity = '0.82';
                                event.currentTarget.style.paddingLeft = '0px';
                              }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {menu.subItems && openMenu === menu.id && (
                    <div
                      onMouseEnter={() => open(menu.id)}
                      onMouseLeave={close}
                      style={{
                        position: 'absolute',
                        top: '58px',
                        left: 0,
                        minWidth: '320px',
                        background: COLORS.deepCyberBlue,
                        borderTop: `1px solid ${ALPHAS.teal20}`,
                        border: `1px solid ${ALPHAS.teal12}`,
                        borderRadius: '0 0 14px 14px',
                        boxShadow: SHADOWS.dropdown,
                        padding: '12px 14px',
                        zIndex: 999,
                      }}
                    >
                      {menu.subItems.map((sub) =>
                        sub.isExternal ? (
                          <a
                            key={sub.href}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'block',
                              color: COLORS.textOnDark,
                              fontSize: '13px',
                              textDecoration: 'none',
                              opacity: 0.86,
                              padding: '8px 4px',
                            }}
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            style={{
                              display: 'block',
                              color: COLORS.textOnDark,
                              fontSize: '13px',
                              textDecoration: 'none',
                              opacity: 0.86,
                              padding: '8px 4px',
                            }}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="hidden lg:flex" style={{ alignItems: 'center' }}>
          <Link
            to="/contact"
            style={{
              background: COLORS.burgundy,
              color: COLORS.textOnDark,
              borderRadius: '0 0 10px 10px',
              borderTop: `2px solid ${ALPHAS.gold30}`,
              padding: '10px 22px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = COLORS.burgundyHover;
              event.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = COLORS.burgundy;
              event.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact Us
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          style={{
            background: 'transparent',
            border: 'none',
            color: COLORS.textOnDark,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden"
          style={{
            background: COLORS.deepCyberBlue,
            borderTop: `1px solid ${ALPHAS.teal12}`,
            padding: '14px 24px 20px',
          }}
        >
          {navMenus.map((menu) => (
            <Link
              key={menu.id}
              to={menu.href}
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'block',
                color: isActive(menu.href) ? COLORS.gold : COLORS.textOnDark,
                fontSize: '14px',
                textDecoration: 'none',
                padding: '9px 0',
              }}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
