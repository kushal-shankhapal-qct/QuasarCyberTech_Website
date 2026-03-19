import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoSymbol from '../assets/Logos/icononly_nobuffer_white_fill.png';
import logoText from '../assets/Logos/Dark_QuasarCyberTech_Text_Only_Logo_Over.png';
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
      <div
        className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16"
      >
        <div className="flex items-center w-full pointer-events-none relative">

          {/* Left Pod: Logo */}
          <div
            className="flex-none"
            style={{
              position: 'relative',
              width: headerDesignVars.logoSection.width,
              height: headerDesignVars.logoSection.height,
              marginTop: headerDesignVars.logoSection.marginTop,
              marginBottom: headerDesignVars.logoSection.marginBottom,
              marginLeft: headerDesignVars.logoSection.marginLeft,
              marginRight: headerDesignVars.logoSection.marginRight,
              paddingTop: headerDesignVars.logoSection.paddingTop,
              paddingBottom: headerDesignVars.logoSection.paddingBottom,
              paddingLeft: headerDesignVars.logoSection.paddingLeft,
              paddingRight: headerDesignVars.logoSection.paddingRight,
              left: headerDesignVars.logoSection.offsetX,
              top: headerDesignVars.logoSection.offsetY,
              transform: `scale(${headerDesignVars.logoSection.scale || 1})`,
              transformOrigin: 'top left'
            }}
          >
            <Link
              to="/"
              className="flex flex-col items-center group pointer-events-auto relative"
            >
              <img
                src={logoSymbol}
                alt="Quasar CyberTech Icon"
                className="object-contain drop-shadow-sm transition-all duration-500 ease-in-out"
                style={{
                  width: `clamp(${headerDesignVars.logoSection.iconWidthMobile}, 5vw, ${headerDesignVars.logoSection.iconWidth})`,
                  height: `clamp(${headerDesignVars.logoSection.iconHeightMobile}, 5vw, ${headerDesignVars.logoSection.iconHeight})`,
                }}
              />
              <div
                className={`absolute left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-500 ease-in-out flex justify-center w-max ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-32 opacity-100'}`}
                style={{
                  top: '105%',
                  marginTop: headerDesignVars.logoSection.textMarginTop,
                  transform: isScrolled
                    ? `translateX(-50%) translateY(${headerDesignVars.logoSection.textHideOffset})`
                    : 'translateX(-50%) translateY(0)'
                }}
              >
                <img
                  src={logoText}
                  alt="QuasarCyberTech Text"
                  className="w-auto object-contain"
                  style={{ height: headerDesignVars.logoSection.textHeight }}
                />
              </div>
            </Link>
          </div>

          {/* Middle Pod: Desktop Navigation */}
          <div
            className="hidden lg:flex flex-1 justify-center pointer-events-none"
            style={{
              marginTop: headerDesignVars.navSection.marginTop || '0px',
              position: 'relative',
              left: headerDesignVars.navSection.offsetX,
              transform: `scale(${headerDesignVars.navSection.scale || 1})`,
              transformOrigin: 'center'
            }}
          >
            <motion.nav
              className="flex items-center gap-8 pointer-events-auto relative z-10"
              style={{
                padding: `${headerDesignVars.navSection.paddingY} ${headerDesignVars.navSection.paddingX}`,
              }}
            >
              {/* The Background Backdrop Div that sits BEHIND the middle nav items to NOT swallow backdrop-filters of dropdowns */}
              <div
                className="absolute inset-0 -z-10 overflow-hidden"
                style={{
                  ...(isSolid ? baseGlassStyle : transparentStyle),
                  borderRadius: currentPodRadius,
                  transitionProperty: 'all',
                  transitionDuration: headerDesignVars.interactions.hideSpeed,
                }}
              />

              {navigationConfig.map((link) => {
                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <div key={link.href} className="relative group/navitem flex items-center">
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`md-typescale-label-large flex items-center gap-1.5 ${isActive ? 'text-[var(--brand-navy)]' : 'text-[#0F172A]'} group-hover/navitem:text-[var(--brand-navy)] transition-colors duration-200 relative group/linktext whitespace-nowrap`}
                    >
                      <span className="relative">
                        {link.label}
                        {/* Active Underline Effect just under the text span */}
                        <span
                          className={`absolute -bottom-1 left-0 w-full ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/navitem:scale-x-100'} origin-left transition-transform duration-300`}
                          style={{
                            height: headerDesignVars.navSection.underlineThickness || '2px',
                            backgroundColor: 'var(--brand-navy)'
                          }}
                        />
                      </span>
                      {link.subItems && (
                        <ChevronDown size={14} className="opacity-70 group-hover/navitem:rotate-180 transition-transform duration-300" />
                      )}
                    </Link>

                    {/* Invisible solid bridge to ensure mouse never drops Hover state when crossing padding gaps */}
                    {link.subItems && <div className="absolute top-[100%] left-0 w-full h-[1.5rem] bg-transparent z-[60]" />}

                    {/* Mega Menu Dropdown */}
                    {link.subItems && (
                      <div
                        className={`absolute top-[calc(100%+1.5rem)] ${(link as any).dropdownOffset || 'left-1/2 -translate-x-1/2'} opacity-0 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:pointer-events-auto translate-y-4 group-hover/navitem:translate-y-0 z-50 p-4 ${(link as any).dropdownWidth || 'w-[400px]'} grid ${(link as any).dropdownCols || 'grid-cols-2'} gap-3 overflow-hidden`}
                        style={{
                          backgroundColor: `rgba(${headerDesignVars.dropdowns.clay.bgColor}, ${headerDesignVars.dropdowns.clay.bgOpacity})`,
                          backdropFilter: `blur(${headerDesignVars.dropdowns.clay.blur})`,
                          WebkitBackdropFilter: `blur(${headerDesignVars.dropdowns.clay.blur})`,
                          borderRadius: headerDesignVars.dropdowns.borderRadius,
                          boxShadow: `${headerDesignVars.dropdowns.clay.innerShadow}, ${headerDesignVars.dropdowns.shadow}`,
                          transitionProperty: 'all',
                          transitionDuration: headerDesignVars.dropdowns.transitionSpeed,
                          transitionTimingFunction: 'ease-out',
                        }}
                      >
                        {/* Active dropdown horizontal top accent line stretched past border */}
                        <div
                          className="absolute -top-[1px] -left-[1px] -right-[1px] pointer-events-none z-10"
                          style={{
                            height: headerDesignVars.dropdowns.topAccentThickness || '2px',
                            backgroundColor: headerDesignVars.global.accentColor || '#7A0F2A'
                          }}
                        />


                        {link.subItems.map(subItem => {
                          const content = (
                            <>
                              {subItem.icon ? (
                                <div className="mb-3 h-8 w-full flex items-center justify-start">
                                  <img src={subItem.icon} className="h-full w-auto object-contain max-w-full" alt={subItem.label} />
                                </div>
                              ) : subItem.LucideIcon ? (
                                <div
                                  className="mb-3 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 border"
                                  style={{
                                    backgroundColor: `${headerDesignVars.dropdowns.iconHoverColor}0D`, // 5% opacity
                                    borderColor: `${headerDesignVars.dropdowns.iconHoverColor}1A`, // 10% opacity
                                    color: headerDesignVars.dropdowns.iconColor
                                  }}
                                >
                                  <subItem.LucideIcon size={20} strokeWidth={1.5} />
                                </div>
                              ) : null}

                              <h4
                                className="md-typescale-label-medium text-slate-900 mb-1 transition-colors tracking-tight"
                                style={{
                                  '--hover-color': headerDesignVars.dropdowns.iconHoverColor
                                } as React.CSSProperties}
                              >
                                {subItem.label}
                              </h4>
                              <p className="md-typescale-body-medium text-slate-600 font-medium leading-relaxed drop-shadow-sm">
                                {subItem.desc}
                              </p>
                            </>
                          );

                          return subItem.isExternal ? (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col group/subitem hover:bg-slate-50 p-3 -m-3 rounded-xl transition-colors"
                            >
                              {content}
                            </a>
                          ) : (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="flex flex-col group/subitem hover:bg-slate-50 p-3 -m-3 rounded-xl transition-colors"
                            >
                              {content}
                            </Link>
                          );
                        })}

                      </div>
                    )}
                  </div>
                );
              })}
            </motion.nav>
          </div>
        </nav>

        <div className="hidden lg:flex" style={{ alignItems: 'center' }}>
          <Link
            to="/contact"
            style={{
              marginTop: headerDesignVars.contactSection.marginTop || '0px',
              position: 'relative',
              left: headerDesignVars.contactSection.offsetX,
              transform: `scale(${headerDesignVars.contactSection.scale || 1})`,
              transformOrigin: 'center'
            }}
          >
            <Link
              to="/contact"
              className="md-typescale-label-large relative pointer-events-auto overflow-hidden flex items-center transition-all duration-300 text-white"
              style={{
                paddingLeft: headerDesignVars.contactSection.paddingX || '2rem',
                paddingRight: headerDesignVars.contactSection.paddingX || '2rem',
                paddingTop: headerDesignVars.contactSection.paddingY || headerDesignVars.navSection.paddingY || '0.8rem',
                paddingBottom: headerDesignVars.contactSection.paddingY || headerDesignVars.navSection.paddingY || '0.8rem',
                borderRadius: currentPodRadius,
              }}
            >
              {/* Button Backdrop that vanishes */}
              <div
                className="absolute inset-0 -z-10 bg-[#8B1E3F] transition-all duration-400 ease-out"
                style={{
                  opacity: 1, // Button should be persistent
                  borderTop: isFlush ? `${headerDesignVars.contactSection.accentLineThickness || '2px'} solid ${headerDesignVars.contactSection.accentLineColor || '#FFFFFF'}` : 'none',
                  boxShadow: (isScrolled || isHovered) ? headerDesignVars.visuals.glassShadow : 'none',
                }}
              />
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
