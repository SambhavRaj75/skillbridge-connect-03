import { skillGaps } from "@/lib/socket-data";

export function SkillGapPanel({ rows = skillGaps }: { rows?: typeof skillGaps }) {
  return (
    <div className="glass rounded-[16px] p-6 sm:p-8">
      <div className="space-y-6">
        {rows.map((row) => (
          <div key={row.skill}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[12px] text-chalk">{row.skill}</span>
              <span className="font-mono text-[11px] text-steel">
                gap{" "}
                <span className={row.gap >= 0 ? "text-mint" : "text-signal"}>
                  {row.gap > 0 ? `+${row.gap}` : row.gap}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="flex justify-end">
                <div className="h-2.5 rounded-full bg-mint/25 w-full">
                  <div
                    className="h-full rounded-full bg-mint bar-fill"
                    style={{ "--w": `${row.supply}%` } as React.CSSProperties}
                  />
                </div>
              </div>
              <span className="size-1.5 rounded-full bg-signal shrink-0" />
              <div>
                <div className="h-2.5 rounded-full bg-signal/25 w-full">
                  <div
                    className="h-full rounded-full bg-signal bar-fill"
                    style={{ "--w": `${row.demand}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-5 border-t border-steel/15 grid sm:grid-cols-3 gap-4 font-mono text-[11px]">
        <div>
          <div className="text-lg text-chalk font-semibold">1,204</div>
          <div className="text-steel">skills mapped</div>
        </div>
        <div>
          <div className="text-lg text-chalk font-semibold">38</div>
          <div className="text-steel">departments wired</div>
        </div>
        <div>
          <div className="text-lg text-mint font-semibold">71%</div>
          <div className="text-steel">avg. match score</div>
        </div>
      </div>
    </div>
  );
}
