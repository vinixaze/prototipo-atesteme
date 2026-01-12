import { Camera, Upload, User, Check, Clock, Image as ImageIcon } from 'lucide-react';

interface ProfilePhotoCardProps {
  photoUrl: string;
  userName: string;
  email: string;
  photoStatus: 'pending' | 'uploaded';
  isProfileComplete: boolean;
  onTakePhoto: () => void;
  onSelectPhoto: () => void;
  onShowAvatars: () => void;
  onShowBanners: () => void;
}

export default function ProfilePhotoCard({
  photoUrl,
  userName,
  email,
  photoStatus,
  isProfileComplete,
  onTakePhoto,
  onSelectPhoto,
  onShowAvatars,
  onShowBanners,
}: ProfilePhotoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-8 animate-slideUp">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group cursor-pointer" onClick={onTakePhoto}>
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-purple-200 dark:border-purple-800 shadow-lg shadow-purple-500/20 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-[#8B27FF] dark:group-hover:border-[#A855F7]">
            <img
              src={photoUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`absolute bottom-1 right-1 w-8 h-8 rounded-full border-3 border-white dark:border-gray-800 shadow-lg flex items-center justify-center ${photoStatus === 'uploaded' ? 'bg-[#4CAF50]' : 'bg-[#FFD700]'}`}
          >
            {photoStatus === 'uploaded' ? (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            ) : (
              <Clock className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>

          <div className="absolute inset-0 bg-[#8B27FF]/90 dark:bg-[#A855F7]/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{userName}</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 mb-3">
            <span className="text-sm">{email}</span>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isProfileComplete
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
              }`}
          >
            {isProfileComplete ? (
              <>
                <span>✓</span>
                Perfil completo
              </>
            ) : (
              <>
                <span>⚠</span>
                Complete seu perfil
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={onTakePhoto}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B27FF] text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:bg-[#6B1FBF] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Camera className="w-5 h-5" />
              Tirar foto
            </button>
            <button
              onClick={onSelectPhoto}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
            >
              <Upload className="w-5 h-5" />
              Selecionar foto
            </button>
            <button
              onClick={onShowAvatars}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
            >
              <User className="w-5 h-5" />
              Avatares
            </button>
            <button
              onClick={onShowBanners}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
            >
              <ImageIcon className="w-5 h-5" />
              Banners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

