/**
 * Slow horizontal ticker of DNA/RNA-like sequences.
 * Pure CSS marquee. Decorative, low-opacity background element.
 */

const SEQUENCES = [
  "ATCGATCGTTAACGGCATCGAATTCGCATGCAATCGTAGCTAGCTACGTAGCTACG",
  "GUACGUACGUUACGUUACGUACGUACGAUCGAUCGAUCGGCAUCGAAUCGAAUCG",
  "MGSSHHHHHHGSGLVPRGSHMASMTGGQQMGRDLYDDDDKDPMVDLAVKVKAEDA",
  "CGTAGCTAGCTACGATCGTAGCTACGATCGTAGCTACGATCGTAGCTACGATCGT",
  "AUGGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUA",
];

export default function SequenceTicker({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="flex flex-col gap-3 font-mono text-xs leading-none tracking-widest text-muted/15 md:text-sm">
        {SEQUENCES.map((seq, i) => (
          <Row key={i} seq={seq} duration={60 + i * 8} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function Row({
  seq,
  duration,
  reverse,
}: {
  seq: string;
  duration: number;
  reverse: boolean;
}) {
  const repeated = (seq + " ").repeat(8);
  return (
    <div className="relative whitespace-nowrap">
      <div
        className="ticker-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
      <style>{`
        .ticker-track {
          display: inline-flex;
          gap: 2rem;
          animation-name: ticker-slide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes ticker-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
