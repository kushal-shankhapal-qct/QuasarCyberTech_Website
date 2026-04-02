import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS, TYPOGRAPHY } from "../config/themeConfig";

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
    title: "Strategic Collaboration Milestone",
    description:
      "Closed the year by strengthening the company ecosystem through early collaboration and market alignment.",
    tag: "Alliance",
  },
  {
    year: "2025",
    month: "Jan",
    title: "Bengaluru & Mumbai Expansion",
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
    title: "Indian Business Excellence Award",
    description:
      "Featured and recognized at the Indian Business Excellence Awards 2025.",
    tag: "Recognition",
  },
  {
    year: "2025",
    month: "Aug",
    title: "Enterprise Momentum",
    description:
      "Expanded enterprise reach through stronger market traction and deeper engagement opportunities.",
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

const chapterMeta: Record<
  string,
  { label: string; heading: string; summary: string }
> = {
  "2024": {
    label: "Phase 01",
    heading: "Foundation and first proof points.",
    summary:
      "The business was formed, operationally grounded, and quickly validated through recognition and early ecosystem movement.",
  },
  "2025": {
    label: "Phase 02",
    heading: "Scale, product build, and broader market presence.",
    summary:
      "Expansion accelerated across cities, platform development started, and the company began converting momentum into visible market signal.",
  },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function SignalCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      className="ms-signal-card"
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="ms-signal-card-glow" />
      <div className="ms-signal-topline">
        <div className="ms-signal-date">
          <span className="ms-signal-month">{milestone.month}</span>
          <span className="ms-signal-year">{milestone.year}</span>
        </div>
        <span className="ms-signal-tag">{milestone.tag}</span>
      </div>
      <h3 className="ms-signal-title">{milestone.title}</h3>
      <p className="ms-signal-description">{milestone.description}</p>
    </motion.article>
  );
}

