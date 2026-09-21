import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientGlow } from "@/components/ambient-glow";
import { partners, openings } from "@/lib/socket-data";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Industry partners & posting a socket | Socket" },
      {
        name: "description",
        content:
          "400+ employers hire through Socket. Post a role with its skill signature and receive pre-mapped campus candidates.",
      },
      { property: "og:title", content: "Industry partners & posting a socket" },
      {
        property: "og:description",
        content: "Post a role with its skill signature and receive pre-mapped campus candidates.",
      },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <div className="min-h-screen bg-ink text-chalk overflow-x-hidden">
      <AmbientGlow />
      <SiteHeader />

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt mb-2">Recruiter channel</p>
        <h1 className="text-balance font-semibold leading-tight text-3xl sm:text-4xl max-w-[26ch]">
          Post a socket. Receive pre-mapped candidates.
        </h1>
        <p className="text-pretty mt-4 max-w-[52ch] text-base text-steel leading-relaxed">
          Define the skill signature for a role and Socket routes it to the departments already scoring against
          it — with the training gap flagged before the interview.
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-[14px] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">01</div>
            <h2 className="mt-3 text-[17px] font-semibold">Define the signature</h2>
            <p className="font-mono text-[12px] text-steel mt-2 leading-relaxed">
              Skills, seniority, city, stipend band. Takes about four minutes.
            </p>
          </div>
          <div className="glass rounded-[14px] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">02</div>
            <h2 className="mt-3 text-[17px] font-semibold">Match against campus supply</h2>
            <p className="font-mono text-[12px] text-steel mt-2 leading-relaxed">
              38 departments scored live, ranked by fit rather than CGPA alone.
            </p>
          </div>
          <div className="glass rounded-[14px] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">03</div>
            <h2 className="mt-3 text-[17px] font-semibold">Interview and place</h2>
            <p className="font-mono text-[12px] text-steel mt-2 leading-relaxed">
              Offer tracking, joining status and intern conversion in one board.
            </p>
          </div>
        </div>

        <div className="mt-6 glass rounded-[14px] p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[12px] text-steel">
            {openings.length} sockets live right now across {new Set(openings.map((o) => o.company)).size}{" "}
            companies.
          </p>
          <Link
            to="/openings"
            className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] bg-signal text-ink font-semibold py-2 px-4 hover:bg-signal/90 transition-colors"
          >
            View the board
          </Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel mb-5">
          Wired into 400+ employers
        </p>
        <div className="grid sm:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p} className="glass rounded-[14px] px-5 py-6 font-mono text-[13px] text-chalk">
              {p}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
