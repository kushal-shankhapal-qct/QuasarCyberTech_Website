// ============================================================
// QUASARCYBERTECH — CENTRALIZED DESIGN SYSTEM
// Edit BRAND_CONTROLS to change the entire site's accent system.
// ============================================================

// ─── BRAND COLOR PALETTE ───
export const COLORS = {
  // Backgrounds
  darkBase: '#040B1D',
  deepCyberBlue: '#0B1F3B',
  softGrey: '#F5F7FA',
    cardOnLight: '#FFFFFF',
    cardOnDark: 'rgba(255,255,255,0.04)',
  pureWhite: '#FFFFFF',

  // Brand Accents — 3 purposes
  teal: '#2BC4B6',       // UI layer: framework icons/letters, dropdown accent, interactive borders
  burgundy: '#6B1530',   // Action layer: buttons, nav active, card accents
  gold: '#D6B05C',       // Emphasis layer: nav text, metric symbols, text highlights on DARK

  // Text
  textOnDark: '#FFFFFF',
  textOnLight: '#0B1F3B',
  textMuted: '#8B949E',
    textSub: '#5A6478',
    burgundyHover: '#8B1E3F',

  // Legacy aliases (safe to remove when no component uses them)
  electricBlue: '#1F6FEB',
  brandPrimary: '#6B1530',
  brandSecondary: '#6B1530',
  securityTeal: '#2BC4B6',
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
    gold30: 'rgba(214, 176, 92, 0.3)',
    gold40: 'rgba(214, 176, 92, 0.4)',
    burgundy50: 'rgba(107, 21, 48, 0.5)',
};

export const SHADOWS = {
    nav: '0 4px 24px rgba(0, 0, 0, 0.5)',
    dropdown: '0 24px 64px rgba(0,0,0,0.7)',
    lightCard: '0 2px 20px rgba(11,31,59,0.07)',
    lightCardHover: '0 12px 40px rgba(107,21,48,0.12)',
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

  // Trust Metrics
  metricsNumberColor: '#6B1530',
  metricsSymbolColor: '#D6B05C',
  metricsUnderlineColor: '#D6B05C',
  metricsLabelColor: '#0B1F3B',

  // QCT Framework
  frameworkLetterColor: '#2BC4B6',
  frameworkBulletColor: '#D6B05C',
  frameworkArrowColor: '#2BC4B6',

  // Dropdowns — single source of truth
  dropdown: {
    gap: '24px',                   // Increased gap to clear logo/header pod
    bg: 'rgb(11, 31, 59)',
    accentColor: '#2BC4B6',
    accentHeight: '1px',           // Reduced thickness as requested
    shadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
    borderRadius: '0 0 12px 12px', // Flat top, rounded bottom
  },

  // Hero Background Gradient Controls
  heroGradient: {
    x: '20%',                      // Horizontal position (behind text)
    y: '60%',                      // Vertical position (lowered slightly)
    radius: '55%',                 // Radial spread
  }
};

// ─── GRADIENTS ───
export const GRADIENTS = {
  HERO_CTA_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  HERO_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  CTA_BG: `radial-gradient(circle at ${BRAND_CONTROLS.heroGradient.x} ${BRAND_CONTROLS.heroGradient.y}, rgba(56,8,26,1) 0%, rgba(0,1,18,1) ${BRAND_CONTROLS.heroGradient.radius})`,
  ACCENT: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
  BRAND_ACCENT: 'linear-gradient(90deg, #6B1530 0%, #D6B05C 100%)',
  LIGHT_SECTION_BG: '#F5F7FA',
  DARK_SECTION_BG: '#040B1D',
  CYBER_ACCENT: '#2BC4B6',
};

// ─── SECTION BACKGROUNDS ───
export const SECTION_BACKGROUNDS = {
  DARK: '#040B1D',
  DARK_ALT: '#0B1F3B',
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
            '--brand-secondary': COLORS.teal,
            '--accent-gold': COLORS.gold,
            '--deep-cyber-blue': COLORS.deepCyberBlue,
        }
    },

    global: {
        verticalSpacing: '100px',
        interactiveEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        sectionMarginLeft: '3rem',
        sectionMarginRight: '3rem',
        eyebrowMarginLeft: '3rem',
        contentMarginLeft: '3rem',
        containerPaddingX: '2rem',
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

    header: {
        global: {
            layoutStyle: 'floating',
            marginTop: '1rem',
            sideMargin: '2rem',
            accentColor: '#6B1530',
            flushAccentThickness: '3px',
            pageBackgroundColor: '#F5F7FA',
        },
        logoSection: {
            width: 'auto',
            height: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '2rem',
            marginRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            offsetX: '0px',
            offsetY: '0px',
            scale: 1.03,
            iconWidth: '4.5rem',
            iconHeight: '4.5rem',
            iconWidthMobile: '2.6rem',
            iconHeightMobile: '2.6rem',
            textHeight: '1.65rem',
            textWidth: 'auto',
            textMarginTop: '4px',
            textHideOffset: '-10px',
        },
        navSection: {
            marginTop: '0px',
            offsetX: '15px',
            scale: 0.95,
            paddingX: '1.5rem',
            paddingY: '0.8rem',
            underlineThickness: '2px',
            underlineMode: 'solid' as 'gradient' | 'solid' | 'none',
            activeUnderlineColor: '#D6B05C',
            hoverShadow: '0 6px 14px rgba(0,0,0,0.08)',
            hoverOffsetY: '-1px',
        },
        contactSection: {
            marginTop: '0px',
            offsetX: '15px',
            marginRight: '0px',
            scale: 0.95,
            paddingX: '1.3rem',
            paddingY: '0.7rem',
            accentLineColor: '#FFFFFF',
            accentLineThickness: '2px',
            hoverBgColor: '#FDFDFD',
            hoverTextColor: '#6B1530',
            hoverBorderColor: 'rgba(107, 21, 48, 0.2)',
        },
        dropdowns: {
            shadow: BRAND_CONTROLS.dropdown.shadow,
            borderRadius: BRAND_CONTROLS.dropdown.borderRadius,
            topAccentThickness: BRAND_CONTROLS.dropdown.accentHeight,
        },
        visuals: {
            glassBgColor: '11, 31, 59',
            glassBgOpacity: 0.95,
            glassBlurAmount: '16px',
            glassBorderColor: 'rgba(255, 255, 255, 0.05)',
            glassShadow: '0 0 1px rgba(0,0,0,0.15), 0 10px 25px -5px rgba(0,0,0,0.2), 0 4px 10px -5px rgba(0,0,0,0.1)',
            glassInnerShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        },
        interactions: {
            hideSpeed: '400ms',
            mouseRevealZone: 150,
            autoHideDelay: 1500,
            scrollBuffer: 250,
        },
    },

    // Enterprise Services (only cardHeight used)
    services: {
        cardHeight: '200px',
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
