import type { RefObject } from 'react';
import { Camera, Check, X } from 'lucide-react';

import type { AvatarOption } from '../../data/profileData';

interface ProfilePhotoModalsProps {
  photoMode: null | 'webcam' | 'avatar';
  capturedImage: string | null;
  videoRef: RefObject<HTMLVideoElement>;
  avatarOptions: AvatarOption[];
  onClose: () => void;
  onCapture: () => void;
  onConfirmPhoto: (photoUrl: string) => void;
  onRetry: () => void;
  onSelectAvatar: (url: string) => void;
  onStopWebcam: () => void;
}

export default function ProfilePhotoModals({
  photoMode,
  capturedImage,
  videoRef,
  avatarOptions,
  onClose,
  onCapture,
  onConfirmPhoto,
  onRetry,
  onSelectAvatar,
  onStopWebcam,
}: ProfilePhotoModalsProps) {
  return (
    <>
      {photoMode === 'webcam' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scaleIn">
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800">Tirar Foto</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              {!capturedImage ? (
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square max-w-md mx-auto">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={onCapture}
                      className="flex-1 bg-[#8B27FF] text-white py-3 rounded-xl font-bold hover:bg-[#6B1FBF] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                    >
                      <Camera className="w-5 h-5" />
                      Capturar Foto
                    </button>
                    <button
                      onClick={() => {
                        onStopWebcam();
                        onClose();
                      }}
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
                      onClick={() => onConfirmPhoto(capturedImage)}
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
      )}

      {photoMode === 'avatar' && (
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
              <p className="text-sm text-gray-600 mb-4">Escolha um avatar da nossa galeria:</p>
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => onSelectAvatar(avatar.url)}
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
      )}
    </>
  );
}
