// ============================================================
// QUASARCYBERTECH — CENTRALIZED DESIGN SYSTEM
// ============================================================

// ─── BRAND COLOR PALETTE ───
export const COLORS = {
  darkBase: '#040B1D',
  deepCyberBlue: '#040B1D',
  softGrey: '#F5F7FA',
  cardOnLight: '#FFFFFF',
  cardOnDark: 'rgba(255,255,255,0.04)',
  pureWhite: '#FFFFFF',

  teal: '#6B1530',
  burgundy: '#6B1530',
  gold: '#D6B05C',
  accent: '#D6B05C',
  accentHover: '#C9A84C',

  textOnDark: '#FFFFFF',
  textOnLight: '#0B1F3B',
  textMuted: '#8B949E',
  textSub: '#374151',
  burgundyHover: '#8B1E3F',

  // Legacy aliases
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
  gold08: 'rgba(214, 176, 92, 0.08)',
  gold12: 'rgba(214, 176, 92, 0.12)',
  gold15: 'rgba(214, 176, 92, 0.15)',
  gold20: 'rgba(214, 176, 92, 0.20)',
  gold30: 'rgba(214, 176, 92, 0.3)',
  gold40: 'rgba(214, 176, 92, 0.4)',
  burgundy50: 'rgba(107, 21, 48, 0.5)',
};

export const SHADOWS = {
  nav: '0 0.25rem 1.5rem rgba(0, 0, 0, 0.5)',
  dropdown: '0 1.5rem 4rem rgba(0,0,0,0.7)',
  lightCard: '0 0.125rem 1.25rem rgba(11,31,59,0.07)',
  lightCardHover: '0 0.75rem 2.5rem rgba(107,21,48,0.12)',
  darkCard: '0 1.25rem 3.125rem rgba(0,0,0,0.5)',
};

// ─── CENTRALIZED LAYOUT CONTROLS ───
export const LAYOUT_CONTROLS = {
  globalScale: 0.9,
  global: {
    paddingX: 'var(--page-padding-x)',
  },
  section: {
    paddingTop: '4rem', // 64px
    paddingBottom: '4rem', // 64px
    paddingX: 'var(--page-padding-x)',
    gapBetweenHeaderAndContent: '3rem', // 48px
    frameworkHeaderToChassisGapDesktop: '2.25rem', // 36px
    frameworkHeaderToChassisGapTablet: '1.75rem', // 28px
    frameworkHeaderToChassisGapMobile: '1.5rem', // 24px
    ctaEyebrowDark: '#FFFFFF',
  },
  card: {
    capabilityImageZoneHeight: '13.125rem', // 210px
    capabilityBodyPadding: '1.125rem 1.25rem 0', // 18px 20px 0
    capabilityCardRadius: '1.25rem', // 20px
    capabilityAccentThickness: '0.25rem', // 4px
    capabilityCardScale: 0.985,
    capabilityCardShadow: '0 0.25rem 1.25rem rgba(0,0,0,0.06)',
    industryCardHeight: '15rem', // 240px
    platformImageZoneHeight: '8.75rem', // 140px
    platformLogoStripHeight: '3.75rem', // 60px
    insightImageZoneHeight: '8.75rem', // 140px
    serviceCardPadding: '1rem 1.125rem', // 16px 18px
    frameworkCardPadding: '1.25rem 0.875rem 1rem', // 20px 14px 16px
    frameworkLetterSize: '8rem',
    frameworkStageNameSize: '0.875rem', // 14px
    frameworkContentPaddingTop: '11.25rem', // 180px
    frameworkInitialLetterTop: '5rem', // 80px
    frameworkPointsGap: '0.75rem', // 12px
  },
  grid: {
    capabilityGap: '1.75rem', // 28px
    industryGap: '1rem', // 16px
    platformGap: '1rem', // 16px
    insightGap: '1.25rem', // 20px
  },
  type: {
    sectionH2: 'clamp(1.5rem, 3vw, 2.25rem)', // 24px -> 36px
    sectionSubtitle: '0.9375rem', // 15px
    cardTitle: '0.9375rem', // 15px
    cardBody: '0.8125rem', // 13px
    metricNumber: 'clamp(2.25rem, 4vw, 3.25rem)', // 36px -> 52px
  },
  footer: {
    logoMarginTop: '-3rem', // -48px
    logoSize: '4.5rem', // 72px
    logoImageSize: '3rem', // 48px
    columnPaddingTop: '1.5rem', // 24px
  },
  breadcrumbs: {
    top: '8.125rem', // 130px
    left: '2.5rem',
    offsetY: '0',
    offsetX: '0.3125rem', // 5px
    arrowColor: '#D6B05C',
  }
};

