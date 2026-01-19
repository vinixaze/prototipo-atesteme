import { useEffect, useState } from "react";

export default function Confetti() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Confetti por 3 segundos
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  if (!showConfetti) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: ["#FFD700", "#FF9800", "#E91E63", "#00BCD4", "#4CAF50"][
                Math.floor(Math.random() * 5)
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}
