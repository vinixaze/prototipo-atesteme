import { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, Check, User } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelect: (photoUrl: string) => void;
  currentPhoto?: string;
  initialMode?: 'choose' | 'webcam' | 'file' | 'avatar';
}

export default function PhotoUploadModal({ 
  isOpen, 
  onClose, 
  onPhotoSelect,
  currentPhoto,
  initialMode = 'choose'
}: PhotoUploadModalProps) {
  const [mode, setMode] = useState<'choose' | 'webcam' | 'file' | 'avatar'>(initialMode);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resetar o mode quando o modal abre/fecha ou initialMode muda
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedImage(null);
      setError(null);
      
      // Se o modo for webcam, inicia automaticamente
      if (initialMode === 'webcam') {
        startWebcam();
      }
      // Se o modo for file, clica automaticamente no input de arquivo
      if (initialMode === 'file') {
        // Usa timeout para garantir que o modal foi renderizado
        setTimeout(() => {
          fileInputRef.current?.click();
        }, 100);
      }
    } else {
      // Limpa o stream quando fecha
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  }, [isOpen, initialMode]);

  // Lista de avatares disponíveis (DiceBear API com diferentes estilos)
  const avatarOptions = [
    { id: 1, name: 'Aventureiro', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix' },
    { id: 2, name: 'Tech Girl', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
    { id: 3, name: 'Professor', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 4, name: 'Estudante', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper' },
    { id: 5, name: 'Designer', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie' },
    { id: 6, name: 'Dev', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Max' },
    { id: 7, name: 'Manager', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily' },
    { id: 8, name: 'Analista', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie' },
    { id: 9, name: 'Líder', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George' },
    { id: 10, name: 'Criativo', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chloe' },
    { id: 11, name: 'Estrategista', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver' },
    { id: 12, name: 'Inovador', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna' },
  ];

  if (!isOpen) return null;

  const startWebcam = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setMode('webcam');
    } catch (err) {
      // Remove o console.error para não mostrar erro no console
      let errorMessage = 'Não foi possível acessar a câmera.';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage = 'Permissão de câmera negada. Por favor, permita o acesso à câmera nas configurações do navegador.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'Nenhuma câmera foi encontrada no seu dispositivo.';
        } else if (err.name === 'NotReadableError') {
          errorMessage = 'A câmera está sendo usada por outro aplicativo.';
        } else if (err.name === 'OverconstrainedError') {
          errorMessage = 'Não foi possível encontrar uma câmera compatível.';
        }
      }
      
      setError(errorMessage);
      // Volta para a tela de escolha para o usuário tentar outra opção
      setMode('choose');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageUrl);
        stopWebcam();
      }
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setMode('file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onPhotoSelect(selectedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    stopWebcam();
    setMode('choose');
    setSelectedImage(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">
            {mode === 'choose' && 'Atualizar Foto de Perfil'}
            {mode === 'webcam' && 'Capturar Foto'}
            {mode === 'file' && selectedImage && 'Confirmar Foto'}
            {mode === 'avatar' && 'Escolher Avatar'}
          </h3>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && mode === 'choose' && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-red-800 mb-1">Erro ao acessar câmera</h4>
                <p className="text-sm text-red-700">{error}</p>
                <p className="text-xs text-red-600 mt-2">
                  💡 Você ainda pode enviar uma foto usando a opção "Selecionar Arquivo" abaixo.
                </p>
              </div>
              <button
                onClick={() => setError(null)}
                className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}

          {mode === 'choose' && (
            <div className="space-y-4">
              {/* Option 1 - Webcam */}
              <button
                onClick={startWebcam}
                className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-[#8B27FF] hover:bg-purple-50/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#8B27FF] transition-colors">
                  <Camera className="w-8 h-8 text-[#8B27FF] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Tirar Foto</h4>
                  <p className="text-sm text-gray-600">Use sua webcam para capturar uma foto</p>
                </div>
              </button>

              {/* Option 2 - Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-[#8B27FF] hover:bg-purple-50/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#8B27FF] transition-colors">
                  <Upload className="w-8 h-8 text-[#8B27FF] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Selecionar Arquivo</h4>
                  <p className="text-sm text-gray-600">Escolha uma foto do seu computador (JPG ou PNG, max 5MB)</p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Option 3 - Avatar */}
              <button
                onClick={() => setMode('avatar')}
                className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-[#8B27FF] hover:bg-purple-50/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#8B27FF] transition-colors">
                  <User className="w-8 h-8 text-[#8B27FF] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">Escolher Avatar</h4>
                  <p className="text-sm text-gray-600">Selecione um avatar personalizado da nossa galeria</p>
                </div>
              </button>
            </div>
          )}

          {mode === 'webcam' && !selectedImage && (
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
                  onClick={capturePhoto}
                  className="flex-1 bg-[#8B27FF] text-white py-3 rounded-xl font-bold hover:bg-[#6B1FBF] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capturar Foto
                </button>
                <button
                  onClick={() => {
                    stopWebcam();
                    setMode('choose');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square max-w-md mx-auto">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-[#8B27FF] text-white py-3 rounded-xl font-bold hover:bg-[#6B1FBF] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                >
                  <Check className="w-5 h-5" />
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setMode('choose');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

          {mode === 'avatar' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">Escolha um avatar da nossa galeria:</p>
              
              <div className="max-h-[50vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-3 gap-4">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setSelectedImage(avatar.url);
                      }}
                      className={`
                        relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden aspect-square
                        border-4 transition-all duration-300 hover:scale-105 hover:shadow-xl
                        ${selectedImage === avatar.url 
                          ? 'border-[#8B27FF] shadow-lg shadow-purple-500/30' 
                          : 'border-transparent hover:border-purple-200'
                        }
                      `}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.name}
                        className="w-full h-full object-cover p-2"
                      />
                      {selectedImage === avatar.url && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#8B27FF] rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-bold px-2 py-2 text-center">
                        {avatar.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedImage}
                  className={`
                    flex-1 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                    ${selectedImage
                      ? 'bg-[#8B27FF] text-white hover:bg-[#6B1FBF] shadow-lg shadow-purple-500/30 hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Check className="w-5 h-5" />
                  Confirmar Avatar
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setMode('choose');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}