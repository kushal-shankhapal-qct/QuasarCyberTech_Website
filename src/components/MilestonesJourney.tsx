import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from "../config/themeConfig";

/* ═══════════════════════════════════════════════
   LAYOUT TUNING — all in px, adjust freely
   ═══════════════════════════════════════════════ */
const NODE_W = 260;   // horizontal slot per milestone
const TRACK_H = 520;   // total track height
const DOT_R = 15;    // dot radius
const CARD_W = 210;   // card width
const DOT_Y_BIAS = 0;   // move the whole wire up/down (negative = up)
const STEM_X_BIAS = 0;   // stem left/right nudge

const EXIT_RISE_Y = -120; // how high the wire naturally rises at the end (negative = up)
const EXIT_TAIL_W = 180;  // extra length to extend past the last milestone dot

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */
const milestones = [
  {
    year: "2024", month: "Jul",
    title: "Incorporation",
    description: "QuasarCyberTech was officially incorporated, marking the beginning of our mission to engineer cyber resilience for modern enterprises.",
    tag: "Foundation",
  },
  {
    year: "2024", month: "Oct",
    title: "Headquarters Launch",
    description: "Established our first operational headquarters in Nashik, creating the foundation for our consulting and engineering operations.",
    tag: "Presence",
  },
  {
    year: "2024", month: "Nov",
    title: "Startup India Recognition",
    description: "Recognized under the Startup India initiative, validating our innovation-driven approach and strategic vision.",
    tag: "Recognition",
  },
  {
    year: "2024", month: "Dec",
    title: "Strategic Partnerships",
    description: "Entered into strategic collaborations with ecosystem partners to strengthen delivery capabilities and market reach.",
    tag: "Alliance",
  },
  {
    year: "2025", month: "Feb",
    title: "NASSCOM Membership",
    description: "Joined NASSCOM, reinforcing our commitment to technology leadership and aligning with India's leading tech industry body.",
    tag: "Credibility",
  },
  {
    year: "2025", month: "Jun",
    title: "QStellar Development",
    description: "Initiated development of QStellar, our flagship AI-powered asset visibility and vulnerability intelligence platform.",
    tag: "Platform",
  },
  {
    year: "2025", month: "Jul",
    title: "QPulse Launch",
    description: "Launched QPulse, our cybersecurity intelligence and regulatory insights platform focused on India and global threat intelligence.",
    tag: "Platform",
  },
  {
    year: "2025", month: "Aug",
    title: "Business Excellence Award",
    description: "Recognized at national industry platforms for business excellence and cybersecurity innovation.",
    tag: "Recognition",
  },
  {
    year: "2025", month: "Aug",
    title: "International Expansion",
    description: "Established international presence in Dallas, USA, marking our entry into global markets.",
    tag: "Global",
  },
  {
    year: "2025", month: "Sep",
    title: "Emerging Company of the Year",
    description: "Recognized as Emerging Company of the Year 2025 by Business Connect Magazine.",
    tag: "Recognition",
  },
  {
    year: "2025", month: "Oct",
    title: "QLeap Ecosystem Expansion",
    description: "Expanded the QLeap talent and learning ecosystem, building a strong pathway from training to internships and enterprise readiness.",
    tag: "Ecosystem",
  },
];

const ALL_NODES = milestones.length; // number of regular nodes

/* ═══════════════════════════════════════════════
   REGULAR NODE
   ═══════════════════════════════════════════════ */
