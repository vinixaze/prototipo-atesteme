import { useEffect, useRef, useState } from "react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import Toast from "./components/Toast";
import { avatarOptions, bannerLevels, collectibleAvatars } from "./data";
import {
  calcularIdade,
  getIdentificadorPessoal,
  isDataNascimentoValida,
  maskCEP,
  maskCNPJ,
  maskCPF,
  maskDate,
  maskPhone,
  validateEmail,
  validateField,
} from "./utils";
import { FormData, FormErrors, ProfilePageProps, VerifiedState } from "./types";
import AvatarGalleryModal from "./components/AvatarGalleryModal";
import BannerSelectionModal from "./components/BannerSelectionModal";
import type { PageId } from "../../../lib/navigation/routes";
import CollectibleAvatarModal from "./components/CollectibleAvatarModal";
import ProfileStyles from "./components/ProfileStyles";
import WebcamModal from "./components/WebcamModal";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  CreditCard,
  Building,
  Calendar,
  Link as LinkIcon,
  MapPin,
  GraduationCap,
  Clock,
  Camera,
  Upload,
  Edit2,
  Check,
  Info,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Image as ImageIcon,
  Lock,
  Unlock,
  RefreshCcw,
  Sparkles,
  Send,
  UserCheck
} from "lucide-react";

