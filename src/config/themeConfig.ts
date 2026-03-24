// ============================================================
// QUASARCYBERTECH — CENTRALIZED DESIGN SYSTEM
// Edit BRAND_CONTROLS to change the entire site's accent system.
// ============================================================

// ─── BRAND COLOR PALETTE ───
export const COLORS = {
  // Backgrounds
  darkBase: '#040B1D',
  deepCyberBlue: '#040B1D',
  softGrey: '#F5F7FA',
  cardOnLight: '#FFFFFF',
  cardOnDark: 'rgba(255,255,255,0.04)',
  pureWhite: '#FFFFFF',

  // Brand Accents — 3 purposes
  teal: '#6B1530',       // REPLACED: Teal is deprecated, using Burgundy for UI layers
  burgundy: '#6B1530',   // Action layer: buttons, nav active, card accents, borders
  gold: '#D6B05C',       // Emphasis layer: nav text, primary interactive accents
  accent: '#D6B05C',
  accentHover: '#C9A84C',

  // Text
  textOnDark: '#FFFFFF',
  textOnLight: '#0B1F3B',
  textMuted: '#8B949E',
  textSub: '#374151', // Darkened from #5A6478 for better authority and readability
  burgundyHover: '#8B1E3F',

  // Legacy aliases (safe to remove when no component uses them)
  electricBlue: '#1F6FEB',
  brandPrimary: '#6B1530',
  brandSecondary: '#6B1530',
  securityTeal: '#6B1530',
  accentGold: '#D6B05C',
  lightBase: '#FFFFFF',
  textMain: '#0B1F3B',
};

export const ALPHAS = {
  darkGlass: 'rgba(4, 11, 29, 0.88)',
  darkGlassStrong: 'rgba(4, 11, 29, 0.97)',
  deepBlueGlass: 'rgba(11, 31, 59, 0.7)',
  white08: 'rgba(255, 255, 255, 0.08)',
  white06: 'rgba(255, 255, 255, 0.06)',
  white03: 'rgba(255, 255, 255, 0.03)',
  white02: 'rgba(255, 255, 255, 0.02)',
  teal12: 'rgba(43, 196, 182, 0.12)',
  teal15: 'rgba(43, 196, 182, 0.15)',
  teal18: 'rgba(43, 196, 182, 0.18)',
  teal20: 'rgba(43, 196, 182, 0.2)',
  teal07: 'rgba(43, 196, 182, 0.07)',
  teal04: 'rgba(43, 196, 182, 0.04)',
  teal08: 'rgba(43, 196, 182, 0.08)',
  gold08: 'rgba(214, 176, 92, 0.08)',
  gold12: 'rgba(214, 176, 92, 0.12)',
  gold15: 'rgba(214, 176, 92, 0.15)',
  gold20: 'rgba(214, 176, 92, 0.20)',
  gold30: 'rgba(214, 176, 92, 0.3)',
  gold40: 'rgba(214, 176, 92, 0.4)',
  burgundy50: 'rgba(107, 21, 48, 0.5)',
};

export const SHADOWS = {
  nav: '0 4px 24px rgba(0, 0, 0, 0.5)',
  dropdown: '0 24px 64px rgba(0,0,0,0.7)',
  lightCard: '0 2px 20px rgba(11,31,59,0.07)',
  lightCardHover: '0 12px 40px rgba(107,21,48,0.12)',
  darkCard: '0 20px 50px rgba(0,0,0,0.5)',
};

