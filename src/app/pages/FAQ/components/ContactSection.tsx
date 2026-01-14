import { Shield, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  onChatbot: () => void;
  onDashboard: () => void;
}

export function ContactSection({ onChatbot, onDashboard }: ContactSectionProps) {
  return (
    <div className="mt-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center mx-auto mb-2">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Ainda tem dúvidas?</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Nossa equipe está pronta para ajudar você! Entre em contato pelo WhatsApp ou envie uma observação.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onChatbot}
            className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Chatbot
          </button>
          <button
            onClick={onDashboard}
            className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
