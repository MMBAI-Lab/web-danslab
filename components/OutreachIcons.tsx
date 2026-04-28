/**
 * Inline SVG silhouettes used as the colour-accent on the Outreach hub
 * cards. All shapes use `currentColor` so the parent's `text-accent`
 * paints them red; backgrounds stay transparent.
 */

type IconProps = { className?: string };

export function AudienceIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Presenter — head outline + torso silhouette behind podium */}
      <circle cx="100" cy="34" r="22" fill="none" stroke="currentColor" strokeWidth="11" />
      <path
        d="M 60 102 C 60 76 76 70 100 70 C 124 70 140 76 140 102 L 140 122 L 60 122 Z"
        fill="currentColor"
      />
      {/* Podium */}
      <rect
        x="60"
        y="124"
        width="80"
        height="64"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
      />
      <line
        x1="52"
        y1="146"
        x2="148"
        y2="146"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Audience — three figures in front */}
      <circle cx="40" cy="222" r="14" fill="none" stroke="currentColor" strokeWidth="9" />
      <path
        d="M 22 270 C 22 248 30 240 40 240 C 50 240 58 248 58 270 Z"
        fill="currentColor"
      />
      <circle cx="100" cy="238" r="14" fill="none" stroke="currentColor" strokeWidth="9" />
      <path
        d="M 82 280 C 82 262 90 256 100 256 C 110 256 118 262 118 280 Z"
        fill="currentColor"
      />
      <circle cx="160" cy="222" r="14" fill="none" stroke="currentColor" strokeWidth="9" />
      <path
        d="M 142 270 C 142 248 150 240 160 240 C 170 240 178 248 178 270 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DnaHelixIcon({ className = "" }: IconProps) {
  // Two intertwined sine-curve strands with ladder rungs between them.
  return (
    <svg
      viewBox="0 0 120 280"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      >
        {/* Strand A */}
        <path d="M 30 10 C 90 50, 90 80, 30 110 C -30 140, -30 170, 30 200 C 90 230, 90 250, 30 270" />
        {/* Strand B */}
        <path d="M 90 10 C 30 50, 30 80, 90 110 C 150 140, 150 170, 90 200 C 30 230, 30 250, 90 270" />
        {/* Rungs */}
        <line x1="22" y1="40" x2="98" y2="40" />
        <line x1="22" y1="62" x2="98" y2="62" />
        <line x1="22" y1="84" x2="98" y2="84" />
        <line x1="22" y1="130" x2="98" y2="130" />
        <line x1="22" y1="152" x2="98" y2="152" />
        <line x1="22" y1="174" x2="98" y2="174" />
        <line x1="22" y1="220" x2="98" y2="220" />
        <line x1="22" y1="242" x2="98" y2="242" />
      </g>
    </svg>
  );
}

export function MusicNotesIcon({ className = "" }: IconProps) {
  // Two beamed eighth notes + one quarter note, simple silhouettes.
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Beamed pair — heads */}
      <ellipse
        cx="48"
        cy="190"
        rx="22"
        ry="16"
        fill="currentColor"
        transform="rotate(-18 48 190)"
      />
      <ellipse
        cx="118"
        cy="216"
        rx="22"
        ry="16"
        fill="currentColor"
        transform="rotate(-18 118 216)"
      />
      {/* Stems for the beamed pair */}
      <rect x="64" y="40" width="9" height="155" fill="currentColor" />
      <rect x="134" y="66" width="9" height="155" fill="currentColor" />
      {/* Beam joining them */}
      <path
        d="M 64 40 L 143 66 L 143 90 L 64 64 Z"
        fill="currentColor"
      />

      {/* Solitary quarter note on the right */}
      <ellipse
        cx="166"
        cy="244"
        rx="20"
        ry="14"
        fill="currentColor"
        transform="rotate(-18 166 244)"
      />
      <rect x="180" y="116" width="8" height="130" fill="currentColor" />
    </svg>
  );
}
