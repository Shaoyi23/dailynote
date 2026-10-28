"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import type { Track, TrackTurn } from "@/data/tracks";

type FactProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

function Fact({ label, children, className = "" }: FactProps) {
  return (
    <div className={`bg-canvas px-3 py-3 ${className}`}>
      <dt className="text-[0.58rem] uppercase tracking-[0.13em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-[0.82rem] leading-snug text-ink">
        {children}
      </dd>
    </div>
  );
}

function CornerCard({
  track,
  turn,
  onPrevious,
  onNext,
  onOverview,
}: {
  track: Track;
  turn: TrackTurn;
  onPrevious: () => void;
  onNext: () => void;
  onOverview: () => void;
}) {
  return (
    <section
      aria-label={`Turn ${turn.number}: ${turn.name}`}
      className="rounded-xl border border-line/90 bg-[#fbf8f1]/65 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-racing">
            TURN {String(turn.number).padStart(2, "0")} /{" "}
            {String(track.turnCount).padStart(2, "0")}
          </p>
          <h2 className="mt-1.5 text-[1.25rem] leading-tight text-ink">
            {turn.name}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {turn.overtaking ? (
            <span className="rounded-full bg-hivis/40 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] text-ink">
              overtaking
            </span>
          ) : null}
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        <Fact label="entry speed">{turn.speed}</Fact>
        <Fact label="direction">{turn.direction}</Fact>
        <Fact label="corner" className="col-span-2 sm:col-span-1">
          {turn.type}
        </Fact>
      </dl>

      <p className="mt-5 text-body text-pretty text-secondary">
        {turn.description}
      </p>

      <div className="mt-5 border-l-2 border-racing/70 pl-4">
        <p className="text-[0.6rem] uppercase tracking-[0.14em] text-racing">
          the challenge
        </p>
        <p className="mt-1.5 text-body text-pretty text-secondary">
          {turn.challenge}
        </p>
      </div>

      {turn.story ? (
        <div className="mt-5 rounded-lg bg-fill/55 px-4 py-3.5">
          <p className="text-[0.6rem] uppercase tracking-[0.14em] text-muted">
            race story
          </p>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-secondary">
            {turn.story}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-3 py-2 text-[0.68rem] text-ink transition-colors duration-200 hover:bg-fill focus-visible:ring-2 focus-visible:ring-ink/15"
          aria-label="Previous corner"
        >
          <ArrowLeftIcon className="size-3" />
          previous
        </button>

        <button
          type="button"
          onClick={onOverview}
          className="text-[0.65rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          track overview
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-3 py-2 text-[0.68rem] text-ink transition-colors duration-200 hover:bg-fill focus-visible:ring-2 focus-visible:ring-ink/15"
          aria-label="Next corner"
        >
          next
          <ArrowLeftIcon className="size-3 rotate-180" />
        </button>
      </div>
    </section>
  );
}

function TrackOverview({
  track,
  onStart,
}: {
  track: Track;
  onStart: () => void;
}) {
  return (
    <section className="rounded-xl border border-line/90 bg-[#fbf8f1]/65 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-racing">
            TRACK OVERVIEW
          </p>
          <h2 className="mt-1.5 text-[1.2rem] leading-tight text-ink">
            read the lap before you pick a corner.
          </h2>
        </div>
        <span className="hidden rounded-full border border-line bg-canvas px-2.5 py-1 text-[0.62rem] text-muted sm:inline-flex">
          {track.direction}
        </span>
      </div>

      <p className="mt-4 max-w-[54rem] text-body text-pretty text-secondary">
        {track.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.62rem] text-muted/80">
        <span>first gp {track.firstGrandPrix}</span>
        <span aria-hidden="true">·</span>
        <span>{track.laps} laps</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onStart}
          className="rounded-full bg-carbon px-4 py-2.5 text-[0.72rem] text-track transition-colors duration-200 hover:bg-racing focus-visible:ring-2 focus-visible:ring-ink/20"
        >
          start at turn 1
        </button>
        <p className="text-[0.68rem] text-muted">
          hover or tap a marker to explore a corner.
        </p>
      </div>
    </section>
  );
}

export function TrackExplorer({ track }: { track: Track }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);

  const selectedTurn =
    selectedIndex === null ? null : track.turns[selectedIndex];
  const previewTurn =
    hoveredIndex !== null
      ? track.turns[hoveredIndex]
      : hoveredChip !== null
        ? track.turns[hoveredChip]
        : selectedTurn;

  const selectRelative = (offset: number) => {
    setSelectedIndex((current) => {
      if (current === null) {
        return offset < 0 ? track.turns.length - 1 : 0;
      }

      return (current + offset + track.turns.length) % track.turns.length;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-xl border border-carbon/30 bg-carbon shadow-[0_18px_40px_-30px_rgba(28,27,25,0.55)]">
        <div className="flex items-center justify-between gap-4 px-5 pt-4 text-[0.6rem] uppercase tracking-[0.14em] text-track/45">
          <span>circuit map</span>
          <span>{track.turnCount} turns · {track.lengthKm.toFixed(3)} km</span>
        </div>

        <div className="relative">
          <div className="mt-2 overflow-x-auto px-4 pb-3 [scrollbar-color:rgba(244,237,224,0.28)_transparent]">
            <div className="relative min-w-[42rem] sm:min-w-0">
            <svg
              viewBox="0 0 1000 640"
              aria-hidden="true"
              className="block h-auto w-full overflow-visible"
            >
              <path
                d={track.path}
                fill="none"
                stroke="rgba(244,237,224,0.09)"
                strokeWidth="18"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={track.path}
                fill="none"
                stroke="var(--track-line)"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {selectedTurn ? (
                <circle
                  cx={selectedTurn.x}
                  cy={selectedTurn.y}
                  r="25"
                  fill="none"
                  stroke="var(--racing)"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                  opacity="0.9"
                />
              ) : null}
            </svg>

            <div className="absolute inset-0">
              {track.turns.map((turn, index) => {
                const active =
                  selectedIndex === index ||
                  hoveredIndex === index ||
                  hoveredChip === index;

                return (
                  <button
                    key={turn.number}
                    type="button"
                    aria-label={`Turn ${turn.number}: ${turn.name}, ${turn.direction}, ${turn.speed}`}
                    aria-pressed={selectedIndex === index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                    style={{
                      left: `${(turn.x / 1000) * 100}%`,
                      top: `${(turn.y / 640) * 100}%`,
                    }}
                    className={`absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-[0.62rem] transition-[transform,background-color,color,border-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hivis focus-visible:ring-offset-2 focus-visible:ring-offset-carbon ${
                      selectedIndex === index
                        ? "scale-110 border-racing bg-racing text-white shadow-[0_0_0_4px_rgba(210,59,46,0.18)]"
                        : active
                          ? "scale-110 border-hivis bg-track text-carbon"
                          : "border-hivis/20 bg-hivis text-carbon hover:border-track hover:bg-track"
                    }`}
                  >
                    {turn.number}
                  </button>
                );
              })}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-carbon to-transparent sm:hidden" />
        </div>

        <div className="flex flex-col gap-2 border-t border-track/10 px-5 py-3 text-[0.68rem] text-track/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 truncate" aria-live="polite">
            {previewTurn ? (
              <>
                <span className="font-mono text-hivis">
                  T{String(previewTurn.number).padStart(2, "0")}
                </span>{" "}
                · {previewTurn.name} — {previewTurn.type}
              </>
            ) : (
              <>
                <span className="sm:hidden">
                  tap a marker, or swipe the map.
                </span>
                <span className="hidden sm:inline">
                  hover a marker, or tap one to open the corner.
                </span>
              </>
            )}
          </p>
          <p className="shrink-0 text-[0.6rem] text-track/30">
            <span className="sm:hidden">swipe map · </span>
            {track.mapNote}
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[48rem] flex-col gap-5">
        <div className="flex items-start gap-3">
          <p className="shrink-0 pt-2 text-[0.58rem] uppercase tracking-[0.13em] text-muted">
            all corners
          </p>
          <nav
            aria-label="All corners"
            className="-mx-1 flex flex-1 flex-wrap gap-1.5 px-1 pb-1"
          >
            {track.turns.map((turn, index) => (
              <button
                key={turn.number}
                type="button"
                onMouseEnter={() => setHoveredChip(index)}
                onMouseLeave={() => setHoveredChip(null)}
                onFocus={() => setHoveredChip(index)}
                onBlur={() => setHoveredChip(null)}
                onClick={() => setSelectedIndex(index)}
                aria-label={`Select turn ${turn.number}: ${turn.name}`}
                aria-pressed={selectedIndex === index}
                className={`grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[0.62rem] transition-colors duration-150 ${
                  selectedIndex === index
                    ? "border-racing bg-racing text-white"
                    : "border-line bg-canvas/50 text-secondary hover:border-ink/30 hover:text-ink"
                }`}
              >
                {turn.number}
              </button>
            ))}
          </nav>
        </div>

        {selectedTurn && selectedIndex !== null ? (
          <CornerCard
            track={track}
            turn={selectedTurn}
            onPrevious={() => selectRelative(-1)}
            onNext={() => selectRelative(1)}
            onOverview={() => setSelectedIndex(null)}
          />
        ) : (
          <TrackOverview track={track} onStart={() => setSelectedIndex(0)} />
        )}
      </div>
    </div>
  );
}
