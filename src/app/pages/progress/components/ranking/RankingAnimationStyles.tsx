export default function RankingAnimationStyles() {
  return (
    <style>{`
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
    `}</style>
  );
}
