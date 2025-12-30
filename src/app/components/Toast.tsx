import { CheckCircle, X, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-24 right-6 z-50
        flex items-center gap-3
        px-6 py-4 rounded-xl shadow-2xl
        animate-slideInRight
        ${type === 'success' 
          ? 'bg-[#4CAF50] text-white' 
          : 'bg-[#EF5350] text-white'
        }
      `}
    >
      {type === 'success' ? (
        <CheckCircle className="w-6 h-6 flex-shrink-0" strokeWidth={2} />
      ) : (
        <AlertCircle className="w-6 h-6 flex-shrink-0" strokeWidth={2} />
      )}
      <span className="font-medium text-base">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-white/20 rounded-lg p-1 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
