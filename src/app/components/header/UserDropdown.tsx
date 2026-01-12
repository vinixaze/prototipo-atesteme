import { UserCircle, HelpCircle, Eye, LayoutGrid, LogOut, User } from 'lucide-react';

interface UserDropdownProps {
  isOpen: boolean;
  userName?: string;
  onNavigateTo?: (page: string) => void;
  onLogout?: () => void;
  onShowModulos?: () => void;
}

export default function UserDropdown({
  isOpen,
  userName,
  onNavigateTo,
  onLogout,
  onShowModulos,
}: UserDropdownProps) {
  if (!isOpen) return null;

  return (
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
            onNavigateTo?.("perfil");
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
            onNavigateTo?.("faq");
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
            onNavigateTo?.("acessibilidade");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
        >
          <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Acessibilidade
          </span>
        </button>

        <button
          onClick={onShowModulos}
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
  );
}