export default function ProfilePage({
  navigateTo,
  userName = 'André Silva',
  userRole = 'user'
}: ProfilePageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photoMode, setPhotoMode] = useState<null | 'webcam' | 'avatar'>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('https://api.dicebear.com/7.x/avataaars/svg?seed=' + (userName || 'user'));
  const [photoStatus, setPhotoStatus] = useState<'pending' | 'uploaded'>('uploaded');
  const [selectedBanner, setSelectedBanner] = useState<number>(1);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [showBannersModal, setShowBannersModal] = useState(false);
  const [showAvatarsModal, setShowAvatarsModal] = useState(false);
  const [showNomeSocial, setShowNomeSocial] = useState(false);
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [telefoneVerificado, setTelefoneVerificado] = useState(false);


  // Webcam states
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: userName,
    nomeSocial: '',
    email: 'andre.silva@email.com',
    telefone: '(11) 98765-4321',
    cpf: '000000001',
    cnpj: '',
    dataNascimento: '',
    curriculo: 'https://linkedin.com/in/andre-silva',
    cep: '01310-100',
    escolaridade: 'Graduação',
    ultimaFormacao: 'Há menos de 6 meses',
    codigoOrganizacao: '',
    tipoPerfil: 'estudante',
    emailResponsavel: '',
    telefoneResponsavel: '',
    areaGraduacao: 'Exatas',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [acessoEnviado, setAcessoEnviado] = useState(false);
  const [enviandoAcesso, setEnviandoAcesso] = useState(false);
  const [telefoneResponsavelVerificado, setTelefoneResponsavelVerificado] = useState(false);


  const firstName = userName.split(' ')[0];

  const [verified, setVerified] = useState<VerifiedState>({
    email: false,
    telefone: false,
    emailResponsavel: false,
    telefoneResponsavel: false,
  });

  const handleLocalVerify = (
    field: 'email' | 'telefone' | 'emailResponsavel' | 'telefoneResponsavel'
  ) => {
    const value = formData[field as keyof FormData] as string;

    // reaproveita sua validação atual
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      setTouchedFields(prev => new Set(prev).add(field));
      setToast({ message: error, type: 'error' });
      return;
    }

    setVerified(prev => ({ ...prev, [field]: true }));
    setToast({ message: 'Verificado com sucesso!', type: 'success' });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Aplicar máscaras
    if (name === 'cpf') maskedValue = maskCPF(value);
    if (name === 'cnpj') maskedValue = maskCNPJ(value);
    if (name === 'telefone' || name === 'telefoneResponsavel') maskedValue = maskPhone(value);
    if (name === 'cep') maskedValue = maskCEP(value);
    if (name === 'dataNascimento') maskedValue = maskDate(value);

    setFormData(prev => ({ ...prev, [name]: maskedValue }));
    setHasChanges(true);

    // Validar campo se já foi tocado
    if (touchedFields.has(name)) {
      const error = validateField(name, maskedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    setVerified(prev => ({ ...prev, [name]: false }));

  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Enviar acesso de monitoramento aos pais
  const handleEnviarAcessoPais = async () => {
    if (!formData.emailResponsavel) {
      setToast({ message: 'Preencha o e-mail do responsável antes de enviar', type: 'error' });
      return;
    }

    setEnviandoAcesso(true);

    // Simular envio de email
    setTimeout(() => {
      setEnviandoAcesso(false);
      setAcessoEnviado(true);
      setToast({
        message: `Acesso de monitoramento enviado para ${formData.emailResponsavel}`,
        type: 'success'
      });
    }, 2000);
  };

  // Buscar CEP
  const handleBuscarCEP = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setToast({ message: `CEP encontrado: ${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`, type: 'success' });
        } else {
          setToast({ message: 'CEP não encontrado', type: 'error' });
        }
      } catch (error) {
        setToast({ message: 'Erro ao buscar CEP', type: 'error' });
      }
    } else {
      setToast({ message: 'CEP inválido', type: 'error' });
    }
  };

  // Handle save
  const handleSave = async () => {
    // Validar todos os campos
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast({ message: 'Por favor, corrija os erros no formulário', type: 'error' });
      return;
    }

    setIsSaving(true);

    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSaving(false);
    setHasChanges(false);
    setToast({ message: 'Perfil atualizado com sucesso!', type: 'success' });
  };

  // Handle cancel
  const handleCancel = () => {
    // Restaurar dados originais (em produção, você carregaria do estado original)
    setHasChanges(false);
    setErrors({});
    setTouchedFields(new Set());
  };

  // Webcam functions
  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setToast({ message: 'Não foi possível acessar a câmera.', type: 'error' });
      setPhotoMode(null);
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
        setCapturedImage(imageUrl);
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

  const confirmPhoto = (photoUrl: string) => {
    handlePhotoSelect(photoUrl);
    setPhotoMode(null);
    setCapturedImage(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setToast({ message: 'O arquivo deve ter no máximo 5MB', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handlePhotoSelect(result);
        setPhotoMode(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Efeito para iniciar webcam quando o modo mudar
  useEffect(() => {
    if (photoMode === 'webcam') {
      startWebcam();
    }
    return () => {
      stopWebcam();
    };
  }, [photoMode]);

  // Handle photo upload
  const handlePhotoSelect = (newPhotoUrl: string) => {
    setPhotoUrl(newPhotoUrl);
    setPhotoStatus('uploaded');
    setHasChanges(true);
    setToast({ message: 'Foto atualizada com sucesso!', type: 'success' });
  };

  const handleNavigate = (page: PageId) => {
    navigateTo(page);
  };

  const identificadorPessoal = getIdentificadorPessoal(formData.cpf);

  const isFormValid = Object.values(errors).every(error => !error) &&
    formData.nome &&
    formData.email &&
    formData.cpf;

  const isProfileComplete = formData.nome &&
    formData.email &&
    formData.telefone &&
    formData.cpf &&
    formData.dataNascimento &&
    formData.escolaridade;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="perfil"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName={userName}
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-[1200px] mx-auto p-6 md:p-8 lg:p-10">
            {/* Header da Página */}
            <div className="mb-10 animate-fadeIn">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Meu Perfil</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Dashboard <span className="text-gray-400 dark:text-gray-500 mx-2">›</span>
                <span className="text-[#8B27FF] dark:text-[#A855F7] font-medium">Perfil</span>
              </p>
            </div>

            {/* Card de Foto de Perfil */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mb-8 animate-slideUp" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative group cursor-pointer" onClick={() => setPhotoMode('webcam')}>
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-purple-200 dark:border-purple-800 shadow-lg shadow-purple-500/20 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-[#8B27FF] dark:group-hover:border-[#A855F7]">
                    <img
                      src={photoUrl}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Badge de Status */}
                  <div
                    className={`
                      absolute bottom-1 right-1 w-8 h-8 rounded-full 
                      border-3 border-white dark:border-gray-800 shadow-lg
                      flex items-center justify-center
                      ${photoStatus === 'uploaded' ? 'bg-[#4CAF50]' : 'bg-[#FFD700]'}
                    `}
                  >
                    {photoStatus === 'uploaded' ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <Clock className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>

                  {/* Overlay de Edição */}
                  <div className="absolute inset-0 bg-[#8B27FF]/90 dark:bg-[#A855F7]/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-12 h-12 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Informações e Botões */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{userName}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 mb-3">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                  <div
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6
                      ${isProfileComplete
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }
                    `}
                  >
                    {isProfileComplete ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Perfil completo
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Complete seu perfil
                      </>
                    )}
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button
                      onClick={() => {
                        setPhotoMode('webcam');
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B27FF] text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:bg-[#6B1FBF] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Camera className="w-5 h-5" />
                      Tirar foto
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <Upload className="w-5 h-5" />
                      Selecionar foto
                    </button>
                    <button
                      onClick={() => setShowAvatarsModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <User className="w-5 h-5" />
                      Avatares
                    </button>
                    <button
                      onClick={() => setShowBannersModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-[#8B27FF] dark:hover:border-[#A855F7] hover:text-[#8B27FF] dark:hover:text-[#A855F7] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <ImageIcon className="w-5 h-5" />
                      Banners
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de Tipo de Perfil - Compacta */}
            <div className="relative mb-8 animate-slideUp" style={{ animationDelay: '150ms' }}>
              {/* Brilho de fundo sutil */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>

              {/* Barra principal */}
              <div className="relative bg-gradient-to-r from-white via-purple-50/50 to-white dark:from-gray-800 dark:via-purple-900/20 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800/60">
                <div className="flex items-center gap-4">
                  {/* Ícone com gradiente */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-40"></div>
                    <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8B27FF] to-purple-600 dark:from-[#A855F7] dark:to-purple-500 shadow-lg">
                      <GraduationCap className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Textos */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Tipo de Perfil</p>
                    <h4 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B27FF] to-purple-600 dark:from-[#A855F7] dark:to-purple-400">
                      Estudante
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Cards */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* CARD 1 - DADOS COMUNS */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-slideUp" style={{ animationDelay: '200ms' }}>
                {/* Header do Card */}
                <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" strokeWidth={2} />
                    </div>
                    Dados Comuns
                  </h3>
                  <button className="w-9 h-9 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-900/60 hover:rotate-12 transition-all duration-300">
                    <Edit2 className="w-4 h-4 text-[#8B27FF] dark:text-[#A855F7]" />
                  </button>
                </div>

                {/* Formulário */}
                <div className="space-y-5">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Seu nome completo"
                        className={`
                          w-full h-12 px-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
                          transition-all duration-300 focus:outline-none
                          ${errors.nome && touchedFields.has('nome')
                            ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                          }
                        `}
                      />
                      {errors.nome && touchedFields.has('nome') && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-xs animate-slideDown">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.nome}</span>
                        </div>
                      )}
                    </div>

                    {/* Botão Adicionar Nome Social */}
                    {!showNomeSocial && (
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={() => setShowNomeSocial(true)}
                          className="text-xs text-[#8B27FF] dark:text-[#A855F7] hover:underline font-medium flex items-center gap-1"
                        >
                          <User className="w-3 h-3" />
                          Adicionar Nome Social
                        </button>
                      </div>
                    )}

                    {/* Campo de Nome Social (condicional) */}
                    {showNomeSocial && (
                      <div className="mt-3 animate-slideDown">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome Social
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="nomeSocial"
                            value={formData.nomeSocial}
                            onChange={handleInputChange}
                            placeholder="Como prefere ser chamado(a)"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CPF */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CPF
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="000000001 ou 000.000.000-00"
                        className={`
                          w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
                          transition-all duration-300 focus:outline-none
                          ${errors.cpf && touchedFields.has('cpf')
                            ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                          }
                        `}
                      />
                      {errors.cpf && touchedFields.has('cpf') && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-xs animate-slideDown">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.cpf}</span>
                        </div>
                      )}
                    </div>

                    {/* Identificador Social (se CPF provisório) */}
                    {identificadorPessoal && identificadorPessoal.isProvisorio && (
                      <div className="mt-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 animate-slideDown">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                            <Info className="w-4 h-4 text-[#8B27FF] dark:text-[#A855F7]" />
                          </div>
                          <span className="text-sm font-bold text-[#8B27FF] dark:text-[#A855F7]">CPF Provisório Detectado</span>
                        </div>

                        <div className="space-y-2 ml-10">
                          <div className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">Identificador Social:</span>
                            <span className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">{identificadorPessoal.id}</span>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">Base de Origem:</span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60 rounded-lg text-[#8B27FF] dark:text-[#A855F7] font-bold text-sm shadow-sm">
                              {identificadorPessoal.tipo}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Data de Nascimento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="DD/MM/AAAA"
                        className={`
                          w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
                          transition-all duration-300 focus:outline-none
                          ${errors.dataNascimento && touchedFields.has('dataNascimento')
                            ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                          }
                        `}
                      />
                      {errors.dataNascimento && touchedFields.has('dataNascimento') && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-xs animate-slideDown">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.dataNascimento}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dados do Responsável (bloco destacado se menor de idade) ou Email/Telefone normal */}
                  {/* Dados do Responsável (bloco destacado se menor de idade) ou Email/Telefone normal */}
                  {isDataNascimentoValida(formData.dataNascimento) && !isMenorDeIdade && (
                    <>
                      {/* Email - Maior de idade */}
                      <div className="animate-slideDown">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          E-mail
                        </label>

                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => {
                              handleInputChange(e);
                              // opcional: se quiser "desverificar" ao editar
                              setEmailVerificado(false);
                            }}
                            onBlur={handleBlur}
                            placeholder="email@exemplo.com"
                            className={`
            w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
            transition-all duration-300 focus:outline-none
            ${errors.email && touchedFields.has('email')
                                ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                              }
          `}
                          />
                        </div>

                        {errors.email && touchedFields.has('email') && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-xs animate-slideDown">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </div>
                        )}

                        {/* Botão + status */}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setEmailVerificado(true)}
                            disabled={!formData.email || !!errors.email || !validateEmail(formData.email)}
                            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Enviar
                          </button>

                          {emailVerificado && (
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 inline-flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Verificado
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Telefone - Maior de idade */}
                      <div className="animate-slideDown">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Telefone
                        </label>

                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>

                          <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={(e) => {
                              handleInputChange(e);
                              // opcional: se quiser "desverificar" ao editar
                              setTelefoneVerificado(false);
                            }}
                            onBlur={handleBlur}
                            placeholder="(00) 00000-0000"
                            className={`
            w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
            transition-all duration-300 focus:outline-none
            ${errors.telefone && touchedFields.has('telefone')
                                ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50'
                              }
          `}
                          />
                        </div>

                        {errors.telefone && touchedFields.has('telefone') && (
                          <div className="flex items-center gap-2 mt-2 text-red-600 text-xs animate-slideDown">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.telefone}</span>
                          </div>
                        )}

                        {/* Botão + status */}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setTelefoneVerificado(true)}
                            disabled={!formData.telefone || !!errors.telefone || formData.telefone.replace(/\D/g, '').length < 10}
                            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Enviar
                          </button>

                          {telefoneVerificado && (
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 inline-flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Verificado
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}


                  {/* Bloco Destacado - Dados do Responsável (menor de idade) */}
                  {isDataNascimentoValida(formData.dataNascimento) && isMenorDeIdade && (
                    <div className="mt-3 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 animate-slideDown">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Dados do Responsável Legal</span>
                      </div>

                      <div className="space-y-4">
                        {/* E-mail do Responsável */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            E-mail do Responsável
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="emailResponsavel"
                              value={formData.emailResponsavel}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              placeholder="email.responsavel@exemplo.com"
                              className={`
                                w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
                                transition-all duration-300 focus:outline-none
                                ${errors.emailResponsavel && touchedFields.has('emailResponsavel')
                                  ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50'
                                }
                              `}
                            />
                            {errors.emailResponsavel && touchedFields.has('emailResponsavel') && (
                              <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.emailResponsavel}</span>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Telefone do Responsável */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Telefone do Responsável
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="telefoneResponsavel"
                              value={formData.telefoneResponsavel}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              placeholder="(00) 00000-0000"
                              className={`
                                w-full h-12 pl-12 pr-4 rounded-xl border-2 text-gray-800 dark:text-gray-200 text-base
                                transition-all duration-300 focus:outline-none
                                ${errors.telefoneResponsavel && touchedFields.has('telefoneResponsavel')
                                  ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/50'
                                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50'
                                }
                              `}
                            />
                            {errors.telefoneResponsavel && touchedFields.has('telefoneResponsavel') && (
                              <div className="flex items-center gap-2 mt-2 text-red-600 text-xs">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.telefoneResponsavel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Botão Enviar Acesso */}
                        {formData.emailResponsavel && !errors.emailResponsavel && validateEmail(formData.emailResponsavel) && (
                          <button
                            onClick={handleEnviarAcessoPais}
                            disabled={enviandoAcesso || acessoEnviado}
                            className={`
                                mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm
                                transition-all duration-300 shadow-md
                                ${acessoEnviado
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                                : enviandoAcesso
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-wait'
                                  : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                              }
                              `}
                          >
                            {enviandoAcesso ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Enviando...
                              </>
                            ) : acessoEnviado ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Acesso enviado com sucesso!
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Enviar acesso de monitoramento
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Escolaridade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Escolaridade
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <GraduationCap className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="escolaridade"
                        value={formData.escolaridade}
                        onChange={handleInputChange}
                        className="w-full h-12 pl-12 pr-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 appearance-none cursor-pointer"
                      >
                        <option value="">Selecione...</option>
                        <option value="Ensino Fundamental">Ensino Fundamental</option>
                        <option value="Ensino Médio">Ensino Médio</option>
                        <option value="Graduação">Graduação</option>
                        <option value="Pós-graduação">Pós-graduação</option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Doutorado">Doutorado</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Área de Graduação (só aparece se Graduação ou superior for selecionado) */}
                  {['Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado'].includes(formData.escolaridade) && (
                    <div className="animate-slideDown">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Área de Graduação
                      </label>
                      <div className="relative">
                        <select
                          name="areaGraduacao"
                          value={formData.areaGraduacao}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 pr-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 appearance-none cursor-pointer"
                        >
                          <option value="">Selecione uma área...</option>
                          <option value="Exatas">Ciências Exatas</option>
                          <option value="Humanas">Ciências Humanas</option>
                          <option value="Natureza">Ciências da Natureza</option>
                          <option value="Saúde">Ciências da Saúde</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CARD 2 - DADOS COMPLEMENTARES */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 animate-slideUp" style={{ animationDelay: '300ms' }}>
                {/* Header do Card */}
                <div className="mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" strokeWidth={2} />
                    </div>
                    Dados Complementares
                  </h3>
                </div>

                {/* Formulário */}
                <div className="space-y-5">
                  {/* Nome da Organização */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      Nome da Organização
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Building className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="codigoOrganizacao"
                        value={formData.codigoOrganizacao}
                        readOnly
                        placeholder="Nome da sua instituição"
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-gray-50 dark:bg-gray-700/50 transition-all duration-300 cursor-not-allowed opacity-75"
                      />
                    </div>
                  </div>

                  {/* Turma */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Turma
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="turma"
                        placeholder="Digite sua turma"
                        className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base bg-white dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-slideUp" style={{ animationDelay: '500ms' }}>
              <button
                onClick={handleCancel}
                disabled={!hasChanges}
                className="px-8 py-3.5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || !isFormValid || isSaving}
                className="inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-[#8B27FF] text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:bg-[#6B1FBF] hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Webcam Overlay */}
      <WebcamModal
        isOpen={photoMode === 'webcam'}
        capturedImage={capturedImage}
        videoRef={videoRef}
        onClose={() => {
          stopWebcam();
          setPhotoMode(null);
          setCapturedImage(null);
        }}
        onCapture={capturePhoto}
        onConfirm={confirmPhoto}
        onRetry={() => {
          setCapturedImage(null);
          setPhotoMode('webcam');
        }}
        onCancel={() => {
          stopWebcam();
          setPhotoMode(null);
        }}
      />
{/* Avatar Selection Overlay */}
      <AvatarGalleryModal
        isOpen={photoMode === 'avatar'}
        avatarOptions={avatarOptions}
        onSelect={(url) => confirmPhoto(url)}
        onClose={() => setPhotoMode(null)}
      />
{/* Modal de Banners */}
      <BannerSelectionModal
        isOpen={showBannersModal}
        bannerLevels={bannerLevels}
        selectedBanner={selectedBanner}
        onSelectBanner={(id) => {
          setSelectedBanner(id);
          setHasChanges(true);
        }}
        onClose={() => setShowBannersModal(false)}
        onNavigateToCoins={() => navigateTo('digcoins')}
      />
{/* Modal de Avatares */}
      {showAvatarsModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-gray-100 dark:border-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#E91E63]" strokeWidth={2} />
                  </div>
                  Avatares Colecionáveis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-15">Figuras históricas da tecnologia</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('digcoins')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B27FF] text-white rounded-xl font-medium text-sm hover:bg-[#6B1FBF] transition-all duration-300 hover:scale-105"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span className="sm:hidden">Mais</span>
                  <span className="hidden sm:inline">Obter Mais</span>
                </button>


                <button
                  onClick={() => setShowAvatarsModal(false)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Grid de Avatares */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {collectibleAvatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => {
                    if (avatar.unlocked) {
                      setSelectedAvatar(avatar.id);
                      setHasChanges(true);
                    }
                  }}
                  disabled={!avatar.unlocked}
                  className={`
                    relative p-3 rounded-xl border-2 transition-all duration-300 group
                    ${!avatar.unlocked
                      ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 opacity-60 cursor-not-allowed'
                      : selectedAvatar === avatar.id
                        ? 'border-[#8B27FF] dark:border-[#A855F7] bg-purple-50 dark:bg-purple-900/30 shadow-lg shadow-purple-500/20 scale-105'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105'
                    }
                  `}
                >
                  {!avatar.unlocked && (
                    <div className="absolute top-2 right-2 z-10 bg-gray-600 dark:bg-gray-800 rounded-full p-1">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}

                  <div className={`w-full aspect-square rounded-lg overflow-hidden mb-2 ${!avatar.unlocked ? 'grayscale' : ''}`}>
                    <img
                      src={avatar.url}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className={`text-xs font-medium text-center line-clamp-2 ${selectedAvatar === avatar.id ? 'text-[#8B27FF] dark:text-[#A855F7]' : 'text-gray-700 dark:text-gray-300'}`}>
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
      )}

      <ProfileStyles />
    </div>
  );
}



