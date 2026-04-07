import React from "react";
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS, GRADIENTS } from "../config/themeConfig";
import { motion } from "framer-motion";
import HeroBreadcrumb from "./HeroBreadcrumb";
import ScrollIndicatorButton from "./ScrollIndicatorButton";
import { ASSETS } from "@/constants/assets";
import type { ScrollMethod } from '@/utils/scrollToTarget';

const HS = {
  paddingTop: "clamp(7rem, 12vh, 11rem)",
  paddingBottom: "2.5rem",
  paddingX: LAYOUT_CONTROLS.global.paddingX,
  breadcrumbBottom: "1rem",
  titleBottom: "1.5rem",
  descBottom: "1.5rem",
  buttonGap: "1.5rem",
  minHeight: "100vh",
  contentJustify: "center",
};

export interface PageHeroProps {
  title: string | React.ReactNode;
  highlight: string | React.ReactNode;
  subtitle: string;
  breadcrumbPaths?: string[];
  currentName?: string;
  image?: string;
  imageKeyword?: string;
  imageRotate?: string;
  imageRotateMobile?: string;
  imageScale?: number;
  imageScaleMobile?: number;
  imageOpacity?: number;
  imageOpacityMobile?: number;
  imagePosition?: string;
  imagePositionX?: string;  // Horizontal position: "0%" (left) to "100%" (right), or "left"/"center"/"right"
  imagePositionY?: string;  // Vertical position: "0%" (top) to "100%" (bottom), or "top"/"center"/"bottom"
  imagePositionXMobile?: string;
  imagePositionYMobile?: string;
  imageBlendStart?: string;  // Mask gradient start position (0% to 100%)
  imageBlendEnd?: string;    // Mask gradient end position (width % - controls blend end point)
  imageBlendSoftness?: string; // Blend transition softness (0% = hard edge to 100% = very soft)
  imageBlendStartPercent?: string; // Where blend starts (0% = full width visible, 100% = almost full gradient)
  maskStart?: string;
  maskEnd?: string;
  maskStartMobile?: string;
  maskEndMobile?: string;
  rightContent?: React.ReactNode;
  metrics?: { value: string; label: string }[];
  scrollTargetId?: string;
  scrollButtonText?: string;
  scrollMethod?: ScrollMethod;
  scrollOffsetPx?: number;
  visualVariant?: "standard" | "fingerprint" | "none";
  backgroundOverride?: string;
  visualFullWidth?: boolean;
  visualWidth?: string;
  visualWidthMobile?: string;
  visualHeightMobile?: string;
  gradientCenter?: string;
  gradientRadius?: string;
  imageFit?: "cover" | "contain";
  compact?: boolean;
  paddingTopOverride?: string;
  minHeightOverride?: string;
  subtitleMaxWidth?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  highlight,
  subtitle,
  breadcrumbPaths,
  currentName,
  image,
  imageRotate = "0deg",
  imageRotateMobile,
  imageScale = 1.0,
  imageScaleMobile,
  imageOpacity = 0.8,
  imageOpacityMobile,
  imagePosition = "center center",
  imagePositionX = "center",     // Horizontal image position
  imagePositionY = "center",     // Vertical image position
  imagePositionXMobile,
  imagePositionYMobile,
  imageBlendStart = "5%",        // Blend gradient start position
  imageBlendEnd = "75%",
  imageBlendSoftness = "70%",    // Blend transition softness
  imageBlendStartPercent = "0%", // Where blend starts (0% = full width, 100% = almost full gradient)
  maskStart = "5%",
  maskEnd = "75%",
  maskStartMobile,
  maskEndMobile,
  rightContent,
  metrics,
  scrollTargetId,
  scrollButtonText = "Explore",
  scrollMethod = 'motion',
  scrollOffsetPx = 20,
  visualVariant = "standard",
  backgroundOverride,
  visualFullWidth = false,
  visualWidth,
  visualWidthMobile,
  visualHeightMobile,
  gradientCenter = "20% 60%",
  gradientRadius = "55%",
  imageFit = "cover",
  paddingTopOverride,
  minHeightOverride,
  subtitleMaxWidth,
  compact = false,
  children,
}) => {
  // Compute blend gradient stops based on softness and start percent
  // blendStartPercent: 0% = starts at 0% (full width), 100% = starts at 100% (almost full gradient)
  // blendSoftness: 0% = hard transition, 100% = soft transition
  const softnessValue = parseFloat(imageBlendSoftness || "70");
  const startPercentValue = parseFloat(imageBlendStartPercent || "0");
  
  // Compute actual gradient start and end
  const gradStart = `${startPercentValue}%`;
  const gradEnd = `${Math.min(startPercentValue + (100 - softnessValue), 100)}%`;
  
  // Use imageBlend controls if provided, otherwise fall back to computed values
  const blendStart = imageBlendStart !== undefined ? imageBlendStart : gradStart;
  const blendEnd = imageBlendEnd !== undefined ? imageBlendEnd : gradEnd;
  
  // Combine imagePositionX and imagePositionY for objectPosition
  const computedImagePosition = `${imagePositionX || "center"} ${imagePositionY || "center"}`;
  const mobileImagePositionX = imagePositionXMobile || imagePositionX || "center";
  const mobileImagePositionY = imagePositionYMobile || imagePositionY || "bottom";
  const mobileImageScale = imageScaleMobile ?? imageScale;
  const mobileImageOpacity = imageOpacityMobile ?? 0.45;
  const mobileMaskStart = maskStartMobile || "18%";
  const mobileMaskEnd = maskEndMobile || "86%";
  const mobileVisualWidth = visualWidthMobile || "100%";
  const mobileVisualHeight = visualHeightMobile || "54%";
  
  const dynamicBg =
    backgroundOverride ||
    GRADIENTS.HERO_BG ||
    `radial-gradient(circle at ${gradientCenter}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${gradientRadius})`;

  const hasVisualData = Boolean(rightContent || metrics || image);
  const imageOnlyVisual = Boolean(image && !rightContent && !metrics);

  return (
    <section
      className="page-hero-section"
      style={{
        position: "relative",
        minHeight: minHeightOverride || (compact ? "400px" : HS.minHeight),
        background: dynamicBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: HS.paddingX,
        paddingRight: HS.paddingX,
        paddingTop: paddingTopOverride || HS.paddingTop,
        paddingBottom: HS.paddingBottom,
        overflow: "hidden",
        fontFamily: TYPOGRAPHY.fontBody,
        boxSizing: "border-box",
        ["--hero-mobile-mask-start" as string]: mobileMaskStart,
        ["--hero-mobile-mask-end" as string]: mobileMaskEnd,
        ["--hero-mobile-image-position-x" as string]: mobileImagePositionX,
        ["--hero-mobile-image-position-y" as string]: mobileImagePositionY,
        ["--hero-mobile-image-scale" as string]: String(mobileImageScale),
        ["--hero-mobile-image-opacity" as string]: String(mobileImageOpacity),
        ["--hero-mobile-visual-width" as string]: mobileVisualWidth,
        ["--hero-mobile-visual-height" as string]: mobileVisualHeight,
      }}
    >
      <div
        className="page-hero-text"
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          maxWidth: "min(60%, 860px)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: HS.contentJustify,
        }}
      >
        {(breadcrumbPaths || currentName) && (
          <div style={{ marginBottom: HS.breadcrumbBottom }}>
            <HeroBreadcrumb
              paths={breadcrumbPaths}
              current={currentName || ""}
            />
          </div>
        )}

        <motion.h1
          className="page-hero-title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{
            ...TYPOGRAPHY.heroTitle,
            fontFamily: TYPOGRAPHY.fontHeading,
            color: COLORS.textOnDark,
            marginBottom: HS.titleBottom,
            lineHeight: 1.1,
            fontSize: "clamp(3rem, 3vw, 4.2rem)",
          }}
        >
          {title}
          {highlight ? (
            <span style={{ color: COLORS.gold }}> {highlight}</span>
          ) : null}
        </motion.h1>

        <motion.p
          className="page-hero-subtitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          style={{
            ...TYPOGRAPHY.bodyLarge,
            color: "rgba(255,255,255,0.76)",
            textAlign: "left",
            marginBottom: HS.descBottom,
            lineHeight: 1.8,
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            maxWidth: subtitleMaxWidth || "100%",
          }}
        >
          {subtitle}
        </motion.p>

        {children}

        {scrollTargetId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ marginBottom: "0" }}
          >
            <ScrollIndicatorButton
              targetId={scrollTargetId}
              text={scrollButtonText}
              method={scrollMethod}
              offsetPx={scrollOffsetPx}
            />
          </motion.div>
        )}
      </div>

      {visualVariant !== "none" && hasVisualData && (
        <div
          className={`page-hero-visual ${imageOnlyVisual ? "page-hero-visual--image-only" : ""}`.trim()}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: visualFullWidth ? "100%" : visualWidth || "56%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div
            className="page-hero-visual-mask"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              maskImage: `linear-gradient(to right, transparent ${blendStart}, black ${blendEnd})`,
              WebkitMaskImage: `linear-gradient(to right, transparent ${blendStart}, black ${blendEnd})`,
            }}
          >
            {visualVariant === "fingerprint" && (
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  opacity: 0.12,
                  filter: "brightness(1.5)",
                  position: "absolute",
                  right: "10%",
                  top: "55%",
                  transform: "translateY(-50%)",
                  background: `url(${ASSETS.logos.qct.icon}) no-repeat center`,
                  backgroundSize: "contain",
                  animation: "heroPulse 8s infinite ease-in-out",
                }}
              />
            )}

            {rightContent || metrics ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: HS.paddingX,
                  zIndex: 20,
                }}
              >
                {metrics ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(130px, 1fr))",
                      gap: "48px",
                      width: "100%",
                      maxWidth: "520px",
                      marginLeft: "auto",
                    }}
                  >
                    {metrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                        style={{ textAlign: "left" }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(2.2rem, 3.8vw, 3rem)",
                            fontWeight: 800,
                            color: COLORS.gold,
                            fontFamily: TYPOGRAPHY.fontHeading,
                            lineHeight: 1,
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.6)",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            marginTop: "10px",
                          }}
                        >
                          {m.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  rightContent
                )}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {image && (
                  <img
                    src={image}
                    alt="QuasarCyberTech | Hero Visual"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: imageFit,
                      objectPosition: computedImagePosition,
                      transform: "scale(var(--hero-image-scale)) rotate(var(--hero-image-rotate))",
                      transition: "transform 0.5s ease",
                      opacity: imageOpacity,
                      ["--hero-image-scale" as string]: String(imageScale),
                      ["--hero-image-rotate" as string]: imageRotate,
                      ["--hero-image-rotate-mobile" as string]: imageRotateMobile || imageRotate,
                    } as React.CSSProperties}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes heroPulse {
            0%, 100% { opacity: 0.1; transform: translateY(-50%) scale(1); }
            50% { opacity: 0.2; transform: translateY(-50%) scale(1.05); }
          }

          /* ── Large screens ── */
          @media (min-width: 1400px) {
            .page-hero-text {
              max-width: 860px !important;
            }
          }

          /* ── Desktop ── */
          @media (min-width: 1025px) {
            .page-hero-text {
              max-width: min(60%, 860px) !important;
            }
          }

          /* ── Tablet landscape ── */
          @media (max-width: 1024px) {
            .page-hero-text {
              max-width: 65% !important;
            }
            .page-hero-visual {
              width: 45% !important;
            }
            .page-hero-title {
              font-size: clamp(2.6rem, 4vw, 3.6rem) !important;
            }
          }

          /* ── Tablet portrait ── */
          @media (max-width: 860px) {
            .page-hero-section {
              padding-left: 2.5rem !important;
              padding-right: 2.5rem !important;
            }
            .page-hero-text {
              max-width: 100% !important;
            }
            .page-hero-visual {
              width: 50% !important;
              opacity: 0.5 !important;
            }
            .page-hero-title {
              font-size: 2.4rem !important;
            }
            .page-hero-subtitle {
              font-size: 1rem !important;
              text-align: left !important;
            }
          }

          /* ── Mobile ── */
          @media (max-width: 768px) {
            .page-hero-section {
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              padding-top: clamp(7rem, 14vh, 9rem) !important;
              min-height: 100svh !important;
              justify-content: center !important;
            }
            .page-hero-text {
              max-width: 100% !important;
              padding-bottom: 2rem !important;
              position: relative !important;
              z-index: 5 !important;
            }
            .page-hero-visual {
              display: none !important;
            }
            .page-hero-visual--image-only {
              display: block !important;
              width: var(--hero-mobile-visual-width, 100%) !important;
              left: auto !important;
              right: 0 !important;
              top: auto !important;
              bottom: 0 !important;
              height: var(--hero-mobile-visual-height, 54%) !important;
              opacity: 1 !important;
            }
            .page-hero-visual--image-only .page-hero-visual-mask {
              mask-image: linear-gradient(to top, black var(--hero-mobile-mask-start, 18%), transparent var(--hero-mobile-mask-end, 86%)) !important;
              -webkit-mask-image: linear-gradient(to top, black var(--hero-mobile-mask-start, 18%), transparent var(--hero-mobile-mask-end, 86%)) !important;
              align-items: flex-end !important;
            }
            .page-hero-visual--image-only img {
              object-position: var(--hero-mobile-image-position-x, center) var(--hero-mobile-image-position-y, bottom) !important;
              transform: scale(var(--hero-mobile-image-scale, var(--hero-image-scale))) rotate(var(--hero-image-rotate-mobile)) !important;
              opacity: var(--hero-mobile-image-opacity, 0.45) !important;
            }
            .page-hero-title {
              font-size: 2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 1rem !important;
            }
            .page-hero-subtitle {
              font-size: 0.95rem !important;
              line-height: 1.7 !important;
              text-align: left !important;
              margin-bottom: 1.5rem !important;
            }
          }

          /* ── Small mobile ── */
          @media (max-width: 480px) {
            .page-hero-section {
              padding-left: 2rem !important;
              padding-right: 2rem !important;
            }
            .page-hero-title {
              font-size: 1.8rem !important;
            }
          }
        `,
        }}
      />
    </section>
  );
};

export default PageHero;
