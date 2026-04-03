import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ASSETS } from "@/constants/assets";
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS } from "../config/themeConfig";

const logoSymbol = ASSETS.logos.qct.icon;

// --- HERO CONFIG (HC) ---
const HC = {
  section: {
    mobile: {
      paddingTop: "3.125rem",
      paddingTopSmall: "8.25rem",
    },
  },
  vortex: {
    size: "100vh",
    opacity: 0.88,
    rotateSpeed: 160,
    // Mobile Overrides
    mobile: {
      size: "100vw",
      top: "100%", // Peek from below
      opacity: 0.42,
      nudgeX: "0%",
    }
  }
};

const Hero: React.FC = () => {
  return (
    <section
      className="home-hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        background: GRADIENTS.HERO_BG,
        overflow: "hidden",
        paddingLeft: LAYOUT_CONTROLS.global.paddingX,
        paddingRight: LAYOUT_CONTROLS.global.paddingX,
        paddingTop: "10rem", // 104px
        paddingBottom: "0",
        fontFamily: TYPOGRAPHY.fontBody,
        boxSizing: "border-box",
      }}
    >
      {/* Rotating mark */}
      <div
        className="home-hero-mark home-hero-mark--top"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(50%, -50%)",
          height: HC.vortex.size,
          aspectRatio: "1 / 1",
          pointerEvents: "none",
          opacity: HC.vortex.opacity,
        }}
      >
        <motion.img
          src={logoSymbol}
          alt=""
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 160, ease: "linear" }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Hero copy */}
      <div
        className="home-hero-copy"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "60vw",
        }}
      >
        <motion.h1
          className="home-hero-title"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark,
            marginBottom: "1rem",
            lineHeight: 1.12,
            fontSize: "clamp(2.6rem, 3vw, 3.8rem)",
          }}
        >
          Engineering{" "}
          <span style={{ color: COLORS.gold }}>Cyber Security Resilience</span>
          <br />
          for Modern Enterprises
        </motion.h1>

        <motion.p
          className="home-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            ...TYPOGRAPHY.bodyLarge,
            color: "rgba(255,255,255,0.78)",
            textAlign: "left",
            marginBottom: "2rem",
            lineHeight: 1.7,
            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
            maxWidth: "60vw",
          }}
        >
          QuasarCyberTech delivers cybersecurity consulting and engineering
          designed for enterprise scale from advisory and offensive security
          to managed defense and advanced security platforms.
        </motion.p>

        <motion.div
          className="home-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <Link
            to="/capabilities"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.96)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(-0.125rem)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.78)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              ...TYPOGRAPHY.buttonLarge,
              background: "transparent",
              color: "#FFFFFF",
              border: "0.09375rem solid rgba(255,255,255,0.78)",
              borderRadius: "0.25rem",
              padding: "1rem 2.25rem", // 16px 36px
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "all 0.3s ease",
              fontWeight: 800,
              fontSize: "0.875rem", // 14px
              whiteSpace: "nowrap",
            }}
          >
            Explore Capabilities
          </Link>

          <Link
            to="/contact"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8B1E3F";
              e.currentTarget.style.boxShadow = "0 0.625rem 1.25rem rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(-0.0625rem)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#6B1530";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              ...TYPOGRAPHY.buttonLarge,
              background: "#6B1530",
              color: "#FFFFFF",
              border: "0.0625rem solid transparent",
              borderRadius: "0.25rem",
              padding: "1rem 2.5rem", // 16px 40px
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              fontWeight: 800,
              fontSize: "0.9375rem", // 15px
              letterSpacing: "0.05em",
            }}
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* ── Large screens (1400px+) ── */
          @media (min-width: 87.5rem) {
            .home-hero-copy {
              max-width: 68.75rem !important;
            }
          }

          /* ── Tablet landscape ── */
          @media (max-width: 68.75rem) {
            .home-hero-copy {
              max-width: 60vw !important;
            }
            .home-hero-mark {
              right: -18% !important;
              width: min(50vw, 31.25rem) !important;
            }
          }

          /* ── Tablet portrait ── */
          @media (max-width: 53.75rem) {
            .home-hero-copy {
              max-width: 100% !important;
            }
            .home-hero-mark {
              right: 0 !important;
              transform: translate(40%, -50%) !important;
              width: 72vw !important;
              opacity: 0.2 !important;
            }
            .home-hero-title {
              font-size: clamp(2.2rem, 4vw, 2.6rem) !important;
            }
            .home-hero-subtitle {
              max-width: 100% !important;
              font-size: 1rem !important;
            }
          }

          /* ── Mobile ── */
          @media (max-width: 37.5rem) {
            .home-hero-section {
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              padding-top: ${HC.section.mobile.paddingTop} !important;
              padding-bottom: 2rem !important;
              justify-content: center !important;
              align-items: flex-start !important;
            }
            .home-hero-copy {
              max-width: 100% !important;
            }
            .home-hero-title {
              font-size: 1.9rem !important;
              line-height: 1.25 !important;
              margin-bottom: 1.25rem !important;
            }
            .home-hero-mark {
              opacity: ${HC.vortex.mobile.opacity} !important;
              height: auto !important;
              width: ${HC.vortex.mobile.size} !important;
              max-width: 100vw !important;
              right: 0 !important;
            }
            .home-hero-mark--top {
              transform: translate(${HC.vortex.mobile.nudgeX}, -50%) !important;
              top: ${HC.vortex.mobile.top} !important;
            }
            .home-hero-subtitle {
              font-size: 0.95rem !important;
              margin-bottom: 1.75rem !important;
              max-width: 100% !important;
              line-height: 1.7 !important;
              text-align: left !important;
            }
            .home-hero-actions {
              flex-direction: column !important;
              width: 100% !important;
              gap: 0.75rem !important;
            }
            .home-hero-actions a {
              width: 100% !important;
              text-align: center !important;
              padding: 0.875rem 1.25rem !important;
              font-size: 0.8125rem !important;
            }
          }

          /* ── Small mobile ── */
          @media (max-width: 25rem) {
            .home-hero-section {
              padding-top: ${HC.section.mobile.paddingTopSmall} !important;
            }
            .home-hero-title {
              font-size: 1.7rem !important;
            }
          }
        `,
        }}
      />
    </section>
  );
};

export default Hero;
