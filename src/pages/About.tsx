import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import MilestonesJourney from "../components/MilestonesJourney";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import {
  Target,
  ShieldCheck,
  ShieldAlert,
  Settings,
  ArrowRight,
} from "lucide-react";
import {
  COLORS,
  GRADIENTS,
  TYPOGRAPHY,
  LAYOUT_CONTROLS,
  SECTION_BACKGROUNDS,
  ALPHAS,
  BRAND_CONTROLS,
  SHADOWS,
} from "../config/themeConfig";
import { ASSETS } from "@/constants/assets";
import { industriesData } from "../data/industriesData";
import Seo from "../components/seo/Seo";
import { createBreadcrumbSchema, createAboutPageSchema } from "../seo/schema";
import { Link } from "react-router-dom";

const METRIC_ANIMATION_DURATION = 1.2;
const METRIC_CONTROLS = {
  tilePaddingY: "20px",
  tilePaddingX: "16px",
  valueBlockBottomGap: "12px",
  underlineGapY: "10px",
  metricNumberFontSize: "clamp(2rem, 6.1vw, 3.25rem)",
  metricLabelFontSize: "clamp(0.7rem, 1.9vw, 0.75rem)",
  metricLabelMaxWidth: "min(11rem, 100%)",
  metricLabelMaxWidthMonitoring: "min(11.5rem, 100%)",
  metricLabelMaxWidthVulnerabilities: "min(18em, 100%)",
  metricGridGapY: "32px",
  metricGridGapX: "0px",
};
const DEFAULT_MAP_SCALE = 190;
const DEFAULT_MAP_CENTER: [number, number] = [0, 24];
const MAP_LEGEND_HEIGHT = 46;
const LOCATION_ZOOM_CONFIG: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  Nashik: { center: [78.5, 21.5], zoom: 3 },
  Dallas: { center: [-96.9, 32.8], zoom: 3.3 },
};
const ABOUT_DESKTOP_SIDE_MARGIN = "3rem";

const getAboutMetricLabelMaxWidth = (label: string) => {
  if (label.includes("Vulnerabilities")) return METRIC_CONTROLS.metricLabelMaxWidthVulnerabilities;
  if (label.includes("Monitoring")) return METRIC_CONTROLS.metricLabelMaxWidthMonitoring;
  return METRIC_CONTROLS.metricLabelMaxWidth;
};

