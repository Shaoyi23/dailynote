import Image from "next/image";
import { siteConfig } from "@/data/site";

export function Avatar() {
  return (
    <div
      className="group relative inline-flex"
      title={siteConfig.availability}
    >
      <div className="relative size-[3.25rem]">
        <span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full bg-sage/15 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        />
        <Image
          src="/cartonAvator.png"
          alt=""
          width={160}
          height={160}
          sizes="52px"
          priority
          className="relative size-full rounded-full object-cover object-center ring-[3px] ring-canvas/85 shadow-[0_1px_2px_rgba(58,47,33,0.12),0_5px_14px_-8px_rgba(58,47,33,0.35)] transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-[1.035]"
        />
        <span
          aria-hidden="true"
          className="status-dot absolute -bottom-0.5 -right-0.5 size-[0.7rem] rounded-full border-2 border-canvas bg-[#71876f]"
        />
      </div>
      <span className="sr-only">{siteConfig.availability}</span>
    </div>
  );
}
