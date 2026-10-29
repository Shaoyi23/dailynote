import type { ReactNode } from "react";

function Figure({
  eyebrow,
  title,
  caption,
  children,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-1 overflow-hidden rounded-xl border border-line/80 bg-[#fbf8f1]/70">
      <div className="flex items-start justify-between gap-4 border-b border-line/70 px-4 py-3">
        <div>
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-racing">
            {eyebrow}
          </p>
          <p className="mt-1 text-[0.82rem] leading-snug text-ink">{title}</p>
        </div>
        <span className="shrink-0 rounded-full border border-line/80 px-2 py-1 text-[0.52rem] uppercase tracking-[0.12em] text-muted">
          diagram
        </span>
      </div>
      <div className="p-4">{children}</div>
      <figcaption className="border-t border-line/60 px-4 py-2.5 text-[0.62rem] leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  vertical = false,
  responsive = false,
}: {
  vertical?: boolean;
  responsive?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center font-mono text-[0.8rem] text-muted/60 ${
        vertical ? "h-4" : "px-1"
      } ${responsive ? "rotate-90 sm:rotate-0" : ""}`}
    >
      {vertical ? "↓" : "→"}
    </span>
  );
}

function MiniCard({
  label,
  code,
  result,
  tone,
}: {
  label: string;
  code: string;
  result: string;
  tone: "sage" | "clay" | "sky" | "plum";
}) {
  const toneClasses = {
    sage: "border-sage/20 bg-sage/[0.055]",
    clay: "border-clay/20 bg-clay/[0.055]",
    sky: "border-sky/20 bg-sky/[0.055]",
    plum: "border-plum/20 bg-plum/[0.055]",
  }[tone];

  return (
    <div className={`rounded-lg border p-3 ${toneClasses}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[0.56rem] uppercase tracking-[0.12em] text-muted">
          {label}
        </span>
        <span className="font-mono text-[0.64rem] text-ink">{code}</span>
      </div>
      <div className="mt-2 font-mono text-[0.7rem] text-secondary">
        {result}
      </div>
    </div>
  );
}

export function ThisBindingDiagram() {
  return (
    <Figure
      eyebrow="mental model"
      title="the call site chooses this"
      caption="Read the left side as the way the function is invoked, and the right side as the value of this inside it. Arrow functions are the exception: they look one level outward."
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.62rem] text-muted">
        <span className="font-mono text-ink">how is it called?</span>
        <Arrow />
        <span>what does this point to?</span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <MiniCard
          label="method call"
          code="obj.method()"
          result="this = obj"
          tone="sage"
        />
        <MiniCard
          label="plain call"
          code="fn()"
          result="this = undefined *"
          tone="clay"
        />
        <MiniCard
          label="constructor"
          code="new Fn()"
          result="this = the new object"
          tone="sky"
        />
        <MiniCard
          label="explicit"
          code="fn.call(obj)"
          result="this = obj"
          tone="plum"
        />
      </div>

      <div className="mt-2 rounded-lg border border-dashed border-line bg-canvas/65 px-3 py-2.5 text-[0.68rem] leading-relaxed text-secondary">
        <span className="font-mono text-ink">arrow function</span> — no this of
        its own. It closes over the this of the surrounding scope.
      </div>
      <p className="mt-2 text-[0.56rem] leading-relaxed text-muted">
        * In non-strict scripts, a plain call falls back to the global object.
        ES modules and class bodies are strict by default.
      </p>
    </Figure>
  );
}