// ─── CENTRALIZED BRAND CONTROLS ───
export const BRAND_CONTROLS = {
  navTextColor: '#FFFFFF',
  navHighlightColor: '#D6B05C',
  navUnderlineColor: '#6B1530',
  navUnderlineHeight: '0.09375rem', // 1.5px
  metricsNumberColor: '#0B1F3B',
  metricsSymbolColor: '#6B1530',
  metricsUnderlineColor: '#6B1530',
  metricsLabelColor: '#5A6478',
  frameworkTitleFont: 'var(--font-heading)',
  frameworkLetterColor: '#D6B05C',
  frameworkBulletColor: '#6B1530',
  frameworkArrowColor: '#D6B05C',
  heroGradient: {
    x: '20%',
    y: '60%',
    radius: '55%',
  }
};

// ─── TYPOGRAPHY SYSTEM ──────────────────────────────────────────
export const TYPOGRAPHY = {
  fontHeading: "'Ubuntu', sans-serif",
  fontBody: "'Sora', sans-serif",
  heroTitle: { fontSize: 'clamp(2.25rem, 4.5vw, 2.5rem)', fontWeight: 520, lineHeight: 1.12, letterSpacing: '-0.01em' },
  pageTitle: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 520, lineHeight: 1.12, letterSpacing: '-0.01em' },
  sectionTitle: { fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
  cardTitle: { fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0em', fontFamily: "'Ubuntu', sans-serif" },
  bodyLarge: { fontSize: '1rem', fontWeight: 300, wordSpacing: '0.25rem', lineHeight: 1.5, letterSpacing: '0.003rem' },
  bodyBase: { fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.65, letterSpacing: '0.003rem' },
  bodySmall: { fontSize: '0.8125rem', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.003rem' },
  navLink: { fontSize: '0.875rem', fontWeight: 400, letterSpacing: '0.01rem' },
  buttonLarge: { fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1rem', textTransform: 'uppercase' as const },
  buttonSmall: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1rem', textTransform: 'uppercase' as const },
  eyebrow: { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15rem', textTransform: 'uppercase' as const },
  metricNumber: { fontSize: 'clamp(2.75rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01rem', fontFamily: "'Ubuntu', sans-serif" },
  metricLabel: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1rem', textTransform: 'uppercase' as const },
  caption: { fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.04rem' },
};

// ─── GRADIENT ENGINE ──────────────────────────────────────────────
// Arranged by Page/Purpose for visual maintenance.
// Desktop and Mobile presets are defined once and mapped to CSS variables.
type EllipseGradientControls = {
  // Position control (direction bias)
  center: string;
  // Radius control: make circle-like by setting radiusX === radiusY
  radiusX?: string;
  radiusY?: string;
  // Core gradient colors/stops
  startColor: string;
  endColor: string;
  startStop?: string;
  endStop?: string;
  // Optional rotation-like directional overlay (CSS radial gradients do not rotate natively)
  rotationDeg?: string;
  rotationStartColor?: string;
  rotationEndColor?: string;
  rotationStartStop?: string;
  rotationEndStop?: string;
};

const buildEllipseGradient = ({
  center,
  radiusX,
  radiusY,
  startColor,
  endColor,
  startStop = '0%',
  endStop = '55%',
  rotationDeg,
  rotationStartColor,
  rotationEndColor,
  rotationStartStop = '0%',
  rotationEndStop = '100%',
}: EllipseGradientControls): string => {
  const radialBase = radiusX && radiusY
    ? `radial-gradient(ellipse ${radiusX} ${radiusY} at ${center}, ${startColor} ${startStop}, ${endColor} ${endStop})`
    : `radial-gradient(ellipse at ${center}, ${startColor} ${startStop}, ${endColor} ${endStop})`;

  if (rotationDeg && rotationStartColor && rotationEndColor) {
    return `linear-gradient(${rotationDeg}, ${rotationStartColor} ${rotationStartStop}, ${rotationEndColor} ${rotationEndStop}), ${radialBase}`;
  }

  return radialBase;
};

export const GRADIENT_PRESETS = {
  desktop: {
    // 1: Hero & Global Presets
    HERO_BG: 'radial-gradient(ellipse at 25% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 85%)',
    DARK_SECTION_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    NAVBAR_STRIP_BG: buildEllipseGradient({
      center: '50% 100%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '100%',
    }),

    // 2: Home Page Sections
    HOME_FRAMEWORK_BG: 'radial-gradient(ellipse at 10% 20%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 100%)',
    HOME_PLATFORMS_BG: 'radial-gradient(ellipse at 19% 20%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    HOME_INSIGHTS_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    HOME_LEADERSHIP_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    HOME_TESTIMONIALS_BG: 'radial-gradient(ellipse at 20% 0%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 50%)',

    // 3: Careers Page
    CAREERS_HERO_BG: 'radial-gradient(ellipse at 30% 70%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
    CAREERS_WHY_JOIN_BG: 'radial-gradient(ellipse at 70% 30%, rgba(56,8,26,0.8) 0%, rgba(10,10,15,1) 60%)',
    CAREERS_QLEAP_BG: 'radial-gradient(ellipse at 50% 10%, rgba(56,8,26,0.6) 0%, rgba(10,10,15,1) 80%)',

    // 4: Capabilities Pages
    CAPABILITIES_OVERVIEW_HERO_BG: 'radial-gradient(ellipse at 27% 57%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
    CAPABILITY_INDIVIDUAL_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

    // 5: Industry Pages
    INDUSTRIES_OVERVIEW_HERO_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    INDUSTRY_INDIVIDUAL_HERO_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    INDUSTRY_CHALLENGES_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,0,0,1) 55%)',

    // 6: About & Vision
    ABOUT_HERO_BG: 'radial-gradient(ellipse at 27% 57%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
    ABOUT_ACHIEVEMENT_BG: 'radial-gradient(ellipse at 50% 50%, rgba(20,8,26,1) 0%, rgba(0,0,0,1) 100%)',
    ABOUT_MISSION_SECTION_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    ABOUT_FOUNDERS_VISION_BG: 'radial-gradient(ellipse at 30% 40%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
    ABOUT_WHY_US_BG: 'radial-gradient(ellipse at 23% 24%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 60%)',
    ABOUT_INDUSTRIES_BG: 'radial-gradient(ellipse at 80% 80%, rgba(56,8,26,0.9) 0%, rgba(0,1,18,1) 80%)',

    // 7: Insights & Individual Blog
    BLOGS_OVERVIEW_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    BLOGS_OVERVIEW_NEWSLETTER_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
    BLOG_INDIVIDUAL_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

    // 8: Contact & Platforms
    CONTACT_RIGHT_CARD_BG: 'radial-gradient(ellipse at 50% 20%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 60%)',
    PLATFORMS_PAGE_BG: '#040B1D',

    // 9: Section-Specific Dark Surfaces
    ABOUT_GLOBAL_PRESENCE_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    CAPABILITY_INDIVIDUAL_SERVICE_AREAS_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    CAPABILITY_INDIVIDUAL_INDUSTRY_APPLICATION_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    CAPABILITIES_DETAIL_DELIVERY_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    CAPABILITIES_DETAIL_PLATFORM_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    PLATFORMS_QPULSE_SECTION_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    PLATFORMS_QLEAP_SECTION_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    LEADERSHIP_VISION_DARK_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    NOT_FOUND_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
    FORBIDDEN_BG: 'radial-gradient(ellipse at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 75%)',
  },
  mobile: {
    // 1: Hero & Global Presets
    HERO_BG: buildEllipseGradient({
      center: '35% 42%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    DARK_SECTION_BG: 'radial-gradient(ellipse at 50% 50%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 60%)',
    NAVBAR_STRIP_BG: buildEllipseGradient({
      center: '50% 100%',
      radiusX: '100%',
      radiusY: '100%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '100%',
      rotationDeg: '8deg',
      rotationStartColor: 'rgba(56,8,26,0.18)',
      rotationEndColor: 'rgba(0,1,18,0.12)',
    }),

    // 2: Home Page Sections
    HOME_FRAMEWORK_BG: buildEllipseGradient({
      center: '40% 13%',
      radiusX: '160%',
      radiusY: '80%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    HOME_PLATFORMS_BG: buildEllipseGradient({
      center: '40% 10%',
      radiusX: '160%',
      radiusY: '50%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    HOME_INSIGHTS_BG: buildEllipseGradient({
      center: '40% 12%',
      radiusX: '160%',
      radiusY: '60%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    HOME_LEADERSHIP_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    HOME_TESTIMONIALS_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '58%',
    }),

    // 3: Careers Page
    CAREERS_HERO_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '92%',
    }),
    CAREERS_WHY_JOIN_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,0.8)',
      endColor: 'rgba(10,10,15,1)',
      endStop: '68%',
    }),
    CAREERS_QLEAP_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,0.6)',
      endColor: 'rgba(10,10,15,1)',
      endStop: '84%',
    }),

    // 4: Capabilities Pages
    CAPABILITIES_OVERVIEW_HERO_BG: buildEllipseGradient({
      center: '45% 50%',
      radiusX: '150%',
      radiusY: '65%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    CAPABILITY_INDIVIDUAL_HERO_BG: buildEllipseGradient({
      center: '45% 55%',
      radiusX: '150%',
      radiusY: '65%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),

    // 5: Industry Pages
    INDUSTRIES_OVERVIEW_HERO_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    INDUSTRY_INDIVIDUAL_HERO_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    INDUSTRY_CHALLENGES_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,0,0,1)',
      endStop: '62%',
    }),

    // 6: About & Vision
    ABOUT_HERO_BG: buildEllipseGradient({
      center: '35% 45%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '70%',
    }),
    ABOUT_ACHIEVEMENT_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(20,8,26,1)',
      endColor: 'rgba(0,0,0,1)',
      endStop: '100%',
    }),
    ABOUT_MISSION_SECTION_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    ABOUT_FOUNDERS_VISION_BG: buildEllipseGradient({
      center: '50% 25%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '100%',
      rotationDeg: '90deg',
    }),
    ABOUT_WHY_US_BG: buildEllipseGradient({
      center: '50% 108%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '90%',
    }),
    ABOUT_INDUSTRIES_BG: buildEllipseGradient({
      center: '50% 108%',
      startColor: 'rgba(56,8,26,0.9)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '82%',
    }),

    // 7: Insights & Individual Blog
    BLOGS_OVERVIEW_HERO_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    BLOGS_OVERVIEW_NEWSLETTER_BG: buildEllipseGradient({
      center: '50% 110%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),
    BLOG_INDIVIDUAL_HERO_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '62%',
    }),

    // 8: Contact & Platforms
    CONTACT_RIGHT_CARD_BG: buildEllipseGradient({
      center: '50% 112%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '66%',
    }),
    PLATFORMS_PAGE_BG: buildEllipseGradient({
      center: '50% 50%',
      startColor: '#040B1D',
      endColor: '#040B1D',
      endStop: '100%',
    }),

    // 9: Section-Specific Dark Surfaces
    ABOUT_GLOBAL_PRESENCE_BG: buildEllipseGradient({
      center: '35% 17%',
      radiusX: '150%',
      radiusY: '100%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    CAPABILITY_INDIVIDUAL_SERVICE_AREAS_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    CAPABILITY_INDIVIDUAL_INDUSTRY_APPLICATION_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    CAPABILITIES_DETAIL_DELIVERY_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    CAPABILITIES_DETAIL_PLATFORM_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    PLATFORMS_QPULSE_SECTION_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    PLATFORMS_QLEAP_SECTION_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    LEADERSHIP_VISION_DARK_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    NOT_FOUND_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
    FORBIDDEN_BG: buildEllipseGradient({
      center: '30% 40%',
      radiusX: '150%',
      radiusY: '62%',
      startColor: 'rgba(56,8,26,1)',
      endColor: 'rgba(0,1,18,1)',
      endStop: '56%',
    }),
  },
} as const;

