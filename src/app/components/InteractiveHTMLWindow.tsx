import { useEffect, useRef } from 'react';
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
      </div>

      {/* Iframe com o HTML */}
      <div className="bg-white rounded-xl overflow-hidden shadow-inner">
        <iframe
          ref={iframeRef}
          className="w-full border-0"
          style={{ minHeight: '600px', height: '100%' }}
          title={title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Aviso para girar a tela (condicional) */}
      {showRotateHint && <RotateScreenHint />}
    </div>
  );
}