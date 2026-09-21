import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/map", label: "Map" },
  { to: "/openings", label: "Openings" },
  { to: "/partners", label: "Partners" },
] as const;

export function SiteHeader() {
  return (
    <header className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-6">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid place-items-center size-8 rounded-[6px] bg-signal/90 text-ink font-mono font-semibold text-sm">
            S
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Socket</span>
          <span className="font-mono text-[10px] text-steel/70 hidden sm:inline">// skill-bridge</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-steel">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-chalk" }}
              className="hover:text-chalk transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/openings"
            className="hidden sm:inline-flex font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-2 text-steel hover:text-chalk transition-colors"
          >
            Recruiter
          </Link>
          <Link
            to="/map"
            className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] px-3.5 py-2 rounded-[6px] bg-signal text-ink font-semibold hover:bg-signal/90 transition-colors"
          >
            Student
          </Link>
        </div>
      </nav>
    </header>
  );
}
