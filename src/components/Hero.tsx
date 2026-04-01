import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ASSETS } from "@/constants/assets";
import { COLORS, GRADIENTS, TYPOGRAPHY } from "../config/themeConfig";

const logoSymbol = ASSETS.logos.qct.icon;

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
        paddingLeft: "clamp(3rem, 6vw, 7rem)",
        paddingRight: "clamp(3rem, 6vw, 7rem)",
        paddingTop: "clamp(120px, 14vh, 180px)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
        fontFamily: TYPOGRAPHY.fontBody,
        boxSizing: "border-box",
      }}
    >
      {/* Rotating mark */}
      <div
        className="home-hero-mark"
        style={{
          position: "absolute",
          right: "-24%",
          top: "44%",
          transform: "translateY(-45%)",
          width: "min(52vw, 700px)",
          aspectRatio: "1 / 1",
          pointerEvents: "none",
          opacity: 0.88,
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
          maxWidth: "min(860px, 56vw)",
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
            marginBottom: "1.25rem",
            lineHeight: 1.12,
            fontSize: "clamp(3rem, 4.2vw, 4.2rem)",
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
            marginBottom: "2.25rem",
            lineHeight: 1.75,
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            maxWidth: "600px",
          }}
        >
          QuasarCyberTech delivers cybersecurity consulting and engineering
          designed for enterprise scale — from advisory and offensive security
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
              e.currentTarget.style.background = "rgba(107,21,48,0.12)";
              e.currentTarget.style.borderColor = "#8B1E3F";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#6B1530";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              ...TYPOGRAPHY.buttonLarge,
              background: "transparent",
              color: "#FFFFFF",
              border: "1.5px solid #6B1530",
              borderRadius: "4px",
              padding: "16px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              fontWeight: 800,
              fontSize: "15px",
              letterSpacing: "0.05em",
            }}
          >
            Explore Capabilities
          </Link>

          <Link
            to="/contact"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8B1E3F";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
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
              border: "1px solid transparent",
              borderRadius: "4px",
              padding: "16px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              fontWeight: 800,
              fontSize: "15px",
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
          @media (min-width: 1400px) {
            .home-hero-copy {
              max-width: 860px !important;
            }
          }

          /* ── Tablet landscape ── */
          @media (max-width: 1100px) {
            .home-hero-copy {
              max-width: 60vw !important;
            }
            .home-hero-mark {
              right: -18% !important;
              width: min(50vw, 500px) !important;
            }
          }

          /* ── Tablet portrait ── */
          @media (max-width: 860px) {
            .home-hero-copy {
              max-width: 100% !important;
            }
            .home-hero-mark {
              right: -30% !important;
              width: 72vw !important;
              opacity: 0.2 !important;
            }
            .home-hero-title {
              font-size: 2.6rem !important;
            }
            .home-hero-subtitle {
              max-width: 100% !important;
              font-size: 1rem !important;
            }
          }

          /* ── Mobile ── */
          @media (max-width: 600px) {
            .home-hero-section {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
              padding-top: 160px !important;
              padding-bottom: 3rem !important;
              justify-content: flex-start !important;
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
              opacity: 0.12 !important;
              width: 85vw !important;
              right: -25% !important;
              top: 50% !important;
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
              gap: 12px !important;
            }
            .home-hero-actions a {
              width: 100% !important;
              text-align: center !important;
              padding: 14px 20px !important;
              font-size: 13px !important;
            }
          }

          /* ── Small mobile ── */
          @media (max-width: 400px) {
            .home-hero-section {
              padding-top: 140px !important;
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
