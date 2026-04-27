/**
 * Decorative bacterium silhouette in the spirit of the cartoon bacillus
 * (capsule body, fimbriae/pili spikes radiating outward, internal ribosomes
 * + a nucleoid blob, and a long curly flagellum). Pure SVG, theme-aware via
 * --accent. Drifts gently sideways with a slow CSS animation.
 *
 * Pointer-events disabled, aria-hidden.
 */
export default function BacteriaOutline({
  className = "",
}: {
  className?: string;
}) {
  // Pili: short radial spikes around the perimeter of the capsule.
  const pili: { x1: number; y1: number; x2: number; y2: number }[] = [];

  // Top edge (left flat → right flat segment is roughly y=160..170)
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    const x = 200 + t * 460;
    pili.push({ x1: x, y1: 160, x2: x, y2: 138 });
  }
  // Bottom edge
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    const x = 200 + t * 460;
    pili.push({ x1: x, y1: 270, x2: x, y2: 292 });
  }
  // Left rounded cap (centre 180, 215, radius ~58)
  for (let i = 0; i < 10; i++) {
    const a = Math.PI * 0.5 + (i / 9) * Math.PI; // 90° → 270°
    const r1 = 58;
    const r2 = 80;
    pili.push({
      x1: 180 + Math.cos(a) * r1,
      y1: 215 + Math.sin(a) * r1,
      x2: 180 + Math.cos(a) * r2,
      y2: 215 + Math.sin(a) * r2,
    });
  }
  // Right rounded cap (centre 660, 215)
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI * 0.5 + (i / 9) * Math.PI; // -90° → +90°
    const r1 = 58;
    const r2 = 80;
    pili.push({
      x1: 660 + Math.cos(a) * r1,
      y1: 215 + Math.sin(a) * r1,
      x2: 660 + Math.cos(a) * r2,
      y2: 215 + Math.sin(a) * r2,
    });
  }

  // Internal ribosome dashes (small lines).
  const ribosomes: { x: number; y: number; len: number; rot: number }[] = [
    { x: 250, y: 195, len: 22, rot: -20 },
    { x: 290, y: 230, len: 18, rot: 30 },
    { x: 330, y: 200, len: 20, rot: -10 },
    { x: 360, y: 245, len: 16, rot: 45 },
    { x: 410, y: 200, len: 22, rot: 15 },
    { x: 460, y: 235, len: 18, rot: -25 },
    { x: 500, y: 195, len: 16, rot: 35 },
    { x: 540, y: 230, len: 20, rot: -15 },
  ];

  return (
    <svg
      viewBox="0 0 1100 430"
      className={`pointer-events-none select-none bacteria-drift ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        fill="none"
        stroke="rgb(var(--accent) / 0.55)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Capsule body */}
        <path d="M 180 160 Q 122 160 122 215 Q 122 270 180 270 L 660 270 Q 718 270 718 215 Q 718 160 660 160 Z" />

        {/* Pili (short spikes) */}
        {pili.map((p, i) => (
          <line
            key={i}
            x1={p.x1}
            y1={p.y1}
            x2={p.x2}
            y2={p.y2}
            strokeWidth="2"
          />
        ))}

        {/* Long curly flagellum off the bottom-right */}
        <path
          d="M 705 250 q 35 8 60 30 q 30 25 10 60 q -22 35 25 60 q 50 28 100 -5 q 50 -32 90 0"
          strokeWidth="2.5"
          stroke="rgb(var(--accent) / 0.45)"
        />

        {/* Internal ribosome dashes */}
        <g strokeWidth="3" stroke="rgb(var(--accent) / 0.5)">
          {ribosomes.map((d, i) => (
            <line
              key={i}
              x1={d.x - d.len / 2}
              y1={d.y}
              x2={d.x + d.len / 2}
              y2={d.y}
              transform={`rotate(${d.rot} ${d.x} ${d.y})`}
            />
          ))}
        </g>

        {/* Nucleoid (solid filled oval) */}
        <ellipse
          cx="430"
          cy="245"
          rx="22"
          ry="14"
          fill="rgb(var(--accent) / 0.55)"
          stroke="none"
        />
      </g>

      <style>{`
        .bacteria-drift {
          animation: bacteria-drift 24s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes bacteria-drift {
          0%, 100% { transform: translate3d(-2%, 0, 0) rotate(-1deg); }
          50%      { transform: translate3d(2%, -1%, 0) rotate(1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bacteria-drift { animation: none; }
        }
      `}</style>
    </svg>
  );
}
