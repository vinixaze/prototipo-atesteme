import React, { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

type ChatMessage = {
  text: string;
  sender: "user" | "bot";
  time: string;
};

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSuppressed, setIsSuppressed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateSuppressed = () => {
      setIsSuppressed(document.body.classList.contains("chat-suppressed"));
    };

    updateSuppressed();
    const observer = new MutationObserver(updateSuppressed);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSuppressed && isOpen) {
      setIsOpen(false);
    }
  }, [isSuppressed, isOpen]);

  const handleLogin = () => {
    if (formData.name && formData.phone) {
      setIsLoggedIn(true);
      setMessages([
        {
          text: `Olá ${formData.name}! Como posso te ajudar?`,
          sender: "bot",
          time: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          text: inputMessage,
          sender: "user",
          time: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isLoggedIn) {
        handleSendMessage();
      } else {
        handleLogin();
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isMobile) {
    return (
      <>
        {!isOpen && !isSuppressed && (
          <button
            onClick={handleOpen}
            className="fixed bottom-6 right-10 z-[1000] bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <MessageCircle size={32} />
          </button>
        )}

        {isOpen && (
          <div className="fixed bottom-6 right-6 z-[1000] w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://bot-flow.s3.connectacx.com/atesteme/iconeatesteme.jpeg"
                  alt="Tina"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="font-semibold">Tina</span>
              </div>
              <button
                onClick={handleClose}
                className="hover:bg-purple-700 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!isLoggedIn && (
              <div className="p-6">
                <h3 className="font-semibold mb-4">Informações do Usuário</h3>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onKeyPress={handleKeyPress}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onKeyPress={handleKeyPress}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                  >
                    Enviar
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-right mt-4">
                  Prazer em atender
                </p>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex flex-col h-[450px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "user"
                              ? "text-purple-200"
                              : "text-gray-500"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors"
                    >
                      <MessageCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {!isOpen && !isSuppressed && (
        <button
          onClick={handleOpen}
          className="fixed right-6 z-[1000] bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg active:scale-95 transition-all"
          style={{ bottom: "calc(16px + env(safe-area-inset-bottom) + 70px)" }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && !isSuppressed && (
        <div
          className="fixed right-4 z-[1000] w-[92vw] max-w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ bottom: "calc(16px + env(safe-area-inset-bottom) + 70px)" }}
        >
          <div className="bg-purple-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://bot-flow.s3.connectacx.com/atesteme/iconeatesteme.jpeg"
                alt="Tina"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="font-semibold text-sm">Tina</span>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-purple-700 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {!isLoggedIn && (
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-3">
                Informações do Usuário
              </h3>
              <div>
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg text-sm font-medium transition-colors"
                >
                  Enviar
                </button>
              </div>
              <p className="text-xs text-gray-500 text-right mt-3">
                Prazer em atender
              </p>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex flex-col h-[60vh] max-h-[420px]">
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-xs">{msg.text}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.sender === "user"
                            ? "text-purple-200"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite..."
                    className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors"
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