// ─── GRADIENTS ───
// All components should consume these keys. CSS variables switch desktop/mobile.
export const GRADIENTS = {
  HERO_BG: 'var(--gradient-hero-bg)',
  DARK_SECTION_BG: 'var(--gradient-dark-section-bg)',
  NAVBAR_STRIP_BG: 'var(--gradient-navbar-strip-bg)',
  HOME_FRAMEWORK_BG: 'var(--gradient-home-framework-bg)',
  HOME_PLATFORMS_BG: 'var(--gradient-home-platforms-bg)',
  HOME_INSIGHTS_BG: 'var(--gradient-home-insights-bg)',
  HOME_LEADERSHIP_BG: 'var(--gradient-home-leadership-bg)',
  HOME_TESTIMONIALS_BG: 'var(--gradient-home-testimonials-bg)',
  CAREERS_HERO_BG: 'var(--gradient-careers-hero-bg)',
  CAREERS_WHY_JOIN_BG: 'var(--gradient-careers-why-join-bg)',
  CAREERS_QLEAP_BG: 'var(--gradient-careers-qleap-bg)',
  CAPABILITIES_OVERVIEW_HERO_BG: 'var(--gradient-capabilities-overview-hero-bg)',
  CAPABILITY_INDIVIDUAL_HERO_BG: 'var(--gradient-capability-individual-hero-bg)',
  INDUSTRIES_OVERVIEW_HERO_BG: 'var(--gradient-industries-overview-hero-bg)',
  INDUSTRY_INDIVIDUAL_HERO_BG: 'var(--gradient-industry-individual-hero-bg)',
  INDUSTRY_CHALLENGES_BG: 'var(--gradient-industry-challenges-bg)',
  ABOUT_HERO_BG: 'var(--gradient-about-hero-bg)',
  ABOUT_ACHIEVEMENT_BG: 'var(--gradient-about-achievement-bg)',
  ABOUT_MISSION_SECTION_BG: 'var(--gradient-about-mission-section-bg)',
  ABOUT_FOUNDERS_VISION_BG: 'var(--gradient-about-founders-vision-bg)',
  ABOUT_WHY_US_BG: 'var(--gradient-about-why-us-bg)',
  ABOUT_INDUSTRIES_BG: 'var(--gradient-about-industries-bg)',
  BLOGS_OVERVIEW_HERO_BG: 'var(--gradient-blogs-overview-hero-bg)',
  BLOGS_OVERVIEW_NEWSLETTER_BG: 'var(--gradient-blogs-overview-newsletter-bg)',
  BLOG_INDIVIDUAL_HERO_BG: 'var(--gradient-blog-individual-hero-bg)',
  CONTACT_RIGHT_CARD_BG: 'var(--gradient-contact-right-card-bg)',
  PLATFORMS_PAGE_BG: 'var(--gradient-platforms-page-bg)',
  ABOUT_GLOBAL_PRESENCE_BG: 'var(--gradient-about-global-presence-bg)',
  CAPABILITY_INDIVIDUAL_SERVICE_AREAS_BG: 'var(--gradient-capability-individual-service-areas-bg)',
  CAPABILITY_INDIVIDUAL_INDUSTRY_APPLICATION_BG: 'var(--gradient-capability-individual-industry-application-bg)',
  CAPABILITIES_DETAIL_DELIVERY_BG: 'var(--gradient-capabilities-detail-delivery-bg)',
  CAPABILITIES_DETAIL_PLATFORM_BG: 'var(--gradient-capabilities-detail-platform-bg)',
  PLATFORMS_QPULSE_SECTION_BG: 'var(--gradient-platforms-qpulse-section-bg)',
  PLATFORMS_QLEAP_SECTION_BG: 'var(--gradient-platforms-qleap-section-bg)',
  LEADERSHIP_VISION_DARK_BG: 'var(--gradient-leadership-vision-dark-bg)',
  NOT_FOUND_BG: 'var(--gradient-not-found-bg)',
  FORBIDDEN_BG: 'var(--gradient-forbidden-bg)',
} as const;

