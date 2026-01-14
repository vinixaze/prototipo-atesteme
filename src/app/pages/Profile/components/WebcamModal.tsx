import { Camera, Check, X } from "lucide-react";

interface WebcamModalProps {
  isOpen: boolean;
  capturedImage: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  onClose: () => void;
  onCapture: () => void;
  onConfirm: (photoUrl: string) => void;
  onRetry: () => void;
  onCancel: () => void;
}

export default function WebcamModal({
  isOpen,
  capturedImage,
  videoRef,
  onClose,
  onCapture,
  onConfirm,
  onRetry,
  onCancel,
}: WebcamModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {capturedImage ? "Confirmar Foto" : "Capturar Foto"}
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          {!capturedImage ? (
            <div className="space-y-4">
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onCapture}
                  className="flex-1 bg-[#8B27FF] text-white py-3 rounded-xl font-bold hover:bg-[#6B1FBF] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capturar Foto
                </button>
                <button
                  onClick={onCancel}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square max-w-md mx-auto">
                <img
                  src={capturedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => onConfirm(capturedImage)}
                  className="flex-1 bg-[#8B27FF] text-white py-3 rounded-xl font-bold hover:bg-[#6B1FBF] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                >
                  <Check className="w-5 h-5" />
                  Confirmar
                </button>
                <button
                  onClick={onRetry}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
