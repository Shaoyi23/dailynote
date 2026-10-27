import Link from "next/link";
import { siteConfig, type SocialId } from "@/data/site";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "@/components/icons";

const socialIcons: Record<SocialId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
};

export function SiteFooter() {
  return (
    <footer className="flex items-end justify-between gap-5">
      <Link
        href="/"
        aria-label={`${siteConfig.name} — home`}
        className="group -mb-1 inline-flex items-baseline gap-1.5 rounded-sm"
      >
        <span className="font-hand -rotate-2 text-[2.15rem] leading-[0.8] text-ink/70 transition-colors duration-200 group-hover:text-ink">
          {siteConfig.name}
        </span>
        <span
          aria-hidden="true"
          className="mb-[0.28rem] size-1 rounded-full bg-clay/55 transition-colors duration-200 group-hover:bg-clay"
        />
      </Link>

      <nav aria-label="Social links">
        <ul className="flex items-center gap-1">
          {siteConfig.socials.map((social) => {
            const Icon = socialIcons[social.id];
            const isExternal = social.href.startsWith("http");

            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="social-button"
                  {...(isExternal
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : undefined)}
                >
                  <Icon className="size-[0.82rem]" />
                  <span className="social-tooltip" aria-hidden="true">
                    {social.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