/* ─── Metrics Helper ─── */
const MetricRow: React.FC<{
  value: number;
  label: string;
  suffix: string;
  delay: number;
}> = ({ value, label, suffix, delay }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let animationFrame: number;
    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const p = Math.min(
          (timestamp - startTimestamp) / (METRIC_ANIMATION_DURATION * 1000),
          1,
        );
        setCount(Math.floor(p * value));
        if (p < 1) animationFrame = window.requestAnimationFrame(step);
      };
      animationFrame = window.requestAnimationFrame(step);
    }, delay * 1000);
    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [value, delay, isInView]);

  const renderSuffix = () => {
    if (suffix === "\u00D77" || suffix.toLowerCase() === "x7") {
      return (
        <span style={{ display: "inline-flex", alignItems: "baseline" }}>
          <span
            style={{
              ...TYPOGRAPHY.metricNumber,
              color: BRAND_CONTROLS.metricsSymbolColor,
              fontSize: METRIC_CONTROLS.metricNumberFontSize,
            }}
          >
            {suffix === "\u00D77" ? "\u00D7" : "x"}
          </span>
          <span
            style={{
              ...TYPOGRAPHY.metricNumber,
              color: BRAND_CONTROLS.metricsNumberColor,
              fontSize: METRIC_CONTROLS.metricNumberFontSize,
            }}
          >
            7
          </span>
        </span>
      );
    }
    return (
      <span
        style={{
          ...TYPOGRAPHY.metricNumber,
          color: BRAND_CONTROLS.metricsSymbolColor,
          marginLeft: "4px",
          fontSize: METRIC_CONTROLS.metricNumberFontSize,
        }}
      >
        {suffix}
      </span>
    );
  };

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        position: "relative",
        width: "100%",
        padding: `${METRIC_CONTROLS.tilePaddingY} ${METRIC_CONTROLS.tilePaddingX}`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: METRIC_CONTROLS.valueBlockBottomGap,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              ...TYPOGRAPHY.metricNumber,
              fontSize: METRIC_CONTROLS.metricNumberFontSize,
              color: BRAND_CONTROLS.metricsNumberColor,
            }}
          >
            {value > 999 ? count.toLocaleString() : count}
          </span>
          {renderSuffix()}
        </div>
        <div
          style={{
            width: "100%",
            marginTop: METRIC_CONTROLS.underlineGapY,
            marginBottom: METRIC_CONTROLS.underlineGapY,
            height: "3px",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: BRAND_CONTROLS.metricsUnderlineColor,
            }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{
              duration: METRIC_ANIMATION_DURATION,
              delay,
              ease: "linear",
            }}
          />
        </div>
      </div>
      <div
        style={{
          ...TYPOGRAPHY.metricLabel,
          fontSize: METRIC_CONTROLS.metricLabelFontSize,
          color: BRAND_CONTROLS.metricsLabelColor,
          lineHeight: 1.45,
          maxWidth: getAboutMetricLabelMaxWidth(label),
          margin: "0 auto",
          whiteSpace: "normal",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label.replace(/\n/g, " ")}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function About() {
  const geoUrl = "/data/countries-110m.json";
  const [activeLocation, setActiveLocation] = React.useState<string | null>(
    null,
  );
  const [hoveredMapNode, setHoveredMapNode] = React.useState<string | null>(
    null,
  );

  const officeLocations = [
    {
      name: "Nashik",
      coordinates: [73.7898, 19.9975] as [number, number],
      label: "office" as const,
    },
    {
      name: "Dallas",
      coordinates: [-96.797, 32.7767] as [number, number],
      label: "office" as const,
    },
  ];
  const mapNodes = officeLocations;
  const officeArcSegments: any[] = [];

  const targetMapView = React.useMemo(() => {
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation])
      return LOCATION_ZOOM_CONFIG[activeLocation];
    return { center: DEFAULT_MAP_CENTER, zoom: 1 };
  }, [activeLocation]);

  const [mapView, setMapView] = React.useState<{
    center: [number, number];
    zoom: number;
  }>({ center: DEFAULT_MAP_CENTER, zoom: 1 });
  const mapViewRef = React.useRef(mapView);
  React.useEffect(() => {
    mapViewRef.current = mapView;
  }, [mapView]);

  const markerStableZoom = React.useMemo(() => {
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation])
      return LOCATION_ZOOM_CONFIG[activeLocation].zoom;
    return mapView.zoom;
  }, [activeLocation, mapView.zoom]);

  React.useEffect(() => {
    const startCenter = mapViewRef.current.center;
    const startZoom = mapViewRef.current.zoom;
    const endCenter = targetMapView.center;
    const endZoom = targetMapView.zoom;
    const startTs = performance.now();
    const durationMs = 700;
    let rafId = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startTs) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setMapView({
        center: [
          startCenter[0] + (endCenter[0] - startCenter[0]) * eased,
          startCenter[1] + (endCenter[1] - startCenter[1]) * eased,
        ],
        zoom: startZoom + (endZoom - startZoom) * eased,
      });
      if (progress < 1) rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, [targetMapView.center, targetMapView.zoom]);

  const getGlassStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
    boxShadow: isActive ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
    backdropFilter: "blur(6px)",
    transition: "all 0.24s ease",
  });

  const aboutMetrics = [
    { value: 60, suffix: "+", label: "Security Engagements" },
    { value: 2000, suffix: "+", label: "Security Vulnerabilities Reported" },
    { value: 100, suffix: "%", label: "Client Retention" },
    { value: 24, suffix: "x7", label: "Security Operations\nMonitoring" },
  ];

  const sectionPad = {
    paddingLeft: ABOUT_DESKTOP_SIDE_MARGIN,
    paddingRight: ABOUT_DESKTOP_SIDE_MARGIN,
  };

  const whyChooseUs = [
    {
      icon: ShieldAlert,
      title: "Proactive Engagement",
      desc: "We identify and address risks before they escalate, embedding threat-aware thinking into every layer of your operations.",
    },
    {
      icon: Target,
      title: "Outcome-Driven Delivery",
      desc: "Every engagement is measured by its business impact, not just findings, but actionable security improvements.",
    },
    {
      icon: ShieldCheck,
      title: "Standards-Aligned Approach",
      desc: "Our methodology aligns with ISO 27001, NIST, SOC 2, PCI-DSS, and regional frameworks for comprehensive compliance.",
    },
    {
      icon: Settings,
      title: "Tailored Solutions",
      desc: "No two enterprises are the same. We architect security programs around your unique risk profile and growth trajectory.",
    },
  ];

  const WHY_CARD_WATERMARK_CONTROLS = {
    size: 110,
    right: "10px",
    bottom: "10px",
    opacity: 0.18,
  };

  const ecosystemPlatforms = [
    {
      name: "QStellar",
      badge: "ASSET INTELLIGENCE",
      logo: ASSETS.logos.platforms.qstellarLight,
      screenshot: ASSETS.platforms.screenshots.qstellar,
      subtitle:
        "AI-powered asset visibility and vulnerability intelligence platform",
      highlights: [],
      ctaText: "Explore in Detail",
      link: "/platforms?scroll=platform-highlights",
      external: false,
      styles: { logoHeight: "2.25rem", screenshotFit: "cover" as const },
    },
    {
      name: "QPulse",
      badge: "THREAT INTELLIGENCE",
      logo: ASSETS.logos.platforms.qpulseLight,
      screenshot: ASSETS.platforms.screenshots.qpulse,
      subtitle: "Cybersecurity intelligence and regulatory insights portal",
      highlights: [],
      ctaText: "Explore in Detail",
      link: "/platforms?scroll=qpulse",
      external: false,
      styles: { logoHeight: "3.125rem", screenshotFit: "cover" as const },
    },
    {
      name: "QRGT",
      badge: "PTAAS PLATFORM",
      logo: ASSETS.logos.platforms.qrgtDark,
      screenshot: ASSETS.platforms.screenshots.qrgt,
      subtitle:
        "Continuous, governed Penetration Testing as a Service (PTaaS) platform",
      highlights: [],
      ctaText: "Explore in Detail",
      link: "/platforms?scroll=qrgt",
      external: false,
      styles: {
        logoHeight: "3rem",
        screenshotFit: "cover" as const,
        screenshotPosition: "left top",
      },
    },
    {
      name: "QLeap",
      badge: "TALENT ECOSYSTEM",
      logo: ASSETS.logos.platforms.qleap,
      screenshot: ASSETS.platforms.screenshots.qleap,
      subtitle: "Talent development, training, and internship ecosystem",
      highlights: [],
      ctaText: "Explore in Detail",
      link: "/platforms?scroll=qleap",
      external: false,
      styles: { logoHeight: "2.5rem", screenshotFit: "cover" as const },
    },
  ];

  const visionMissionCards = [
    {
      title: "Vision",
      icon: ASSETS.about.visionIcon,
      description:
        "To be a global leader in IT innovation, driving transformative solutions that empower businesses, enhance efficiency, and shape a secure, sustainable digital future.",
    },
    {
      title: "Mission",
      icon: ASSETS.about.missionIcon,
      description:
        "To deliver cutting-edge IT solutions and services that empower businesses to innovate, adapt, and excel in a dynamic digital landscape, fostering growth through technology, expertise, and collaboration.",
    },
  ];

  const coreValues = [
    {
      title: "Integrity in every engagement",
      icon: ASSETS.about.coreValueIcons.integrity,
    },
    {
      title: "Innovation as a way of life",
      icon: ASSETS.about.coreValueIcons.innovation,
    },
    {
      title: "Customer-Centricity in all solutions",
      icon: ASSETS.about.coreValueIcons.customerCentricity,
    },
    {
      title: "Excellence through expertise",
      icon: ASSETS.about.coreValueIcons.excellence,
    },
    {
      title: "Collaboration for greater impact",
      icon: ASSETS.about.coreValueIcons.collaboration,
    },
  ];

  const navigateToPlatform = (platform: (typeof ecosystemPlatforms)[number]) => {
    const url = new URL(platform.link, window.location.href);
    const scrollTarget = url.searchParams.get("scroll");

    if (scrollTarget) {
      window.location.href = `/platforms?scroll=${scrollTarget}`;
      return;
    }

    if (platform.external) {
      window.open(platform.link, "_blank");
      return;
    }

    window.location.href = platform.link;
  };

  return (
    <div
      className="about-page"
      style={{
        background: COLORS.darkBase,
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Seo
        title="About QuasarCyberTech — India's Leading Cybersecurity Consulting Firm"
        description="QuasarCyberTech is a top cybersecurity consulting firm in India. We serve enterprises across banking, FinTech, SaaS, healthcare, and manufacturing with advisory, VAPT, managed SOC, and cloud security services."
        path="/aboutus"
        image={ASSETS.capabilities.advisory}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/aboutus" },
          ]),
          createAboutPageSchema(),
        ]}
      />
      <Navbar />

      <main>
        {/* ── 1: HERO ── */}
        <PageHero
          title="Built on Experience"
          highlight="Engineered for Cyber Resilience"
          subtitle="QuasarCyberTech is an enterprise cybersecurity consulting and engineering firm built to help organizations strengthen resilience, reduce risk, and scale securely in an increasingly complex digital world."
          backgroundOverride={GRADIENTS.ABOUT_HERO_BG}
          image={ASSETS.backdrops.aboutUsHero}
          imageBlendStart="0%"
          imageBlendEnd="100%"
          imageRotate="0deg"
          imageRotateMobile="0deg"
          imageScale={1}
          imagePositionX="100%"
          imagePositionY="center"
          imageBlendSoftness="70%"
          imageBlendStartPercent="0%"
          scrollTargetId="who-we-are"
          scrollButtonText="Discover Our Heritage"
          scrollMethod="motion"
          breadcrumbPaths={["Home"]}
          currentName="About"
          subtitleMaxWidth="60rem"
          paddingTopOverride="var(--about-hero-pad-top, clamp(10rem, 18vh, 12rem))"
          minHeightOverride="var(--about-hero-min-height, 100vh)"
        />

        {/* ── 2: WHO WE ARE + VISION / MISSION / CORE VALUES ── */}
        <section
          className="about-content-section"
          id="who-we-are"
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: "4rem",
            paddingBottom: "var(--about-who-we-are-pb, 2rem)",
            ...sectionPad,
            fontFamily: TYPOGRAPHY.fontBody,
          }}
        >
          {/* Who We Are – 50 / 50 aligned at the very top */}
          <div
            className="about-who-grid"
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingTop: "0.25rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#1A0A0F",
                  marginBottom: "var(--gap-who-we-are)",
                  lineHeight: 1.1,
                }}
              >
                Who <span style={{ color: COLORS.burgundy }}>We</span> Are
              </h2>
              <div
                style={{
                  fontSize: "clamp(14px, 1.3vw, 15.5px)",
                  color: "#4A3040",
                  lineHeight: 1.9,
                }}
              >
                <p style={{ marginBottom: "1.25rem" }}>
                  At <span style={{ color: COLORS.burgundy, fontWeight: 700 }}>QuasarCyberTech</span>, we combine strategic advisory, offensive
                  security, managed defense, cloud security, compliance
                  assurance, and intelligent security platforms to help
                  organizations stay ahead of evolving threats.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  Our approach is built around proactive engagement, technical
                  depth, and measurable business outcomes.
                </p>
                <p style={{ margin: 0, color: "#4A3040" }}>
                  Founded on deep industry expertise and driven by an
                  outcome-first approach, we partner with enterprises, financial
                  institutions, government organizations, and high-growth
                  businesses to protect their digital ecosystems.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: `${METRIC_CONTROLS.metricGridGapY} ${METRIC_CONTROLS.metricGridGapX}`,
                position: "relative",
                alignContent: "flex-start",
                paddingTop: "0",
              }}
            >
              {aboutMetrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {i % 2 === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "30%",
                        bottom: "30%",
                        width: "1px",
                        background: "rgba(0,0,0,0.08)",
                      }}
                    />
                  )}
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "15%",
                        right: "15%",
                        bottom: "-24px",
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(11,31,59,0.1) 20%, rgba(11,31,59,0.1) 80%, transparent 100%)",
                      }}
                    />
                  )}
                  <MetricRow
                    value={m.value}
                    label={m.label}
                    suffix={m.suffix}
                    delay={0.1 + i * 0.08}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vision / Mission / Core Values */}
          <div
            className="about-vm-section"
            style={{
              marginTop: "2.5rem",
              padding: "0",
            }}
          >
            <div
              className="about-vm-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "var(--gap-vm)",
              }}
            >
              {visionMissionCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="about-vm-card"
                >
                  <div className="about-vm-icon-box">
                    <img
                      src={card.icon}
                      alt={`${card.title} icon`}
                      className="about-vm-icon"
                      loading="lazy"
                    />
                  </div>
                  <div className="about-vm-copy">
                    <h3
                      className="about-vm-title"
                      style={{
                        fontSize: "clamp(26px, 4vw, 42px)",
                        fontWeight: 800,
                        color: COLORS.burgundy,
                        marginBottom: "0.55rem",
                        lineHeight: 1,
                        fontFamily: TYPOGRAPHY.fontHeading,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="about-vm-body"
                      style={{
                        fontSize: "clamp(13px, 1.15vw, 15px)",
                        color: "#3E2732",
                        lineHeight: 1.72,
                        margin: 0,
                      }}
                    >
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{ marginBottom: "var(--gap-core-values-bottom)" }}
            >
              <h3
                style={{
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#1A0A0F",
                  marginBottom: "var(--gap-core-values)",
                  textAlign: "center",
                  fontFamily: TYPOGRAPHY.fontHeading,
                }}
              >
                Our <span style={{ color: COLORS.burgundy }}>Core</span> Values
              </h3>

              <div className="about-core-values-grid">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="about-core-value-card"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.16 + index * 0.04 }}
                  >
                    <div className="about-core-value-icon-box">
                      <img
                        src={value.icon}
                        alt={`${value.title} icon`}
                        className="about-core-value-icon"
                        loading="lazy"
                      />
                    </div>
                    <p className="about-core-value-text">{value.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3: FOUNDER'S VISION – 50/50 layout ── */}
        <section
          className="about-content-section about-founder-section"
          style={{
            background: GRADIENTS.ABOUT_FOUNDERS_VISION_BG,
            paddingTop: "clamp(2rem, 5vw, 4rem)",
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div
            className="about-founder-grid"
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 0.5fr",
              gap: "clamp(2rem, 4vw, 4rem)",
              alignItems: "start",
            }}
          >
            {/* Left: eyebrow + title + bio text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  ...TYPOGRAPHY.eyebrow,
                  color: COLORS.gold,
                  marginBottom: "1rem",
                }}
              >
                FOUNDER'S VISION
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.06 }}
                style={{
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "var(--gap-founder-vision)",
                  lineHeight: 1.15,
                }}
              >
                A Founder-Led Vision Built on{" "}
                <span style={{ color: COLORS.gold }}>Trust</span> and{" "}
                <span style={{ color: COLORS.gold }}>Execution</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                style={{
                  fontSize: "clamp(14px, 1.3vw, 16px)",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                QuasarCyberTech was founded by{" "}
                <a
                  href="https://www.linkedin.com/in/kishor-s-9405127/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: COLORS.gold,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Kishor Sonawane
                </a>
                , a cybersecurity leader with over 23+ years of industry
                experience and former Founder &amp; CEO of Varutra Consulting.
              </motion.p>
            </div>

            {/* Right: vision quote — aligned to start at same top as body text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                borderLeft: `4px solid ${COLORS.gold}`,
                paddingLeft: "1.5rem",
                alignSelf: "end",
                paddingBottom: "0.15rem",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.7,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                To build one of the most trusted cybersecurity consulting and
                engineering organization, delivering measurable cyber
                resilience, regulatory assurance, and long-term business value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 4: GROWTH JOURNEY ── */}
        <MilestonesJourney />

        {/* ── 5: WHY ORGANIZATIONS CHOOSE US (High-Fidelity) ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.ABOUT_WHY_US_BG,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div style={{ width: "100%" }}>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#FFFFFF",
                marginBottom: "var(--gap-why-us)",
                lineHeight: 1.15,
              }}
            >
              Why Organizations{" "}
              <span style={{ color: COLORS.gold }}>Choose Us</span>
            </motion.h2>
            <div
              className="about-why-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
            >
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="about-why-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.9, delay: i * 0.08 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${ALPHAS.white08}`,
                    borderTop: `0.1875rem solid ${COLORS.gold}`,
                    borderRadius: "0 0 0.5rem 0.5rem",
                    padding: "clamp(1.25rem, 2.5vw, 2rem)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <item.icon
                    size={WHY_CARD_WATERMARK_CONTROLS.size}
                    strokeWidth={0.5}
                    style={{
                      position: "absolute",
                      right: WHY_CARD_WATERMARK_CONTROLS.right,
                      bottom: WHY_CARD_WATERMARK_CONTROLS.bottom,
                      color: COLORS.gold,
                      opacity: WHY_CARD_WATERMARK_CONTROLS.opacity,
                      pointerEvents: "none",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "clamp(15px, 1.3vw, 18px)",
                      fontWeight: 700,
                      color: COLORS.gold,
                      marginBottom: "0.75rem",
                      fontFamily: TYPOGRAPHY.fontHeading,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      color: "rgba(255,255,255,0.78)",
                      lineHeight: 1.7,
                      margin: 0,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6: SECURITY PLATFORMS & ECOSYSTEM (Mac-Frame High Fidelity) ── */}
        <section
          className="about-platforms-section"
          style={{
            background: GRADIENTS.HOME_PLATFORMS_BG,
            marginTop: "var(--about-ecosystem-overlap-y)",
            paddingTop: "var(--about-ecosystem-section-pt)",
            paddingRight: ABOUT_DESKTOP_SIDE_MARGIN,
            paddingBottom: "var(--about-ecosystem-section-pb)",
            paddingLeft: ABOUT_DESKTOP_SIDE_MARGIN,
            fontFamily: TYPOGRAPHY.fontBody,
          }}
        >
          <div
            style={{ textAlign: "left", marginBottom: "var(--gap-ecosystem)" }}
          >
            <h2
              style={{
                ...TYPOGRAPHY.sectionTitle,
                fontFamily: TYPOGRAPHY.fontHeading,
                color: COLORS.textOnDark,
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: COLORS.gold }}>Security</span> Platforms &
              Ecosystem
            </h2>
            <p
              style={{
                ...TYPOGRAPHY.bodyBase,
                color: "rgba(255,255,255,0.78)",
                maxWidth: "46.25rem",
                lineHeight: "1.7",
              }}
            >
              Platforms and initiatives within the QuasarCyberTech ecosystem
              that support continuous security operations, visibility, and cyber
              resilience.
            </p>
          </div>

          <div
            className="about-ecosystem-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.25rem",
            }}
          >
            {ecosystemPlatforms.map((platform) => (
              <article
                key={platform.name}
                onClick={() => navigateToPlatform(platform)}
                style={{
                  borderRadius: "0 0 1rem 1rem",
                  background: COLORS.cardOnDark,
                  border: `0.0625rem solid rgba(214, 176, 92, 0.3)`,
                  borderTop: `0.1875rem solid ${COLORS.gold}`,
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.25s ease, border-top-color 0.25s ease, cursor 0.25s ease",
                  overflow: "hidden",
                  boxShadow: "0 1.25rem 2.5rem rgba(0,0,0,0.3)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-0.375rem)";
                  e.currentTarget.style.borderTopColor = COLORS.burgundy;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderTopColor = COLORS.gold;
                }}
              >
                {/* Logo + description strip */}
                <div
                  style={{
                    width: "100%",
                    minHeight: "5rem",
                    background: "rgba(4,11,29,0.98)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.95rem 1.25rem",
                    borderBottom: "0.0625rem solid rgba(255,255,255,0.06)",
                    gap: "1rem",
                  }}
                >
                  {platform.logo && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        style={{
                          maxHeight: platform.styles?.logoHeight || "2.25rem",
                          maxWidth: "8.125rem",
                          width: "auto",
                          objectFit: "contain",
                          objectPosition: "left center",
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      flex: 1,
                      textAlign: "left",
                      borderLeft: "0.0625rem solid rgba(255,255,255,0.1)",
                      paddingLeft: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      minWidth: 0,
                    }}
                  >
                    <a
                      href={platform.link}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToPlatform(platform);
                      }}
                      rel={platform.external ? "noopener noreferrer" : undefined}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.gold,
                        opacity: 0.95,
                        flexShrink: 0,
                        textDecoration: "none",
                      }}
                      aria-label={`Explore ${platform.name} in detail`}
                    >
                      <ArrowRight size={14} />
                    </a>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.68)",
                        lineHeight: 1.4,
                        fontWeight: 500,
                        display: "block",
                      }}
                    >
                      {platform.subtitle}
                    </span>
                  </div>
                </div>

                {/* Screenshot panel */}
                <div
                  className="about-platform-shot-shell"
                  style={{
                    marginTop: "var(--about-ecosystem-strip-shot-gap)",
                    padding: "0",
                    background: "transparent",
                    border: `1px solid rgba(214,176,92,0.42)`,
                    borderTop: `1px solid rgba(214,176,92,0.42)`,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="about-platform-shot-viewport"
                    style={{
                      padding: "0",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "var(--about-ecosystem-shot-height-desktop)",
                    }}
                  >
                    {platform.screenshot && (
                      <img
                        className="about-platform-shot-image"
                        src={platform.screenshot}
                        alt={platform.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          maxWidth: "none",
                          objectFit: "cover",
                          objectPosition:
                            platform.styles?.screenshotPosition || "left top",
                          display: "block",
                          borderRadius: "0",
                          border: "none",
                        }}
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 7: INDUSTRIES WE SERVE (light, matching IndustriesOverview) ── */}
        <section
          className="about-content-section"
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: "var(--about-industries-section-padding-bottom)",
            marginBottom: "var(--about-industries-section-gap-bottom)",
            ...sectionPad,
          }}
        >
          <div style={{ width: "100%" }}>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#1A0A0F",
                marginBottom: "var(--gap-industries)",
                lineHeight: 1.15,
              }}
            >
              Industries We <span style={{ color: COLORS.gold }}>Serve</span>
            </motion.h2>
            <div
              className="about-industries-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px",
              }}
            >
              {industriesData.map((ind) => (
                <Link
                  className="about-industry-card"
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  style={{
                    borderRadius: "0 0 4px 4px",
                    borderTop: `4px solid ${COLORS.burgundy}`,
                    background: "#ffffff",
                    boxShadow: SHADOWS.lightCard,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(11,31,59,0.12)";
                    e.currentTarget.style.borderTopColor = COLORS.gold;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = SHADOWS.lightCard;
                    e.currentTarget.style.borderTopColor = COLORS.burgundy;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="about-industry-card-image-wrap"
                    style={{
                      height: "210px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(160deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div
                    className="about-industry-card-body"
                    style={{
                      padding: "24px 24px 20px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      className="about-industry-card-title"
                      style={{
                        color: "#0B1F3B",
                        fontWeight: 700,
                        fontSize: "17px",
                        marginBottom: "8px",
                        fontFamily: TYPOGRAPHY.fontHeading,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span className="about-industry-card-title-text">
                        {ind.name}
                      </span>
                      <ArrowRight size={14} color={COLORS.burgundy} style={{ flexShrink: 0, marginTop: "2px" }} />
                    </h3>
                    <p
                      className="about-industry-card-desc"
                      style={{
                        color: "#4a5568",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {ind.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8: GLOBAL PRESENCE MAP ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.ABOUT_GLOBAL_PRESENCE_BG,
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 90px)",
            ...sectionPad,
          }}
        >
          <div
            className="about-map-grid"
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "minmax(240px, 0.9fr) minmax(0, 1.7fr)",
              gap: "32px",
              alignItems: "start",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(22px, 3vw, 44px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "var(--gap-map)",
                }}
              >
                Global <span style={{ color: COLORS.gold }}>Presence</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                Office and client connectivity visualized as live operational
                pathways across regions.
              </p>
              <div
                onMouseEnter={() => setActiveLocation("Nashik")}
                onMouseLeave={() => setActiveLocation(null)}
                style={{
                  ...getGlassStyle(activeLocation === "Nashik"),
                  borderRight: `1px solid ${activeLocation === "Nashik" ? "rgba(214,176,92,0.45)" : "transparent"}`,
                  borderBottom: `1px solid ${activeLocation === "Nashik" ? "rgba(214,176,92,0.45)" : "transparent"}`,
                  borderTop: "var(--about-map-card-top-accent-size) solid var(--about-map-card-top-accent-color)",
                  borderRadius: "0 0 8px 8px",
                  padding: "16px 16px 16px 18px",
                  marginBottom: "14px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.45rem)",
                    fontWeight: 780,
                    color: "#FFFFFF",
                    marginBottom: "4px",
                  }}
                >
                  Nashik - Headquarters
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.68)",
                    lineHeight: 1.6,
                    fontSize: "clamp(12px, 1.1vw, 15px)",
                  }}
                >
                  #1, State Bank Colony, Indira Nagar, Maharashtra, 422009
                </div>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {["Dallas"].map((city) => (
                  <div
                    key={city}
                    onMouseEnter={() => setActiveLocation(city)}
                    onMouseLeave={() => setActiveLocation(null)}
                    style={{
                      ...getGlassStyle(activeLocation === city),
                      borderLeft: `1px solid ${activeLocation === city ? "rgba(214,176,92,0.45)" : "transparent"}`,
                      borderRight: `1px solid ${activeLocation === city ? "rgba(214,176,92,0.45)" : "transparent"}`,
                      borderBottom: `1px solid ${activeLocation === city ? "rgba(214,176,92,0.45)" : "transparent"}`,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderTop: "var(--about-map-card-top-accent-size) solid var(--about-map-card-top-accent-color)",
                      borderRadius: "0 0 8px 8px",
                      padding: "10px 12px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: COLORS.gold,
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "clamp(13px, 1.2vw, 17px)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {city}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                border: `1px solid ${ALPHAS.white08}`,
                borderTop: "var(--about-map-card-top-accent-size) solid var(--about-map-card-top-accent-color)",
                borderRadius: "0 0 10px 10px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                overflow: "hidden",
                minHeight: "clamp(250px, 33vw, 430px)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.11) 0.8px, transparent 0.8px)",
                  backgroundSize: "6px 6px",
                  opacity: 0.22,
                }}
              />
              <div
                style={{
                  position: "relative",
                  height: `calc(100% - ${MAP_LEGEND_HEIGHT}px)`,
                }}
              >
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: DEFAULT_MAP_SCALE,
                    center: DEFAULT_MAP_CENTER,
                  }}
                  width={1000}
                  height={500}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ZoomableGroup center={mapView.center} zoom={mapView.zoom}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: "rgba(255,255,255,0.12)",
                                stroke: "rgba(4,11,29,0.9)",
                                strokeWidth: 0.55,
                                outline: "none",
                              },
                              hover: {
                                fill: "rgba(255,255,255,0.17)",
                                stroke: "rgba(4,11,29,0.9)",
                                strokeWidth: 0.55,
                                outline: "none",
                              },
                              pressed: {
                                fill: "rgba(255,255,255,0.12)",
                                stroke: "rgba(4,11,29,0.9)",
                                strokeWidth: 0.55,
                                outline: "none",
                              },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {officeArcSegments.map((s) => (
                      <Line
                        key={s.key}
                        from={s.from}
                        to={s.to}
                        stroke={COLORS.gold}
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    ))}
                    {mapNodes.map((node) => (
                      <Marker
                        key={node.name}
                        coordinates={node.coordinates}
                        onMouseEnter={() => setHoveredMapNode(node.name)}
                        onMouseLeave={() => setHoveredMapNode(null)}
                      >
                        <g
                          transform={`scale(${1 / Math.max(markerStableZoom, 1)})`}
                          style={{ transition: "transform 0.2s ease" }}
                        >
                          <circle
                            r={
                              activeLocation === node.name ||
                              hoveredMapNode === node.name
                                ? 9
                                : 6
                            }
                            fill={COLORS.gold}
                            stroke="#0B1F3B"
                            strokeWidth={1.4}
                            style={{ transition: "all 0.2s ease" }}
                          />
                          {(activeLocation === node.name ||
                            hoveredMapNode === node.name) && (
                            <>
                              <rect
                                x={12}
                                y={-24}
                                rx={4}
                                ry={4}
                                width={Math.max(76, node.name.length * 8.5)}
                                height={24}
                                fill="rgba(4,11,29,0.95)"
                                stroke="rgba(214,176,92,0.6)"
                                strokeWidth={1}
                                pointerEvents="none"
                              />
                              <text
                                x={18}
                                y={-8}
                                fill="#FFFFFF"
                                fontSize={12}
                                fontWeight={700}
                                pointerEvents="none"
                              >
                                {node.name}
                              </text>
                            </>
                          )}
                        </g>
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>
              </div>
              <div
                style={{
                  minHeight: `${MAP_LEGEND_HEIGHT}px`,
                  borderTop: `1px solid ${ALPHAS.white08}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  padding: "6px 16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "2px",
                      background: COLORS.gold,
                    }}
                  />
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "clamp(10px, 1vw, 14px)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    OUR OFFICES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9: CTA ── */}
        <CTASection
          theme="light"
          showEyebrow={true}
          eyebrowText="READY TO BUILD RESILIENCE?"
          title={
            <>
              Let&apos;s Build{" "}
              <span style={{ color: COLORS.burgundy }}>Resilience</span>{" "}
              Together
            </>
          }
          subtitle={
            <>
              Whether you are looking for strategic advisory, offensive
              security, managed defense, or platform-led cybersecurity
              transformation,{" "}
              <span style={{ color: COLORS.burgundy, fontWeight: 700 }}>
                QuasarCyberTech
              </span>{" "}
              is ready to partner with you.
            </>
          }
          primaryAction={{
            label: "Talk to a Security Expert",
            link: "/contact",
          }}
          secondaryAction={{
            label: "Explore Capabilities",
            link: "/capabilities",
          }}
        />
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* CSS Controls exposed for quick edits */
        .about-page {
          --about-hero-pad-top: clamp(10rem, 18vh, 12rem); 
          --about-hero-min-height: 100vh; /* Reduces empty space below button */
          --about-hero-gap-below-button: 0rem; /* Handled by min-height behavior now to avoid peaking */
          --about-vm-card-pad-y: clamp(0.8rem, 1.55vw, 1.05rem);
          --about-vm-card-pad-x: clamp(0.9rem, 1.85vw, 1.35rem);
          --about-core-value-font-size: clamp(13.5px, 1.18vw, 16px);
          --about-core-value-font-size-mobile: 15px;
          --about-core-value-pad-y: clamp(0.08rem, 0.16vw, 0.35rem);
          --about-core-value-pad-x: clamp(0.85rem, 1.5vw, 1rem);
          --about-core-value-icon-size: clamp(50px, 4.6vw, 68px);
          --about-core-value-min-height: clamp(94px, 9.2vw, 110px);
          --about-core-value-min-height-mobile: 86px;
          --about-core-value-content-gap: clamp(0.55rem, 1.2vw, 0.82rem);
          --about-core-value-text-pad-y: 0rem;
          --about-core-values-mobile-gap-below-last: 1.4rem;
          --about-founder-mobile-gap-below: 1.6rem;
          --about-vm-mobile-icon-title-gap: 0.55rem;
          --about-vm-mobile-card-pad-y: 0.78rem;
          --about-vm-mobile-card-pad-right: 1rem;
          --about-vm-mobile-card-pad-left: 1rem;
          --about-vm-mobile-title-pad-left: 0rem;
          --about-vm-mobile-title-nudge-x: -3.5rem;
          --about-ecosystem-overlap-y: -1px;
          --about-ecosystem-section-pt: clamp(2rem, 5vh, 4rem);
          --about-ecosystem-section-pb: 5rem;
          --about-ecosystem-strip-shot-gap: 0rem;
          --about-ecosystem-shot-height-desktop: 20rem;
          --about-ecosystem-shot-height-mobile: 17rem;
          --about-industries-section-padding-bottom: 2.5rem;
          --about-industries-section-gap-bottom: 3rem;
          --about-map-card-top-accent-size: 1px;
          --about-map-card-top-accent-color: ${COLORS.gold};
          --gap-core-values-bottom: 2rem;

          /* Why-Us hover controls */
          --about-why-hover-duration: 140ms;
          --about-why-hover-ease: cubic-bezier(0.22, 1, 0.36, 1);
          --about-why-hover-lift: -4px;
          --about-why-hover-border: rgba(214,176,92,0.3);
          --about-why-hover-shadow: 0 12px 40px rgba(0,0,0,0.3);
          
          /* Section Gap Controls */
          --about-who-we-are-pb: 1rem;
          --gap-who-we-are: 1.25rem;
          --gap-vm: 3rem;
          --gap-core-values: 1rem;
          --gap-founder-vision: 1.5rem;
          --gap-why-us: 2rem;
          --gap-ecosystem: 1.75rem;
          --gap-industries: 2rem;
          --gap-map: 1.5rem;
        } 
        .about-page .page-hero-section { 
          padding-bottom: var(--about-hero-gap-below-button) !important; 
        }
        .about-page .page-hero-subtitle { text-align: justify !important; }

        .about-why-card {
          transition:
            transform var(--about-why-hover-duration) var(--about-why-hover-ease),
            border-color var(--about-why-hover-duration) var(--about-why-hover-ease),
            box-shadow var(--about-why-hover-duration) var(--about-why-hover-ease);
          will-change: transform;
        }
        .about-why-card:hover {
          transform: translateY(var(--about-why-hover-lift));
          border-color: var(--about-why-hover-border) !important;
          border-top-color: ${COLORS.gold} !important;
          box-shadow: var(--about-why-hover-shadow);
        }

        .about-vm-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.08);
          border-top: 3px solid ${COLORS.burgundy};
          border-radius: 0 0 1rem 1rem;
          padding: var(--about-vm-card-pad-y) var(--about-vm-card-pad-x);
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: stretch;
          gap: clamp(0.75rem, 1.6vw, 1.2rem);
          box-shadow: 0 10px 26px rgba(8,8,15,0.14);
        }
        .about-vm-icon-box {
          width: clamp(80px, 9vw, 122px);
          min-width: clamp(80px, 9vw, 122px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-vm-icon {
          width: auto;
          height: 100%;
          max-height: clamp(86px, 10vw, 132px);
          object-fit: contain;
          display: block;
        }
        .about-vm-copy {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-core-values-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 1rem;
          align-items: stretch;
        }
        .about-core-values-last-row {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        .about-core-value-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.08);
          border-left: 3px solid ${COLORS.burgundy};
          border-radius: 0 0.95rem 0.95rem 0;
          padding: var(--about-core-value-pad-y) var(--about-core-value-pad-x);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--about-core-value-content-gap);
          min-height: var(--about-core-value-min-height);
          width: 100%;
          justify-self: stretch;
          box-shadow: 0 10px 24px rgba(8,8,15,0.16);
        }
        .about-core-value-card--last {
          width: min(100%, 27rem);
        }
        .about-core-value-icon-box {
          flex: 0 0 var(--about-core-value-icon-size);
          width: var(--about-core-value-icon-size);
          max-width: var(--about-core-value-icon-size);
          min-width: var(--about-core-value-icon-size);
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .about-core-value-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .about-core-value-text {
          margin: 0;
          padding-top: var(--about-core-value-text-pad-y);
          padding-bottom: var(--about-core-value-text-pad-y);
          font-size: var(--about-core-value-font-size);
          font-weight: 700;
          color: #2D1520;
          line-height: 1.32;
          text-align: left;
          overflow-wrap: anywhere;
        }
        .about-page .page-hero-title-highlight {
           display: block !important;
           margin-top: 0.5rem;
        }

        /* Mobile responsive adjustments for About page */
        @media (max-width: 1000px) {
          .about-who-grid, .about-vm-grid, .about-map-grid, .about-ecosystem-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-why-grid, .about-industries-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-founder-grid {
             grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .about-content-section#who-we-are {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }

          .about-why-grid {
            grid-template-columns: 1fr !important;
          }
          .about-page .page-hero-subtitle {
             text-align: left !important;
             font-size: 1rem !important;
             margin-bottom: 2rem !important;
          }
          .about-page .page-hero-title-main {
             font-size: clamp(32px, 8vw, 48px) !important;
          }
          .about-page .page-hero-title-highlight {
             font-size: clamp(24px, 6vw, 32px) !important;
             margin-top: 0.25rem;
          }
          .about-vm-grid {
             gap: 1.25rem !important;
          }
          .about-vm-section {
            margin-top: 2rem !important;
            padding: 0 !important;
          }
          .about-vm-card {
            grid-template-columns: auto auto !important;
            grid-template-areas:
              "icon title"
              "body body";
            align-items: start !important;
            justify-content: center !important;
            justify-items: center !important;
            gap: 0.65rem var(--about-vm-mobile-icon-title-gap) !important;
            padding: var(--about-vm-mobile-card-pad-y) var(--about-vm-mobile-card-pad-right) var(--about-vm-mobile-card-pad-y) var(--about-vm-mobile-card-pad-left) !important;
          }
          .about-vm-icon-box {
            grid-area: icon;
            width: 72px;
            min-width: 72px;
            height: 72px;
            align-items: center !important;
            justify-content: center !important;
          }
          .about-vm-icon {
            width: 72px;
            height: 72px;
            max-height: 72px;
            object-position: center center !important;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
          .about-vm-copy {
            display: contents;
          }
          .about-vm-title {
            grid-area: title;
            margin: 0 !important;
            align-self: center;
            justify-self: center;
            width: auto;
            padding-left: var(--about-vm-mobile-title-pad-left);
            transform: translateX(var(--about-vm-mobile-title-nudge-x));
            text-align: center;
          }
          .about-vm-body {
            grid-area: body;
            margin: 0 !important;
            text-align: left;
          }
          .about-core-values-last-row {
            margin-bottom: var(--about-core-values-mobile-gap-below-last);
          }
          .about-founder-section {
            margin-bottom: var(--about-founder-mobile-gap-below);
          }
          .about-platform-shot-shell {
            margin-top: var(--about-ecosystem-strip-shot-gap) !important;
            background: transparent !important;
            border: 1px solid rgba(214,176,92,0.42) !important;
          }
          .about-platform-shot-viewport {
            padding: 0 !important;
            background: transparent !important;
            height: var(--about-ecosystem-shot-height-mobile) !important;
            align-items: stretch !important;
            justify-content: stretch !important;
          }
          .about-platform-shot-image {
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
            object-position: left top !important;
            transform: none !important;
            border: none !important;
          }
          .about-industries-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
          .about-industry-card-image-wrap {
            height: 160px !important;
          }
          .about-industry-card-body {
            padding: 14px 12px 12px !important;
          }
          .about-industry-card-title {
            font-size: 1.05rem !important;
            margin-bottom: 6px !important;
            gap: 6px !important;
            align-items: flex-start !important;
          }
          .about-industry-card-title svg {
            flex-shrink: 0;
            margin-top: 2px;
          }
          .about-industry-card-title-text {
            display: block;
            line-height: 1.25;
          }
          .about-industry-card-desc {
            display: none !important;
          }
          .about-core-values-grid {
            grid-template-columns: 1fr !important;
            justify-content: stretch;
          }
          .about-core-value-card--last {
            width: 100%;
          }
          .about-core-value-text {
            font-size: var(--about-core-value-font-size-mobile);
          }
          .about-core-value-card {
            min-height: var(--about-core-value-min-height-mobile) !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
