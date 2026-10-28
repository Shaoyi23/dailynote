"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import type { LabDemoKind } from "@/data/lab";

function TactilePressDemo() {
  const [count, setCount] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (!published) {
      return;
    }

    const timer = window.setTimeout(() => setPublished(false), 1200);
    return () => window.clearTimeout(timer);
  }, [published]);

  return (
    <div className="flex flex-col items-center gap-7">
      <button
        type="button"
        onClick={() => {
          setCount((value) => value + 1);
          setPublished(true);
        }}
        className="min-w-[8rem] rounded-full bg-ink px-8 py-3.5 text-[0.82rem] leading-none text-canvas shadow-[0_6px_0_#9f9788] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#9f9788] active:translate-y-1 active:shadow-[0_2px_0_#9f9788] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2"
      >
        {published ? "published" : "publish"}
      </button>
      <p className="text-meta text-muted" aria-live="polite">
        {count === 0
          ? "press the button"
          : `pressed ${count} ${count === 1 ? "time" : "times"}`}
      </p>
    </div>
  );
}

function HoldToConfirmDemo() {
  const duration = 950;
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!holding) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const next = Math.min(1, (now - startedAt) / duration);
      setProgress(next);

      if (next >= 1) {
        setDone(true);
        setHolding(false);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [holding]);

  const cancel = () => {
    if (!done) {
      setHolding(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-7">
      <button
        type="button"
        aria-label={done ? "deleted, click to reset" : "hold to delete"}
        onPointerDown={(event) => {
          if (done) {
            setDone(false);
            setProgress(0);
            return;
          }
          event.currentTarget.setPointerCapture(event.pointerId);
          setHolding(true);
        }}
        onPointerUp={cancel}
        onPointerCancel={cancel}
        onKeyDown={(event) => {
          if (
            (event.key === " " || event.key === "Enter") &&
            !event.repeat
          ) {
            event.preventDefault();

            if (done) {
              setDone(false);
              setProgress(0);
              return;
            }

            setHolding(true);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            cancel();
          }
        }}
        onBlur={cancel}
        className="relative flex size-40 touch-none select-none items-center justify-center rounded-full bg-canvas/75 ring-1 ring-clay/25 transition-transform duration-150 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/30 focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute inset-0 size-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="text-clay/15"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="text-clay transition-[stroke-dashoffset] duration-75"
          />
        </svg>
        <span className="relative flex flex-col items-center gap-1" aria-live="polite">
          <span className="text-[0.85rem] leading-none text-ink">
            {done ? "deleted" : holding ? "keep holding" : "hold to delete"}
          </span>
          <span className="text-[0.62rem] text-muted">
            {done ? "click to reset" : "release to cancel"}
          </span>
        </span>
      </button>
      <p className="text-meta text-muted">
        {done ? "confirmed in 0.95s" : "pointer or keyboard"}
      </p>
    </div>
  );
}

function ElasticToggleDemo() {
  const [on, setOn] = useState(true);

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex items-center gap-5">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="quiet mode"
          onClick={() => setOn((value) => !value)}
          className={`relative h-11 w-[4.75rem] rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/35 focus-visible:ring-offset-2 ${
            on ? "bg-sage/85" : "bg-ink/15"
          }`}
        >
          <motion.span
            initial={false}
            animate={{ x: on ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 480, damping: 27 }}
            className="block size-9 rounded-full bg-canvas shadow-[0_2px_5px_rgba(58,47,33,0.18)]"
          />
        </button>
        <div className="flex flex-col gap-1">
          <span className="text-body leading-none text-ink">quiet mode</span>
          <span className="text-meta text-muted" aria-live="polite">
            {on ? "notifications are off" : "notifications are on"}
          </span>
        </div>
      </div>
      <p className="font-hand text-[1.02rem] text-ink/50">
        spring, not snap
      </p>
    </div>
  );
}

function MagneticButtonDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pulls, setPulls] = useState(0);
  const reduceMotion = useReducedMotion();

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) {
      return;
    }

    const rect = stageRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const relativeX = event.clientX - (rect.left + rect.width / 2);
    const relativeY = event.clientY - (rect.top + rect.height / 2);

    setOffset({
      x: Math.max(-14, Math.min(14, relativeX * 0.18)),
      y: Math.max(-12, Math.min(12, relativeY * 0.18)),
    });
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative flex h-64 w-full max-w-sm items-center justify-center"
    >
      <span className="absolute size-48 rounded-full border border-dashed border-plum/25" />
      <span className="absolute size-32 rounded-full border border-plum/15" />
      <span className="absolute size-16 rounded-full bg-plum/[0.045]" />
      <motion.button
        type="button"
        onClick={() => setPulls((value) => value + 1)}
        animate={offset}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.4 }}
        whileTap={{ scale: 0.97 }}
        className="relative rounded-full bg-canvas px-6 py-3 text-[0.78rem] text-ink shadow-[0_1px_2px_rgba(58,47,33,0.12),0_10px_24px_-16px_rgba(58,47,33,0.5)] ring-1 ring-line/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/30 focus-visible:ring-offset-2"
      >
        pull me closer
      </motion.button>
      <p className="absolute bottom-0 text-meta text-muted" aria-live="polite">
        {pulls === 0
          ? "move your pointer"
          : `${pulls} ${pulls === 1 ? "pull" : "pulls"}`}
      </p>
    </div>
  );
}

function QuietFocusDemo() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="w-full max-w-[17rem] pt-5">
      <div className="relative">
        <label
          htmlFor="quiet-focus-demo"
          className={`pointer-events-none absolute left-3 transition-all duration-200 ${
            active
              ? "-top-2 text-[0.62rem] text-sage"
              : "top-3 text-[0.78rem] text-muted"
          }`}
        >
          what are you building?
        </label>
        <input
          id="quiet-focus-demo"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? "a quieter inbox" : undefined}
          className="w-full rounded-lg border border-sage/35 bg-canvas/65 px-3 py-3 pt-4 text-[0.82rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/60 focus:border-sage/60 focus:ring-4 focus:ring-sage/10"
        />
      </div>
      <p className="mt-3 text-meta text-muted" aria-live="polite">
        {focused
          ? "the label has stepped aside"
          : value
            ? "kept as a draft"
            : "click the field to focus"}
      </p>
    </div>
  );
}

const shelfItems = [
  { color: "bg-sage/75", rotation: -7 },
  { color: "bg-clay/65", rotation: -2 },
  { color: "bg-sky/60", rotation: 3 },
  { color: "bg-plum/60", rotation: 7 },
  { color: "bg-[#c8b183]", rotation: 10 },
];

function StaggerShelfDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="relative flex h-36 items-end justify-center">
        <span className="absolute inset-x-8 bottom-3 h-px bg-ink/15" />
        <div className="relative flex items-end gap-2 pb-3">
          {shelfItems.map((item, index) => (
            <motion.span
              key={item.rotation}
              initial={false}
              animate={
                open
                  ? { opacity: 1, y: 0, rotate: item.rotation }
                  : { opacity: 0, y: 18, rotate: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay: open ? index * 0.055 : 0,
              }}
              className={`block h-24 w-11 rounded-md border border-white/40 shadow-[0_5px_12px_-8px_rgba(58,47,33,0.5)] ${item.color}`}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-ink/15 bg-canvas/65 px-4 py-2 text-[0.72rem] text-ink transition-colors duration-200 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2"
      >
        {open ? "close shelf" : "open shelf"}
      </button>
    </div>
  );
}

export function LabDemo({ kind }: { kind: LabDemoKind }) {
  return (
    <MotionConfig reducedMotion="user">
      {kind === "tactile-press" ? <TactilePressDemo /> : null}
      {kind === "hold-to-confirm" ? <HoldToConfirmDemo /> : null}
      {kind === "elastic-toggle" ? <ElasticToggleDemo /> : null}
      {kind === "magnetic-button" ? <MagneticButtonDemo /> : null}
      {kind === "quiet-focus" ? <QuietFocusDemo /> : null}
      {kind === "stagger-shelf" ? <StaggerShelfDemo /> : null}
    </MotionConfig>
  );
}
