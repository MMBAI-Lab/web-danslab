import { WORLD_PATH, WORLD_VIEWBOX, project } from "@/data/worldmap";

/**
 * World-map silhouette with a red dot at every city where DansLab has a
 * collaborator. Pure SVG (no client JS): the land path and the dots share the
 * same equirectangular projection (see data/worldmap.ts), so each dot lands on
 * its true position. Colours read the theme tokens via rgb(var(--…)).
 *
 * A city's dot scales slightly with how many collaborators sit there, and each
 * carries a native <title> tooltip. The soft pulse ring is CSS (`.map-pulse`)
 * and is switched off under prefers-reduced-motion.
 */

type City = {
  name: string;
  lon: number;
  lat: number;
  count: number;
};

// One entry per city (deduplicated). count = collaborators based there.
const CITIES: City[] = [
  { name: "Montevideo", lon: -56.16, lat: -34.9, count: 5 },
  { name: "Buenos Aires", lon: -58.38, lat: -34.6, count: 1 },
  { name: "Salto", lon: -57.96, lat: -31.38, count: 1 },
  { name: "Santa Fe", lon: -60.7, lat: -31.63, count: 1 },
  { name: "Lima", lon: -77.04, lat: -12.05, count: 1 },
  { name: "Medellín", lon: -75.58, lat: 6.24, count: 1 },
  { name: "San Francisco", lon: -122.42, lat: 37.77, count: 1 },
  { name: "Gainesville", lon: -82.32, lat: 29.65, count: 1 },
  { name: "Carlsbad", lon: -117.35, lat: 33.16, count: 1 },
  { name: "Salt Lake City", lon: -111.89, lat: 40.76, count: 1 },
  { name: "Gaithersburg", lon: -77.2, lat: 39.14, count: 1 },
  { name: "Bethesda", lon: -77.09, lat: 38.98, count: 1 },
  { name: "York", lon: -1.09, lat: 53.96, count: 1 },
  { name: "Glasgow", lon: -4.25, lat: 55.86, count: 1 },
  { name: "Paris–Saclay", lon: 2.2, lat: 48.71, count: 1 },
  { name: "Barcelona", lon: 2.17, lat: 41.39, count: 1 },
  { name: "Madrid", lon: -3.7, lat: 40.42, count: 1 },
];

export default function WorldMap({
  unitOne,
  unitMany,
}: {
  unitOne: string;
  unitMany: string;
}) {
  const { w, h } = WORLD_VIEWBOX;

  return (
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
      {CITIES.map((city) => {
        const { x, y } = project(city.lon, city.lat);
        const core = 2.6 + Math.min(city.count - 1, 5) * 0.6;
        const label = `${city.name} · ${city.count} ${
          city.count === 1 ? unitOne : unitMany
        }`;
        return (
          <g key={city.name}>
            <title>{label}</title>
            <circle
              className="map-pulse"
              cx={x}
              cy={y}
              r={core}
              style={{ fill: "rgb(var(--accent) / 0.9)" }}
            />
            <circle
              cx={x}
              cy={y}
              r={core}
              style={{
                fill: "rgb(var(--accent))",
                stroke: "rgb(var(--bg))",
                strokeWidth: 0.8,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
