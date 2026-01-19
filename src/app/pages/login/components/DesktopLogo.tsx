import React from "react";

interface DesktopLogoProps {
  logoImage: string;
  subtitle: string;
}

export default function DesktopLogo({ logoImage, subtitle }: DesktopLogoProps) {
  return (
    <div className="absolute left-[4%] top-[20%] z-10 hidden lg:flex flex-col items-center">
      <img
        src={logoImage}
        alt="Atesteme Logo"
        className="block w-[400px] h-auto drop-shadow-2xl"
      />

      <span className="-mt-[2px] w-full text-center text-white/90 text-lg font-medium leading-none tracking-wide drop-shadow-lg">
        {subtitle}
      </span>
    </div>
  );
}
