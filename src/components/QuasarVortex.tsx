import React from 'react';
    import { motion } from 'framer-motion';

    /**
     * QuasarVortex
     *
     * A minimalist, abstract, rotating quasar SVG background designed for light-mode pages.
     * - Pure white backdrop (the page background should remain white)
     * - Geometric line-based spiral rings with a vertical gradient (magenta -> rose -> copper)
     * - Subtle warm lens flare that slices across the outer edge
     * - Low overall opacity so it functions purely as a backdrop (10-15%)
     *
     * This component is decorative and set to aria-hidden.
     */

    const QuasarVortex: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 960 }) => {
      // Colors chosen to represent Top: magenta/purple, Middle: rose/pink, Bottom: warm copper/tan
      const top = '#C41E5E'; // vibrant magenta/purple
      const middle = '#F6A5BD'; // soft rose/pink
      const bottom = '#D7A77A'; // warm copper / light tan

      return (
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`}
        >
          <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="block"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.12 }}
          >
            <title>Quasar background</title>
            <desc>Decorative geometric quasar vortex in magenta, rose and copper tones.</desc>

            <defs>
              {/* Vertical gradient used for strokes */}
              <linearGradient id="quasarGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={top} />
                <stop offset="50%" stopColor={middle} />
                <stop offset="100%" stopColor={bottom} />
              </linearGradient>

              {/* A narrower gradient for subtle inner lines */}
              <linearGradient id="quasarGradientNarrow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={top} stopOpacity="0.95" />
                <stop offset="60%" stopColor={middle} stopOpacity="0.9" />
                <stop offset="100%" stopColor={bottom} stopOpacity="0.9" />
              </linearGradient>

              {/* Glow filter for outer corona / lens flare */}
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Thin sharp flare blur for slicing effect */}
              <filter id="flareBlur" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" result="fblur" />
                <feMerge>
                  <feMergeNode in="fblur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Soft radial core */}
              <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="20%" stopColor={top} stopOpacity="0.85" />
                <stop offset="45%" stopColor={middle} stopOpacity="0.55" />
                <stop offset="100%" stopColor={bottom} stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* Background white fill (keeps the svg itself neutral; page body is white) */}
            <rect width={size} height={size} fill="transparent" />

            {/* Bright core */}
            <circle cx={size / 2} cy={size / 2} r={size * 0.05} fill="url(#coreGradient)" />

            {/* Geometric spiral-like rings created from many rotated arc segments */}
            <g transform={`translate(${size / 2}, ${size / 2})`} strokeLinecap="square" fill="none">
              {/* Use several rings with slightly angular stroke patterns to create a faceted geometric look */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const r = (size * (0.12 + i * 0.09));
                const strokeWidth = 2 + (i % 2 === 0 ? 1 : 0.5);
                const dash = `${Math.max(6, 18 - i * 2)} ${Math.max(8, 22 - i * 3)}`;
                const rotate = i * 12;
                // Slight inward spiral offset via path Arc segments broken into many small arcs is verbose;
                // we simulate a geometric spiraling ring by rotating the ring group and using strokeDasharray to produce angular segments.
                return (
                  <g key={i} transform={`rotate(${rotate})`} >
                    <circle
                      r={r}
                      stroke="url(#quasarGradient)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={dash}
                      opacity={1 - i * 0.08}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}

              {/* A set of tighter angular rings for wireframe look */}
              {[6, 7, 8].map((i) => {
                const r = (size * (0.12 + i * 0.045));
                const strokeWidth = 1 + (i - 6) * 0.4;
                const dash = `${6 + (i - 6) * 3} ${12 + (i - 6) * 6}`;
                const rotate = i * 15;
                return (
                  <g key={`inner-${i}`} transform={`rotate(${rotate})`} >
                    <circle
                      r={r}
                      stroke="url(#quasarGradientNarrow)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={dash}
                      opacity={0.9 - i * 0.06}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}

              {/* Subtle radial spokes to emphasize geometry */}
              {[0, 30, 60, 90, 120, 150].map((ang, idx) => (
                <line
                  key={`spoke-${ang}`}
                  x1={size * 0.06}
                  y1={size * 0.06}
                  x2={size * 0.45}
                  y2={size * 0.45}
                  transform={`rotate(${ang})`}
                  stroke="url(#quasarGradientNarrow)"
                  strokeWidth={0.8}
                  opacity={0.18 + idx * 0.02}
                />
              ))}

            </g>

            {/* Warm copper-yellow lens flare slicing the outer edge */}
            <g transform={`translate(${size / 2}, ${size / 2}) rotate(-24)`} filter="url(#flareBlur)" opacity="0.9">
              <rect
                x={size * 0.36}
                y={-size * 0.02}
                width={size * 0.5}
                height={size * 0.06}
                rx={2}
                fill={`url(#flareGradient-${'1'})`}
                style={{ mixBlendMode: 'screen' }}
              />
            </g>

            {/* Since we referenced a dynamic id above for flare gradient, create it here */}
            <defs>
              <linearGradient id="flareGradient-1" x1="0" x2="1">
                <stop offset="0%" stopColor="#FFF9D6" stopOpacity="1" />
                <stop offset="40%" stopColor="#FFD98A" stopOpacity="0.95" />
                <stop offset="70%" stopColor={bottom} stopOpacity="0.6" />
                <stop offset="100%" stopColor={bottom} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* A faint outer glow to add dimensionality (very subtle) */}
            <g filter="url(#glow)">
              <circle cx={size / 2} cy={size / 2} r={size * 0.42} fill="none" stroke={bottom} strokeWidth={0.5} opacity={0.06} />
            </g>
          </motion.svg>
        </motion.div>
      );
    };

    export default QuasarVortex;