function MilestoneNode({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof milestones)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isTop = index % 2 === 0;
  const isYearStart = index === 0 || milestone.year !== milestones[index - 1]?.year;
  const isGold = index === 0 || isLast;
  const d = Math.min(index * 0.055, 0.45);
  const wireY = TRACK_H / 2 + DOT_Y_BIAS;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${index * NODE_W}px`,
        width: `${NODE_W}px`,
        height: `${TRACK_H}px`,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", pointerEvents: "auto" }}>

        {/* Year watermark — subtle, only on year-start nodes */}
        {isYearStart && (
          <div className="mj-year-label">
            {milestone.year}
          </div>
        )}



        {/* Dot */}
        <motion.div
          style={{
            position: "absolute",
            top: `${wireY}px`,
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 6,
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay: d, type: "spring", stiffness: 320, damping: 18 }}
        >
          <div className={`mj-dot ${isGold ? "mj-dot--year" : ""}`}>
            <div className="mj-dot-core" />
          </div>
          <div className="mj-dot-ring" style={{ animationDelay: `${d}s` }} />
        </motion.div>

        {/* Stem */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: d + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: `calc(50% - 1px)`,
            width: "2px",
            top: isTop ? "40px" : `${wireY}px`,
            bottom: isTop ? `${TRACK_H - wireY}px` : "40px",
            background: isTop
              ? `linear-gradient(to top, ${COLORS.burgundy}00, ${COLORS.burgundy})`
              : `linear-gradient(to bottom, ${COLORS.gold}00, ${COLORS.gold})`,
            zIndex: 2,
            transformOrigin: isTop ? "bottom" : "top",
          }}
        />

        {/* Card */}
        <motion.div
          className={`mj-card mj-card--${isTop ? "top" : "bot"}`}
          initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95, x: "-50%" }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, x: "-50%" } : { x: "-50%" }}
          transition={{ duration: 0.5, delay: d + 0.12, ease: [0.22, 1, 0.36, 1] }}
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

// Main Export
export default function MilestonesJourney() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smoothProg = useSpring(progress, { stiffness: 90, damping: 24 });

  /* Progress sync */
  /* ═══════════════════════════════════════════════
     DRAG SCROLL LOGIC
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      // Don't trigger if clicking on something interactive like a card
      if ((e.target as HTMLElement).closest('.mj-card')) return;
      isDown = true;
      el.classList.add("mj-grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("mj-grabbing");
    };
    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("mj-grabbing");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; 
      el.scrollLeft = scrollLeft - walk;
    };

    el.onmousedown = onMouseDown;
    el.onmouseleave = onMouseLeave;
    el.onmouseup = onMouseUp;
    el.onmousemove = onMouseMove;

    return () => {
      el.onmousedown = null; el.onmouseleave = null; el.onmouseup = null; el.onmousemove = null;
    };
  }, []);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? el.scrollLeft / max : 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  const wireY = TRACK_H / 2 + DOT_Y_BIAS;

  const wireData = (() => {
    // A clean, straight enterprise timeline
    const lastX = (milestones.length - 1) * NODE_W + NODE_W / 2;
    const endX = lastX + EXIT_TAIL_W + 60;
    
    return { 
      d: `M 0,${wireY} L ${endX},${wireY}`, 
      peak: { x: endX, y: wireY }
    };
  })();

  const { d: pathD, peak } = wireData;
  const totalW = (milestones.length - 1) * NODE_W + (NODE_W / 2) + EXIT_TAIL_W + 120;

  return (
    <section className="mj-section about-content-section">
      <div className="mj-bg-grid" />
      <div className="mj-bg-orb mj-bg-orb--a" />
      <div className="mj-bg-orb mj-bg-orb--b" />

      {/* Header */}
      <div className="mj-header">
        <motion.div className="mj-eyebrow"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          Milestones Since Inception
        </motion.div>
        <motion.h2 className="mj-h2"
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.06 }}
        >
          Growth <em>Journey</em>
        </motion.h2>
        <motion.p className="mj-sub"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
        >
          A clear progression of strategic growth milestones shaping QuasarCyberTech into a trusted cybersecurity authority.
        </motion.p>
      </div>

      {/* Scroll area */}
      <div ref={scrollAreaRef} className="mj-scroll-area">
        <div
          className="mj-track"
          style={{ width: `${totalW}px`, height: `${TRACK_H}px` }}
        >
          {/* Wire */}
          <svg className="mj-wire" viewBox={`0 0 ${totalW} ${TRACK_H}`}>
            <defs>
              <linearGradient id="mj-wg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={COLORS.burgundy} />
                <stop offset="45%" stopColor={COLORS.gold} />
                <stop offset="75%" stopColor={COLORS.burgundy} />
                <stop offset="100%" stopColor={COLORS.gold} />
              </linearGradient>
            </defs>
            {/* Ghost track */}
            <path d={pathD} fill="none" stroke="rgba(107,21,48,0.06)" strokeWidth="3" />
            {/* Animated fill */}
            <motion.path
              d={pathD} fill="none"
              stroke="url(#mj-wg)" strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: smoothProg }}
            />
          </svg>

          {/* Regular nodes */}
           <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 3 }}>
            {milestones.map((m, i) => (
              <MilestoneNode 
                key={`${m.year}-${m.month}-${m.title}`} 
                milestone={m} 
                index={i} 
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>

          {/* Growth Continues Label */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              position: 'absolute',
              left: `${peak.x + 12}px`,
              top: `${peak.y}px`,
              transform: 'translateY(-50%)',
              zIndex: 10,
              pointerEvents: 'none',
              fontFamily: TYPOGRAPHY.fontBody,
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: COLORS.gold,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: COLORS.gold }} />
            Growth Continues
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div className="mj-hint"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.6 }}
      >
        <span className="mj-hint-arrow">←</span>
        <span>Scroll to explore the journey</span>
        <span className="mj-hint-arrow">→</span>
      </motion.div>

      {/* ═══ STYLES ═══ */}
      <style>{`
        .mj-section {
          position: relative; overflow: hidden;
          padding: clamp(42px, 5vw, 72px) 0 clamp(32px, 4vw, 52px);
          background:
            radial-gradient(ellipse 50% 40% at 12% 20%, rgba(107,21,48,0.04), transparent),
            radial-gradient(ellipse 40% 50% at 88% 80%, rgba(214,176,92,0.035), transparent),
            ${SECTION_BACKGROUNDS.LIGHT};
        }
        .mj-bg-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.15;
          background-image:
            linear-gradient(rgba(107,21,48,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107,21,48,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 65% 55% at 50% 50%, black 35%, transparent 100%);
        }
        .mj-bg-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .mj-bg-orb--a { width: 20rem; height: 20rem; top: -8rem; left: -6rem; background: rgba(107,21,48,0.12); }
        .mj-bg-orb--b { width: 18rem; height: 18rem; bottom: -6rem; right: -5rem; background: rgba(214,176,92,0.1); }

        /* Header */
        .mj-header {
          position: relative; z-index: 2;
          margin-bottom: clamp(24px, 3vw, 36px);
          padding: 0 clamp(16px, 4vw, 48px);
        }
        .mj-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 14px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; color: #9a7a30;
        }
        .mj-h2 {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(1.875rem, 4.5vw, 3.125rem); font-weight: 800;
          color: #1A0A0F; line-height: 1.08; margin: 0 0 12px;
        }
        .mj-h2 em { color: ${COLORS.burgundy}; font-style: italic; }
        .mj-sub {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: clamp(0.875rem, 1.5vw, 1.0625rem); color: #6b5760;
          line-height: 1.7; max-width: 580px; margin: 0;
        }

        /* Scroll area */
        .mj-scroll-area {
          overflow-x: auto; 
          overflow-y: visible;
          position: relative; 
          width: 100%;
          cursor: url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 15.5C25 14.6716 24.3284 14 23.5 14C22.6716 14 22 14.6716 22 15.5V16V8.5C22 7.67157 21.3284 7 20.5 7C19.6716 7 19 7.67157 19 8.5V16V5.5C19 4.67157 18.3284 4 17.5 4C16.6716 4 16 4.67157 16 5.5V16V6.5C16 5.67157 15.3284 5 14.5 5C13.6716 5 13 5.67157 13 6.5V16V16.5C13 16.5 10 16.5 9 17.5C8 18.5 7.5 21 9 24.5C10.5 28 13.5 29.5 17 29.5C20.5 29.5 22.5 29 24 26C25 24 25 18 25 15.5Z" fill="%236B1530" stroke="white" stroke-width="1"/></svg>') 16 16, auto;
          user-select: none;
          padding: 2.5rem clamp(24px, 4vw, 64px) 1.5rem;
          z-index: 2;

          /* Elegant Big Scrollbar */
          scrollbar-width: thin;
          scrollbar-color: rgba(107,21,48,0.2) transparent;
        }
        
        .mj-scroll-area::-webkit-scrollbar {
          height: 12px;
          display: block;
        }
        .mj-scroll-area::-webkit-scrollbar-track {
           background: rgba(107,21,48,0.04);
           border-radius: 8px;
           margin: 0 clamp(24px, 4vw, 64px);
        }
        .mj-scroll-area::-webkit-scrollbar-thumb {
           background: rgba(107,21,48,0.18);
           border-radius: 8px;
           border: 3px solid transparent; 
           background-clip: padding-box;
           transition: background 0.2s ease;
        }
        .mj-scroll-area::-webkit-scrollbar-thumb:hover {
           background: ${COLORS.gold}44;
           background-clip: padding-box;
        }

        .mj-scroll-area.mj-grabbing { 
          cursor: url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 13.5C11 12.6716 11.6716 12 12.5 12C13.3284 12 14 12.6716 14 13.5V14V11.5C14 10.6716 14.6716 10 15.5 10C16.3284 10 17 10.6716 17 11.5V14V11.5C17 10.6716 17.6716 10 18.5 10C19.3284 10 20 10.6716 20 11.5V14V13.5C20 12.6716 20.6716 12 21.5 12C22.3284 12 23 12.6716 23 13.5V16V16.5C23 16.5 25 17 26 18.5C27 20 27 23 26 26C25 29 22 29.5 19 29.5C16 29.5 14.5 29.5 11 28.5C7.5 27.5 7 24.5 7.5 22C8 19.5 11 14.5 11 13.5Z" fill="%236B1530" stroke="white" stroke-width="1"/></svg>') 16 16, grabbing; 
        }
        
        .mj-track { position: relative; }
        .mj-wire {
          position: absolute; left: 0; top: 0;
          width: 100%; height: 100%; z-index: 1; pointer-events: none;
          overflow: visible;
        }

        /* Year watermark */
        .mj-year-label {
          position: absolute;
          top: calc(50% + ${DOT_Y_BIAS}px - 68px);
          left: 4px;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 1.85rem; font-weight: 950;
          color: rgba(107,21,48,0.3);
          pointer-events: none;
          letter-spacing: -0.04em;
          z-index: 2;
          user-select: none;
          text-transform: uppercase;
        }



        /* Dot */
        .mj-dot {
          width: ${DOT_R * 2}px; height: ${DOT_R * 2}px; border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.burgundy}, #922040);
          display: flex; align-items: center; justify-content: center;
          border: 3px solid #faf7f4;
          box-shadow: 0 3px 14px rgba(107,21,48,0.28);
          position: relative; z-index: 3;
        }
        .mj-dot--year {
          width: ${DOT_R * 2 + 6}px; height: ${DOT_R * 2 + 6}px;
          background: linear-gradient(135deg, ${COLORS.gold}, #c9a23e);
          box-shadow: 0 3px 16px rgba(214,176,92,0.4);
        }
        .mj-dot-ring {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: ${DOT_R * 2}px; height: ${DOT_R * 2}px; border-radius: 50%;
          border: 1.5px solid rgba(107,21,48,0.3);
          animation: mj-ring 2.8s ease-out infinite; z-index: 2;
          pointer-events: none;
        }
        @keyframes mj-ring {
          0%   { opacity: 0.5; width: ${DOT_R * 2}px; height: ${DOT_R * 2}px; }
          100% { opacity: 0;   width: ${DOT_R * 4}px; height: ${DOT_R * 4}px; }
        }

        @media (max-width: 768px) {
          .mj-dot, .mj-dot-ring { display: none !important; }
        }



        /* Regular card */
        .mj-card {
          background: #fff;
          border: 1px solid rgba(107,21,48,0.09);
          overflow: hidden;
          transition: transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease;
          cursor: default;
          display: flex; flex-direction: column;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: ${CARD_W}px;
          z-index: 5;
        }
        .mj-card--top {
          border-top: 2.5px solid ${COLORS.burgundy};
          border-radius: 0 0 8px 8px;
          top: 12px;
        }
        .mj-card--top:hover { border-top-color: ${COLORS.gold}; }
        .mj-card--bot {
          border-bottom: 2.5px solid ${COLORS.gold};
          border-radius: 8px 8px 0 0;
          bottom: 12px;
        }
        .mj-card--bot:hover { border-bottom-color: ${COLORS.burgundy}; }
        .mj-card:hover {
          transform: translateX(-50%) translateY(-3px);
          box-shadow: 0 14px 40px rgba(107,21,48,0.13);
          border-color: rgba(107,21,48,0.18);
        }
        .mj-card--bot:hover {
          transform: translateX(-50%) translateY(3px);
        }
        .mj-card-body { padding: 14px 13px 12px; flex: 1; }
        .mj-card-title {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 0.875rem; font-weight: 700;
          color: #1a0a0f; line-height: 1.25; margin: 0 0 6px;
        }
        .mj-card-desc {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.71875rem; color: rgba(26,10,15,0.6);
          line-height: 1.5; margin: 0;
        }



        /* Hint */
        .mj-hint {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-top: 14px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 0.75rem; font-weight: 500; color: rgba(107,21,48,0.35);
          letter-spacing: 0.08em;
        }
        .mj-hint-arrow { font-size: 0.875rem; animation: mj-nudge 1.6s ease-in-out infinite; }
        .mj-hint-arrow:last-child { animation-direction: reverse; }
        @keyframes mj-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50%       { transform: translateX(4px); opacity: 1; }
        }

        /* ═══ RESPONSIVE — vertical stack ═══ */
        @media (max-width: 900px) {
          .mj-section { padding: clamp(44px, 7vw, 72px) clamp(16px, 4vw, 28px); }
          .mj-scroll-area { overflow-x: visible; padding: 0; }
          .mj-track {
            width: 100% !important; height: auto !important;
            padding-left: 46px; position: relative;
          }
          .mj-wire { display: none; }
          .mj-track::before {
            content: ""; position: absolute; left: 21px; top: 0; bottom: 0;
            width: 3px;
            background: linear-gradient(180deg,
              rgba(107,21,48,0.9) 0%,
              rgba(214,176,92,0.95) 50%,
              rgba(214,176,92,1) 100%
            );
            border-radius: 2px; z-index: 1;
          }
          .mj-nodes { flex-direction: column; height: auto; }

          /* All nodes become vertical block */
          div[style*="position: absolute"][style*="height: ${TRACK_H}px"] {
            position: relative !important;
            left: auto !important; width: 100% !important;
            height: auto !important;
            padding: 10px 0 14px;
          }
          .mj-dot {
            position: absolute !important;
            left: -46px !important; top: 18px !important;
            width: 24px !important; height: 24px !important;
          }
          .mj-dot-ring { display: none !important; }
          .mj-stem { display: none !important; }
          .mj-month-pill { display: none; }
          .mj-year-label { display: none; }

          /* Cards reset to full width */
          .mj-card {
            position: relative !important;
            left: auto !important; top: auto !important; bottom: auto !important;
            transform: none !important;
            width: 100% !important; max-width: none !important;
            border-radius: 8px !important;
            border: 1px solid rgba(107,21,48,0.1) !important;
            border-top: 2.5px solid ${COLORS.burgundy} !important;
          }
          .mj-cert-card {
            border-top-color: ${COLORS.gold} !important;
            background: #0F0A12 !important;
          }
          .mj-card:hover, .mj-cert-card:hover {
            transform: translateY(-2px) !important;
          }
          .mj-tag { position: static; display: inline-block; margin-bottom: 6px; }
          .mj-hint { display: none; }
        }

        @media (max-width: 540px) {
          .mj-track { padding-left: 40px; }
          .mj-track::before { left: 17px; }
        }
      `}</style>
    </section>
  );
}
