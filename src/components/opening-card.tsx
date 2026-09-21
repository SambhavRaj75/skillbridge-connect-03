import type { Opening } from "@/lib/socket-data";

const typeStyles: Record<Opening["type"], string> = {
  Internship: "bg-mint/15 text-mint",
  Placement: "bg-signal/15 text-signal",
  Project: "bg-cobalt/15 text-cobalt",
};

export function OpeningCard({
  opening,
  primary = false,
  onApply,
  applied = false,
}: {
  opening: Opening;
  primary?: boolean;
  onApply?: (id: string) => void;
  applied?: boolean;
}) {
  return (
    <article className="glass rounded-[14px] p-5 hover:-translate-y-1 transition-transform">
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-[5px] ${typeStyles[opening.type]}`}
        >
          {opening.type}
        </span>
        <span className="font-mono text-[10px] text-steel">{opening.meta}</span>
      </div>
      <h3 className="mt-3 text-[17px] font-semibold text-chalk">{opening.title}</h3>
      <p className="font-mono text-[12px] text-steel mt-1">
        {opening.company} · {opening.location}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {opening.skills.map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] px-2 py-0.5 rounded-[5px] bg-chalk/5 text-steel ring-1 ring-chalk/10"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[12px] text-chalk">{opening.pay}</span>
        <button
          onClick={() => onApply?.(opening.id)}
          disabled={applied}
          className={
            applied
              ? "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] ring-1 ring-mint/50 text-mint py-2 px-3.5"
              : primary
                ? "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] bg-signal text-ink font-semibold py-2 px-3.5 hover:bg-signal/90 transition-colors"
                : "inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.1em] rounded-[7px] ring-1 ring-steel/30 text-chalk py-2 px-3.5 hover:ring-steel/60 transition-colors"
          }
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </article>
  );
}
