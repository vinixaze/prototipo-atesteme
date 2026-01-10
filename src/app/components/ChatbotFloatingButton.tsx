import { MessageCircle } from "lucide-react";

type ChatbotFloatingButtonProps = {
  onClick?: () => void;
};

export default function ChatbotFloatingButton({
  onClick,
}: ChatbotFloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Chatbot"
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-full border border-[#8B27FF] bg-white px-4 py-3 text-sm font-semibold text-[#8B27FF] shadow-lg transition-transform hover:-translate-y-0.5 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Chatbot</span>
    </button>
  );
}
