import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  Bell,
  User,
  Wallet,
  Plus,
  Minus,
  Moon,
  Sun,
  LogOut,
  UserCircle,
  HelpCircle,
  Eye,
  LayoutGrid,
  X,
  Laptop,
  DollarSign,
  BookOpen,
  Leaf,
  Car,
  Target,
  Heart,
  Building,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

import prosaebLogo from "../../assets/c8fa7f66c2fe8238b13cdb022c41e85fac6b0ed1.png";
import logoDarkMode from "../../assets/logo-darkmode.png";
import logoLightMode from "../../assets/logo-lightmode.png";

interface HeaderProps {
  onMenuClick?: () => void;
  userName?: string;
  navigateTo?: (page: string) => void;
  onLogout?: () => void;
  activeModule?: "atesteme" | "prosaeb";
  onModuleChange?: (module: "atesteme" | "prosaeb") => void;
}

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

export default function Header({
  onMenuClick,
  userName,
  navigateTo,
  onLogout,
  activeModule = "atesteme",
  onModuleChange,
}: HeaderProps) {
  const [fontSize, setFontSize] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode === "true";
    }
    return false;
  });

  const [showDigcoinsDropdown, setShowDigcoinsDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModulosModal, setShowModulosModal] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [showMoreModules, setShowMoreModules] = useState(false);

  // ===== NOTIFICATIONS (corrigido) =====
  const INITIAL_NOTIFS = 3;
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreAnchorRef = useRef<HTMLDivElement | null>(null);

  // Refs dropdowns
  const digcoinsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        digcoinsRef.current &&
        !digcoinsRef.current.contains(event.target as Node)
      ) {
        setShowDigcoinsDropdown(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotificationsDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply font size to root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Apply dark mode e salvar no localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  // Prevent background scroll when modulos modal is open
  useEffect(() => {
    if (!showModulosModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showModulosModal]);

  // Reset notifications state when open dropdown
  useEffect(() => {
    if (showNotificationsDropdown) {
      setShowAllNotifications(false);
      setSelectedNotification(null);
    }
  }, [showNotificationsDropdown]);

  // Handle scroll to hide/show header
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) setIsVisible(false);
      else setIsVisible(true);

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80));
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Mock data
  const digcoinsHistory = [
    { id: 1, activity: "Quiz de Informações e Dados", coins: 50, date: "22/12/2024" },
    { id: 2, activity: "Conquista: Primeira Competência", coins: 100, date: "20/12/2024" },
    { id: 3, activity: "Quiz de Comunicação", coins: 50, date: "18/12/2024" },
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Nova mensagem recebida!",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (texto grande pra testar scroll)",
      time: "2h atrás",
      unread: true,
    },
    {
      id: 2,
      title: "Você subiu de nível!",
      description: "Agora você está no Nível 2",
      time: "1 dia atrás",
      unread: true,
    },
    {
      id: 3,
      title: "Novo conteúdo disponível",
      description: "Confira os novos desafios em Proteção e Segurança",
      time: "2 dias atrás",
      unread: false,
    },
    {
      id: 4,
      title: "Atualização do sistema",
      description: "Melhorias de performance e correções foram aplicadas.",
      time: "3 dias atrás",
      unread: false,
    },
    {
      id: 5,
      title: "Nova atividade liberada",
      description: "Você tem uma nova atividade para completar hoje.",
      time: "4 dias atrás",
      unread: true,
    },
    {
      id: 6,
      title: "Lembrete",
      description: "Não esqueça de finalizar seu progresso semanal.",
      time: "5 dias atrás",
      unread: false,
    },
  ];

  const visibleNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, INITIAL_NOTIFS);

  const hasMoreNotifications =
    !showAllNotifications && notifications.length > INITIAL_NOTIFS;

  return (
    <>
      <header
        className={`bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500 fixed top-0 left-0 right-0 z-50 transition-transform duration-300
          ${
            showModulosModal
              ? "hidden"
              : isVisible
              ? "translate-y-0"
              : "-translate-y-full"
          }`}
      >
        <div className="px-4 py-4 flex items-center justify-between gap-3">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="hidden md:inline-flex p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center">
              <img
                src={
                  activeModule === "prosaeb"
                    ? prosaebLogo
                    : isDarkMode
                    ? logoDarkMode
                    : logoLightMode
                }
                alt={activeModule === "prosaeb" ? "Prosaeb Logo" : "Atesteme Logo"}
                className="
                  h-10 sm:h-11 md:h-12
                  w-auto
                  max-w-[180px] sm:max-w-[220px] md:max-w-[260px]
                  object-contain
                  select-none
                "
                draggable={false}
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Font size - desktop */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={increaseFontSize}
                className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors"
                title="Aumentar fonte"
              >
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <span className="text-sm px-1 text-gray-700 dark:text-gray-300">
                A
              </span>
              <button
                onClick={decreaseFontSize}
                className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors"
                title="Diminuir fonte"
              >
                <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Digcoins */}
            <div className="relative" ref={digcoinsRef}>
              <div
                onClick={() => setShowDigcoinsDropdown((v) => !v)}
                className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-[#FCD34D] to-[#FBBF24] hover:brightness-105 px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                <Wallet className="w-4 h-4 text-gray-900" />
                <span className="text-xs md:text-base font-bold text-gray-900">
                  543
                </span>
              </div>

              {showDigcoinsDropdown && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative -top-5">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <p className="text-sm text-white/90">Saldo Atual</p>
                        <p className="text-2xl font-bold text-white">
                          1247 Pontos
                        </p>
                        <button
                          onClick={() => {
                            setShowDigcoinsDropdown(false);
                            navigateTo?.("progresso");
                          }}
                          className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm py-2 rounded-lg transition-colors"
                        >
                          Ver mais
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      Histórico Recente
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {digcoinsHistory.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {item.activity}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.date}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                            +{item.coins}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() =>
                  setShowNotificationsDropdown((prev) => !prev)
                }
                className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
              >
                <Bell className="w-4 h-4 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotificationsDropdown && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 flex flex-col max-h-[80vh]">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-4">
                    <div className="flex items-center gap-3">
                      {selectedNotification ? (
                        <button
                          type="button"
                          onClick={() => setSelectedNotification(null)}
                          className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                          aria-label="Voltar"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-white" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {selectedNotification ? "Mensagem" : "Mensagens"}
                        </h3>
                        <p className="text-xs text-white/80">
                          {selectedNotification
                            ? selectedNotification.time
                            : "Toque para abrir"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body scroll */}
                  <div
                    ref={listContainerRef}
                    className="p-4 flex-1 overflow-y-auto overscroll-contain"
                  >
                    {!selectedNotification ? (
                      <>
                        <div className="space-y-2">
                          {visibleNotifications.map((notif) => (
                            <button
                              key={notif.id}
                              type="button"
                              onClick={() => setSelectedNotification(notif)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                notif.unread
                                  ? "bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                                  : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {notif.unread && (
                                  <div className="w-2 h-2 bg-[#8B27FF] rounded-full mt-2 flex-shrink-0" />
                                )}

                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {notif.title}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                    {notif.description}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {notif.time}
                                  </p>
                                </div>

                                <ArrowRight className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                              </div>
                            </button>
                          ))}

                          <div ref={loadMoreAnchorRef} />
                        </div>

                        {hasMoreNotifications ? (
                          <button
                            type="button"
                            onClick={() => {
                              setShowAllNotifications(true);
                              requestAnimationFrame(() => {
                                loadMoreAnchorRef.current?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "end",
                                });
                              });
                            }}
                            className="relative z-10 w-full mt-3 text-sm text-[#8B27FF] dark:text-[#A855F7] hover:underline font-semibold"
                          >
                            Ver todas as mensagens
                          </button>
                        ) : (
                          <p className="w-full mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                            Você já viu todas as mensagens.
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B27FF] to-[#A855F7] flex items-center justify-center shrink-0">
                              <Bell className="w-5 h-5 text-white" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                {selectedNotification.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {selectedNotification.time}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                              {selectedNotification.description}
                            </p>
                          </div>
                        </div>

                        <div className="sticky bottom-0 pt-4 bg-white dark:bg-gray-800">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedNotification(null)}
                              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                            >
                              Voltar
                            </button>

                            <button
                              type="button"
                              onClick={() => setShowNotificationsDropdown(false)}
                              className="flex-1 px-4 py-2 rounded-xl bg-[#8B27FF] text-white hover:bg-[#6B1FBF] transition-colors font-bold"
                            >
                              Fechar
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserDropdown((v) => !v)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-[#8B27FF] dark:text-[#A855F7]" />
                </div>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white">
                          {userName || "Usuário"}
                        </p>
                        <p className="text-xs text-white/80">Estudante</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigateTo?.("perfil");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                    >
                      <UserCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Meu Perfil
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigateTo?.("faq");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        FAQ
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigateTo?.("acessibilidade");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                    >
                      <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Acessibilidade
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowModulosModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors text-left"
                    >
                      <LayoutGrid className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" />
                      <span className="text-sm font-semibold text-[#8B27FF] dark:text-[#A855F7]">
                        Módulos
                      </span>
                    </button>

                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onLogout?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        Sair
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Módulos Modal */}
      {showModulosModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/50 dark:bg-black/70 overflow-y-auto"
            onClick={() => setShowModulosModal(false)}
          >
            <div className="min-h-full flex items-start justify-center p-4 py-6 md:items-center">
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      Escolha seu módulo
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selecione o módulo de aprendizagem que deseja explorar
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModulosModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Módulo Atual
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onModuleChange?.("atesteme");
                      setShowModulosModal(false);
                    }}
                    className="w-full relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Laptop className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white">
                            Educação Digital
                          </h3>
                          <p className="text-sm text-white/90">
                            Competências digitais e tecnológicas
                          </p>
                        </div>
                      </div>
                      {activeModule === "atesteme" && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                          ATIVA
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>5 Áreas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>16 Competências</span>
                      </div>
                    </div>

                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                  </button>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Outros Módulos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    disabled
                    className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                        Em Breve
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                        <Car className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-500 dark:text-gray-400">
                          Educação para os Direitos Humanos
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Direitos Humanos e cidadania
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      onModuleChange?.("prosaeb");
                      setShowModulosModal(false);
                    }}
                    className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 border-2 border-blue-500 shadow-lg hover:shadow-xl group"
                  >
                    {activeModule === "prosaeb" && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500 text-white shadow-lg">
                          ATIVA
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">Prosaeb</h3>
                      </div>
                    </div>
                    <p className="text-xs text-white/90">
                      Programa de Avaliação da Educação Básica
                    </p>
                  </button>

                  <button
                    disabled
                    className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                        Em Breve
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                        <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-500 dark:text-gray-400">
                          Educação Socioemocional
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Direitos Humanos e cidadania
                    </p>
                  </button>

                  <button
                    disabled
                    className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                        Em Breve
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                        <Building className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-500 dark:text-gray-400">
                          Empreendedorismo
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Direitos Humanos e cidadania
                    </p>
                  </button>

                  {showMoreModules && (
                    <>
                      <button
                        disabled
                        className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                      >
                        <div className="absolute top-2 right-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                            Em Breve
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                            <DollarSign className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-500 dark:text-gray-400">
                              Educação Financeira
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Gestão financeira e planejamento pessoal
                        </p>
                      </button>

                      <button
                        disabled
                        className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                      >
                        <div className="absolute top-2 right-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                            Em Breve
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                            <Leaf className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-500 dark:text-gray-400">
                              Educação Ambiental
                            </h3>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Sustentabilidade e consciência ecológica
                        </p>
                      </button>
                    </>
                  )}

                  <div className="md:col-span-2 flex items-center justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setShowMoreModules((prev) => !prev)}
                      className="px-5 py-2 rounded-full font-bold text-sm bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border border-[#8B27FF]/30 dark:border-[#A855F7]/30 shadow-sm hover:shadow-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                    >
                      {showMoreModules ? "Ver menos" : "Ver mais"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
