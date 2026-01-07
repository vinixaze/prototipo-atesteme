import { motion } from "motion/react";
import React from "react";
import { useEffect } from "react";
import {
  Sparkles,
  Target,
  ChevronRight,
  Award,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";
// @ts-expect-error: Image asset not found in dev environment, placeholder used for type safety.
import logoImage from "../../assets/bd6e15ee05cd5d9957a2d399e18c0693a6190505.png";

interface WelcomePageProps {
  userName?: string;
  onStartQuiz: () => void;
  onGoToDashboard: () => void;
}

export default function WelcomePage({
  userName,
  onStartQuiz,
  onGoToDashboard,
}: WelcomePageProps) {
  // Limpar o estado do teste quando a tela Welcome é carregada (nova sessão)
  useEffect(() => {
    localStorage.removeItem("testeCompetenciasCompleted");
    console.log("WelcomePage - Estado do teste resetado");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden md:overflow-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle Top Right */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#8B27FF]/20 to-purple-300/20 rounded-full blur-3xl"
        />

        {/* Medium Circle Bottom Left */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-[#A855F7]/20 to-pink-300/20 rounded-full blur-3xl"
        />

        {/* Small Floating Circles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
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
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"
        />

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,39,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,39,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[90vw] lg:max-w-[1600px] relative z-10"
      >
        {/* Logo/Brand with Glow Effect - Espaçamento reduzido ao topo */}
        <motion.div
          className="flex justify-center mb-2 md:mb-3 -mt-6 md:-mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#8B27FF]/20 blur-3xl scale-125" />

            {/* Logo Image */}
            <img
              src={logoImage}
              alt="AtesteMe Logo"
              className="relative h-16 md:h-20 w-auto object-contain drop-shadow-[0_12px_48px_rgba(139,39,255,0.6)]"
            />

            <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center tracking-wide">
              Plataforma educacional
            </p>

          </div>
        </motion.div>

        {/* Main Card with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_rgba(139,39,255,0.12),0_32px_64px_rgba(0,0,0,0.08)] p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden border border-white/60"
        >
          {/* Decorative Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B27FF] via-[#A855F7] to-[#8B27FF]" />

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B27FF]/10 to-[#A855F7]/10 text-[#8B27FF] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 border border-[#8B27FF]/20"
          >
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-base font-semibold">
              Primeiro Acesso
            </span>
          </motion.div>

          {/* Welcome Header with Enhanced Icon */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3">
              Bem-vindo(a){userName ? `, ${userName}` : ""}!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6">
              Sua jornada de aprendizagem digital começa agora!
            </p>


            {/* Primary Action */}
            <div className="w-full text-center mb-6">
              {/* Título fora do botão */}
              <h3
                className="
                  text-base sm:text-xl md:text-2xl
                  font-medium text-gray-900
                  mb-4
                  whitespace-nowrap
                  "
              >
                Diagnóstico de Competências Digitais
              </h3>


              {/* Mobile ONLY */}
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

              {/* Desktop ONLY */}
              <button
                onClick={onStartQuiz}
                className="
                  hidden md:flex
                  w-full
                  justify-center
                  items-center
                  bg-gradient-to-r from-[#8B27FF] to-[#A855F7]
                  text-white
                  px-10 py-8
                  rounded-2xl
                  hover:opacity-95
                  transition-all
                "
              >
                <div className="flex items-center gap-4">
                  <Target className="w-10 h-10 text-white opacity-95" />
                  <span className="text-2xl lg:text-3xl font-extrabold">Iniciar</span>
                  <ChevronRight className="w-6 h-6 opacity-95" />
                </div>
              </button>
            </div>

          </div>

          {/* Main Description with Icons */}
          <div className="mb-8 sm:mb-10 space-y-4 bg-gradient-to-r from-purple-50/50 to-transparent p-5 sm:p-6 rounded-2xl border-l-4 border-[#8B27FF]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#8B27FF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                O{" "}
                <span className="font-bold text-[#8B27FF]">
                  Teste de Competências Digitais
                </span>{" "}
                vai identificar suas habilidades atuais
              </p>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#8B27FF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                São apenas alguns minutos que farão toda diferença na sua
                jornada de aprendizado. Você receberá um diagnóstico completo
                das suas competências digitais!
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 sm:p-6 rounded-2xl border border-yellow-200/50"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Target className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                Teste Personalizado
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Avaliação inicial das suas competências
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-2xl border border-purple-200/50"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <TrendingUp className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                Trilha Adaptativa
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Conteúdo ajustado à BNCC Computação
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 sm:p-6 rounded-2xl border border-cyan-200/50"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Award className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                Conquistas
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Ganhe medalhas e suba no ranking
              </p>
            </motion.div>
          </div>

          {/* Subtle Skip Link - Very Low Emphasis */}
          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={onGoToDashboard}
              className="text-sm sm:text-base text-gray-400 hover:text-gray-600 transition-colors underline decoration-dotted"
            >
              Prefiro explorar a plataforma primeiro
            </button>
          </div>
        </motion.div>

        {/* Bottom Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span>100% alinhado à PNED</span>
          </div>

          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
            </div>
            <span>Resultados Instantâneos</span>
          </div>

          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
              <Award className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
            </div>
            <span>Certificado Digital</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}