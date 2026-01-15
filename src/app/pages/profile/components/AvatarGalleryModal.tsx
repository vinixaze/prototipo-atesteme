import { X } from "lucide-react";

interface AvatarOption {
  id: number;
  name: string;
  url: string;
}

interface AvatarGalleryModalProps {
  isOpen: boolean;
  avatarOptions: AvatarOption[];
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function AvatarGalleryModal({
  isOpen,
  avatarOptions,
  onSelect,
  onClose,
}: AvatarGalleryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Escolher Avatar</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Escolha um avatar da nossa galeria:
          </p>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => onSelect(avatar.url)}
                  className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden aspect-square border-4 border-transparent hover:border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-full h-full object-cover p-2"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-bold px-2 py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {avatar.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t-2 border-gray-100 mt-4">
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
