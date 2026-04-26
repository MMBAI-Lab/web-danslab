export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-ink/70 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} DansLab — Molecular Modeling,
          Bioinformatics &amp; AI.
        </p>
        <p>
          Department of Biological Sciences (DCB), CENUR Litoral Norte,
          Universidad de la República, Salto, Uruguay.
        </p>
      </div>
    </footer>
  );
}
