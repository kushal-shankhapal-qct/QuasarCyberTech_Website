import React from 'react';

import { SECTION_BACKGROUNDS } from '../config/themeConfig';

import { ASSETS } from '@/constants/assets';

export default function Partners() {
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

    // Double the array for seamless infinite loop
    const displayPartners = [...partners, ...partners];

    return (
        <>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    animation: marquee 40s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <section
                className="overflow-hidden relative"
                style={{
                    background: '#FFFFFF',
                    height: '80px',
                }}
            >
                {/* Gradient Masks for fade effect at edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="marquee-track flex items-center h-full whitespace-nowrap">
                    {displayPartners.map((partner, idx) => (
                        <div
                            key={`${partner.id}-${idx}`}
                            className="flex items-center justify-center px-8 md:px-10"
                            style={{
                                filter: 'grayscale(1) opacity(0.6)',
                                transition: 'filter 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.filter = 'grayscale(0) opacity(1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.filter = 'grayscale(1) opacity(0.6)';
                            }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-auto object-contain select-none"
                                style={{ maxHeight: '36px' }}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
