import { motion } from 'motion/react';

export function OrganizationLogoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="
        relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg
        flex items-center justify-center
        w-full h-full
        min-h-[140px] lg:min-h-[180px]
        overflow-hidden
        border-2 border-gray-200 dark:border-gray-700
        md:col-span-2 lg:col-span-1
        px-6
      "
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center p-4">
        <p className="text-gray-400 dark:text-gray-500 text-[9px] font-normal uppercase tracking-[0.1em] mb-0.5">
          CONTA DE
        </p>

        <h2 className="text-gray-600 dark:text-gray-400 text-base font-medium uppercase tracking-tight mb-0.5">
          ORGANIZA�?�fO
        </h2>

        <div className="flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wide">
            ateste<span className="text-[#8B27FF]">me</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
