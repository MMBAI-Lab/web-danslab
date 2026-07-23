"use client";

import { useState } from "react";
import { WORLD_PATH, WORLD_VIEWBOX, project } from "@/data/worldmap";

/**
 * World-map silhouette with a red dot at every city where DansLab has a
 * collaborator. The land path and the dots share the same equirectangular
 * projection (see data/worldmap.ts), so each dot lands on its true position.
 *
 * Hovering (or keyboard-focusing) a dot reveals a styled label listing the
 * collaborator(s) based in that city and their institution. Colours read the
 * theme tokens via rgb(var(--…)); the pulse ring (`.map-pulse`) is disabled
 * under prefers-reduced-motion.
 *
 * Cities come from each collaborator's `city` field; coordinates are looked up
 * here. An entry may name two cities joined by " / " (e.g. a company with two
 * offices) — it then contributes a dot to each.
 */

type Member = { name: string; institution: string };

// City -> [lon, lat]. Add an entry when a collaborator lands in a new city.
const CITY_COORDS: Record<string, [number, number]> = {
  Montevideo: [-56.16, -34.9],
  "Buenos Aires": [-58.38, -34.6],
  Salto: [-57.96, -31.38],
  "Santa Fe": [-60.7, -31.63],
  Lima: [-77.04, -12.05],
  Medellín: [-75.58, 6.24],
  "San Francisco": [-122.42, 37.77],
  Gainesville: [-82.32, 29.65],
  Carlsbad: [-117.35, 33.16],
  "Salt Lake City": [-111.89, 40.76],
  "Gaithersburg & Bethesda": [-77.14, 39.06],
  York: [-1.09, 53.96],
  Glasgow: [-4.25, 55.86],
  "Paris-Saclay": [2.2, 48.71],
  Barcelona: [2.17, 41.39],
  Madrid: [-3.7, 40.42],
};

type Marker = {
  city: string;
  x: number;
  y: number;
  members: Member[];
};

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

export default function WorldMap({
  collaborators,
}: {
  collaborators: { name: string; institution: string; city: string }[];
}) {
  const { w, h } = WORLD_VIEWBOX;
  const markers = buildMarkers(collaborators);
  const [active, setActive] = useState<string | null>(null);
  const activeMarker = markers.find((m) => m.city === active) ?? null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="World map with a marker at every city where DansLab has a collaborator"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Land silhouette */}
        <path d={WORLD_PATH} style={{ fill: "rgb(var(--ink) / 0.1)" }} />

        {/* City markers */}
        {markers.map((m) => {
          const core = 2.6 + Math.min(m.members.length - 1, 5) * 0.6;
          const isActive = m.city === active;
          return (
            <g
              key={m.city}
              tabIndex={0}
              role="button"
              aria-label={`${m.city}: ${m.members
                .map((x) => x.name)
                .join(", ")}`}
              style={{ cursor: "pointer", outline: "none" }}
              onMouseEnter={() => setActive(m.city)}
              onMouseLeave={() => setActive((c) => (c === m.city ? null : c))}
              onFocus={() => setActive(m.city)}
              onBlur={() => setActive((c) => (c === m.city ? null : c))}
            >
              <circle
                className="map-pulse"
                cx={m.x}
                cy={m.y}
                r={core}
                style={{ fill: "rgb(var(--accent) / 0.9)" }}
              />
              <circle
                cx={m.x}
                cy={m.y}
                r={isActive ? core + 1.2 : core}
                style={{
                  fill: "rgb(var(--accent))",
                  stroke: "rgb(var(--bg))",
                  strokeWidth: 0.8,
                  transition: "r 120ms ease-out",
                }}
              />
              {/* Invisible, larger hit area for comfortable hover/tap */}
              <circle cx={m.x} cy={m.y} r={9} fill="transparent" />
            </g>
          );
        })}
      </svg>

      {/* Hover / focus label */}
      {activeMarker && (
        <div
          className="pointer-events-none absolute z-20 w-max max-w-[16rem] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-elevated px-3 py-2 shadow-lg"
          style={{
            left: `${(activeMarker.x / w) * 100}%`,
            top: `calc(${(activeMarker.y / h) * 100}% - 10px)`,
          }}
        >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
            {activeMarker.city}
          </p>
          <ul className="space-y-1.5">
            {activeMarker.members.map((mem) => (
              <li key={mem.name} className="leading-tight">
                <span className="block text-xs font-semibold text-ink">
                  {mem.name}
                </span>
                {mem.institution && (
                  <span className="block text-[11px] text-muted">
                    {mem.institution}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
