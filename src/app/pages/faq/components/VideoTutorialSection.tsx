import { motion } from 'motion/react';
import { Play, ChevronRight } from 'lucide-react';

interface VideoTutorialSectionProps {
  onOpenModal: () => void;
  chaptersCount: number;
}

export function VideoTutorialSection({ onOpenModal, chaptersCount }: VideoTutorialSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="rounded-[32px] bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] p-8 shadow-2xl overflow-hidden"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-white/20 blur-3xl opacity-40"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10 grid gap-6 md:grid-cols-[auto_1fr_auto] items-center">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center shadow-lg">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="relative text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Assista ao tutorial completo</h3>
            <p className="text-sm md:text-base text-white/90 mb-1">
              Conheça cada funcionalidade da plataforma Atesteme dividida em capítulos práticos.
            </p>
            <div className="text-sm opacity-80">21 capítulos</div>
          </div>

          <button
            onClick={onOpenModal}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#8B27FF] px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            <span>Assistir agora</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
