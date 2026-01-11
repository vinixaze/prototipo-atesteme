import { useEffect, useRef, useState } from "react";

type ChatbotFloatingButtonProps = {
  onClick?: () => void;
};

export default function ChatbotFloatingButton({
  onClick,
}: ChatbotFloatingButtonProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [desktopOpacity, setDesktopOpacity] = useState(0);
  const [compactOpacity, setCompactOpacity] = useState(0);
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
      setDesktopOpacity(0);
      setCompactOpacity(1);
      return;
    }

    const handleMouseMove = () => {
      setDesktopOpacity(1);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        setDesktopOpacity(0);
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

  if (isHidden) {
    return null;
  }

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; }

          .webchat-header {
            position: fixed;
            bottom: 14px;
            right: 82px;
            z-index: 1000;
          }

          .webchat-header img.desktop-image {
            width: 100%;
            max-width: 250px;
          }

          #close-button {
            background-color: transparent !important;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s ease-in-out;
            padding: 0;
          }

          #close-button:hover { opacity: 1; }

          #header-image {
            opacity: 0;
            transition: opacity 0.2s ease;
            display: block;
            border-radius: 12px;
          }

          @media (max-width: 768px) {
            .webchat-header {
              right: 16px;
              bottom: 16px;
            }

            .webchat-header img.desktop-image { display: none; }

            #close-button {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: linear-gradient(135deg, #8169f7 0%, #6b56e8 100%);
              box-shadow: 0 10px 30px rgba(20,15,40,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              opacity: 1;
            }

            #header-image {
              width: 26px;
              height: 26px;
              opacity: 1 !important;
              border-radius: 50%;
              background: transparent;
              box-shadow: none;
              transform: translateY(0);
            }

            .chat-label { display: none; }
          }
        `}
      </style>
      <div className="webchat-header" role="region" aria-label="Atendimento Tina">
        <button
          id="close-button"
          type="button"
          aria-label="Abrir/Fechar chat"
          onClick={() => {
            onClick?.();
            setIsHidden(true);
          }}
          onTouchStart={(event) => {
            if (isMobile) {
              event.preventDefault();
            }
          }}
        >
          <img
            className="desktop-image"
            id="desktop-image"
            src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
            alt="Chat Atesteme"
            style={{ opacity: desktopOpacity }}
          />
          <img
            id="header-image"
            src="https://bot-flow.s3.connectacx.com/atesteme/iconeatesteme.jpeg"
            alt="Tina"
            style={{ opacity: compactOpacity }}
          />
        </button>
      </div>
    </>
  );
}
