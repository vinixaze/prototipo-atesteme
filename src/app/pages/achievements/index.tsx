import { useState } from "react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import { Lock } from "lucide-react";
import type { PageId } from "../../../lib/navigation/routes";
import type { AchievementsPageProps } from "./types";
import { conquistas } from "./conquistas";

export default function AchievementsPage({
  navigateTo,
  userRole,
}: AchievementsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const unlockedCount = conquistas.filter((c) => c.unlocked).length;
  const totalCount = conquistas.length;

  const handleNavigate = (page: PageId) => {
    navigateTo(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="conquistas"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('dashboard')}
                className="text-[#8B27FF] hover:text-[#7B1FE8] transition-colors"
              >
                ← Voltar
              </button>
              <h1 className="text-3xl">Conquistas</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#8B27FF] to-[#6B17D0] rounded-2xl p-8 text-white shadow-lg">
                <div className="text-6xl mb-2">{unlockedCount}</div>
                <div className="text-xl opacity-90">Medalhas Conquistadas</div>
              </div>

              <div className="bg-gradient-to-br from-[#7B1FE8] to-[#5B0FC0] rounded-2xl p-8 text-white shadow-lg">
                <div className="text-6xl mb-2">{totalCount}</div>
                <div className="text-xl opacity-90">Total de Medalhas</div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conquistas.map((conquista) => {
                const Icon = conquista.unlocked ? conquista.icon : Lock;
                
                return (
                  <div
                    key={conquista.id}
                    className={`
                      bg-white rounded-2xl p-6 shadow-sm transition-all
                      ${
                        conquista.unlocked
                          ? 'border-4 border-yellow-400 shadow-lg'
                          : 'border border-gray-200'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`
                        w-24 h-24 rounded-full flex items-center justify-center
                        ${
                          conquista.unlocked
                            ? conquista.color === 'yellow'
                              ? 'bg-yellow-100'
                              : conquista.color === 'orange'
                              ? 'bg-orange-100'
                              : conquista.color === 'blue'
                              ? 'bg-blue-100'
                              : conquista.color === 'purple'
                              ? 'bg-purple-100'
                              : conquista.color === 'gold'
                              ? 'bg-amber-100'
                              : conquista.color === 'green'
                              ? 'bg-green-100'
                              : 'bg-cyan-100'
                            : 'bg-gray-100'
                        }
                      `}
                      >
                        <Icon
                          className={`
                          w-12 h-12
                          ${
                            conquista.unlocked
                              ? conquista.color === 'yellow'
                                ? 'text-yellow-500'
                                : conquista.color === 'orange'
                                ? 'text-orange-500'
                                : conquista.color === 'blue'
                                ? 'text-blue-500'
                                : conquista.color === 'purple'
                                ? 'text-purple-500'
                                : conquista.color === 'gold'
                                ? 'text-amber-500'
                                : conquista.color === 'green'
                                ? 'text-green-500'
                                : 'text-cyan-500'
                              : 'text-gray-400'
                          }
                        `}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`
                      text-center text-lg mb-2
                      ${conquista.unlocked ? 'text-gray-900' : 'text-gray-500'}
                    `}
                    >
                      {conquista.title}
                    </h3>

                    {/* Description */}
                    <p className="text-center text-sm text-gray-600 mb-3">
                      {conquista.description}
                    </p>

                    {/* Date or Locked State */}
                    {conquista.unlocked ? (
                      <div className="text-center">
                        <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Conquistada em {conquista.date}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="inline-block px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                          Bloqueada
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Message */}
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <p className="text-lg text-gray-700">
                Continue completando competências e acessando a plataforma para desbloquear mais
                conquistas!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

