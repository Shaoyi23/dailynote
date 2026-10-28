import type { LabDemoKind } from "@/data/lab";

function TactilePreview() {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <span className="absolute -inset-x-8 -inset-y-6 rounded-full bg-white/25 blur-xl" />
      <span className="relative rounded-full bg-ink px-6 py-2.5 text-[0.66rem] leading-none text-canvas shadow-[0_5px_0_#9f9788] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_0_#9f9788]">
        publish
      </span>
      <span className="relative font-hand text-[0.8rem] text-ink/45">
        press me
      </span>
    </div>
  );
}

function HoldPreview() {
  return (
    <div className="relative flex size-36 items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-clay/15"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="270.18"
          strokeDashoffset="74"
          className="text-clay/70"
        />
      </svg>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[0.7rem] text-ink">hold</span>
        <span className="text-[0.58rem] text-muted">release to cancel</span>
      </div>
    </div>
  );
}

function TogglePreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="relative h-10 w-[4.5rem] rounded-full bg-sage/80 p-1">
          <span className="absolute right-1 top-1 size-8 rounded-full bg-canvas shadow-[0_2px_5px_rgba(58,47,33,0.18)] transition-transform duration-300 group-hover:-translate-x-1" />
        </span>
        <span className="flex flex-col gap-0.5 text-left">
          <span className="text-[0.7rem] text-ink">quiet mode</span>
          <span className="text-[0.58rem] text-muted">on</span>
        </span>
      </div>
      <span className="font-hand text-[0.8rem] text-ink/45">it arrived</span>
    </div>
  );
}

function MagneticPreview() {
  return (
    <div className="relative flex size-40 items-center justify-center">
      <span className="absolute size-32 rounded-full border border-dashed border-plum/25" />
      <span className="absolute size-20 rounded-full border border-plum/15" />
      <span className="relative -translate-x-3 -translate-y-2 rounded-full bg-canvas px-5 py-2 text-[0.64rem] text-ink shadow-[0_1px_2px_rgba(58,47,33,0.12),0_7px_16px_-10px_rgba(58,47,33,0.4)] ring-1 ring-line/80 transition-transform duration-300 group-hover:translate-x-0 group-hover:-translate-y-3">
        pull me closer
      </span>
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-5 right-7 size-4 text-plum/65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 3 4.8 17 2.7-6.5L19 11 5 3Z" />
      </svg>
    </div>
  );
}

function FocusPreview() {
  return (
    <div className="w-full max-w-[13rem]">
      <div className="relative rounded-md border border-sage/35 bg-canvas/70 px-3 pb-2.5 pt-4 ring-4 ring-sage/10 transition-shadow duration-300 group-hover:ring-sage/15">
        <span className="absolute -top-2 left-2.5 bg-[#f7f2e8] px-1 text-[0.54rem] text-sage">
          what are you building?
        </span>
        <span className="text-[0.68rem] text-ink/80">a quieter inbox</span>
        <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-sage/80 align-middle" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.55rem] text-muted">
        <span>label lift</span>
        <span>soft ring</span>
      </div>
    </div>
  );
}

function ShelfPreview() {
  return (
    <div className="relative flex h-32 w-40 items-end justify-center pb-5">
      <span className="absolute inset-x-3 bottom-5 h-px bg-ink/15" />
      {[
        "bg-sage/70 rotate-[-7deg] translate-x-5",
        "bg-clay/60 rotate-[-2deg] translate-x-1",
        "bg-sky/55 rotate-[3deg] -translate-x-3",
        "bg-plum/55 rotate-[9deg] -translate-x-7",
      ].map((className, index) => (
        <span
          key={index}
          className={`absolute bottom-4 h-20 w-10 rounded-md border border-white/35 shadow-[0_5px_12px_-8px_rgba(58,47,33,0.5)] transition-transform duration-300 ${className} ${
            index === 3 ? "group-hover:-translate-y-1" : ""
          }`}
        />
      ))}
      <span className="absolute bottom-0 font-hand text-[0.76rem] text-ink/45">
        one by one
      </span>
    </div>
  );
}

export function LabPreview({ kind }: { kind: LabDemoKind }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex size-full items-center justify-center overflow-hidden p-5"
    >
      {kind === "tactile-press" ? <TactilePreview /> : null}
      {kind === "hold-to-confirm" ? <HoldPreview /> : null}
      {kind === "elastic-toggle" ? <TogglePreview /> : null}
      {kind === "magnetic-button" ? <MagneticPreview /> : null}
      {kind === "quiet-focus" ? <FocusPreview /> : null}
      {kind === "stagger-shelf" ? <ShelfPreview /> : null}
    </div>
  );
}
