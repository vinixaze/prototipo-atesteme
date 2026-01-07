import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  Bell,
  User,
  Coins,
  Plus,
  Minus,
  Moon,
  Sun,
  LogOut,
  UserCircle,
  Trophy,
  Award,
  HelpCircle,
  Eye,
  LayoutGrid,
  X,
  Laptop,
  DollarSign,
  BookOpen,
  Leaf,
  Car,
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

export default function Header({
  onMenuClick,
  userName,
  navigateTo,
  onLogout,
  activeModule = "atesteme",
  onModuleChange,
}: HeaderProps) {
  const [fontSize, setFontSize] = useState(100); // Percentage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Inicializar do localStorage
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

  // Handle scroll to hide/show header
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Mock data
  const digcoinsHistory = [
    {
      id: 1,
      activity: "Quiz de Informações e Dados",
      coins: 50,
      date: "22/12/2024",
    },
    {
      id: 2,
      activity: "Conquista: Primeira Competência",
      coins: 100,
      date: "20/12/2024",
    },
    { id: 3, activity: "Quiz de Comunicação", coins: 50, date: "18/12/2024" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Nova mensagem recebida!",
      description: "Parabéns por completar 5 quizzes",
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
  ];

  return (
    <>
      <header
        className={`bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
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

            {/* Logo PNG */}
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

          {/* Right: Dark Mode, Font Controls, Coins, Notifications, User */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Dark Mode Toggle */}
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

            {/* Font Size Controls - Hidden on mobile */}
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

            {/* Digcoins Dropdown */}
            <div className="relative" ref={digcoinsRef}>
              <div
                onClick={() => setShowDigcoinsDropdown(!showDigcoinsDropdown)}
                className="flex items-center gap-1 md:gap-2 bg-yellow-400 hover:bg-yellow-500 px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-colors cursor-pointer"
              >
                <Coins className="w-4 h-4 text-gray-900" />
                <span className="text-xs md:text-base font-bold text-gray-900">
                  1247
                </span>
              </div>

              {showDigcoinsDropdown && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Coins className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-white/90">Saldo Total</p>
                        <p className="text-2xl font-bold text-white">
                          1247 Pontos
                        </p>
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

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() =>
                  setShowNotificationsDropdown(!showNotificationsDropdown)
                }
                className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
              >
                <Bell className="w-4 h-4 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotificationsDropdown && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-4">
                    <h3 className="text-lg font-bold text-white">Mensagens</h3>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg transition-colors cursor-pointer ${notif.unread
                            ? "bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                            : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <div className="w-2 h-2 bg-[#8B27FF] rounded-full mt-2 flex-shrink-0"></div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {notif.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-3 text-sm text-[#8B27FF] dark:text-[#A855F7] hover:underline font-semibold">
                      Ver todas as mensagens
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
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
                        <p className="text-xs text-white/80">
                          Estudante
                        </p>
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

                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

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

      {/* Módulos Modal - Renderizado via Portal */}
      {showModulosModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowModulosModal(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-3xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Escolha sua Jornada
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

              {/* Módulo Atual */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Jornada Atual
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
                      <Trophy className="w-4 h-4" />
                      <span>5 categorias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>25 competências</span>
                    </div>
                  </div>

                  {/* Efeito decorativo */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                </button>
              </div>

              {/* Outras Jornadas */}
              <div className="mb-3">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Outras Jornadas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Educação Financeira */}
                <button
                  disabled
                  className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      EM BREVE
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

                {/* Prosaeb */}
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

                {/* Educação Ambiental */}
                <button
                  disabled
                  className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      EM BREVE
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

                {/* Educação para o Trânsito */}
                <button
                  disabled
                  className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      EM BREVE
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                      <Car className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-500 dark:text-gray-400">
                        Educação para o Trânsito
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Segurança e cidadania no trânsito
                  </p>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
