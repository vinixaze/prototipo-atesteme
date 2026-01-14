import {
  Coins,
  Star,
  Trophy,
  Zap,
  Gift,
  Calendar,
  Award,
  PlusCircle,
  Minus,
  Wallet,
  ShoppingCart,
  RotateCcw,
  Clock,
  Shield,
  BookOpen,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Equal,
  Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  getUserInventory,
  buyPowerUp,
  getPowerUpQuantity,
  type PowerUp
} from '../../../utils/powerupsStorage';

interface CoinsTabProps {
  totalDigcoins: number;
}

export default function CoinsTab({ totalDigcoins }: CoinsTabProps) {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [userDigcoins, setUserDigcoins] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState<number | null>(null);

  // Carregar saldo de digcoins do localStorage
  useEffect(() => {
    const inventory = getUserInventory();
    setUserDigcoins(inventory.digcoins);
  }, []);

  // Dados do Marketplace Educativo
  const marketplaceItems = [
    // Ferramentas de Estudo (Power-ups de Desafio)
    {
      id: 1,
      name: 'Segunda Chance',
      cost: 500,
      category: 'Consumível (Desafio)',
      categoryTag: 'FERRAMENTAS DE ESTUDO',
      categoryColor: '#8B27FF',
      icon: RotateCcw,
      description: 'Permite repetir o teste completo imediatamente, sem penalidade de tempo.',
      rationale: '',
      type: 'retry' as PowerUp['type'],
      usableInQuiz: true
    },
    {
      id: 2,
      name: 'Fura-Fila (Zera 5 Dias)',
      cost: 400,
      category: 'Consumível (Tempo)',
      categoryTag: 'FERRAMENTAS DE ESTUDO',
      categoryColor: '#8B27FF',
      icon: Clock,
      description: 'Zera a penalidade de espera ao bloquear uma competência.',
      rationale: '',
      type: 'reset-time' as PowerUp['type'],
      usableInQuiz: false
    },
    {
      id: 3,
      name: 'Escudo (50/50)',
      cost: 150,
      category: 'Consumível (Facilitador)',
      categoryTag: 'FERRAMENTAS DE ESTUDO',
      categoryColor: '#8B27FF',
      icon: Shield,
      description: 'Elimina uma alternativa incorreta em múltipla escolha.',
      rationale: '',
      type: 'shield' as PowerUp['type'],
      usableInQuiz: true
    },
    {
      id: 8,
      name: 'Conferir Resposta',
      cost: 100,
      category: 'Consumível (Facilitador)',
      categoryTag: 'FERRAMENTAS DE ESTUDO',
      categoryColor: '#8B27FF',
      icon: CircleAlert,
      description: 'Verifica se a resposta selecionada está correta ou incorreta antes de enviar.',
      rationale: '',
      type: 'check-answer' as PowerUp['type'],
      usableInQuiz: true
    },
    // Conteúdo de Apoio
    {
      id: 4,
      name: 'Desbloqueio Teoria',
      cost: 50,
      category: 'Conteúdo de Apoio',
      categoryTag: 'CONTEÚDO DE APOIO',
      categoryColor: '#00BCD4',
      icon: BookOpen,
      description: 'Libera um link sugerido de conteúdo para ajudar na resolução do desafio.',
      rationale: '',
      type: 'unlock-theory' as PowerUp['type'],
      usableInQuiz: true
    },
    // Certificação e Carreira
    {
      id: 5,
      name: 'Badge Currículo',
      cost: 1000,
      category: 'Certificação (Permanente)',
      categoryTag: 'CERTIFICAÇÃO E CARREIRA',
      categoryColor: '#4CAF50',
      icon: FileText,
      description: 'Modelo personalizado de certificado com suas medalhas integradas.',
      rationale: 'Valor prático. Converte o esforço virtual em credencial real.',
      type: 'retry' as PowerUp['type'],
      usableInQuiz: false
    },
    // Identidade e Segurança
    {
      id: 6,
      name: 'Banners de Nível (1 ao 5)',
      cost: 100,
      category: 'Personalização Visual',
      categoryTag: 'IDENTIDADE E SEGURANÇA',
      categoryColor: '#FF9800',
      icon: ImageIcon,
      description: 'Planos de fundo temáticos que refletem seu nível atual.',
      rationale: 'Proteção de Identidade & Compliance.',
      type: 'retry' as PowerUp['type'],
      usableInQuiz: false
    },
    {
      id: 7,
      name: 'Avatares Colecionáveis',
      cost: 150,
      category: 'Personalização Visual',
      categoryTag: 'IDENTIDADE E SEGURANÇA',
      categoryColor: '#FF9800',
      icon: ImageIcon,
      description: 'Imagens estilizadas de figuras importantes relacionadas à tecnologia para o perfil.',
      rationale: 'Proteção de Identidade & Compliance.',
      type: 'retry' as PowerUp['type'],
      usableInQuiz: false
    },
  ];

  // Função para comprar item
  const handlePurchase = (item: typeof marketplaceItems[0]) => {
    const success = buyPowerUp(item.id, item.name, item.cost, item.type);

    if (success) {
      // Atualizar saldo de digcoins
      const inventory = getUserInventory();
      setUserDigcoins(inventory.digcoins);

      // Mostrar feedback de sucesso
      setPurchaseSuccess(item.id);
      setTimeout(() => setPurchaseSuccess(null), 2000);
    } else {
      alert('Digcoins insuficientes!');
    }
  };

  // Dados de histórico de ganhos de digcoins
  const digcoinsHistory = [
    { id: 1, date: '18/12/2024', description: 'Competência: Gerenciar dados', amount: 9, category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: Coins },
    { id: 2, date: '18/12/2024', description: 'Competência: Gerir a identidade digital', amount: 9, category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Coins },
    { id: 3, date: '17/12/2024', description: 'Competência: Realizar pesquisa e monitoramento', amount: 9, category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: Coins },
    { id: 4, date: '17/12/2024', description: 'Competência: Interagir', amount: 9, category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Coins },
    { id: 5, date: '16/12/2024', description: 'Competência: Compartilhar e publicar', amount: 9, category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Coins },
    { id: 6, date: '16/12/2024', description: 'Competência: Adaptar arquivos', amount: 9, category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Coins },
    { id: 7, date: '15/12/2024', description: 'Competência: Programar sistemas', amount: 9, category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Coins },
    { id: 8, date: '14/12/2024', description: 'Bônus: Sequência de 7 dias', amount: 15, category: 'BÔNUS', categoryColor: '#8B27FF', icon: Coins },
    { id: 9, date: '10/12/2024', description: 'Medalha: Primeira Conquista', amount: 10, category: 'MEDALHA', categoryColor: '#FFD700', icon: Coins },
  ];

  // Estatísticas
  const fromCompetencies = digcoinsHistory
    .filter(item => item.category !== 'BÔNUS' && item.category !== 'MEDALHA')
    .reduce((acc, item) => acc + item.amount, 0);
  const fromBonuses = digcoinsHistory
    .filter(item => item.category === 'BÔNUS' || item.category === 'MEDALHA')
    .reduce((acc, item) => acc + item.amount, 0);

  // Calcular totais de recebidos e gastos
  const totalSpent = 900; // Exemplo fixo de pontos gastos
  const totalReceived = totalSpent + userDigcoins;

  // Mostrar apenas os 3 primeiros itens do histórico, ou todos se expandido
  const displayedHistory = showAllHistory ? digcoinsHistory : digcoinsHistory.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[28px] font-bold text-[#333] dark:text-gray-200 mb-3">
          <span className="text-gray-800 dark:text-gray-300">Seus </span>
          <span className="font-bold text-gray-900 dark:text-gray-100">Pontos</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#8B27FF] dark:text-[#A855F7]">
          < Coins className="w-4 h-4" />
          <span className="font-semibold">Ganhe e gaste pontos na sua jornada de aprendizado digital</span>
        </div>
      </div>

      {/* SEÇÃO 3 - SEUS PONTOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div
          className="relative bg-gradient-to-r from-[#059669] to-[#047857] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Sinal de + dentro de moedas empilhadas */}
          <div className="absolute top-3 right-3 w-[50px] h-[50px] transition-all duration-300 group-hover:scale-110">
            <Coins
              className="w-full h-full text-white opacity-50"
              strokeWidth={2}
            />

          </div>

          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              {totalReceived}
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Pontos Recebidos
            </div>
          </div>
        </div>

        {/* CARD 3 - PONTOS UTILIZADOS (ÂMBAR / GASTOS) */}
        <div
          className="relative bg-gradient-to-r from-[#9CA3AF] to-[#4B5563] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo */}
          <div className="absolute top-3 right-3 w-[50px] h-[50px] transition-all duration-300 group-hover:scale-110">
            <Coins
              className="w-full h-full text-white opacity-50"
              strokeWidth={2}
            />

          </div>

          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Minus
                className="w-7 h-7 text-white opacity-90 mt-0.5"
                strokeWidth={2.5}
              />

              <div className="text-[44px] font-bold text-white leading-none">
                {totalSpent}
              </div>
            </div>

            <div className="text-[13px] font-medium text-white/90">
              Pontos utilizados
            </div>
          </div>

        </div>

        {/* CARD 3 - SALDO ATUAL (Verde Escuro) */}
        <div
          className="relative bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Carteira */}
          <Wallet
            className="absolute top-3 right-3 w-[50px] h-[50px] text-white opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            strokeWidth={2}
          />

          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Equal
                className="w-7 h-7 text-white opacity-90 mt-0.5"
                strokeWidth={2.5}
              />

              <div className="text-[44px] font-bold text-white leading-none">
                {userDigcoins}
              </div>
            </div>

            <div className="text-[13px] font-medium text-white/90">
              Saldo Atual
            </div>
          </div>

        </div>






      </div>

      {/* Botão Troque seus pontos */}
      <div className="mb-12">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Troque seus pontos</h3>
        </div>

        {/* Grade de Itens do Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => {
            const ItemIcon = item.icon;
            const canAfford = userDigcoins >= item.cost;
            const ownedQuantity = getPowerUpQuantity(item.id);

            return (
              <div
                key={item.id}
                className={`
                  relative bg-white dark:bg-gray-800 rounded-2xl border-2 p-6 transition-all duration-300
                  ${canAfford
                    ? 'border-purple-200 dark:border-purple-700 shadow-md hover:shadow-xl hover:-translate-y-2 cursor-pointer group'
                    : 'border-gray-200 dark:border-gray-600 opacity-60 cursor-not-allowed'
                  }
                `}
              >
                {/* Badge de quantidade (se possuir) */}
                {ownedQuantity > 0 && (
                  <div className="absolute top-4 right-4 bg-[#8B27FF] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {ownedQuantity}x
                  </div>
                )}

                {/* Ícone */}
                <div className="mb-4">
                  <div
                    className={`
                      w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300
                      ${canAfford ? 'shadow-md group-hover:scale-110 group-hover:rotate-6' : 'shadow-sm'}
                    `}
                    style={{
                      backgroundColor: canAfford ? item.categoryColor + '20' : '#F3F4F6',
                    }}
                  >
                    <ItemIcon
                      className="w-8 h-8"
                      style={{ color: canAfford ? item.categoryColor : '#9CA3AF' }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Nome do Item */}
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {item.name}
                </h4>

                {/* Categoria */}
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-3">
                  {item.category}
                </p>

                {/* Descrição */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 min-h-[60px]">
                  {item.description}
                </p>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Coins
                      className="w-5 h-5"
                      style={{ color: canAfford ? '#8B27FF' : '#9CA3AF' }}
                      strokeWidth={2}
                    />
                    <span
                      className="text-xl font-bold"
                      style={{ color: canAfford ? '#8B27FF' : '#9CA3AF' }}
                    >
                      {item.cost}
                    </span>
                  </div>

                  <button
                    className={`
                      px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300
                      ${canAfford
                        ? 'bg-gradient-to-r from-[#8B27FF] to-[#B05FFF] text-white hover:scale-105 hover:shadow-lg'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }
                    `}
                    disabled={!canAfford}
                    onClick={() => handlePurchase(item)}
                  >
                    {canAfford ? 'Trocar' : 'Insuficiente'}
                  </button>
                </div>

                {/* Feedback de Sucesso */}
                {purchaseSuccess === item.id && (
                  <div className="absolute inset-0 bg-green-500/90 rounded-2xl flex items-center justify-center text-white font-bold text-lg z-10">
                    <div className="flex items-center gap-2">
                      <Check className="w-6 h-6" />
                      Comprado!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Histórico de Ganhos - COMPACTO */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-b-2 border-gray-100 dark:border-gray-700 px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Histórico de Pontos</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Extrato detalhado dos ganhos e utilização de pontos</p>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 dark:scrollbar-thumb-purple-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
          {digcoinsHistory.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                className="px-6 py-4 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-200 group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Mobile layout */}
                <div className="sm:hidden">
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                      <span className="text-base font-bold text-[#8B27FF]">+{item.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:flex items-center gap-4">
                  {/* Ícone */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: item.categoryColor + '20',
                    }}
                  >
                    <ItemIcon
                      className="w-6 h-6"
                      style={{ color: item.categoryColor }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1">{item.description}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: item.categoryColor + '20',
                          color: item.categoryColor,
                        }}
                      >
                        {item.category}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Valor dos Digcoins */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                      <span className="text-base font-bold text-[#8B27FF]">+{item.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info sobre Digcoins */}
      <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800 rounded-2xl border-2 border-purple-100 dark:border-purple-700 p-6 shadow-sm mb-20 sm:mb-0">
        <div className="space-y-4">
          {/* Linha superior: ícone + título lado a lado */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#B05FFF] rounded-xl flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg leading-tight">
              Como ganhar mais Pontos?
            </h4>
          </div>

          {/* Lista embaixo, largura total */}
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-none pl-0 m-0">
            <li className="flex items-start gap-2">
              <Coins className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Complete competências:</strong> Ganhe até 9 Pontos por competência (3 Pontos por estrela)
              </span>
            </li>

            <li className="flex items-start gap-2">
              <Trophy className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Desbloqueie medalhas:</strong> Receba Pontos bônus ao conquistar novas medalhas
              </span>
            </li>

            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#FF9800] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Mantenha a sequência:</strong> Acesse a plataforma diariamente e ganhe bônus especiais
              </span>
            </li>
          </ul>
        </div>
      </div>


      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
