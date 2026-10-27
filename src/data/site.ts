/**
 * Edit everything about the site here.
 *
 * Replace the name, copy, email, and social URLs with your own details.
 * The layout only uses these values, so you should not need to touch the
 * components just to make the site yours.
 */
export const siteConfig = {
  name: "Lando",
  role: "Design-minded developer",
  location: "Shanghai",
  email: "hello@yourdomain.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com",
  description:
    "Lando is a design-minded developer based in Shanghai, building calm interfaces and thoughtful software.",
  availability: "available for select projects",
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/your-handle",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/your-handle",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-handle/",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:hello@yourdomain.com",
    },
  ],
} as const;

export type SocialId = (typeof siteConfig.socials)[number]["id"];