function Chapter({
  year,
  items,
}: {
  year: string;
  items: (typeof milestones)[number][];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const chapter = chapterMeta[year];

  return (
    <motion.section
      ref={ref}
      className="ms-chapter"
      variants={reveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="ms-chapter-rail">
        <div className="ms-chapter-year">{year}</div>
        <div className="ms-chapter-copy">
          <div className="ms-chapter-label">{chapter?.label ?? "Phase"}</div>
          <h3 className="ms-chapter-heading">
            {chapter?.heading ?? "Key company milestones."}
          </h3>
          <p className="ms-chapter-summary">
            {chapter?.summary ?? "Important steps in the company journey."}
          </p>
        </div>
      </div>

      <div className="ms-chapter-board">
        {items.map((milestone, index) => (
          <SignalCard
            key={`${milestone.year}-${milestone.month}-${milestone.title}`}
            milestone={milestone}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function MilestonesJourney() {
  const groupedMilestones = useMemo(() => {
    return milestones.reduce<Record<string, (typeof milestones)[number][]>>(
      (accumulator, milestone) => {
        if (!accumulator[milestone.year]) {
          accumulator[milestone.year] = [];
        }

        accumulator[milestone.year].push(milestone);
        return accumulator;
      },
      {},
    );
  }, []);

  const years = Object.keys(groupedMilestones);

  return (
    <section className="ms-journey-section about-content-section">
      <div className="ms-noise" />
      <div className="ms-orb ms-orb-left" />
      <div className="ms-orb ms-orb-right" />

      <div className="ms-container">
        <motion.div
          className="ms-intro"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="ms-intro-copy">
            <div className="ms-kicker">Milestones Journey</div>
            <h2 className="ms-intro-title">
              The milestones that shaped{" "}
              <span className="ms-nowrap">QuasarCyberTech.</span>
            </h2>
            <p className="ms-intro-text">
              A focused view of the company’s foundation, expansion, platform
              development, and recognition.
            </p>
          </div>
        </motion.div>

        <div className="ms-chapters">
          {years.map((year) => (
            <Chapter key={year} year={year} items={groupedMilestones[year]} />
          ))}
        </div>
      </div>

      <style>{`
        .ms-journey-section {
          position: relative;
          overflow: hidden;
          padding: clamp(72px, 9vw, 128px) clamp(18px, 4vw, 48px);
          background:
            radial-gradient(circle at 12% 18%, rgba(107, 21, 48, 0.12), transparent 30%),
            radial-gradient(circle at 86% 12%, rgba(107, 21, 48, 0.08), transparent 26%),
            linear-gradient(180deg, #ffffff 0%, #f8f3f6 100%);
        }

        .ms-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(107, 21, 48, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 21, 48, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 62%, transparent 100%);
        }

        .ms-orb {
          position: absolute;
          width: 28rem;
          height: 28rem;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
          opacity: 0.28;
        }

        .ms-orb-left {
          top: -10rem;
          left: -12rem;
          background: rgba(107, 21, 48, 0.16);
        }

        .ms-orb-right {
          right: -8rem;
          bottom: -10rem;
          background: rgba(107, 21, 48, 0.18);
        }

        .ms-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ms-intro {
          display: block;
          margin-bottom: clamp(34px, 5vw, 56px);
        }

        .ms-intro-copy {
          position: relative;
          padding: clamp(28px, 4vw, 44px);
          border-radius: 32px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)),
            radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%);
          border: 1px solid rgba(214, 176, 92, 0.24);
          box-shadow: 0 24px 64px rgba(107, 21, 48, 0.22);
          overflow: hidden;
        }

        .ms-intro-copy::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 32px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(244, 216, 141, 0.64), rgba(214, 176, 92, 0.22), transparent 72%);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .ms-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          margin-bottom: 18px;
          background: rgba(255, 255, 255, 0.08);
          color: ${COLORS.gold};
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ms-intro-title {
          margin: 0 0 16px;
          max-width: 16ch;
          color: #fff4d1;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(2.1rem, 4.8vw, 4.1rem);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #fff3cd 0%, #d6b05c 50%, #f4d88d 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-wrap: balance;
        }

        .ms-intro-text {
          margin: 0;
          max-width: 58ch;
          color: rgba(255, 244, 222, 0.84);
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.75;
        }

        .ms-nowrap {
          white-space: nowrap;
        }

        .ms-chapters {
          display: grid;
          gap: 24px;
        }

        .ms-chapter {
          display: grid;
          grid-template-columns: minmax(240px, 290px) minmax(0, 1fr);
          gap: 24px;
          padding: clamp(18px, 2.5vw, 24px);
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(107, 21, 48, 0.12);
          box-shadow: 0 24px 58px rgba(107, 21, 48, 0.1);
          backdrop-filter: blur(10px);
        }

        .ms-chapter-rail {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          padding: 24px;
          background:
            radial-gradient(circle at 20% 20%, rgba(107, 21, 48, 0.08), transparent 34%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(245, 237, 241, 0.86));
          border: 1px solid rgba(107, 21, 48, 0.1);
          min-height: 100%;
        }

        .ms-chapter-year {
          position: absolute;
          right: 18px;
          top: 8px;
          color: rgba(107, 21, 48, 0.08);
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(4.5rem, 7vw, 6rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .ms-chapter-copy {
          position: relative;
          z-index: 1;
          max-width: 22ch;
        }

        .ms-chapter-label {
          display: inline-flex;
          padding: 7px 11px;
          border-radius: 999px;
          margin-bottom: 16px;
          background: rgba(214, 176, 92, 0.14);
          color: #8f6b18;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .ms-chapter-heading {
          margin: 0 0 12px;
          color: #180b10;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(1.45rem, 2vw, 1.85rem);
          line-height: 1.12;
        }

        .ms-chapter-summary {
          margin: 0;
          color: rgba(24, 11, 16, 0.7);
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 14px;
          line-height: 1.7;
        }

        .ms-chapter-board {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          align-content: start;
        }

        .ms-signal-card {
          position: relative;
          overflow: hidden;
          min-height: 210px;
          padding: 20px;
          border-radius: 24px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 242, 246, 0.94));
          border: 1px solid rgba(107, 21, 48, 0.1);
          box-shadow: 0 16px 34px rgba(107, 21, 48, 0.1);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          isolation: isolate;
        }

        .ms-signal-card:hover {
          transform: translateY(-4px) rotate(-0.4deg);
          box-shadow: 0 24px 42px rgba(107, 21, 48, 0.14);
          border-color: rgba(107, 21, 48, 0.18);
        }

        .ms-signal-card:nth-child(3n + 2) {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 236, 241, 0.94));
        }

        .ms-signal-card:nth-child(3n + 3) {
          background:
            linear-gradient(180deg, rgba(252, 248, 250, 0.98), rgba(239, 228, 233, 0.94));
        }

        .ms-signal-card-glow {
          position: absolute;
          width: 10rem;
          height: 10rem;
          right: -4rem;
          top: -4rem;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(214, 176, 92, 0.26), transparent 68%);
          pointer-events: none;
          z-index: -1;
        }

        .ms-signal-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .ms-signal-date {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
        }

        .ms-signal-month {
          color: #180b10;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: 1rem;
          font-weight: 700;
        }

        .ms-signal-year {
          color: rgba(24, 11, 16, 0.48);
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .ms-signal-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(214, 176, 92, 0.14);
          color: #8f6b18;
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ms-signal-title {
          margin: 0 0 10px;
          color: #180b10;
          font-family: ${TYPOGRAPHY.fontHeading};
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          line-height: 1.14;
          max-width: 18ch;
        }

        .ms-signal-description {
          margin: 0;
          color: rgba(24, 11, 16, 0.72);
          font-family: ${TYPOGRAPHY.fontBody};
          font-size: 14px;
          line-height: 1.72;
          max-width: 34ch;
        }

        @media (max-width: 980px) {
          .ms-intro-copy {
            padding: 28px;
          }

          .ms-chapter {
            grid-template-columns: 1fr;
          }

          .ms-intro-title {
            max-width: none;
            font-size: clamp(1.9rem, 5.8vw, 3rem);
          }

          .ms-chapter-copy {
            max-width: none;
          }
        }

        @media (max-width: 720px) {
          .ms-journey-section {
            padding: 56px 18px;
          }

          .ms-chapter-board {
            grid-template-columns: 1fr;
          }

          .ms-intro-copy,
          .ms-chapter,
          .ms-chapter-rail {
            border-radius: 24px;
          }

          .ms-intro-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
            line-height: 1.08;
            letter-spacing: -0.03em;
          }

          .ms-signal-card {
            min-height: auto;
            padding: 18px;
          }

          .ms-signal-topline {
            gap: 10px;
          }

          .ms-signal-description {
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .ms-intro-copy {
            padding: 22px 20px;
          }

          .ms-kicker {
            margin-bottom: 14px;
          }

          .ms-intro-title {
            font-size: 1.7rem;
          }

          .ms-intro-text,
          .ms-chapter-summary,
          .ms-signal-description {
            font-size: 13px;
            line-height: 1.65;
          }
        }
      `}</style>
    </section>
  );
}
