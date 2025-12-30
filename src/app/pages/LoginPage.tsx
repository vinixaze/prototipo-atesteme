import { useState, useEffect } from "react";
import { Eye, EyeOff, Download, X } from "lucide-react";
import backgroundImage from "../../assets/934760553d44b42ec1dd098296a4a1143272299c.png";
import logoImage from "../../assets/bd6e15ee05cd5d9957a2d399e18c0693a6190505.png";

interface LoginPageProps {
  onLogin?: (name: string) => void;
  navigateTo: (page: string) => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function LoginPage({ onLogin, navigateTo }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Detectar prompt de instalação PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      
      // Verificar se já foi mostrado antes
      const hasSeenBanner = localStorage.getItem('pwa-install-banner-shown');
      if (!hasSeenBanner) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-install-banner-shown', 'true');
    }

    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-banner-shown', 'true');
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return "Campo obrigatório";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{11}$/;
    const cpfWithMaskRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (
      !emailRegex.test(value) &&
      !cpfRegex.test(value) &&
      !cpfWithMaskRegex.test(value)
    ) {
      return "Email ou CPF inválido";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Campo obrigatório";
    }
    if (value.length < 6) {
      return "Senha deve ter no mínimo 6 caracteres";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setIsLoading(true);

    // Simular chamada de API
    setTimeout(() => {
      setIsLoading(false);
      // Extrair nome do email ou usar nome padrão
      const name = email.split("@")[0] || "Usuário";
      onLogin?.(name);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.("Usuário");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex items-center justify-center relative dark:bg-gray-900">
      {/* Barra de Instalação PWA - Fina no topo (similar a aviso de cookie) */}
      {showInstallBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Download className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm font-medium truncate">
                Instale o ATESTEME para acesso rápido e experiência completa
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 bg-white text-[#8B27FF] rounded-lg text-sm font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Instalar
              </button>
              <button
                onClick={handleDismissInstall}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Imagem de Fundo - Tela Cheia - Posicionada mais à esquerda */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'left center',
        }}
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />

      {/* Logo Atesteme - Centro Esquerda (Desktop) - Ajustado para cima e mais à esquerda */}
      <div className="absolute left-[4%] top-[20%] z-10 hidden lg:block">
        <img
          src={logoImage}
          alt="Atesteme Logo"
          className="w-[400px] h-auto drop-shadow-2xl"
          style={{ objectPosition: 'left center' }}
        />
      </div>

      {/* Card de Login Flutuante */}
      <div className="relative z-20 w-full max-w-[520px] px-4 lg:absolute lg:right-[3%] lg:top-1/2 lg:-translate-y-1/2 lg:px-0 mt-32 lg:mt-0">
        <div className="bg-white dark:bg-gray-800 rounded-[20px] p-6 sm:p-8 lg:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_48px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_12px_48px_rgba(0,0,0,0.6)]">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-6 sm:mb-8">
            Fazer login
          </h2>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-[#333] dark:text-gray-300 mb-2"
              >
                CPF ou E-mail
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="000.000.000-00"
                className={`
                  w-full h-12 px-4 sm:px-6 rounded-3xl border-2 
                  text-[#333] text-sm sm:text-base
                  placeholder:text-gray-400
                  transition-all duration-200
                  outline-none
                  ${
                    emailError
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#8B27FF] focus:shadow-[0_0_0_4px_rgba(139,39,255,0.1)]"
                  }
                `}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Campo de Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-[#333] dark:text-gray-300 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="Digite sua senha"
                  className={`
                    w-full h-12 px-4 sm:px-6 pr-12 sm:pr-14 rounded-3xl border-2 
                    text-[#333] text-sm sm:text-base
                    placeholder:text-gray-400
                    transition-all duration-200
                    outline-none
                    ${
                      passwordError
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#8B27FF] focus:shadow-[0_0_0_4px_rgba(139,39,255,0.1)]"
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}

              {/* Link Esqueceu a senha */}
              <div className="text-left mt-2">
                <button
                  type="button"
                  onClick={() => navigateTo("forgot-password")}
                  className="text-sm text-[#8B27FF] hover:text-[#6B1FBF] hover:underline transition-all"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </div>

            {/* Botão Continuar */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full h-12 rounded-3xl text-white text-sm sm:text-base font-bold
                transition-all duration-200 mt-4 sm:mt-6
                ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#8B27FF] hover:bg-[#7B1FE8] hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(139,39,255,0.3)] hover:shadow-[0_4px_16px_rgba(139,39,255,0.4)] active:scale-[0.98]"
                }
              `}
            >
              {isLoading ? "Entrando..." : "Continuar"}
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-5 sm:my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">Ou</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Botão Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="
              w-full h-12 rounded-3xl border-2 border-gray-300
              bg-white hover:bg-gray-50 hover:border-gray-400
              transition-all duration-200
              flex items-center justify-center gap-2 sm:gap-3
              text-[#333] text-sm sm:text-base
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="hidden sm:inline">Continuar com Google</span>
            <span className="sm:hidden">Google</span>
          </button>
        </div>

        {/* Links Mobile - Abaixo do Card */}
        <div className="lg:hidden mt-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <button
              onClick={() => navigateTo("support")}
              className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
            >
              Atendimento ao usuário
            </button>
            <span className="text-white/60 hidden sm:inline">|</span>
            <button
              onClick={() => navigateTo("privacy")}
              className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
            >
              Políticas de privacidade
            </button>
            <span className="text-white/60 hidden sm:inline">|</span>
            <button
              onClick={() => navigateTo("terms")}
              className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
            >
              Termos e condições
            </button>
          </div>
        </div>
      </div>

      {/* Logo Mobile - Topo */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 lg:hidden z-10">
        <img
          src={logoImage}
          alt="Atesteme Logo"
          className="w-[180px] sm:w-[250px] h-auto drop-shadow-lg"
        />
      </div>

      {/* Links de Rodapé Desktop - Embaixo da Logo */}
      <div className="absolute left-[8%] bottom-6 z-10 hidden lg:block">
        <div className="flex items-center justify-center gap-3 text-sm">
          <button
            onClick={() => navigateTo("support")}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Atendimento ao usuário
          </button>
          <span className="text-white/60">|</span>
          <button
            onClick={() => navigateTo("privacy")}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Políticas de privacidade
          </button>
          <span className="text-white/60">|</span>
          <button
            onClick={() => navigateTo("terms")}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Termos e condições
          </button>
        </div>
      </div>
    </div>
  );
}
