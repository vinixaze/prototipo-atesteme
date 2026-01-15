import { motion } from 'motion/react';
import { Award, BarChart3 } from 'lucide-react';

export default function ExamCtaCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#9D3FFF] to-[#A855F7] text-white rounded-3xl shadow-2xl hover:shadow-purple-500/60 transition-all p-6 cursor-pointer active:shadow-lg"
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight">INICIAR</h1>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <h2 className="flex-1 text-lg font-black tracking-tight uppercase text-center">
              Exame de Certificação
            </h2>

            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
              <Award className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#00BCD4] via-[#00ACC1] to-[#0097A7] text-white rounded-3xl shadow-2xl hover:shadow-cyan-500/60 transition-all p-6 cursor-pointer active:shadow-lg"
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight">INICIAR</h1>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <h2 className="flex-1 text-lg font-black tracking-tight uppercase text-center">
              Exame de Nível
            </h2>

            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
              <BarChart3 className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>
    </motion.div>
  );
}