// ─── CENTRALIZED LAYOUT CONTROLS ───
// Single place to tune all sizing across the site
export const LAYOUT_CONTROLS = {
  // ─── GLOBAL SCALING ────────────────────────────────────────
  globalScale: 0.9,                            // Scales down everything below Hero sections

  // ─── SECTION SPACING ───────────────────────────────────────
  section: {
    paddingTop: '64px',                        // Consistent spacing above content
    paddingBottom: '64px',                     // Symmetrical spacing below
    paddingX: '2.5rem',                        // Synchronized with Hero left-line
    gapBetweenHeaderAndContent: '48px',        // Strict rhythm
  },

  // ─── CARD SIZING ───────────────────────────────────────────
  card: {
    // Capability cards (light section)
    capabilityImageZoneHeight: '210px',        // Matches new photo height
    capabilityBodyPadding: '16px 18px 20px',   // was 20px 22px 24px
    capabilityCardRadius: '20px',              // Synced to user preference (was 32px)
    capabilityAccentThickness: '4px',          // Balanced accent stripe
    capabilityCardScale: 0.985,                // Subtle "scale down" factor
    capabilityCardShadow: '0 4px 20px rgba(0,0,0,0.06)', // Subtle default lift shadow

    // Industry cards (full-bg image style)
    industryCardHeight: '240px',               // was 280px

    // Platform cards
    platformImageZoneHeight: '140px',          // was 160px
    platformLogoStripHeight: '60px',           // was 72px

    // Insight cards
    insightImageZoneHeight: '140px',           // was 160px

    // Dark section service cards (framework expansion, capability service cards)
    serviceCardPadding: '16px 18px',           // was 20px 22px

    // Framework cards
    frameworkCardPadding: '20px 14px 16px',    // was 28px 16px 20px
    frameworkLetterSize: '60px',               // was 72px
    frameworkStageNameSize: '14px',            // was 15px
  },

  // ─── GRID GAPS ─────────────────────────────────────────────
  grid: {
    capabilityGap: '28px',                     // Increased for better breathing room
    industryGap: '16px',
    platformGap: '16px',
    insightGap: '20px',
  },

  // ─── TYPOGRAPHY SCALE ──────────────────────────────────────
  type: {
    sectionH2: 'clamp(24px, 3vw, 36px)',       // was clamp(28px, 3.5vw, 40px)
    sectionSubtitle: '15px',                   // was 16px
    cardTitle: '15px',                         // was 16-17px
    cardBody: '13px',                          // was 14px
    metricNumber: 'clamp(36px, 4vw, 52px)',    // was clamp(44px, 5vw, 64px)
  },

  // ─── FOOTER LOGO ───────────────────────────────────────────
  footer: {
    logoMarginTop: '-48px',                    // how far logo protrudes above footer top
    logoSize: '72px',                          // diameter of logo circle container
    logoImageSize: '48px',                     // icon image size inside circle
    columnPaddingTop: '24px',                  // space between logo and first contact item
  },

  // ─── BREADCRUMB POSITIONING ────────────────────────────────
  breadcrumbs: {
    top: '130px',                              // Updated per user request
    left: '2.5rem',                            // Synced with section.paddingX
    offsetY: '0px',
    offsetX: '5px',
    arrowColor: '#D6B05C',                     // Yellow per user request
  },
};

// ─── CENTRALIZED BRAND CONTROLS ───
// Single place to tweak every accent in the site.
export const BRAND_CONTROLS = {
  // Navigation
  navTextColor: '#FFFFFF',         // Normal text
  navHighlightColor: '#D6B05C',    // Hover/Active text (Yellow/Gold)
  navUnderlineColor: '#6B1530',    // Accent underline (Burgundy)
  navUnderlineHeight: '1.5px',     // Thinner line
  navActiveColor: '#D6B05C',       // Legacy support

  // Hero Section Buttons (Refined)
  heroPrimaryBg: 'transparent',    // Burgundy Outline for "Explore Capabilities"
  heroPrimaryText: '#6B1530',
  heroPrimaryBorder: '#6B1530',
  heroSecondaryBg: '#6B1530',      // Solid Burgundy for "Talk to an Expert"
  heroSecondaryText: '#FFFFFF',
  heroSecondaryBorder: 'transparent',

  // Trust Metrics (Refined: Burgundy accents, Blue/Black numbers)
  metricsNumberColor: '#0B1F3B',      // Deep Cyber Blue (authoritative)
  metricsSymbolColor: '#6B1530',      // Burgundy (+)
  metricsUnderlineColor: '#6B1530',   // Burgundy underline
  metricsLabelColor: '#5A6478',       // Muted text

  // QCT Framework
  frameworkTitleFont: 'var(--font-heading)',
  frameworkLetterColor: '#D6B05C',
  frameworkBulletColor: '#6B1530',
  frameworkArrowColor: '#D6B05C',

  // Dropdowns — single source of truth
  dropdown: {
    gap: '24px',
    bg: 'rgb(11, 31, 59)',
    accentColor: '#2BC4B6',
    accentHeight: '1px', shadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
    borderRadius: '0 0 12px 12px', // Flat top, rounded bottom
  },

  // Hero Background Gradient Controls
  heroGradient: {
    x: '20%',                      // Horizontal position (behind text)
    y: '60%',                      // Vertical position (lowered slightly)
    radius: '55%',                 // Radial spread
  }
};

