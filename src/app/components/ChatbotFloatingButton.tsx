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
      className="fixed bottom-4 right-4 z-50 rounded-full bg-transparent p-0 opacity-90 shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-100 sm:bottom-3.5 sm:right-20"
    >
      <img
        src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
        alt="Chatbot"
        className="h-auto w-44 sm:w-[250px]"
        loading="lazy"
      />
    </button>
  );
}
