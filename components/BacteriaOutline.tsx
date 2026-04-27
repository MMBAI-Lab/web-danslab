/**
 * Decorative bacterium silhouette — just the membrane outline. Pure SVG,
 * uses --accent at low opacity. Pointer-events disabled, aria-hidden.
 */
export default function BacteriaOutline({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 400"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        fill="none"
        stroke="rgb(var(--accent) / 0.45)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bacillus cell — capsule shape */}
        <path d="M 180 150 Q 100 150 100 200 Q 100 250 180 250 L 620 250 Q 700 250 700 200 Q 700 150 620 150 Z" />
        {/* inner faint membrane (periplasm hint) */}
        <path
          d="M 195 165 Q 130 165 130 200 Q 130 235 195 235 L 605 235 Q 670 235 670 200 Q 670 165 605 165 Z"
          stroke="rgb(var(--accent) / 0.22)"
          strokeWidth="1.2"
        />
        {/* flagellum — single curl at the right end */}
        <path
          d="M 700 200 q 30 -10 50 -25 q 25 -22 0 -42 q -25 -18 -10 -42 q 12 -20 40 -22"
          stroke="rgb(var(--accent) / 0.32)"
          strokeWidth="1.8"
        />
        {/* pilus / fimbriae — tiny lines on the left end */}
        <g stroke="rgb(var(--accent) / 0.32)" strokeWidth="1.5">
          <path d="M 102 180 q -25 -8 -45 -22" />
          <path d="M 100 200 q -28 0 -50 -2" />
          <path d="M 102 220 q -25 8 -45 22" />
        </g>
      </g>
    </svg>
  );
}
