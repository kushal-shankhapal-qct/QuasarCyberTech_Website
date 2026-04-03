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
  Eye,
  Target,
  ShieldCheck,
  Radar,
  Settings,
} from "lucide-react";
import {
  COLORS,
  GRADIENTS,
  TYPOGRAPHY,
  LAYOUT_CONTROLS,
  SECTION_BACKGROUNDS,
  ALPHAS,
  BRAND_CONTROLS,
} from "../config/themeConfig";
import { ASSETS } from "@/constants/assets";
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
  Nashik: {
    center: [78.5, 21.5],
    zoom: 3,
  },
  Dallas: {
    center: [-96.9, 32.8],
    zoom: 3.3,
  },
};
const ABOUT_DESKTOP_SIDE_MARGIN = "3rem";

// --- Metrics Helper ---
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
            }}
          >
            {suffix === "\u00D77" ? "\u00D7" : "x"}
          </span>
          <span
            style={{
              ...TYPOGRAPHY.metricNumber,
              color: BRAND_CONTROLS.metricsNumberColor,
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
        padding: "16px 12px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              ...TYPOGRAPHY.metricNumber,
              color: BRAND_CONTROLS.metricsNumberColor,
            }}
          >
            {value > 999 ? count.toLocaleString() : count}
          </span>
          {renderSuffix()}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-8px",
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
          color: BRAND_CONTROLS.metricsLabelColor,
          lineHeight: 1.4,
          maxWidth: label.includes("Monitoring") ? "120px" : "170px",
          margin: "0 auto",
          whiteSpace: label.includes("Monitoring") ? "pre-line" : "normal",
        }}
      >
        {label}
      </div>
    </div>
  );
};

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
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation]) {
      return LOCATION_ZOOM_CONFIG[activeLocation];
    }
    return { center: DEFAULT_MAP_CENTER, zoom: 1 };
  }, [activeLocation]);

  const [mapView, setMapView] = React.useState<{
    center: [number, number];
    zoom: number;
  }>({
    center: DEFAULT_MAP_CENTER,
    zoom: 1,
  });
  const mapViewRef = React.useRef(mapView);

  React.useEffect(() => {
    mapViewRef.current = mapView;
  }, [mapView]);

  const markerStableZoom = React.useMemo(() => {
    if (activeLocation && LOCATION_ZOOM_CONFIG[activeLocation]) {
      return LOCATION_ZOOM_CONFIG[activeLocation].zoom;
    }
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
    border: `1px solid ${isActive ? "rgba(214,176,92,0.45)" : ALPHAS.white08}`,
    boxShadow: isActive ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
    backdropFilter: "blur(6px)",
    transition: "all 0.24s ease",
  });

  const aboutMetrics = [
    { value: 60, suffix: "+", label: "Security Engagements" },
    {
      value: 2000,
      suffix: "+",
      label: "Security Vulnerabilities Reported",
    },
    { value: 100, suffix: "%", label: "Client Retention" },
    { value: 24, suffix: "x7", label: "Security Operations\nMonitoring" },
  ];

  const sectionPad = {
    paddingLeft: ABOUT_DESKTOP_SIDE_MARGIN,
    paddingRight: ABOUT_DESKTOP_SIDE_MARGIN,
  };

  // Why Choose Us pillars
  const whyChooseUs = [
    {
      icon: Radar,
      title: "Proactive Engagement",
      desc: "We identify and address risks before they escalate, embedding threat-aware thinking into every layer of your operations.",
    },
    {
      icon: Target,
      title: "Outcome-Driven Delivery",
      desc: "Every engagement is measured by its business impact — not just findings, but actionable security improvements.",
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

  // Ecosystem platforms
  const ecosystemPlatforms = [
    {
      name: "QStellar",
      logo: ASSETS.logos.platforms.qstellarLight,
      desc: "AI-powered asset visibility and vulnerability intelligence platform",
      href: "https://qstellar.co",
      external: true,
    },
    {
      name: "QRGT",
      logo: ASSETS.logos.platforms.qrgtLight,
      desc: "PTaaS and risk governance platform",
      href: "/contact",
      external: false,
    },
    {
      name: "QPulse",
      logo: ASSETS.logos.platforms.qpulseLight,
      desc: "Cybersecurity intelligence and regulatory insights portal",
      href: "https://qpulse.quasarcybertech.com",
      external: true,
    },
    {
      name: "QLeap",
      logo: ASSETS.logos.platforms.qleap,
      desc: "Talent development, training, and internship ecosystem",
      href: "https://qleap-ed.com",
      external: true,
    },
  ];

  // Industries
  const industries = [
    "BFSI",
    "Government & PSU",
    "Healthcare",
    "Manufacturing",
    "Technology",
    "Consulting",
    "Startups & SaaS",
    "E-commerce",
  ];

  return (
    <div
      style={{
        background: COLORS.darkBase,
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Seo
        title="About Us — Our Mission, Values & Story"
        description="Learn about QuasarCyberTech — an enterprise cybersecurity consulting and engineering firm committed to building a safer digital world through offensive security, advisory, and managed defense."
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
          title="Built on Experience. Engineered for"
          highlight="Cyber Resilience."
          subtitle="QuasarCyberTech is an enterprise cybersecurity consulting and engineering firm built to help organizations strengthen resilience, reduce risk, and scale securely in an increasingly complex digital world. Founded on deep industry expertise and driven by an outcome-first approach, we partner with enterprises, financial institutions, government organizations, and high-growth businesses to protect their digital ecosystems."
          backgroundOverride={GRADIENTS.ABOUT_HERO_BG}
          image={ASSETS.capabilities.worldwideConnection}
          imageRotate="-90deg"
          imageScale={1.3}
          scrollTargetId="who-we-are"
          scrollButtonText="Discover Our Heritage"
          scrollMethod="motion"
          breadcrumbPaths={["Home"]}
          currentName="About"
          compact={true}
          subtitleMaxWidth="52rem"
        />

        {/* ── 2: WHO WE ARE ── */}
        <section
          className="about-content-section"
          id="who-we-are"
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            fontFamily: TYPOGRAPHY.fontBody,
          }}
        >
          <div
            className="about-who-grid"
            style={{
              width: "100%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "3rem",
              alignItems: "stretch",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#1A0A0F",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                }}
              >
                Who <span style={{ color: COLORS.gold }}>We</span> Are
              </h2>
              <div
                style={{
                  fontSize: "clamp(14px, 1.3vw, 15.5px)",
                  color: "#4A3040",
                  lineHeight: 1.9,
                }}
              >
                <p style={{ marginBottom: "1.25rem" }}>
                  At QuasarCyberTech, we combine strategic advisory, offensive
                  security, managed defense, cloud security, compliance
                  assurance, and intelligent security platforms to help
                  organizations stay ahead of evolving threats.
                </p>
                <p>
                  Our approach is built around proactive engagement, technical
                  depth, and measurable business outcomes.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "26px 0",
                position: "relative",
                alignContent: "center",
              }}
            >
              {aboutMetrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {i % 2 === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        bottom: "20%",
                        width: "1px",
                        background: "rgba(0,0,0,0.08)",
                      }}
                    />
                  )}
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "10%",
                        right: "10%",
                        bottom: "-12px",
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
        </section>

        {/* ── 3: FOUNDER'S VISION ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.ABOUT_FOUNDERS_VISION_BG,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div style={{ width: "100%", margin: "0 auto" }}>
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
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                lineHeight: 1.15,
                maxWidth: "38rem",
              }}
            >
              A Founder-Led Vision Built on Trust and Execution
            </motion.h2>
            <div
              className="about-founder-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(2rem, 4vw, 4rem)",
                alignItems: "start",
              }}
            >
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  style={{
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    color: "rgba(255,255,255,0.78)",
                    lineHeight: 1.85,
                    marginBottom: "1.5rem",
                  }}
                >
                  QuasarCyberTech was founded by{" "}
                  <strong style={{ color: "#FFFFFF", fontWeight: 700 }}>
                    Kishor Sonawane
                  </strong>
                  , a cybersecurity leader with over 23+ years of industry
                  experience and former Founder & CEO of Varutra Consulting.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    borderLeft: `4px solid ${COLORS.gold}`,
                    paddingLeft: "1.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    "To build one of the most trusted cybersecurity consulting
                    and engineering companies, delivering measurable resilience
                    and long-term value."
                  </p>
                </motion.div>
              </div>
              {/* Right: Founder info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${ALPHAS.white08}`,
                  borderRadius: "0.5rem",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative glow */}
                <div
                  style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    top: "-60px",
                    right: "-60px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${ALPHAS.gold20}, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div
                    style={{
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      marginBottom: "0.5rem",
                      fontFamily: TYPOGRAPHY.fontHeading,
                    }}
                  >
                    Kishor Sonawane
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      color: COLORS.gold,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Founder & CEO, QuasarCyberTech
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      "23+ Years Industry Experience",
                      "Former Founder & CEO, Varutra Consulting",
                      "Enterprise Security Architecture Expert",
                    ].map((stat, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: COLORS.gold,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "clamp(12px, 1.1vw, 14px)",
                            color: "rgba(255,255,255,0.72)",
                            lineHeight: 1.5,
                          }}
                        >
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 4: GROWTH JOURNEY (MilestonesJourney) ── */}
        <MilestonesJourney />

        {/* ── 5: WHY ORGANIZATIONS CHOOSE US ── */}
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
          <div style={{ width: "100%", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                ...TYPOGRAPHY.eyebrow,
                color: COLORS.gold,
                marginBottom: "0.75rem",
              }}
            >
              WHY CHOOSE US
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
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${ALPHAS.white08}`,
                    borderRadius: "0.5rem",
                    padding: "clamp(1.25rem, 2.5vw, 2rem)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  whileHover={{
                    borderColor: "rgba(214,176,92,0.3)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <item.icon
                    size={32}
                    strokeWidth={1.5}
                    style={{
                      color: COLORS.gold,
                      marginBottom: "1rem",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "clamp(14px, 1.3vw, 18px)",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "0.75rem",
                      fontFamily: TYPOGRAPHY.fontHeading,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6: OUR ECOSYSTEM ── */}
        <section
          className="about-content-section"
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
          }}
        >
          <div style={{ width: "100%", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                ...TYPOGRAPHY.eyebrow,
                color: COLORS.burgundy,
                marginBottom: "0.75rem",
              }}
            >
              OUR ECOSYSTEM
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#1A0A0F",
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.15,
              }}
            >
              Our <span style={{ color: COLORS.gold }}>Platforms</span>
            </motion.h2>
            <div
              className="about-ecosystem-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
              }}
            >
              {ecosystemPlatforms.map((plat, i) => {
                const CardInner = (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    whileHover={{ boxShadow: "0 10px 36px rgba(0,0,0,0.12)" }}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "0.5rem",
                      padding: "clamp(1.25rem, 2vw, 2rem)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "box-shadow 0.3s",
                    }}
                  >
                    <div
                      style={{
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <img
                        src={plat.logo}
                        alt={plat.name}
                        style={{
                          maxHeight: "2.5rem",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <h3
                      style={{
                        fontSize: "clamp(14px, 1.3vw, 18px)",
                        fontWeight: 700,
                        color: "#1A0A0F",
                        marginBottom: "0.5rem",
                        fontFamily: TYPOGRAPHY.fontHeading,
                      }}
                    >
                      {plat.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(12px, 1vw, 14px)",
                        color: "#475569",
                        lineHeight: 1.65,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {plat.desc}
                    </p>
                    <div
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: COLORS.burgundy,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                      }}
                    >
                      Learn More →
                    </div>
                  </motion.div>
                );
                return plat.external ? (
                  <a
                    key={plat.name}
                    href={plat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {CardInner}
                  </a>
                ) : (
                  <Link
                    key={plat.name}
                    to={plat.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {CardInner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7: INDUSTRIES WE SERVE ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.ABOUT_INDUSTRIES_BG,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                ...TYPOGRAPHY.eyebrow,
                color: COLORS.gold,
                marginBottom: "0.75rem",
              }}
            >
              SECTORS WE PROTECT
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
                marginBottom: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.15,
              }}
            >
              Industries We{" "}
              <span style={{ color: COLORS.gold }}>Serve</span>
            </motion.h2>
            <div
              className="about-industries-badges"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {industries.map((ind, i) => (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 24px ${ALPHAS.gold30}`,
                    borderColor: COLORS.gold,
                  }}
                  style={{
                    padding: "0.75rem 2rem",
                    border: `1px solid ${ALPHAS.gold20}`,
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.03)",
                    fontSize: "clamp(13px, 1.2vw, 16px)",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.88)",
                    cursor: "default",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {ind}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8: GLOBAL PRESENCE MAP ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.HERO_BG,
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 90px)",
            ...sectionPad,
          }}
        >
          <div
            className="about-map-grid"
            style={{
              width: "100%",
              margin: "0 auto",
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
                  marginBottom: "14px",
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
                  borderLeft: `2px solid ${COLORS.burgundy}`,
                  borderRadius: "2px",
                  padding: "16px 16px 16px 18px",
                  marginBottom: "14px",
                  cursor: "pointer",
                  ...getGlassStyle(activeLocation === "Nashik"),
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
                  #1, State Bank Colony, Indira Nagar,
                  <br />
                  Maharashtra - 422009
                </div>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {["Dallas"].map((city) => (
                  <div
                    key={city}
                    onMouseEnter={() => setActiveLocation(city)}
                    onMouseLeave={() => setActiveLocation(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      cursor: "pointer",
                      ...getGlassStyle(activeLocation === city),
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
                borderRadius: "10px",
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
          subtitle="Whether you are looking for strategic advisory, offensive security, managed defense, or platform-led cybersecurity transformation, QuasarCyberTech is ready to partner with you."
          primaryAction={{ label: "Talk to a Security Expert", link: "/contact" }}
          secondaryAction={{ label: "Explore Capabilities", link: "/capabilities" }}
        />
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes qct-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.7); }
        }

        @media (max-width: 1100px) {
          .about-who-grid, .about-map-grid, .about-founder-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-ecosystem-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .about-why-grid {
            grid-template-columns: 1fr !important;
          }
          .about-ecosystem-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 1024px) {
          .about-content-section {
            padding-left: var(--page-padding-x) !important;
            padding-right: var(--page-padding-x) !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
