import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  onClick: () => void;
}

export default function ScrollToTopButton({ onClick }: ScrollToTopButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-50 bg-gray-500 hover:bg-gray-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all"
      title="Ir para o topo"
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
