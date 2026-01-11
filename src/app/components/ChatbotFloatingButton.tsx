import { useEffect, useRef, useState } from "react";

type ChatbotFloatingButtonProps = {
  onClick?: () => void;
};

export default function ChatbotFloatingButton({
  onClick,
}: ChatbotFloatingButtonProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(0);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaChange = () => setIsMobile(mediaQuery.matches);

    handleMediaChange();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setImageOpacity(1);
      return;
    }

    const handleMouseMove = () => {
      setImageOpacity(1);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        setImageOpacity(0);
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

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .chat-trigger {
            position: fixed;
            bottom: 14px;
            right: 82px;
            z-index: 1000;
          }

          .chat-trigger button {
            background: transparent;
            border: none;
            cursor: pointer;
            opacity: 0.85;
            transition: opacity 0.2s ease;
          }

          .chat-trigger button:hover {
            opacity: 1;
          }

          .chat-trigger img {
            max-width: 250px;
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          @media (max-width: 768px) {
            .chat-trigger {
              right: 16px;
              bottom: 16px;
            }

            .chat-trigger button {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: #8169f7;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 1;
            }

            .chat-trigger img {
              max-width: 28px;
              opacity: 1 !important;
            }
          }
        `}
      </style>
      <div className="chat-trigger">
        <button
          id="chatButton"
          type="button"
          aria-label="Abrir chat"
          onClick={onClick}
        >
          <img
            id="chatImage"
            src="https://bot-flow.s3.connectacx.com/atesteme/iconeatesteme.jpeg"
            alt="Abrir chat"
            style={{ opacity: imageOpacity }}
          />
        </button>
      </div>
    </>
  );
}
