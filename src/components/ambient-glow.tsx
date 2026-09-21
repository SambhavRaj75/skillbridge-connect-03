export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-cobalt/25 blur-[120px]" />
      <div className="absolute top-1/2 -left-40 h-[460px] w-[460px] rounded-full bg-mint/15 blur-[120px]" />
    </div>
  );
}
