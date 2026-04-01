import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Cloud,
  FileCheck,
  Fingerprint,
  Landmark,
  LayoutDashboard,
  Network,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import CapabilityCardSimple from "../../components/capabilities/cards/CapabilityCardSimple";
import Seo from "../../components/seo/Seo";
import {
  capabilityHighlights,
  getCapabilityBySlug,
  platformConfigs,
  type SubCapability,
} from "../../data/capabilitiesData";
import { ASSETS } from "@/constants/assets";
import {
  COLORS,
  GRADIENTS,
  LAYOUT_CONTROLS,
  NAVBAR_HEIGHT,
  TYPOGRAPHY,
} from "../../config/themeConfig";
import NotFound from "../NotFound";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
} from "../../seo/schema";

const splitStep = (step: string) => {
  const firstColon = step.indexOf(":");
  if (firstColon === -1) {
    return { phase: step.trim(), description: "" };
  }
  return {
    phase: step.slice(0, firstColon).trim(),
    description: step.slice(firstColon + 1).trim(),
  };
};

const renderHighlightedText = (
  text: string,
  terms: string[],
  color: string,
) => {
  if (!terms.length) return text;

  const escapedTerms = terms
    .map((term) => term.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!escapedTerms.length) return text;

  const matcher = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const parts = text.split(matcher);

  return parts.map((part, index) => {
    if (matcher.test(part)) {
      matcher.lastIndex = 0;
      return (
        <strong key={`${part}-${index}`} style={{ color }}>
          {part}
        </strong>
      );
    }
    matcher.lastIndex = 0;
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
};

const getFocusAreaIcon = (text: string): LucideIcon => {
  const value = text.toLowerCase();
  if (value.includes("board") || value.includes("executive")) return Users;
  if (value.includes("investment") || value.includes("budget"))
    return TrendingUp;
  if (value.includes("governance")) return Landmark;
  if (value.includes("decision") || value.includes("readiness")) return Target;
  if (
    value.includes("third-party") ||
    value.includes("ecosystem") ||
    value.includes("vendor")
  )
    return Network;
  if (value.includes("architecture") || value.includes("segmentation"))
    return LayoutDashboard;
  if (value.includes("identity") || value.includes("authentication"))
    return Fingerprint;
  if (value.includes("cloud")) return Cloud;
  if (value.includes("policy") || value.includes("compliance"))
    return FileCheck;
  if (value.includes("maturity") || value.includes("kpi")) return BarChart3;
  return ShieldCheck;
};

const getDeliveryStepWatermarkIcon = (text: string): LucideIcon => {
  const value = text.toLowerCase();
  if (value.includes("onboarding") || value.includes("discovery")) return Users;
  if (value.includes("detection") || value.includes("mapping")) return Target;
  if (value.includes("response") || value.includes("alignment"))
    return ShieldCheck;
  if (
    value.includes("reporting") ||
    value.includes("roadmap") ||
    value.includes("delivery")
  )
    return BarChart3;
  return FileCheck;
};

const subCapabilityImages: Record<string, string> = {
  "executive-cyber-advisory":
    ASSETS.capabilities.subCapabilities.advisory.strategy,
  "security-zero-trust-architecture-review":
    ASSETS.capabilities.subCapabilities.advisory.architecture,
  "virtual-ciso-vciso-services":
    ASSETS.capabilities.subCapabilities.advisory.vciso,
  "security-program-development":
    ASSETS.capabilities.subCapabilities.advisory.tabletop,
};

const industryImageMap: Record<string, string> = {
  "Banking & Financial Services": ASSETS.industries.banking,
  "FinTech & Digital Payments": ASSETS.industries.fintech,
  "SaaS & Technology": ASSETS.industries.saas,
  "E-commerce & Digital": ASSETS.industries.ecommerce,
  "E-commerce & Digital Platforms": ASSETS.industries.ecommerce,
  "Healthcare & HealthTech": ASSETS.industries.healthcare,
  "Enterprise & Manufacturing": ASSETS.industries.enterprise,
};

const HS_CAP = {
  sectionPaddingY: "4rem",
  headerBottom: "2.5rem",
  relatedMarginTop: "3.5rem",
  relatedPaddingTop: "2.5rem",
};

const getIndustrySlug = (name: string) => {
  if (name.includes("Banking") || name.includes("Financial")) return "banking";
  if (name.includes("FinTech")) return "fintech";
  if (name.includes("SaaS") || name.includes("Technology")) return "saas";
  if (name.includes("E-commerce") || name.includes("Digital"))
    return "ecommerce";
  if (name.includes("Healthcare") || name.includes("HealthTech"))
    return "healthcare";
  if (name.includes("Enterprise") || name.includes("Manufacturing"))
    return "enterprise";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const getPlatformLogo = (logoKey: string) => {
  const logos: Record<string, string> = {
    qstellarDark: ASSETS.logos.platforms.qstellarDark,
    qstellarLight: ASSETS.logos.platforms.qstellarLight,
    qrgt: ASSETS.logos.platforms.qrgt,
    qrgtLight: ASSETS.logos.platforms.qrgtLight,
    qrgtDark: ASSETS.logos.platforms.qrgtDark,
    qpulseLight: ASSETS.logos.platforms.qpulseLight,
    qleap: ASSETS.logos.platforms.qleap,
  };
  if (logoKey === "qstellarDark") return ASSETS.logos.platforms.qstellarLight;
  return logos[logoKey] || ASSETS.logos.platforms.qstellarLight;
};

const getPlatformScreenshot = (screenshotKey: string) => {
  const screenshots: Record<string, string> = {
    qstellar: ASSETS.platforms.screenshots.qstellar,
    qrgt: ASSETS.platforms.screenshots.qrgt,
    qpulse: ASSETS.platforms.screenshots.qpulse,
    qleap: ASSETS.platforms.screenshots.qleap,
  };
  return screenshots[screenshotKey] || ASSETS.platforms.screenshots.qstellar;
};

const SUBCAPABILITY_VISUAL_CONTROLS = {
  accentColor: "#6B1530",
  accentThickness: "4px",
  topRadius: "0px",
  bottomRadius: "14px",
};

const INDUSTRY_CARD_VISUAL_CONTROLS = {
  accentDefault: "#6B1530",
  accentHover: "#D6B05C",
  accentThickness: "3px",
  topRadius: "0px",
  bottomRadius: "12px",
  titleSize: "clamp(31px, 3.1vw, 40px)",
};

const PLATFORM_VISUAL_CONTROLS = {
  cardBackground:
    "linear-gradient(135deg, rgba(107,21,48,0.94) 0%, rgba(55,24,72,0.93) 44%, rgba(11,31,59,0.95) 100%)",
  cardBorder: "1px solid rgba(214, 176, 92, 0.25)",
  logoHeight: {
    default: 32,
    qstellar: 38,
    qrgt: 52,
    qpulse: 42,
    qleap: 34,
  },
  screenshotHeight: {
    default: 280,
    qstellar: 290,
    qrgt: 340,
    qpulse: 300,
    qleap: 285,
  },
};

const TABBAR_NAV_GAP_PX = 0;
const TABBAR_NAV_TRANSITION = "top 300ms cubic-bezier(0.23, 1, 0.32, 1)";

const subCapabilitySlugAliases: Record<string, Record<string, string>> = {
  "offensive-security": {
    "llm-ai-security-testing": "ai-agentic-system-security-testing",
    "agentic-ai-security-review": "ai-agentic-system-security-testing",
  },
  "cloud-infrastructure": {
    "aws-azure-security-assessment": "aws-azure-gcp-security-assessment",
    "infrastructure-security-reviews":
      "on-premises-hybrid-infrastructure-hardening",
  },
  "managed-defense": {
    "security-monitoring-alerting": "managed-soc",
    "social-engineering-phishing-simulations":
      "user-awareness-social-engineering-simulations",
  },
  "cyber-intelligence": {
    "dark-web-monitoring": "dark-web-brand-intelligence",
    "brand-intelligence": "dark-web-brand-intelligence",
  },
};

const CapabilityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const capability = getCapabilityBySlug(slug || "");
  const [activeSubSlug, setActiveSubSlug] = useState("");
  const [hoveredIndustryCard, setHoveredIndustryCard] = useState<string | null>(
    null,
  );
  const [tabBarMode, setTabBarMode] = useState<"relative" | "fixed">(
    "relative",
  );
  const [dockedTop, setDockedTop] = useState<number>(
    Number.parseInt(NAVBAR_HEIGHT, 10) || 120,
  );
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const capabilityContentRef = useRef<HTMLDivElement | null>(null);
  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stopStickyRef = useRef<HTMLElement | null>(null);
  const subCapabilityStartRef = useRef<HTMLElement | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeSub: SubCapability | null = useMemo(() => {
    if (!capability) return null;
    return (
      capability.subCapabilities.find((s) => s.slug === activeSubSlug) ||
      capability.subCapabilities[0] ||
      null
    );
  }, [capability, activeSubSlug]);

  useEffect(() => {
    const handleTabScroll = () => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    };

    const el = scrollContainerRef.current;
    if (el) {
      handleTabScroll();
      el.addEventListener("scroll", handleTabScroll, { passive: true });
      window.addEventListener("resize", handleTabScroll);
    }
    
    // Slight delay to handle initial layout rendering / fonts
    const timeoutId = setTimeout(handleTabScroll, 150);
    
    return () => {
      clearTimeout(timeoutId);
      if (el) el.removeEventListener("scroll", handleTabScroll);
      window.removeEventListener("resize", handleTabScroll);
    };
  }, [capability, activeSubSlug]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = Math.max(200, scrollContainerRef.current.clientWidth / 2);
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (!capability?.subCapabilities?.length) return;
    const requestedHash = location.hash.replace("#", "");
    const resolvedRequestedTab =
      requestedHash && requestedHash !== "capability-content"
        ? subCapabilitySlugAliases[capability.slug]?.[requestedHash] ||
          requestedHash
        : null;
    const matchedSub =
      resolvedRequestedTab &&
      capability.subCapabilities.find((s) => s.slug === resolvedRequestedTab);
    const fallbackSub = capability.subCapabilities[0];
    const nextSub = matchedSub || fallbackSub;
    setActiveSubSlug(nextSub.slug);
  }, [capability, location.hash]);

  useEffect(() => {
    if (!capability?.subCapabilities?.length) return;
    const sources = capability.subCapabilities
      .map((s) => s.image || subCapabilityImages[s.slug])
      .filter((src): src is string => Boolean(src));
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [capability]);

  useEffect(() => {
    if (!location.hash) return;
    const currentHash = location.hash.replace("#", "");
    if (currentHash !== "capability-content" && currentHash !== activeSubSlug)
      return;
    window.requestAnimationFrame(() => {
      scrollToSubCapabilityTop();
    });
  }, [location.hash, activeSubSlug]);

  useEffect(() => {
    const fallbackNavbarOffset = Number.parseInt(NAVBAR_HEIGHT, 10) || 120;

    const getNavbarBottom = () => {
      const cssVarBottom = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--qct-navbar-bottom")
        .trim();
      const parsedCssVarBottom = Number.parseFloat(
        cssVarBottom.replace("px", ""),
      );
      if (!Number.isNaN(parsedCssVarBottom)) return parsedCssVarBottom;
      const navbarHeader = document.querySelector("header");
      return navbarHeader?.getBoundingClientRect().bottom;
    };

    const updateStickyState = () => {
      if (!capabilityContentRef.current || !tabBarRef.current) return;
      const navbarBottom = getNavbarBottom();
      const navbarOffset = Math.max(
        0,
        (navbarBottom ?? fallbackNavbarOffset) + TABBAR_NAV_GAP_PX,
      );
      const contentTop =
        capabilityContentRef.current.getBoundingClientRect().top +
        window.scrollY;
      const contentBottom =
        capabilityContentRef.current.getBoundingClientRect().bottom +
        window.scrollY;
      const stopBoundary = stopStickyRef.current
        ? stopStickyRef.current.getBoundingClientRect().top + window.scrollY
        : contentBottom;
      const measuredTabHeight = tabBarRef.current.offsetHeight;
      setTabBarHeight((prev) =>
        prev === measuredTabHeight ? prev : measuredTabHeight,
      );
      const scrollY = window.scrollY;
      const fixStart = contentTop - navbarOffset;
      const nextMode: "relative" | "fixed" =
        scrollY >= fixStart ? "fixed" : "relative";
      setTabBarMode((prev) => (prev === nextMode ? prev : nextMode));
      const nextDockedTop = Math.min(navbarOffset, stopBoundary - scrollY);
      setDockedTop((prev) => (prev === nextDockedTop ? prev : nextDockedTop));
    };

    let rafId = 0;
    const requestStickyUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateStickyState();
      });
    };

    updateStickyState();
    window.addEventListener("scroll", requestStickyUpdate, { passive: true });
    window.addEventListener("resize", requestStickyUpdate);
    return () => {
      window.removeEventListener("scroll", requestStickyUpdate);
      window.removeEventListener("resize", requestStickyUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeSubSlug, capability?.platform]);

  if (!capability) return <NotFound />;
  if (!activeSub) return <NotFound />;

  const scrollToSubCapabilityTop = () => {
    if (!subCapabilityStartRef.current) return;
    const fallbackNavbarOffset = Number.parseInt(NAVBAR_HEIGHT, 10) || 120;
    const cssVarBottom = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--qct-navbar-bottom")
      .trim();
    const parsedCssVarBottom = Number.parseFloat(
      cssVarBottom.replace("px", ""),
    );
    const navbarOffset = Number.isNaN(parsedCssVarBottom)
      ? fallbackNavbarOffset
      : Math.max(0, parsedCssVarBottom);
    const tabOffset = tabBarRef.current?.offsetHeight || 0;
    const targetTop =
      subCapabilityStartRef.current.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset -
      tabOffset -
      8;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  const relatedCapabilities = (capability.relatedCapabilities || [])
    .map((relatedSlug) => getCapabilityBySlug(relatedSlug))
    .filter((related): related is NonNullable<typeof related> =>
      Boolean(related),
    );

  const highlightConfig = capabilityHighlights[capability.slug];
  const capabilityTitleHighlights = highlightConfig?.capability || [];
  const subCapabilityTitleHighlights = highlightConfig?.subCapabilities || {};
  const activeVisual =
    activeSub.image || subCapabilityImages[activeSub.slug] || "";
  const platform = capability.platform
    ? platformConfigs[capability.platform]
    : null;
  const activePlatformKey = platform?.id || "default";
  const platformLogoHeight =
    PLATFORM_VISUAL_CONTROLS.logoHeight[
      activePlatformKey as keyof typeof PLATFORM_VISUAL_CONTROLS.logoHeight
    ] || PLATFORM_VISUAL_CONTROLS.logoHeight.default;
  const platformScreenshotHeight =
    PLATFORM_VISUAL_CONTROLS.screenshotHeight[
      activePlatformKey as keyof typeof PLATFORM_VISUAL_CONTROLS.screenshotHeight
    ] || PLATFORM_VISUAL_CONTROLS.screenshotHeight.default;

  return (
    <div className="min-h-screen w-full bg-[#000000]">
      <Seo
        title={capability.name}
        description={activeSub.positioning || capability.heroSubtitle}
        path={`/capabilities/${capability.slug}`}
        image={capability.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Capabilities", path: "/capabilities" },
            { name: capability.name, path: `/capabilities/${capability.slug}` },
          ]),
          createServiceSchema({
            name: capability.name,
            description: capability.heroSubtitle,
            path: `/capabilities/${capability.slug}`,
            image: capability.image,
            serviceType: capability.navLabel,
          }),
          ...((capability.faqs || []).length
            ? [createFaqSchema(capability.faqs || [])]
            : []),
        ]}
      />
      <Navbar />

      <PageHero
        title={renderHighlightedText(
          capability.name,
          capabilityTitleHighlights,
          COLORS.gold,
        )}
        highlight=""
        subtitle={capability.heroSubtitle}
        backgroundOverride={GRADIENTS.CAPABILITIES_OVERVIEW_HERO_BG}
        breadcrumbPaths={["Home", "Capabilities"]}
        currentName={capability.name}
        image={capability.image}
        imageRotate="0deg"
        imageOpacity={0.64}
        visualWidth="58%"
        maskStart="0%"
        maskEnd="80%"
        imageScale={1.3}
        subtitleMaxWidth="640px"
        scrollTargetId="capability-content"
        scrollButtonText="Explore Capability"
      />

      <div
        id="capability-content"
        ref={capabilityContentRef}
        className="w-full bg-[#FFFFFF]"
        style={{ position: "relative" }}
      >
        {/* ── Tab Bar ── */}
        <style
          dangerouslySetInnerHTML={{
            __html: `.qct-tabbar-scroll::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div
          ref={tabBarRef}
          style={{
            position: tabBarMode === "fixed" ? "fixed" : "relative",
            top: tabBarMode === "fixed" ? `${dockedTop}px` : undefined,
            left: tabBarMode === "fixed" ? 0 : undefined,
            right: tabBarMode === "fixed" ? 0 : undefined,
            zIndex: tabBarMode === "fixed" ? 48 : 40,
            backgroundColor: "#FFFFFF",
            boxShadow:
              tabBarMode === "fixed" ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
            borderBottom: "1px solid #6B1530",
            willChange: tabBarMode === "fixed" ? "top" : undefined,
            transition:
              tabBarMode === "fixed" ? TABBAR_NAV_TRANSITION : undefined,
          }}
        >
          {canScrollLeft && (
            <button
              onClick={() => scrollTabs('left')}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center bg-gradient-to-r from-white via-white to-transparent px-2 border-0 cursor-pointer"
              style={{ width: '40px' }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#6B1530]" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollTabs('right')}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center bg-gradient-to-l from-white via-white to-transparent px-2 border-0 cursor-pointer"
              style={{ width: '40px' }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#6B1530]" />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="qct-tabbar-scroll"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
              WebkitOverflowScrolling:
                "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            }}
          >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              minHeight: "52px",
              width: "max-content",
              minWidth: "100%",
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            {capability.subCapabilities.map((subCapability) => {
              const isActive = activeSubSlug === subCapability.slug;
              return (
                <a
                  key={subCapability.slug}
                  href={`/capabilities/${capability.slug}#${subCapability.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSubSlug(subCapability.slug);
                    navigate(
                      { hash: `#${subCapability.slug}` },
                      { replace: true, preventScrollReset: true },
                    );
                    window.requestAnimationFrame(scrollToSubCapabilityTop);
                  }}
                  style={{
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    padding: "0 20px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    fontFamily: TYPOGRAPHY.fontBody,
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    transition: "background 0.15s ease, color 0.15s ease",
                    background: isActive ? "#6B1530" : "transparent",
                    color: isActive ? "#FFFFFF" : "#5B6475",
                    borderRight: "1px solid rgba(107,21,48,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(107,21,48,0.08)";
                      e.currentTarget.style.color = "#6B1530";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#5B6475";
                    }
                  }}
                >
                  {renderHighlightedText(
                    subCapability.name,
                    subCapabilityTitleHighlights[subCapability.slug] || [],
                    isActive ? "#D6B05C" : "#6B1530",
                  )}
                </a>
              );
            })}
          </div>
        </div>
        </div>

        {tabBarMode !== "relative" && (
          <div style={{ height: `${tabBarHeight}px` }} />
        )}

        <section
          ref={subCapabilityStartRef}
          className="w-full bg-[#FFFFFF] pb-20"
        >
          <div
            className="max-w-7xl mx-auto mt-10"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <p
              className="text-xs font-medium mb-3 text-black"
              style={{
                fontFamily: TYPOGRAPHY.fontBody,
                letterSpacing: "0.03em",
              }}
            >
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
              <span className="mx-2 text-black/60">›</span>
              <Link
                to="/capabilities"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Capabilities
              </Link>
              <span className="mx-2 text-black/60">›</span>
              <span className="text-[#6B1530]">{capability.name}</span>
            </p>
          </div>

          <div
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <div className="text-left h-full">
              <div className="mb-6">
                <h2
                  style={{
                    fontFamily: TYPOGRAPHY.fontHeading,
                    fontSize: INDUSTRY_CARD_VISUAL_CONTROLS.titleSize,
                    fontWeight: 800,
                    color: COLORS.deepCyberBlue,
                    marginBottom: "24px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {renderHighlightedText(
                    activeSub.name,
                    subCapabilityTitleHighlights[activeSub.slug] || [],
                    COLORS.burgundy,
                  )}
                </h2>
              </div>
              <p
                className="text-lg text-black/75 mb-6 leading-relaxed text-justify max-w-[66ch]"
                style={{ fontFamily: TYPOGRAPHY.fontBody }}
              >
                {activeSub.positioning}
              </p>

              <h3
                className="text-black text-lg font-bold mb-3"
                style={{ fontFamily: TYPOGRAPHY.fontHeading }}
              >
                What We Assess
              </h3>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"
                style={{ gridAutoRows: "1fr" }}
              >
                {(activeSub.whatWeAssess || []).map((item) => {
                  const Icon = getFocusAreaIcon(item);
                  return (
                    <div key={item} className="group px-2 py-2 h-full">
                      <div className="flex items-center gap-3 h-full">
                        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#6B1530] transition-colors group-hover:text-[#D6B05C]" />
                        </div>
                        <p
                          className="text-sm font-medium text-[#0B1F3B] leading-snug m-0"
                          style={{ fontFamily: TYPOGRAPHY.fontBody }}
                        >
                          {item}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-full">
              <div
                className="relative h-full overflow-hidden"
                style={{
                  minHeight: "clamp(340px, 38vw, 560px)",
                  borderRadius: `0 0 ${SUBCAPABILITY_VISUAL_CONTROLS.bottomRadius} ${SUBCAPABILITY_VISUAL_CONTROLS.bottomRadius}`,
                }}
              >
                {activeVisual && (
                  <div className="absolute inset-0 flex items-start justify-center">
                    <img
                      src={activeVisual}
                      alt={`${activeSub.name} visual`}
                      className="h-full w-full object-contain object-center"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-20 border-t border-white/10"
          style={{ background: GRADIENTS.HERO_BG }}
        >
          <div
            className="max-w-7xl mx-auto text-left"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <h3
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: TYPOGRAPHY.fontHeading }}
            >
              How <span style={{ color: "#D6B05C" }}>QuasarCyberTech</span>{" "}
              Delivers
            </h3>
            <p
              className="text-white/70 text-base mb-10"
              style={{ fontFamily: TYPOGRAPHY.fontBody }}
            >
              A structured delivery sequence that converts assessment insights
              into measurable resilience outcomes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(activeSub.approach || []).map((step, index) => {
                const parsed = splitStep(step);
                const WatermarkIcon = getDeliveryStepWatermarkIcon(
                  parsed.phase,
                );
                return (
                  <div key={`${parsed.phase}-${index}`} className="relative">
                    <div className="relative overflow-hidden border-l-2 border-[#6B1530] pl-3 pr-2 py-1">
                      <WatermarkIcon className="absolute right-2 top-2 w-10 h-10 text-[#D6B05C] opacity-[0.11]" />
                      <p className="text-xs font-mono text-[#D6B05C] m-0">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p
                        className="text-sm font-semibold text-white mt-1 mb-1"
                        style={{ fontFamily: TYPOGRAPHY.fontHeading }}
                      >
                        {parsed.phase}
                      </p>
                      <p
                        className="text-xs text-white/65 leading-relaxed m-0"
                        style={{ fontFamily: TYPOGRAPHY.fontBody }}
                      >
                        {parsed.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="w-full bg-[#F5F7FA] border-t border-gray-200"
          style={{
            paddingTop: HS_CAP.sectionPaddingY,
            paddingBottom: HS_CAP.sectionPaddingY,
          }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <h3
              className="text-left"
              style={{
                fontFamily: TYPOGRAPHY.fontHeading,
                fontSize: INDUSTRY_CARD_VISUAL_CONTROLS.titleSize,
                fontWeight: 800,
                color: COLORS.deepCyberBlue,
                marginBottom: HS_CAP.headerBottom,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: COLORS.burgundy }}>Industry</span>{" "}
              Application
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(activeSub.industries || []).map((industry) => {
                const image = industryImageMap[industry.name];
                const cardKey = `${industry.name}-${industry.description}`;
                const isHovered = hoveredIndustryCard === cardKey;
                return (
                  <Link
                    key={cardKey}
                    to={`/industries/${getIndustrySlug(industry.name)}`}
                    className="border border-black/10 overflow-hidden bg-white transition-all group hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      textDecoration: "none",
                      borderRadius: `${INDUSTRY_CARD_VISUAL_CONTROLS.topRadius} ${INDUSTRY_CARD_VISUAL_CONTROLS.topRadius} ${INDUSTRY_CARD_VISUAL_CONTROLS.bottomRadius} ${INDUSTRY_CARD_VISUAL_CONTROLS.bottomRadius}`,
                    }}
                    onMouseEnter={() => setHoveredIndustryCard(cardKey)}
                    onMouseLeave={() => setHoveredIndustryCard(null)}
                  >
                    <div
                      style={{
                        height: INDUSTRY_CARD_VISUAL_CONTROLS.accentThickness,
                        background: isHovered
                          ? INDUSTRY_CARD_VISUAL_CONTROLS.accentHover
                          : INDUSTRY_CARD_VISUAL_CONTROLS.accentDefault,
                        transition: "background 0.2s ease",
                      }}
                    />
                    <div className="h-40 overflow-hidden relative">
                      {image ? (
                        <img
                          src={image}
                          alt={industry.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6B1530] to-[#0B1F3B]" />
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(160deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)",
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <h4
                          className="font-semibold text-sm text-[#0B1F3B] m-0"
                          style={{ fontFamily: TYPOGRAPHY.fontHeading }}
                        >
                          {industry.name}
                        </h4>
                        <ArrowRight
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          style={{
                            color: isHovered
                              ? INDUSTRY_CARD_VISUAL_CONTROLS.accentHover
                              : INDUSTRY_CARD_VISUAL_CONTROLS.accentDefault,
                          }}
                        />
                      </div>
                      <p
                        className="text-xs text-[#4A5568] leading-relaxed m-0"
                        style={{ fontFamily: TYPOGRAPHY.fontBody }}
                      >
                        {industry.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {relatedCapabilities.length > 0 && (
              <div
                style={{
                  marginTop: HS_CAP.relatedMarginTop,
                  paddingTop: HS_CAP.relatedPaddingTop,
                }}
              >
                <h3
                  className="text-left"
                  style={{
                    fontFamily: TYPOGRAPHY.fontHeading,
                    fontSize: INDUSTRY_CARD_VISUAL_CONTROLS.titleSize,
                    fontWeight: 800,
                    color: COLORS.deepCyberBlue,
                    marginBottom: "14px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Related{" "}
                  <span style={{ color: COLORS.burgundy }}>Capabilities</span>
                </h3>
                <p
                  className="text-[#4A5568] text-sm mb-8 max-w-3xl"
                  style={{ fontFamily: TYPOGRAPHY.fontBody }}
                >
                  Explore adjacent capability pillars commonly delivered
                  alongside this engagement stream.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedCapabilities.slice(0, 3).map((relatedCapability) => (
                    <div key={relatedCapability.slug}>
                      <CapabilityCardSimple
                        title={relatedCapability.name}
                        desc={relatedCapability.cardDescription}
                        href={`/capabilities/${relatedCapability.slug}`}
                        img={relatedCapability.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {platform && (
        <section
          ref={stopStickyRef}
          className="w-full py-14 border-t border-white/10"
          style={{ background: GRADIENTS.HERO_BG }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <h3
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: TYPOGRAPHY.fontHeading }}
            >
              Powered by the{" "}
              <span style={{ color: "#D6B05C" }}>QuasarCyberTech</span>{" "}
              ecosystem
            </h3>
            <p
              className="text-white/70 text-base mb-10"
              style={{ fontFamily: TYPOGRAPHY.fontBody }}
            >
              Platform intelligence that accelerates delivery, strengthens
              execution, and improves measurable outcomes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <img
                  src={getPlatformLogo(platform.logoKey)}
                  alt={platform.name}
                  className="mb-4 w-auto object-contain"
                  style={{ height: `${platformLogoHeight}px` }}
                />
                <h3
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: TYPOGRAPHY.fontHeading }}
                >
                  {platform.description}
                </h3>
                <p
                  className="text-sm text-white/60 mb-6"
                  style={{ fontFamily: TYPOGRAPHY.fontBody }}
                >
                  Our {capability.navLabel} engagements are accelerated by{" "}
                  {platform.name}, combining platform intelligence with advisory
                  and execution delivery.
                </p>
                <ul className="space-y-2 mb-6 list-none p-0 m-0">
                  {platform.highlights.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-white/80"
                      style={{ fontFamily: TYPOGRAPHY.fontBody }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#D6B05C] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#6B1530] text-white text-sm font-medium px-5 py-2.5 rounded-md no-underline transition-colors hover:bg-[#7d1a38]"
                  style={{ fontFamily: TYPOGRAPHY.fontBody }}
                >
                  Explore {platform.name} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div
                className="rounded-lg overflow-hidden border border-white/10"
                style={{ minHeight: `${platformScreenshotHeight}px` }}
              >
                <img
                  src={getPlatformScreenshot(platform.screenshotKey)}
                  alt={`${platform.name} screenshot`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {(capability.faqs || []).length > 0 && (
        <section className="w-full bg-[#FFFFFF] py-16 border-t border-gray-200">
          <div
            className="max-w-7xl mx-auto"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
            }}
          >
            <h3
              className="text-left"
              style={{
                fontFamily: TYPOGRAPHY.fontHeading,
                fontSize: "clamp(30px, 3vw, 40px)",
                fontWeight: 800,
                color: COLORS.deepCyberBlue,
                marginBottom: "10px",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: COLORS.burgundy }}>Questions</span>
            </h3>
            <p
              className="text-[#4A5568] text-sm mb-8"
              style={{ fontFamily: TYPOGRAPHY.fontBody }}
            >
              Answers to common questions for this capability pillar.
            </p>

            <div className="flex flex-col gap-3">
              {(capability.faqs || []).slice(0, 5).map((faq, index) => {
                const itemId = `${capability.slug}-faq-${index}`;
                const isOpen = expandedFaq === itemId;
                return (
                  <article
                    key={itemId}
                    className="border border-black/10 bg-white"
                    style={{ borderRadius: "0 0 10px 10px" }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setExpandedFaq((prev) =>
                          prev === itemId ? null : itemId,
                        )
                      }
                      className="w-full text-left px-5 py-4 bg-transparent border-0 cursor-pointer flex items-start justify-between gap-4"
                    >
                      <span
                        className="text-[#0B1F3B] text-base font-semibold"
                        style={{ fontFamily: TYPOGRAPHY.fontHeading }}
                      >
                        {faq.question}
                      </span>
                      <span
                        className="text-[#6B1530] text-lg leading-none"
                        aria-hidden
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p
                          className="text-sm text-[#4A5568] leading-relaxed m-0"
                          style={{ fontFamily: TYPOGRAPHY.fontBody }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection theme="dark" />
      <Footer />
    </div>
  );
};

export default CapabilityPage;
