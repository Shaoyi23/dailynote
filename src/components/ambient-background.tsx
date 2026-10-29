export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-wash absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute -left-24 top-[12%] size-80 rounded-full bg-[#cfe0c8]/40 blur-3xl" />
      <div className="absolute -right-20 top-[38%] size-96 rounded-full bg-[#f3d8c0]/35 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/45" />
    </div>
  );
}
