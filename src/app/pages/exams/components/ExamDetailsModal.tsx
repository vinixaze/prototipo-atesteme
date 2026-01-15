import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, XCircle, FileCheck, Clock, Star, Target, Check, BookOpen, Download, RotateCcw } from 'lucide-react';
import { Exam, ExamDetails } from '../types';

interface ExamDetailsModalProps {
  exam: Exam;
  details: ExamDetails;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamDetailsModal({ exam, details, isOpen, onClose }: ExamDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600 rounded-xl transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${exam.status === 'Aprovado'
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 animate-bounce'
                  : 'bg-gradient-to-br from-red-500 to-pink-500'
                  }`}>
                  {exam.status === 'Aprovado' ? (
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2} />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" strokeWidth={2} />
                  )}
                </div>
              </div>

              <h1 className={`text-4xl mb-4 ${exam.status === 'Aprovado'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
                }`}>
                {exam.status === 'Aprovado' ? 'Parabéns!' : 'Resultado do Exame'}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                {exam.type}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exam.date} às {exam.time}
              </p>
            </div>

            <div className="bg-[#F9F7FF] dark:bg-purple-950 border-2 border-[#E8E0FF] dark:border-purple-800 rounded-2xl p-8 mb-10">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <FileCheck className="w-8 h-8 text-[#8B27FF] dark:text-[#A855F7] mx-auto mb-2" />
                  <div className="text-4xl text-[#8B27FF] dark:text-[#A855F7] mb-1">{details.questoesTotais}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questões</div>
                </div>

                <div className="text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#4CAF50] dark:text-green-400 mx-auto mb-2" />
                  <div className="text-4xl text-[#4CAF50] dark:text-green-400 mb-1">{details.questoesCorretas}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
                </div>

                <div className="text-center">
                  <XCircle className="w-8 h-8 text-[#EF5350] dark:text-red-400 mx-auto mb-2" />
                  <div className="text-4xl text-[#EF5350] dark:text-red-400 mb-1">{details.questoesTotais - details.questoesCorretas}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-[#E8E0FF] dark:border-purple-800">
                <div className="text-5xl text-[#8B27FF] dark:text-[#A855F7] mb-2">{details.porcentagem}%</div>
                <div className="text-gray-600 dark:text-gray-400">Taxa de acerto</div>
              </div>

              <div className="text-center pt-4">
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>Tempo gasto: {details.tempoGasto}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-600"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500 rounded-xl">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ponto Forte</h3>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  {details.pontoForte}
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-600"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-500 rounded-xl">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Área para Melhorar</h3>
                </div>
                <p className="text-amber-700 dark:text-amber-400 font-semibold">
                  {details.areaParaMelhorar}
                </p>
              </motion.div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-6">
                Revisão das suas respostas
              </h2>

              <div className="space-y-4">
                {details.questions.map((question, index) => {
                  const userAnswerText = question.options.find(
                    (opt) => opt.letter === question.userAnswer
                  )?.text || 'Não respondida';

                  const correctAnswerText = question.options.find(
                    (opt) => opt.letter === question.correctAnswer
                  )?.text || '';

                  return (
                    <div
                      key={question.id}
                      className={`rounded-xl p-6 border-l-4 transition-all hover:shadow-md ${question.isCorrect
                        ? 'bg-[#E8F5E9] dark:bg-green-950 border-[#4CAF50] dark:border-green-600'
                        : question.userAnswer
                          ? 'bg-[#FFEBEE] dark:bg-red-950 border-[#EF5350] dark:border-red-600'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div
                              className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                              style={{ backgroundColor: question.categoryColor }}
                            >
                              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/20">
                                <span className="text-white text-[10px] font-bold">A</span>
                              </div>
                              <div>
                                <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Área</p>
                                <p className="text-[11px] text-white font-medium leading-tight">
                                  {question.category}
                                </p>
                              </div>
                            </div>

                            <div
                              className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                              style={{ backgroundColor: question.categoryColor }}
                            >
                              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/20">
                                <span className="text-white text-[10px] font-bold">C</span>
                              </div>
                              <div>
                                <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Competência</p>
                                <p className="text-[11px] text-white font-medium leading-tight">
                                  {question.competency}
                                </p>
                              </div>
                            </div>

                            <div className="bg-purple-500 dark:bg-purple-600 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                              <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                                <BookOpen className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div>
                                <p className="text-[9px] text-white/80 uppercase font-semibold leading-none mb-0.5">BNCC</p>
                                <p className="text-[11px] text-white font-medium leading-tight">
                                  Competência 5 - Cultura Digital (BNCC)
                                </p>
                              </div>
                            </div>
                          </div>

                          <h3 className="text-gray-800 dark:text-gray-200 text-sm">
                            Questão {index + 1}
                          </h3>
                        </div>
                        <div className="flex-shrink-0">
                          {question.isCorrect ? (
                            <div className="w-10 h-10 rounded-full bg-[#4CAF50] dark:bg-green-600 flex items-center justify-center">
                              <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>
                          ) : question.userAnswer ? (
                            <div className="w-10 h-10 rounded-full bg-[#EF5350] dark:bg-red-600 flex items-center justify-center">
                              <X className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                              <span className="text-white text-xs">?</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                        {question.questionText}
                      </p>

                      <div className="mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Sua resposta: </span>
                        <span className={`text-sm ${question.isCorrect
                          ? 'text-[#4CAF50] dark:text-green-400'
                          : question.userAnswer
                            ? 'text-[#EF5350] dark:text-red-400'
                            : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {question.userAnswer ? (
                            <>
                              ({question.userAnswer}) {userAnswerText}
                              {question.isCorrect ? (
                                <Check className="inline w-4 h-4 ml-1" />
                              ) : (
                                <X className="inline w-4 h-4 ml-1" />
                              )}
                            </>
                          ) : (
                            'Não respondida'
                          )}
                        </span>
                      </div>

                      {!question.isCorrect && (
                        <div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Resposta correta: </span>
                          <span className="text-sm text-[#4CAF50] dark:text-green-400">
                            ({question.correctAnswer}) {correctAnswerText}
                            <Check className="inline w-4 h-4 ml-1" />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {exam.status === 'Aprovado' && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Download className="w-5 h-5" />
                  Baixar Certificado
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Refazer Exame
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


