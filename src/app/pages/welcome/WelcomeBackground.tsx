import { motion } from 'motion/react';

export function WelcomeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#8B27FF]/20 to-purple-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-[#A855F7]/20 to-pink-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,39,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,39,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}
