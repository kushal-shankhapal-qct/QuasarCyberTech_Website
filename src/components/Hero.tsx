import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ASSETS } from "@/constants/assets";
import { ALPHAS, COLORS, GRADIENTS, TYPOGRAPHY } from "../config/themeConfig";

const logoSymbol = ASSETS.logos.qct.icon;

const HS_HOME = {
  paddingLeft: "2rem",
  paddingBottom: "2rem",
  titleBottom: "1rem",
  descBottom: "1rem",
  buttonGap: "1rem",
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
        justifyContent: "flex-end",
        alignItems: "flex-start",
        background: GRADIENTS.HERO_BG,
        overflow: "hidden",
        paddingLeft: HS_HOME.paddingLeft,
        paddingRight: "2rem",
        paddingBottom: HS_HOME.paddingBottom,
        paddingTop: "clamp(100px, 18vh, 220px)",
        fontFamily: TYPOGRAPHY.fontBody,
      }}
    >
      <div
        className="home-hero-mark"
        style={{
          position: "absolute",
          right: "clamp(-200px, -8vw, -40px)",
          top: "50%",
          transform: "translateY(-45%)",
          width: "clamp(280px, 42vw, 600px)",
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

      <div
        className="home-hero-copy"
        style={{ maxWidth: "clamp(320px, 55vw, 720px)", position: "relative", zIndex: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark,
            marginBottom: HS_HOME.titleBottom,
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
            maxWidth: "100%",
            marginBottom: HS_HOME.descBottom,
            lineHeight: "1.7",
          }}
        >
          QuasarCyberTech delivers cybersecurity consulting and engineering
          designed for enterprise scale from advisory and offensive security to
          managed defense and advanced security platforms.
        </motion.p>

        <motion.div
          className="home-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ display: "flex", gap: HS_HOME.buttonGap, flexWrap: "wrap" }}
        >
          <Link
            to="/capabilities"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(107, 21, 48, 0.12)";
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
              border: `1.5px solid #6B1530`,
              borderRadius: "4px",
              padding: "16px 36px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              fontWeight: 800,
              fontSize: "14px",
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
              padding: "16px 36px",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              fontWeight: 800,
              fontSize: "14px",
            }}
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 1024px) {
            .home-hero-mark {
              right: -18% !important;
              width: min(62vw, 440px) !important;
            }
          }

          @media (max-width: 768px) {
            .home-hero-mark {
              opacity: 0.15 !important;
              width: min(75vw, 340px) !important;
              right: -10% !important;
            }
            .home-hero-copy {
              max-width: 100% !important;
            }
            .home-hero-subtitle {
              text-align: left !important;
              margin-bottom: 28px !important;
            }
            .home-hero-actions {
              width: 100% !important;
              gap: 12px !important;
              flex-direction: column !important;
            }
            .home-hero-actions a {
              width: 100% !important;
              min-width: 0 !important;
              padding: 14px 18px !important;
              justify-content: center !important;
            }
          }
        `,
        }}
      />
    </section>
  );
};

export default Hero;
