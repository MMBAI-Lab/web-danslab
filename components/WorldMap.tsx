"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WORLD_PATH, WORLD_VIEWBOX, project } from "@/data/worldmap";

/**
 * World-map silhouette with a red dot at every city where DansLab has a
 * collaborator. The land path and the dots share the same equirectangular
 * projection (see data/worldmap.ts), so each dot lands on its true position.
 *
 * Hovering (or keyboard-focusing) a dot reveals a styled label listing the
 * collaborator(s) based in that city and their institution.
 *
 * Zoom: mouse wheel (centred on the cursor), the +/−/reset buttons, and drag
 * to pan once zoomed in. The land is scaled by a <g> transform while each dot
 * keeps a constant on-screen size — so tight clusters (Río de la Plata,
 * Maryland, California) fan apart as you zoom. Colours read the theme tokens;
 * the pulse ring (`.map-pulse`) is disabled under prefers-reduced-motion.
 */

type Member = { name: string; institution: string };

// City -> [lon, lat]. Add an entry when a collaborator lands in a new city.
const CITY_COORDS: Record<string, [number, number]> = {
  Montevideo: [-56.16, -34.9],
  "Buenos Aires": [-58.38, -34.6],
  Salto: [-57.96, -31.38],
  "Santa Fe": [-60.7, -31.63],
  "Cerro Azul": [-55.51, -27.63],
  "Bella Vista": [-58.94, -28.51],
  Tucumán: [-65.22, -26.82],
  Lima: [-77.04, -12.05],
  Medellín: [-75.58, 6.24],
  "Belo Horizonte": [-43.94, -19.92],
  "San Francisco": [-122.42, 37.77],
  "Los Angeles": [-118.24, 34.05],
  Fullerton: [-117.93, 33.87],
  Gainesville: [-82.32, 29.65],
  Carlsbad: [-117.35, 33.16],
  "Salt Lake City": [-111.89, 40.76],
  "Gaithersburg & Bethesda": [-77.14, 39.06],
  York: [-1.09, 53.96],
  Glasgow: [-4.25, 55.86],
  "Paris-Saclay": [2.2, 48.71],
  Barcelona: [2.17, 41.39],
  Madrid: [-3.7, 40.42],
  "Beer Sheva": [34.79, 31.25],
};

type Marker = { city: string; x: number; y: number; members: Member[] };

function buildMarkers(
  collaborators: { name: string; institution: string; city: string }[]
): Marker[] {
  const byCity = new Map<string, Member[]>();
  for (const c of collaborators) {
    if (!c.city) continue;
    for (const raw of c.city.split(" / ")) {
      const city = raw.trim();
      if (!CITY_COORDS[city]) continue;
      const list = byCity.get(city) ?? [];
      list.push({ name: c.name, institution: c.institution });
      byCity.set(city, list);
    }
  }
  return [...byCity.entries()].map(([city, members]) => {
    const [lon, lat] = CITY_COORDS[city];
    const { x, y } = project(lon, lat);
    return { city, x, y, members };
  });
}

