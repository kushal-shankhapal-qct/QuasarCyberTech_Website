import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from "../config/themeConfig";

const NODE_W = 260;
const TRACK_H = 520;
const DOT_R = 15;
const CARD_W = 258;
const YEAR_LABEL_SHARED_Y_OFFSET = -75;
const YEAR_LABEL_Y_BY_YEAR = {
  "2024": -10,
  "2025": -24,
} as const;
const CARD_BODY_PAD_TOP = 14;
const CARD_BODY_PAD_X = 14;
const CARD_BODY_PAD_BOTTOM = 12;
const CARD_TITLE_CONTROLS = {
  desktopSize: 1.2,
  mobileSize: 1.02,
  weight: 850,
};
const GAP = {
  nodeX: 0,
  stemFromDot: 0,
  wireTail: 180,
};
const NUDGE = {
  lane: {
    evenIndex: { x: 0, y: 0 },
    oddIndex: { x: -10, y: 0 },
  },
  dot: { x: -15, y: 0 },
  stem: { x: 15, y: 0 },
  wire: { x: 5, y: 10 },
  growthContinues: { x: 12, y: -8.5 },
};
const WIRE_START_CONTROLS = { extendX: 0, snipX: 0 };
const WIRE_END_CONTROLS = { extendX: 90, snipX: 0 };
const WIRE_SHAPE = {
  amplitude: 50,
  waveLength: 2 * (NODE_W + GAP.nodeX),
  samples: 300,
};
const WIRE_DRAW = {
  durationSec: 1.65,
  delaySec: 0.12,
};
const AUTO_SCROLL = {
  enabled: true,
  delaySec: 0.25,
  speedPxPerSec: 50,
  pauseOnInteraction: true,
  pauseOnWheel: true,
  resumeDelaySec: 1.6,
  ensureStartSec: 1.4,
  ensureStartTickMs: 120,
  loop: false,
  startFromLeft: true,
};
const START_LAYOUT = {
  centerFirstMilestone: true,
  sideInsetPx: 400,
};

const milestones = [
  {
    year: "2024",
    month: "Jul",
    title: "Incorporation",
    description:
      "QuasarCyberTech was officially incorporated, marking the beginning of our mission to engineer cyber resilience for modern enterprises.",
    tag: "Foundation",
  },
  {
    year: "2024",
    month: "Oct",
    title: "Headquarters Launch",
    description:
      "Established our first operational headquarters in Nashik, creating the foundation for our consulting and engineering operations.",
    tag: "Presence",
  },
  {
    year: "2024",
    month: "Nov",
    title: "Startup India Recognition",
    description:
      "Recognized under the Startup India initiative, validating our innovation-driven approach and strategic vision.",
    tag: "Recognition",
  },
  {
    year: "2024",
    month: "Dec",
    title: "Strategic Partnerships",
    description:
      "Entered into strategic collaborations with ecosystem partners to strengthen delivery capabilities and market reach.",
    tag: "Alliance",
  },
  {
    year: "2025",
    month: "Feb",
    title: "NASSCOM Membership",
    description:
      "Joined NASSCOM, reinforcing our commitment to technology leadership and aligning with India's leading tech industry body.",
    tag: "Credibility",
  },
  {
    year: "2025",
    month: "Jun",
    title: "QStellar Development",
    description:
      "Initiated development of QStellar, our flagship AI-powered asset visibility and vulnerability intelligence platform.",
    tag: "Platform",
  },
  {
    year: "2025",
    month: "Jul",
    title: "QPulse Launch",
    description:
      "Launched QPulse, our cybersecurity intelligence and regulatory insights platform focused on India and global threat intelligence.",
    tag: "Platform",
  },
  {
    year: "2025",
    month: "Aug",
    title: "Business Excellence Award",
    description:
      "Recognized at national industry platforms for business excellence and cybersecurity innovation.",
    tag: "Recognition",
  },
  {
    year: "2025",
    month: "Aug",
    title: "International Expansion",
    description:
      "Established international presence in Dallas, USA, marking our entry into global markets.",
    tag: "Global",
  },
  {
    year: "2025",
    month: "Sep",
    title: "Emerging Company of the Year",
    description:
      "Recognized as Emerging Company of the Year 2025 by Business Connect Magazine.",
    tag: "Recognition",
  },
  {
    year: "2025",
    month: "Oct",
    title: "QLeap Ecosystem Expansion",
    description:
      "Expanded the QLeap talent and learning ecosystem, building a strong pathway from training to internships and enterprise readiness.",
    tag: "Ecosystem",
  },
] as const;

