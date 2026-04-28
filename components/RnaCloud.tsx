"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };

type Rna = {
  pts: Pt[];
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  z: number;
  vz: number;
  baseScale: number;
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

function buildRnaPath(seed: number): Pt[] {
  const rand = mulberry32(seed);
  const N = 90 + Math.floor(rand() * 60);
  const pts: Pt[] = [];
  let x = 0;
  let y = 0;
  let a = rand() * Math.PI * 2;
  for (let i = 0; i < N; i++) {
    pts.push({ x, y });
    a += (rand() - 0.5) * 0.85;
    if (rand() < 0.07) a += (rand() - 0.5) * 2.6;
    x += Math.cos(a);
    y += Math.sin(a);
  }
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const ccx = (minX + maxX) / 2;
  const ccy = (minY + maxY) / 2;
  const r = Math.max(maxX - minX, maxY - minY) / 2 || 1;
  return pts.map((p) => ({ x: (p.x - ccx) / r, y: (p.y - ccy) / r }));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Depth-driven color: z=1 close (white) → pink → red → dark red at z=0
function colorAtZ(z: number): { r: number; g: number; b: number; a: number } {
  const stops = [
    { z: 0.0, r: 60, g: 6, b: 6, a: 0.22 }, // far: dark red
    { z: 0.35, r: 180, g: 30, b: 30, a: 0.45 }, // red
    { z: 0.7, r: 250, g: 170, b: 175, a: 0.7 }, // pink
    { z: 1.0, r: 255, g: 255, b: 255, a: 0.92 }, // close: white
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
    a: lerp(lo.a, hi.a, t),
  };
}

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
    let molecules: Rna[] = [];
    const rand = mulberry32(20250101);

    function makeMolecule(seed: number): Rna {
      const baseScale = 90 + rand() * 140;
      return {
        pts: buildRnaPath(seed),
        cx: rand() * 1,
        cy: rand() * 1,
        vx: (rand() - 0.5) * 0.00018,
        vy: (rand() - 0.5) * 0.00018,
        z: rand(),
        vz: (rand() - 0.5) * 0.0009,
        baseScale,
        rot: rand() * Math.PI * 2,
        rotV: (rand() - 0.5) * 0.0006,
      };
    }

    function resize() {
      const rect = c.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      c.width = Math.max(1, Math.floor(width * dpr));
      c.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const target = Math.max(8, Math.round((area / 110000) * density));
      molecules = Array.from({ length: target }, (_, i) =>
        makeMolecule(0x9e3779b1 ^ (i * 2654435761))
      );
    }

    function draw(dt: number) {
      ctx.clearRect(0, 0, width, height);

      // Sort back-to-front so closer molecules paint on top
      const sorted = [...molecules].sort((a, b) => a.z - b.z);

      for (const m of sorted) {
        // animate
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

        // wrap laterally
        if (m.cx < -0.15) m.cx = 1.15;
        if (m.cx > 1.15) m.cx = -0.15;
        if (m.cy < -0.15) m.cy = 1.15;
        if (m.cy > 1.15) m.cy = -0.15;

        const x = m.cx * width;
        const y = m.cy * height;
        // perspective scale: closer = bigger
        const scale = m.baseScale * (0.45 + 0.95 * m.z);
        const col = colorAtZ(m.z);

        // soft halo when very close (the user-attached reference has glow)
        if (m.z > 0.55) {
          const haloAlpha = (m.z - 0.55) * 0.6;
          const grd = ctx.createRadialGradient(x, y, scale * 0.1, x, y, scale * 1.2);
          grd.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${haloAlpha.toFixed(3)})`);
          grd.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(x, y, scale * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(m.rot);

        const lw = lerp(0.6, 2.4, m.z);
        ctx.lineWidth = lw;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${col.a.toFixed(3)})`;

        // draw the tangled backbone
        ctx.beginPath();
        for (let i = 0; i < m.pts.length; i++) {
          const p = m.pts[i];
          const px = p.x * scale;
          const py = p.y * scale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // overlay a thinner brighter pass for the "close" molecules to add the
        // bright-core-look the reference image has
        if (m.z > 0.65) {
          ctx.lineWidth = Math.max(0.5, lw * 0.45);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(0.35 * (m.z - 0.65) / 0.35).toFixed(3)})`;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    let raf = 0;
    let running = true;
    let lastT = 0;
    const FRAME_BUDGET = 1000 / 30;

    function loop(t: number) {
      if (!running) return;
      const dt = lastT === 0 ? 16 : Math.min(48, t - lastT);
      if (t - lastT >= FRAME_BUDGET) {
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

    resize();
    if (reduce) {
      draw(16);
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
