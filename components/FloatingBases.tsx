"use client";

import { useEffect, useRef } from "react";

/**
 * Large DNA / RNA bases (A, T, C, G, U) drifting slowly across the background.
 * Some appear paired (A-T, C-G, A-U) connected by a faint hydrogen-bond rule.
 * Reads --ink and --accent at draw time so it adapts to the active theme.
 *
 * Pauses off-screen, caps at 30 FPS, honors prefers-reduced-motion.
 */
export default function FloatingBases({
  className = "",
  density = 1,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d", { alpha: true });
    if (!ctx2d) return;
    const c = canvas;
    const ctx = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Base = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      char: string;
      pair?: string;
      rot: number;
      vrot: number;
    };

    const PAIRS: [string, string][] = [
      ["A", "T"],
      ["T", "A"],
      ["C", "G"],
      ["G", "C"],
      ["A", "U"],
      ["U", "A"],
      ["G", "U"], // wobble
    ];

    let width = 0;
    let height = 0;
    let bases: Base[] = [];

    function spawn(): Base {
      const [a, b] = PAIRS[Math.floor(Math.random() * PAIRS.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: 70 + Math.random() * 90,
        char: a,
        pair: Math.random() < 0.55 ? b : undefined,
        rot: (Math.random() - 0.5) * 0.4,
        vrot: (Math.random() - 0.5) * 0.001,
      };
    }

    function resize() {
      const rect = c.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      c.width = Math.max(1, Math.floor(width * dpr));
      c.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(
        6,
        Math.floor((width * height) / 70000) * density
      );
      bases = Array.from({ length: target }, spawn);
    }

    function step() {
      for (const b of bases) {
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vrot;
        const m = b.size;
        if (b.x < -m) b.x = width + m;
        if (b.x > width + m) b.x = -m;
        if (b.y < -m) b.y = height + m;
        if (b.y > height + m) b.y = -m;
      }
    }

    function draw() {
      const styles = getComputedStyle(document.documentElement);
      const ink = styles.getPropertyValue("--ink").trim() || "245 245 245";
      const accent = styles.getPropertyValue("--accent").trim() || "220 38 38";

      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (const b of bases) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);

        const isAccent = b.char === "A" || b.char === "G";
        const color = isAccent ? accent : ink;
        // bigger letters fade slightly more visible; smaller stay subtle
        const op = 0.05 + ((b.size - 70) / 90) * 0.07;

        ctx.font = `700 ${b.size}px ui-serif, Georgia, "Source Serif 4", serif`;
        ctx.fillStyle = `rgb(${color} / ${op.toFixed(3)})`;
        ctx.fillText(b.char, 0, 0);

        if (b.pair) {
          // hydrogen-bond rule
          ctx.strokeStyle = `rgb(${ink} / ${(op * 0.5).toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(b.size * 0.35, 0);
          ctx.lineTo(b.size * 0.85, 0);
          ctx.stroke();

          const pairColor = b.pair === "A" || b.pair === "G" ? accent : ink;
          ctx.font = `700 ${b.size * 0.7}px ui-serif, Georgia, "Source Serif 4", serif`;
          ctx.fillStyle = `rgb(${pairColor} / ${(op * 0.85).toFixed(3)})`;
          ctx.fillText(b.pair, b.size * 1.15, 0);
        }

        ctx.restore();
      }
    }

    let raf = 0;
    let running = true;
    let last = 0;
    const FRAME_BUDGET = 1000 / 30;

    function loop(t: number) {
      if (!running) return;
      if (t - last >= FRAME_BUDGET) {
        step();
        draw();
        last = t;
      }
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (raf || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    if (reduce) draw();
    else start();

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 }
    );
    io.observe(c);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
