import { useEffect, useRef, useState } from 'react';
import { Maximize2, X, Check } from 'lucide-react';
import RotateScreenHint from './RotateScreenHint';

interface InteractiveHTMLWindowProps {
  htmlContent: string;
  title?: string;
  showRotateHint?: boolean;
}

export default function InteractiveHTMLWindow({ 
  htmlContent, 
  title = "Simulação Interativa",
  showRotateHint = false 
}: InteractiveHTMLWindowProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    }
  }, [htmlContent]);

  const containerClasses = isExpanded
    ? 'fixed inset-0 z-[9999] bg-black/95 flex flex-col relative'
    : 'my-6 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700';

  const iframeWrapperClasses = isExpanded
    ? 'flex-1 min-h-0 overflow-hidden iframe-expanded'
    : 'bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner';

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div
        className={
          isExpanded
            ? 'bg-gray-900 p-4 flex items-center justify-between border-b border-gray-700'
            : 'flex items-center gap-2 mb-3 pb-2 border-b border-gray-300 dark:border-gray-600'
        }
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className={isExpanded ? 'text-white font-medium ml-2' : 'text-sm font-medium text-gray-700 dark:text-gray-300 ml-2'}>
          {title}
        </span>

        {isExpanded ? (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="ml-auto md:hidden text-sm px-3 py-1.5 bg-[#8B27FF] hover:bg-[#7B1FE8] text-white rounded-lg flex items-center gap-1 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            Expandir ou vire a tela
          </button>
        )}
      </div>

      {/* Iframe */}
      <div className={iframeWrapperClasses}>
        <iframe
          ref={iframeRef}
          className={isExpanded ? 'w-full h-full border-0' : 'w-full border-0'}
          style={isExpanded ? undefined : { minHeight: '400px', height: '500px' }}
          title={title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Botão Fechar na parte inferior */}
      {isExpanded && (
        <div className="bg-gray-900 p-4 border-t border-gray-700">
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-5 h-5" />
            Concluir e Voltar
          </button>
        </div>
      )}

      {isExpanded && showRotateHint && <RotateScreenHint />}
    </div>
  );
}
