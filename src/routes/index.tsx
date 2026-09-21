import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientGlow } from "@/components/ambient-glow";
import { SkillGapPanel } from "@/components/skill-gap-panel";
import { OpeningCard } from "@/components/opening-card";
import { openings, partners, skillGaps } from "@/lib/socket-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Socket — Academia × Industry skill bridge" },
      {
        name: "description",
        content:
          "Socket maps campus skills against live employer demand, then routes students to matching internships and placements.",
      },
      { property: "og:title", content: "Socket — Academia × Industry skill bridge" },
      {
        property: "og:description",
        content: "Skill-gap mapping, internships and placements in one portal for students and recruiters.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-ink text-chalk overflow-x-hidden">
      <AmbientGlow />
      <SiteHeader />

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-16">
        <div className="relative">
          <div className="hidden lg:block absolute inset-0 -z-10 gridlines" />
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="glass rounded-[14px] p-8 sm:p-10 -skew-y-1">
                <div className="skew-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint mb-5">
                    Academia × Industry · Skill Bridge
                  </p>
                  <h1 className="text-balance font-semibold leading-none text-3xl sm:text-4xl xl:text-5xl">
                    Plug your campus skills into industry sockets.
                  </h1>
                  <p className="text-pretty mt-5 max-w-[46ch] text-base text-steel leading-relaxed">
                    Socket maps what your department actually teaches against what 400+ employers need — then
                    routes your next internship or placement to the opening that fits the gap.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to="/profile"
                      className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] rounded-[8px] bg-signal text-ink font-semibold py-2 pr-4 pl-3 hover:bg-signal/90 transition-colors"
                    >
                      <span className="size-2 rounded-full bg-ink/70" /> Scan my skill gap
                    </Link>
                    <Link
                      to="/partners"
                      className="inline-flex items-center font-mono text-[12px] uppercase tracking-[0.1em] rounded-[8px] ring-1 ring-steel/30 px-4 py-2 text-chalk hover:ring-steel/60 transition-colors"
                    >
                      Post an opening
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="glass rounded-[14px] p-6 skew-y-1">
                <div className="-skew-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
                      Student channel
                    </span>
                    <span className="font-mono text-[10px] text-mint">live</span>
                  </div>
                  <p className="text-sm text-chalk/90">
                    Self-map → match → apply. 2,140 students bridged this term.
                  </p>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-steel">
                    <span className="size-6 rounded-full bg-cobalt/30 grid place-items-center text-cobalt">A</span>
                    <span className="size-6 rounded-full bg-mint/25 grid place-items-center text-mint -ml-2">R</span>
                    <span className="size-6 rounded-full bg-signal/25 grid place-items-center text-signal -ml-2">
                      K
                    </span>
                    <span className="ml-1">+1,892 mapping now</span>
                  </div>
                </div>
              </div>
              <div className="glass rounded-[14px] p-6 -skew-y-1">
                <div className="skew-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
                      Recruiter channel
                    </span>
                    <span className="font-mono text-[10px] text-cobalt">verified</span>
                  </div>
                  <p className="text-sm text-chalk/90">
                    Post a socket, define the skill signature, receive pre-mapped candidates.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["HDFC Bank", "TCS", "Zoho"].map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[10px] px-2 py-1 rounded-[5px] bg-cobalt/15 text-cobalt ring-1 ring-cobalt/25"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">Skill-gap matrix</p>
            <h2 className="text-balance font-semibold leading-tight text-2xl sm:text-3xl max-w-[24ch]">
              Campus supply vs. employer demand
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-steel">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-mint" />
              Supply
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-signal" />
              Demand
            </span>
          </div>
        </div>
        <SkillGapPanel rows={skillGaps.slice(0, 4)} />
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-20">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt mb-2">Opportunity board</p>
          <h2 className="text-balance font-semibold leading-tight text-2xl sm:text-3xl">
            Live sockets · internships &amp; placements
          </h2>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-6 glass rounded-[14px] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel mb-4">Filter board</p>
            <div className="space-y-4 font-mono text-[11px]">
              <div>
                <p className="text-steel mb-2">Type</p>
                <p className="flex items-center gap-2 text-chalk">
                  <span className="size-3.5 rounded-[4px] bg-signal grid place-items-center text-ink text-[9px] leading-none">
                    ✓
                  </span>
                  Internship
                </p>
                <p className="flex items-center gap-2 text-steel">
                  <span className="size-3.5 rounded-[4px] ring-1 ring-steel/40" />
                  Placement
                </p>
                <p className="flex items-center gap-2 text-steel">
                  <span className="size-3.5 rounded-[4px] ring-1 ring-steel/40" />
                  Project
                </p>
              </div>
              <div>
                <p className="text-steel mb-2">Location</p>
                <p className="flex items-center gap-2 text-chalk">
                  <span className="size-3.5 rounded-[4px] bg-cobalt grid place-items-center text-ink text-[9px] leading-none">
                    ✓
                  </span>
                  Bengaluru
                </p>
                <p className="flex items-center gap-2 text-steel">
                  <span className="size-3.5 rounded-[4px] ring-1 ring-steel/40" />
                  Pune
                </p>
                <p className="flex items-center gap-2 text-steel">
                  <span className="size-3.5 rounded-[4px] ring-1 ring-steel/40" />
                  Remote
                </p>
              </div>
              <div>
                <p className="text-steel mb-2">Stipend</p>
                <div className="h-1.5 rounded-full bg-steel/20 mt-2">
                  <div className="h-full rounded-full bg-mint" style={{ width: "40%" }} />
                </div>
                <p className="text-mint mt-2">₹25k / mo → ₹80k / mo</p>
              </div>
              <Link
                to="/openings"
                className="inline-flex items-center justify-center w-full font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] ring-1 ring-steel/30 py-2 text-chalk hover:ring-steel/60 transition-colors"
              >
                Open full board
              </Link>
            </div>
          </aside>

          <div className="grid sm:grid-cols-2 gap-4">
            {openings.slice(0, 4).map((o, i) => (
              <OpeningCard key={o.id} opening={o} primary={i < 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel mb-5">
          Wired into 400+ employers
        </p>
        <div className="glass rounded-[14px] px-6 py-6 overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-[13px]">
            {partners.map((p, i) => (
              <span key={p} className={i % 4 === 0 ? "font-semibold text-chalk" : "text-steel"}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
