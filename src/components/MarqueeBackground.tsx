import React from "react";
import { motion } from "framer-motion";

// ----------------------------------------------------------------------
// MARQUEE CONFIGURATION & VARIABLES
// Adjust these to dial in the perfect animation and technical look
// ----------------------------------------------------------------------
const marqueeConfig = {
    // 1. Marquee Speeds & Layout
    speed: 100,                  // Even slower than 130 for more executive feel
    columnWidth: '340px',        // Fixed width for each column to maintain grid sync
    screenshotScale: 1.0,       // Zoomed in as requested (was 1.0)

    // 2. Technical Grid Control
    dotSize: '4px',              // As requested: 3px dots
    gridGap: '32px',             // As requested: 32px gap
    gridColor: 'rgba(255,255,255,0.4)', // Color of the grid/dots

    // 3. Overall 3D Scene Controls
    perspective: '1200px',       // Depth. Lower numbers = more intense 3D convergence
    tiltAngleX: '12deg',         // Backwards tilt
    tiltAngleZ: '15deg',         // Sideways spin angle
    overallScale: 1.1,           // Zoom level for the entire background field
    sceneOpacity: 0.5,           // Opacity of the entire 3D field (helps blending)
    overlayBlurTint: 'rgba(255, 255, 255, 0.04)', // Cyber-blue subtle overlay tint over the moving cards
};
// ----------------------------------------------------------------------

// Assets
const qpulseModules = import.meta.glob("../assets/Logos/Screenshots/QPulse/*.png", { eager: true, as: "url" });
const qstellarModules = import.meta.glob("../assets/Logos/Screenshots/QStellar/*.png", { eager: true, as: "url" });

const pulseImages = Object.values(qpulseModules) as string[];
const stellarImages = Object.values(qstellarModules) as string[];

// 1. CREATE ALTERNATING POOLS
const createAlternatingPool = (pulse: string[], stellar: string[], startWithPulse: boolean) => {
    const pool = [];
    const maxLength = Math.max(pulse.length, stellar.length);
    if (maxLength === 0) return [];

    for (let i = 0; i < maxLength * 2; i++) {
        const isPulse = startWithPulse ? i % 2 === 0 : i % 2 !== 0;
        const source = isPulse ? pulse : stellar;
        if (source.length > 0) {
            const img = source[Math.floor(Math.random() * source.length)];
            pool.push(img);
        }
    }
    // Duplicate for seamless loop
    return [...pool, ...pool];
};

const col1 = createAlternatingPool(pulseImages, stellarImages, true);
const col2 = createAlternatingPool(pulseImages, stellarImages, false);
const col3 = createAlternatingPool(pulseImages, stellarImages, true);
const col4 = createAlternatingPool(pulseImages, stellarImages, false);

const bgRadialCalcStr = `radial-gradient(circle at calc(${marqueeConfig.dotSize} / 2 + 1.5px) calc(${marqueeConfig.dotSize} / 2 + 1.5px), ${marqueeConfig.gridColor} calc(${marqueeConfig.dotSize} / 2), transparent 0)`;

// The vertical grid boundaries are static on the column container.
const MarqueeColumn = ({ images, duration, reverse = false }: { images: string[]; duration: number; reverse?: boolean }) => (
    <div className="flex flex-col relative"
        style={{
            minWidth: marqueeConfig.columnWidth,
            // Vertical static dotted lines
            backgroundImage: bgRadialCalcStr,
            backgroundSize: `${marqueeConfig.gridGap} 100%`,
            backgroundPosition: 'right'
        }}>
        <motion.div
            animate={{
                y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
            }}
            transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
            }}
            className="flex flex-col"
            style={{
                // Moving horizontal dotted lines attached to the motion div!
                backgroundImage: bgRadialCalcStr,
                backgroundSize: `100% ${marqueeConfig.gridGap}`,
                backgroundPosition: 'bottom'
            }}
        >
            {images.map((src, idx) => (
                <div key={idx} className="relative w-full overflow-hidden">
                    <div className="flex w-full" style={{ padding: marqueeConfig.gridGap }}>
                        <div className="group relative aspect-[16/9] w-full bg-black/10 shadow-[0px_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                            <img
                                src={src}
                                alt=""
                                className="w-full h-full object-contain"
                                style={{
                                    transform: `scale(${marqueeConfig.screenshotScale})`,
                                    filter: 'brightness(1.0) contrast(1.0)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
);

export default function MarqueeBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Blue Tint Technical Overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
                style={{ backgroundColor: marqueeConfig.overlayBlurTint }}
            />

            {/* 3D Perspective Container */}
            <div
                className="relative w-full h-full flex items-center justify-center scale-100"
                style={{
                    perspective: marqueeConfig.perspective,
                    perspectiveOrigin: "50% 50%",
                }}
            >
                {/* Fully Opaque Marquee Field */}
                <div
                    className="relative flex gap-0"
                    style={{
                        opacity: marqueeConfig.sceneOpacity,
                        filter: 'none',
                        transform: `rotateX(${marqueeConfig.tiltAngleX}) rotateZ(${marqueeConfig.tiltAngleZ}) translateY(-10%) translateX(-2%) scale(${marqueeConfig.overallScale})`,
                        transformStyle: "preserve-3d",
                        width: "300%",
                        height: "400%",
                    }}
                >
                    <MarqueeColumn images={col1} duration={marqueeConfig.speed} />
                    <MarqueeColumn images={col2} duration={marqueeConfig.speed} reverse={true} />
                    <MarqueeColumn images={col3} duration={marqueeConfig.speed} />
                    <MarqueeColumn images={col4} duration={marqueeConfig.speed} reverse={true} />
                </div>
            </div>
        </div>
    );
}
