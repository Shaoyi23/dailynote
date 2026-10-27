/**
 * Blog content lives here.
 *
 * Add a new object to the top of `posts` and the list page, article page,
 * static params, and sitemap will pick it up automatically.
 */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "the-first-five-seconds",
    title: "the first five seconds",
    description:
      "First impressions are mostly pacing, hierarchy, and how quickly a page tells you what it is.",
    date: "2026-10-25",
    readingTime: "3 min read",
    content: [
      {
        type: "paragraph",
        text: "Most product pages ask for attention before they have earned it. A logo animates in, a gradient breathes, a headline waits for its moment. None of it matters if the page has not told me what it is and what I can do next.",
      },
      {
        type: "heading",
        text: "keep the first screen honest",
      },
      {
        type: "paragraph",
        text: "The opening screen is not a poster. It is a conversation. The fastest interfaces make the first move small: one clear sentence, one obvious action, and enough visual rhythm that my eye knows where to land without being pushed.",
      },
      {
        type: "quote",
        text: "Clarity is a form of speed.",
      },
      {
        type: "paragraph",
        text: "I keep a short checklist when a screen feels louder than it needs to be. Usually the answer is not another feature. It is removing the thing that made me explain the page in the first place.",
      },
      {
        type: "list",
        items: [
          "Say what the product is in plain language.",
          "Make the primary action visible before it is clever.",
          "Let motion explain a change, not decorate a silence.",
        ],
      },
    ],
  },
  {
    slug: "the-quiet-work-of-interface-details",
    title: "the quiet work of interface details",
    description:
      "Small details are not polish at the end. They are how a product decides what it feels like to use.",
    date: "2026-10-12",
    readingTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "The parts of an interface I remember are rarely the big ones. A button that settles instead of snapping. An empty state that says something true. A focus ring that appears exactly when it should.",
      },
      {
        type: "heading",
        text: "details are decisions",
      },
      {
        type: "paragraph",
        text: "It is tempting to treat detail work as a final pass, something to do after the real product is finished. But the line height, the delay before a tooltip, and the wording of an error message are all product decisions. They just happen to live in the seams.",
      },
      {
        type: "paragraph",
        text: "When those seams are ignored, people do not usually complain. They just feel slightly less certain. The cost is hard to measure, which is exactly why it is easy to skip.",
      },
      {
        type: "quote",
        text: "Good detail work is mostly the removal of tiny moments of doubt.",
      },
      {
        type: "paragraph",
        text: "I try to leave a little room in every build for this kind of work. Not because it photographs well, but because it is the difference between a product that works and one that feels considered.",
      },
    ],
  },
  {
    slug: "what-local-first-changes-about-feedback",
    title: "what local-first changes about feedback",
    description:
      "When the interface answers immediately, we have to rethink what loading, saving, and failure should feel like.",
    date: "2026-09-28",
    readingTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "A local-first interface changes the emotional shape of a product. The work happens where I am. The screen answers before a network request has time to become a question mark.",
      },
      {
        type: "heading",
        text: "the end of the false pause",
      },
      {
        type: "paragraph",
        text: "We are used to designing around waiting. Spinners, skeletons, optimistic saves, offline banners. Some of those patterns are still useful, but many of them exist to explain a delay that does not need to exist.",
      },
      {
        type: "paragraph",
        text: "Without the pause, feedback has to become more precise. A quiet saved state matters more than a toast. Conflicts need language a person can understand. Sync becomes a background promise instead of a loading screen.",
      },
      {
        type: "list",
        items: [
          "Show local state immediately, and name sync separately.",
          "Make conflicts visible without making them feel like failure.",
          "Treat offline as a mode, not an error.",
        ],
      },
      {
        type: "paragraph",
        text: "The best local-first tools feel less like websites and more like tools that happen to be online. That is a different design brief, and we are still learning how to write it.",
      },
    ],
  },
  {
    slug: "a-small-case-for-slower-motion",
    title: "a small case for slower motion",
    description:
      "Motion is not automatically better when it is faster. Sometimes the right speed is the one that lets you understand.",
    date: "2026-09-09",
    readingTime: "3 min read",
    content: [
      {
        type: "paragraph",
        text: "A lot of interface motion is designed to get out of the way. Quick fades, short slides, a spring that resolves before you can name it. Speed feels professional, so we keep making things faster.",
      },
      {
        type: "paragraph",
        text: "But speed is only one part of the job. A transition also has to explain where something came from, where it went, and what changed while it moved. If it finishes too early, the explanation is lost.",
      },
      {
        type: "heading",
        text: "match the motion to the thought",
      },
      {
        type: "paragraph",
        text: "A menu opening can be quick. A layout change that rearranges the page deserves a little more time. The useful question is not how fast can this be, but how long does it take to understand what happened.",
      },
      {
        type: "quote",
        text: "The best motion is not the shortest. It is the one that leaves no gap between action and understanding.",
      },
    ],
  },
  {
    slug: "notes-from-rebuilding-my-own-site",
    title: "notes from rebuilding my own site",
    description:
      "A personal site is a good place to practice restraint, especially when nobody asked for a redesign.",
    date: "2026-08-21",
    readingTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "I rebuilt my site for the same reason I reorganize a desk: not because it was broken, but because I wanted to understand what I actually used. A personal site makes that question unusually honest. No roadmap, no stakeholder, no one asking for another section.",
      },
      {
        type: "heading",
        text: "start with the reading column",
      },
      {
        type: "paragraph",
        text: "The first decision was width. A narrower column makes almost every other choice easier. Type gets calmer, line breaks get more intentional, and decoration has less room to become the point.",
      },
      {
        type: "paragraph",
        text: "The second decision was what not to include. No analytics, no newsletter popup, no giant case study carousel. A short introduction, a few links, and a way to reach me. Restraint is easier to describe than to ship.",
      },
      {
        type: "list",
        items: [
          "Write the copy before choosing the layout.",
          "Use one accent per idea, not one per section.",
          "If a detail is only there to impress, remove it.",
        ],
      },
      {
        type: "paragraph",
        text: "The site will change again. That is part of the point. For now it does the small thing I wanted it to do: it gets out of the way and lets the writing be the interface.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getMorePosts(slug: string, limit = 3) {
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
