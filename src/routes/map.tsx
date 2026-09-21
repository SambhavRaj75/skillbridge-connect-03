import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientGlow } from "@/components/ambient-glow";
import { SkillGapPanel } from "@/components/skill-gap-panel";
import { skillGaps } from "@/lib/socket-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Skill-gap matrix — campus supply vs employer demand | Socket" },
      {
        name: "description",
        content:
          "See how campus skill supply compares with live employer demand across departments, and which gaps to close first.",
      },
      { property: "og:title", content: "Skill-gap matrix — campus supply vs employer demand" },
      {
        property: "og:description",
        content: "Department-level skill mapping against real hiring demand.",
      },
    ],
  }),
  component: SkillMap,
});

function SkillMap() {
  const worst = [...skillGaps].sort((a, b) => a.gap - b.gap).slice(0, 3);

  return (
    <div className="min-h-screen bg-ink text-chalk overflow-x-hidden">
      <AmbientGlow />
      <SiteHeader />

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">Skill-gap matrix</p>
        <h1 className="text-balance font-semibold leading-tight text-3xl sm:text-4xl max-w-[24ch]">
          Campus supply vs. employer demand
        </h1>
        <p className="text-pretty mt-4 max-w-[52ch] text-base text-steel leading-relaxed">
          Every department is scored against the skill signatures employers post. Negative gaps are where
          training should go next term.
        </p>

        <div className="mt-8">
          <SkillGapPanel />
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint mb-5">Close these first</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {worst.map((g) => (
            <div key={g.skill} className="glass rounded-[14px] p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal">gap {g.gap}</div>
              <h2 className="mt-3 text-[17px] font-semibold">{g.skill}</h2>
              <p className="font-mono text-[12px] text-steel mt-1">
                supply {g.supply}% · demand {g.demand}%
              </p>
              <Link
                to="/openings"
                className="mt-5 inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] ring-1 ring-steel/30 py-2 px-3.5 text-chalk hover:ring-steel/60 transition-colors"
              >
                See matching sockets
              </Link>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
