/**
 * Animated DNA double helix — pure SVG, no JS animation.
 * Use as a decorative background element. Pointer-events disabled,
 * aria-hidden so screen readers ignore it.
 */
export default function DnaHelix({ className = "" }: { className?: string }) {
  const bases = Array.from({ length: 26 });
  return (
    <svg
      viewBox="0 0 400 800"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="strand1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#dc2626" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#dc2626" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="strand2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#e5e5e5" stopOpacity="0.65" />
          <stop offset="80%" stopColor="#e5e5e5" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <g className="helix-spin">
        {bases.map((_, i) => {
          const y = (i / (bases.length - 1)) * 800;
          const phase = (i / (bases.length - 1)) * Math.PI * 6;
          const x1 = 200 + Math.sin(phase) * 110;
          const x2 = 200 - Math.sin(phase) * 110;
          const opacity = 0.15 + Math.abs(Math.cos(phase)) * 0.55;
          return (
            <line
              key={i}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#525252"
              strokeWidth="1.5"
              strokeOpacity={opacity}
            />
          );
        })}

        <path
          d={buildHelixPath(0)}
          stroke="url(#strand1)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d={buildHelixPath(Math.PI)}
          stroke="url(#strand2)"
          strokeWidth="2.5"
          fill="none"
        />
      </g>

      <style>{`
        .helix-spin {
          transform-origin: 200px 400px;
          animation: helix-rotate 30s linear infinite;
        }
        @keyframes helix-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .helix-spin { animation: none; }
        }
      `}</style>
    </svg>
  );
}

function buildHelixPath(phaseShift: number): string {
  const steps = 200;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = t * 800;
    const phase = t * Math.PI * 6 + phaseShift;
    const x = 200 + Math.sin(phase) * 110;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}
