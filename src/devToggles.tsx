import React, { createContext, useContext, useState, type ReactNode } from 'react';

// ─── DEV TOGGLES ─────────────────────────────────────────
// Delete this file and all references when done iterating.

export type CapabilitiesHeroVariant = 'orbital' | 'staggered' | 'vortex';
export type CardHoverVariant = 'flip' | 'slideup';

export const DEFAULT_DEV_TOGGLES = {
  capabilitiesHeroVariant: 'vortex' as CapabilitiesHeroVariant,
  cardHoverVariant: 'slideup' as CardHoverVariant,
};

type DevToggleState = typeof DEFAULT_DEV_TOGGLES;

interface DevToggleContextProps {
  toggles: DevToggleState;
  updateToggle: (key: keyof DevToggleState, value: any) => void;
}

const DevToggleContext = createContext<DevToggleContextProps>({
  toggles: DEFAULT_DEV_TOGGLES,
  updateToggle: () => {},
});

const STORAGE_KEY = 'qct_dev_toggles_state';

export const DevToggleProvider = ({ children }: { children: ReactNode }) => {
  const [toggles, setToggles] = useState<DevToggleState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_DEV_TOGGLES;
  });

  const updateToggle = (key: keyof DevToggleState, value: any) => {
    setToggles(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <DevToggleContext.Provider value={{ toggles, updateToggle }}>
      {children}
    </DevToggleContext.Provider>
  );
};

export const useDevToggles = () => useContext(DevToggleContext);

// Backwards compatibility export just in case
export const DEV_TOGGLES = DEFAULT_DEV_TOGGLES;
