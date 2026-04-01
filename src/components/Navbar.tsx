import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { ASSETS } from "@/constants/assets";
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from "../config/themeConfig";
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
  megaMenuGroups?: Array<{ title: string; slug?: string; items: SubItem[] }>;
};

// ─── Config tokens ────────────────────────────────────────────────────────────
const NC = {
  wrapper: {
    position: "fixed" as const,
    zIndex: 1000,
    paddingTop: "0rem",
    paddingLeft: LAYOUT_CONTROLS.global.paddingX,
    paddingRight: LAYOUT_CONTROLS.global.paddingX,
    background: "transparent",
  },
  logoTuning: {
    desktop: {
      group: {
        width: { default: "14rem", scrolled: "10rem" },
        scale: { default: 1, scrolled: 0.85 },
        x: { default: "0rem", scrolled: "0rem" },
        y: { default: "0rem", scrolled: "0rem" },
        gap: { default: "0rem", scrolled: "0rem" },
        margin: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "0", scrolled: "0.0625rem" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0.0625rem" },
          left: { default: "0", scrolled: "0" },
        },
      },
      icon: {
        width: { default: "auto", scrolled: "auto" },
        height: { default: "7.4rem", scrolled: "4.65rem" },
        margin: {
          top: { default: "3rem", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "1rem", scrolled: "0.5rem" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "1rem", scrolled: "0.5rem" },
          left: { default: "0", scrolled: "0" },
        },
      },
      text: {
        width: { default: "14rem", scrolled: "13.5rem" },
        height: { default: "auto", scrolled: "auto" },
        margin: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0rem", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
      },
    },
    mobile: {
      group: {
        width: { default: "10.5rem", scrolled: "9.5rem" },
        scale: { default: 1, scrolled: 0.85 },
        x: { default: "0rem", scrolled: "0rem" },
        y: { default: "0rem", scrolled: "0rem" },
        gap: { default: "0rem", scrolled: "0rem" },
        margin: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "0", scrolled: "0.0625rem" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0.0625rem" },
          left: { default: "0", scrolled: "0" },
        },
      },
      icon: {
        width: { default: "auto", scrolled: "auto" },
        height: { default: "4.2rem", scrolled: "3.27rem" },
        margin: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
      },
      text: {
        width: { default: "10.5rem", scrolled: "9.5rem" },
        height: { default: "auto", scrolled: "auto" },
        margin: {
          top: { default: "0.3rem", scrolled: "0.1" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
        padding: {
          top: { default: "0", scrolled: "0" },
          right: { default: "0", scrolled: "0" },
          bottom: { default: "0", scrolled: "0" },
          left: { default: "0", scrolled: "0" },
        },
      },
    },
  },
  backgroundBand: {
    height: "8.5rem", // 136px (Slightly larger strip)
    heightScrolled: "5.625rem", // 90px gives ~1px extra top/bottom breathing room
    topNudgeY: "0rem",
    backgroundTop: "transparent",
    backgroundScrolled: GRADIENTS.HERO_BG,
    borderScrolled: "0.0625rem solid rgba(214,176,92,0.08)",
    boxShadowScrolled: "none",
    transition: "background 0.4s ease, height 0.4s ease, border-color 0.4s ease",
  },
  pill: {
    height: "72px",
    borderRadius: "100px",
    link: {
      color: "rgba(255,255,255,0.9)", // Brighter white
      colorActive: "#D6B05C",
    },
  },
  typography: {
    fontSize: "1rem",
    fontWeight: 300,
    letterSpacing: "0.01em",
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontBody,
  },
  tune: {
    pillNudgeX: "-0.5rem",
    contactNudgeX: "0px",
    contactNudgeY: "0px",
    dropdownOffsetY: "1.25em",
    bridgePaddingLeft: "2rem",
    pillPaddingLeft: "1.5rem",
    pillPaddingRight: "0.375rem",
    pillLinkGap: "0.75em",
    pillLinkPaddingX: "1.125rem",
  },
  dropdown: {
    verticalOffset: "1.25rem",
    minWidth: "17.5rem",
    childMinWidth: "400px",
    itemPaddingX: "1.5rem",
    itemPaddingY: "0.625rem",
    borderRadius: "0 0 12px 12px",
    background: "#1C0D14",
    border: "0.0625rem solid rgba(214,176,92,0.2)",
    boxShadow: "0 1.5rem 5rem rgba(0,0,0,0.85)",
    topAccentHeight: "0.09375rem",
    topAccentColor: "#D6B05C",
    topAccentOpacity: 0.8,
    item: {
      color: "rgba(255,255,255,0.9)", // Match brightness of nav links
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
    paddingX: "1.375rem",
    borderRadius: "100px",
    background: "#6B1530",
    color: "rgba(255,255,255,0.9)",
    text: "Contact Us",
  },
  desktopLayout: {
    enabledMinWidth: 1024,
    axisDefaultY: "4rem", // Centered in 8rem strip
    axisScrolledY: "2.8125rem", // Centered in 5.625rem strip
    collapseBufferPx: 36,
    fallbackLogoWidthPx: 220,
    fallbackPillWidthPx: 640,
    fallbackContactWidthPx: 152,
  },
  mobileToggle: {
    nudgeY: "0rem",
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
  const [showDesktopNav, setShowDesktopNav] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= NC.desktopLayout.enabledMinWidth;
  });

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const logoLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pillRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const toPx = (value: string) => Number.parseFloat(value.replace("px", "")) || 0;

    const evaluateNavFit = () => {
      const viewportWidth = window.innerWidth;
      const desktopThreshold = viewportWidth >= NC.desktopLayout.enabledMinWidth;
      if (!desktopThreshold) {
        setShowDesktopNav(false);
        return;
      }

      const headerEl = headerRef.current;
      const headerStyle = headerEl ? window.getComputedStyle(headerEl) : null;
      const headerPaddingX =
        (headerStyle ? toPx(headerStyle.paddingLeft) + toPx(headerStyle.paddingRight) : 0);

      const logoRect = logoLinkRef.current?.getBoundingClientRect();
      const pillRect = pillRef.current?.getBoundingClientRect();
      const contactRect = contactRef.current?.getBoundingClientRect();

      const pillVisible = !!pillRef.current && window.getComputedStyle(pillRef.current).display !== "none";
      const contactVisible =
        !!contactRef.current && window.getComputedStyle(contactRef.current).display !== "none";

      const logoWidth = (logoRect?.width && logoRect.width > 0)
        ? logoRect.width
        : NC.desktopLayout.fallbackLogoWidthPx;
      const pillWidth = pillVisible && pillRect?.width && pillRect.width > 0
        ? pillRect.width
        : NC.desktopLayout.fallbackPillWidthPx;
      const contactWidth = contactVisible && contactRect?.width && contactRect.width > 0
        ? contactRect.width
        : NC.desktopLayout.fallbackContactWidthPx;

      const requiredWidth =
        logoWidth + pillWidth + contactWidth + headerPaddingX + NC.desktopLayout.collapseBufferPx;

      const hasMeasuredCollision =
        !!logoRect &&
        !!pillRect &&
        !!contactRect &&
        pillVisible &&
        contactVisible &&
        pillRect.width > 0 &&
        contactRect.width > 0 &&
        (pillRect.left <= logoRect.right + NC.desktopLayout.collapseBufferPx ||
          contactRect.left <= pillRect.right + NC.desktopLayout.collapseBufferPx);

      setShowDesktopNav(viewportWidth >= requiredWidth && !hasMeasuredCollision);
    };

    const onResize = () => evaluateNavFit();

    window.addEventListener("resize", onResize, { passive: true });
    evaluateNavFit();

    const timeout = setTimeout(evaluateNavFit, 60);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [scrolled]);

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
      const pillVisible = !!pill && !!pillStyle && pillStyle.display !== "none";
      const pillBottom = pillVisible ? pill.getBoundingClientRect().bottom : 0;
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const rawBottom = Math.max(pillBottom, headerBottom);
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
            slug: c.slug,
            items: c.subCapabilities.map((sub) => ({
              label: sub.name,
              href: `/capabilities/${c.slug}#${sub.slug}`,
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
    const sharedStyles = {
      display: "flex",
      alignItems: "center",
      gap: isPlatformItem ? "0.625rem" : "0.75rem",
      padding: `${NC.dropdown.itemPaddingY} ${NC.dropdown.itemPaddingX}`,
      color: d.color,
      textDecoration: "none",
      transition: `all ${d.transitionDuration} ease`,
    };
    const onMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      e.currentTarget.style.color = d.colorHover;
      e.currentTarget.style.background = "rgba(214,176,92,0.06)";
    };
    const onMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      e.currentTarget.style.color = d.color;
      e.currentTarget.style.background = "transparent";
    };

    const content = (
      <>
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
          fontSize: NC.typography.fontSize,
          fontWeight: NC.typography.fontWeight,
          color: "inherit",
          fontFamily: NC.typography.fontFamily,
          letterSpacing: NC.typography.letterSpacing,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: NC.typography.lineHeight,
          maxWidth: "21.25rem", // 340px
        }}>
          {sub.label}
          {sub.isExternal && (
            <span style={{ fontSize: "0.7rem", opacity: 0.35, marginLeft: "0.35rem" }}>↗</span>
          )}
        </div>
      </>
    );

    if (sub.isExternal) {
      return (
        <a
          key={`${sub.label}-${sub.href}`}
          style={sharedStyles}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          href={sub.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={`${sub.label}-${sub.href}`}
        to={sub.href}
        style={sharedStyles}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
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
        fontSize: NC.typography.fontSize,
        fontWeight: 600,
        fontFamily: NC.typography.fontFamily,
        letterSpacing: NC.typography.letterSpacing,
        whiteSpace: "nowrap",
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
  const logoPhase = scrolled ? "scrolled" : "default";
  const logoTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
  const logoCssTransition = "all 0.42s cubic-bezier(0.22, 1, 0.36, 1)";
  const logoViewport = showDesktopNav ? NC.logoTuning.desktop : NC.logoTuning.mobile;
  const groupLogo = logoViewport.group;
  const iconLogo = logoViewport.icon;
  const textLogo = logoViewport.text;

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
          height: bandHeight,
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
          ref={logoLinkRef}
          to="/"
          className="flex items-center justify-center"
          style={{
            zIndex: 1002,
            pointerEvents: "auto",
            marginTop: groupLogo.margin.top[logoPhase],
            marginRight: groupLogo.margin.right[logoPhase],
            marginBottom: groupLogo.margin.bottom[logoPhase],
            marginLeft: groupLogo.margin.left[logoPhase],
            paddingTop: groupLogo.padding.top[logoPhase],
            paddingRight: groupLogo.padding.right[logoPhase],
            paddingBottom: groupLogo.padding.bottom[logoPhase],
            paddingLeft: groupLogo.padding.left[logoPhase],
            transition: logoCssTransition,
            willChange: "margin, padding, transform",
          }}
        >
          <motion.div
            animate={{ 
              scale: groupLogo.scale[logoPhase],
              x: groupLogo.x[logoPhase],
              y: groupLogo.y[logoPhase],
              width: groupLogo.width[logoPhase],
              gap: groupLogo.gap[logoPhase],
            }}
            transition={logoTransition}
            style={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible"
            }}
          >
            <img
              src={ASSETS.logos.qct.icon}
              alt="QCT Icon"
              style={{
                height: iconLogo.height[logoPhase],
                width: iconLogo.width[logoPhase],
                marginTop: iconLogo.margin.top[logoPhase],
                marginRight: iconLogo.margin.right[logoPhase],
                marginBottom: iconLogo.margin.bottom[logoPhase],
                marginLeft: iconLogo.margin.left[logoPhase],
                paddingTop: iconLogo.padding.top[logoPhase],
                paddingRight: iconLogo.padding.right[logoPhase],
                paddingBottom: iconLogo.padding.bottom[logoPhase],
                paddingLeft: iconLogo.padding.left[logoPhase],
                objectFit: "contain",
                display: "block",
                transition: logoCssTransition,
                willChange: "transform, width, height, margin, padding",
              }}
            />
            <img
              src={ASSETS.logos.qct.textLight}
              alt="QuasarCyberTech"
              style={{
                width: textLogo.width[logoPhase],
                height: textLogo.height[logoPhase],
                marginTop: textLogo.margin.top[logoPhase],
                marginRight: textLogo.margin.right[logoPhase],
                marginBottom: textLogo.margin.bottom[logoPhase],
                marginLeft: textLogo.margin.left[logoPhase],
                paddingTop: textLogo.padding.top[logoPhase],
                paddingRight: textLogo.padding.right[logoPhase],
                paddingBottom: textLogo.padding.bottom[logoPhase],
                paddingLeft: textLogo.padding.left[logoPhase],
                objectFit: "contain",
                display: "block",
                transition: logoCssTransition,
                willChange: "transform, width, height, margin, padding",
              }}
            />
          </motion.div>
        </Link>

        {/* ── FULL-WIDTH BACKGROUND BAND ── */}
        <div
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
          className="items-center"
          style={{
            display: showDesktopNav ? "flex" : "none",
            position: "absolute",
            top: desktopAxisY,
            left: "50%",
            transform: `translate(calc(-50% + ${NC.tune.pillNudgeX}), -50%)`,
            gap: NC.tune.pillLinkGap,
            height: NC.pill.height,
            // paddingLeft always present so nav links never shift on scroll
            padding: `0 ${NC.tune.pillPaddingRight} 0 calc(${NC.tune.bridgePaddingLeft} + ${NC.tune.pillPaddingLeft})`,
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
                    fontSize: NC.typography.fontSize,
                    fontWeight: NC.typography.fontWeight,
                    fontFamily: NC.typography.fontFamily,
                    letterSpacing: NC.typography.letterSpacing,
                    lineHeight: NC.typography.lineHeight,
                    padding: `0 ${NC.tune.pillLinkPaddingX}`,
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
            ref={contactRef}
            style={{
              display: showDesktopNav ? "block" : "none",
              position: "absolute",
              top: desktopAxisY,
              right: NC.wrapper.paddingRight,
              transform: `translate(${NC.tune.contactNudgeX}, calc(-50% + ${NC.tune.contactNudgeY}))`,
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
                fontWeight: NC.typography.fontWeight,
                fontSize: NC.typography.fontSize,
                fontFamily: NC.typography.fontFamily,
                letterSpacing: NC.typography.letterSpacing,
                lineHeight: NC.typography.lineHeight,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#7d1a38"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = NC.contactButton.background; }}
            >
              {NC.contactButton.text}
            </Link>
          </div>

          <button
            className="items-center justify-center p-2 text-white bg-white/5 border border-white/10 rounded-lg"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{
              display: showDesktopNav ? "none" : "flex",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              position: "absolute",
              right: LAYOUT_CONTROLS.global.paddingX,
              top: "50%",
              transform: `translateY(calc(-50% + ${NC.mobileToggle.nudgeY}))`,
            }}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ── DESKTOP DROPDOWNS ── */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className=""
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
              onMouseLeave={closeDropdown}
              style={{
                display: showDesktopNav ? "block" : "none",
                position: "fixed",
                pointerEvents: "auto",
                top: `calc(${NC.wrapper.paddingTop} + ${NC.pill.height} + ${NC.tune.dropdownOffsetY})`,
                left: `${dropdownPos}px`,
                background: NC.dropdown.background,
                border: NC.dropdown.border,
                borderRadius: NC.dropdown.borderRadius,
                boxShadow: NC.dropdown.boxShadow,
                padding: "0.75rem 0 0.25rem 0",
                zIndex: 1010,
              }}
            >
              <DropdownAccent />

              {openMenu === "capabilities" ? (
                <div style={{ display: "flex", flexDirection: "column", width: NC.dropdown.minWidth, position: "relative" }}>
                  {navMenus.find((m) => m.id === "capabilities")?.megaMenuGroups?.map((group, idx) => {
                    const isActive = hoveredMegaGroup === idx;
                    const cap = capabilities[idx];
                    return (
                      <div
                        key={group.title}
                        onMouseEnter={() => setHoveredMegaGroup(idx)}
                        style={{
                          position: "relative",
                          padding: `${NC.dropdown.itemPaddingY} ${NC.dropdown.itemPaddingX}`,
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
                            color: isActive ? COLORS.gold : NC.pill.link.color,
                            fontSize: NC.typography.fontSize,
                            fontWeight: NC.typography.fontWeight,
                            fontFamily: NC.typography.fontFamily,
                            letterSpacing: NC.typography.letterSpacing,
                            lineHeight: NC.typography.lineHeight,
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
                              borderRadius: NC.dropdown.borderRadius,
                              padding: "12px 0 4px 0",
                              width: "max-content",
                              minWidth: NC.dropdown.childMinWidth,
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
            className="fixed inset-0"
            style={{
              top: "5.3125rem", // 85px
              background: "#050505",
              zIndex: 1010,
              overflowY: "auto",
              paddingBottom: "2.5rem", // 40px
              borderTop: "0.0625rem solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="flex flex-col pt-8 gap-4"
              style={{
                paddingLeft: LAYOUT_CONTROLS.global.paddingX,
                paddingRight: LAYOUT_CONTROLS.global.paddingX,
              }}
            >
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
                            sub.isExternal ? (
                              <a
                                key={sub.label}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileOpen(false)}
                                className="text-white hover:text-white text-sm flex items-center gap-2"
                              >
                                {sub.LucideIcon && <sub.LucideIcon size={14} className="text-[#6B1530]" />}
                                {sub.label}
                                <span className="text-[10px] opacity-50">↗</span>
                              </a>
                            ) : (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="text-white hover:text-white text-sm flex items-center gap-2"
                              >
                                {sub.LucideIcon && <sub.LucideIcon size={14} className="text-[#6B1530]" />}
                                {sub.label}
                              </Link>
                            )
                          ))}
                          {menu.id === 'platforms-ecosystem' && (
                            <Link to="/platforms" onClick={() => setIsMobileOpen(false)} className="text-[#D6B05C] text-[13px] font-bold mt-2 flex items-center gap-1 uppercase tracking-wide">
                              Explore platforms <ArrowRight size={12} />
                            </Link>
                          )}
                          {menu.id === 'industries' && (
                            <Link to="/industries" onClick={() => setIsMobileOpen(false)} className="text-[#D6B05C] text-[13px] font-bold mt-2 flex items-center gap-1 uppercase tracking-wide">
                              Explore industries <ArrowRight size={12} />
                            </Link>
                          )}
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
                                className="flex justify-between items-center text-white font-medium text-[15px] mb-3 cursor-pointer"
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
                                    {group.slug && (
                                      <Link
                                        to={`/capabilities/${group.slug}`}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-[#D6B05C] text-[13px] font-bold mt-3 border-t border-white/5 pt-3 flex items-center gap-1 uppercase tracking-wide"
                                      >
                                        Explore in detail <ArrowRight size={12} />
                                      </Link>
                                    )}
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