export function CallApplyBindDiagram() {
  return (
    <Figure
      eyebrow="same job, three shapes"
      title="you are choosing this and the arguments"
      caption="call and apply run the function immediately. bind returns a new function with this already attached, which is why bind is the one you use for later."
    >
      <div className="flex justify-center">
        <div className="rounded-full bg-carbon px-4 py-2 font-mono text-[0.68rem] text-track">
          function
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-sage/20 bg-sage/[0.055] p-3">
          <p className="text-[0.56rem] uppercase tracking-[0.12em] text-sage">
            call
          </p>
          <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-ink">
            fn.call(obj, 1, 2)
          </p>
          <p className="mt-2 text-[0.64rem] leading-relaxed text-secondary">
            arguments listed one by one
          </p>
          <p className="mt-2 font-mono text-[0.58rem] text-muted">
            runs now → result
          </p>
        </div>

        <div className="rounded-lg border border-sky/20 bg-sky/[0.055] p-3">
          <p className="text-[0.56rem] uppercase tracking-[0.12em] text-sky">
            apply
          </p>
          <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-ink">
            fn.apply(obj, [1, 2])
          </p>
          <p className="mt-2 text-[0.64rem] leading-relaxed text-secondary">
            arguments packed in an array
          </p>
          <p className="mt-2 font-mono text-[0.58rem] text-muted">
            runs now → result
          </p>
        </div>

        <div className="rounded-lg border border-hivis/70 bg-hivis/20 p-3">
          <p className="text-[0.56rem] uppercase tracking-[0.12em] text-ink">
            bind
          </p>
          <p className="mt-2 font-mono text-[0.65rem] leading-relaxed text-ink">
            const f = fn.bind(obj, 1)
          </p>
          <p className="mt-2 text-[0.64rem] leading-relaxed text-secondary">
            keeps this and part of the args
          </p>
          <p className="mt-2 font-mono text-[0.58rem] text-muted">
            returns a function
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-canvas/65 px-3 py-2 text-[0.6rem] text-muted">
        <span>
          <span className="font-mono text-ink">call</span> = comma list
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <span className="font-mono text-ink">apply</span> = array
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <span className="font-mono text-ink">bind</span> = a prepared copy
        </span>
      </div>
    </Figure>
  );
}

function QueueBox({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "carbon" | "sky" | "plum" | "clay" | "sage";
}) {
  const toneClass = {
    carbon: "border-carbon/25 bg-carbon text-track",
    sky: "border-sky/20 bg-sky/[0.06]",
    plum: "border-plum/20 bg-plum/[0.06]",
    clay: "border-clay/20 bg-clay/[0.06]",
    sage: "border-sage/20 bg-sage/[0.06]",
  }[tone];
  const labelClass = tone === "carbon" ? "text-track/45" : "text-muted";
  const itemClass = tone === "carbon" ? "text-track/75" : "text-secondary";

  return (
    <div className={`rounded-lg border p-3 ${toneClass}`}>
      <p
        className={`text-[0.54rem] uppercase tracking-[0.12em] ${labelClass}`}
      >
        {label}
      </p>
      <div className="mt-2 flex flex-col gap-1">
        {items.map((item) => (
          <span
            key={item}
            className={`font-mono text-[0.6rem] leading-relaxed ${itemClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EventLoopDiagram() {
  return (
    <Figure
      eyebrow="mental model"
      title="one stack, a few queues, one loop"
      caption="JavaScript runs one task at a time. When a task finishes, the event loop drains every microtask before it picks up the next task. Timers and network replies wait outside the stack until they are ready."
    >
      <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <QueueBox
          label="call stack"
          items={["console.log('A')", "runLoop()", "…"]}
          tone="carbon"
        />
        <Arrow responsive />
        <QueueBox
          label="web apis / timers"
          items={["setTimeout(…, 0)", "fetch(…)", "click handlers"]}
          tone="sky"
        />
      </div>

      <div className="mt-2 grid items-stretch gap-2 sm:grid-cols-[1fr_1fr_1fr]">
        <QueueBox
          label="microtask queue — first"
          items={["Promise.then", "queueMicrotask"]}
          tone="plum"
        />
        <QueueBox
          label="task queue — next"
          items={["setTimeout", "DOM events"]}
          tone="clay"
        />
        <QueueBox
          label="event loop"
          items={["1. drain microtasks", "2. run one task"]}
          tone="sage"
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-carbon px-3 py-2.5 font-mono text-[0.58rem] text-track/70">
        <span className="text-hivis">sync</span>
        <Arrow />
        <span className="text-plum">microtasks</span>
        <Arrow />
        <span className="text-clay">one task</span>
        <Arrow />
        <span className="text-track">render, then repeat</span>
      </div>
    </Figure>
  );
}
