import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-steel/15">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center size-8 rounded-[6px] bg-signal/90 text-ink font-mono font-semibold text-sm">
            S
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Socket</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/map"
            className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] bg-signal text-ink font-semibold py-2 px-4 hover:bg-signal/90 transition-colors"
          >
            I'm a student
          </Link>
          <Link
            to="/partners"
            className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] ring-1 ring-steel/30 px-4 py-2 text-chalk hover:ring-steel/60 transition-colors"
          >
            I'm a recruiter
          </Link>
        </div>
        <p className="font-mono text-[10px] text-steel/60">NSDC-aligned · NEP 2020 skill framework</p>
      </div>
    </footer>
  );
}
