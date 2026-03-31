import React from 'react';
import { COLORS } from '../config/themeConfig';

export default function TelemetryDivider() {
    const telemetryText = "[SYS_LOG] // VAPT_INITIALIZED ... [0x8A4B] ... CSPM_STATE: SECURE ... GOVERNANCE_ACTIVE ... THREAT_HUNTING_ENGAGED ... ACCESS_CONTROL_VERIFIED ... ENCRYPTION_ROTATION_COMPLETE ... NETWORK_SEGMENTATION_VALIDATED ... ";
    const repeatedText = Array(10).fill(telemetryText).join(" ");

    return (
        <div 
            className="w-full h-8 bg-[#040B1D] border-y border-[rgba(43,196,182,0.15)] flex items-center overflow-hidden"
            style={{ zIndex: 5 }}
        >
            <div className="whitespace-nowrap flex animate-marquee">
                <span 
                    className="font-mono text-[10px] uppercase tracking-widest text-securityTeal opacity-40 px-4"
                    style={{ color: COLORS.teal }}
                >
                    {repeatedText}
                </span>
                <span 
                    className="font-mono text-[10px] uppercase tracking-widest text-securityTeal opacity-40 px-4"
                    style={{ color: COLORS.teal }}
                >
                    {repeatedText}
                </span>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
}
