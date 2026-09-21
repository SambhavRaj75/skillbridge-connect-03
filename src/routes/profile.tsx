import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmbientGlow } from "@/components/ambient-glow";
import { OpeningCard } from "@/components/opening-card";
import { analyse, parseSkills, tracks, type Analysis } from "@/lib/skill-analysis";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student skill profile — find your best field | Socket" },
      {
        name: "description",
        content:
          "Enter your department, skills and interests to see your strongest field and the internships or placements that fit you best.",
      },
      { property: "og:title", content: "Student skill profile — find your best field" },
      {
        property: "og:description",
        content: "Instant analysis of your skills into a best-fit track plus matching openings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const locations = ["", "Bengaluru", "Pune", "Remote", "Hyderabad"] as const;

const inputClass =
  "w-full rounded-[8px] bg-chalk/5 ring-1 ring-steel/25 focus:ring-signal/60 outline-none px-3 py-2.5 text-[14px] text-chalk placeholder:text-steel/60 transition-shadow";
const labelClass = "font-mono text-[10px] uppercase tracking-[0.16em] text-steel mb-2 block";

function ProfilePage() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skillsRaw, setSkillsRaw] = useState("");
  const [interest, setInterest] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const skills = parseSkills(skillsRaw);
    if (skills.length === 0) {
      setError("Add at least one skill so we can map your profile.");
      setResult(null);
      return;
    }
    setError("");
    setResult(analyse({ name, department, cgpa, skills, interest, preferredLocation }));
  }

  return (
    <div className="min-h-screen bg-ink text-chalk overflow-x-hidden">
      <AmbientGlow />
      <SiteHeader />

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint mb-2">Student channel</p>
        <h1 className="text-balance font-semibold leading-tight text-3xl sm:text-4xl max-w-[22ch]">
          Map your profile, get your best-fit field
        </h1>
        <p className="text-pretty mt-4 max-w-[52ch] text-base text-steel leading-relaxed">
          Tell us what you study and what you can build. Socket scores your skill signature against six
          industry tracks and the live opening board.
        </p>

        <div className="mt-10 grid lg:grid-cols-[minmax(0,380px)_1fr] gap-8 items-start">
          <form onSubmit={onSubmit} className="glass rounded-[14px] p-6 lg:sticky lg:top-6 space-y-5">
            <div>
              <label className={labelClass} htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                className={inputClass}
                value={name}
                maxLength={80}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Rao"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor="dept">
                  Department
                </label>
                <input
                  id="dept"
                  className={inputClass}
                  value={department}
                  maxLength={60}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="CSE"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cgpa">
                  CGPA
                </label>
                <input
                  id="cgpa"
                  className={inputClass}
                  value={cgpa}
                  inputMode="decimal"
                  maxLength={4}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="8.4"
                />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="skills">
                Skills &amp; tools (comma separated)
              </label>
              <textarea
                id="skills"
                className={`${inputClass} min-h-[92px] resize-y`}
                value={skillsRaw}
                maxLength={600}
                onChange={(e) => setSkillsRaw(e.target.value)}
                placeholder="Python, SQL, React, AWS, PyTorch"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="interest">
                Interest area
              </label>
              <select
                id="interest"
                className={inputClass}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="">No preference</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id} className="bg-ink">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="loc">
                Preferred location
              </label>
              <select
                id="loc"
                className={inputClass}
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
              >
                {locations.map((l) => (
                  <option key={l || "any"} value={l} className="bg-ink">
                    {l || "Anywhere"}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="font-mono text-[11px] text-signal">{error}</p>}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center font-mono text-[12px] uppercase tracking-[0.1em] rounded-[8px] bg-signal text-ink font-semibold py-2.5 hover:bg-signal/90 transition-colors"
            >
              Analyse my profile
            </button>
          </form>

          <div className="min-w-0">
            {!result ? (
              <div className="glass rounded-[14px] p-8 text-steel">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel mb-3">Awaiting input</p>
                <p className="text-sm max-w-[46ch] leading-relaxed">
                  Your best-fit field, readiness score, gap list and four matched openings appear here once you
                  submit the form.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="glass rounded-[14px] p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mint mb-2">
                        Best-fit field
                      </p>
                      <h2 className="text-2xl font-semibold">{result.best.track.name}</h2>
                      <p className="text-sm text-steel mt-2 max-w-[44ch]">{result.best.track.blurb}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">Readiness</div>
                      <div className="text-4xl font-semibold text-signal leading-none mt-1">
                        {result.readiness}
                        <span className="text-lg text-steel">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {result.ranked.map((r) => (
                      <div key={r.track.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[12px] text-chalk">{r.track.name}</span>
                          <span className="font-mono text-[11px] text-steel">{r.score}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-steel/20">
                          <div
                            className="h-full rounded-full bg-mint"
                            style={{ width: `${Math.max(r.score, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-steel/15 grid sm:grid-cols-2 gap-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint mb-2">
                        Skills you already have
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.best.matched.length ? (
                          result.best.matched.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-[5px] bg-mint/15 text-mint"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="font-mono text-[11px] text-steel">None matched yet</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal mb-2">
                        Gaps to close
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.best.missing.length ? (
                          result.best.missing.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-[5px] bg-signal/15 text-signal"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="font-mono text-[11px] text-steel">No major gaps</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {result.advice.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-chalk/90">
                        <span className="text-cobalt font-mono">›</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cobalt mb-4">
                    Matched sockets {name ? `for ${name}` : ""}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {result.matches.map((m, i) => (
                      <div key={m.opening.id} className="relative">
                        <span className="absolute -top-2 right-3 z-10 font-mono text-[10px] px-2 py-0.5 rounded-[5px] bg-mint text-ink font-semibold">
                          {m.score}% fit
                        </span>
                        <OpeningCard
                          opening={m.opening}
                          primary={i < 2}
                          applied={applied.includes(m.opening.id)}
                          onApply={(id) => setApplied((prev) => [...prev, id])}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
