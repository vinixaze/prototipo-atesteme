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
      className="fixed bottom-4 right-4 z-50 rounded-full bg-white/90 p-2 opacity-95 shadow-xl ring-1 ring-black/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:opacity-100 sm:bottom-3.5 sm:right-20 sm:bg-transparent sm:p-0 sm:shadow-lg sm:ring-0 sm:backdrop-blur-none"
    >
      <img
        src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
        alt="Chatbot"
        className="h-auto w-32 max-w-[70vw] sm:w-[250px] sm:max-w-none"
        loading="lazy"
      />
    </button>
  );
}
