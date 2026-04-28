"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

type Mol = {
  cx: number; // 0..1 canvas-relative
  cy: number;
  vx: number;
  vy: number;
  z: number; // 0 (far) → 1 (close)
  vz: number;
  baseScale: number; // sprite height at z = 1, in CSS px
  rot: number;
  rotV: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAtZ(z: number): { r: number; g: number; b: number } {
  const stops = [
    { z: 0.0, r: 60, g: 6, b: 6 }, // dark red (far)
    { z: 0.4, r: 190, g: 35, b: 35 }, // red
    { z: 0.75, r: 250, g: 165, b: 170 }, // pink
    { z: 1.0, r: 255, g: 255, b: 255 }, // white (close)
  ];
  let lo = stops[0];
  let hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (z >= stops[i].z && z <= stops[i + 1].z) {
      lo = stops[i];
      hi = stops[i + 1];
      break;
    }
  }
  const t = (z - lo.z) / Math.max(0.0001, hi.z - lo.z);
  return {
    r: Math.round(lerp(lo.r, hi.r, t)),
    g: Math.round(lerp(lo.g, hi.g, t)),
    b: Math.round(lerp(lo.b, hi.b, t)),
  };
}

const BUCKET_COUNT = 8;

export default function RnaCloud({
  className = "",
  density = 0.7,
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
    const c: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let mols: Mol[] = [];
    let buckets: HTMLCanvasElement[] = [];
    let spriteW = 0;
    let spriteH = 0;
    let raf = 0;
    let running = true;
    let lastT = 0;
    let cancelled = false;

    const rand = mulberry32(20250101);

    function makeMol(i: number): Mol {
      const r = mulberry32(0xa1b2c3 ^ (i * 0x9e3779b1));
      return {
        cx: r(),
        cy: r(),
        vx: (r() - 0.5) * 0.00004,
        vy: (r() - 0.5) * 0.00004,
        z: r(),
        vz: (r() - 0.5) * 0.0002,
        baseScale: 110 + r() * 180,
        rot: r() * Math.PI * 2,
        rotV: (r() - 0.5) * 0.00015,
      };
    }

    function buildBuckets(img: HTMLImageElement) {
      spriteW = img.naturalWidth || img.width;
      spriteH = img.naturalHeight || img.height;
      buckets = [];
      for (let i = 0; i < BUCKET_COUNT; i++) {
        const z = i / (BUCKET_COUNT - 1);
        const col = colorAtZ(z);
        const off = document.createElement("canvas");
        off.width = spriteW;
        off.height = spriteH;
        const ox = off.getContext("2d", { alpha: true });
        if (!ox) continue;
        ox.drawImage(img, 0, 0);
        ox.globalCompositeOperation = "source-atop";
        ox.fillStyle = `rgb(${col.r}, ${col.g}, ${col.b})`;
        ox.fillRect(0, 0, spriteW, spriteH);
        ox.globalCompositeOperation = "source-over";
        buckets.push(off);
      }
    }

    function resize() {
      const rect = c.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      c.width = Math.max(1, Math.floor(width * dpr));
      c.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const target = Math.max(6, Math.round((area / 160000) * density));
      mols = Array.from({ length: target }, (_, i) => makeMol(i));
    }

    function draw(dt: number) {
      ctx.clearRect(0, 0, width, height);
      if (!buckets.length || !spriteH) return;

      const sorted = [...mols].sort((a, b) => a.z - b.z);

      for (const m of sorted) {
        m.cx += m.vx * dt;
        m.cy += m.vy * dt;
        m.z += m.vz * dt;
        m.rot += m.rotV * dt;

        if (m.z < 0) {
          m.z = 0;
          m.vz = Math.abs(m.vz);
        } else if (m.z > 1) {
          m.z = 1;
          m.vz = -Math.abs(m.vz);
        }
        if (m.cx < -0.2) m.cx = 1.2;
        if (m.cx > 1.2) m.cx = -0.2;
        if (m.cy < -0.2) m.cy = 1.2;
        if (m.cy > 1.2) m.cy = -0.2;

        const x = m.cx * width;
        const y = m.cy * height;
        const scale = (m.baseScale * (0.45 + 0.95 * m.z)) / spriteH;
        const w = spriteW * scale;
        const h = spriteH * scale;
        const alpha = lerp(0.25, 0.95, m.z);
        const idx = Math.min(BUCKET_COUNT - 1, Math.max(0, Math.round(m.z * (BUCKET_COUNT - 1))));
        const sprite = buckets[idx];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(m.rot);
        ctx.globalAlpha = alpha;

        // optional soft halo when very close
        if (m.z > 0.65) {
          const haloA = (m.z - 0.65) * 0.45;
          const grd = ctx.createRadialGradient(0, 0, h * 0.12, 0, 0, h * 0.7);
          grd.addColorStop(0, `rgba(255,255,255,${haloA.toFixed(3)})`);
          grd.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(0, 0, h * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.drawImage(sprite, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
    }

    function loop(t: number) {
      if (!running) return;
      const dt = lastT === 0 ? 16 : Math.min(48, t - lastT);
      if (t - lastT >= 1000 / 30) {
        draw(dt);
        lastT = t;
      }
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (raf || reduce) return;
      running = true;
      lastT = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    // Load sprite, then size & start.
    const img = new Image();
    img.decoding = "async";
    img.src = asset("/figures/ARNflotante.png");
    img.onload = () => {
      if (cancelled) return;
      buildBuckets(img);
      resize();
      if (reduce) {
        draw(16);
      } else {
        start();
      }
    };
    img.onerror = () => {
      // fall back to empty canvas; don't throw.
    };
    // Pre-touch rand so it's used (avoids unused-var lint if loop ever changes).
    void rand;

    const ro = new ResizeObserver(() => {
      if (!buckets.length) return;
      resize();
    });
    ro.observe(c);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!buckets.length) return;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(c);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
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
