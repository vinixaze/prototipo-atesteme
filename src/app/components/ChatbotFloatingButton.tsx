import { useEffect, useRef, useState } from "react";

type ChatbotFloatingButtonProps = {
  onClick?: () => void;
};

const CHAT_SCRIPT_ID = "webchat-script";

export default function ChatbotFloatingButton({
  onClick,
}: ChatbotFloatingButtonProps) {
  const [isClosed, setIsClosed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const handleMouseMove = () => {
      setIsVisible(true);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    window.chatCompany = "cb897082-7784-11ef-961a-0efa6ad28f4f";
    window.chatChannel = "58cbe76c-1a40-4ffb-a345-a59df5c69351";
    window.chatNotificationSound =
      "https://bot-flow.s3.connectacx.com/connectacx/notificacao.mp3";
    window.chatHeaderColor = "#8169f7";
    window.chatHeaderIcon =
      "https://bot-flow.s3.connectacx.com/atesteme/iconeatesteme.jpeg";
    window.chatTitle = "Tina";
    window.chatFooterText = "Prazer em atender";

    if (document.getElementById(CHAT_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = CHAT_SCRIPT_ID;
    script.src = "https://hub.notificame.com.br/schedule/webchat.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 sm:bottom-3.5 sm:right-20"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={() => {
          onClick?.();
          setIsClosed(true);
        }}
        aria-label="Fechar botão do chatbot"
        className="rounded-full border-0 bg-transparent p-0 opacity-90 transition-all duration-200 ease-in-out hover:opacity-100"
      >
        <img
          src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
          alt="Chatbot"
          className="h-auto w-24 max-w-[55vw] rounded-full bg-white/90 p-1.5 shadow-md transition-opacity duration-200 ease-in-out sm:w-[250px] sm:max-w-none sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none"
          loading="lazy"
          style={{ opacity: isVisible ? 1 : 0 }}
        />
      </button>
    </div>
  );
}
