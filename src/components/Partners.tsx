import React from 'react';
import { ASSETS } from '@/constants/assets';
import { COLORS, TYPOGRAPHY } from '@/config/themeConfig';

export default function Partners({ centered = false }: { centered?: boolean }) {
    // ── Size controls ────────────────────────────────────────────────
    const PARTNERS_LOGO_HEIGHT = '52px';
    const PARTNERS_STRIP_PADDING = '42px';
    const PARTNERS_MARGIN_BELOW = '24px';
    const PARTNERS_HEADER_PADDING_TOP = '32px';
    const PARTNERS_HEADER_PADDING_BOTTOM = '20px';
    const PARTNERS_HEADER_SIDE_PADDING = '2.5rem';
    // ─────────────────────────────────────────────────────────────────────

    const partners = [
        { name: 'Burp Suite', logo: ASSETS.partners.burp, id: 1 },
        { name: 'D-Link', logo: ASSETS.partners.dlink, id: 2 },
        { name: 'NinjaOne', logo: ASSETS.partners.ninja, id: 3 },
        { name: 'RAH Infotech', logo: ASSETS.partners.rah, id: 4 },
        { name: 'Rapid7', logo: ASSETS.partners.rapid7, id: 5 },
        { name: 'Satcom Infotech', logo: ASSETS.partners.satcom, id: 6 },
        { name: 'Sophos', logo: ASSETS.partners.sophos, id: 7 },
        { name: 'Tenable', logo: ASSETS.partners.tenable, id: 8 },
        { name: 'Vicarius', logo: ASSETS.partners.vicarius, id: 9 },
        { name: 'caniphish', logo: ASSETS.partners.caniphish, id: 10 },
    ];

    const displayPartners = [...partners, ...partners, ...partners];

    return (
        <div>
            {/* Header sits OUTSIDE the white strip */}
            <div style={{ textAlign: centered ? 'center' : 'left', padding: `${PARTNERS_HEADER_PADDING_TOP} ${PARTNERS_HEADER_SIDE_PADDING} ${PARTNERS_HEADER_PADDING_BOTTOM}` }}>
                <h3 style={{
                    fontFamily: TYPOGRAPHY.fontHeading,
                    fontSize: 'clamp(32px, 4vw, 42px)', // Standard Section heading size
                    color: '#1A1A1A',
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: '-0.02em',
                }}>
                    Our <span style={{ color: COLORS.burgundy }}> Trusted </span> Partners
                </h3>
            </div>

            {/* White scrolling strip */}
            <section
                style={{
                    background: '#FFFFFF',
                    borderTop: 'none',
                    borderBottom: 'none',
                    padding: `${PARTNERS_STRIP_PADDING} 0`,
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: PARTNERS_MARGIN_BELOW,
                }}
            >
                <style>{`
                    @keyframes partners-infinite-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-33.3333%); }
                    }
                    .partners-track-forced {
                        display: flex;
                        width: max-content;
                        animation: partners-infinite-scroll 50s linear infinite !important;
                        pointer-events: none !important;
                    }
                    .partner-item-enhanced {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 60px;
                        flex-shrink: 0;
                    }
                `}</style>

                {/* Side fade masks */}
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                <div className="partners-track-forced">
                    {displayPartners.map((partner, idx) => (
                        <div key={`${partner.id}-${idx}`} className="partner-item-enhanced">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="select-none"
                                style={{
                                    height: PARTNERS_LOGO_HEIGHT,
                                    width: 'auto',
                                    maxWidth: '160px',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
