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
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: string }
  | { type: "callout"; label: string; text: string };

export type PostTranslation = {
  lang: "zh-CN";
  label: string;
  title: string;
  description: string;
  readingTime: string;
  content: PostBlock[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: PostBlock[];
  translation?: PostTranslation;
};

export const posts: Post[] = [
  {
    slug: "why-var-logs-3-3-3",
    title: "why var logs 3, 3, 3",
    description:
      "A classic JavaScript quiz, unpacked: scope, closures, and the event loop behind three little 3s.",
    date: "2026-10-28",
    readingTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "There is a famous JavaScript quiz that looks like a trap: a for loop with var, three timers, and one question. What gets logged? The choices usually look something like [0, 1, 2], 0, 1, 2, 3, 3, 3, or an infinite loop.",
      },
      {
        type: "code",
        language: "js",
        code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}`,
      },
      {
        type: "paragraph",
        text: "If your first instinct is 0, 1, 2, you are thinking about the value of i when each callback is created. That is a reasonable guess, but JavaScript is not saving a snapshot of that value for the timer.",
      },
      {
        type: "heading",
        text: "the answer",
      },
      {
        type: "callout",
        label: "correct answer",
        text: "C — 3, 3, 3",
      },
      {
        type: "paragraph",
        text: "The loop finishes synchronously before any timer fires. By the time the callbacks run, the single var i has already reached 3. Each callback prints 3 on its own line, so the final output is three 3s.",
      },
      {
        type: "heading",
        text: "one binding, three closures",
      },
      {
        type: "paragraph",
        text: "var is function-scoped, or global at the top level. That means all three callbacks close over the same i. The closure does not capture the number 0, 1, or 2. It captures the variable itself. When the callback finally reads i, the loop is over and the value is 3.",
      },
      {
        type: "quote",
        text: "The timer does not capture the value. It captures the variable.",
      },
      {
        type: "heading",
        text: "the event loop does the rest",
      },
      {
        type: "paragraph",
        text: "setTimeout schedules each callback and returns immediately. The loop runs to completion, i becomes 3, and the condition fails. Only then does the event loop process the timers. All three callbacks see i === 3.",
      },
      {
        type: "paragraph",
        text: "The 1000ms delay also does not create one second between each log. The callbacks are queued around the same time and then run one after another, so you see three 3s at almost the same moment.",
      },
      {
        type: "heading",
        text: "the let version",
      },
      {
        type: "paragraph",
        text: "Change var to let and the output becomes 0, 1, 2. In a for loop, let creates a new binding for each iteration. Each callback closes over its own iteration's binding, so the value is preserved.",
      },
      {
        type: "code",
        language: "js",
        code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}`,
      },
      {
        type: "heading",
        text: "other ways to capture the value",
      },
      {
        type: "paragraph",
        text: "If you have to keep var, you can pass the current value into the callback explicitly. setTimeout accepts extra arguments and forwards them to the function.",
      },
      {
        type: "code",
        language: "js",
        code: `for (var i = 0; i < 3; i++) {
  setTimeout((value) => {
    console.log(value);
  }, 1000, i);
}`,
      },
      {
        type: "paragraph",
        text: "An immediately invoked function expression can also create a new scope for each iteration, but let is usually clearer and easier to read.",
      },
      {
        type: "heading",
        text: "what to remember",
      },
      {
        type: "list",
        items: [
          "var is function-scoped; let and const are block-scoped.",
          "Closures capture bindings, not snapshots of values.",
          "Timers run after the current synchronous code has finished.",
          "A for loop with let creates a fresh binding on every iteration.",
        ],
      },
      {
        type: "paragraph",
        text: "The quiz is not really about setTimeout. It is about the gap between when code is written and when it actually runs. Once that gap is clear, a lot of asynchronous JavaScript starts to make sense.",
      },
    ],
    translation: {
      lang: "zh-CN",
      label: "中文",
      title: "为什么 var 输出了三次 3",
      description:
        "一道经典 JavaScript 面试题：从 var、闭包和事件循环理解为什么控制台会打印 3, 3, 3。",
      readingTime: "6 分钟阅读",
      content: [
        {
          type: "paragraph",
          text: "这是 JavaScript 里一道很经典的题：一个使用 var 的 for 循环、三个定时器，以及一个问题——最后会打印什么？常见选项包括 [0, 1, 2]、0, 1, 2、3, 3, 3 和死循环。",
        },
        {
          type: "code",
          language: "js",
          code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}`,
        },
        {
          type: "paragraph",
          text: "如果你的第一反应是 0, 1, 2，你关注的是创建回调时 i 的值。这个猜测很合理，但 JavaScript 并没有为定时器保存那一刻的数字快照。",
        },
        {
          type: "heading",
          text: "答案",
        },
        {
          type: "callout",
          label: "正确答案",
          text: "C — 3, 3, 3",
        },
        {
          type: "paragraph",
          text: "循环会在任何一个定时器触发之前同步执行完毕。等到回调真正运行时，唯一的 var i 已经变成了 3。每个回调各打印一行 3，所以最终输出是三个 3。",
        },
        {
          type: "heading",
          text: "一个变量绑定，三个闭包",
        },
        {
          type: "paragraph",
          text: "var 是函数作用域，在顶层则是全局作用域。因此三个回调闭包引用的是同一个 i。闭包没有捕获 0、1、2 这些值，它捕获的是变量本身。等回调真正读取 i 时，循环已经结束，值是 3。",
        },
        {
          type: "quote",
          text: "定时器没有捕获值，它捕获的是变量。",
        },
        {
          type: "heading",
          text: "剩下的交给事件循环",
        },
        {
          type: "paragraph",
          text: "setTimeout 只是把回调交给定时器，然后立刻返回。循环顺利跑完，i 增加到 3 后条件不成立。直到这时，事件循环才处理到期的定时器。三个回调看到的 i 都是 3。",
        },
        {
          type: "paragraph",
          text: "1000ms 也不是每次打印之间间隔 1 秒。三个回调差不多在同一时间入队，然后依次执行，所以三个 3 几乎同时出现。",
        },
        {
          type: "heading",
          text: "换成 let 之后",
        },
        {
          type: "paragraph",
          text: "把 var 改成 let，输出就会变成 0, 1, 2。在 for 循环中，let 会为每一次迭代创建新的绑定，每个回调捕获自己那一轮的 i，因此值被保留下来。",
        },
        {
          type: "code",
          language: "js",
          code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}`,
        },
        {
          type: "heading",
          text: "其他捕获当前值的方式",
        },
        {
          type: "paragraph",
          text: "如果必须使用 var，可以把当前值显式传给回调。setTimeout 支持传入额外参数，这些参数会原样传给回调函数。",
        },
        {
          type: "code",
          language: "js",
          code: `for (var i = 0; i < 3; i++) {
  setTimeout((value) => {
    console.log(value);
  }, 1000, i);
}`,
        },
        {
          type: "paragraph",
          text: "用立即执行函数（IIFE）也可以为每一轮循环创建新作用域，但通常写法不如 let 直观。",
        },
        {
          type: "heading",
          text: "记住这几件事",
        },
        {
          type: "list",
          items: [
            "var 是函数作用域，let 和 const 是块级作用域。",
            "闭包捕获的是变量绑定，而不是值的快照。",
            "定时器回调要等当前同步代码执行完毕后才会运行。",
            "for 循环里的 let 会为每一轮迭代创建独立绑定。",
          ],
        },
        {
          type: "paragraph",
          text: "这道题真正考的不是 setTimeout，而是代码写下的时间和它真正执行的时间之间的差距。理解这个差距之后，很多异步 JavaScript 问题都会变得清晰。",
        },
      ],
    },
  },
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
