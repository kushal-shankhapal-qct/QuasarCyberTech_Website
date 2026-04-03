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
  Radar,
  Settings,
  CheckCircle2,
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
          <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsSymbolColor }}>
            {suffix === "\u00D77" ? "\u00D7" : "x"}
          </span>
          <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsNumberColor }}>
            7
          </span>
        </span>
      );
    }
    return (
      <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsSymbolColor, marginLeft: "4px" }}>
        {suffix}
      </span>
    );
  };

  return (
    <div ref={ref} style={{ textAlign: "center", position: "relative", width: "100%", padding: "16px 12px" }}>
      <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
          <span style={{ ...TYPOGRAPHY.metricNumber, color: BRAND_CONTROLS.metricsNumberColor }}>
            {value > 999 ? count.toLocaleString() : count}
          </span>
          {renderSuffix()}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "-8px", height: "3px", borderRadius: "999px", background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: BRAND_CONTROLS.metricsUnderlineColor }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: METRIC_ANIMATION_DURATION, delay, ease: "linear" }}
          />
        </div>
      </div>
      <div style={{ ...TYPOGRAPHY.metricLabel, color: BRAND_CONTROLS.metricsLabelColor, lineHeight: 1.4, maxWidth: label.includes("Monitoring") ? "120px" : "170px", margin: "0 auto", whiteSpace: label.includes("Monitoring") ? "pre-line" : "normal" }}>
        {label}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function About() {
  const geoUrl = "/data/countries-110m.json";
  const [activeLocation, setActiveLocation] = React.useState<string | null>(null);
  const [hoveredMapNode, setHoveredMapNode] = React.useState<string | null>(null);

  const officeLocations = [
    { name: "Nashik", coordinates: [73.7898, 19.9975] as [number, number], label: "office" as const },
    { name: "Dallas", coordinates: [-96.797, 32.7767] as [number, number], label: "office" as const },
  ];
  const mapNodes = officeLocations;
  const officeArcSegments: any[] = [];

  const targetMapView = React.useMemo(() => {
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation]) return LOCATION_ZOOM_CONFIG[activeLocation];
    return { center: DEFAULT_MAP_CENTER, zoom: 1 };
  }, [activeLocation]);

  const [mapView, setMapView] = React.useState<{ center: [number, number]; zoom: number }>({ center: DEFAULT_MAP_CENTER, zoom: 1 });
  const mapViewRef = React.useRef(mapView);
  React.useEffect(() => { mapViewRef.current = mapView; }, [mapView]);

  const markerStableZoom = React.useMemo(() => {
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation]) return LOCATION_ZOOM_CONFIG[activeLocation].zoom;
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
        center: [startCenter[0] + (endCenter[0] - startCenter[0]) * eased, startCenter[1] + (endCenter[1] - startCenter[1]) * eased],
        zoom: startZoom + (endZoom - startZoom) * eased,
      });
      if (progress < 1) rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, [targetMapView.center, targetMapView.zoom]);

  const getGlassStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${isActive ? "rgba(214,176,92,0.45)" : ALPHAS.white08}`,
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

  const sectionPad = { paddingLeft: ABOUT_DESKTOP_SIDE_MARGIN, paddingRight: ABOUT_DESKTOP_SIDE_MARGIN };

  const whyChooseUs = [
    { icon: Radar, title: "Proactive Engagement", desc: "We identify and address risks before they escalate, embedding threat-aware thinking into every layer of your operations." },
    { icon: Target, title: "Outcome-Driven Delivery", desc: "Every engagement is measured by its business impact — not just findings, but actionable security improvements." },
    { icon: ShieldCheck, title: "Standards-Aligned Approach", desc: "Our methodology aligns with ISO 27001, NIST, SOC 2, PCI-DSS, and regional frameworks for comprehensive compliance." },
    { icon: Settings, title: "Tailored Solutions", desc: "No two enterprises are the same. We architect security programs around your unique risk profile and growth trajectory." },
  ];

  const ecosystemPlatforms = [
    { name: "QStellar", badge: "ASSET INTELLIGENCE", logo: ASSETS.logos.platforms.qstellarLight, screenshot: ASSETS.platforms.screenshots.qstellar, subtitle: "AI-powered asset visibility and vulnerability intelligence platform", highlights: ["Asset discovery and visibility", "Vulnerability intelligence and prioritization", "Risk-based security decision support", "AI-assisted security operations visibility"], ctaText: "Visit QStellar Website", link: "https://qstellar.co", external: true, styles: { logoHeight: "2.25rem", screenshotFit: "cover" as const } },
    { name: "QPulse", badge: "THREAT INTELLIGENCE", logo: ASSETS.logos.platforms.qpulseLight, screenshot: ASSETS.platforms.screenshots.qpulse, subtitle: "Cybersecurity intelligence and regulatory insights portal", highlights: ["Real-time threat analytics", "Global threat feed ingestion", "Vulnerability research and analysis", "Strategic security intelligence"], ctaText: "Explore QPulse Portal", link: "https://qpulse.quasarcybertech.com", external: true, styles: { logoHeight: "3.125rem", screenshotFit: "cover" as const } },
    { name: "QRGT", badge: "PTAAS PLATFORM", logo: ASSETS.logos.platforms.qrgtDark, screenshot: ASSETS.platforms.screenshots.qrgt, subtitle: "Continuous, governed Penetration Testing as a Service (PTaaS) platform", highlights: ["Continuous testing visibility", "Governed remediation tracking", "Risk and findings management", "Supports lifecycle-driven application security programs"], ctaText: "Explore QRGT Platform", link: "/contact", external: false, styles: { logoHeight: "4.75rem", screenshotFit: "cover" as const, screenshotPosition: "left center" } },
    { name: "QLeap", badge: "TALENT ECOSYSTEM", logo: ASSETS.logos.platforms.qleap, screenshot: ASSETS.platforms.screenshots.qleap, subtitle: "Talent development, training, and internship ecosystem", highlights: ["Structured internship programs", "Industry-aligned training modules", "Enterprise readiness pipeline", "Cybersecurity career acceleration"], ctaText: "Explore QLeap", link: "https://qleap-ed.com", external: true, styles: { logoHeight: "2.5rem", screenshotFit: "cover" as const } },
  ];

  const coreValues = [
    "Integrity in every engagement",
    "Innovation as a way of life",
    "Customer-Centricity in all solutions",
    "Excellence through expertise",
    "Collaboration for greater impact",
  ];

  return (
    <div
      className="about-page"
      style={{ background: COLORS.darkBase, minHeight: "100vh", position: "relative", overflowX: "hidden" }}
    >
      <Seo
        title="About QuasarCyberTech — India's Leading Cybersecurity Consulting Firm"
        description="QuasarCyberTech is a top cybersecurity consulting firm in India. We serve enterprises across banking, FinTech, SaaS, healthcare, and manufacturing with advisory, VAPT, managed SOC, and cloud security services."
        path="/aboutus"
        image={ASSETS.capabilities.advisory}
        jsonLd={[
          createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/aboutus" }]),
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
          image={ASSETS.capabilities.worldwideConnection}
          imageRotate="-90deg"
          imageRotateMobile="0deg"
          imageScale={1.3}
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
            style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "flex-start" }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "0.25rem" }}>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: "#1A0A0F", marginBottom: "var(--gap-who-we-are)", lineHeight: 1.1 }}>
                Who <span style={{ color: COLORS.gold }}>We</span> Are
              </h2>
              <div style={{ fontSize: "clamp(14px, 1.3vw, 15.5px)", color: "#4A3040", lineHeight: 1.9 }}>
                <p style={{ marginBottom: "1.25rem" }}>
                  At QuasarCyberTech, we combine strategic advisory, offensive security, managed defense, cloud security, compliance assurance, and intelligent security platforms to help organizations stay ahead of evolving threats.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>Our approach is built around proactive engagement, technical depth, and measurable business outcomes.</p>
                <p style={{ margin: 0, opacity: 0.85 }}>
                  Founded on deep industry expertise and driven by an outcome-first approach, we partner with enterprises, financial institutions, government organizations, and high-growth businesses to protect their digital ecosystems.
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "26px 0", position: "relative", alignContent: "flex-start", paddingTop: "0" }}>
              {aboutMetrics.map((m, i) => (
                <div key={i} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  {i % 2 === 0 && <div style={{ position: "absolute", right: 0, top: "20%", bottom: "20%", width: "1px", background: "rgba(0,0,0,0.08)" }} />}
                  {i < 2 && <div style={{ position: "absolute", left: "10%", right: "10%", bottom: "-12px", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(11,31,59,0.1) 20%, rgba(11,31,59,0.1) 80%, transparent 100%)" }} />}
                  <MetricRow value={m.value} label={m.label} suffix={m.suffix} delay={0.1 + i * 0.08} />
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Mission – 2 col */}
          <div style={{ marginTop: "2.5rem" }}>
            <div className="about-vm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "var(--gap-vm)" }}>
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", borderLeft: `4px solid ${COLORS.burgundy}`, borderRadius: "0", padding: "clamp(1.25rem, 2.5vw, 2rem)" }}
              >
                <h3 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: COLORS.gold, marginBottom: "0.75rem", fontFamily: TYPOGRAPHY.fontHeading }}>
                  Vision
                </h3>
                <p style={{ fontSize: "clamp(13px, 1.15vw, 15px)", color: "#4A3040", lineHeight: 1.8, margin: 0 }}>
                  To be a global leader in IT innovation, driving transformative solutions that empower businesses, enhance efficiency, and shape a secure, sustainable digital future.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", borderRight: `4px solid ${COLORS.burgundy}`, borderRadius: "0", padding: "clamp(1.25rem, 2.5vw, 2rem)" }}
              >
                <h3 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: COLORS.gold, marginBottom: "0.75rem", fontFamily: TYPOGRAPHY.fontHeading }}>
                  Mission
                </h3>
                <p style={{ fontSize: "clamp(13px, 1.15vw, 15px)", color: "#4A3040", lineHeight: 1.8, margin: 0 }}>
                  To deliver cutting-edge IT solutions and services that empower businesses to innovate, adapt, and excel in a dynamic digital landscape, fostering growth through technology, expertise, and collaboration.
                </p>
              </motion.div>
            </div>

            {/* Core Values – 3 columns */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}>
              <h3 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: "#1A0A0F", marginBottom: "var(--gap-core-values)", fontFamily: TYPOGRAPHY.fontHeading }}>
                Our <span style={{ color: COLORS.burgundy }}>Core</span> Values
              </h3>
              {/* Staircase layout spanning full width */}
              <div className="about-values-outer staircase-container" style={{ width: "100%", overflowX: "hidden", paddingTop: "1rem" }}>
                <div className="about-values-grid-staircase">
                  {coreValues.map((val, i) => (
                    <div key={i} className="about-value-card staircase-card" style={{
                      borderTop: `3px solid ${i % 2 === 0 ? COLORS.burgundy : COLORS.gold}`,
                      marginTop: 0 // Removed staircase displacement
                    }}>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3: FOUNDER'S VISION – 50/50 layout ── */}
        <section
          className="about-content-section"
          style={{ background: GRADIENTS.ABOUT_FOUNDERS_VISION_BG, paddingTop: "clamp(2rem, 5vw, 4rem)", paddingBottom: LAYOUT_CONTROLS.section.paddingBottom, ...sectionPad, color: "#FFFFFF" }}
        >
          <div
            className="about-founder-grid"
            style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}
          >
            {/* Left: eyebrow + title + bio text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.gold, marginBottom: "1rem" }}
              >
                FOUNDER'S VISION
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.06 }}
                style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "var(--gap-founder-vision)", lineHeight: 1.15 }}
              >
                A Founder-Led Vision Built on{" "}
                <span style={{ color: COLORS.gold }}>Trust</span> and{" "}
                <span style={{ color: COLORS.gold }}>Execution</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
                style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, margin: 0 }}
              >
                QuasarCyberTech was founded by{" "}
                <strong style={{ color: "#FFFFFF", fontWeight: 700 }}>Kishor Sonawane</strong>,
                a cybersecurity leader with over 23+ years of industry experience and former Founder &amp; CEO of Varutra Consulting.
              </motion.p>
            </div>

            {/* Right: vision quote — aligned to start at same top as body text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ borderLeft: `4px solid ${COLORS.gold}`, paddingLeft: "1.5rem", alignSelf: "end", paddingBottom: "0.15rem" }}
            >
              <p style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
                To build one of the most trusted cybersecurity consulting and engineering companies, delivering measurable resilience and long-term value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 4: GROWTH JOURNEY ── */}
        <MilestonesJourney />

        {/* ── 5: WHY ORGANIZATIONS CHOOSE US (High-Fidelity) ── */}
        <section
          className="about-content-section"
          style={{ background: GRADIENTS.ABOUT_WHY_US_BG, paddingTop: LAYOUT_CONTROLS.section.paddingTop, paddingBottom: LAYOUT_CONTROLS.section.paddingBottom, ...sectionPad, color: "#FFFFFF" }}
        >
          <div style={{ width: "100%" }}>
            <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "var(--gap-why-us)", lineHeight: 1.15 }}
            >
              Why Organizations <span style={{ color: COLORS.gold }}>Choose Us</span>
            </motion.h2>
            <div className="about-why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {whyChooseUs.map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${ALPHAS.white08}`, borderRadius: "0.5rem", padding: "clamp(1.25rem, 2.5vw, 2rem)", position: "relative", overflow: "hidden", transition: "border-color 0.3s, box-shadow 0.3s" }}
                  whileHover={{ borderColor: "rgba(214,176,92,0.3)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
                >
                  <item.icon size={110} strokeWidth={0.5} style={{ position: "absolute", right: "-10px", bottom: "-10px", color: COLORS.gold, opacity: 0.18, pointerEvents: "none" }} />
                  <h3 style={{ fontSize: "clamp(15px, 1.3vw, 18px)", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem", fontFamily: TYPOGRAPHY.fontHeading, position: "relative", zIndex: 2 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: 0, position: "relative", zIndex: 2 }}>
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
          style={{ background: GRADIENTS.ABOUT_ACHIEVEMENT_BG, padding: `clamp(2rem, 5vh, 4rem) ${ABOUT_DESKTOP_SIDE_MARGIN} clamp(2rem, 5vh, 4rem)`, fontFamily: TYPOGRAPHY.fontBody }}
        >
          <div style={{ textAlign: "left", marginBottom: "var(--gap-ecosystem)" }}>
            <h2 style={{ ...TYPOGRAPHY.sectionTitle, fontFamily: TYPOGRAPHY.fontHeading, color: COLORS.textOnDark, marginBottom: "0.5rem" }}>
              <span style={{ color: COLORS.gold }}>Security</span> Platforms & Ecosystem
            </h2>
            <p style={{ ...TYPOGRAPHY.bodyBase, color: "rgba(255,255,255,0.78)", maxWidth: "46.25rem", lineHeight: "1.7" }}>
              Platforms and initiatives within the QuasarCyberTech ecosystem that support continuous security operations, visibility, and cyber resilience.
            </p>
          </div>

          <div className="about-ecosystem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {ecosystemPlatforms.map((platform) => (
              <article key={platform.name}
                style={{ borderRadius: "0 0 1rem 1rem", background: COLORS.cardOnDark, border: `0.0625rem solid rgba(214, 176, 92, 0.3)`, borderTop: `0.1875rem solid ${COLORS.gold}`, display: "flex", flexDirection: "column", transition: "transform 0.25s ease, border-top-color 0.25s ease", overflow: "hidden", boxShadow: "0 1.25rem 2.5rem rgba(0,0,0,0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-0.375rem)"; e.currentTarget.style.borderTopColor = COLORS.burgundy; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderTopColor = COLORS.gold; }}
              >
                {/* Screenshot – wrapped in a "Mac ribbon" browser frame */}
                <div style={{ padding: "0", background: "rgba(31, 54, 114, 0.98)", borderBottom: `1px solid rgba(255,255,255,0.08)`, overflow: "hidden", position: "relative" }}>
                  {/* Mac-style ribbon */}
                  <div style={{ height: "24px", background: "#6B1530", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", paddingLeft: "10px", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F56" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27C93F" }} />
                  </div>
                  <div style={{ padding: "0 8px", background: "rgba(226, 219, 202, 0.95)", display: "flex", alignItems: "center", justifyContent: "center", height: "18rem" }}>
                    {platform.screenshot && (
                      <img src={platform.screenshot} alt={platform.name}
                        style={{ height: "100%", width: "auto", maxWidth: "100%", objectFit: "contain", display: "block", borderRadius: "0", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    )}
                  </div>
                </div>
                {/* Logo strip */}
                <div style={{ width: "100%", minHeight: "5rem", background: "rgba(4,11,29,0.98)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", borderTop: `0.0625rem solid ${COLORS.burgundy}`, borderBottom: "0.0625rem solid rgba(255,255,255,0.03)", gap: "1.25rem" }}>
                  {platform.logo && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                      <img src={platform.logo} alt={platform.name} style={{ maxHeight: platform.styles?.logoHeight || "2.25rem", maxWidth: platform.name === "QRGT" ? "none" : "8.125rem", width: "auto", objectFit: "contain", objectPosition: "left center" }} />
                    </div>
                  )}
                  <div style={{ flex: 1, textAlign: "left", borderLeft: "0.0625rem solid rgba(255,255,255,0.1)", paddingLeft: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.4, fontWeight: 500, display: "block" }}>{platform.subtitle}</span>
                  </div>
                </div>
                {/* Highlights */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <ul style={{ listStyle: "none", margin: "0 0 1.5rem 0", padding: 0, display: "grid", gap: "0.75rem", flexGrow: 1 }}>
                    {platform.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", gap: "0.75rem", color: "rgba(255,255,255,0.9)", ...TYPOGRAPHY.bodySmall, fontWeight: 500, lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: "0.125rem", color: COLORS.gold, opacity: 0.75 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={platform.link} target={platform.external ? "_blank" : undefined} rel={platform.external ? "noopener noreferrer" : undefined}
                    style={{ color: "#FFFFFF", opacity: 0.85, fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: "0.625rem", borderTop: `0.0625rem solid ${ALPHAS.white06}`, paddingTop: "1.25rem", marginTop: "auto", transition: "all 0.3s ease" }}>
                    {platform.ctaText} <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 7: INDUSTRIES WE SERVE (light, matching IndustriesOverview) ── */}
        <section className="about-content-section" style={{ background: SECTION_BACKGROUNDS.LIGHT, paddingTop: LAYOUT_CONTROLS.section.paddingTop, paddingBottom: LAYOUT_CONTROLS.section.paddingBottom, ...sectionPad }}>
          <div style={{ width: "100%" }}>
            <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#1A0A0F", marginBottom: "var(--gap-industries)", lineHeight: 1.15 }}
            >
              Industries We <span style={{ color: COLORS.gold }}>Serve</span>
            </motion.h2>
            <div className="about-industries-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {industriesData.map((ind) => (
                <Link key={ind.slug} to={`/industries/${ind.slug}`}
                  style={{ borderRadius: "0 0 4px 4px", borderTop: `4px solid ${COLORS.burgundy}`, background: "#ffffff", boxShadow: SHADOWS.lightCard, overflow: "hidden", display: "flex", flexDirection: "column", transition: "all 0.3s ease", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(11,31,59,0.12)"; e.currentTarget.style.borderTopColor = COLORS.gold; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = SHADOWS.lightCard; e.currentTarget.style.borderTopColor = COLORS.burgundy; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ height: "210px", overflow: "hidden", position: "relative" }}>
                    <img src={ind.image} alt={ind.name} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(107,15,43,0.1) 0%, rgba(11,31,59,0.2) 100%)", pointerEvents: "none" }} />
                  </div>
                  <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: "#0B1F3B", fontWeight: 700, fontSize: "17px", marginBottom: "8px", fontFamily: TYPOGRAPHY.fontHeading, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {ind.name} <ArrowRight size={14} color={COLORS.burgundy} />
                    </h3>
                    <p style={{ color: "#4a5568", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{ind.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8: GLOBAL PRESENCE MAP ── */}
        <section className="about-content-section" style={{ background: GRADIENTS.HERO_BG, paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 90px)", ...sectionPad }}>
          <div className="about-map-grid" style={{ width: "100%", display: "grid", gridTemplateColumns: "minmax(240px, 0.9fr) minmax(0, 1.7fr)", gap: "32px", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 44px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "var(--gap-map)" }}>
                Global <span style={{ color: COLORS.gold }}>Presence</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(13px, 1.2vw, 16px)", lineHeight: 1.7, marginBottom: "24px" }}>
                Office and client connectivity visualized as live operational pathways across regions.
              </p>
              <div onMouseEnter={() => setActiveLocation("Nashik")} onMouseLeave={() => setActiveLocation(null)}
                style={{ borderLeft: `2px solid ${COLORS.burgundy}`, borderRadius: "2px", padding: "16px 16px 16px 18px", marginBottom: "14px", cursor: "pointer", ...getGlassStyle(activeLocation === "Nashik") }}>
                <div style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", fontWeight: 780, color: "#FFFFFF", marginBottom: "4px" }}>Nashik - Headquarters</div>
                <div style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.6, fontSize: "clamp(12px, 1.1vw, 15px)" }}>
                  #1, State Bank Colony, Indira Nagar,<br />Maharashtra - 422009
                </div>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {["Dallas"].map((city) => (
                  <div key={city} onMouseEnter={() => setActiveLocation(city)} onMouseLeave={() => setActiveLocation(null)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "8px", padding: "10px 12px", cursor: "pointer", ...getGlassStyle(activeLocation === city) }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.gold, flexShrink: 0 }} />
                    <div style={{ color: "#FFFFFF", fontSize: "clamp(13px, 1.2vw, 17px)", fontWeight: 700, lineHeight: 1.2 }}>{city}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: `1px solid ${ALPHAS.white08}`, borderRadius: "10px", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", overflow: "hidden", minHeight: "clamp(250px, 33vw, 430px)", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,0.11) 0.8px, transparent 0.8px)", backgroundSize: "6px 6px", opacity: 0.22 }} />
              <div style={{ position: "relative", height: `calc(100% - ${MAP_LEGEND_HEIGHT}px)` }}>
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: DEFAULT_MAP_SCALE, center: DEFAULT_MAP_CENTER }} width={1000} height={500} style={{ width: "100%", height: "100%" }}>
                  <ZoomableGroup center={mapView.center} zoom={mapView.zoom}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) => geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo}
                          style={{
                            default: { fill: "rgba(255,255,255,0.12)", stroke: "rgba(4,11,29,0.9)", strokeWidth: 0.55, outline: "none" },
                            hover: { fill: "rgba(255,255,255,0.17)", stroke: "rgba(4,11,29,0.9)", strokeWidth: 0.55, outline: "none" },
                            pressed: { fill: "rgba(255,255,255,0.12)", stroke: "rgba(4,11,29,0.9)", strokeWidth: 0.55, outline: "none" },
                          }}
                        />
                      ))}
                    </Geographies>
                    {officeArcSegments.map((s) => <Line key={s.key} from={s.from} to={s.to} stroke={COLORS.gold} strokeWidth={2} strokeLinecap="round" />)}
                    {mapNodes.map((node) => (
                      <Marker key={node.name} coordinates={node.coordinates} onMouseEnter={() => setHoveredMapNode(node.name)} onMouseLeave={() => setHoveredMapNode(null)}>
                        <g transform={`scale(${1 / Math.max(markerStableZoom, 1)})`} style={{ transition: "transform 0.2s ease" }}>
                          <circle r={activeLocation === node.name || hoveredMapNode === node.name ? 9 : 6} fill={COLORS.gold} stroke="#0B1F3B" strokeWidth={1.4} style={{ transition: "all 0.2s ease" }} />
                          {(activeLocation === node.name || hoveredMapNode === node.name) && (
                            <>
                              <rect x={12} y={-24} rx={4} ry={4} width={Math.max(76, node.name.length * 8.5)} height={24} fill="rgba(4,11,29,0.95)" stroke="rgba(214,176,92,0.6)" strokeWidth={1} pointerEvents="none" />
                              <text x={18} y={-8} fill="#FFFFFF" fontSize={12} fontWeight={700} pointerEvents="none">{node.name}</text>
                            </>
                          )}
                        </g>
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>
              </div>
              <div style={{ minHeight: `${MAP_LEGEND_HEIGHT}px`, borderTop: `1px solid ${ALPHAS.white08}`, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", padding: "6px 16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "20px", height: "2px", background: COLORS.gold }} />
                  <div style={{ color: "#FFFFFF", fontSize: "clamp(10px, 1vw, 14px)", fontWeight: 700, letterSpacing: "0.04em" }}>OUR OFFICES</div>
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
              <span style={{ color: COLORS.burgundy }}>Resilience</span>{" "}Together
            </>
          }
          subtitle={
            <>
              Whether you are looking for strategic advisory, offensive security, managed defense,
              or platform-led cybersecurity transformation,{" "}
              <span style={{ color: COLORS.burgundy, fontWeight: 700 }}>QuasarCyberTech</span>{" "}
              is ready to partner with you.
            </>
          }
          primaryAction={{ label: "Talk to a Security Expert", link: "/contact" }}
          secondaryAction={{ label: "Explore Capabilities", link: "/capabilities" }}
        />
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        /* CSS Controls exposed for quick edits */
        .about-page {
          --about-hero-pad-top: clamp(10rem, 18vh, 12rem); 
          --about-hero-min-height: 100vh; /* Reduces empty space below button */
          --about-hero-gap-below-button: 0rem; /* Handled by min-height behavior now to avoid peaking */
          --staircase-step: 18%; /* This will span it nicely across desktop */
          
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

        /* Core values: Wide-span vertical staircase */
        .about-values-grid-staircase {
          display: flex;
          justify-content: space-between;
          width: 100%;
          gap: 1.5rem;
          padding: 1rem 0 3rem; /* Reduced bottom padding from 5rem to minimize gap */
        }
        .staircase-card {
          width: calc(20% - 1.2rem);
          white-space: normal; /* Allow wrap for long values if needed */
        }
        @media (max-width: 1100px) {
           .about-values-grid-staircase { flex-direction: column; gap: 1rem; padding-bottom: 2rem; }
           .staircase-card { width: 100% !important; margin-top: 0 !important; }
        }
        .about-value-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 0 0 0.375rem 0.375rem;
          padding: clamp(0.75rem, 1.5vw, 1.25rem);
          font-size: clamp(12px, 1.1vw, 15px);
          font-weight: 700;
          color: #2D1520;
          line-height: 1.4;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 6rem; /* Standardizes card heights */
          width: 100%;
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
        }
      `}} />
    </div>
  );
}
