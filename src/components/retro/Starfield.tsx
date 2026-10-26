"use client";

import { useEffect, useRef } from "react";

export type StarSettings = {
  /** Multiplier on star count. */
  density: number;
  /** Multiplier on star radius. */
  size: number;
  /** Multiplier on twinkle speed; 0 freezes the sky. */
  speed: number;
  /** 0 = steady light, 1 = stars fade nearly to black between flashes. */
  depth: number;
  /** Strength of the fast, irregular flicker layered on the slow wave. */
  flicker: number;
  /** 0 = no glints; higher = bright stars glint more often and longer. */
  sparkle: number;
};

export const DEFAULT_STAR_SETTINGS: StarSettings = {
  density: 3,
  size: 2.5,
  speed: 1,
  depth: 1,
  flicker: 0.15,
  sparkle: 0.25,
};

type Star = { x: number; y: number; r: number; big: boolean; base: number; speed: number; phase: number; color: string };

// Mostly white, with the occasional faintly blue or warm star
const COLORS = ["255,255,255", "255,255,255", "255,255,255", "200,220,255", "255,235,210"];

// At density 1, roughly one star per 2,500 px²
const PX_PER_STAR = 2500;

const makeStars = (w: number, h: number, density: number): Star[] =>
  Array.from({ length: Math.round(((w * h) / PX_PER_STAR) * density) }, () => {
    const big = Math.random() < 0.04;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: big ? 0.9 + Math.random() * 0.5 : 0.25 + Math.random() * 0.5,
      big,
      base: big ? 0.8 : 0.2 + Math.random() * 0.55,
      speed: 0.8 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

/** A fixed, full-screen field of tiny twinkling stars. Settings apply live without restarting. */
export function Starfield({ settings }: { settings: StarSettings }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  const starsRef = useRef<Star[]>([]);
  const regenerateRef = useRef<() => void>(() => {});
  const drawRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    // Accumulated animation time, so changing speed doesn't make every star jump
    let clock = 0;
    let last = performance.now();

    const draw = () => {
      const { size, depth, flicker, sparkle } = settingsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of starsRef.current) {
        // A slow wave plus a faster flicker, squared so stars dip near-dark and flash at the peak
        const wave = Math.max(
          0,
          Math.min(
            1,
            0.5 + (0.5 - flicker) * Math.sin(clock * s.speed + s.phase) + flicker * Math.sin(clock * s.speed * 3.7 + s.phase * 2),
          ),
        );
        const twinkle = still ? 1 : 1 - depth + depth * wave * wave;
        const alpha = Math.min(1, s.base * twinkle * 1.4);
        const r = s.r * size;
        ctx.fillStyle = `rgba(${s.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Bright stars throw a small cross-shaped glint at the top of their twinkle
        const threshold = 1 - sparkle;
        if (!still && s.big && sparkle > 0 && twinkle > threshold) {
          const len = r * 6 * ((twinkle - threshold) / sparkle);
          ctx.strokeStyle = `rgba(${s.color},${alpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y);
          ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len);
          ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = makeStars(window.innerWidth, window.innerHeight, settingsRef.current.density);
      draw();
    };

    const loop = (now: number) => {
      clock += ((now - last) / 1000) * settingsRef.current.speed;
      last = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    regenerateRef.current = resize;
    drawRef.current = draw;
    resize();
    window.addEventListener("resize", resize);
    if (!still) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Pick up new settings. Star count changes need a fresh set of stars; anything else just
  // needs a redraw, which matters when the animation loop is off (reduced motion).
  useEffect(() => {
    const densityChanged = settingsRef.current.density !== settings.density;
    settingsRef.current = settings;
    if (densityChanged) regenerateRef.current();
    else drawRef.current();
  }, [settings]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
