export const themeConfig = {
    // Gradients for the whole page (Used in styles.css via React injection or we just tell the user they are in styles.css)
    // Let's rely on CSS variables for gradients in styles.css, but provide them here as well if needed.

    // HEADER
    header: {
        // 1. Master Style Toggle
        layoutStyle: 'floating',          // 'flush' or 'floating' - toggle 'floating' to revert to original rounded pill navbar

        // 2. Global Positioning
        marginTop: '1.5rem',              // Set > 0px to detach from the top and see the upper accent line floating
        sideMargin: '2.5rem',             // Outer edge gap from the browser window

        // 3. Logo Controls
        logoPodWidth: 'auto',             // HARD BOUNDARY: Stops the middle navbar from shifting left/right when text animates
        logoMarginTop: '-12px',             // Nudge the logo pod up/down independently
        logoPositionX: '0px',             // Nudge the logo pod left/right independently
        logoScale: 1,                     // Resize the logo

        // 4. Middle Navigation Controls
        navMarginTop: '0px',              // Nudge middle pod downwards to vertically align with logo text
        navPositionX: '-10px',              // Nudge middle nav left/right
        navScale: 1,                      // Resize middle nav
        podPaddingX: '1.5rem',            // Internal horizontal padding of middle nav
        podPaddingY: '0.8rem',            // Internal vertical padding of middle nav

        // 5. Contact Button Controls
        btnMarginTop: '0px',              // Nudge specifically the contact button upwards/downwards to align with text
        btnPositionX: '0px',              // Nudge button left/right
        btnScale: 1,                      // Resize button
        btnPaddingX: '1rem',              // Contact Us Button Specific Pacing (X)
        btnPaddingTop: '0.7rem',          // Contact Us Button Specific Padding (Top)
        btnPaddingBottom: '0.7rem',       // Contact Us Button Specific Padding (Bottom)

        // 6. Aesthetics & Colors
        accentLineColor: '#8B1E3F',       // Accent line color on top of navbar and logo
        btnAccentLineColor: '#FFFFFF',    // Accent line color on top of the contact us button
        btnAccentLineThickness: '2px',    // Thickness of the button's accent line

        glassBgOpacity: 0.70,
        glassBgColor: '255, 255, 255',
        glassBlurAmount: '16px',
        glassBorderColor: 'rgba(255, 255, 255, 0.4)',
        glassShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        dropdownBorderRadius: '0px 0px 1.5rem 1.5rem',

        // 7. Animation Speeds
        headerHideSpeed: '400ms',
        dropdownSpeed: '200ms',
        mouseRevealZone: 150,
        autoHideDelay: 1500,
        scrollBuffer: 250,
    },

    // PLATFORM HIGHLIGHTS
    platform: {
        paddingTop: '40px',
        paddingBottom: '40px',
        sideMargin: '2.5rem',
        cardBg: 'bg-white/40',
        cardBlur: 'backdrop-blur-md',
        cardBorder: 'border-white/40',
        cardTitleSize: '1.4rem',
        cardTitleLineHeight: '1.2',
        screenshotBg: 'bg-gray-100/50',
        screenshotBorder: 'border-white/20',
    },

    // ENTERPRISE SERVICES
    services: {
        paddingTop: '0px',
        paddingBottom: '40px',
        gridBg: 'bg-white/30',
        gridBlur: 'backdrop-blur-md',
        cardBg: 'bg-white/60',
        cardBlur: 'backdrop-blur-sm',
        accentColor: '#8B1E3F',
        borderDirection: 'left', // options: 'left', 'right', 'top', 'bottom' - controls the border/rounding placement
    },

    // INDUSTRY SNAPSHOT
    industry: {
        paddingTop: '60px',
        paddingBottom: '60px',
        cardBg: 'bg-white/60',
        cardBlur: 'backdrop-blur-sm',
    },

    // FEATURED INSIGHTS
    insights: {
        paddingTop: '80px',
        paddingBottom: '100px',
        cardBg: 'bg-white/60',
        cardBlur: 'backdrop-blur-sm',
    }
};
