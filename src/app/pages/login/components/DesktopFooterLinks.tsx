import React from "react";
import type { NavigateTo, PageId } from "../../../lib/navigation/routes";

interface DesktopFooterLinksProps {
  navigateTo: NavigateTo;
  links: { label: string; page: PageId }[];
}

export default function DesktopFooterLinks({ navigateTo, links }: DesktopFooterLinksProps) {
  return (
    <div className="absolute left-[8%] bottom-6 z-10 hidden lg:block">
      <div className="flex items-center justify-center gap-3 text-sm">
        {links.map((link, index) => (
          <React.Fragment key={link.page}>
            <button
              onClick={() => navigateTo(link.page)}
              className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
            >
              {link.label}
            </button>
            {index < links.length - 1 && (
              <span className="text-white/60">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
