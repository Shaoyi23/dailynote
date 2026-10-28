/**
 * Mock data for the UX lab.
 *
 * Each entry pairs a written note with one of the live demos in
 * `src/components/lab-demos.tsx`.
 */
export type LabDemoKind =
  | "tactile-press"
  | "hold-to-confirm"
  | "elastic-toggle"
  | "magnetic-button"
  | "quiet-focus"
  | "stagger-shelf";

export type LabAccent = "sage" | "clay" | "sky" | "plum";

export type LabExperiment = {
  slug: string;
  title: string;
  date: string;
  demo: LabDemoKind;
  accent: LabAccent;
  caption: string;
  description: string[];
  insight: string;
};

export const labSourceUrl =
  "https://github.com/Shaoyi23/dailynote/blob/main/src/components/lab-demos.tsx";

export const labAccentTints: Record<LabAccent, string> = {
  sage: "radial-gradient(120% 120% at 8% 0%, rgba(151, 171, 145, 0.34), transparent 62%), #f7f2e8",
  clay: "radial-gradient(120% 120% at 92% 0%, rgba(209, 165, 141, 0.32), transparent 62%), #f8f1e8",
  sky: "radial-gradient(120% 120% at 20% 0%, rgba(154, 176, 196, 0.28), transparent 62%), #f4f2eb",
  plum: "radial-gradient(120% 120% at 84% 0%, rgba(188, 158, 184, 0.27), transparent 62%), #f6f1e8",
};

export const labExperiments: LabExperiment[] = [
  {
    slug: "tactile-press",
    title: "tactile press",
    date: "2026-10-28",
    demo: "tactile-press",
    accent: "sage",
    caption: "press the button. it should feel like it has weight.",
    description: [
      "A click is mostly visual. The browser fires the same event whether a button looks pressed or not, so the feeling has to be drawn in the pixels and the timing.",
      "This one drops four pixels, shortens its shadow, and comes back on a short spring. The label changes after the action, but the physical cue starts before it.",
    ],
    insight:
      "the press only needs two cues: a small vertical move and a shadow that gets shorter. anything more turns into a toy.",
  },
  {
    slug: "hold-to-confirm",
    title: "hold to confirm",
    date: "2026-10-27",
    demo: "hold-to-confirm",
    accent: "clay",
    caption: "hold for a moment. let go early and nothing happens.",
    description: [
      "Destructive actions deserve a little friction. A confirmation dialog is safe, but it interrupts the flow and asks for a second decision after the first one.",
      "Holding compresses the decision into one gesture. The ring fills while the pointer stays down, and releasing early quietly cancels the action.",
    ],
    insight:
      "the progress has to be honest. if the ring fills before the action is ready, the delay feels broken; if it fills too slowly, the gesture feels heavy.",
  },
  {
    slug: "elastic-toggle",
    title: "elastic toggle",
    date: "2026-10-25",
    demo: "elastic-toggle",
    accent: "sky",
    caption: "flip it. the knob should arrive, not snap.",
    description: [
      "A toggle is a tiny promise about state. The knob and the track should tell the same story at the same time, without one arriving before the other.",
      "The knob uses a spring with just enough overshoot to feel physical. The track colour follows with a plain transition so the state change is still readable.",
    ],
    insight:
      "springs are most useful when they describe weight. if every part of the control springs, nothing feels solid.",
  },
  {
    slug: "magnetic-button",
    title: "magnetic button",
    date: "2026-10-23",
    demo: "magnetic-button",
    accent: "plum",
    caption: "move your pointer near it. the button leans in.",
    description: [
      "This is a small study in attention. The button moves toward the pointer, but only a few pixels. Most of the effect comes from the expectation of movement, not the distance.",
      "The offset is clamped and released on pointer leave, so it never chases the cursor around the page or escapes its own hit area.",
    ],
    insight:
      "magnetism works best as a whisper. a larger pull stops feeling like attraction and starts feeling like bad aim.",
  },
  {
    slug: "quiet-focus",
    title: "quiet focus",
    date: "2026-10-21",
    demo: "quiet-focus",
    accent: "sage",
    caption: "click the field. the label moves out of the way.",
    description: [
      "Focus states are usually the last thing designed and the first thing removed. This field tries to make the active state feel like a change in posture rather than a bright outline.",
      "The label lifts, the border warms, and a soft ring appears. Typing keeps the label in place so the field never jumps while someone is working.",
    ],
    insight:
      "the label can move without making the field feel busy. one transition, one destination, and no layout shift.",
  },
  {
    slug: "stagger-shelf",
    title: "stagger shelf",
    date: "2026-10-19",
    demo: "stagger-shelf",
    accent: "clay",
    caption: "open the shelf. let the cards arrive one by one.",
    description: [
      "A group of objects entering together reads as one object. A short stagger gives each item a chance to be seen, and gives the whole set a direction.",
      "The cards arrive from below with a small rotation. The delay is short enough to feel connected, but long enough that the eye can follow the sequence.",
    ],
    insight:
      "stagger is a rhythm, not a delay. the interval between items matters more than the duration of each one.",
  },
];

export function getLabExperiment(slug: string) {
  return labExperiments.find((experiment) => experiment.slug === slug);
}

export function getMoreLabExperiments(slug: string, limit = 3) {
  return labExperiments
    .filter((experiment) => experiment.slug !== slug)
    .slice(0, limit);
}

export function formatLabDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
