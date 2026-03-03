import React, { useState, useEffect } from 'react';
import { themeConfig } from '../config/themeConfig';

export default function ThemeToggle() {
    const [activeTheme, setActiveTheme] = useState(themeConfig.activeTheme);

    const themes = Object.keys(themeConfig.themes);

    const toggleTheme = (themeName: string) => {
        setActiveTheme(themeName);
        const themeVars = themeConfig.themes[themeName as keyof typeof themeConfig.themes];
        Object.entries(themeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value as string);
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[999] bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-black/5 flex gap-1">
            {themes.map((theme) => (
                <button
                    key={theme}
                    onClick={() => toggleTheme(theme)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTheme === theme
                            ? 'bg-[#7A0F2A] text-white shadow-lg'
                            : 'text-slate-500 hover:bg-black/5'
                        }`}
                >
                    {theme}
                </button>
            ))}
        </div>
    );
}