type GradientPresetKey = keyof typeof GRADIENT_PRESETS.desktop;
type GradientPresetMap = Readonly<Record<GradientPresetKey, string>>;

const gradientPresetKeyToCssVar = (key: GradientPresetKey) =>
  `--gradient-${String(key).toLowerCase().replace(/_/g, '-')}`;

const buildGradientPresetCssBlock = (
  preset: GradientPresetMap,
) =>
  (Object.entries(preset) as Array<[GradientPresetKey, string]>)
    .map(([key, value]) => `  ${gradientPresetKeyToCssVar(key)}: ${value};`)
    .join('\n');

// Runtime-injected CSS so gradient controls are owned by GRADIENT_PRESETS.
export const GRADIENT_VARIABLES_CSS = `
:root {
${buildGradientPresetCssBlock(GRADIENT_PRESETS.desktop)}
}

@media (max-width: 768px) {
  :root {
${buildGradientPresetCssBlock(GRADIENT_PRESETS.mobile)}
  }
}
`.trim();

// ─── SECTION BACKGROUNDS ───
export const SECTION_BACKGROUNDS = {
  DARK: '#06010A',
  DARK_ALT: '#06010A',
  LIGHT: '#F5F7FA',
  CARD_ON_LIGHT: '#FFFFFF',
  CARD_ON_DARK: 'rgba(255, 255, 255, 0.04)',
};

