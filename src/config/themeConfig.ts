export const themeConfig = {
    // ---------------------------------------------------------
    // GLOBAL TONAL ARCHITECTURE (CSS Variables)
    // ---------------------------------------------------------
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

            // Heading Controls
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
            '--marquee-tilt-x': '15deg',
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
            '--bg-platforms': '#0F1115',
            '--bg-services': '#F8F9FA',
            '--bg-industry': '#0A0C10',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': '#1A1D23',
            '--bg-footer': '#000000',
            '--brand-accent': '#3B82F6',
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
            '--bg-platforms': '#080808',
            '--bg-services': '#F8F9FA',
            '--bg-industry': '#0A0A0A',
            '--bg-blog': '#FFFFFF',
            '--bg-cta': '#111111',
            '--bg-footer': '#000000',
            '--brand-accent': '#FFFFFF',
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

    // HEADER & NAVIGATION ARCHITECTURE
    header: {
        global: {
            layoutStyle: 'floating',
            marginTop: '1.5rem',
            sideMargin: '2.5rem',
            accentColor: '#7A0F2A',
            flushAccentThickness: '3px',
            pageBackgroundColor: '#F5F7FA',
        },
        logoSection: {
            width: 'auto',
            marginTop: '-10px',
            offsetX: '8px',
            padding: '0px',
            scale: 1,
        },
        navSection: {
            marginTop: '0px',
            offsetX: '-10px',
            scale: 1,
            paddingX: '1.5rem',
            paddingY: '0.8rem',
            underlineThickness: '1.7px',
        },
        contactSection: {
            marginTop: '0px',
            offsetX: '-18px',
            scale: 1,
            paddingX: '1.3rem',
            paddingY: '0.7rem',
            accentLineColor: '#FFFFFF',
            accentLineThickness: '2px',
        },
        dropdowns: {
            shadow: '0 12px 30px -10px rgba(0, 0, 0, 0.15), 0 4px 10px -5px rgba(0, 0, 0, 0.05)',
            borderRadius: '0px 0px 1.5rem 1.5rem',
            topAccentThickness: '3px',
            transitionSpeed: '200ms',
            clay: {
                bgColor: '255, 255, 255',
                bgOpacity: 0.80,
                blur: '16px',
                shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
                innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
            },
        },
        visuals: {
            glassBgColor: '255, 255, 255',
            glassBgOpacity: 0.80,
            glassBlurAmount: '16px',
            glassBorderColor: 'rgba(255, 255, 255, 0)',
            glassShadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            glassInnerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        },
        interactions: {
            hideSpeed: '400ms',
            mouseRevealZone: 150,
            autoHideDelay: 1500,
            scrollBuffer: 250,
        },
    },

    // TRUST INDICATORS
    trusted: {
        paddingTop: '160px',
        paddingBottom: '80px',
        cardRadius: '30px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.80,
            blur: '16px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(244, 244, 244, 1), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        },
        carousel: {
            speed: 15, // Lower is faster (duration in seconds)
            gap: '60px',
            logoScales: {
                ninjaOne: 1.45,
                rapid7: 1.45,
                satcom: 1.4,
                vicirus: 1.2,
                dLink: 1.4,
                burpSuite: 1.5,
                default: 1.0,
            }
        }
    },

    // PLATFORM HIGHLIGHTS
    platform: {
        paddingTop: '60px',
        paddingBottom: '80px',
        sideMargin: '2.5rem',
        cardRadius: '24px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.85,
            blur: '16px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        },
        headerStripMarginBottom: '8px',
    },

    // ENTERPRISE SERVICES
    services: {
        paddingTop: '100px',
        paddingBottom: '100px',
        accentColor: '#7A0F2A',
        borderDirection: 'left',
        mainCardRadius: '24px',
        itemCardRadius: '16px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.80,
            blur: '16px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        }
    },

    // INDUSTRY SNAPSHOT
    industry: {
        paddingTop: '100px',
        paddingBottom: '100px',
        cardRadius: '32px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.98,
            blur: '16px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        }
    },

    // FEATURED INSIGHTS
    insights: {
        paddingTop: '100px',
        paddingBottom: '120px',
        cardRadius: '24px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.95,
            blur: '16px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        },
        logoScale: 1.35,
        watermarkGlowRadius: '180px',
    },

    // CONTACT PAGE
    contact: {
        navStripHeight: '120px',
        overlapMarginTop: '-40px',
        heroPaddingTop: '180px',
        heroPaddingBottom: '120px',
        sectionPaddingTop: '80px',
        sectionPaddingBottom: '80px',
        cardRadius: '24px',
        clay: {
            bgColor: '255, 255, 255',
            bgOpacity: 0.98,
            blur: '24px',
            shadow: '0 0 1px rgba(0,0,0,0.1), 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -5px rgba(0,0,0,0.04)',
            innerShadow: 'inset 0 2px 5px rgba(255, 255, 255, 1), inset 0 -2px 5px rgba(0, 0, 0, 0.03)',
        }
    }
};
