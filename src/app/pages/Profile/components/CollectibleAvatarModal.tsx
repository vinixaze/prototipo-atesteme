import { Check, Lock, RefreshCcw, User, X } from "lucide-react";

interface CollectibleAvatar {
  id: number;
  name: string;
  url: string;
  unlocked: boolean;
  cost: number;
}

interface CollectibleAvatarModalProps {
  isOpen: boolean;
  collectibleAvatars: CollectibleAvatar[];
  selectedAvatar: number;
  onSelectAvatar: (id: number) => void;
  onClose: () => void;
  onNavigateToCoins: () => void;
}

export default function CollectibleAvatarModal({
  isOpen,
  collectibleAvatars,
  selectedAvatar,
  onSelectAvatar,
  onClose,
  onNavigateToCoins,
}: CollectibleAvatarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#E91E63]" strokeWidth={2} />
              </div>
              Avatares ColecionÇ­veis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-15">
              Figuras histÇüricas da tecnologia
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToCoins}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B27FF] text-white rounded-xl font-medium text-sm hover:bg-[#6B1FBF] transition-all duration-300 hover:scale-105"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="sm:hidden">Mais</span>
              <span className="hidden sm:inline">Obter Mais</span>
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {collectibleAvatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => {
                if (avatar.unlocked) {
                  onSelectAvatar(avatar.id);
                }
              }}
              disabled={!avatar.unlocked}
              className={`
                relative p-3 rounded-xl border-2 transition-all duration-300 group
                ${
                  !avatar.unlocked
                    ? "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 opacity-60 cursor-not-allowed"
                    : selectedAvatar === avatar.id
                      ? "border-[#8B27FF] dark:border-[#A855F7] bg-purple-50 dark:bg-purple-900/30 shadow-lg shadow-purple-500/20 scale-105"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105"
                }
              `}
            >
              {!avatar.unlocked && (
                <div className="absolute top-2 right-2 z-10 bg-gray-600 dark:bg-gray-800 rounded-full p-1">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}

              <div
                className={`w-full aspect-square rounded-lg overflow-hidden mb-2 ${
                  !avatar.unlocked ? "grayscale" : ""
                }`}
              >
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p
                className={`text-xs font-medium text-center line-clamp-2 ${
                  selectedAvatar === avatar.id
                    ? "text-[#8B27FF] dark:text-[#A855F7]"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {avatar.name}
              </p>

              {!avatar.unlocked && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  {avatar.cost} DC
                </p>
              )}
              {avatar.unlocked && selectedAvatar === avatar.id && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Check className="w-3 h-3 text-[#8B27FF] dark:text-[#A855F7]" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
