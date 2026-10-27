"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_STAR_SETTINGS,
  Starfield,
  type StarSettings,
} from "./Starfield";
import { Window } from "./Window";

const STORAGE_KEY = "star-settings";
const BAR_WIDTH = 10;

const CONTROLS: {
  key: keyof StarSettings;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}[] = [
  {
    key: "density",
    label: "Stars",
    min: 0.1,
    max: 10,
    step: 0.1,
    format: (v) => `${v.toFixed(1)}x`,
  },
  {
    key: "size",
    label: "Size",
    min: 0.5,
    max: 8,
    step: 0.1,
    format: (v) => `${v.toFixed(1)}x`,
  },
  {
    key: "speed",
    label: "Speed",
    min: 0,
    max: 4,
    step: 0.1,
    format: (v) => (v === 0 ? "FROZEN" : `${v.toFixed(1)}x`),
  },
  {
    key: "depth",
    label: "Twinkle",
    min: 0,
    max: 1,
    step: 0.05,
    format: (v) => `${Math.round(v * 100)}%`,
  },
  {
    key: "flicker",
    label: "Flicker",
    min: 0,
    max: 0.5,
    step: 0.01,
    format: (v) => `${Math.round(v * 200)}%`,
  },
  {
    key: "sparkle",
    label: "Sparkle",
    min: 0,
    max: 1,
    step: 0.05,
    format: (v) => (v === 0 ? "OFF" : `${Math.round(v * 100)}%`),
  },
];

/** The starfield background plus a DOS-style panel for tweaking it live. */
export function StarSky() {
  const [settings, setSettings] = useState(DEFAULT_STAR_SETTINGS);

  // Restore saved settings after mount (localStorage isn't available during the static build)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
        setSettings({ ...DEFAULT_STAR_SETTINGS, ...JSON.parse(saved) });
    } catch {
      // Corrupt or blocked storage: keep defaults
    }
  }, []);

  const update = (next: StarSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable: settings just won't persist
    }
  };

  return (
    <>
      <Starfield settings={settings} />

      {/* Hidden on phones, where it would cover most of the screen */}
      <div className="fixed right-4 bottom-12 z-50 hidden flex-col items-end gap-8 md:flex">
        <div className="w-[min(18.5rem,calc(100vw-2rem))]">
          <Window title="STARS.CFG" tone="gray" className="star-panel">
            <div className="space-y-2 pt-1 text-sm">
              {CONTROLS.map((c) => {
                const value = settings[c.key];
                const filled = Math.round(
                  ((value - c.min) / (c.max - c.min)) * BAR_WIDTH,
                );
                return (
                  <label
                    key={c.key}
                    className="grid grid-cols-[4.25rem_1fr_3.5rem] items-center gap-2"
                  >
                    <span>
                      <span className="text-[var(--dos-red)]">
                        {c.label[0]}
                      </span>
                      {c.label.slice(1)}
                    </span>
                    <span className="dos-slider relative">
                      <span aria-hidden>
                        [
                        <span className="text-[var(--dos-blue)]">
                          {"█".repeat(filled)}
                        </span>
                        {"░".repeat(BAR_WIDTH - filled)}]
                      </span>
                      <input
                        type="range"
                        min={c.min}
                        max={c.max}
                        step={c.step}
                        value={value}
                        onChange={(e) =>
                          update({
                            ...settings,
                            [c.key]: Number(e.target.value),
                          })
                        }
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </span>
                    <span className="text-right">{c.format(value)}</span>
                  </label>
                );
              })}
              <div className="flex justify-center gap-5 pt-5 pb-1">
                <button
                  type="button"
                  className="dos-btn bg-white"
                  onClick={() => update(DEFAULT_STAR_SETTINGS)}
                >
                  Reset
                </button>
              </div>
            </div>
          </Window>
        </div>
      </div>
    </>
  );
}
