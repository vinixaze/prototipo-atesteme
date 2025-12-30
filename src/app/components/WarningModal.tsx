import { X } from 'lucide-react';

interface WarningModalProps {
  isOpen?: boolean;
  competency?: string;
  category?: string;
  categoryColor?: string;
  icon?: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function WarningModal({ onClose, onConfirm }: WarningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Title */}
          <h2 className="text-2xl text-[#8B27FF] mb-6">Aviso</h2>

          {/* Message */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            Se você errar 2 desafios, deverá estudar o conteúdo dos links recomendados e voltar a responder novos desafios desta competência após 5 dias!
          </p>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-[#8B27FF] hover:bg-[#7B1FE8] text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>OK</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}