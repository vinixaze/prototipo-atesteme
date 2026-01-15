interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <h3 className="text-2xl text-[#6B1FBF] mb-4">{title}</h3>

        {/* Mensagem */}
        <p className="text-gray-700 mb-8 leading-relaxed">{message}</p>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-[#8B27FF] text-[#8B27FF] rounded-lg hover:bg-[#F3E8FF] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-[#8B27FF] text-white rounded-lg hover:bg-[#7B1FE8] transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
