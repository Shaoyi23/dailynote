import Link from "next/link";
import { formatLabDate, type LabExperiment } from "@/data/lab";

export function LabMoreList({
  experiments,
}: {
  experiments: LabExperiment[];
}) {
  return (
    <ul className="-mx-4 flex flex-col gap-1">
      {experiments.map((experiment) => (
        <li key={experiment.slug}>
          <Link
            href={`/ux-lab/${experiment.slug}`}
            title={experiment.title}
            className="group relative flex items-center gap-3 rounded-full px-4 py-2 transition-colors duration-200 hover:bg-fill active:bg-fill-hover focus-visible:ring-2 focus-visible:ring-ink/15"
          >
            <span className="min-w-0 shrink truncate text-body leading-tight text-ink">
              {experiment.title}
            </span>
            <span
              aria-hidden="true"
              className="h-px min-w-4 flex-1 bg-line/70 transition-colors duration-200 group-hover:bg-line"
            />
            <time
              dateTime={experiment.date}
              className="shrink-0 text-meta text-muted"
            >
              {formatLabDate(experiment.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
