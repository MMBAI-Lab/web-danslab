"use client";

import { useEffect, useRef } from "react";

/**
 * Animated neural network — drifting nodes connected by lines that fade with
 * distance, plus signal pulses traveling along edges. Reads --accent and
 * --muted at draw time so it adapts to the active theme.
 *
 * Pauses off-screen, caps to 30 FPS, honors prefers-reduced-motion.
 */
export default function NeuralNetwork({
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

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Edge = { a: number; b: number };
    type Pulse = { edge: number; t: number; speed: number };

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];

    const LINK_DIST = 130;

    function resize() {
      const rect = c.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      c.width = Math.max(1, Math.floor(width * dpr));
      c.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(
        18,
        Math.floor((width * height) / 18000) * density
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.6 + Math.random() * 1.6,
      }));
      rebuildEdges();
      pulses = [];
    }

    function rebuildEdges() {
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) {
            edges.push({ a: i, b: j });
          }
        }
      }
    }

    let edgeRebuildTimer = 0;

    function step() {
      // drift nodes, bounce off bounds
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      edgeRebuildTimer++;
      if (edgeRebuildTimer > 30) {
        edgeRebuildTimer = 0;
        rebuildEdges();
      }

      // spawn pulses
      if (edges.length && Math.random() < 0.08) {
        pulses.push({
          edge: Math.floor(Math.random() * edges.length),
          t: 0,
          speed: 0.012 + Math.random() * 0.018,
        });
      }
      // advance pulses
      pulses = pulses.filter((p) => {
        p.t += p.speed;
        return p.t < 1;
      });
    }

    function draw() {
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "220 38 38";
      const muted = styles.getPropertyValue("--muted").trim() || "163 163 163";
      const ink = styles.getPropertyValue("--ink").trim() || "245 245 245";

      ctx.clearRect(0, 0, width, height);

      // edges
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const t = 1 - d / LINK_DIST;
        ctx.strokeStyle = `rgb(${muted} / ${(t * 0.22).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // pulses
      for (const p of pulses) {
        const e = edges[p.edge];
        if (!e) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = 1 - Math.abs(p.t - 0.5) * 2;
        ctx.fillStyle = `rgb(${accent} / ${(fade * 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgb(${ink} / 0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let raf = 0;
    let running = true;
    let lastFrame = 0;
    const FRAME_BUDGET = 1000 / 30;

    function loop(t: number) {
      if (!running) return;
      if (t - lastFrame >= FRAME_BUDGET) {
        step();
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