const MIN_K = 1;
const MAX_K = 9;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function WorldMap({
  collaborators,
}: {
  collaborators: { name: string; institution: string; city: string }[];
}) {
  const { w, h } = WORLD_VIEWBOX;
  const markers = buildMarkers(collaborators);
  const [active, setActive] = useState<string | null>(null);
  const activeMarker = markers.find((m) => m.city === active) ?? null;

  // View transform: screen = base * k + t.
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const clampT = (k: number, tx: number, ty: number) => ({
    k,
    tx: clamp(tx, w * (1 - k), 0),
    ty: clamp(ty, h * (1 - k), 0),
  });

  // Zoom by `factor` keeping the point (px,py) — in viewBox coords — fixed.
  const zoomAt = useCallback(
    (factor: number, px: number, py: number) => {
      setView((v) => {
        const nk = clamp(v.k * factor, MIN_K, MAX_K);
        if (nk === v.k) return v;
        const cx = (px - v.tx) / v.k;
        const cy = (py - v.ty) / v.k;
        return clampT(nk, px - cx * nk, py - cy * nk);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Pointer position in viewBox coordinates.
  const toViewBox = (clientX: number, clientY: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { px: ((clientX - r.left) / r.width) * w, py: ((clientY - r.top) / r.height) * h };
  };

  // Wheel zoom (native listener so we can preventDefault the page scroll).
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { px, py } = toViewBox(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, px, py);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (view.k <= 1) return;
    drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
    setDragging(true);
    setActive(null);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const r = svgRef.current!.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.x) / r.width) * w;
    const dy = ((e.clientY - drag.current.y) / r.height) * h;
    setView((v) => clampT(v.k, drag.current!.tx + dx, drag.current!.ty + dy));
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const btnZoom = (factor: number) => zoomAt(factor, w / 2, h / 2);
  const reset = () => setView({ k: 1, tx: 0, ty: 0 });

  const tf = (x: number, y: number) => ({ X: x * view.k + view.tx, Y: y * view.k + view.ty });

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="World map with a marker at every city where DansLab has a collaborator"
        className="h-auto w-full select-none"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: view.k > 1 ? (dragging ? "grabbing" : "grab") : "default",
          touchAction: view.k > 1 ? "none" : "pan-y",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Land silhouette (scaled) */}
        <g transform={`translate(${view.tx} ${view.ty}) scale(${view.k})`}>
          <path d={WORLD_PATH} style={{ fill: "rgb(var(--ink) / 0.1)" }} />
        </g>

        {/* City markers — positioned by the transform, but constant size */}
        {markers.map((m) => {
          const core = 2.6 + Math.min(m.members.length - 1, 5) * 0.6;
          const isActive = m.city === active;
          const { X, Y } = tf(m.x, m.y);
          return (
            <g
              key={m.city}
              tabIndex={0}
              role="button"
              aria-label={`${m.city}: ${m.members.map((x) => x.name).join(", ")}`}
              style={{ cursor: "pointer", outline: "none" }}
              onMouseEnter={() => !dragging && setActive(m.city)}
              onMouseLeave={() => setActive((c) => (c === m.city ? null : c))}
              onFocus={() => setActive(m.city)}
              onBlur={() => setActive((c) => (c === m.city ? null : c))}
            >
              <circle
                className="map-pulse"
                cx={X}
                cy={Y}
                r={core}
                style={{ fill: "rgb(var(--accent) / 0.9)" }}
              />
              <circle
                cx={X}
                cy={Y}
                r={isActive ? core + 1.2 : core}
                style={{
                  fill: "rgb(var(--accent))",
                  stroke: "rgb(var(--bg))",
                  strokeWidth: 0.8,
                  transition: "r 120ms ease-out",
                }}
              />
              {/* Invisible, larger hit area for comfortable hover/tap */}
              <circle cx={X} cy={Y} r={9} fill="transparent" />
            </g>
          );
        })}
      </svg>

      {/* Zoom controls */}
      <div className="absolute right-2 top-2 z-30 flex flex-col gap-1">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => btnZoom(1.6)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-elevated text-lg leading-none text-ink transition hover:border-accent hover:text-accent"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => btnZoom(1 / 1.6)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-elevated text-lg leading-none text-ink transition hover:border-accent hover:text-accent"
        >
          −
        </button>
        {view.k > 1 && (
          <button
            type="button"
            aria-label="Reset zoom"
            onClick={reset}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-elevated text-xs leading-none text-muted transition hover:border-accent hover:text-accent"
          >
            ⟳
          </button>
        )}
      </div>

      {/* Hover / focus label */}
      {activeMarker &&
        (() => {
          const { X, Y } = tf(activeMarker.x, activeMarker.y);
          return (
            <div
              className="pointer-events-none absolute z-20 w-max max-w-[16rem] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-elevated px-3 py-2 shadow-lg"
              style={{ left: `${(X / w) * 100}%`, top: `calc(${(Y / h) * 100}% - 10px)` }}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                {activeMarker.city}
              </p>
              <ul className="space-y-1.5">
                {activeMarker.members.map((mem) => (
                  <li key={mem.name} className="leading-tight">
                    <span className="block text-xs font-semibold text-ink">{mem.name}</span>
                    {mem.institution && (
                      <span className="block text-[11px] text-muted">{mem.institution}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
    </div>
  );
}
