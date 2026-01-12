import {
  Home,
  LayoutDashboard,
  Target,
  TrendingUp,
  FileText,
  X,
  FileCheck,
  HelpCircle,
  BookOpen,
  GitBranch,
  Grid3X3
} from 'lucide-react';

import { useState, useEffect } from 'react';

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
  const [showMore, setShowMore] = useState(false);

  // Evitar rolagem de fundo quando o modal móvel estiver aberto
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (showMore) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [showMore]);

  // Garantir restauração da rolagem ao desmontar o componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'habilidades', icon: Target, label: 'Competências' },
    { id: 'progresso', icon: TrendingUp, label: 'Progresso' },
    { id: 'conteudo', icon: FileText, label: 'Conteúdo' },
    { id: 'plano-aula', icon: BookOpen, label: 'Plano de Aula' },
    { id: 'transversality', icon: GitBranch, label: 'Transversalidade' },
    { id: 'exames', icon: FileCheck, label: 'Exames' },
  ];

  const bottomItems: { id: string; icon: any; label: string }[] = [
    // FAQ e Acessibilidade foram movidos para o dropdown do usuário no Header
  ];

  return (
    <>
      {/* Camada de fundo (apenas para md e acima) */}
      {isOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Barra lateral */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-gradient-to-b from-[#8B27FF] via-[#7B1FE8] to-[#6B1FBF]
          dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black
          dark:border-r dark:border-gray-800
          w-[280px] z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          hidden md:flex
        `}
      >
        {/* Botão de fechar */}
        <div className="p-6 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Itens do menu */}
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
                    ${currentPage === item.id
                      ? 'bg-[#A855F7] dark:bg-[#8B27FF] text-white shadow-lg dark:shadow-purple-900/50'
                      : 'text-white/80 hover:bg-white/10 dark:hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  <span
                    className={`text-white ${currentPage === item.id ? 'font-bold' : ''
                      }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Itens inferiores lado a lado */}
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

      {/* Navegação inferior no mobile */}
      <div
        className="
    fixed bottom-3 left-1/2 -translate-x-1/2 md:hidden z-50
    w-[92%]
    bg-white/95 dark:bg-gray-900/95
    border border-gray-200 dark:border-gray-800
    rounded-2xl shadow-lg
    px-2 py-2
    flex items-stretch justify-between
  "
      >
        {/* Início */}
        <button
          onClick={() => onNavigate?.('dashboard')}
          className={`
      flex-1 flex flex-col items-center justify-center gap-1
      py-2 rounded-xl transition
      ${currentPage === 'dashboard'
              ? 'text-[#8B27FF] dark:text-[#C084FC]'
              : 'text-gray-500 dark:text-gray-400'
            }
    `}
        >
          <Home className="w-7 h-7" />
          <span className="text-[11px] font-semibold leading-none">Início</span>
        </button>

        {/* Competências */}
        <button
          onClick={() => onNavigate?.('habilidades')}
          className={`
              flex-1 flex flex-col items-center justify-center gap-1
              py-2 rounded-xl transition
              ${currentPage === 'habilidades'
              ? 'text-[#8B27FF] dark:text-[#C084FC]'
              : 'text-gray-500 dark:text-gray-400'
            }
          `}
        >
          <Target className="w-7 h-7" />
          <span className="text-[11px] font-semibold leading-none">Competências</span>
        </button>


        {/* Progresso */}
        <button
          onClick={() => onNavigate?.('progresso')}
          className={`
      flex-1 flex flex-col items-center justify-center gap-1
      py-2 rounded-xl transition
      ${currentPage === 'progresso'
              ? 'text-[#8B27FF] dark:text-[#C084FC]'
              : 'text-gray-500 dark:text-gray-400'
            }
    `}
        >
          <TrendingUp className="w-7 h-7" />
          <span className="text-[11px] font-semibold leading-none">Progresso</span>
        </button>



        {/* Outros */}
        <button
          onClick={() => setShowMore(true)}
          className="
            flex-1 flex flex-col items-center justify-center gap-1
            py-2 rounded-xl transition
            text-gray-500 dark:text-gray-400
          "
        >
          {/* escolha 1: Grid3X3 | escolha 2: LayoutDashboard */}
          <Grid3X3 className="w-7 h-7" />
          <span className="text-[11px] font-semibold leading-none">Outros</span>
        </button>
      </div>


      {/* Modal de opções no mobile */}
      {showMore && (
        <div className="fixed inset-0 z-[90] flex items-end md:hidden pointer-events-auto">
          <div className="absolute inset-0 bg-black/40 z-[80]" onClick={() => setShowMore(false)} />
          <div className="w-full bg-white dark:bg-gray-800 rounded-t-2xl p-4 shadow-2xl z-[90] relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Outros</h3>
              <button onClick={() => setShowMore(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button type="button" onClick={() => { setShowMore(false); onNavigate?.('plano-aula'); }} className="w-full flex items-center gap-3 text-left p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-[#8B27FF] dark:text-[#C084FC]" />
                <span className="text-[#8B27FF] dark:text-[#C084FC]">Plano de Aula</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMore(false);
                  onNavigate?.('conteudo');
                }}
                className="w-full flex items-center gap-3 text-left p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <FileText className="w-5 h-5 text-[#8B27FF] dark:text-[#C084FC]" />
                <span className="text-[#8B27FF] dark:text-[#C084FC]">
                  Conteúdo
                </span>
              </button>

              <button type="button" onClick={() => { setShowMore(false); onNavigate?.('transversality'); }} className="w-full flex items-center gap-3 text-left p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <GitBranch className="w-5 h-5 text-[#8B27FF] dark:text-[#C084FC]" />
                <span className="text-[#8B27FF] dark:text-[#C084FC]">Transversalidade</span>
              </button>
              <button type="button" onClick={() => { setShowMore(false); onNavigate?.('exames'); }} className="w-full flex items-center gap-3 text-left p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <FileCheck className="w-5 h-5 text-[#8B27FF] dark:text-[#C084FC]" />
                <span className="text-[#8B27FF] dark:text-[#C084FC]">Exames</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bloquear rolagem do corpo quando o modal móvel estiver aberto */}

    </>
  );
}
