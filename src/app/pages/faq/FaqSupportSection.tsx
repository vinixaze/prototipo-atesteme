import { motion } from 'motion/react';
import { MessageCircle, Shield } from 'lucide-react';

interface FaqSupportSectionProps {
  onNavigate: (page: string) => void;
}

export function FaqSupportSection({ onNavigate }: FaqSupportSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800"
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Ainda tem dúvidas?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
          Nossa equipe está pronta para ajudar você! Entre em contato através do WhatsApp ou envie uma observação diretamente pela plataforma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('chatbot')}
            className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Chatbot
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}