type Milestone = (typeof milestones)[number];

function buildWireData(nodeStep: number, dotXOffset: number) {
  const wireY = TRACK_H / 2;
  const firstDotCenterX = NODE_W / 2 + dotXOffset;
  const lastDotCenterX = (milestones.length - 1) * nodeStep + NODE_W / 2 + dotXOffset;
  const wireStartX = firstDotCenterX - WIRE_START_CONTROLS.extendX + WIRE_START_CONTROLS.snipX;
  const wireEndX = Math.max(
    lastDotCenterX,
    lastDotCenterX + GAP.wireTail + WIRE_END_CONTROLS.extendX - WIRE_END_CONTROLS.snipX,
  );
  const waveSpan = Math.max(0, wireEndX - wireStartX);
  const baseY = wireY + NUDGE.wire.y;
  const points: string[] = [];

  for (let index = 0; index <= WIRE_SHAPE.samples; index += 1) {
    const t = index / WIRE_SHAPE.samples;
    const x = wireStartX + NUDGE.wire.x + t * waveSpan;
    const y =
      baseY +
      Math.sin(((x - wireStartX) / WIRE_SHAPE.waveLength) * Math.PI * 2) * WIRE_SHAPE.amplitude;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  const pathD = [`M ${points[0]}`, ...points.slice(1).map((point) => `L ${point}`)].join(" ");
  const lastPoint = points[points.length - 1].split(",");
  const peakY = Number.parseFloat(lastPoint[1]);

  return {
    d: pathD,
    peak: { x: wireEndX, y: peakY },
    totalW: Math.max((milestones.length - 1) * nodeStep + NODE_W / 2 + GAP.wireTail + 120, wireEndX + 120),
  };
}

function MilestoneNode({
  milestone,
  index,
  isLast,
  nodeStep,
}: {
  milestone: Milestone;
  index: number;
  isLast: boolean;
  nodeStep: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isTop = index % 2 === 0;
  const isYearStart = index === 0 || milestone.year !== milestones[index - 1]?.year;
  const isGold = index === 0 || isLast;
  const delay = Math.min(index * 0.055, 0.45);
  const laneNudge = isTop ? NUDGE.lane.evenIndex : NUDGE.lane.oddIndex;
  const dotXOffset = NUDGE.dot.x + laneNudge.x;
  const dotY = TRACK_H / 2 + NUDGE.dot.y + laneNudge.y;
  const yearLabelOffset = YEAR_LABEL_Y_BY_YEAR[milestone.year as keyof typeof YEAR_LABEL_Y_BY_YEAR] ?? 0;

  return (
    <div
      ref={ref}
      className="mj-node"
      style={{
        position: "absolute",
        left: `${index * nodeStep}px`,
        width: `${NODE_W}px`,
        height: `${TRACK_H}px`,
        pointerEvents: "none",
      }}
    >
      <div className="mj-node-inner" style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>
        {isYearStart && (
          <div className="mj-year-label" style={{ transform: `translateY(${yearLabelOffset}px)` }}>
            {milestone.year}
          </div>
        )}

        <motion.div
          style={{
            position: "absolute",
            top: `${dotY}px`,
            left: `calc(50% + ${dotXOffset}px)`,
            transform: "translate(-50%, -50%)",
            zIndex: 6,
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay, type: "spring", stiffness: 320, damping: 18 }}
        >
          <div className={`mj-dot ${isGold ? "mj-dot--year" : ""}`}>
            <div className="mj-dot-core" />
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: `calc(50% + ${dotXOffset + NUDGE.stem.x - 1}px)`,
            width: "2px",
            top: isTop ? `${40 + NUDGE.stem.y + laneNudge.y}px` : `${dotY + GAP.stemFromDot + NUDGE.stem.y}px`,
            bottom: isTop ? `${TRACK_H - dotY + GAP.stemFromDot - NUDGE.stem.y}px` : `${40 - NUDGE.stem.y - laneNudge.y}px`,
            background: COLORS.gold,
            zIndex: 2,
            transformOrigin: isTop ? "bottom" : "top",
          }}
        />

        <motion.div
          className={`mj-card mj-card--${isTop ? "top" : "bot"}`}
          initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95, x: "-50%" }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, x: "-50%" } : { x: "-50%" }}
          transition={{ duration: 0.5, delay: delay + 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: `calc(50% + ${laneNudge.x}px)`,
            top: isTop ? `${12 + laneNudge.y}px` : undefined,
            bottom: isTop ? undefined : `${12 - laneNudge.y}px`,
          }}
        >
          <div className="mj-card-body">
            <h4 className="mj-card-title">{milestone.title}</h4>
            <p className="mj-card-desc">{milestone.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function MilestonesJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const autoSlideFrameRef = useRef<number | null>(null);
  const dragStateRef = useRef({ startX: 0, startOffset: 0 });
  const isDraggingRef = useRef(false);
  const translateXRef = useRef(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  const nodeStep = NODE_W + GAP.nodeX;
  const dotXOffset = NUDGE.dot.x;
  const { d: pathD, peak, totalW } = useMemo(() => buildWireData(nodeStep, dotXOffset), [nodeStep, dotXOffset]);
  const startLeadPx = START_LAYOUT.centerFirstMilestone
    ? Math.max(0, viewportWidth * 0.5 - NODE_W * 0.5 - START_LAYOUT.sideInsetPx)
    : 0;
  const totalTrackW = totalW + startLeadPx;
  const scrollBufferPx = 300;
  const maxTranslateX = Math.min(0, viewportWidth - totalTrackW - scrollBufferPx);

  useEffect(() => {
    translateXRef.current = translateX;
  }, [translateX]);

  useEffect(() => {
    const viewport = scrollAreaRef.current;
    if (!viewport) return;

    const syncSize = () => {
      setViewportWidth(viewport.clientWidth);
    };

    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, [totalW]);

  // Motion loop for auto-scroll
  useEffect(() => {
    if (!isSectionInView || !AUTO_SCROLL.enabled || viewportWidth <= 0 || totalTrackW <= viewportWidth || isDraggingRef.current) return;

    if (autoSlideFrameRef.current !== null) {
      window.cancelAnimationFrame(autoSlideFrameRef.current);
      autoSlideFrameRef.current = null;
    }

    const initialDelaySec = translateXRef.current === 0 ? AUTO_SCROLL.delaySec : 0;
    const startDelay = window.setTimeout(() => {
      let lastTimestamp = performance.now();
      let currentX = translateXRef.current;

      const animate = (now: number) => {
        if (isDraggingRef.current) {
          return;
        }

        const elapsedSec = Math.max(0, (now - lastTimestamp) / 1000);
        lastTimestamp = now;
        currentX = Math.max(maxTranslateX, currentX - AUTO_SCROLL.speedPxPerSec * elapsedSec);
        translateXRef.current = currentX;
        setTranslateX(currentX);

        if (currentX > maxTranslateX) {
          autoSlideFrameRef.current = window.requestAnimationFrame(animate);
          return;
        }

        autoSlideFrameRef.current = null;
      };

      autoSlideFrameRef.current = window.requestAnimationFrame((now) => {
        lastTimestamp = now;
        animate(now);
      });
    }, initialDelaySec * 1000);

    return () => {
      window.clearTimeout(startDelay);
      if (autoSlideFrameRef.current !== null) {
        window.cancelAnimationFrame(autoSlideFrameRef.current);
        autoSlideFrameRef.current = null;
      }
    };
  }, [isSectionInView, viewportWidth, totalTrackW, maxTranslateX]);

  // Resume motion loop when drag ends
  useEffect(() => {
    if (isDragging || !isSectionInView || !AUTO_SCROLL.enabled || viewportWidth <= 0 || totalTrackW <= viewportWidth) return;

    // Cancel any existing animation
    if (autoSlideFrameRef.current !== null) {
      window.cancelAnimationFrame(autoSlideFrameRef.current);
      autoSlideFrameRef.current = null;
    }

    // Restart animation immediately after drag ends
    let lastTimestamp = performance.now();
    let currentX = translateXRef.current;

    const animate = (now: number) => {
      if (isDraggingRef.current) {
        return;
      }

      const elapsedSec = Math.max(0, (now - lastTimestamp) / 1000);
      lastTimestamp = now;
      currentX = Math.max(maxTranslateX, currentX - AUTO_SCROLL.speedPxPerSec * elapsedSec);
      translateXRef.current = currentX;
      setTranslateX(currentX);

      if (currentX > maxTranslateX) {
        autoSlideFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      autoSlideFrameRef.current = null;
    };

    autoSlideFrameRef.current = window.requestAnimationFrame((now) => {
      lastTimestamp = now;
      animate(now);
    });

    return () => {
      if (autoSlideFrameRef.current !== null) {
        window.cancelAnimationFrame(autoSlideFrameRef.current);
        autoSlideFrameRef.current = null;
      }
    };
  }, [isDragging, isSectionInView, viewportWidth, totalTrackW, maxTranslateX]);

  useEffect(() => {
    setTranslateX((prev) => Math.min(0, Math.max(maxTranslateX, prev)));
  }, [maxTranslateX]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (viewportWidth <= 0 || totalTrackW <= viewportWidth) return;

    setIsDragging(true);
    isDraggingRef.current = true;

    if (autoSlideFrameRef.current !== null) {
      window.cancelAnimationFrame(autoSlideFrameRef.current);
      autoSlideFrameRef.current = null;
    }

    dragStateRef.current = {
      startX: event.clientX,
      startOffset: translateX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const nextX = Math.min(0, Math.max(maxTranslateX, dragStateRef.current.startOffset + deltaX));
    setTranslateX(nextX);
  };

  const stopDragging = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} className="mj-section about-content-section">
      <div className="mj-header">
        <motion.div
          className="mj-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Milestones Since Inception
        </motion.div>
        <motion.h2
          className="mj-h2"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          Growth <span className="mj-h2-accent">Journey</span>
        </motion.h2>
        <motion.p
          className="mj-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          A clear progression of strategic growth milestones shaping <span style={{ color: COLORS.burgundy }}>QuasarCyberTech</span> into a trusted cybersecurity authority.
        </motion.p>
      </div>

      <div
        ref={scrollAreaRef}
        className={`mj-scroll-area ${isDragging ? "mj-scroll-area--dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <div
          className="mj-track"
          style={{
            width: `${totalTrackW}px`,
            height: `${TRACK_H}px`,
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: "none",
            willChange: "transform",
          }}
        >
          <div
            className="mj-track-content"
            style={{
              position: "relative",
              width: `${totalW}px`,
              height: "100%",
              transform: `translate3d(${startLeadPx}px, 0, 0)`,
            }}
          >
            <svg className="mj-wire" viewBox={`0 0 ${totalW} ${TRACK_H}`}>
              <defs>
                <linearGradient id="mj-wg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={COLORS.burgundy} />
                  <stop offset="45%" stopColor={COLORS.gold} />
                  <stop offset="75%" stopColor={COLORS.burgundy} />
                  <stop offset="100%" stopColor={COLORS.gold} />
                </linearGradient>
              </defs>
              <g>
                <path d={pathD} fill="none" stroke="rgba(107,21,48,0.06)" strokeWidth="3" />
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#mj-wg)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isSectionInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    duration: WIRE_DRAW.durationSec,
                    delay: WIRE_DRAW.delaySec,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </g>
            </svg>

            <div className="mj-nodes" style={{ position: "relative", width: "100%", height: "100%", zIndex: 3 }}>
              {milestones.map((milestone, index) => (
                <MilestoneNode
                  key={`${milestone.year}-${milestone.month}-${milestone.title}`}
                  milestone={milestone}
                  index={index}
                  isLast={index === milestones.length - 1}
                  nodeStep={nodeStep}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                position: "absolute",
                left: `${peak.x + NUDGE.growthContinues.x}px`,
                top: `${peak.y + NUDGE.growthContinues.y}px`,
                transform: "translateY(-50%)",
                zIndex: 10,
                pointerEvents: "none",
                fontFamily: TYPOGRAPHY.fontBody,
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: COLORS.gold,
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: COLORS.gold }} />
              Growth Continues
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="mj-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <span className="mj-hint-arrow">←</span>
        <span>Scroll to explore the journey</span>
        <span className="mj-hint-arrow">→</span>
      </motion.div>

      <style>{`
        .mj-section {
          position: relative;
          overflow: hidden;
          padding: clamp(42px, 5vw, 72px) 0 clamp(32px, 4vw, 52px);
          background: ${SECTION_BACKGROUNDS.LIGHT};
        }

        .mj-header {
          position: relative;
          z-index: 2;
          margin-bottom: clamp(24px, 3vw, 36px);
          padding: 0 clamp(16px, 4vw, 48px);
        }
        .mj-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: ${COLORS.burgundy};
        }
        .mj-h2 {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(1.875rem, 4.5vw, 3.125rem);
          font-weight: 800;
          color: #1A0A0F;
          line-height: 1.08;
          margin: 0 0 12px;
        }
        .mj-h2 .mj-h2-accent {
          color: ${COLORS.burgundy};
          font-style: normal;
        }
        .mj-sub {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: clamp(0.875rem, 1.5vw, 1.0625rem);
          color: #6b5760;
          line-height: 1.7;
          max-width: 580px;
          margin: 0;
        }

        .mj-scroll-area {
          overflow: hidden;
          position: relative;
          width: 100%;
          cursor: default;
          user-select: none;
          touch-action: pan-y;
          padding: 2.5rem clamp(24px, 4vw, 64px) 2rem;
          z-index: 2;
        }
        .mj-scroll-area--dragging {
          cursor: default;
        }

        .mj-track {
          position: relative;
        }
        .mj-wire {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: visible;
        }

        .mj-year-label {
          position: absolute;
          top: calc(50% + ${NUDGE.dot.y}px + ${YEAR_LABEL_SHARED_Y_OFFSET}px);
          left: 4px;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 1.85rem;
          font-weight: 950;
          color: #D6B05C;
          pointer-events: none;
          letter-spacing: -0.04em;
          z-index: 2;
          user-select: none;
          text-transform: uppercase;
        }

        .mj-dot {
          width: ${DOT_R * 2}px;
          height: ${DOT_R * 2}px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.burgundy}, #922040);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #faf7f4;
          position: relative;
          z-index: 3;
        }
        .mj-dot--year {
          width: ${DOT_R * 2 + 6}px;
          height: ${DOT_R * 2 + 6}px;
          background: linear-gradient(135deg, ${COLORS.gold}, #c9a23e);
        }
        .mj-dot-core {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
        }

        .mj-card {
          background: #fff;
          border: 1px solid rgba(107, 21, 48, 0.09);
          overflow: hidden;
          transition: transform 0.26s ease, border-color 0.26s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: ${CARD_W}px;
          z-index: 5;
        }
        .mj-card--top {
          border-top: 2.5px solid ${COLORS.gold};
          border-radius: 0 0 8px 8px;
          top: 12px;
        }
        .mj-card--top:hover {
          border-top-color: ${COLORS.burgundy} !important;
        }
        .mj-card--bot {
          border-bottom: 2.5px solid ${COLORS.gold};
          border-radius: 8px 8px 0 0;
          bottom: 12px;
        }
        .mj-card--bot:hover {
          border-bottom-color: ${COLORS.burgundy} !important;
        }
        .mj-card:hover {
          transform: translateX(-50%) translateY(-3px);
          border-color: rgba(107, 21, 48, 0.18);
        }
        .mj-card--bot:hover {
          transform: translateX(-50%) translateY(3px);
        }
        .mj-card-body {
          padding: ${CARD_BODY_PAD_TOP}px ${CARD_BODY_PAD_X}px ${CARD_BODY_PAD_BOTTOM}px;
          flex: 1;
        }
        .mj-card-title {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: calc(0.96rem * ${CARD_TITLE_CONTROLS.desktopSize});
          font-weight: ${CARD_TITLE_CONTROLS.weight};
          color: ${COLORS.burgundy};
          line-height: 1.18;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        .mj-card-desc {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.8rem;
          color: rgba(26, 10, 15, 0.78);
          line-height: 1.55;
          margin: 0;
        }

        .mj-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 14px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(107, 21, 48, 0.35);
          letter-spacing: 0.08em;
        }
        .mj-hint-arrow {
          font-size: 0.875rem;
          animation: mj-nudge 1.6s ease-in-out infinite;
        }
        .mj-hint-arrow:last-child {
          animation-direction: reverse;
        }
        @keyframes mj-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(4px); opacity: 1; }
        }

        @media (max-width: 900px) {
          .mj-section {
            padding: clamp(44px, 7vw, 72px) clamp(16px, 4vw, 28px);
          }
          .mj-scroll-area {
            overflow: hidden;
            padding: 0;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .mj-scroll-area::-webkit-scrollbar {
            display: none;
          }
          .mj-track-content {
            width: 100% !important;
            transform: none !important;
          }
          .mj-track {
            width: 100% !important;
            height: auto !important;
            padding-left: 0;
            position: relative;
            transform: none !important;
          }
          .mj-track::before {
            display: none;
          }
          .mj-wire {
            display: none;
          }
          .mj-nodes {
            flex-direction: column;
            height: auto;
          }
          .mj-node {
            position: relative !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            padding: 10px 0 14px;
          }
          .mj-node-inner {
            height: auto !important;
          }
          .mj-dot {
            display: none !important;
          }
          .mj-stem {
            display: none !important;
          }
          .mj-year-label {
            display: none;
          }
          .mj-card {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: none !important;
            border-radius: 0 0 8px 8px !important;
            border: 1px solid rgba(107, 21, 48, 0.1) !important;
            border-top: none !important;
          }
          .mj-card::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 2.5px;
            background: linear-gradient(90deg, ${COLORS.burgundy} 0%, ${COLORS.gold} 100%);
            z-index: 1;
          }
          .mj-card--bot {
            border-bottom: 1px solid rgba(107, 21, 48, 0.1) !important;
            border-radius: 0 0 8px 8px !important;
          }
          .mj-card-title {
            font-size: calc(0.96rem * ${CARD_TITLE_CONTROLS.mobileSize});
          }
          .mj-hint {
            display: none;
          }
        }

        @media (max-width: 540px) {
          .mj-track {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
