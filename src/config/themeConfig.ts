export const themeConfig = {
    // ---------------------------------------------------------
    // GLOBAL TONAL ARCHITECTURE (CSS Variables)
    // ---------------------------------------------------------
    // These themes represent the "Atmospheric Architecture" requested.
    // They control the "Tonal Descent" from Hero down to the Footer.

    activeTheme: 'executive', // 'executive' | 'strategic' | 'deep'

    themes: {
        executive: {
            '--bg-hero': '#FAFAFA',
            '--bg-trust': '#FFFFFF',
            '--bg-platforms': 'linear-gradient(135deg, #7A0F2A 0%, #1A0409 100%)',
            '--bg-services': '#F8F9FA',
            '--bg-industry': 'linear-gradient(135deg, #7A0F2A 0%, #1A0409 100%)',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': 'linear-gradient(135deg, #7A0F2A 0%, #1A0409 100%)',
            '--bg-footer': '#FFFFFF',

            // Heading Controls (Soft Adjustments)
            '--trusted-heading-align': 'left',
            '--trusted-heading-spacing': '1.1',
            '--trusted-heading-letter-spacing': '-0.02em',
            '--trusted-line1-weight': '300',
            '--trusted-line2-weight': '900',
            '--trusted-line2-scale': '1.1',

            // Colors
            '--brand-accent': '#7A0F2A',
            '--brand-accent-soft': 'rgba(122, 15, 42, 0.12)',
            '--text-primary': '#111111',
            '--text-muted': '#555555',
            '--text-on-dark': '#FFFFFF',
            '--card-surface-primary': '#FFFFFF',
            '--card-surface-secondary': '#FAFAFA',
            '--card-nested-surface': '#F0F0F0',

            // Stats & Sector
            '--sector-number-color': '#7A0F2A',
            '--sector-number-opacity': '0.12',
            '--footer-text-color': '#475569',
            '--footer-divider-color': 'rgba(0,0,0,0.06)',

            // Section Specific
            '--light-section-accent': '#7A0F2A',
            '--light-section-text': '#000000',

            // Layout
            '--radius-base': '12px',
            '--radius-card': '40px',
            '--section-padding': '140px',
            '--component-gap': '32px',

            // Marquee
            '--marquee-opacity': '0.12',
            '--marquee-blur': '3px',
            '--marquee-speed': '55s',
            '--marquee-tilt-x': '15deg', // Reduced tilt
            '--marquee-tilt-z': '-12deg',

            '--platform-card-radius': '40px',
            '--trusted-card-radius-right': '40px',
        },
        strategic: {
            '--bg-hero': '#FAFAFA',
            '--bg-trust': '#FFFFFF',
            '--bg-platforms': '#1A0409',
            '--bg-services': '#F8F9FA',
            '--bg-industry': '#1A0409',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': '#7A0F2A',
            '--bg-footer': '#0A0A0A',

            '--brand-accent': '#7A0F2A',
            '--brand-accent-soft': 'rgba(122, 15, 42, 0.2)',

            '--text-primary': '#111111',
            '--text-muted': '#555555',
            '--text-on-dark': '#FFFFFF',

            '--card-surface-primary': 'rgba(255, 255, 255, 0.95)',
            '--card-surface-secondary': 'rgba(255, 255, 255, 0.85)',
            '--card-nested-surface': 'rgba(255, 255, 255, 0.75)',

            '--sector-number-color': '#FFFFFF',
            '--sector-number-opacity': '0.1',
            '--footer-text-color': '#AAAAAA',
            '--footer-divider-color': 'rgba(255,255,255,0.1)',
        },
        deep: {
            '--bg-hero': '#FAFAFA',
            '--bg-trust': '#FFFFFF',
            '--bg-platforms': '#0F1115', // Vanguard Slate
            '--bg-services': '#F8F9FA',
            '--bg-industry': '#0A0C10',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': '#1A1D23',
            '--bg-footer': '#000000',

            '--brand-accent': '#3B82F6', // Cobalt Blue Accent
            '--brand-accent-soft': 'rgba(59, 130, 246, 0.2)',

            '--text-primary': '#111111',
            '--text-muted': '#555555',
            '--text-on-dark': '#FFFFFF',

            '--card-surface-primary': 'rgba(255, 255, 255, 0.08)',
            '--card-surface-secondary': 'rgba(255, 255, 255, 0.05)',
            '--card-nested-surface': 'rgba(255, 255, 255, 0.03)',

            '--sector-number-color': '#3B82F6',
            '--sector-number-opacity': '0.15',
            '--footer-text-color': '#666666',
            '--footer-divider-color': 'rgba(255,255,255,0.1)',
        },
        obsidian: {
            '--bg-hero': '#FAFAFA',
            '--bg-trust': '#FFFFFF',
            '--bg-platforms': '#080808', // Pure Obsidian
            '--bg-services': '#F8F9FA',
            '--bg-industry': '#0A0A0A',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': '#111111',
            '--bg-footer': '#000000',

            '--brand-accent': '#FFFFFF', // Pure White Accent
            '--brand-accent-soft': 'rgba(255, 255, 254, 0.15)',

            '--text-primary': '#111111',
            '--text-muted': '#555555',
            '--text-on-dark': '#FFFFFF',

            '--card-surface-primary': 'rgba(255, 255, 255, 0.05)',
            '--card-surface-secondary': 'rgba(255, 255, 255, 0.03)',
            '--card-nested-surface': 'rgba(255, 255, 255, 0.02)',

            '--sector-number-color': '#FFFFFF',
            '--sector-number-opacity': '0.1',
            '--footer-text-color': '#888888',
            '--footer-divider-color': 'rgba(255,255,255,0.1)',
        }
    },

    // HEADER
    header: {
        layoutStyle: 'floating',
        marginTop: '1.5rem',
        sideMargin: '2.5rem',
        logoPodWidth: 'auto',
        logoMarginTop: '-12px',
        logoPositionX: '0px',
        logoScale: 1,
        navMarginTop: '0px',
        navPositionX: '-10px',
        navScale: 1,
        podPaddingX: '1.5rem',
        podPaddingY: '0.8rem',
        btnMarginTop: '0px',
        btnPositionX: '0px',
        btnScale: 1,
        btnPaddingX: '1rem',
        btnPaddingTop: '0.7rem',
        btnPaddingBottom: '0.7rem',
        accentLineColor: '#7A0F2A',
        btnAccentLineColor: '#FFFFFF',
        btnAccentLineThickness: '2px',
        glassBgOpacity: 0.70,
        glassBgColor: '255, 255, 255',
        glassBlurAmount: '16px',
        glassBorderColor: 'rgba(255, 255, 255, 0.4)',
        glassShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        dropdownBorderRadius: '0px 0px 1.5rem 1.5rem',
        headerHideSpeed: '400ms',
        dropdownSpeed: '200ms',
        mouseRevealZone: 150,
        autoHideDelay: 1500,
        scrollBuffer: 250,
    },

    // PLATFORM HIGHLIGHTS
    platform: {
        paddingTop: '120px',
        paddingBottom: '120px',
        sideMargin: '2.5rem',
    },

    // ENTERPRISE SERVICES
    services: {
        paddingTop: '120px',
        paddingBottom: '120px',
        accentColor: '#7A0F2A',
        borderDirection: 'left',
    },

    // INDUSTRY SNAPSHOT
    industry: {
        paddingTop: '120px',
        paddingBottom: '120px',
    },

    // FEATURED INSIGHTS
    insights: {
        paddingTop: '120px',
        paddingBottom: '120px',
    }
};
