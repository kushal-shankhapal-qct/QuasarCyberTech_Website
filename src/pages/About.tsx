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
  Lightbulb,
  Users,
  Award,
  Handshake,
  Radar,
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
  const coreValues = [
    {
      title: "Integrity in every engagement",
      description:
        "We operate with uncompromising ethics in every client decision and technical recommendation.",
      icon: ShieldCheck,
    },
    {
      title: "Innovation as a way of life",
      description:
        "We continuously evolve our methods to stay ahead of adversaries and emerging attack surfaces.",
      icon: Lightbulb,
    },
    {
      title: "Customer-Centricity in all solutions",
      description:
        "Security outcomes are designed around business context, not generic control checklists.",
      icon: Users,
    },
    {
      title: "Excellence through expertise",
      description:
        "Our engineers are practitioners first, bringing precision and depth to each engagement.",
      icon: Award,
    },
    {
      title: "Collaboration for greater impact",
      description:
        "We embed with leadership and technical teams to deliver change that sticks.",
      icon: Handshake,
    },
    {
      title: "Adaptability in a changing landscape",
      description:
        "We architect resilient programs that can absorb rapid shifts in threat and technology.",
      icon: Radar,
    },
  ];

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
        title="About QuasarCyberTech — Our Mission, Values & Story"
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
          title="About"
          highlight="Us"
          subtitle="QuasarCyberTech was founded with its primary directive: providing critical infrastructure the security engineering required for a cyber-physical age."
          backgroundOverride={GRADIENTS.ABOUT_HERO_BG}
          image={ASSETS.capabilities.worldwideConnection}
          imageRotate="-90deg"
          imageScale={1.3}
          scrollTargetId="who-we-are"
          scrollButtonText="Discover Our Heritage"
          scrollMethod="motion"
          breadcrumbPaths={["Home"]}
          currentName="About"
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
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#1A0A0F",
                  marginBottom: "32px",
                  lineHeight: 1.1,
                }}
              >
                Engineering Resilience for
                <br />
                <span style={{ color: COLORS.gold }}>Global Enterprises</span>
              </h2>
              <div
                style={{
                  fontSize: "clamp(14px, 1.3vw, 15px)",
                  color: "#4A3040",
                  lineHeight: 1.9,
                  textAlign: "justify",
                }}
              >
                <p style={{ marginBottom: "24px" }}>
                  Founded at the intersection of offensive security and
                  defensive engineering, QuasarCyberTech (QCT) emerged to solve
                  the most complex challenges in modern digital infrastructure.
                </p>
                <p>
                  Today, we serve as the authoritative security partner for
                  Fortune 500 leaders, leveraging a proprietary ecosystem of
                  threat research and architectural excellence to defend
                  critical assets worldwide.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "26px 0",
                position: "relative",
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

        {/* ── 3: MISSION & VISION ── */}
        <section
          className="about-content-section"
          style={{
            background: GRADIENTS.ABOUT_MISSION_SECTION_BG,
            paddingTop: "80px",
            paddingBottom: "40px",
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div style={{ width: "100%", margin: "0 auto" }}>
            <div style={{ marginBottom: "clamp(32px, 5vw, 64px)" }}>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 2.5vw, 24px)",
                  fontWeight: 700,
                  color: COLORS.gold,
                  opacity: 0.9,
                }}
              >
                Resilience Engineered, Security Delivered
              </div>
            </div>
            <div
              className="about-mission-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
              }}
            >
              {[
                {
                  title: "MISSION",
                  icon: Target,
                  iconColor: "rgba(214,176,92,0.11)",
                  border: COLORS.gold,
                  text: "To deliver authoritative cybersecurity engineering that empowers enterprise leaders to innovate with confidence in an adversarial landscape.",
                },
                {
                  title: "VISION",
                  icon: Eye,
                  iconColor: "rgba(107,21,48,0.2)",
                  border: COLORS.burgundy,
                  text: "To redefine the standard for cyber-physical security, becoming the global benchmark for trust in critical infrastructure.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "2px",
                    padding: "clamp(20px, 3vw, 36px)",
                    borderLeft: `4px solid ${card.border}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <card.icon
                      size={96}
                      strokeWidth={1.1}
                      style={{ color: card.iconColor }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(16px, 2vw, 24px)",
                      fontWeight: 800,
                      marginBottom: "14px",
                      fontFamily: TYPOGRAPHY.fontHeading,
                      letterSpacing: "0.02em",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(13px, 1.3vw, 15.5px)",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.75,
                      margin: 0,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4: CORE VALUES ── */}
        <section
          className="about-content-section"
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 80px)",
            ...sectionPad,
          }}
        >
          <div style={{ width: "100%", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 36px)",
                fontWeight: 800,
                color: "#1A0A0F",
                marginBottom: "clamp(28px, 5vw, 64px)",
              }}
            >
              Our <span style={{ color: COLORS.gold }}>Core Values</span>
            </h2>
            <div
              className="about-values-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {coreValues.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderLeft: `4px solid ${COLORS.burgundy}`,
                    padding: "clamp(18px, 2.5vw, 32px)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <value.icon
                      size={96}
                      strokeWidth={1.15}
                      style={{ color: "rgba(11,31,59,0.06)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(13px, 1.3vw, 18px)",
                      fontWeight: 800,
                      color: COLORS.darkBase,
                      marginBottom: "12px",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "clamp(12px, 1vw, 15px)",
                      lineHeight: 1.7,
                      position: "relative",
                      zIndex: 2,
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5: GLOBAL PRESENCE MAP ── */}
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

        {/* ── 7: TIMELINE MILESTONES ── */}
        <MilestonesJourney />

        {/* ── 8: CTA ── */}
        <CTASection theme="dark" showEyebrow={true} />
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
          .about-who-grid, .about-map-grid, .about-mission-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
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
