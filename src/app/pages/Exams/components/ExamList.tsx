import { motion } from 'motion/react';
import { Calendar, Eye, Download, TrendingUp, Info } from 'lucide-react';
import { Exam } from '../../../types/exams';

interface ExamListProps {
  exams: Exam[];
  hoveredPendingId: string | null;
  hoveredDownloadId: string | null;
  onViewExam: (examId: string) => void;
  onDownloadExam: (examId: string) => void;
  onSetHoveredPendingId: (id: string | null) => void;
  onSetHoveredDownloadId: (id: string | null) => void;
}

export default function ExamList({
  exams,
  hoveredPendingId,
  hoveredDownloadId,
  onViewExam,
  onDownloadExam,
  onSetHoveredPendingId,
  onSetHoveredDownloadId,
}: ExamListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-600',
          icon: 'text-emerald-500',
          dot: 'bg-emerald-500',
        };
      case 'Reprovado':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-600',
          icon: 'text-red-500',
          dot: 'bg-red-500',
        };
      case 'Pendente':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30',
          text: 'text-amber-700 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-600',
          icon: 'text-amber-500',
          dot: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-700',
          text: 'text-gray-700 dark:text-gray-300',
          border: 'border-gray-200 dark:border-gray-600',
          icon: 'text-gray-500',
          dot: 'bg-gray-500',
        };
    }
  };

  if (exams.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
      >
        <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum exame encontrado</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {exams.map((exam, index) => {
        const statusColors = getStatusColor(exam.status);
        return (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-3 lg:w-48">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Calendar className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7]" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{exam.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exam.time}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-[#8B27FF] dark:group-hover:text-[#A855F7] transition-colors">
                    {exam.type}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{exam.name}</span>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <span>{exam.cpf}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:contents">
                  <div className="flex-1 lg:w-44 flex flex-col items-start">
                    <div className="flex items-center gap-2 justify-start w-full">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${statusColors.border} ${statusColors.bg}`}>
                        <div className={`w-2 h-2 rounded-full ${statusColors.dot} animate-pulse`} />
                        <span className={`font-bold text-sm ${statusColors.text}`}>
                          {exam.status}
                        </span>
                      </div>
                      {exam.status === 'Pendente' && exam.pendingReason && (
                        <div
                          className="relative"
                          onMouseEnter={() => onSetHoveredPendingId(exam.id)}
                          onMouseLeave={() => onSetHoveredPendingId(null)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-6 h-6 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center cursor-help"
                          >
                            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </motion.div>
                          {hoveredPendingId === exam.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-0 top-8 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
                            >
                              {exam.pendingReason}
                              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45" />
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                    {exam.score !== undefined && (
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="w-5 h-5 text-[#8B27FF]" />
                        <span className="text-2xl font-bold text-[#8B27FF]">{exam.score}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 lg:w-auto flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onViewExam(exam.id)}
                      disabled={exam.status === 'Pendente'}
                      className={`p-3 rounded-xl transition-all group/btn ${exam.status === 'Pendente'
                        ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/60 dark:hover:to-pink-900/60'
                        }`}
                    >
                      <Eye className={`w-5 h-5 transition-transform ${exam.status === 'Pendente'
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-[#8B27FF] dark:text-[#A855F7] group-hover/btn:scale-110'
                        }`} />
                    </motion.button>
                    <div className="relative">
                      <motion.button
                        whileHover={exam.status !== 'Pendente' ? { scale: 1.1 } : {}}
                        whileTap={exam.status !== 'Pendente' ? { scale: 0.9 } : {}}
                        className={`p-3 rounded-xl transition-all group/btn ${exam.status === 'Pendente'
                          ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50'
                          : 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/40 dark:to-green-900/40 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/60 dark:hover:to-green-900/60'
                          }`}
                        onMouseEnter={() => onSetHoveredDownloadId(exam.id)}
                        onMouseLeave={() => onSetHoveredDownloadId(null)}
                        disabled={exam.status === 'Pendente'}
                        onClick={() => onDownloadExam(exam.id)}
                      >
                        <Download
                          className={`w-5 h-5 transition-transform ${exam.status === 'Pendente'
                            ? 'text-gray-400 dark:text-gray-600'
                            : 'text-emerald-600 dark:text-emerald-400 group-hover/btn:scale-110'
                            }`}
                        />
                      </motion.button>
                      {exam.status === 'Pendente' && hoveredDownloadId === exam.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 top-14 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
                        >
                          Não é possível baixar exame pendente
                          <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="h-1 bg-gradient-to-r from-[#8B27FF] via-[#9D3FFF] to-[#C084FC] origin-left"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

