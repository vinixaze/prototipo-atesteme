import { useEffect, useRef, useState } from 'react';
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
  const [isFinalized, setIsFinalized] = useState(false);

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

  return (
    <div className="my-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-4 shadow-lg border border-gray-200 relative">
      {/* Header da janela */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-medium text-gray-700 ml-2">{title}</span>

        {/* Mobile controls: expand / finalize */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm px-3 py-1 bg-[#8B27FF] text-white rounded-lg"
            >
              Expandir
            </button>
          )}
          {isExpanded && (
            <>
              <button
                onClick={() => {
                  // finalizar mantém iframe carregado
                  setIsFinalized(true);
                  setIsExpanded(false);
                }}
                className="text-sm px-3 py-1 bg-green-600 text-white rounded-lg"
              >
                Finalizar
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-sm px-3 py-1 bg-gray-200 text-gray-800 rounded-lg"
              >
                Fechar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Iframe com o HTML */}
      {/* Mantemos o iframe montado sempre; em mobile podemos torná-lo 'expandido' via classes */}
      <div className={`bg-white rounded-xl overflow-hidden shadow-inner ${isExpanded ? 'fixed inset-0 z-50 bg-black/80 p-6 flex items-center justify-center' : ''}`}>
        <iframe
          ref={iframeRef}
          className={`w-full border-0 ${isExpanded ? 'h-full rounded-xl' : ''}`}
          style={{ minHeight: isExpanded ? '100vh' : '600px', height: isExpanded ? '100%' : '100%' }}
          title={title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Aviso para girar a tela (condicional) */}
      {showRotateHint && <RotateScreenHint />}
    </div>
  );
}