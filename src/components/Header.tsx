import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Shield, Users, BookOpen, FileText, Book, AlertTriangle, Briefcase, Target, ClipboardCheck, Server, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoSymbol from '../assets/Logos/Logo_Cropped-cropped.svg';
import logoText from '../assets/Logos/Dark_QuasarCyberTech_Text_Only_Logo_Over.png';
import { navigationConfig } from '../config/navigationConfig';

import { themeConfig } from '../config/themeConfig';

// ---------------------------------------------------------
// HEADER & NAVBAR CONFIGURATION
// Modify these variables to easily tune the entire layout, 
// transparency, dimensions, and speeds of the whole navbar!
// ---------------------------------------------------------
const headerDesignVars = themeConfig.header;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const lastScrollY = useRef(0);
  const mouseY = useRef(window.innerHeight); // default to bottom so it doesn't trigger immediately

  // 1. Unified Scroll Handler
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Add a buffer so it doesn't hide immediately after leaving hero
      if (currentScrollY > headerDesignVars.interactions.scrollBuffer) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          if (!isHovered) {
            setIsVisible(false);
            setIsMobileMenuOpen(false);
          }
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // At the top or within top X px buffer
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered]);

  // 2. Mouse Reveal Handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If the mouse gets close to the top of the browser, seamlessly reveal the navbar!
      if (e.clientY < headerDesignVars.interactions.mouseRevealZone) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Autohide Timeout logic
  useEffect(() => {
    let timeoutId: any; // Use any to avoid NodeJS.Timeout error in browser environment

    if (isScrolled && isVisible && !isHovered) {
      timeoutId = setTimeout(() => {
        // ONLY autohide if the mouse is safely outside the reveal zone
        if (mouseY.current > headerDesignVars.interactions.mouseRevealZone && !isHovered) {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
        }
      }, headerDesignVars.interactions.autoHideDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [isScrolled, isVisible, isHovered]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };


  const isFlush = headerDesignVars.global.layoutStyle === 'flush';
  const isSolid = isScrolled || isHovered;

  const currentPodRadius = isFlush ? '0px 0px 1.5rem 1.5rem' : '9999px';

  // Base styling injected properly without nesting issues
  const baseGlassStyle = {
    backgroundColor: `rgba(var(--bg-white-rgb, ${headerDesignVars.visuals.glassBgColor || '255, 255, 255'}), var(--navbar-bg-opacity, ${headerDesignVars.visuals.glassBgOpacity || 0.98}))`,
    backdropFilter: `blur(var(--navbar-blur, ${headerDesignVars.visuals.glassBlurAmount || '8px'}))`,
    WebkitBackdropFilter: `blur(var(--navbar-blur, ${headerDesignVars.visuals.glassBlurAmount || '8px'}))`,
    border: 'none',
    borderTop: isFlush ? `${headerDesignVars.global.flushAccentThickness || '3px'} solid ${headerDesignVars.global.accentColor || '#7A0F2A'}` : 'none',
    boxShadow: `${headerDesignVars.visuals.glassInnerShadow ? headerDesignVars.visuals.glassInnerShadow + ', ' : ''}${headerDesignVars.visuals.glassShadow}`,
    opacity: (isScrolled || isHovered) ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  const transparentStyle = baseGlassStyle;

  return (
    <header
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      style={{
        marginTop: headerDesignVars.global.marginTop,
        transitionProperty: 'all',
        transitionDuration: headerDesignVars.interactions.hideSpeed,
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <div
        className="max-w-[1920px] mx-auto w-full"
        style={{ paddingLeft: headerDesignVars.global.sideMargin, paddingRight: headerDesignVars.global.sideMargin }}
      >
        {/* pointer-events-none lets clicks pass through the spacing, pointer-events-auto restores on actual elements */}
        <div className="flex items-start w-full pointer-events-none relative">

          {/* Left Pod: Logo */}
          <div
            className="flex-none"
            style={{
              position: 'relative',
              width: headerDesignVars.logoSection.width,
              marginTop: headerDesignVars.logoSection.marginTop,
              left: headerDesignVars.logoSection.offsetX,
              transform: `scale(${headerDesignVars.logoSection.scale || 1})`,
              transformOrigin: 'top left'
            }}
          >
            <Link
              to="/"
              className={`block z-10 pointer-events-auto relative transition-transform duration-[length:400ms] ease-in-out origin-top scale-100`}
            >
              <div className="flex flex-col items-center">
                {/* Tight Circular/Flush Scrolled Backdrop strictly behind the symbol */}
                <div
                  className={`relative flex items-center justify-center shrink-0 ${isFlush ? '' : 'rounded-full'}`}
                  style={{ padding: headerDesignVars.logoSection.padding || '0px' }}
                >
                  <div
                    className={`absolute inset-0 -z-10 transition-all duration-[length:400ms] overflow-hidden bg-[#FCFBF9] ${isFlush ? 'rounded-b-3xl rounded-t-none' : 'rounded-full'}`}
                    style={{
                      borderTop: isFlush ? `${headerDesignVars.global.flushAccentThickness || '3px'} solid ${headerDesignVars.global.accentColor || '#8B1E3F'}` : 'none',
                      opacity: (isScrolled || isHovered) ? 1 : 1, // Logo backdrop should be persistent
                      boxShadow: (isScrolled || isHovered) ? headerDesignVars.visuals.glassShadow : 'none',
                    }}
                  />
                  <img src={logoSymbol} alt="Quasar CyberTech Logo" className="h-[3.75rem] w-[3.75rem] sm:h-[4.25rem] sm:w-[4.25rem] object-contain drop-shadow-sm relative z-10" />
                </div>

                <div className={`flex items-center justify-center transition-all duration-[length:400ms] overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-[3rem] opacity-100 mt-2'}`}>
                  <img src={logoText} alt="Quasar CyberTech" className="h-[1.3rem] sm:h-[1.5rem] w-auto object-contain" />
                </div>
              </div>
            </Link>
          </div>

          {/* Middle Pod: Desktop Navigation */}
          <div
            className="hidden lg:flex flex-1 justify-center pointer-events-none"
            style={{
              marginTop: headerDesignVars.navSection.marginTop || '0.25rem',
              position: 'relative',
              left: headerDesignVars.navSection.offsetX,
              transform: `scale(${headerDesignVars.navSection.scale || 1})`,
              transformOrigin: 'top center'
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
                      className={`md-typescale-label-large flex items-center gap-1.5 ${isActive ? 'text-[#7A0F2A]' : 'text-[#0F172A]'} group-hover/navitem:text-[#7A0F2A] transition-colors duration-200 relative group/linktext whitespace-nowrap`}
                    >
                      <span className="relative">
                        {link.label}
                        {/* Active Underline Effect just under the text span */}
                        <span
                          className={`absolute -bottom-1 left-0 w-full ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/navitem:scale-x-100'} origin-left transition-transform duration-300`}
                          style={{
                            height: headerDesignVars.navSection.underlineThickness || '2px',
                            backgroundColor: headerDesignVars.global.accentColor || '#7A0F2A'
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
                                <div className="mb-3 w-10 h-10 rounded-lg bg-[#8B1E3F]/5 border border-[#8B1E3F]/10 text-[#8B1E3F] flex items-center justify-center shrink-0 group-hover/subitem:bg-[#8B1E3F] group-hover/subitem:text-white transition-colors duration-300">
                                  <subItem.LucideIcon size={20} strokeWidth={1.5} />
                                </div>
                              ) : null}

                              <h4 className="md-typescale-label-medium text-slate-900 mb-1 group-hover/subitem:text-[#8B1E3F] transition-colors tracking-tight">
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

          {/* Right Pod: CTA Button */}
          <div
            className="hidden lg:flex flex-none items-center justify-end pointer-events-none"
            style={{
              marginTop: headerDesignVars.contactSection.marginTop || '0.25rem',
              position: 'relative',
              left: headerDesignVars.contactSection.offsetX,
              transform: `scale(${headerDesignVars.contactSection.scale || 1})`,
              transformOrigin: 'top right'
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-auto p-2 mt-4 text-[#0F172A] rounded-full hover:bg-gray-100 transition-colors pointer-events-auto"
            aria-label="Toggle menu"
            style={isScrolled ? baseGlassStyle : transparentStyle}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 overflow-hidden pointer-events-auto"
              style={{
                ...baseGlassStyle,
                borderRadius: headerDesignVars.dropdowns.borderRadius
              }}
            >
              <div className="flex flex-col p-4 max-h-[70vh] overflow-y-auto">
                {navigationConfig.map((link) => (
                  <div key={link.href} className="flex flex-col border-b border-gray-100 last:border-0 py-2">
                    <Link
                      to={link.href}
                      className="px-4 py-2 text-sm font-bold text-[#0F172A] hover:text-[#8B1E3F] rounded-lg transition-colors"
                      onClick={(e) => {
                        handleNavClick(e, link.href);
                        if (!link.subItems) setIsMobileMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                    {link.subItems && (
                      <div className="flex flex-col pl-6 py-2 gap-3">
                        {link.subItems.map(subItem => {
                          const content = (
                            <>
                              <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center text-[#8B1E3F]">
                                {subItem.icon ? (
                                  <img src={subItem.icon} className="h-6 w-auto object-contain" alt="" />
                                ) : subItem.LucideIcon ? (
                                  <subItem.LucideIcon size={16} />
                                ) : null}
                              </div>
                              <span className="text-[13px] font-medium text-slate-700 group-hover/mob:text-[#8B1E3F]">
                                {subItem.label}
                              </span>
                            </>
                          );

                          return subItem.isExternal ? (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors group/mob"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {content}
                            </a>
                          ) : (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="px-4 py-2 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors group/mob"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/contact"
                  className="mx-4 mt-6 mb-2 py-3 bg-[#8B1E3F] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#6B1530] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;