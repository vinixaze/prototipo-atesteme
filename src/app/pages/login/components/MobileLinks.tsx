import React from "react";
import type { NavigateTo, PageId } from "../../../lib/navigation/routes";

interface MobileLinksProps {
  navigateTo: NavigateTo;
  links: { label: string; page: PageId }[];
}

export default function MobileLinks({ navigateTo, links }: MobileLinksProps) {
  return (
    <div className="lg:hidden mt-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
        {links.map((link, index) => (
          <React.Fragment key={link.page}>
            <button
              onClick={() => navigateTo(link.page)}
              className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
            >
              {link.label}
            </button>
            {index < links.length - 1 && (
              <span className="text-white/60 hidden sm:inline">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