// ─── TYPOGRAPHY SYSTEM ──────────────────────────────────────────
// Toggles between different brand personalities.
export type TypographyOption = 'current' | 'A' | 'B' | 'C';
export const ACTIVE_TYPOGRAPHY_OPTION: TypographyOption = 'A'; // Recommended: Option A

const TYPOGRAPHY_VARIANTS = {
  current: {
    fontHeading: "'Ubuntu', sans-serif",
    fontBody: "'Inter', sans-serif",
    trackingHeadline: '0em',
    trackingBody: '0em',
    trackingButton: '0.04em',
    trackingEyebrow: '0.1em',
    bodyWeight: 400,
    uiWeight: 500,
  },
  A: {
    fontHeading: "'Ubuntu', sans-serif",
    fontBody: "'DM Sans', sans-serif",
    trackingHeadline: '-0.01em',
    trackingBody: '0.003em',
    trackingButton: '0.1em',
    trackingEyebrow: '0.15em',
    bodyWeight: 300,
    uiWeight: 400,
  },
  B: {
    fontHeading: "'Ubuntu', sans-serif",
    fontBody: "'IBM Plex Sans', sans-serif",
    trackingHeadline: '-0.015em',
    trackingBody: '0em',
    trackingButton: '0.08em',
    trackingEyebrow: '0.12em',
    bodyWeight: 400,
    uiWeight: 500,
  },
  C: {
    fontHeading: "'Ubuntu', sans-serif",
    fontBody: "'Ubuntu', sans-serif",
    trackingHeadline: '-0.02em',
    trackingBody: '0em',
    trackingButton: '0.06em',
    trackingEyebrow: '0.12em',
    bodyWeight: 400,
    uiWeight: 500,
  }
};

const T = TYPOGRAPHY_VARIANTS[ACTIVE_TYPOGRAPHY_OPTION];

