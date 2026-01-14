import { motion } from 'motion/react';

export default function ExamPageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Meus Exames
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe seu histÇürico de certificaÇõÇæes e testes
        </p>
      </div>
    </motion.div>
  );
}
