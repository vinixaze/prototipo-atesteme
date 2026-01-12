interface LoginDesktopFooterProps {
  onNavigate: (page: string) => void;
}

export function LoginDesktopFooter({ onNavigate }: LoginDesktopFooterProps) {
  return (
    <div className="absolute left-[8%] bottom-6 z-10 hidden lg:block">
      <div className="flex items-center justify-center gap-3 text-sm">
        <button
          onClick={() => onNavigate('support')}
          className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
        >
          Atendimento ao usuário
        </button>
        <span className="text-white/60">|</span>
        <button
          onClick={() => onNavigate('privacy')}
          className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
        >
          Políticas de privacidade
        </button>
        <span className="text-white/60">|</span>
        <button
          onClick={() => onNavigate('terms')}
          className="text-white hover:text-white/80 hover:underline transition-colors font-medium drop-shadow-lg"
        >
          Termos e condições
        </button>
      </div>
    </div>
  );
}
