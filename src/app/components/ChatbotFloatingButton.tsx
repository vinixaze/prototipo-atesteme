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
      className="fixed bottom-4 right-4 z-50 rounded-full bg-white/90 p-1.5 opacity-95 shadow-md transition-all hover:-translate-y-0.5 hover:opacity-100 sm:bottom-3.5 sm:right-20 sm:bg-transparent sm:p-0 sm:shadow-lg"
    >
      <img
        src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
        alt="Chatbot"
        className="h-auto w-28 max-w-[60vw] sm:w-[250px] sm:max-w-none"
        loading="lazy"
      />
    </button>
  );
}
