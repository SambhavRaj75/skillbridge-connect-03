import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientGlow } from "@/components/ambient-glow";
import { OpeningCard } from "@/components/opening-card";
import { openings, type OpeningType } from "@/lib/socket-data";

export const Route = createFileRoute("/openings")({
  head: () => ({
    meta: [
      { title: "Open sockets — internships & placements | Socket" },
      {
        name: "description",
        content:
          "Browse live internships, placements and industry projects filtered by type, city and stipend.",
      },
      { property: "og:title", content: "Open sockets — internships & placements" },
      {
        property: "og:description",
        content: "Live internship and placement openings from 400+ industry partners.",
      },
    ],
  }),
  component: Openings,
});

const types: OpeningType[] = ["Internship", "Placement", "Project"];
const cities = ["Bengaluru", "Pune", "Hyderabad", "Remote"] as const;

function Openings() {
  const [activeTypes, setActiveTypes] = useState<OpeningType[]>([]);
  const [activeCities, setActiveCities] = useState<string[]>([]);
  const [minStipend, setMinStipend] = useState(25000);
  const [applied, setApplied] = useState<string[]>([]);

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = openings.filter(
    (o) =>
      (activeTypes.length === 0 || activeTypes.includes(o.type)) &&
      (activeCities.length === 0 || activeCities.includes(o.location)) &&
      o.stipendPerMonth >= minStipend,
  );

  return (
    <div className="min-h-screen bg-ink text-chalk overflow-x-hidden">
      <AmbientGlow />
      <SiteHeader />

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-20">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt mb-2">Opportunity board</p>
          <h1 className="text-balance font-semibold leading-tight text-3xl sm:text-4xl">
            Live sockets · internships &amp; placements
          </h1>
          <p className="font-mono text-[11px] text-steel mt-3">
            {results.length} of {openings.length} openings match your filters
          </p>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-6 glass rounded-[14px] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel mb-4">Filter board</p>
            <div className="space-y-5 font-mono text-[11px]">
              <div>
                <p className="text-steel mb-2">Type</p>
                {types.map((t) => {
                  const on = activeTypes.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggle(activeTypes, setActiveTypes, t)}
                      className={`flex items-center gap-2 py-0.5 ${on ? "text-chalk" : "text-steel"}`}
                    >
                      <span
                        className={
                          on
                            ? "size-3.5 rounded-[4px] bg-signal grid place-items-center text-ink text-[9px] leading-none"
                            : "size-3.5 rounded-[4px] ring-1 ring-steel/40"
                        }
                      >
                        {on ? "✓" : ""}
                      </span>
                      {t}
                    </button>
                  );
                })}
              </div>
              <div>
                <p className="text-steel mb-2">Location</p>
                {cities.map((c) => {
                  const on = activeCities.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggle(activeCities, setActiveCities, c)}
                      className={`flex items-center gap-2 py-0.5 ${on ? "text-chalk" : "text-steel"}`}
                    >
                      <span
                        className={
                          on
                            ? "size-3.5 rounded-[4px] bg-cobalt grid place-items-center text-ink text-[9px] leading-none"
                            : "size-3.5 rounded-[4px] ring-1 ring-steel/40"
                        }
                      >
                        {on ? "✓" : ""}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>
              <div>
                <p className="text-steel mb-2">Min stipend</p>
                <input
                  type="range"
                  min={20000}
                  max={80000}
                  step={1000}
                  value={minStipend}
                  onChange={(e) => setMinStipend(Number(e.target.value))}
                  className="w-full accent-mint"
                  aria-label="Minimum stipend per month"
                />
                <p className="text-mint mt-2">₹{(minStipend / 1000).toFixed(0)}k / mo → ₹80k / mo</p>
              </div>
            </div>
          </aside>

          <div className="grid sm:grid-cols-2 gap-4">
            {results.map((o, i) => (
              <OpeningCard
                key={o.id}
                opening={o}
                primary={i < 2}
                applied={applied.includes(o.id)}
                onApply={(id) => setApplied((a) => [...a, id])}
              />
            ))}
            {results.length === 0 && (
              <p className="font-mono text-[12px] text-steel">No sockets match. Loosen a filter.</p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
