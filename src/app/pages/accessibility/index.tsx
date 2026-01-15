import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import { 
  Eye, 
  Volume2, 
  Smartphone, 
  Monitor, 
  Download,
  ExternalLink,
  CheckCircle,
  ChevronRight,
  Accessibility
} from "lucide-react";

interface AccessibilityPageProps {
  navigateTo: (page: string) => void;
  userRole?: 'admin' | 'user';
}

interface AccessibilityTool {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: any;
  gradient: string;
  platforms: string[];
  downloadLink: string;
  learnMoreLink?: string;
  features: string[];
}

export default function AccessibilityPage({
  navigateTo,
  userRole,
}: AccessibilityPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('vlibras');

  const accessibilityTools: AccessibilityTool[] = [
    {
      id: 'vlibras',
      name: 'VLibras',
      description: 'Tradutor de conteúdo digital para Libras',
      fullDescription: 'As aplicações da Suíte VLibras permitem que pessoas surdas acessem conteúdo multimídia em sua língua natural de comunicação, o que contribui para com a acessibilidade de computadores, dispositivos móveis e páginas Web.',
      icon: Eye,
      gradient: 'from-[#1E40AF] to-[#3B82F6]',
      platforms: ['Windows', 'Linux', 'macOS', 'Android', 'Chrome', 'Firefox'],
      downloadLink: 'https://www.gov.br/governodigital/pt-br/vlibras',
      learnMoreLink: 'https://www.gov.br/governodigital/pt-br/vlibras',
      features: [
        'Tradução automática de texto para Libras',
        'Avatar 3D realista',
        'Compatível com navegadores web',
        'Aplicativo móvel disponível',
        'Software gratuito e open source'
      ]
    },
    {
      id: 'talkback',
      name: 'Google TalkBack',
      description: 'Leitor de tela para Android',
      fullDescription: 'O TalkBack é o leitor de tela do Google incluído em dispositivos Android. O TalkBack oferece feedback falado para que você possa usar seu dispositivo sem olhar para a tela.',
      icon: Volume2,
      gradient: 'from-[#7C3AED] to-[#A855F7]',
      platforms: ['Android'],
      downloadLink: 'https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback',
      learnMoreLink: 'https://support.google.com/accessibility/android/answer/6283677',
      features: [
        'Feedback por voz de ações na tela',
        'Gestos de navegação personalizáveis',
        'Suporte a braille',
        'Controle de velocidade de fala',
        'Integrado ao Android'
      ]
    },
    {
      id: 'voiceover',
      name: 'VoiceOver',
      description: 'Leitor de tela da Apple',
      fullDescription: 'O VoiceOver é um leitor de tela líder do setor baseado em gestos que permite aproveitar o iPhone, iPad e iPod touch mesmo que você não consiga ver a tela.',
      icon: Smartphone,
      gradient: 'from-[#059669] to-[#10B981]',
      platforms: ['iOS', 'macOS'],
      downloadLink: 'https://www.apple.com/br/accessibility/voiceover/',
      learnMoreLink: 'https://support.apple.com/pt-br/guide/iphone/iph3e2e415f/ios',
      features: [
        'Descrição de elementos na tela',
        'Gestos intuitivos para navegação',
        'Rotor para acesso rápido',
        'Suporte a mais de 30 idiomas',
        'Pré-instalado em dispositivos Apple'
      ]
    },
    {
      id: 'narrador',
      name: 'Narrador do Windows',
      description: 'Leitor de tela integrado ao Windows',
      fullDescription: 'O Narrador é um leitor de tela integrado ao Windows 10 e Windows 11 que lê o texto na tela e descreve eventos, como notificações e compromissos do calendário.',
      icon: Monitor,
      gradient: 'from-[#DC2626] to-[#EF4444]',
      platforms: ['Windows 10', 'Windows 11'],
      downloadLink: 'https://support.microsoft.com/pt-br/windows/guia-completo-do-narrador-e4397a0d-ef4f-b386-d8ae-c172f109bdb1',
      learnMoreLink: 'https://support.microsoft.com/pt-br/windows/cap%C3%ADtulo-1-introdu%C3%A7%C3%A3o-ao-narrador-7fe8fd72-541f-4536-7658-bfc37ddaf9c6',
      features: [
        'Leitura de texto e descrição de eventos',
        'Comandos de teclado para navegação',
        'Suporte a displays braille',
        'Vozes naturais em múltiplos idiomas',
        'Integrado ao sistema operacional'
      ]
    },
    {
      id: 'ubuntu',
      name: 'Acessibilidade no Ubuntu',
      description: 'Recursos de acessibilidade do Ubuntu',
      fullDescription: 'O Ubuntu oferece um conjunto completo de ferramentas de acessibilidade, incluindo leitor de tela Orca, ampliação de tela, teclado na tela e muito mais para tornar o sistema operacional acessível a todos.',
      icon: Monitor,
      gradient: 'from-[#EA580C] to-[#F97316]',
      platforms: ['Ubuntu', 'Linux'],
      downloadLink: 'https://help.ubuntu.com/stable/ubuntu-help/a11y.html.pt_BR',
      learnMoreLink: 'https://ubuntu.com/accessibility',
      features: [
        'Leitor de tela Orca integrado',
        'Ampliador de tela',
        'Teclado virtual na tela',
        'Alto contraste e temas acessíveis',
        'Software livre e gratuito'
      ]
    }
  ];

  const currentTool = accessibilityTools.find(tool => tool.id === selectedTool) || accessibilityTools[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="acessibilidade"
        onNavigate={navigateTo}
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
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi02IDYtNmMwIDMuMzE0LTIuNjg2IDYtNiA2cy02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 py-6 md:py-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl mb-4">
                    <Accessibility className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    ACESSIBILIDADE
                  </h1>
                  <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
                    Ferramentas para tornar sua experiência digital mais acessível e inclusiva
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
              {/* Tool Selection Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  {accessibilityTools.map((tool, index) => (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`
                        px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                        ${selectedTool === tool.id
                          ? `bg-gradient-to-r ${tool.gradient} text-white shadow-xl shadow-purple-500/30`
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      {tool.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Tool Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTool.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                >
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${currentTool.gradient} p-8 md:p-12 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi02IDYtNmMwIDMuMzE0LTIuNjg2IDYtNiA2cy02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                    
                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                          <currentTool.icon className="w-16 h-16" />
                        </div>
                      </motion.div>

                      <div className="flex-1 text-center md:text-left">
                        <motion.h2
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl md:text-4xl font-bold mb-3"
                        >
                          {currentTool.name}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-lg md:text-xl opacity-90"
                        >
                          {currentTool.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 md:p-12">
                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-8"
                    >
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {currentTool.fullDescription}
                      </p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-8"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7]" />
                        Recursos Principais
                      </h3>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {currentTool.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                          >
                            <ChevronRight className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Platforms */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mb-8"
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        Plataformas Compatíveis
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentTool.platforms.map((platform, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.05 }}
                            className={`px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${currentTool.gradient} text-white`}
                          >
                            {platform}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.a
                        href={currentTool.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r ${currentTool.gradient} text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                      >
                        <Download className="w-5 h-5" />
                        Download / Acessar
                      </motion.a>

                      {currentTool.learnMoreLink && (
                        <motion.a
                          href={currentTool.learnMoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all border-2 border-gray-200 dark:border-gray-600"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Saiba Mais
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Info Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Comprometidos com a Inclusão
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                    Na ATESTEME, acreditamos que a educação digital deve ser acessível a todos. 
                    Estas ferramentas são recomendações que podem melhorar significativamente 
                    sua experiência ao utilizar tecnologias digitais.
                  </p>
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="inline-flex items-center gap-2 bg-[#8B27FF] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#7B1FE8] transition-all shadow-lg"
                  >
                    Voltar ao Dashboard
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

