import { Eye, EyeOff } from 'lucide-react';

interface LoginCardProps {
  email: string;
  password: string;
  showPassword: boolean;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onForgotPassword: () => void;
  onGoogleLogin: () => void;
  onNavigate: (page: string) => void;
}

export function LoginCard({
  email,
  password,
  showPassword,
  emailError,
  passwordError,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onForgotPassword,
  onGoogleLogin,
  onNavigate,
}: LoginCardProps) {
  return (
    <div className="relative z-20 w-full max-w-[520px] px-4 lg:absolute lg:right-[3%] lg:top-1/2 lg:-translate-y-1/2 lg:px-0 mt-44 sm:mt-52 lg:mt-0">
      <div className="bg-white dark:bg-gray-800 rounded-[20px] p-6 sm:p-8 lg:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_48px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_12px_48px_rgba(0,0,0,0.6)]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-6 sm:mb-8">
          Fazer login
        </h2>

        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
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
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="000.000.000-00"
              className={`
                w-full h-12 px-4 sm:px-6 rounded-3xl border-2
                text-[#333] text-sm sm:text-base
                placeholder:text-gray-400
                transition-all duration-200
                outline-none
                ${emailError
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-[#8B27FF] focus:shadow-[0_0_0_4px_rgba(139,39,255,0.1)]'
                }
              `}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Digite sua senha"
                className={`
                  w-full h-12 px-4 sm:px-6 pr-12 sm:pr-14 rounded-3xl border-2
                  text-[#333] text-sm sm:text-base
                  placeholder:text-gray-400
                  transition-all duration-200
                  outline-none
                  ${passwordError
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-[#8B27FF] focus:shadow-[0_0_0_4px_rgba(139,39,255,0.1)]'
                  }
                `}
              />
              <button
                type="button"
                onClick={onTogglePassword}
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

            <div className="text-left mt-2">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#8B27FF] hover:text-[#6B1FBF] hover:underline transition-all"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full h-12 rounded-3xl text-white text-sm sm:text-base font-bold
              transition-all duration-200 mt-4 sm:mt-6
              ${isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#8B27FF] hover:bg-[#7B1FE8] hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(139,39,255,0.3)] hover:shadow-[0_4px_16px_rgba(139,39,255,0.4)] active:scale-[0.98]'
              }
            `}
          >
            {isLoading ? 'Entrando...' : 'Continuar'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-5 sm:my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">Ou</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={onGoogleLogin}
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

      <div className="lg:hidden mt-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <button
            onClick={() => onNavigate('support')}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Atendimento ao usuário
          </button>
          <span className="text-white/60 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate('privacy')}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Políticas de privacidade
          </button>
          <span className="text-white/60 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate('terms')}
            className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
          >
            Termos e condições
          </button>
        </div>
      </div>
    </div>
  );
}