// ─── NAVBAR MATERIAL VARIANTS ───
export type NavbarVariant = 'recommended';
export const ACTIVE_NAVBAR_VARIANT: NavbarVariant = 'recommended';

export const NAVBAR_VARIANTS = {
  recommended: {
    pillBackground: '#1C0D14',
    dropdownBackground: '#1C0D14',
    pillBorderTop: '0.0625rem solid rgba(255, 255, 255, 0.08)', // 1px
    dropdownBorderTop: '0.125rem solid rgba(214, 176, 92, 0.45)', // 2px
    backdropFilter: 'none',
  }
};

// ─── NAVBAR HEIGHT (for sticky positioning) ───
// Accounts for: wrapper padding (20px) + logo height (56px) + text height + spacing (~44px)
export const NAVBAR_HEIGHT = '7.5rem'; // 120px

// Navbar controls now live in src/components/Navbar.tsx for behavior/style co-location.

// ─── MAIN THEME CONFIG ───
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
    verticalSpacing: '6.25rem', // 100px
    interactiveEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    containerPaddingX: '2rem',
    lineThickness: '0.15625rem', // 2.5px
    eyebrowAccentColor: '#D6B05C',
    eyebrowFont: 'var(--font-heading)',
    eyebrowAccentLine: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
    sectionTitleSize: '2.5rem', // 40px
    sectionTitleWeight: '700',
    bodyTextSize: '0.9375rem', // 15px
  },
  services: {
    cardHeight: '12.5rem', // 200px
    imageBg: '#F0F1F6',
    imageScale: 1.15,
    imagePadding: '0.875rem', // 14px
  },
  footer: {
    logoScale: 3.5,
    logoWidth: '9.375rem', // 150px
    backgroundColor: '#4E0E26',
    textColor: 'rgba(255, 255, 255, 0.75)',
    headingColor: '#D6B05C',
    socialIconContrast: 'high',
  },
};
