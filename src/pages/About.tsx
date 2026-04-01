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
import Seo from "../components/seo/Seo";
import { createBreadcrumbSchema, createAboutPageSchema } from "../seo/schema";

const METRIC_ANIMATION_DURATION = 1.2;
const DEFAULT_MAP_SCALE = 700;
const DEFAULT_MAP_CENTER: [number, number] = [79.6, 20.1];
const MAP_LEGEND_HEIGHT = 46;
const aboutBreadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

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

  const milestones = [
    {
      year: "2024",
      month: "Jul",
      title: "Incorporation",
      description: "QCTPL was incorporated, marking the beginning of our cybersecurity journey.",
    },
    {
      year: "2024",
      month: "Oct",
      title: "Nashik Office Launch",
      description: "Established our first operational headquarters in Nashik.",
    },
    {
      year: "2024",
      month: "Nov",
      title: "Startup India Recognition",
      description: "Recognized under the Startup India initiative, validating our innovation approach.",
    },
    {
      year: "2024",
      month: "Dec",
      title: "Strategic Partnerships",
      description: "Partnered with VANAPS and AIKouKab for global collaboration.",
    },
    {
      year: "2025",
      month: "Jan",
      title: "Bengaluru & Mumbai Expansion",
      description: "Strengthened national presence with new offices in two major cities.",
    },
    {
      year: "2025",
      month: "Jan",
      title: "NASSCOM Membership",
      description: "Joined India's leading tech industry body, NASSCOM.",
    },
    {
      year: "2025",
      month: "Jun",
      title: "QStellar Development",
      description: "Initiated development of our flagship AI-powered asset intelligence platform.",
    },
    {
      year: "2025",
      month: "Aug",
      title: "Indian Business Excellence Award",
      description: "Featured and recognized at the Indian Business Excellence Awards 2025.",
    },
    {
      year: "2025",
      month: "Aug",
      title: "UltraTech Partnership",
      description: "Achieved official partner status with UltraTech, enhancing enterprise reach.",
    },
    {
      year: "2025",
      month: "Aug",
      title: "Global Expansion",
      description: "Established international presence in Dallas, USA.",
    },
    {
      year: "2025",
      month: "Sep",
      title: "Emerging Company of the Year",
      description: "Recognized by Business Connect Magazine as Emerging Company of the Year 2025.",
    },
  ];

  const milestonesByYear = milestones.reduce((acc, current) => {
    if (!acc[current.year]) {
      acc[current.year] = [];
    }
    acc[current.year].push(current);
    return acc;
  }, {} as Record<string, typeof milestones>);

  const years = Object.keys(milestonesByYear).sort();

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
      <Seo
        title="About QuasarCyberTech — Our Mission, Values & Story"
        description="Learn about QuasarCyberTech — an enterprise cybersecurity consulting and engineering firm committed to building a safer digital world through offensive security, advisory, and managed defense."
        path="/about"
        image={ASSETS.capabilities.advisory}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
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

        {/* ── 7: TIMELINE MILESTONES ── */}
        <section
          style={{
            background: "#f8f7f5",
            paddingTop: "clamp(60px, 8vw, 90px)",
            paddingBottom: "clamp(60px, 8vw, 100px)",
            ...sectionPad,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "48px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase" }}>
                  Company Milestones
                </span>
                <div style={{ height: "1px", width: "40px", background: "#D6B05C" }} />
              </div>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 8px",
                  lineHeight: 1.2,
                }}
              >
                Milestones Since <span style={{ color: "#6B1530", fontStyle: "normal" }}>Inception</span>
              </h2>
              <p style={{ fontSize: "14px", color: "#666", maxWidth: "480px", lineHeight: 1.6, margin: 0 }}>
                A clear progression of strategic growth moments shaping QuasarCyberTech into a trusted cybersecurity authority.
              </p>
            </div>

            {/* Timeline View */}
            <div style={{ position: "relative", paddingLeft: "24px" }}>
              {/* Gray Dashed Spine */}
              <div 
                style={{ 
                  position: "absolute", 
                  left: "7px", 
                  top: "0", 
                  bottom: "0", 
                  width: "2px", 
                  borderLeft: "2px dashed #e8e8e8" 
                }} 
              />
              {/* Burgundy Solid Progress */}
              <div 
                style={{ 
                  position: "absolute", 
                  left: "7px", 
                  top: "0", 
                  width: "2px", 
                  background: "#6B1530", 
                  height: "calc(100% - 80px)",
                  borderRadius: "2px"
                }} 
              />

              {years.map((year, yIdx) => (
                <div key={year} style={{ marginBottom: "40px" }}>
                  {/* Year Marker & Label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", position: "relative" }}>
                    <div 
                      style={{ 
                        position: "absolute", 
                        left: "-24px", 
                        width: "16px", 
                        height: "16px", 
                        borderRadius: "50%", 
                        background: "#6B1530", 
                        border: "3px solid #f8f7f5", 
                        zIndex: 1, 
                        marginTop: "2px" 
                      }} 
                    />
                    <div style={{ width: "16px", flexShrink: 0 }} />
                    <div style={{ fontSize: "42px", fontWeight: 800, color: "#6B1530", lineHeight: 1, flexShrink: 0 }}>
                      {year}
                    </div>
                    <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to right, #6B1530 0%, #e0e0e0 100%)" }} />
                  </div>

                  {/* Cards Grid */}
                  <div style={{ paddingLeft: "16px" }}>
                    <div 
                      className="ms-cards-grid"
                      style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(4, 1fr)", 
                        gap: "12px" 
                      }}
                    >
                      {milestonesByYear[year].map((milestone, idx) => (
                        <motion.div
                          key={`${year}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (yIdx * 0.1) + (idx * 0.04) }}
                          style={{
                            background: "#fff",
                            border: "0.5px solid #e0e0e0",
                            borderLeft: `2.5px solid #6B1530`,
                            borderRadius: "0 8px 8px 0",
                            padding: "14px",
                            position: "relative"
                          }}
                        >
                          <span 
                            style={{ 
                              display: "inline-block", 
                              background: "rgba(214,176,92,0.15)", 
                              color: "#8a6a1a", 
                              fontSize: "10px", 
                              fontWeight: 700, 
                              letterSpacing: "0.1em", 
                              textTransform: "uppercase", 
                              padding: "2px 8px", 
                              borderRadius: "20px", 
                              marginBottom: "8px" 
                            }}
                          >
                            {milestone.month}
                          </span>
                          <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 5px", lineHeight: 1.3 }}>
                            {milestone.title}
                          </h4>
                          <p style={{ fontSize: "11.5px", color: "#777", lineHeight: 1.5, margin: 0 }}>
                            {milestone.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Pinnacle Achievement Block */}
              <div style={{ paddingLeft: "16px", marginTop: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", position: "relative" }}>
                  <div 
                    style={{ 
                      position: "absolute", 
                      left: "-27px", 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "50%", 
                      background: "#D6B05C", 
                      border: "3px solid #f8f7f5", 
                      zIndex: 2,
                      boxShadow: "0 0 0 2px #D6B05C"
                    }} 
                  />
                  <div style={{ width: "20px", flexShrink: 0 }} />
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#D6B05C", textTransform: "uppercase" }}>
                    Pinnacle Achievement
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: GRADIENTS.ABOUT_ACHIEVEMENT_BG,
                    borderRadius: "12px",
                    padding: "clamp(24px, 4vw, 32px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(20px, 4vw, 32px)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "#D6B05C", borderRadius: "4px 0 0 4px" }} />
                  
                  {/* Badge */}
                  <div 
                    style={{ 
                      background: "rgba(214,176,92,0.12)", 
                      border: "1px solid rgba(214,176,92,0.3)", 
                      borderRadius: "8px", 
                      padding: "14px", 
                      flexShrink: 0, 
                      textAlign: "center", 
                      minWidth: "100px" 
                    }}
                  >
                    <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: "#D6B05C", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>CERT-In</span>
                    <span style={{ fontSize: "28px", display: "block", marginBottom: "2px" }}>🛡</span>
                    <span style={{ fontSize: "11px", color: "#D6B05C", fontWeight: 600, display: "block" }}>Empanelled</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div 
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: "6px", 
                        background: "rgba(34,197,94,0.1)", 
                        border: "1px solid rgba(34,197,94,0.25)", 
                        borderRadius: "20px", 
                        padding: "3px 12px", 
                        marginBottom: "12px" 
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Active — Empanelled</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>
                      We Are <span style={{ color: "#D6B05C", fontStyle: "normal" }}>CERT-In Empanelled</span>
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: "0 0 16px", maxWidth: "800px" }}>
                      QuasarCyberTech has successfully completed the CERT-In Empanelment process — authorizing us to conduct national-level cybersecurity audits for critical government and enterprise infrastructure across India.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {[
                        "Certifying client environments",
                        "Auditing banks & regulated entities",
                        "Nation-critical security assessments"
                      ].map(pill => (
                        <span key={pill} style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "4px 14px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
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

        .ms-cards-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }

        @media (max-width: 1100px) {
          .ms-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
           .about-who-grid, .about-map-grid, .about-mission-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 640px) {
          .ms-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `,
        }}
      />
    </div>
  );
}
