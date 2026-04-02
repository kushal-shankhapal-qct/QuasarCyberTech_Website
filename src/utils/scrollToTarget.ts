import { animate } from 'framer-motion';

export type ScrollMethod = 'native' | 'motion' | 'react' | 'html' | 'gsap';

interface ScrollToTargetOptions {
  targetId: string;
  method?: ScrollMethod;
  extraOffsetPx?: number;
  durationMs?: number;
}

const getNavbarBottom = (): number => {
  if (typeof window === 'undefined') return 0;
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--qct-navbar-bottom')
    .trim();
  const parsed = Number.parseFloat(raw.replace('px', ''));
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

const getTargetTop = (el: HTMLElement, extraOffsetPx: number): number => {
  const navbarBottom = getNavbarBottom();
  return Math.max(
    0,
    window.scrollY + el.getBoundingClientRect().top - navbarBottom - extraOffsetPx,
  );
};

const scrollReactRaf = (to: number, durationMs: number): void => {
  const from = window.scrollY;
  const distance = to - from;
  if (Math.abs(distance) < 1) return;

  const start = performance.now();
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / durationMs);
    const eased = easeInOutCubic(progress);
    window.scrollTo({ top: from + distance * eased, behavior: 'instant' });
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const scrollMotion = (to: number, durationMs: number): void => {
  animate(window.scrollY, to, {
    duration: durationMs / 1000,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (value) => {
      window.scrollTo({ top: Number(value), behavior: 'instant' });
    },
  });
};

const scrollHtml = (target: HTMLElement, offsetPx: number): void => {
  const previousMargin = target.style.scrollMarginTop;
  target.style.scrollMarginTop = `${Math.ceil(getNavbarBottom() + offsetPx)}px`;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => {
    target.style.scrollMarginTop = previousMargin;
  }, 900);
};

const scrollGsap = (to: number): boolean => {
  const g = (
    window as unknown as {
      gsap?: {
        to?: (
          target: Window,
          options: {
            duration: number;
            scrollTo: { y: number; autoKill: boolean };
            overwrite: string;
            ease: string;
          },
        ) => void;
      };
    }
  ).gsap;
  if (!g?.to) return false;

  try {
    g.to(window, {
      duration: 0.85,
      scrollTo: { y: to, autoKill: true },
      overwrite: 'auto',
      ease: 'power3.out',
    });
    return true;
  } catch {
    return false;
  }
};

export const scrollToTarget = ({
  targetId,
  method = 'native',
  extraOffsetPx = 20,
  durationMs = 700,
}: ScrollToTargetOptions): void => {
  if (typeof window === 'undefined') return;
  const target = document.getElementById(targetId);
  if (!target) return;

  const run = () => {
    const top = getTargetTop(target, extraOffsetPx);
    if (method === 'html') {
      scrollHtml(target, extraOffsetPx);
      return;
    }

    if (method === 'motion') {
      scrollMotion(top, durationMs);
      return;
    }

    if (method === 'react') {
      scrollReactRaf(top, durationMs);
      return;
    }

    if (method === 'gsap') {
      const usedGsap = scrollGsap(top);
      if (!usedGsap) {
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    window.scrollTo({ top, behavior: 'smooth' });
  };

  run();

  // Navbar height can settle a moment later; this second pass prevents underlap.
  window.setTimeout(run, 260);
};
