import React from "react";

interface MobileLogoProps {
  logoImage: string;
  subtitle: string;
}

export default function MobileLogo({ logoImage, subtitle }: MobileLogoProps) {
  return (
    <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 lg:hidden z-10 flex flex-col items-center">
      <img
        src={logoImage}
        alt="Atesteme Logo"
        className="block w-[180px] sm:w-[250px] h-auto drop-shadow-lg"
      />

      <span className="mt-1 text-white/90 text-sm sm:text-base font-medium leading-none tracking-wide text-center drop-shadow">
        {subtitle}
      </span>
    </div>
  );
}
