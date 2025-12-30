import { LayoutDashboard, Target, TrendingUp, FileText, X, FileCheck, HelpCircle, Eye, Settings, BookOpen, GitBranch } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  isAdmin?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  isAdmin,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'habilidades', icon: Target, label: 'Habilidades' },
    { id: 'progresso', icon: TrendingUp, label: 'Progresso' },
    { id: 'conteudos', icon: FileText, label: 'Conteúdos' },
    { id: 'plano-aula', icon: BookOpen, label: 'Plano de Aula' },
    { id: 'transversality', icon: GitBranch, label: 'Transversalidade' },
    { id: 'exames', icon: FileCheck, label: 'Exames' },
  ];

  const bottomItems: { id: string; icon: any; label: string }[] = [
    // FAQ e Acessibilidade foram movidos para o dropdown do usuário no Header
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-gradient-to-b from-[#8B27FF] via-[#7B1FE8] to-[#6B1FBF]
          dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black
          dark:border-r dark:border-gray-800
          w-[280px] z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button */}
        <div className="p-6 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 pt-16 flex flex-col">
          <ul className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate?.(item.id);
                    onClose?.();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${
                      currentPage === item.id
                        ? 'bg-[#A855F7] dark:bg-[#8B27FF] text-white shadow-lg dark:shadow-purple-900/50'
                        : 'text-white/80 hover:bg-white/10 dark:hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  <span
                    className={`text-white ${
                      currentPage === item.id ? 'font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom Items - Side by Side */}
          <div className="grid grid-cols-2 gap-2 pb-6">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate?.(item.id);
                  onClose?.();
                }}
                className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-full bg-white/10 text-white/80 hover:bg-white hover:text-[#8B27FF] hover:scale-105 transition-all duration-300"
              >
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[10px] font-medium text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}