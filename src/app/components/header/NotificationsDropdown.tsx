import { useState, useRef } from 'react';
import { Bell, ChevronLeft, ArrowRight } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_NOTIFS = 3;
const notifications: Notification[] = [
  {
    id: 1,
    title: "Nova mensagem recebida!",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (texto grande pra testar scroll)",
    time: "2h atrás",
    unread: true,
  },
  {
    id: 2,
    title: "Você subiu de nível!",
    description: "Agora você está no Nível 2",
    time: "1 dia atrás",
    unread: true,
  },
  {
    id: 3,
    title: "Novo conteúdo disponível",
    description: "Confira os novos desafios em Proteção e Segurança",
    time: "2 dias atrás",
    unread: false,
  },
  {
    id: 4,
    title: "Atualização do sistema",
    description: "Melhorias de performance e correções foram aplicadas.",
    time: "3 dias atrás",
    unread: false,
  },
  {
    id: 5,
    title: "Nova atividade liberada",
    description: "Você tem uma nova atividade para completar hoje.",
    time: "4 dias atrás",
    unread: true,
  },
  {
    id: 6,
    title: "Lembrete",
    description: "Não esqueça de finalizar seu progresso semanal.",
    time: "5 dias atrás",
    unread: false,
  },
];

export default function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const loadMoreAnchorRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) {
    setSelectedNotification(null);
    setShowAllNotifications(false);
    return null;
  }

  const visibleNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, INITIAL_NOTIFS);

  const hasMoreNotifications = !showAllNotifications && notifications.length > INITIAL_NOTIFS;

  return (
    <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 flex flex-col max-h-[80vh]">
      <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-4">
        <div className="flex items-center gap-3">
          {selectedNotification ? (
            <button
              type="button"
              onClick={() => setSelectedNotification(null)}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white leading-tight">
              {selectedNotification ? "Mensagem" : "Mensagens"}
            </h3>
            <p className="text-xs text-white/80">
              {selectedNotification
                ? selectedNotification.time
                : "Toque para abrir"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto overscroll-contain">
        {!selectedNotification ? (
          <>
            <div className="space-y-2">
              {visibleNotifications.map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => setSelectedNotification(notif)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${notif.unread
                    ? "bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {notif.unread && (
                      <div className="w-2 h-2 bg-[#8B27FF] rounded-full mt-2 flex-shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {notif.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {notif.time}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  </div>
                </button>
              ))}

              <div ref={loadMoreAnchorRef} />
            </div>

            {hasMoreNotifications ? (
              <button
                type="button"
                onClick={() => {
                  setShowAllNotifications(true);
                  requestAnimationFrame(() => {
                    loadMoreAnchorRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                    });
                  });
                }}
                className="relative z-10 w-full mt-3 text-sm text-[#8B27FF] dark:text-[#A855F7] hover:underline font-semibold"
              >
                Ver todas as mensagens
              </button>
            ) : (
              <p className="w-full mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                Você já viu todas as mensagens.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B27FF] to-[#A855F7] flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {selectedNotification.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {selectedNotification.time}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                  {selectedNotification.description}
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 pt-4 bg-white dark:bg-gray-800">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#8B27FF] text-white hover:bg-[#6B1FBF] transition-colors font-bold"
                >
                  Fechar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

