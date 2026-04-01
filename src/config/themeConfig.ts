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
  nav: '0 4px 24px rgba(0, 0, 0, 0.5)',
  dropdown: '0 24px 64px rgba(0,0,0,0.7)',
  lightCard: '0 2px 20px rgba(11,31,59,0.07)',
  lightCardHover: '0 12px 40px rgba(107,21,48,0.12)',
  darkCard: '0 20px 50px rgba(0,0,0,0.5)',
};

// ─── CENTRALIZED LAYOUT CONTROLS ───
export const LAYOUT_CONTROLS = {
  globalScale: 0.9,
  global: {
    paddingX: 'clamp(3rem, 3vw, 6rem)',
  },
  section: {
    paddingTop: '64px',
    paddingBottom: '64px',
    paddingX: 'clamp(3rem, 3vw, 6rem)',
    gapBetweenHeaderAndContent: '48px',
    frameworkHeaderToChassisGapDesktop: '36px',
    frameworkHeaderToChassisGapTablet: '28px',
    frameworkHeaderToChassisGapMobile: '24px',
    ctaEyebrowDark: '#FFFFFF',
  },
  card: {
    capabilityImageZoneHeight: '210px',
    capabilityBodyPadding: '18px 20px 0px',
    capabilityCardRadius: '20px',
    capabilityAccentThickness: '4px',
    capabilityCardScale: 0.985,
    capabilityCardShadow: '0 4px 20px rgba(0,0,0,0.06)',
    industryCardHeight: '240px',
    platformImageZoneHeight: '140px',
    platformLogoStripHeight: '60px',
    insightImageZoneHeight: '140px',
    serviceCardPadding: '16px 18px',
    frameworkCardPadding: '20px 14px 16px',
    frameworkLetterSize: '8rem',
    frameworkStageNameSize: '14px',
    frameworkContentPaddingTop: '180px',
    frameworkInitialLetterTop: '80px',
    frameworkPointsGap: '12px',
  },
  grid: {
    capabilityGap: '28px',
    industryGap: '16px',
    platformGap: '16px',
    insightGap: '20px',
  },
  type: {
    sectionH2: 'clamp(24px, 3vw, 36px)',
    sectionSubtitle: '15px',
    cardTitle: '15px',
    cardBody: '13px',
    metricNumber: 'clamp(36px, 4vw, 52px)',
  },
  footer: {
    logoMarginTop: '-48px',
    logoSize: '72px',
    logoImageSize: '48px',
    columnPaddingTop: '24px',
  },
  breadcrumbs: {
    top: '130px',
    left: '2.5rem',
    offsetY: '0px',
    offsetX: '5px',
    arrowColor: '#D6B05C',
  }
};

