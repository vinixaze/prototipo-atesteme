import { ArrowLeft, Layers, Target, BookOpen, FileText } from 'lucide-react';

interface TestHeaderProps {
  categoryBadge?: string;
  categoryColor?: string;
  title: string;
  onBackClick?: () => void;
  isSimplified?: boolean;
  hideBackButton?: boolean;
  // Novas props para os 4 campos informativos
  area?: string;
  competency?: string;
  bncc?: string;
  description?: string;
}

const categoryColors: Record<string, string> = {
  'NOÇÕES BÁSICAS': '#8B27FF',
  'TESTE DIAGNÓSTICO': '#8B27FF',
  'INFORMAÇÕES E DADOS': '#FFD700',
  'COMUNICAÇÃO E COLABORAÇÃO': '#00BCD4',
  'CRIAÇÃO DE CONTEÚDO': '#FF9800',
  'PROTEÇÃO E SEGURANÇA': '#4CAF50',
  'RESOLUÇÃO DE PROBLEMAS': '#E91E63',
};

export default function TestHeader({
  categoryBadge = '',
  categoryColor = '#8B27FF',
  title,
  onBackClick,
  isSimplified = false,
  hideBackButton = false,
  area,
  competency,
  bncc,
  description,
}: TestHeaderProps) {
  // Priorizar categoryColor (passado como prop) sobre o mapeamento fixo
  const bgColor = categoryColor || categoryColors[categoryBadge] || '#8B27FF';

  // Sempre mostrar header completo com campos informativos
  return (
    <div
      className="shadow-sm bg-white dark:bg-gray-800 border-b-2 dark:border-gray-700"
      style={{
        borderBottomColor: '#8B27FF40',
      }}
    >
      <div className="px-4 md:px-6 py-3">
        {/* Linha 1: Título e Botão Voltar */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
          </div>
          {!hideBackButton && onBackClick && (
            <button
              onClick={onBackClick}
              className="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all flex items-center gap-2 text-sm font-medium flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          )}
        </div>

        {/* Linha 2: Área e Competência */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:overflow-x-auto pb-2 scrollbar-hide">
          {/* Campo 1: Área - com cor da categoria */}
          <div 
            className="rounded-lg px-3 py-1.5 flex items-center gap-2 flex-shrink-0"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-white/20"
            >
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Área</p>
              <p className="text-xs text-white font-bold leading-tight whitespace-nowrap">
                {area || categoryBadge || 'Competências Digitais'}
              </p>
            </div>
          </div>

          {/* Campo 2: Competência - com cor da categoria */}
          <div 
            className="rounded-lg px-3 py-1.5 flex items-center gap-2 flex-shrink-0"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-white/20"
            >
              <Target className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Competência</p>
              <p className="text-xs text-white font-bold leading-tight whitespace-nowrap">
                {competency || title}
              </p>
            </div>
          </div>

          {/* Campo 3: BNCC - roxo */}
          <div className="bg-purple-500 dark:bg-purple-600 rounded-lg px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
            <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/90 uppercase font-semibold leading-none mb-0.5">BNCC</p>
              <p className="text-xs text-white font-bold leading-tight whitespace-nowrap">
                {bncc || 'Competência 5 - Cultura Digital'}
              </p>
            </div>
          </div>
        </div>

        {/* Linha 3: Descrição - largura completa */}
        <div className="mt-2">
          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-tight">
            {description || 'Avalie suas habilidades e desenvolva competências digitais.'}
          </p>
        </div>
      </div>
    </div>
  );
}