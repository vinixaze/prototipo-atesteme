import React from "react";
import { Download, X } from "lucide-react";

interface InstallBannerProps {
  visible: boolean;
  canInstall: boolean;
  message: string;
  installLabel: string;
  onInstallClick: () => void;
  onDismiss: () => void;
}

export default function InstallBanner({
  visible,
  canInstall,
  message,
  installLabel,
  onInstallClick,
  onDismiss,
}: InstallBannerProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Download className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-medium truncate">
            {message}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onInstallClick}
            disabled={!canInstall}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors whitespace-nowrap
                  ${
                    canInstall
                      ? "bg-white text-[#8B27FF] hover:bg-white/90"
                      : "bg-white/60 text-[#8B27FF]/60 cursor-not-allowed"
                  }
              `}
          >
            {installLabel}
          </button>

          <button
            onClick={onDismiss}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
