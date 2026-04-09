import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import {
  type LucideIcon,
  CheckCircle,
  Target,
  Users,
  TrendingUp,
  Landmark,
  Network,
  LayoutDashboard,
  Fingerprint,
  Cloud,
  FileCheck,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Radio,
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
import { motion, AnimatePresence } from "framer-motion";
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

const CAPABILITY_SEO: Record<string, { title: string; description: string }> = {
  'cyber-advisory': {
    title: 'Cyber Risk Consulting & vCISO Services India | Cyber Advisory',
    description: 'Expert cyber risk management, virtual CISO (vCISO) services, zero trust architecture, and security governance consulting for enterprises in India. Trusted cyber advisory partner for banking, FinTech, and SaaS.',
  },
  'compliance-assurance': {
    title: 'Cybersecurity Compliance Services — RBI, DPDP Act, ISO 27001 India',
    description: 'End-to-end compliance consulting for RBI cybersecurity framework, DPDP Act, ISO 27001, SOC 2 readiness, and SEBI IT guidelines. Trusted cybersecurity compliance auditors in India.',
  },
  'offensive-security': {
    title: 'Leading VAPT & Penetration Testing Services India | Offensive Security',
    description: 'Top-rated VAPT services, web and mobile application penetration testing, API security testing, red teaming, and adversary simulation for enterprises across India. Ethical hacking experts.',
  },
  'cloud-infrastructure': {
    title: 'Cloud Security Services India — AWS, Azure & GCP Security Consulting',
    description: 'Cloud security assessments for AWS, Azure, and GCP. CSPM solutions, Kubernetes security, container security, and cloud compliance consulting. India\'s leading cloud security services provider.',
  },
  'managed-defense': {
    title: 'Managed SOC & MDR Services India | 24/7 Security Monitoring',
    description: '24/7 managed SOC services, MDR (Managed Detection & Response), threat hunting, SIEM monitoring, and incident response services for enterprises in India. SOC as a service experts.',
  },
  'cyber-intelligence': {
    title: 'Cyber Threat Intelligence & Dark Web Monitoring India',
    description: 'Cyber threat intelligence services, dark web monitoring, brand protection, attack surface management, and vulnerability intelligence feeds for Indian enterprises. Stay ahead of adversaries.',
  },
};

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

const toNbsp = (value: string) => value.replace(/ /g, "\u00A0");

const renderHighlightedTabLabel = (
  text: string,
  terms: string[],
  color: string,
) => {
  if (!terms.length) return toNbsp(text);

  const escapedTerms = terms
    .map((term) => term.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!escapedTerms.length) return toNbsp(text);

  const matcher = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const parts = text.split(matcher);

  return parts.map((part, index) => {
    if (matcher.test(part)) {
      matcher.lastIndex = 0;
      return (
        <strong key={`${part}-${index}`} style={{ color }}>
          {toNbsp(part)}
        </strong>
      );
    }
    matcher.lastIndex = 0;
    return <React.Fragment key={`${part}-${index}`}>{toNbsp(part)}</React.Fragment>;
  });
};

// Semantic icon mapping for What We Assess items
const getSemanticIcon = (text: string): LucideIcon => {
  const value = text.toLowerCase();
  
  // Check for explicit metadata [IconName]: Text first
  const iconMatch = text.match(/^\[([A-Za-z0-9]+)\]:\s*(.*)/);
  if (iconMatch) {
    const iconName = iconMatch[1];
    const Icon = (LucideIcons as any)[iconName];
    if (Icon) return Icon;
  }
  
  // Semantic matching based on content keywords
  if (value.includes("board") || value.includes("executive") || value.includes("governance")) return Users;
  if (value.includes("investment") || value.includes("budget") || value.includes("spending")) return TrendingUp;
  if (value.includes("decision") || value.includes("readiness") || value.includes("priority")) return Target;
  if (value.includes("third-party") || value.includes("vendor") || value.includes("ecosystem") || value.includes("supply")) return Network;
  if (value.includes("architecture") || value.includes("design") || value.includes("framework") || value.includes("segmentation")) return LayoutDashboard;
  if (value.includes("identity") || value.includes("authentication") || value.includes("access") || value.includes("credential")) return Fingerprint;
  if (value.includes("cloud") || value.includes("aws") || value.includes("azure") || value.includes("gcp")) return Cloud;
  if (value.includes("policy") || value.includes("compliance") || value.includes("regulation") || value.includes("requirement")) return FileCheck;
  if (value.includes("metric") || value.includes("maturity") || value.includes("kpi") || value.includes("assessment") || value.includes("score")) return BarChart3;
  if (value.includes("risk") || value.includes("threat") || value.includes("vulnerability") || value.includes("incident")) return Landmark;
  
  return ShieldCheck;
};

// Track used icons per subcap to ensure uniqueness
const getUniqueIconForIndex = (text: string, index: number, allTexts: string[]): LucideIcon => {
  // Get semantic icon based on current text
  const semanticIcon = getSemanticIcon(text);
  
  // Check if this icon is already used for a different text in the same subcap
  const usedForOtherText = allTexts
    .slice(0, index)
    .some((otherText, otherIndex) => 
      otherText !== text && getSemanticIcon(otherText) === semanticIcon
    );
  
  // If already used for different text, cycle to next unique icon
  if (usedForOtherText) {
    const fallbackIcons = [Target, Landmark, Network, LayoutDashboard, Fingerprint];
    return fallbackIcons[index % fallbackIcons.length];
  }
  
  return semanticIcon;
};

const getFocusAreaIcon = (text: string, index: number = 0, allTexts: string[] = []): LucideIcon => {
  return getUniqueIconForIndex(text, index, allTexts.length > 0 ? allTexts : [text]);
};

const getFocusAreaText = (text: string): string => {
  const iconMatch = text.match(/^\[([A-Za-z0-9]+)\]:\s*(.*)/);
  return iconMatch ? iconMatch[2] : text;
};

const DELIVERY_WATERMARK_FALLBACK_ICONS: LucideIcon[] = [
    Radio,
  Target,
  ShieldCheck,
  BarChart3,
  FileCheck,
  Users,
  Network,
  LayoutDashboard,
  Cloud,
  Fingerprint,
  Landmark,
  TrendingUp,
];

const getDeliverySemanticIcon = (text: string): LucideIcon => {
  const value = text.toLowerCase();

  if (value.includes("discover") || value.includes("onboard") || value.includes("stakeholder")) return Users;
  if (value.includes("alert") || value.includes("notif") || value.includes("monitor")) return Radio;
  if (value.includes("threat") || value.includes("hunt") || value.includes("risk") || value.includes("priority")) return Target;
  if (value.includes("respond") || value.includes("mitigation") || value.includes("contain") || value.includes("remediation")) return ShieldCheck;
  if (value.includes("govern") || value.includes("policy") || value.includes("compliance")) return Landmark;
  if (value.includes("effect") || value.includes("control") || value.includes("check") || value.includes("validat")) return FileCheck;
  if (value.includes("architecture") || value.includes("design") || value.includes("blueprint")) return LayoutDashboard;
  if (value.includes("identity") || value.includes("access") || value.includes("authentication")) return Fingerprint;
  if (value.includes("cloud") || value.includes("infrastructure") || value.includes("platform")) return Cloud;
  if (value.includes("vendor") || value.includes("third-party") || value.includes("ecosystem")) return Network;
  if (value.includes("dashboard") || value.includes("report") || value.includes("metric") || value.includes("kpi")) return BarChart3;
  if (value.includes("roadmap") || value.includes("maturity") || value.includes("improvement") || value.includes("invest")) return TrendingUp;

  return FileCheck;
};

const getDeliveryStepWatermarkIcon = (
  stepText: string,
  index: number,
  allSteps: string[],
): LucideIcon => {
  const used = new Set<LucideIcon>();
  for (let i = 0; i < index; i += 1) {
    const previousSemantic = getDeliverySemanticIcon(allSteps[i]);
    used.add(previousSemantic);
  }

  const semantic = getDeliverySemanticIcon(stepText);
  if (!used.has(semantic)) return semantic;

  const fallback = DELIVERY_WATERMARK_FALLBACK_ICONS.find((icon) => !used.has(icon));
  return fallback || semantic;
};

const subCapabilityImages: Record<string, string> = {
  // Advisory & Governance
  "executive-cyber-advisory": ASSETS.capabilities.subCapabilities.advisory.strategy,
  "security-zero-trust-architecture-review": ASSETS.capabilities.subCapabilities.advisory.architecture,
  "virtual-ciso-vciso-services": ASSETS.capabilities.subCapabilities.advisory.vciso,
  "security-program-development": ASSETS.capabilities.subCapabilities.advisory.tabletop,
  "third-party-supply-chain-risk-management": ASSETS.capabilities.subCapabilities.advisory.supplyChain,

  // Compliance & Assurance
  "regulatory-gap-assessment": ASSETS.capabilities.subCapabilities.compliance.regulatoryGapAssessment,
  "risk-compliance-monitoring": ASSETS.capabilities.subCapabilities.compliance.riskMonitoring,
  "rbi-cyber-security-framework-compliance": ASSETS.capabilities.subCapabilities.compliance.rbiCompliance,
  "dpdp-act-compliance": ASSETS.capabilities.subCapabilities.compliance.dpdpCompliance,
  "soc2-readiness": ASSETS.capabilities.subCapabilities.threatIntelligence.soc2,

  // Offensive Security
  "web-application-security-testing": ASSETS.capabilities.subCapabilities.offensive.web,
  "mobile-application-security-testing": ASSETS.capabilities.subCapabilities.offensive.mobile,
  "api-security-testing": ASSETS.capabilities.subCapabilities.offensive.api,
  "red-team": ASSETS.capabilities.subCapabilities.offensive.redTeam,
  "adversary-simulation": ASSETS.capabilities.subCapabilities.offensive.simulation,
  "secure-code-review": ASSETS.capabilities.subCapabilities.offensive.secureCodeReview,
  "ai-agentic-system-security-testing": ASSETS.capabilities.subCapabilities.offensive.aiSecurity,

  // Cloud & Infrastructure
  "cloud-security-assessments": ASSETS.capabilities.subCapabilities.cloud.cloudAssessment,
  "aws-azure-gcp-security-assessment": ASSETS.capabilities.subCapabilities.cloud.cloudAssessment,
  "cloud-security-posture-management-cspm": ASSETS.capabilities.subCapabilities.cloud.cspm,
  "kubernetes-container-security": ASSETS.capabilities.subCapabilities.cloud.containerSecurity,
  "on-premises-hybrid-infrastructure-hardening": ASSETS.capabilities.subCapabilities.cloud.cloudHardening,
  "cloud-compliance-review": ASSETS.capabilities.subCapabilities.compliance.regulatoryGapAssessment, // Fallback

  // Managed Defense
  "managed-soc": ASSETS.capabilities.subCapabilities.managedDefense.managedSOC,
  "incident-response": ASSETS.capabilities.subCapabilities.managedDefense.incidentResponse,
  "threat-hunting": ASSETS.capabilities.subCapabilities.threatIntelligence.threatHunting,
  "user-awareness-social-engineering-simulations": ASSETS.capabilities.subCapabilities.managedDefense.socialEngineering,

  // Cyber Intelligence
  "cyber-threat-intelligence-cti-service": ASSETS.capabilities.subCapabilities.threatIntelligence.ctiNew,
  "dark-web-brand-intelligence": ASSETS.capabilities.subCapabilities.threatIntelligence.darkWebNew,
  "attack-surface-intelligence": ASSETS.capabilities.subCapabilities.threatIntelligence.attackSurface,
  "vulnerability-research-security-advisories": ASSETS.capabilities.subCapabilities.threatIntelligence.vulnerabilityResearch,
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
  tabBar: {
    desktopHeight: "3.75rem",
    desktopFontSize: "clamp(12px, 1.2vw, 14px)",
  },
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
  infographicCropBottomDesktop: "0.75rem",
  infographicCropBottomMobile: "0.5rem",
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

const OFFENSIVE_SUBCAPABILITY_ORDER = [
  "red-team",
  "ai-agentic-system-security-testing",
  "web-application-security-testing",
  "mobile-application-security-testing",
  "api-security-testing",
  "adversary-simulation",
  "secure-code-review",
];

const subCapabilitySlugAliases: Record<string, Record<string, string>> = {
  "cyber-advisory": {
    "strategy-governance": "executive-cyber-advisory",
    "zero-trust": "security-zero-trust-architecture-review",
    "vciso": "virtual-ciso-vciso-services",
    "program-development": "security-program-development",
    "third-party-risk": "third-party-supply-chain-risk-management",
  },
  "compliance-assurance": {
    "gap-assessment": "regulatory-gap-assessment",
    "monitoring": "risk-compliance-monitoring",
    "rbi": "rbi-cyber-security-framework-compliance",
    "dpdp": "dpdp-act-compliance",
    "soc2": "soc2-readiness",
  },
  "offensive-security": {
    "web": "web-application-security-testing",
    "mobile": "mobile-application-security-testing",
    "api": "api-security-testing",
    "red-team-simulation": "red-team",
    "adversary-simulation": "adversary-simulation",
    "secure-code": "secure-code-review",
    "ai-agentic-system-security-testing": "ai-agentic-system-security-testing",
    "llm-ai-security-testing": "ai-agentic-system-security-testing",
    "agentic-ai-security-review": "ai-agentic-system-security-testing",
  },
  "cloud-infrastructure": {
    "assessments": "cloud-security-assessments",
    "cspm": "cloud-security-posture-management-cspm",
    "kubernetes": "kubernetes-and-container-security",
    "hardening": "on-premises-hybrid-infrastructure-hardening",
    "aws-azure-security-assessment": "aws-azure-gcp-security-assessment",
    "infrastructure-security-reviews": "on-premises-hybrid-infrastructure-hardening",
  },
  "managed-defense": {
    "soc": "managed-soc",
    "security-monitoring-alerting": "managed-soc",
    "incident-response": "incident-response-and-digital-forensics",
    "social-engineering": "user-awareness-social-engineering-simulations",
    "social-engineering-phishing-simulations": "user-awareness-social-engineering-simulations",
  },
  "cyber-intelligence": {
    "cti": "cyber-threat-intelligence-cti-as-a-service",
    "vulnerability-intelligence": "vulnerability-research-and-security-advisories",
    "dark-web": "dark-web-brand-intelligence",
    "brand-protection": "dark-web-brand-intelligence",
    "dark-web-monitoring": "dark-web-brand-intelligence",
    "brand-intelligence": "dark-web-brand-intelligence",
    "asm": "attack-surface-intelligence",
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
  const stopStickyRef = useRef<HTMLDivElement | null>(null);
  const subCapabilityStartRef = useRef<HTMLElement | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    setExpandedFaq(null);
  }, [activeSubSlug]);

  const orderedSubCapabilities = useMemo(() => {
    if (!capability) return [];
    if (capability.slug !== "offensive-security") {
      return capability.subCapabilities;
    }

    const orderLookup = new Map(
      OFFENSIVE_SUBCAPABILITY_ORDER.map((item, index) => [item, index]),
    );

    return [...capability.subCapabilities].sort((a, b) => {
      const aOrder = orderLookup.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const bOrder = orderLookup.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder;
    });
  }, [capability]);

  const activeSub: SubCapability | null = useMemo(() => {
    if (!capability) return null;
    return (
      orderedSubCapabilities.find((s) => s.slug === activeSubSlug) ||
      orderedSubCapabilities[0] ||
      null
    );
  }, [capability, activeSubSlug, orderedSubCapabilities]);

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
    if (!orderedSubCapabilities.length || !capability) return;
    const requestedHash = location.hash.replace("#", "");
    const resolvedRequestedTab =
      requestedHash && requestedHash !== "capability-content"
        ? subCapabilitySlugAliases[capability.slug]?.[requestedHash] ||
          requestedHash
        : null;
    const matchedSub =
      resolvedRequestedTab &&
      orderedSubCapabilities.find((s) => s.slug === resolvedRequestedTab);
    const fallbackSub = orderedSubCapabilities[0];
    const nextSub = matchedSub || fallbackSub;
    setActiveSubSlug(nextSub.slug);
  }, [capability, location.hash, orderedSubCapabilities]);

  useEffect(() => {
    if (!orderedSubCapabilities.length) return;
    const sources = orderedSubCapabilities
      .map((s) => s.image || subCapabilityImages[s.slug])
      .filter((src): src is string => Boolean(src));
    sources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [orderedSubCapabilities]);

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
  const activePlatformId = activeSub.platform || capability.platform;
  const platform = activePlatformId
    ? platformConfigs[activePlatformId]
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
        title={CAPABILITY_SEO[capability.slug]?.title || capability.name}
        description={CAPABILITY_SEO[capability.slug]?.description || activeSub.positioning || capability.heroSubtitle}
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
          ...((activeSub.faqs || []).length
            ? [createFaqSchema(activeSub.faqs || [])]
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
        imagePositionX="center"
        imagePositionY="center"
        imageBlendSoftness="70%"
        imageBlendStartPercent="0%"
        visualWidth="58%"
        maskStart="0%"
        maskEnd="80%"
        imageScale={1.3}
        subtitleMaxWidth="640px"
        scrollTargetId="capability-content"
        scrollButtonText="Explore Capability"
        scrollMethod="motion"
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
              minHeight: HS_CAP.tabBar.desktopHeight,
              width: "max-content",
              minWidth: "100%",
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
              justifyContent: orderedSubCapabilities.length <= 4 ? "center" : "flex-start",
            }}
          >
            {orderedSubCapabilities.map((subCapability) => {
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
                    
                    // Center the clicked element in the tab bar
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    });
                  }}
                  style={{
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    padding: "0 22px",
                    minWidth: "160px",
                    height: HS_CAP.tabBar.desktopHeight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                    fontFamily: TYPOGRAPHY.fontBody,
                    fontSize: HS_CAP.tabBar.desktopFontSize,
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
                  {renderHighlightedTabLabel(
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
            className="w-full mt-10"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
              boxSizing: "border-box",
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
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
              boxSizing: "border-box",
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
                {(activeSub.whatWeAssess || []).map((item, index) => {
                  const Icon = getFocusAreaIcon(item, index, activeSub.whatWeAssess || []);
                  const cleanText = getFocusAreaText(item);
                  
                  return (
                    <div key={item} className="group px-2 py-2 h-full">
                      <div className="flex items-center gap-3 h-full">
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white/40 rounded-lg border border-black/5 shadow-sm group-hover:border-[#6B1530]/30 transition-all duration-300">
                          <Icon 
                            className="w-5 h-5 text-[#6B1530] transition-all duration-300 group-hover:scale-110 group-hover:text-[#D6B05C]" 
                            style={{
                              filter: "drop-shadow(0 0 8px rgba(107,21,48,0.2))",
                            }}
                          />
                        </div>
                        <p
                          className="text-sm font-medium text-[#0B1F3B] leading-snug m-0"
                          style={{ fontFamily: TYPOGRAPHY.fontBody }}
                        >
                          {cleanText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-full">
              <div
                className="subcap-visual-frame relative h-full overflow-hidden"
                style={{
                  minHeight: "clamp(340px, 38vw, 560px)",
                  borderRadius: `0 0 ${SUBCAPABILITY_VISUAL_CONTROLS.bottomRadius} ${SUBCAPABILITY_VISUAL_CONTROLS.bottomRadius}`,
                  ["--subcap-infographic-crop-bottom" as string]:
                    SUBCAPABILITY_VISUAL_CONTROLS.infographicCropBottomDesktop,
                }}
              >
                {activeVisual && (
                  <div className="absolute inset-0 flex items-start justify-center">
                    <img
                      src={activeVisual}
                      alt={`QuasarCyberTech | ${activeSub.name}`}
                      className="subcap-visual-image h-full w-full object-contain object-center"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      style={{
                        clipPath:
                          "inset(0 0 var(--subcap-infographic-crop-bottom) 0)",
                        WebkitClipPath:
                          "inset(0 0 var(--subcap-infographic-crop-bottom) 0)",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-20 border-t border-white/10"
          style={{ background: GRADIENTS.CAPABILITIES_DETAIL_DELIVERY_BG }}
        >
          <div
            className="w-full text-left"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
              boxSizing: "border-box",
            }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ 
                fontFamily: TYPOGRAPHY.fontHeading,
                overflowWrap: "anywhere",
                wordBreak: "break-word"
              }}
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
              {(activeSub.approach || []).map((step, index, allSteps) => {
                const parsed = splitStep(step);
                const WatermarkIcon = getDeliveryStepWatermarkIcon(
                  `${parsed.phase} ${parsed.description}`,
                  index,
                  allSteps,
                );
                return (
                  <div key={`${parsed.phase}-${index}`} className="relative">
                    <div className="relative overflow-hidden border-l-2 border-[#6B1530] pl-3 pr-2 py-1">
                      <WatermarkIcon className="absolute right-2 top-[30%] -translate-y-1/2 w-14 h-14 text-[#D6B05C] opacity-[0.15]" />
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
            className="w-full"
            style={{
              paddingLeft: LAYOUT_CONTROLS.section.paddingX,
              paddingRight: LAYOUT_CONTROLS.section.paddingX,
              boxSizing: "border-box",
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

            <div className="industry-application-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <div className="industry-card-media h-40 overflow-hidden relative">
                      {image ? (
                        <img
                          src={image}
                          alt={`QuasarCyberTech | ${industry.name} Industry`}
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
                    <div className="industry-card-content p-4">
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
                        className="industry-card-description text-xs text-[#4A5568] leading-relaxed m-0"
                        style={{ fontFamily: TYPOGRAPHY.fontBody }}
                      >
                        {industry.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {platform && (
              <div
                className="w-full border-t border-white/10"
                style={{
                  marginTop: HS_CAP.relatedMarginTop,
                  padding: "3rem",
                  background: GRADIENTS.CAPABILITIES_DETAIL_PLATFORM_BG,
                  borderRadius: "0.75rem",
                }}
              >
                <h3
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{
                    fontFamily: TYPOGRAPHY.fontHeading,
                    overflowWrap: "anywhere",
                    wordBreak: "break-word"
                  }}
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

                <div className="cap-platform-ecosystem-grid grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="cap-platform-ecosystem-content order-2 md:order-1">
                    <img
                      src={getPlatformLogo(platform.logoKey)}
                      alt={`QuasarCyberTech | ${platform.name} Platform Logo`}
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
                      Our {activeSub.name} engagements are accelerated by{" "}
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
                    className="cap-platform-ecosystem-shot order-1 md:order-2 rounded-lg overflow-hidden border border-white/10"
                    style={{ minHeight: `${platformScreenshotHeight}px` }}
                  >
                    <img
                      src={getPlatformScreenshot(platform.screenshotKey)}
                      alt={`QuasarCyberTech | ${platform.name} Platform Screenshot`}
                      className="cap-platform-ecosystem-shot-img w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {(activeSub.faqs || []).length > 0 && (
              <div className="w-full bg-[#FFFFFF] py-16 border-t border-gray-200" style={{ marginTop: "2.5rem" }}>
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
                  style={{ fontFamily: TYPOGRAPHY.fontBody, fontWeight: 700 }}
                >
                  Answers to common questions for {activeSub.name}.
                </p>

                <div className="flex flex-col gap-3">
                  {(activeSub.faqs || []).slice(0, 5).map((faq, index) => {
                    const itemId = `${activeSub.slug}-faq-${index}`;
                    const isOpen = expandedFaq === itemId;
                    return (
                      <article
                        key={itemId}
                        className="border border-black/10 bg-white overflow-hidden"
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
                          className="w-full text-left px-5 py-4 bg-transparent border-0 cursor-pointer flex items-start justify-between gap-4 hover:bg-[#F5F7FA] transition-colors"
                        >
                          <span
                            className="text-[#0B1F3B] text-base font-bold"
                            style={{ fontFamily: TYPOGRAPHY.fontBody }}
                          >
                            {faq.question}
                          </span>
                          <span
                            className="text-[#6B1530] text-lg leading-none flex-shrink-0 transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            aria-hidden
                          >
                            ▼
                          </span>
                        </button>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{
                            overflow: 'hidden',
                          }}
                        >
                          <div className="px-5 pb-5">
                            <p
                              className="text-sm text-[#4A5568] leading-relaxed m-0"
                              style={{ fontFamily: TYPOGRAPHY.fontBody }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

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

                <div className="related-capability-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedCapabilities.slice(0, 3).map((relatedCapability) => (
                    <div key={relatedCapability.slug}>
                      <CapabilityCardSimple
                        title={relatedCapability.name}
                        mobileTitle={relatedCapability.navLabel}
                        desc={relatedCapability.cardDescription}
                        href={`/capabilities/${relatedCapability.slug}`}
                        img={relatedCapability.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={stopStickyRef} style={{ height: 1, width: "100%" }} />
          </div>
        </section>
      </div>

      <CTASection theme="dark" />
      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 40rem) {
              .subcap-visual-frame {
                --subcap-infographic-crop-bottom: ${SUBCAPABILITY_VISUAL_CONTROLS.infographicCropBottomMobile} !important;
              }
            }

            @media (max-width: 40rem) {
              .cap-platform-ecosystem-grid {
                gap: 1.25rem !important;
              }

              .cap-platform-ecosystem-shot {
                min-height: 0 !important;
                height: auto !important;
              }

              .cap-platform-ecosystem-shot-img {
                width: 100% !important;
                height: auto !important;
                display: block;
                object-fit: cover !important;
              }

              .industry-application-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 0.875rem !important;
              }

              .industry-application-grid a {
                min-height: 15.5rem;
                display: flex;
                flex-direction: column;
              }

              .industry-card-media {
                height: 60% !important;
              }

              .industry-card-content {
                height: 40% !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                padding: 0.75rem !important;
              }

              .industry-card-description {
                display: none !important;
              }

              .related-capability-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 0.875rem !important;
              }

              .related-capability-grid .capability-card-simple {
                min-height: 22.5rem !important;
              }

              .related-capability-grid .capability-card-media {
                height: 9.375rem !important;
                flex-shrink: 0 !important;
              }

              .related-capability-grid .capability-card-content {
                flex: 1 !important;
                justify-content: flex-start !important;
              }
            }
          `,
        }}
      />
    </div>
  );
};

export default CapabilityPage;