// ─── CENTRALIZED BRAND CONTROLS ───
export const BRAND_CONTROLS = {
  navTextColor: '#FFFFFF',
  navHighlightColor: '#D6B05C',
  navUnderlineColor: '#6B1530',
  navUnderlineHeight: '1.5px',
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
  heroTitle: { fontSize: 'clamp(36px, 4.5vw, 40px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.01em' },
  pageTitle: { fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.01em' },
  sectionTitle: { fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
  cardTitle: { fontSize: '17px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0em', fontFamily: "'Ubuntu', sans-serif" },
  bodyLarge: { fontSize: '16px', fontWeight: 300, wordSpacing: '4px', lineHeight: 1.5, letterSpacing: '0.003em' },
  bodyBase: { fontSize: '15px', fontWeight: 300, lineHeight: 1.65, letterSpacing: '0.003em' },
  bodySmall: { fontSize: '13px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.003em' },
  navLink: { fontSize: '14px', fontWeight: 400, letterSpacing: '0.01em' },
  buttonLarge: { fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const },
  buttonSmall: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const },
  eyebrow: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const },
  metricNumber: { fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em', fontFamily: "'Ubuntu', sans-serif" },
  metricLabel: { fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const },
  caption: { fontSize: '11px', fontWeight: 400, letterSpacing: '0.04em' },
};

// ─── GRADIENTS ───
export const GRADIENTS = {


  // ─── GRADIENT ENGINE ──────────────────────────────────────────────
  // Arranged by Page/Purpose for visual maintenance.

  // 1: Hero & Global Presets
  HERO_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  DARK_SECTION_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

  // 2: Home Page Sections
  HOME_FRAMEWORK_BG: 'radial-gradient(ellipse at 25% 47%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
  HOME_PLATFORMS_BG: 'radial-gradient(ellipse at 20% 20%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 50%)',
  HOME_INSIGHTS_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  HOME_LEADERSHIP_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  HOME_TESTIMONIALS_BG: 'radial-gradient(ellipse at 20% 0%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 50%)',

  // 3: Careers Page
  CAREERS_HERO_BG: 'radial-gradient(ellipse at 30% 70%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
  CAREERS_WHY_JOIN_BG: 'radial-gradient(circle at 70% 30%, rgba(56,8,26,0.8) 0%, rgba(10,10,15,1) 60%)',
  CAREERS_QLEAP_BG: 'radial-gradient(ellipse at 50% 10%, rgba(56,8,26,0.6) 0%, rgba(10,10,15,1) 80%)',

  // 4: Capabilities Pages
  CAPABILITIES_OVERVIEW_HERO_BG: 'radial-gradient(ellipse at 27% 57%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
  CAPABILITY_INDIVIDUAL_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

  // 5: Industry Pages
  INDUSTRIES_OVERVIEW_HERO_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  INDUSTRY_INDIVIDUAL_HERO_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  INDUSTRY_CHALLENGES_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,0,0,1) 55%)',

  // 6: About & Vision
  ABOUT_HERO_BG: 'radial-gradient(ellipse at 27% 57%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 90%)',
  ABOUT_ACHIEVEMENT_BG: 'radial-gradient(circle at 50% 50%, rgba(20,8,26,1) 0%, rgba(0,0,0,1) 100%)',
  ABOUT_MISSION_SECTION_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

  // 7: Insights & Individual Blog
  BLOGS_OVERVIEW_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  BLOGS_OVERVIEW_NEWSLETTER_BG: 'radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',
  BLOG_INDIVIDUAL_HERO_BG: 'radial-gradient(ellipse at 20% 10%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)',

  // 8: Contact & Platforms
  CONTACT_RIGHT_CARD_BG: 'radial-gradient(circle at 50% 20%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 60%)',
  PLATFORMS_PAGE_BG: '#040B1D',
};

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
    pillBorderTop: '1px solid rgba(255, 255, 255, 0.08)',
    dropdownBorderTop: '2px solid rgba(214, 176, 92, 0.45)',
    backdropFilter: 'none',
  }
};

// ─── NAVBAR HEIGHT (for sticky positioning) ───
// Accounts for: wrapper padding (20px) + logo height (56px) + text height + spacing (~44px)
export const NAVBAR_HEIGHT = '120px';

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
    verticalSpacing: '100px',
    interactiveEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    containerPaddingX: '2em',
    lineThickness: '2.5px',
    eyebrowAccentColor: '#D6B05C',
    eyebrowFont: 'var(--font-heading)',
    eyebrowAccentLine: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
    sectionTitleSize: '40px',
    sectionTitleWeight: '700',
    bodyTextSize: '15px',
  },
  services: {
    cardHeight: '200px',
    imageBg: '#F0F1F6',
    imageScale: 1.15,
    imagePadding: '14px',
  },
  footer: {
    logoScale: 3.5,
    logoWidth: '150px',
    backgroundColor: '#4E0E26',
    textColor: 'rgba(255, 255, 255, 0.75)',
    headingColor: '#D6B05C',
    socialIconContrast: 'high',
  },
};
