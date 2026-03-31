import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { ASSETS } from "@/constants/assets";
import { COLORS, GRADIENTS, TYPOGRAPHY } from "../config/themeConfig";
import { navigationConfig } from "../config/navigationConfig";
import { capabilities } from "../data/capabilitiesData";

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Config tokens ────────────────────────────────────────────────────────────
const NC = {
  wrapper: {
    position: "fixed" as const,
    zIndex: 1000,
    paddingTop: "0px",
    paddingLeft: "2em",
    paddingRight: "2em",
    background: "transparent",
  },
  logoGroup: {
    width: "160px",
    shiftYScrolled: "-10px",
  },
  logoIcon: {
    width: "58px",
    height: "58px",
    marginTop: "1.5em",
    scaleScrolled: 1,
  },
  logoText: {
    width: "160px",
    marginTop: "0.625em",
  },
  backgroundBand: {
    height: "104px",
    heightScrolled: "84px",
    topNudgeY: "0px",
    backgroundTop: "transparent",
    backgroundScrolled: GRADIENTS.HERO_BG,
    borderScrolled: "1px solid rgba(214,176,92,0.08)",
    boxShadowScrolled: "none",
    transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
  },
  pill: {
    height: "72px",
    paddingLeft: "8px",
    paddingRight: "6px",
    borderRadius: "100px",
    gap: "0.6em",
    nudgeX: "1em",
    link: {
      paddingX: "16px",
      color: "rgba(255,255,255,0.80)",
      colorActive: "#D6B05C",
      fontSize: "14px",
      fontWeight: 400,
      letterSpacing: "0.01em",
    },
  },
  dropdown: {
    verticalOffset: "1.25em",
    background: "#1C0D14",
    border: "1px solid rgba(214,176,92,0.2)",
    boxShadow: "0 24px 80px rgba(0,0,0,0.85)",
    topAccentHeight: "1.5px",
    topAccentColor: "#D6B05C",
    topAccentOpacity: 0.8,
    item: {
      color: "rgba(255,255,255,0.78)",
      colorHover: "#D6B05C",
      transitionDuration: "0.15s",
    },
  },
  scroll: {
    logoTextHideAt: 80,
    duration: "300ms",
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
  },
  contactButton: {
    height: "46px",
    paddingX: "22px",
    borderRadius: "100px",
    background: "#6B1530",
    color: "#FFFFFF",
    text: "Contact Us",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  desktopLayout: {
    enabledMinWidth: 1024,
    axisDefaultY: "52px",
    axisScrolledY: "42px",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredMegaGroup, setHoveredMegaGroup] = useState<number | null>(0);

  // Mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<number | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLElement | null>(null);
  const lastPublishedBottomRef = useRef<number>(-1);
  const navRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dropdownPos, setDropdownPos] = useState<number>(0);

  // ── Mobile body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobileOpen]);

  // ── Close mobile on route change ──
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // ── Scroll state ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NC.scroll.logoTextHideAt);

    const onForceScrolled = () => setScrolled(true);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("qct:force-scrolled", onForceScrolled);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("qct:force-scrolled", onForceScrolled);
    };
  }, []);

  // ── Publish navbar bottom CSS variable for sticky tab bar ──
  useEffect(() => {
    const publish = () => {
      const pill = pillRef.current;
      const header = headerRef.current;
      const pillStyle = pill ? window.getComputedStyle(pill) : null;
      const canUsePill = !!pill && !!pillStyle && pillStyle.display !== "none";
      const rawBottom = canUsePill
        ? pill.getBoundingClientRect().bottom
        : (header?.getBoundingClientRect().bottom ?? 0);
      const bottom = Math.max(0, rawBottom);
      if (Math.abs(bottom - lastPublishedBottomRef.current) < 0.25) return;
      lastPublishedBottomRef.current = bottom;
      document.documentElement.style.setProperty("--qct-navbar-bottom", `${bottom.toFixed(2)}px`);
      window.dispatchEvent(new CustomEvent("qct:navbar-metrics", { detail: { bottom } }));
    };

    const runFor = (ms: number) => {
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        publish();
        if (now - start < ms) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    publish();
    let stop = runFor(420);

    const restart = () => { stop(); stop = runFor(420); };
    const onResize = () => publish();
    const onScroll = () => publish();
    const headerEl = headerRef.current;

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    headerEl?.addEventListener("transitionrun", restart);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      headerEl?.removeEventListener("transitionrun", restart);
    };
  }, [scrolled, isMobileOpen, openMenu]);

  // ── Dropdown helpers ──
  const updateDropdownPos = (id: string) => {
    const el = navRefs.current[id];
    if (!el) return;
    setDropdownPos(el.getBoundingClientRect().left);
  };

  const openDropdown = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
    if (id === "capabilities") setHoveredMegaGroup(0);
    updateDropdownPos(id);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setHoveredMegaGroup(null);
    }, 200);
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // ── Nav data ──
  const navMenus: NavMenu[] = useMemo(() => {
    return navigationConfig.map((item) => {
      const id = item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (item.label === "Capabilities") {
        return {
          id,
          label: item.label,
          href: item.href,
          megaMenuGroups: capabilities.map((c) => ({
            title: c.navLabel,
            items: c.subCapabilities.map((sub) => ({
              label: sub.name,
              href: `/capabilities/${c.slug}?tab=${sub.slug}#capability-content`,
              desc: sub.shortDescription,
            })),
          })),
        };
      }
      return {
        id,
        label: item.label,
        href: item.href,
        subItems: item.subItems as SubItem[] | undefined,
        megaMenuGroups: (item as any).megaMenuGroups,
      };
    });
  }, []);

  const isActivePath = (href: string) =>
    location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

  // ─── Renderers ───────────────────────────────────────────────────────────────
  const renderDropdownItem = (sub: SubItem, hideIcon = false, isPlatformItem = false) => {
    const d = NC.dropdown.item;
    return (
      <Link
        key={`${sub.label}-${sub.href}`}
        to={sub.href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: isPlatformItem ? "10px" : "12px",
          padding: "10px 24px",
          color: d.color,
          textDecoration: "none",
          transition: `all ${d.transitionDuration} ease`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = d.colorHover;
          e.currentTarget.style.background = "rgba(214,176,92,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = d.color;
          e.currentTarget.style.background = "transparent";
        }}
      >
        {!hideIcon && !isPlatformItem && (
          sub.icon ? (
            <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center" }}>
              <img src={sub.icon} alt="" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
            </div>
          ) : sub.LucideIcon ? (
            <sub.LucideIcon size={17} color="#D6B05C" style={{ flexShrink: 0, opacity: 0.7 }} />
          ) : null
        )}
        <div style={{
          fontSize: "0.84rem",
          fontWeight: "500",
          color: "inherit",
          fontFamily: TYPOGRAPHY.fontBody,
          letterSpacing: "0.01em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.35,
          maxWidth: "340px",
        }}>
          {sub.label}
          {sub.isExternal && <span style={{ fontSize: "0.7rem", opacity: 0.35 }}>↗</span>}
        </div>
      </Link>
    );
  };

  const DropdownAccent = () => (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: NC.dropdown.topAccentHeight,
      background: NC.dropdown.topAccentColor,
      opacity: NC.dropdown.topAccentOpacity,
      zIndex: 10,
    }} />
  );

  const renderExploreLink = (label: string, href: string, opts?: { clearMegaGroupOnHover?: boolean }) => (
    <Link
      to={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "8px",
        minHeight: "42px",
        padding: "0 24px",
        borderTop: "1px solid rgba(214,176,92,0.15)",
        color: COLORS.gold,
        fontSize: "0.8rem",
        fontWeight: "600",
        fontFamily: TYPOGRAPHY.fontBody,
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (opts?.clearMegaGroupOnHover && openMenu === "capabilities") setHoveredMegaGroup(null);
        e.currentTarget.style.color = "#FFF";
        e.currentTarget.style.background = "rgba(214,176,92,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = COLORS.gold;
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
      <ArrowRight size={12} />
    </Link>
  );

  // ─── Desktop background band style values ───────────────────────────────────
  const bandBg = scrolled
    ? NC.backgroundBand.backgroundScrolled
    : NC.backgroundBand.backgroundTop;
  const bandBorder = scrolled ? NC.backgroundBand.borderScrolled : "none";
  const bandShadow = scrolled ? NC.backgroundBand.boxShadowScrolled : "none";
  const bandHeight = scrolled
    ? NC.backgroundBand.heightScrolled
    : NC.backgroundBand.height;
  const desktopAxisY = scrolled
    ? NC.desktopLayout.axisScrolledY
    : NC.desktopLayout.axisDefaultY;

  // ─── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <header
        ref={headerRef}
        className="flex items-center justify-between"
        style={{
          position: NC.wrapper.position,
          top: 0,
          left: 0,
          right: 0,
          zIndex: NC.wrapper.zIndex,
          background: isMobileOpen ? "#050505" : NC.wrapper.background,
          paddingTop: NC.wrapper.paddingTop,
          paddingLeft: NC.wrapper.paddingLeft,
          paddingRight: NC.wrapper.paddingRight,
          transition: `background 0.3s ease`,
          pointerEvents: "none",
        }}
      >
        {/* ── ZONE 1: LOGO ── */}
        <Link
          to="/"
          className="flex flex-col items-center"
          style={{
            width: NC.logoGroup.width,
            transform: scrolled ? `translateY(${NC.logoGroup.shiftYScrolled})` : "translateY(0)",
            transition: `transform ${NC.scroll.duration} ${NC.scroll.easing}`,
            zIndex: 1002,
            pointerEvents: "auto",
          }}
        >
          <img
            src={ASSETS.logos.qct.icon}
            alt="QCT"
            style={{
              height: NC.logoIcon.height,
              width: NC.logoIcon.width,
              marginTop: NC.logoIcon.marginTop,
              transform: scrolled ? `scale(${NC.logoIcon.scaleScrolled})` : "scale(1)",
              transformOrigin: "center center",
              transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
              display: "block",
            }}
          />
          <AnimatePresence>
            {(!scrolled || isMobileOpen) && (
              <motion.div
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                style={{ overflow: "hidden" }}
              >
                <img
                  src={ASSETS.logos.qct.textLight}
                  alt="QuasarCyberTech"
                  style={{
                    width: NC.logoText.width,
                    height: "auto",
                    display: "block",
                    marginTop: NC.logoText.marginTop,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* ── FULL-WIDTH DESKTOP BACKGROUND BAND ── */}
        <div
          className="hidden lg:block"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: NC.backgroundBand.topNudgeY,
            left: 0,
            right: 0,
            height: bandHeight,
            transform: "none",
            borderRadius: "0",
            background: bandBg,
            borderTop: bandBorder,
            borderBottom: bandBorder,
            boxShadow: bandShadow,
            transition: NC.backgroundBand.transition,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        />

        {/* ── ZONE 2: NAV CONTENT ── */}
        <nav
          ref={pillRef}
          data-qct-navbar-pill="true"
          className="hidden lg:flex items-center"
          style={{
            position: "absolute",
            top: desktopAxisY,
            left: "50%",
            transform: `translate(calc(-50% + ${NC.pill.nudgeX}), -50%)`,
            gap: NC.pill.gap,
            height: NC.pill.height,
            // paddingLeft always present so nav links never shift on scroll
            padding: `0 ${NC.pill.paddingRight} 0 ${NC.pill.paddingLeft}`,
            borderRadius: NC.pill.borderRadius,
            background: "transparent",
            border: "none",
            boxShadow: "none",
            transition: `top ${NC.scroll.duration} ${NC.scroll.easing}, color 0.2s ease`,
            zIndex: 1001,
            pointerEvents: "auto",
          }}
        >
          {navMenus.map((menu) => {
            const hasDropdown = Boolean(menu.subItems?.length || menu.megaMenuGroups?.length);
            const active = isActivePath(menu.href);
            return (
              <div
                key={menu.id}
                ref={(el) => { navRefs.current[menu.id] = el; }}
                style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
                onMouseEnter={() => hasDropdown && openDropdown(menu.id)}
                onMouseLeave={() => hasDropdown && closeDropdown()}
              >
                <Link
                  to={menu.href}
                  style={{
                    color: active || hoveredLink === menu.id ? NC.pill.link.colorActive : NC.pill.link.color,
                    fontSize: NC.pill.link.fontSize,
                    padding: `0 ${NC.pill.link.paddingX}`,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={() => setHoveredLink(menu.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {menu.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={10}
                      style={{
                        transition: "transform 0.2s",
                        transform: openMenu === menu.id ? "rotate(180deg)" : "none",
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* ── ZONE 3: CONTACT + MOBILE TOGGLE ── */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 1002,
          }}
        >
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: desktopAxisY,
              right: NC.wrapper.paddingRight,
              transform: "translateY(-50%)",
              transition: `top ${NC.scroll.duration} ${NC.scroll.easing}`,
            }}
          >
            <Link
              to="/contact"
              style={{
                height: NC.contactButton.height,
                padding: `0 ${NC.contactButton.paddingX}`,
                borderRadius: NC.contactButton.borderRadius,
                background: NC.contactButton.background,
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "none",
                color: NC.contactButton.color,
                display: "flex",
                position: "relative",
                zIndex: 1004,
                alignItems: "center",
                textDecoration: "none",
                fontWeight: NC.contactButton.fontWeight,
                fontSize: NC.contactButton.fontSize,
                fontFamily: TYPOGRAPHY.fontBody,
                letterSpacing: NC.contactButton.letterSpacing,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#7d1a38"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = NC.contactButton.background; }}
            >
              {NC.contactButton.text}
            </Link>
          </div>

          <button
            className="flex lg:hidden items-center justify-center p-2 text-white bg-white/5 border border-white/10 rounded-lg"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── DESKTOP DROPDOWNS ── */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
              onMouseLeave={closeDropdown}
              style={{
                position: "fixed",
                pointerEvents: "auto",
                top: `calc(${NC.wrapper.paddingTop} + ${NC.pill.height} + ${NC.dropdown.verticalOffset})`,
                left: `${dropdownPos}px`,
                background: NC.dropdown.background,
                border: NC.dropdown.border,
                borderRadius: "0 0 12px 12px",
                boxShadow: NC.dropdown.boxShadow,
                padding: "12px 0 4px 0",
                zIndex: 1010,
              }}
            >
              <DropdownAccent />

              {openMenu === "capabilities" ? (
                <div style={{ display: "flex", flexDirection: "column", width: "220px", position: "relative" }}>
                  {navMenus.find((m) => m.id === "capabilities")?.megaMenuGroups?.map((group, idx) => {
                    const isActive = hoveredMegaGroup === idx;
                    const cap = capabilities[idx];
                    return (
                      <div
                        key={group.title}
                        onMouseEnter={() => setHoveredMegaGroup(idx)}
                        style={{
                          position: "relative",
                          padding: "10px 24px",
                          cursor: "pointer",
                          background: isActive ? "rgba(214,176,92,0.06)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link
                          to={`/capabilities/${cap.slug}`}
                          style={{
                            textDecoration: "none",
                            color: isActive ? COLORS.gold : "rgba(255,255,255,0.85)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {group.title}
                        </Link>
                        <ChevronRight size={14} style={{ color: isActive ? COLORS.gold : "#FFF" }} />
                        {isActive && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-12px",
                              left: "100%",
                              marginLeft: "8px",
                              background: NC.dropdown.background,
                              border: NC.dropdown.border,
                              borderRadius: "0 0 12px 12px",
                              padding: "12px 0 4px 0",
                              width: "max-content",
                              minWidth: "400px",
                              boxShadow: NC.dropdown.boxShadow,
                              zIndex: 1011,
                              cursor: "default",
                            }}
                          >
                            <DropdownAccent />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              {group.items.map((item) =>
                                renderDropdownItem(item, true)
                              )}
                              <div style={{ padding: "0" }}>
                                {renderExploreLink(
                                  "Explore in detail",
                                  `/capabilities/${cap.slug}`,
                                  { clearMegaGroupOnHover: false }
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div style={{ padding: "0" }}>
                    {renderExploreLink("Explore all capabilities", "/capabilities", { clearMegaGroupOnHover: true })}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {navMenus
                    .find((m) => m.id === openMenu)
                    ?.subItems?.map((item) =>
                      renderDropdownItem(item, false, openMenu === "platforms-ecosystem")
                    )}
                  <div style={{ padding: "0" }}>
                    {openMenu === "platforms-ecosystem" && renderExploreLink("Explore platforms", "/platforms")}
                    {openMenu === "industries" && renderExploreLink("Explore industries", "/industries")}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MOBILE MENU DRAWER ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 lg:hidden"
            style={{
              top: "85px",
              background: "#050505",
              zIndex: 1010,
              overflowY: "auto",
              paddingBottom: "40px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex flex-col px-6 pt-8 gap-4">
              {navMenus.map((menu) => {
                const hasSubItems = menu.subItems && menu.subItems.length > 0;
                const isMegaMenu = menu.megaMenuGroups && menu.megaMenuGroups.length > 0;
                const isExpanded = mobileExpandedMenu === menu.id;

                return (
                  <div key={menu.id} className="border-b border-white/10 pb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        if (hasSubItems || isMegaMenu) {
                          setMobileExpandedMenu(isExpanded ? null : menu.id);
                        }
                      }}
                    >
                      {hasSubItems || isMegaMenu ? (
                        <span className="text-white text-lg font-medium">{menu.label}</span>
                      ) : (
                        <Link
                          to={menu.href}
                          className="text-white text-lg font-medium w-full"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {menu.label}
                        </Link>
                      )}
                      {(hasSubItems || isMegaMenu) && (
                        <ChevronDown
                          className="text-white/50 transition-transform duration-300"
                          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && hasSubItems && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col gap-3 mt-4 pl-4 overflow-hidden"
                        >
                          {menu.subItems?.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="text-white/70 hover:text-white text-sm flex items-center gap-2"
                            >
                              {sub.LucideIcon && <sub.LucideIcon size={14} className="text-[#D6B05C]" />}
                              {sub.label}
                              {sub.isExternal && <span className="text-[10px] opacity-50">↗</span>}
                            </Link>
                          ))}
                        </motion.div>
                      )}

                      {isExpanded && isMegaMenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col mt-4 gap-4 overflow-hidden"
                        >
                          {menu.megaMenuGroups?.map((group, gIdx) => (
                            <div key={group.title} className="pl-4 border-l border-white/10">
                              <div
                                className="flex justify-between items-center text-[#D6B05C] font-medium text-sm mb-3 cursor-pointer"
                                onClick={() => setMobileExpandedGroup(mobileExpandedGroup === gIdx ? null : gIdx)}
                              >
                                {group.title}
                                <ChevronDown
                                  size={14}
                                  style={{
                                    transform: mobileExpandedGroup === gIdx ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "0.3s",
                                  }}
                                />
                              </div>
                              <AnimatePresence>
                                {mobileExpandedGroup === gIdx && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="flex flex-col gap-3 overflow-hidden pl-2"
                                  >
                                    {group.items.map((item) => (
                                      <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-white/60 hover:text-white text-sm flex items-center gap-2"
                                      >
                                        {item.LucideIcon && (
                                          <item.LucideIcon size={14} className="text-white/40" />
                                        )}
                                        {item.label}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                          <Link
                            to="/capabilities"
                            onClick={() => setIsMobileOpen(false)}
                            className="text-[#D6B05C] text-sm font-semibold mt-2 pl-4 flex items-center gap-1"
                          >
                            Explore all capabilities <ArrowRight size={12} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-6 flex justify-center items-center h-[48px] rounded-md font-bold text-sm w-full"
                style={{ background: NC.contactButton.background, color: NC.contactButton.color }}
              >
                {NC.contactButton.text}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
