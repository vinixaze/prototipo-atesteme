import { useEffect, useRef, useState } from "react";

type ChatbotFloatingButtonProps = {
  onClick?: () => void;
};

export default function ChatbotFloatingButton({
  onClick,
}: ChatbotFloatingButtonProps) {
  const [isHidden, setIsHidden] = useState(false);
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

  if (isHidden) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .webchat-header {
            position: fixed;
            bottom: 14px;
            right: 82px;
            z-index: 1000;
          }

          .webchat-header img {
            width: 100%;
            max-width: 250px;
          }

          #close-button {
            background-color: transparent !important;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s ease-in-out;
          }

          #close-button:hover {
            opacity: 1;
          }

          #header-image {
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          @media (max-width: 768px) {
            .webchat-header {
              right: 50%;
              bottom: 16px;
              transform: translateX(50%);
            }

            .webchat-header img {
              max-width: 180px;
              opacity: 1 !important;
            }

            #close-button {
              opacity: 1;
            }

            #header-image {
              opacity: 1 !important;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
              border-radius: 16px;
            }
          }
        `}
      </style>
      <div className="webchat-header">
        <button
          id="close-button"
          type="button"
          aria-label="Chat Atesteme"
          onClick={() => {
            onClick?.();
            setIsHidden(true);
          }}
        >
          <img
            id="header-image"
            src="https://i.postimg.cc/C5xPXFxB/Group-262.png"
            alt="Chat Atesteme"
            style={{ opacity: imageOpacity }}
          />
        </button>
      </div>
    </>
  );
}
