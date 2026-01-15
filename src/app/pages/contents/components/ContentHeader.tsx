import { motion } from 'motion/react';

interface ContentHeaderProps {
  title: string;
  subtitle: string;
  highlight: string;
}

export default function ContentHeader({ title, subtitle, highlight }: ContentHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-4">
        {subtitle}
      </h2>
      <div className="bg-gradient-to-r from-[#8B27FF]/10 to-[#A855F7]/10 dark:from-[#8B27FF]/20 dark:to-[#A855F7]/20 rounded-xl px-6 py-3 inline-block">
        <p className="text-lg font-semibold text-[#8B27FF] dark:text-[#A855F7]">
          {highlight}
        </p>
      </div>
    </motion.div>
  );
}
