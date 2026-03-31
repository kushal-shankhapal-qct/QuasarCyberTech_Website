import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import LeadershipVision from "../components/LeadershipVision";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
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

const METRIC_ANIMATION_DURATION = 1.2;
const DEFAULT_MAP_SCALE = 700;
const DEFAULT_MAP_CENTER: [number, number] = [79.6, 20.1];
const MAP_LEGEND_HEIGHT = 46;

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

// --- Timeline Year Node ---
const TimelineYearNode: React.FC<{ year: string }> = ({ year }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      zIndex: 3,
      position: "relative",
    }}
  >
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "1px dashed rgba(214,176,92,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1px solid rgba(214,176,92,0.45)",
          background: "#0B1F3B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: COLORS.gold,
            boxShadow: "0 0 10px rgba(214,176,92,0.6)",
          }}
        />
      </div>
    </div>
    <span
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: COLORS.gold,
        fontFamily: TYPOGRAPHY.fontHeading,
        textTransform: "uppercase" as const,
      }}
    >
      {year}
    </span>
  </div>
);

// --- Timeline Card ---
const TimelineCard: React.FC<{
  tag: string;
  title: string;
  description: string;
  accentColor: string;
  index: number;
}> = ({ tag, title, description, accentColor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ background: "rgba(255,255,255,0.07)" }}
    style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${ALPHAS.white08}`,
      borderLeft: `3px solid ${accentColor}`,
      borderRadius: "4px",
      padding: "26px 24px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        bottom: "-10px",
        right: "-10px",
        width: "72px",
        height: "72px",
        opacity: 0.05,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="28" stroke={COLORS.gold} strokeWidth="2" />
        <circle cx="36" cy="36" r="10" fill={COLORS.gold} />
        <line
          x1="36"
          y1="8"
          x2="36"
          y2="64"
          stroke={COLORS.gold}
          strokeWidth="2"
        />
        <line
          x1="8"
          y1="36"
          x2="64"
          y2="36"
          stroke={COLORS.gold}
          strokeWidth="2"
        />
      </svg>
    </div>
    <p
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: COLORS.gold,
        textTransform: "uppercase" as const,
        marginBottom: "10px",
        opacity: 0.85,
      }}
    >
      {tag}
    </p>
    <h3
      style={{
        color: "#FFFFFF",
        fontSize: "1.05rem",
        fontWeight: 800,
        marginBottom: "10px",
        fontFamily: TYPOGRAPHY.fontHeading,
        lineHeight: 1.3,
      }}
    >
      {title}
    </h3>
    <p
      style={{
        color: "rgba(255,255,255,0.72)",
        fontSize: "0.93rem",
        lineHeight: 1.7,
        margin: 0,
      }}
    >
      {description}
    </p>
  </motion.div>
);

export default function About() {
  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
  const [activeLocation, setActiveLocation] = React.useState<string | null>(
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
      name: "Mumbai",
      coordinates: [72.8777, 19.076] as [number, number],
      label: "office" as const,
    },
    {
      name: "Bengaluru",
      coordinates: [77.5946, 12.9716] as [number, number],
      label: "office" as const,
    },
    {
      name: "Dallas",
      coordinates: [-96.7970, 32.7767] as [number, number],
      label: "office" as const,
    },
  ];

  const mapNodes = officeLocations;
  const officeArcSegments: any[] = [];

  const getGlassStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${isActive ? "rgba(214,176,92,0.45)" : ALPHAS.white08}`,
    boxShadow: isActive ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
    backdropFilter: "blur(6px)",
    transition: "all 0.24s ease",
  });

  const aboutMetrics = [
    { value: 120, suffix: "+", label: "Security Engagements" },
    { value: 15, suffix: "+", label: "Countries Served" },
    { value: 70, suffix: "+", label: "Enterprise Apps Assessed" },
    { value: 24, suffix: "x7", label: "Security Operations\nMonitoring" },
  ];

  const roadmapMilestones = [
    {
      year: "2021",
      tag: "Foundation Year",
      title: "Foundation & Security Vision",
      description:
        "QuasarCyberTech was established with a mission to engineer enterprise-grade cybersecurity programs rooted in governance, resilience, and execution discipline.",
      accentColor: COLORS.burgundy,
    },
    {
      year: "2022",
      tag: "Growth Phase",
      title: "Enterprise Delivery Expansion",
      description:
        "Scaled consulting and assessment engagements across regulated and high-growth organizations with stronger governance-led service models.",
      accentColor: COLORS.gold,
    },
    {
      year: "2024",
      tag: "Platform Acceleration",
      title: "Platform-Led Security Acceleration",
      description:
        "Expanded the product ecosystem to support continuous visibility, vulnerability intelligence, and measurable security maturity progression.",
      accentColor: COLORS.burgundy,
    },
  ];

  const sectionPad = {
    paddingLeft: LAYOUT_CONTROLS.section.paddingX,
    paddingRight: LAYOUT_CONTROLS.section.paddingX,
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
      <Navbar />

      <main>
        {/* ── 1: HERO ── */}
        <PageHero
          title="About"
          highlight="Us"
          subtitle="QuasarCyberTech was founded with its primary directive: providing critical infrastructure the security engineering required for a cyber-physical age."
          backgroundOverride={GRADIENTS.CAPABILITIES_OVERVIEW_HERO_BG}
          image={ASSETS.capabilities.worldwideConnection}
          imageRotate="-90deg"
          imageScale={1.3}
          scrollTargetId="who-we-are"
          scrollButtonText="Discover Our Heritage"
          breadcrumbPaths={["Home"]}
          currentName="About"
        />

        {/* ── 2: WHO WE ARE ── */}
        <section
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
              maxWidth: "1200px",
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
          style={{
            background: GRADIENTS.ABOUT_MISSION_SECTION_BG,
            paddingTop: "80px",
            paddingBottom: "40px",
            ...sectionPad,
            color: "#FFFFFF",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
          style={{
            background: SECTION_BACKGROUNDS.LIGHT,
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 6vw, 80px)",
            ...sectionPad,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              maxWidth: "1240px",
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
                {["Mumbai", "Bengaluru", "Dallas"].map((city) => (
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
                style={{ position: "relative", height: `calc(100% - ${MAP_LEGEND_HEIGHT}px)` }}
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
                      onMouseEnter={() => setActiveLocation(node.name)}
                      onMouseLeave={() => setActiveLocation(null)}
                    >
                      <circle
                        r={activeLocation === node.name ? 9 : 6}
                        fill={COLORS.gold}
                        stroke="#0B1F3B"
                        strokeWidth={1.4}
                        style={{ transition: "all 0.2s ease" }}
                      />
                      {activeLocation === node.name && (
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
                          />
                          <text
                            x={18}
                            y={-8}
                            fill="#FFFFFF"
                            fontSize={12}
                            fontWeight={700}
                          >
                            {node.name}
                          </text>
                        </>
                      )}
                    </Marker>
                  ))}
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

        {/* ── 6: REMOVED LEADERSHIP ── */}

        {/* ── 7: COMPANY ROADMAP — ZIGZAG TIMELINE ── */}
        <section
          style={{
            background: GRADIENTS.HERO_BG,
            paddingTop: LAYOUT_CONTROLS.section.paddingTop,
            paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
            ...sectionPad,
            borderTop: `1px solid ${ALPHAS.white08}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 0.8px, transparent 0.8px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "700px",
              height: "350px",
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse, rgba(214,176,92,0.06) 0%, transparent 70%)",
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: "clamp(32px, 5vw, 60px)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    ...TYPOGRAPHY.eyebrow,
                    color: COLORS.gold,
                    margin: 0,
                  }}
                >
                  COMPANY ROADMAP
                </p>
                <div
                  style={{
                    height: "1px",
                    width: "48px",
                    background: COLORS.gold,
                    opacity: 0.5,
                  }}
                />
              </div>
              <h2
                style={{
                  ...TYPOGRAPHY.sectionTitle,
                  fontFamily: TYPOGRAPHY.fontHeading,
                  color: "#FFFFFF",
                  marginBottom: "14px",
                }}
              >
                Milestones Since{" "}
                <span style={{ color: COLORS.gold }}>Inception</span>
              </h2>
              <p
                style={{
                  ...TYPOGRAPHY.bodyLarge,
                  color: "rgba(255,255,255,0.72)",
                  margin: 0,
                  maxWidth: "640px",
                  lineHeight: 1.7,
                }}
              >
                A clear progression of strategic growth moments shaping
                QuasarCyberTech into a trusted cybersecurity authority.
              </p>
            </motion.div>

            {/* Zigzag Timeline */}
            <div
              className="about-timeline-wrap"
              style={{
                position: "relative",
                maxWidth: "900px",
                margin: "0 auto 48px",
              }}
            >
              <div
                className="about-timeline-spine"
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(214,176,92,0.35) 12%, rgba(214,176,92,0.35) 88%, transparent 100%)",
                }}
              />

              {roadmapMilestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className="about-timeline-entry"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px 1fr",
                      gap: "0",
                      marginBottom: "40px",
                      alignItems: "center",
                    }}
                  >
                    {/* LEFT */}
                    <div
                      className={isLeft ? "about-tl-card" : "about-tl-spacer"}
                      style={{ paddingRight: "20px" }}
                    >
                      {isLeft ? (
                        <TimelineCard
                          tag={milestone.tag}
                          title={milestone.title}
                          description={milestone.description}
                          accentColor={milestone.accentColor}
                          index={index}
                        />
                      ) : (
                        <div
                          style={{
                            height: "1px",
                            background:
                              "linear-gradient(270deg, transparent, rgba(214,176,92,0.28))",
                          }}
                        />
                      )}
                    </div>

                    {/* CENTRE year node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <TimelineYearNode year={milestone.year} />
                    </motion.div>

                    {/* RIGHT */}
                    <div
                      className={!isLeft ? "about-tl-card" : "about-tl-spacer"}
                      style={{ paddingLeft: "20px" }}
                    >
                      {!isLeft ? (
                        <TimelineCard
                          tag={milestone.tag}
                          title={milestone.title}
                          description={milestone.description}
                          accentColor={milestone.accentColor}
                          index={index}
                        />
                      ) : (
                        <div
                          style={{
                            height: "1px",
                            background:
                              "linear-gradient(90deg, transparent, rgba(214,176,92,0.28))",
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CERT-In Featured */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${ALPHAS.gold30}`,
                borderLeft: `4px solid ${COLORS.gold}`,
                borderRadius: "4px",
                padding: "clamp(20px, 3vw, 28px)",
                boxShadow: "0 16px 34px rgba(0,0,0,0.3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse, rgba(214,176,92,0.09) 0%, transparent 70%)",
                }}
              />

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: COLORS.gold,
                    display: "inline-block",
                    animation: "qct-pulse 2s ease-in-out infinite",
                  }}
                />
                <p
                  style={{
                    ...TYPOGRAPHY.eyebrow,
                    color: COLORS.gold,
                    margin: 0,
                  }}
                >
                  LATEST MILESTONE
                </p>
              </div>

              <div
                className="about-certin-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={ASSETS.certifications.certin}
                  alt="CERT-In Logo"
                  style={{
                    height: "clamp(32px, 5vw, 48px)",
                    width: "auto",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(16px, 2.5vw, 26px)",
                    fontWeight: 800,
                    fontFamily: TYPOGRAPHY.fontHeading,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Advancing to{" "}
                  <span style={{ color: COLORS.gold }}>
                    CERT-In Empanelment
                  </span>
                </h3>
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  lineHeight: 1.7,
                  marginBottom: "18px",
                  maxWidth: "920px",
                }}
              >
                QuasarCyberTech has successfully passed the most crucial stage
                of the CERT-In Empanelment process and is now progressing toward
                official empanelment through the final interview round.
              </p>

              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "clamp(12px, 1.1vw, 15px)",
                  lineHeight: 1.65,
                  marginBottom: "14px",
                }}
              >
                This is a turning point for QuasarCyberTech and marks the
                beginning of bigger milestones, greater opportunities, and
                accelerated enterprise impact.
              </p>

              <div
                className="about-certin-bullets"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "14px",
                  marginBottom: "14px",
                }}
              >
                {[
                  "Certifying client environments",
                  "Working with banks and regulated entities",
                  "Leading national-level cybersecurity audits",
                ].map((point) => (
                  <div
                    key={point}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: COLORS.gold,
                        marginTop: "7px",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.84)",
                        fontSize: "clamp(12px, 1.1vw, 15px)",
                        lineHeight: 1.6,
                      }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

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

        /* =========================================
           TABLET  768px – 1024px
        ========================================= */
        @media (max-width: 1024px) and (min-width: 769px) {

          /* Who We Are: stack text above metrics */
          .about-who-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          /* Core Values: 2 columns */
          .about-values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Map: stack */
          .about-map-grid {
            grid-template-columns: 1fr !important;
          }

          /* Mission: keep 2 cols */
          .about-mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Timeline: narrower centre */
          .about-timeline-entry {
            grid-template-columns: 1fr 64px 1fr !important;
          }

          /* CERT-In bullets: 2 cols */
          .about-certin-bullets {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* =========================================
           MOBILE  ≤ 768px
        ========================================= */
        @media (max-width: 768px) {

          /* Who We Are */
          .about-who-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          /* Core Values: single column */
          .about-values-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Mission & Vision: single column */
          .about-mission-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Map: single column */
          .about-map-grid {
            grid-template-columns: 1fr !important;
          }

          /* ── Timeline ──
             Collapse zigzag into a vertical left-border list.
             Each entry becomes a simple block with the year label
             inline above the card, attached to the left border line.
          */
          .about-timeline-spine {
            display: none !important;
          }
          .about-timeline-wrap {
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 16px !important;
            border-left: 1px solid rgba(214,176,92,0.25) !important;
          }
          .about-timeline-entry {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            margin-bottom: 32px !important;
            padding: 0 !important;
            position: relative !important;
          }
          /* Year node: sits above the card, flush left, acts as a marker on the spine */
          .about-timeline-entry > div:nth-child(2) {
            /* the centre column with TimelineYearNode */
            order: 1 !important;
            position: absolute !important;
            left: -38px !important;
            top: 0 !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            width: auto !important;
          }
          /* Shrink rings on mobile */
          .about-timeline-entry > div:nth-child(2) > div > div:first-child {
            width: 32px !important;
            height: 32px !important;
          }
          .about-timeline-entry > div:nth-child(2) > div > div:first-child > div {
            width: 22px !important;
            height: 22px !important;
          }
          /* The actual card: always full width */
          .about-tl-card {
            order: 2 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          /* Hide the spacer/connector lines — not needed in mobile list */
          .about-tl-spacer {
            display: none !important;
          }

          /* CERT-In header wrap */
          .about-certin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }

          /* CERT-In bullets: single column */
          .about-certin-bullets {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }

        /* =========================================
           SMALL MOBILE  ≤ 480px
        ========================================= */
        @media (max-width: 480px) {
          .about-timeline-wrap {
            padding-left: 12px !important;
          }
          .about-timeline-entry > div:nth-child(2) {
            left: -32px !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
