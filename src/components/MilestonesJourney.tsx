import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from "../config/themeConfig";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const milestones = [
  {
    year: "2024",
    month: "Jul",
    title: "Incorporation",
    description:
      "QCTPL was incorporated, marking the beginning of our cybersecurity journey.",
    tag: "Foundation",
  },
  {
    year: "2024",
    month: "Oct",
    title: "Nashik Office Launch",
    description: "Established our first operational headquarters in Nashik.",
    tag: "Presence",
  },
  {
    year: "2024",
    month: "Nov",
    title: "Startup India Recognition",
    description:
      "Recognized under the Startup India initiative, validating our innovation approach.",
    tag: "Recognition",
  },
  {
    year: "2024",
    month: "Dec",
    title: "Strategic Collaboration",
    description:
      "Closed the year by strengthening the company ecosystem through early collaboration and market alignment.",
    tag: "Alliance",
  },
  {
    year: "2025",
    month: "Jan",
    title: "Bengaluru & Mumbai",
    description:
      "Strengthened national presence with new offices in two major cities.",
    tag: "Expansion",
  },
  {
    year: "2025",
    month: "Jan",
    title: "NASSCOM Membership",
    description: "Joined India's leading tech industry body, NASSCOM.",
    tag: "Credibility",
  },
  {
    year: "2025",
    month: "Jun",
    title: "QStellar Development",
    description:
      "Initiated development of our flagship AI-powered asset intelligence platform.",
    tag: "Platform",
  },
  {
    year: "2025",
    month: "Aug",
    title: "Business Excellence Award",
    description:
      "Featured and recognized at the Indian Business Excellence Awards 2025.",
    tag: "Recognition",
  },
  {
    year: "2025",
    month: "Aug",
    title: "Enterprise Momentum",
    description:
      "Expanded enterprise reach through stronger market traction and deeper engagement.",
    tag: "Growth",
  },
  {
    year: "2025",
    month: "Aug",
    title: "Global Expansion",
    description: "Established international presence in Dallas, USA.",
    tag: "Global",
  },
  {
    year: "2025",
    month: "Sep",
    title: "Emerging Company of the Year",
    description:
      "Recognized by Business Connect Magazine as Emerging Company of the Year 2025.",
    tag: "Recognition",
  },
];

/* ═══════════════════════════════════════════════
   NODE COMPONENT
   ═══════════════════════════════════════════════ */

