import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleArrowUp } from 'lucide-react';
import { scrollToTarget } from '@/utils/scrollToTarget';
import { COLORS, TYPOGRAPHY } from '../config/themeConfig';

const NAVBAR_VAR = '--qct-navbar-bottom';

type RGBA = { r: number; g: number; b: number; a: number };

const getNavbarBottom = (): number => {
  if (typeof window === 'undefined') return 0;
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(NAVBAR_VAR)
    .trim();
  const parsed = Number.parseFloat(raw.replace('px', ''));
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

const parseCssColor = (value: string): RGBA | null => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(',').map((p) => p.trim());
  if (parts.length < 3) return null;
  const r = Number.parseFloat(parts[0]);
  const g = Number.parseFloat(parts[1]);
  const b = Number.parseFloat(parts[2]);
  const a = parts[3] !== undefined ? Number.parseFloat(parts[3]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
};

const parseCssColors = (value: string): RGBA[] => {
  const matches = value.match(/rgba?\(([^)]+)\)/gi) || [];
  return matches
    .map((entry) => parseCssColor(entry))
    .filter((entry): entry is RGBA => Boolean(entry));
};

const luminance = ({ r, g, b }: RGBA): number =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

const averageColor = (colors: RGBA[]): RGBA | null => {
  if (!colors.length) return null;
  const total = colors.reduce(
    (acc, c) => ({
      r: acc.r + c.r,
      g: acc.g + c.g,
      b: acc.b + c.b,
      a: acc.a + c.a,
    }),
    { r: 0, g: 0, b: 0, a: 0 },
  );
  return {
    r: total.r / colors.length,
    g: total.g / colors.length,
    b: total.b / colors.length,
    a: total.a / colors.length,
  };
};

const isParentSurfaceElement = (el: HTMLElement): boolean => {
  const tag = el.tagName.toLowerCase();
  if (tag === 'section' || tag === 'main' || tag === 'body' || tag === 'html') {
    return true;
  }

  const className = String(el.className || '');
  return /(^|\s)(.*section.*|.*page.*|.*layout.*|.*content.*)(\s|$)/i.test(className);
};

const getBackgroundAtViewportPoint = (x: number, y: number): RGBA | null => {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;
  while (el) {
    if (el.classList.contains('qct-back-to-top')) {
      el = el.parentElement;
      continue;
    }

    if (!isParentSurfaceElement(el)) {
      el = el.parentElement;
      continue;
    }

    const styles = window.getComputedStyle(el);
    const bg = parseCssColor(styles.backgroundColor || '');
    if (bg && bg.a > 0.02) return bg;

    const gradientColors = parseCssColors(styles.backgroundImage || '');
    const gradientAvg = averageColor(gradientColors);
    if (gradientAvg && gradientAvg.a > 0.02) return gradientAvg;

    el = el.parentElement;
  }

  const bodyBg = parseCssColor(window.getComputedStyle(document.body).backgroundColor || '');
  return bodyBg;
};

const BackToTopButton: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkSurface, setIsDarkSurface] = useState(false);
  const [showHoverLabel, setShowHoverLabel] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);

  const handleHoverStart = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = window.setTimeout(() => {
      setShowHoverLabel(true);
    }, 1000);
  };

  const handleHoverEnd = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowHoverLabel(false);
  };

  useEffect(() => {
    const resolveHero = () => {
      heroRef.current = document.querySelector('.page-hero-section') as HTMLElement | null;
    };

    const updateVisibility = () => {
      const hero = heroRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const threshold = getNavbarBottom() + 6;
        setIsVisible(rect.bottom <= threshold);
      } else {
        setIsVisible(window.scrollY > window.innerHeight * 0.7);
      }

      // Sample the surface under the button area so icon color adapts to dark/light sections.
      const sampleX = Math.max(24, window.innerWidth - 120);
      const sampleY = Math.max(24, window.innerHeight - 120);
      const sampled = getBackgroundAtViewportPoint(sampleX, sampleY);
      if (sampled) {
        setIsDarkSurface(luminance(sampled) < 0.5);
      }
    };

    const refresh = () => {
      resolveHero();
      updateVisibility();
    };

    refresh();

    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 400);

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setShowHoverLabel(false);
    }
  }, [isVisible]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .qct-back-to-top-wrap {
              --qct-back-top-button-size: 2.5rem;
              --qct-back-top-label-height: 2.5rem;
              --qct-back-top-label-padding-x: 0.65rem;
              --qct-back-top-label-font-size: 0.76rem;
              --qct-back-top-icon-size: 18px;
              --qct-back-top-gap: 0.3rem;
              position: fixed;
              right: var(--page-padding-x);
              bottom: clamp(1.5rem, 3vw, 3rem);
              z-index: 65;
            }
            .qct-back-to-top-label {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: var(--qct-back-top-label-height);
              padding: 0 var(--qct-back-top-label-padding-x);
              white-space: nowrap;
              font-size: var(--qct-back-top-label-font-size);
              font-weight: 700;
              letter-spacing: 0.02em;
              border-radius: 0 0 0.25rem 0.25rem;
            }
            @media (max-width: 768px) {
              .qct-back-to-top-wrap {
                --qct-back-top-button-size: 2.35rem;
                --qct-back-top-icon-size: 17px;
                right: max(1.5rem, var(--page-padding-x));
                bottom: 1.5rem;
              }
              .qct-back-to-top-label {
                display: none;
              }
            }
          `,
        }}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="qct-back-to-top-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--qct-back-top-gap)',
            }}
          >
            <AnimatePresence>
              {showHoverLabel && (
                <motion.span
                  className="qct-back-to-top-label"
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: isDarkSurface
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(107,21,48,0.96)',
                    color: isDarkSurface ? COLORS.burgundy : '#FFFFFF',
                    border: isDarkSurface
                      ? '1px solid rgba(255,255,255,0.75)'
                      : '1px solid rgba(107,21,48,0.55)',
                    boxShadow: '0 8px 20px rgba(11,31,59,0.16)',
                    fontFamily: TYPOGRAPHY.fontBody,
                  }}
                >
                  Back to top
                </motion.span>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() =>
                scrollToTarget({
                  targetId: 'qct-page-top',
                  method: 'motion',
                  extraOffsetPx: 0,
                })
              }
              whileTap={{ scale: 0.98 }}
              style={{
                width: 'var(--qct-back-top-button-size)',
                height: 'var(--qct-back-top-button-size)',
                borderRadius: '0 0 0.25rem 0.25rem',
                border: isDarkSurface
                  ? '1px solid rgba(255,255,255,0.75)'
                  : '1px solid rgba(107,21,48,0.55)',
                background: isDarkSurface
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(107,21,48,0.96)',
                color: isDarkSurface ? COLORS.burgundy : '#FFFFFF',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(11,31,59,0.16)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                fontFamily: TYPOGRAPHY.fontBody,
              }}
            >
              <CircleArrowUp
                strokeWidth={2.2}
                style={{
                  width: 'var(--qct-back-top-icon-size)',
                  height: 'var(--qct-back-top-icon-size)',
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackToTopButton;
