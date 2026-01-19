import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface TransversalityHeaderProps {
  onOpenModal: () => void;
}

export default function TransversalityHeader({ onOpenModal }: TransversalityHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl text-[#8B27FF] mb-2">Transversalidade</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encontre questões por componentes curriculares, temáticas e habilidades BNCC
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenModal}
        className="flex items-center gap-2 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-3 rounded-xl transition-all shadow-lg"
      >
        <Sparkles className="w-5 h-5" />
        Buscar Desafios
      </motion.button>
    </div>
  );
}
