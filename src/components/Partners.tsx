import React from 'react';

import { SECTION_BACKGROUNDS } from '../config/themeConfig';

// Import local assets
import burpLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Burp_Suite_Cropped.png';
import dlinkLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/D_link_Cropped.png';
import ninjaOneLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/NinjaOne_Cropped.png';
import rahInfotechLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/RAH_Infotech_Cropped.png';
import rapid7Logo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Rapid_7_Cropped.png';
import satcomLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Satcom_Infotech_Cropped.png';
import sophosLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Sophos_Cropped.png';
import tenableLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Tenable_Cropped.png';
import vicariusLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/Vicarius_Cropped.png';
import caniphishLogo from '../assets/Logos/Partners_Logo_Cropped_No_Buffer/caniphish_Cropped.png';

export default function Partners() {
    const partners = [
        { name: 'Burp Suite', logo: burpLogo, id: 1 },
        { name: 'D-Link', logo: dlinkLogo, id: 2 },
        { name: 'NinjaOne', logo: ninjaOneLogo, id: 3 },
        { name: 'RAH Infotech', logo: rahInfotechLogo, id: 4 },
        { name: 'Rapid7', logo: rapid7Logo, id: 5 },
        { name: 'Satcom Infotech', logo: satcomLogo, id: 6 },
        { name: 'Sophos', logo: sophosLogo, id: 7 },
        { name: 'Tenable', logo: tenableLogo, id: 8 },
        { name: 'Vicarius', logo: vicariusLogo, id: 9 },
        { name: 'caniphish', logo: caniphishLogo, id: 10 },
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
                    background: '#0B1F3B',
                    height: '80px',
                }}
            >
                {/* Gradient Masks for fade effect at edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1F3B] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1F3B] to-transparent z-10 pointer-events-none" />

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