export const TYPOGRAPHY = {
  fontHeading: T.fontHeading,
  fontBody: T.fontBody,

  // Sizes & Weights
  heroTitle: { fontSize: 'clamp(36px, 4.5vw, 40px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: T.trackingHeadline },
  pageTitle: { fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: T.trackingHeadline },
  sectionTitle: { fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: T.trackingHeadline },
  cardTitle: { fontSize: '17px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0em', fontFamily: T.fontHeading },

  bodyLarge: { fontSize: '16px', fontWeight: T.bodyWeight, wordSpacing: '4px', lineHeight: 1.5, letterSpacing: T.trackingBody },
  bodyBase: { fontSize: '15px', fontWeight: T.bodyWeight, lineHeight: 1.65, letterSpacing: T.trackingBody },
  bodySmall: { fontSize: '13px', fontWeight: T.bodyWeight, lineHeight: 1.6, letterSpacing: T.trackingBody },

  navLink: { fontSize: '14px', fontWeight: T.uiWeight, letterSpacing: '0.01em' },
  buttonLarge: { fontSize: '13px', fontWeight: 700, letterSpacing: T.trackingButton, textTransform: 'uppercase' as const },
  buttonSmall: { fontSize: '12px', fontWeight: 700, letterSpacing: T.trackingButton, textTransform: 'uppercase' as const },
  eyebrow: { fontSize: '11px', fontWeight: 700, letterSpacing: T.trackingEyebrow, textTransform: 'uppercase' as const },
  metricNumber: { fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 800, lineHeight: 1, letterSpacing: T.trackingHeadline, fontFamily: T.fontHeading },
  metricLabel: { fontSize: '12px', fontWeight: 600, letterSpacing: T.trackingButton, textTransform: 'uppercase' as const },
  caption: { fontSize: '11px', fontWeight: 400, letterSpacing: '0.04em' },
};

// ─── GRADIENTS ───
export const GRADIENTS = {
  HERO_CTA_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  HERO_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  CTA_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  ACCENT: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
  BRAND_ACCENT: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
  LIGHT_SECTION_BG: '#F5F7FA',
  DARK_SECTION_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG_FRAMEWORK: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG_PLATFORMS: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG_INSIGHTS: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG_LEADERSHIP: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG_TESTIMONIALS: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  CYBER_ACCENT: '#2BC4B6',
};

// ─── SECTION BACKGROUNDS ───
export const SECTION_BACKGROUNDS = {
  DARK: '#06010A',
  DARK_ALT: '#06010A',
  LIGHT: '#F5F7FA',
  CARD_ON_LIGHT: '#FFFFFF',
  CARD_ON_DARK: 'rgba(255, 255, 255, 0.04)',
};

// ─── MAIN THEME CONFIG ───
// Only contains values that are actually referenced by components.
export const themeConfig = {
  activeTheme: 'default',
  themes: {
    default: {
      '--brand-primary': COLORS.burgundy,
      '--brand-secondary': COLORS.gold,
      '--accent-gold': COLORS.gold,
      '--deep-cyber-blue': COLORS.deepCyberBlue,
    }
  },

  global: {
    verticalSpacing: '100px',
    interactiveEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    sectionMarginLeft: '2em',
    sectionMarginRight: '2em',
    eyebrowMarginLeft: '2em',
    contentMarginLeft: '2em',
    containerPaddingX: '2em',
    lineThickness: '2.5px',
    eyebrowIntegration: 'concept-a' as 'concept-a' | 'concept-b' | 'concept-c' | 'default',
    eyebrowAccentColor: '#D6B05C',
    eyebrowFont: 'var(--font-heading)',
    eyebrowAccentLine: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
    sectionTitleSize: '40px',
    sectionTitleWeight: '700',
    sectionTitleLineHeight: '1.2',
    bodyTextSize: '15px',
    bodyTextLineHeight: '1.6',
    unifiedShadows: {
      clayOuter: '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.9)',
      clayInner: 'inset 4px 4px 8px rgba(0,0,0,0.18), inset -4px -4px 8px rgba(255,255,255,0.9)',
      cardSoft: '0 10px 30px rgba(0,0,0,0.06)',
      cardHover: '0 16px 40px rgba(0,0,0,0.08)',
      cardExtrude: '0 14px 28px rgba(0,0,0,0.07)',
    }
  },

  // Enterprise Services
  services: {
    cardHeight: '200px',
    imageBg: '#F0F1F6',
    imageScale: 1.15, // High-fidelity zoom control
    imagePadding: '14px',
  },

  // Industry Snapshot
  industry: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },

  // Featured Insights
  insights: {
    paddingTop: '100px',
    paddingBottom: '120px',
  },

  // Contact Page
  contact: {
    navStripHeight: '120px',
    overlapMarginTop: '-40px',
    heroPaddingTop: '180px',
    heroPaddingBottom: '120px',
    sectionPaddingTop: '80px',
    sectionPaddingBottom: '80px',
  },

  // Final CTA
  cta: {
    paddingY: '100px',
  },

  // Footer
  footer: {
    logoScale: 3.5,
    logoWidth: '150px',
    backgroundColor: '#4E0E26',
    textColor: 'rgba(255, 255, 255, 0.75)',
    headingColor: '#D6B05C',
    linkColor: 'rgba(255, 255, 255, 0.95)',
    linkHoverColor: '#D6B05C',
    iconColor: '#D6B05C',
    iconBg: 'rgba(214, 176, 92, 0.05)',
    iconHoverBg: '#D6B05C',
    iconHoverText: '#4E0E26',
    linkSpacing: '12px',
    columnsMarginLeft: '2.5rem',
    watermarkGlowRadius: '180px',
    watermarkOffsetY: '60px',
    textContrast: 'text-slate-700',
    linkContrast: 'text-slate-500',
    columnRatio: '3:5',
    socialIconContrast: 'high',
    watermarkHoverScale: 1.05,
  },
};

// ─── NAVBAR MATERIAL VARIANTS ───
export type NavbarVariant = 'A' | 'B' | 'C' | 'recommended' | 'current';

export const ACTIVE_NAVBAR_VARIANT: NavbarVariant = 'recommended';

