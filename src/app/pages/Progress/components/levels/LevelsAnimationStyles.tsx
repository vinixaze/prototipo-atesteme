export default function LevelsAnimationStyles() {
  return (
    <style>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }

      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  );
}
