/**
 * WorldMap component — adapted from Aceternity UI for Vite (no Next.js / next-themes).
 * Uses `dotted-map` for the base map and framer-motion for animated arcs.
 */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';

interface DotConnection {
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
    dots?: DotConnection[];
    lineColor?: string;
    secondaryLineColor?: string;
    dotColor?: string;
    backgroundColor?: string;
    className?: string;
    highlightedLocation?: { lat: number; lng: number } | null;
    highlightLabel?: string;
}

export default function WorldMap({
    dots = [],
    lineColor = '#1F6FEB',
    secondaryLineColor,
    dotColor = '#00000040',
    backgroundColor = 'transparent',
    className = '',
    highlightedLocation = null,
    highlightLabel,
}: WorldMapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const map = new DottedMap({ height: 100, grid: 'diagonal' });

    const svgMap = map.getSVG({
        radius: 0.22,
        color: dotColor,
        shape: 'circle',
        backgroundColor,
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    // Calculate ViewBox based on highlighting
    const defaultViewBox = "0 0 800 400";
    let targetViewBox = defaultViewBox;

    if (highlightedLocation) {
        const point = projectPoint(highlightedLocation.lat, highlightedLocation.lng);
        const width = 200; // Zoom level width
        const height = 100; // Zoom level height
        const x = Math.max(0, Math.min(800 - width, point.x - width / 2));
        const y = Math.max(0, Math.min(400 - height, point.y - height / 2));
        targetViewBox = `${x} ${y} ${width} ${height}`;
    }

    return (
        <div className={`w-full aspect-[2/1] rounded-lg relative font-sans overflow-hidden ${className}`}
            style={{ backgroundColor }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: highlightedLocation ? 4 : 1, // 800/200 = 4
                    x: highlightedLocation ? `${-(projectPoint(highlightedLocation.lat, highlightedLocation.lng).x * 4 - 400)}px` : 0,
                    y: highlightedLocation ? `${-(projectPoint(highlightedLocation.lat, highlightedLocation.lng).y * 4 - 200)}px` : 0,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: '0 0' }}
            >
                <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                    className="h-full w-full opacity-40 pointer-events-none select-none"
                    alt="QuasarCyberTech | Global Presence Map"
                    height="400"
                    width="800"
                    draggable={false}
                />
            </motion.div>

            <motion.svg
                ref={svgRef}
                viewBox={defaultViewBox}
                animate={{
                    viewBox: targetViewBox
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full absolute inset-0 pointer-events-none select-none z-10"
            >
                <defs>
                    <linearGradient id="path-gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    {secondaryLineColor && (
                        <linearGradient id="path-gradient-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="white" stopOpacity="0" />
                            <stop offset="5%" stopColor={secondaryLineColor} stopOpacity="1" />
                            <stop offset="95%" stopColor={secondaryLineColor} stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    )}
                </defs>

                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                    const isSecondary = dot.start.label === 'client' || dot.end.label === 'client';
                    const gradId = isSecondary && secondaryLineColor
                        ? 'url(#path-gradient-secondary)'
                        : 'url(#path-gradient-primary)';

                    return (
                        <g key={`path-group-${i}`}>
                            <motion.path
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                stroke={gradId}
                                strokeWidth={highlightedLocation ? "0.4" : "1"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.5 * i, ease: 'easeOut' }}
                            />
                        </g>
                    );
                })}

                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                    const isSecondaryStart = dot.start.label === 'client';
                    const isSecondaryEnd = dot.end.label === 'client';
                    const startColor = isSecondaryStart && secondaryLineColor ? secondaryLineColor : lineColor;
                    const endColor = isSecondaryEnd && secondaryLineColor ? secondaryLineColor : lineColor;

                    return (
                        <g key={`points-group-${i}`}>
                            <g key={`start-${i}`}>
                                <circle cx={startPoint.x} cy={startPoint.y} r={highlightedLocation ? "0.8" : "2"} fill={startColor} />
                                <circle cx={startPoint.x} cy={startPoint.y} r={highlightedLocation ? "0.8" : "2"} fill={startColor} opacity="0.5">
                                    <animate attributeName="r" from={highlightedLocation ? "0.8" : "2"} to={highlightedLocation ? "3" : "8"} dur="1.5s" begin="0s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                                </circle>
                            </g>
                            <g key={`end-${i}`}>
                                <circle cx={endPoint.x} cy={endPoint.y} r={highlightedLocation ? "0.8" : "2"} fill={endColor} />
                                <circle cx={endPoint.x} cy={endPoint.y} r={highlightedLocation ? "0.8" : "2"} fill={endColor} opacity="0.5">
                                    <animate attributeName="r" from={highlightedLocation ? "0.8" : "2"} to={highlightedLocation ? "3" : "8"} dur="1.5s" begin="0s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                                </circle>
                            </g>
                        </g>
                    );
                })}
            </motion.svg>

            {/* Zoom Label Overlay */}
            {highlightedLocation && highlightLabel && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(10, 5, 15, 0.75)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(214,176,92,0.3)',
                        borderRadius: '6px',
                        padding: '8px 20px',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        zIndex: 30,
                        pointerEvents: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    }}
                >
                    <span style={{ color: '#D6B05C', marginRight: '8px' }}>◉</span>
                    {highlightLabel}
                </motion.div>
            )}
        </div>
    );
}
