import { useEffect, useState } from 'react';
import { X, Download, RefreshCw } from 'lucide-react';

// Interface para evento de instalação
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAManager() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  useEffect(() => {
    // Registra o Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('✅ Service Worker registrado:', registration.scope);

            // Verifica atualizações a cada 60 segundos
            setInterval(() => {
              registration.update();
            }, 60000);

            // Detecta quando há uma nova versão
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Nova versão disponível
                    setShowUpdatePrompt(true);
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('❌ Erro ao registrar Service Worker:', error);
          });
      });
    }

    // Captura evento de instalação do PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      
      // Verifica se já foi instalado antes
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-shown');
      if (!hasSeenPrompt) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detecta quando o PWA é instalado
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA instalado com sucesso!');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    // Monitora status de conexão
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineToast(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineToast(true);
      
      // Remove toast após 5 segundos
      setTimeout(() => {
        setShowOfflineToast(false);
      }, 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Instala o PWA
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} instalar o PWA`);

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-install-prompt-shown', 'true');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Atualiza o Service Worker
  const handleUpdateClick = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          // Recarrega a página para aplicar a atualização
          window.location.reload();
        }
      });
    }
  };

  // Fecha prompt de instalação
  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-prompt-shown', 'true');
  };

  return (
    <>
      {/* Banner de Instalação */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slideInRight">
          <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] rounded-2xl shadow-2xl p-6 text-white">
            <button
              onClick={handleDismissInstall}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Instalar ATESTEME</h3>
                <p className="text-sm text-white/90">
                  Instale nosso app para acesso rápido e experiência completa, mesmo offline!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-white text-[#8B27FF] py-3 px-4 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                Instalar Agora
              </button>
              <button
                onClick={handleDismissInstall}
                className="px-4 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner de Atualização */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slideInRight">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 text-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Nova versão disponível!</h3>
                <p className="text-sm text-white/90">
                  Atualize agora para ter acesso às melhorias e novos recursos.
                </p>
              </div>
            </div>

            <button
              onClick={handleUpdateClick}
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              Atualizar Agora
            </button>
          </div>
        </div>
      )}

      {/* Toast de Offline */}
      {showOfflineToast && !isOnline && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">Você está offline</span>
          </div>
        </div>
      )}

      {/* Indicador de Status (sempre visível quando offline) */}
      {!isOnline && !showOfflineToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Modo Offline</span>
          </div>
        </div>
      )}
    </>
  );
}
