import React from "react";
// Warning Modal Component
export default function WarningModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Aviso</h3>
        <p className="text-gray-600 mb-6">Você está prestes a iniciar o quiz. Deseja continuar?</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

