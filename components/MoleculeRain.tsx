"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix-style falling sequence rain. DNA bases (A/T/C/G), RNA (U), codons,
 * and a few schematic motifs drop in vertical columns. Head of each column
 * is in the accent color; the tail fades to muted.
 *
 * Renders into a <canvas> sized by ResizeObserver. Pauses when off-screen
 * (IntersectionObserver) and respects prefers-reduced-motion.
 */
export default function MoleculeRain({
  className = "",
  density = 0.9,
}: {
  className?: string;
  density?: number; // 0 sparse → 1 dense
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d", { alpha: true });
    if (!ctx2d) return;
    const c: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ALPHABET = [
      "A","T","C","G","U",
      "A","T","C","G","A","C","G","T", // weight bases higher
      "ATG","CCG","GCT","TAA","AUG","CGU","GGC","UAA",
      "α","β","φ","ψ",
      "5'","3'",
      "—","≡","=","·",
    ];
    const FONT_PX = 14;
    const COL_PX = 18;
    const SPEED_MIN = 0.4;
    const SPEED_MAX = 1.6;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      next: number;
    }> = [];

    function pickChar() {
      return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }

    function resize() {
      const rect = c.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      c.width = Math.max(1, Math.floor(width * dpr));
      c.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colCount = Math.max(1, Math.floor((width / COL_PX) * density));
      columns = Array.from({ length: colCount }, (_, i) => ({
        x: i * (width / colCount) + (width / colCount - COL_PX) / 2,
        y: -Math.random() * height,
        speed: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
        length: 8 + Math.floor(Math.random() * 18),
        next: 0,
      }));
    }

    function draw() {
      // soft fade for trailing effect (read theme tokens at draw time so theme
      // toggling at runtime is reflected)
      const styles = getComputedStyle(document.documentElement);
      const bg = styles.getPropertyValue("--bg").trim() || "10 10 10";
      const accent = styles.getPropertyValue("--accent").trim() || "220 38 38";
      const muted = styles.getPropertyValue("--muted").trim() || "163 163 163";

      ctx.fillStyle = `rgb(${bg} / 0.18)`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_PX}px ui-monospace, "SF Mono", Menlo, monospace`;
      ctx.textBaseline = "top";

      for (const c of columns) {
        // tail
        for (let i = 1; i < c.length; i++) {
          const y = c.y - i * FONT_PX;
          if (y < -FONT_PX || y > height) continue;
          const fade = 1 - i / c.length;
          ctx.fillStyle = `rgb(${muted} / ${(fade * 0.55).toFixed(3)})`;
          ctx.fillText(pickChar(), c.x, y);
        }
        // head
        if (c.y > -FONT_PX && c.y < height + FONT_PX) {
          ctx.fillStyle = `rgb(${accent} / 0.95)`;
          ctx.fillText(pickChar(), c.x, c.y);
        }

        c.y += c.speed * FONT_PX * 0.5;
        if (c.y - c.length * FONT_PX > height + FONT_PX) {
          c.y = -Math.random() * 200;
          c.length = 8 + Math.floor(Math.random() * 18);
          c.speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
        }
      }
    }

    let raf = 0;
    let running = true;
    let lastFrame = 0;
    const FRAME_BUDGET = 1000 / 30; // cap at 30 FPS

    function loop(t: number) {
      if (!running) return;
      if (t - lastFrame >= FRAME_BUDGET) {
        draw();
        lastFrame = t;
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
    if (reduce) {
      // single static frame
      draw();
    } else {
      start();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
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