export const NAVBAR_VARIANTS = {
  A: {
    // Option A: Warm Obsidian (Recommended for Hero context)
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: '1px solid rgba(255, 255, 255, 0.08)',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  },
  B: {
    // Option B: Deep Navy Slate (Technical/Cold)
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: '1px solid rgba(255, 255, 255, 0.06)',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  },
  C: {
    // Option C: Branded Dark with Teal Structural Accent
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: '1px solid rgba(43, 196, 182, 0.2)',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  },
  recommended: {
    // Recommended: Warm Pill + Cool/Teal Dropdown
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: '1px solid rgba(255, 255, 255, 0.08)',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  },
  current: {
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: 'none',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  }
};

const navMaterial = NAVBAR_VARIANTS[ACTIVE_NAVBAR_VARIANT];

// ─── NAVBAR CONFIG — Single source of truth for navbar ─────────────────────
export const NAVBAR_CONFIG = {

  // ─── WRAPPER (Visual placement) ───────────────────────────
  wrapper: {
    position: 'fixed' as const,
    topDefault: '0px',
    background: 'transparent',
    zIndex: 1000,
    gap: '40px',
    paddingTop: '20px',
    paddingLeft: '2em',
    paddingRight: '2em',

    logoContainerNudgeX: '0px',
    logoContainerNudgeY: '0px',
    logoIconNudgeX: '0px',
    logoIconNudgeY: '0px',
    logoTextNudgeX: '0px',
    logoTextNudgeY: '0px',


    contactNudgeX: '0px',
    contactNudgeY: '5px',
  },

  // ─── LOGO ICON ─────────────────────────────────────────────
  logoIcon: {
    width: '56px',
    height: '56px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    opacity: 1,
    containerHeight: '56px',
  },

  // ─── LOGO TEXT (image asset below icon) ────────────────────
  logoText: {
    width: '160px',
    height: 'auto',
    marginTop: '13px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    opacity: 1,
    collapseThreshold: 100,
    transitionDuration: '0.3s',
    transitionEasing: 'ease',
  },

  // ─── NAV PILL (middle pod) ──────────────────────────────────
  pill: {
    height: '46px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '6px',
    paddingRight: '6px',
    borderRadius: '100px',
    gap: '0.6em',
    nudgeX: '-10px',
    nudgeY: '5px',

    // Scrolled state (Dynamic Material Direction — Claymorphism)
    backgroundScrolled: navMaterial.pillBackground,
    backdropFilterScrolled: navMaterial.backdropFilter,
    borderScrolled: 'none',
    borderTopScrolled: navMaterial.pillBorderTop,
    boxShadowScrolled: '0 8px 32px rgba(0, 0, 0, 0.4)',

    // At-top state (fully transparent)
    backgroundTop: 'rgba(10, 8, 22, 0.0)',
    backdropFilterTop: 'none',
    borderTop: '1px solid rgba(255,255,255,0.0)',
    boxShadowTop: 'none',

    // Transition
    transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',

    link: {
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '16px',
      paddingRight: '16px',
      height: '100%',
      borderRadius: '100px',
      color: 'rgba(255,255,255,0.80)',
      colorHover: '#D6B05C',
      colorActive: '#D6B05C',
      textDecoration: 'none' as const,

      // Clean hover (no neomorphism)
      hoverBackground: 'rgba(255, 255, 255, 0.04)',
      hoverBoxShadow: 'none',
      // Edge border-radius for items inside the pill
      borderRadiusFirst: '100px 20px 20px 100px',
      borderRadiusLast: '20px 100px 100px 20px',
      borderRadiusMiddle: '20px',
      textTransform: 'none' as const,
      ...TYPOGRAPHY.navLink,
      fontFamily: TYPOGRAPHY.fontBody,

      activeIndicator: {
        type: 'none' as 'dot' | 'line' | 'none',
        dotSize: '3px',
        dotColor: '#6B1530',
        dotMarginTop: '2px',
        lineHeight: '1.5px',
        lineColor: '#6B1530',
        lineWidth: '70%',
      },

      chevron: {
        size: '10px',
        color: 'rgba(255,255,255,0.35)',
        marginLeft: '3px',
        rotateOnOpen: '180deg',
        transitionDuration: '0.2s',
      },
    },
  },

  // ─── CONTACT US BUTTON ──────────────────────────────────────
  contactButton: {
    height: '46px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px',
    borderRadius: '100px',
    background: '#6B1530',
    backgroundHover: '#8B1E3F',
    color: '#FFFFFF',
    colorHover: '#FFFFFF',
    ...TYPOGRAPHY.buttonLarge,
    fontFamily: TYPOGRAPHY.fontBody,
    textDecoration: 'none' as const,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    boxShadowHover: '0 4px 12px rgba(107,21,48,0.2)',
    transitionDuration: '0.2s',
    label: 'Contact Us',
    href: '/contact',
  },

  // ─── SCROLL BEHAVIOR ────────────────────────────────────────
  scroll: {
    logoTextHideAt: 120, // synced with collapseThreshold
    autoHideDelay: 2000,
    autoHideOnHomepage: false,
    revealOnScrollUp: true,
    revealOnMouseNearTop: true,
    mouseRevealZone: 60,
    hideTranslate: '-110%',
    hideDuration: '500ms', // slower hide
    revealDuration: '350ms', // slower reveal
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },

  // ─── DROPDOWNS — Shared Base ────────────────────────────────
  dropdown: {
    borderRadiusTop: '0px',
    borderRadiusBottom: '16px',
    borderRadius: '0 0 16px 16px',

    background: '#1C0D14',
    backdropFilter: 'none',

    topAccentHeight: '1.5px', // Option C uses 1.5px
    topAccentColor: '#D6B05C',
    topAccentOpacity: 0, // Hidden if using borderTop directly

    border: '2px solid rgba(214, 176, 92, 0.25)',
    borderTop: '2px solid rgba(214, 176, 92, 0.50)',
    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(214, 176, 92, 0.12)',

    openAnimation: 'fadeSlideDown 0.18s cubic-bezier(0.23,1,0.32,1)',
    closeDelay: 150,
    verticalOffset: '2em', // Gap between Navbar and Menu

    paddingTop: '24px',
    paddingBottom: '24px',
    paddingLeft: '32px',
    paddingRight: '32px',
    itemGap: '2px',
    columnGap: '48px',

    columnHeader: {
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: '#D6B05C',
      marginBottom: '10px',
      paddingBottom: '0px', // We'll manually handle underline width
      separatorHeight: '1px',
      separatorColor: 'rgba(214, 176, 92, 0.15)',
    },

    item: {
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.005em',
      color: 'rgba(255,255,255,0.78)',
      colorHover: '#D6B05C',
      paddingTop: '7px',
      paddingBottom: '7px',
      paddingLeft: '0px',
      paddingLeftHover: '0px', // Removed jitter
      paddingRight: '0px',
      background: 'transparent',
      backgroundHover: 'transparent',
      textDecoration: 'none' as const,
      transitionDuration: '0.15s',
    },

    iconItem: {
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.02)',
      backgroundHover: 'rgba(214, 176, 92, 0.06)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderHover: '1px solid rgba(214, 176, 92, 0.2)',
      gap: '12px',
      iconSize: '18px',
      iconColor: '#D6B05C',
      iconStrokeWidth: 1.5,
      labelFontSize: '13px',
      labelFontWeight: '500',
      labelColor: 'rgba(255,255,255,0.85)',
      subLabelFontSize: '11px',
      subLabelColor: 'rgba(255,255,255,0.4)',
      transitionDuration: '0.15s',
    },

    externalBadge: {
      symbol: '↗',
      fontSize: '10px',
      color: 'rgba(255,255,255,0.3)',
      marginLeft: '4px',
    },
  },

  // ─── CAPABILITIES MEGA MENU ─────────────────────────────────
  megaMenu: {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingHorizontal: '28px',
    columns: 4,
    columnGap: '48px',
    offsetX: '0px', // Nudge Capabilities menu left/right
  },

  // ─── PLATFORMS DROPDOWN ─────────────────────────────────────
  platformsMenu: {
    width: '380px',
    itemLayout: 'list' as const,
  },

  // ─── INDUSTRIES DROPDOWN ────────────────────────────────────
  industriesMenu: {
    width: '320px',
    layout: 'single-column' as const,
    itemGap: '8px',
  },

  // ─── COMPANY DROPDOWN ───────────────────────────────────────
  companyMenu: {
    width: '240px',
    itemLayout: 'list' as const,
  },
};
