import { motion } from 'motion/react';
import {
  Sparkles,
  Target,
  ChevronRight,
  Award,
  TrendingUp,
  Zap,
  Star,
} from 'lucide-react';

interface WelcomeCardProps {
  userName?: string;
  logoImage: string;
  onStartQuiz: () => void;
  onGoToDashboard: () => void;
}

export function WelcomeCard({ userName, logoImage, onStartQuiz, onGoToDashboard }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-[90vw] lg:max-w-[1600px] relative z-10"
    >
      <motion.div
        className="flex justify-center mb-2 md:mb-3 -mt-6 md:-mt-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#8B27FF]/20 blur-3xl scale-125" />
          <img
            src={logoImage}
            alt="AtesteMe Logo"
            className="relative h-16 md:h-20 w-auto object-contain drop-shadow-[0_12px_48px_rgba(139,39,255,0.6)]"
          />
          <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center tracking-wide">
            Plataforma Educacional
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_rgba(139,39,255,0.12),0_32px_64px_rgba(0,0,0,0.08)] p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden border border-white/60"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B27FF] via-[#A855F7] to-[#8B27FF]" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B27FF]/10 to-[#A855F7]/10 text-[#8B27FF] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 border border-[#8B27FF]/20"
        >
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base font-semibold">Primeiro Acesso</span>
        </motion.div>

        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3">
            Bem-vindo(a){userName ? `, ${userName}` : ''}!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6">
            Sua jornada de aprendizagem digital começa agora!
          </p>

          <div className="w-full text-center mb-6">
            <h3 className="text-base sm:text-xl md:text-2xl font-medium text-gray-900 mb-4 whitespace-nowrap">
              Diagnóstico de Competências Digitais
            </h3>

            <button
              onClick={onStartQuiz}
              className="w-full md:hidden flex items-center justify-center gap-3 bg-[#8B27FF] text-white px-4 py-3 rounded-2xl hover:bg-[#6B1FBF] transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <div className="flex items-center gap-2 font-bold">
                <span className="text-lg">Iniciar</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={onStartQuiz}
              className="hidden md:flex w-full justify-center items-center bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white px-10 py-8 rounded-2xl hover:opacity-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <Target className="w-10 h-10 text-white opacity-95" />
                <span className="text-2xl lg:text-3xl font-extrabold">Iniciar</span>
                <ChevronRight className="w-6 h-6 opacity-95" />
              </div>
            </button>
          </div>
        </div>

        <div className="mb-8 sm:mb-10 space-y-4 bg-gradient-to-r from-purple-50/50 to-transparent p-5 sm:p-6 rounded-2xl border-l-4 border-[#8B27FF]">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#8B27FF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Star className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              O{' '}
              <span className="font-bold text-[#8B27FF]">
                Diagnóstico de Competências Digitais
              </span>{' '}
              vai identificar suas habilidades atuais
            </p>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#8B27FF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              São apenas alguns minutos que farão toda diferença na sua jornada de aprendizado. Você receberá um diagnóstico completo das suas competências digitais!
            </p>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 sm:p-6 rounded-2xl border border-yellow-200/50"
          >
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
              <Target className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Teste Personalizado</h3>
            <p className="text-sm sm:text-base text-gray-600">Avaliação inicial das suas competências</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-2xl border border-purple-200/50"
          >
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-xl flex items-center justify-center mb-3 shadow-lg">
              <TrendingUp className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Trilha Adaptativa</h3>
            <p className="text-sm sm:text-base text-gray-600">Conteúdo ajustado à BNCC Computação</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 sm:p-6 rounded-2xl border border-cyan-200/50"
          >
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
              <Award className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Conquistas</h3>
            <p className="text-sm sm:text-base text-gray-600">Ganhe medalhas e suba no ranking</p>
          </motion.div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={onGoToDashboard}
            className="text-sm sm:text-base text-gray-400 hover:text-gray-600 transition-colors underline decoration-dotted"
          >
            Prefiro explorar a plataforma primeiro
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