function MilestoneNode({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isTop = index % 2 === 0;
  const isYearStart =
    index === 0 || milestone.year !== milestones[index - 1]?.year;
  const d = Math.min(index * 0.065, 0.5);

  return (
    <div ref={ref} className={`mj-node mj-node--${isTop ? "top" : "bot"}`}>
      {/* ── Circle on the wire ── */}
      <motion.div
        className="mj-dot-wrap"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 0.35,
          delay: d,
          type: "spring",
          stiffness: 320,
          damping: 18,
        }}
      >
        <div className={`mj-dot ${isYearStart ? "mj-dot--year" : ""}`}>
          <div className="mj-dot-core" />
        </div>
        <div className="mj-dot-ring" style={{ animationDelay: `${d}s` }} />
        {isYearStart && <span className="mj-dot-year">{milestone.year}</span>}
      </motion.div>

      {/* ── Connector arm ── */}
      <motion.div
        className="mj-stem"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{
          duration: 0.35,
          delay: d + 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* ── Card ── */}
      <motion.div
        className="mj-card"
        initial={{ opacity: 0, y: isTop ? 24 : -24, scale: 0.94 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.55,
          delay: d + 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="mj-card-glow" />
        <div className="mj-card-meta">
          {isYearStart && (
            <span className="mj-card-date">{milestone.year}</span>
          )}
          <span className="mj-card-tag">{milestone.tag}</span>
        </div>
        <h4 className="mj-card-title">{milestone.title}</h4>
        <p className="mj-card-desc">{milestone.description}</p>
        <div className="mj-card-bar" />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */

export default function MilestonesJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smoothProg = useSpring(progress, { stiffness: 90, damping: 24 });

  useEffect(() => {
    const scrollEl = scrollAreaRef.current;
    if (!scrollEl) return;

    const updateProgress = () => {
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
      progress.set(maxScrollLeft > 0 ? scrollEl.scrollLeft / maxScrollLeft : 1);
    };

    updateProgress();
    scrollEl.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      scrollEl.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [progress]);

  /* Build the horizontal wavy SVG path */
  const NODE_W = 210; // px per node slot
  const totalW = milestones.length * NODE_W;
  const pathD = (() => {
    const pts: string[] = [];
    for (let i = 0; i < milestones.length; i++) {
      const x = i * NODE_W + NODE_W / 2;
      const y = 60; // center line
      if (i === 0) {
        pts.push(`M 0,${y}`);
        pts.push(
          `C ${x / 2},${i % 2 === 0 ? 30 : 90} ${x / 2},${i % 2 === 0 ? 30 : 90} ${x},${y}`,
        );
      } else {
        const prevX = (i - 1) * NODE_W + NODE_W / 2;
        const cpY = i % 2 === 0 ? 25 : 95;
        pts.push(
          `C ${prevX + NODE_W * 0.35},${cpY} ${x - NODE_W * 0.35},${cpY} ${x},${y}`,
        );
      }
    }
    // trailing tail
    pts.push(`C ${totalW - NODE_W * 0.3},40 ${totalW},50 ${totalW + 40},60`);
    return pts.join(" ");
  })();

  return (
    <section ref={sectionRef} className="mj-section about-content-section">
      {/* BG */}
      <div className="mj-bg-grid" />
      <div className="mj-bg-orb mj-bg-orb--a" />
      <div className="mj-bg-orb mj-bg-orb--b" />

      {/* ── Header ── */}
      <div className="mj-header">
        <motion.div
          className="mj-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mj-ey-dash" />
          <span>Our Journey</span>
          <span className="mj-ey-dash" />
        </motion.div>
        <motion.h2
          className="mj-h2"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          The Path That <em>Built</em> Us
        </motion.h2>
        <motion.p
          className="mj-sub"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          From incorporation to global presence — every milestone connected on a
          single unbroken thread.
        </motion.p>
      </div>

      {/* ── Horizontal scrollable track ── */}
      <div ref={scrollAreaRef} className="mj-scroll-area">
        <div className="mj-track" style={{ width: `${totalW + 80}px` }}>
          {/* SVG wire running through all nodes */}
          <svg
            className="mj-wire"
            viewBox={`0 0 ${totalW + 80} 120`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mj-wg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={COLORS.burgundy} />
                <stop offset="30%" stopColor={COLORS.gold} />
                <stop offset="60%" stopColor={COLORS.burgundy} />
                <stop offset="100%" stopColor={COLORS.gold} />
              </linearGradient>
            </defs>
            {/* Shadow track */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(107,21,48,0.08)"
              strokeWidth="3"
              strokeDasharray="8 5"
            />
            {/* Animated main wire */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#mj-wg)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: smoothProg }}
            />
          </svg>

          {/* Nodes */}
          <div className="mj-nodes">
            {milestones.map((m, i) => (
              <MilestoneNode
                key={`${m.year}-${m.month}-${m.title}`}
                milestone={m}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="mj-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <span className="mj-hint-arrow">←</span>
        <span>Scroll to explore</span>
        <span className="mj-hint-arrow">→</span>
      </motion.div>

      {/* Terminal */}
      <motion.div
        className="mj-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mj-end-dot" />
        <span>The journey continues →</span>
      </motion.div>

      {/* ═══════════════════════════════════════
         STYLES
         ═══════════════════════════════════════ */}
      <style>{`

        /* ── Section ── */
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

        /* ── Header ── */
        .mj-header {
          text-align: center; position: relative; z-index: 2;
          margin-bottom: clamp(24px, 3vw, 36px);
          padding: 0 clamp(16px, 4vw, 48px);
        }
        .mj-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 14px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 11px; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; color: #9a7a30;
        }
        .mj-ey-dash { display: block; width: 26px; height: 1.5px; background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent); }
        .mj-h2 {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(28px, 4.2vw, 46px); font-weight: 800;
          color: #1A0A0F; line-height: 1.08; margin: 0 0 12px;
        }
        .mj-h2 em { color: ${COLORS.burgundy}; font-style: italic; }
        .mj-sub {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: clamp(13px, 1.3vw, 16px); color: #6b5760;
          line-height: 1.7; max-width: 480px; margin: 0 auto;
        }

        /* ── Scroll area ── */
        .mj-scroll-area {
          overflow-x: auto; overflow-y: visible;
          padding: 0 clamp(16px, 3vw, 48px) 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(107,21,48,0.16) transparent;
          position: relative; z-index: 2;
          overscroll-behavior-x: contain;
          scroll-behavior: smooth;
        }
        .mj-scroll-area::-webkit-scrollbar { height: 5px; }
        .mj-scroll-area::-webkit-scrollbar-thumb { background: rgba(107,21,48,0.16); border-radius: 3px; }
        .mj-scroll-area::-webkit-scrollbar-track { background: transparent; }

        .mj-track {
          position: relative;
          min-height: clamp(360px, 52vh, 460px);
        }

        /* ── SVG wire ── */
        .mj-wire {
          position: absolute;
          left: 0; top: 50%;
          width: 100%; height: 120px;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Nodes row ── */
        .mj-nodes {
          display: flex;
          position: relative; z-index: 3;
          height: 100%;
        }

        /* ── Individual node ── */
        .mj-node {
          flex: 0 0 210px;
          height: clamp(360px, 52vh, 460px);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Dot (circle on the wire) ── */
        .mj-dot-wrap {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 6;
        }
        .mj-dot {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, ${COLORS.burgundy}, #922040);
          display: flex; align-items: center; justify-content: center;
          border: 3.5px solid #faf7f4;
          box-shadow: 0 3px 14px rgba(107,21,48,0.28);
          position: relative; z-index: 3;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .mj-node:hover .mj-dot {
          transform: scale(1.15);
          box-shadow: 0 4px 20px rgba(107,21,48,0.4);
        }
        .mj-dot--year {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, ${COLORS.gold}, #c9a23e);
          box-shadow: 0 3px 16px rgba(214,176,92,0.4);
        }
        .mj-dot-core {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${COLORS.gold};
        }
        .mj-dot--year .mj-dot-core {
          background: #fff;
        }
        .mj-dot-ring {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid rgba(107,21,48,0.35);
          animation: mj-ring 2.8s ease-out infinite;
          z-index: 2;
        }
        @keyframes mj-ring {
          0% { opacity: 0.5; width: 30px; height: 30px; }
          100% { opacity: 0; width: 60px; height: 60px; }
        }

        .mj-dot-year {
          position: absolute;
          white-space: nowrap;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 11px; font-weight: 800; letter-spacing: 0.04em;
          color: #fff;
          background: ${COLORS.burgundy};
          padding: 3px 10px; border-radius: 20px;
          box-shadow: 0 2px 8px rgba(107,21,48,0.25);
        }
        .mj-node--top .mj-dot-year {
          top: calc(100% + 8px);
        }
        .mj-node--bot .mj-dot-year {
          bottom: calc(100% + 8px);
        }

        /* ── Stem (connector arm) ── */
        .mj-stem {
          position: absolute;
          left: 50%; width: 2px;
          background: linear-gradient(180deg, rgba(107,21,48,0.28), rgba(214,176,92,0.5));
          z-index: 2;
          border-radius: 1px;
        }
        .mj-node--top .mj-stem {
          bottom: 50%; top: 126px;
          transform-origin: bottom center;
        }
        .mj-node--bot .mj-stem {
          top: 50%; bottom: 126px;
          transform-origin: top center;
        }

        /* ── Card ── */
        .mj-card {
          position: absolute; left: 50%;
          transform: translateX(-50%);
          width: 184px; z-index: 5;
        }
        .mj-node--top .mj-card { top: 8px; }
        .mj-node--bot .mj-card { bottom: 8px; }

        .mj-card {
          background: #fff;
          border: 1px solid rgba(107,21,48,0.09);
          border-radius: 10px;
          padding: 13px 13px;
          position: absolute;
          overflow: hidden;
          transition: transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease;
          cursor: default;
        }
        .mj-card:hover {
          transform: translateX(-50%) translateY(-3px);
          box-shadow: 0 14px 40px rgba(107,21,48,0.12);
          border-color: rgba(107,21,48,0.16);
        }
        .mj-node--bot .mj-card:hover {
          transform: translateX(-50%) translateY(3px);
        }
        .mj-card::before {
          content: ""; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${COLORS.burgundy}, ${COLORS.gold});
          opacity: 0; transition: opacity 0.25s;
        }
        .mj-card:hover::before { opacity: 1; }

        .mj-card-glow {
          position: absolute; width: 70px; height: 70px;
          top: -28px; right: -28px; border-radius: 50%;
          background: radial-gradient(circle, rgba(214,176,92,0.14), transparent 68%);
          pointer-events: none;
        }

        .mj-card-meta {
          display: flex; align-items: center; justify-content: space-between;
          gap: 6px; margin-bottom: 8px; flex-wrap: wrap;
        }
        .mj-card-date {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(26,10,15,0.4);
        }
        .mj-card-tag {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #8f6b18;
          background: rgba(214,176,92,0.12);
          padding: 2px 7px; border-radius: 20px;
        }
        .mj-card-title {
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 13px; font-weight: 700;
          color: #1a0a0f; line-height: 1.22; margin: 0 0 6px;
        }
        .mj-card-desc {
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 10.5px; color: rgba(26,10,15,0.58);
          line-height: 1.45; margin: 0;
        }
        .mj-card-bar {
          margin-top: 9px; height: 2px; width: 28px; border-radius: 1px;
          background: linear-gradient(90deg, ${COLORS.gold}, transparent);
        }

        /* ── Hint ── */
        .mj-hint {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-top: 12px;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 12px; font-weight: 500; color: rgba(107,21,48,0.35);
          letter-spacing: 0.08em;
        }
        .mj-hint-arrow { font-size: 14px; animation: mj-nudge 1.6s ease-in-out infinite; }
        .mj-hint-arrow:last-child { animation-direction: reverse; }
        @keyframes mj-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(4px); opacity: 1; }
        }

        /* ── Terminal ── */
        .mj-end {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-top: clamp(16px, 2vw, 24px);
          position: relative; z-index: 3;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          color: #9a7a30; text-transform: uppercase;
        }
        .mj-end-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${COLORS.gold};
          box-shadow: 0 0 12px rgba(214,176,92,0.5);
          animation: mj-glow 2s ease-in-out infinite alternate;
        }
        @keyframes mj-glow {
          from { box-shadow: 0 0 6px rgba(214,176,92,0.35); }
          to { box-shadow: 0 0 18px rgba(214,176,92,0.7); }
        }


        /* ═══════════════════════════════════════
           RESPONSIVE — VERTICAL TIMELINE
           ═══════════════════════════════════════ */

        @media (max-width: 900px) {

          .mj-section {
            padding: clamp(44px, 7vw, 72px) clamp(16px, 4vw, 28px);
          }

          .mj-scroll-area {
            overflow-x: visible;
            padding: 0;
          }

          .mj-track {
            width: 100% !important;
            min-height: auto;
            padding-left: 46px;
            position: relative;
          }

          /* Vertical wire replaces SVG */
          .mj-wire { display: none; }

          .mj-track::before {
            content: "";
            position: absolute;
            left: 21px; top: 0; bottom: 0;
            width: 3px;
            background: linear-gradient(
              180deg,
              rgba(107,21,48,0.92) 0%,
              rgba(214,176,92,0.95) 42%,
              rgba(107,21,48,0.9) 100%
            );
            border-radius: 2px;
            z-index: 1;
            box-shadow: 0 0 0 6px rgba(214,176,92,0.05);
          }

          .mj-nodes {
            flex-direction: column;
            height: auto;
          }

          .mj-node {
            flex: none;
            width: 100%;
            height: auto;
            flex-direction: row;
            align-items: flex-start;
            padding: 12px 0 16px;
          }

          /* Dot goes to the left rail */
          .mj-dot-wrap {
            position: absolute;
            left: -46px; top: 18px;
            transform: none;
          }
          .mj-dot {
            width: 24px; height: 24px;
            border-width: 3px;
            box-shadow: 0 8px 18px rgba(107,21,48,0.18);
          }
          .mj-dot--year {
            width: 30px; height: 30px;
            box-shadow: 0 10px 22px rgba(214,176,92,0.28);
          }
          .mj-dot-core { width: 6px; height: 6px; }
          .mj-dot-ring { display: none; }

          .mj-dot-year {
            display: none;
          }

          /* Hide stem */
          .mj-stem { display: none; }

          /* Card flows naturally */
          .mj-card {
            position: relative !important;
            left: auto !important; top: auto !important; bottom: auto !important;
            transform: none !important;
            width: 100%; max-width: none;
            padding: 16px 16px 15px;
            border-radius: 16px;
            border: 1px solid rgba(107,21,48,0.1);
            background:
              linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,252,248,0.98));
            box-shadow:
              0 18px 36px rgba(107,21,48,0.08),
              0 3px 10px rgba(214,176,92,0.08);
          }
          .mj-card:hover {
            transform: translateY(-2px) !important;
          }
          .mj-node--bot .mj-card:hover {
            transform: translateY(-2px) !important;
          }

          .mj-card::before {
            opacity: 1;
            height: 4px;
          }

          .mj-card-glow {
            width: 110px; height: 110px;
            top: -42px; right: -26px;
            background: radial-gradient(circle, rgba(214,176,92,0.18), transparent 70%);
          }

          .mj-card-meta {
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 10px;
          }
          .mj-card-date {
            font-size: 11px;
            letter-spacing: 0.18em;
            color: rgba(107,21,48,0.78);
            background: rgba(107,21,48,0.08);
            padding: 6px 10px;
            border-radius: 999px;
          }
          .mj-card-tag {
            font-size: 10px;
            letter-spacing: 0.12em;
            padding: 6px 10px;
            background: rgba(214,176,92,0.16);
          }
          .mj-card-title { font-size: 14px; }
          .mj-card-desc {
            font-size: 12px;
            line-height: 1.6;
            color: rgba(26,10,15,0.66);
          }
          .mj-card-bar {
            margin-top: 12px;
            width: 36px;
          }

          .mj-hint { display: none; }
        }

        @media (max-width: 540px) {
          .mj-track { padding-left: 40px; }
          .mj-track::before { left: 17px; }
          .mj-dot-wrap { left: -40px; }
          .mj-dot { width: 22px; height: 22px; }
          .mj-dot--year { width: 28px; height: 28px; }
          .mj-card {
            padding: 14px 14px 13px;
            border-radius: 14px;
          }
          .mj-card-meta {
            gap: 8px;
            margin-bottom: 9px;
          }
          .mj-card-date,
          .mj-card-tag {
            font-size: 9px;
            padding: 5px 9px;
          }
          .mj-card-title {
            font-size: 13px;
            line-height: 1.28;
          }
          .mj-card-desc { font-size: 11px; line-height: 1.55; }
        }

      `}</style>
    </section>
  );
}
