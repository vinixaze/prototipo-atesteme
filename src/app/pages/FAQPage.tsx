import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  Search,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  BookOpen,
  Shield,
  Play,
  Clock,
  X,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { faqCategories, faqItems, faqTips, faqVideoChapters } from '../data/faq';

interface FAQPageProps {
  navigateTo: (page: string) => void;
  userRole?: 'admin' | 'user';
}

export default function FAQPage({ navigateTo, userRole }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Filtrar FAQs
  const filteredFaqs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Função para ir para um timestamp específico do vídeo
  const jumpToTimestamp = (timestamp: number, chapterId: number) => {
    setActiveChapter(chapterId);
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);

    // Atualiza o src do iframe com o timestamp
    if (videoRef.current) {
      const videoId = 'dQw4w9WgXcQ'; // Substitua pelo ID real do vídeo
      videoRef.current.src = `https://www.youtube.com/embed/${videoId}?start=${timestamp}&autoplay=1`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="faq"
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
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Central de Ajuda
                  </h1>
                  <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
                    Encontre respostas para suas dúvidas sobre a plataforma ATESTEME
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
              {/* Dicas Rápidas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dicas Importantes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {faqTips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="relative group"
                    >
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                        <div className={`w-14 h-14 bg-gradient-to-br ${tip.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <tip.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Video Tutorial Card - Trigger for Modal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Guia do Usuário</h2>
                </div>

                <motion.button
                  onClick={() => setIsVideoModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] rounded-3xl p-1 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-[22px] p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <Play className="w-12 h-12 text-white fill-white" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                          Assista ao Tutorial Completo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                          Aprenda tudo sobre a plataforma ATESTEME com nosso guia em vídeo dividido em 21 capítulos práticos e objetivos.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#8B27FF] font-semibold">
                          <span>Clique para assistir</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>

                      <div className="flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl px-6 py-4 border-2 border-purple-100 dark:border-purple-800">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#8B27FF] dark:text-[#A855F7] mb-1">21</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Capítulos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Video Modal */}
              <Dialog.Root open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                <Dialog.Portal>
                  <Dialog.Overlay asChild>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                  </Dialog.Overlay>

                  <Dialog.Content asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                      {/* Hidden Description for Accessibility */}
                      <Dialog.Description className="sr-only">
                        Modal com vídeo tutorial completo da plataforma ATESTEME. Inclui capítulos navegáveis sobre funcionalidades e recursos do sistema.
                      </Dialog.Description>

                      {/* Modal Header */}
                      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Play className="w-5 h-5" />
                          </div>
                          <div>
                            <Dialog.Title className="font-bold text-lg">
                              Guia do Usuário ATESTEME
                            </Dialog.Title>
                            <p className="text-sm text-purple-100">Tutorial completo da plataforma</p>
                          </div>
                        </div>

                        <Dialog.Close asChild>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </motion.button>
                        </Dialog.Close>
                      </div>

                      {/* Modal Body - Split Layout */}
                      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Video Player - Fixed on Left */}
                        <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4 md:p-6 flex-shrink-0">
                          <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                              ref={videoRef}
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                              title="Tutorial ATESTEME"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>

                        {/* Chapters List - Scrollable on Right */}
                        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col min-h-0 md:min-h-full">
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" />
                              Capítulos ({faqVideoChapters.length})
                            </h3>
                          </div>

                          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 min-h-0">
                            {faqVideoChapters.map((chapter, index) => (
                              <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                              >
                                <motion.button
                                  onClick={() => jumpToTimestamp(chapter.timestamp, chapter.id)}
                                  whileHover={{ x: 4 }}
                                  className={`w-full text-left rounded-xl overflow-hidden transition-all ${activeChapter === chapter.id
                                      ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg'
                                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                  <div className="p-4">
                                    <div className="flex items-start gap-3">
                                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${chapter.gradient} flex items-center justify-center flex-shrink-0 ${activeChapter === chapter.id ? 'bg-white/20' : ''
                                        }`}>
                                        <chapter.icon className={`w-5 h-5 ${activeChapter === chapter.id ? 'text-white' : 'text-white'}`} />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${activeChapter === chapter.id
                                              ? 'bg-white/20 text-white'
                                              : 'bg-purple-100 text-[#8B27FF]'
                                            }`}>
                                            {chapter.duration}
                                          </span>
                                          {activeChapter === chapter.id && (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              className="flex items-center gap-1 text-xs font-medium"
                                            >
                                              <Play className="w-3 h-3 fill-white" />
                                              Reproduzindo
                                            </motion.span>
                                          )}
                                        </div>
                                        <h4 className={`font-bold text-sm mb-1 ${activeChapter === chapter.id ? 'text-white' : 'text-gray-800'
                                          }`}>
                                          {chapter.title}
                                        </h4>
                                      </div>

                                      <motion.div
                                        animate={{ rotate: expandedChapter === chapter.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                      >
                                        <ChevronDown className={`w-5 h-5 ${activeChapter === chapter.id ? 'text-white' : 'text-gray-400'
                                          }`} />
                                      </motion.div>
                                    </div>

                                    <AnimatePresence>
                                      {expandedChapter === chapter.id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="overflow-hidden"
                                        >
                                          <p className={`text-sm mt-3 pt-3 border-t leading-relaxed ${activeChapter === chapter.id
                                              ? 'text-purple-100 border-white/20'
                                              : 'text-gray-600 border-gray-200'
                                            }`}>
                                            {chapter.description}
                                          </p>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Perguntas Frequentes</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {faqCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 md:px-6 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${selectedCategory === category
                          ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-500/30'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Accordion.Root type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Accordion.Item
                        value={`item-${index}`}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="w-full group">
                            <div className="flex items-center justify-between w-full px-6 md:px-8 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <span className="font-semibold text-gray-800 dark:text-white text-lg pr-4">
                                {faq.question}
                              </span>
                              <ChevronDown className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7] flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </div>
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                          <div className="px-6 md:px-8 pb-6 pt-2">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    </motion.div>
                  ))}
                </Accordion.Root>

                {filteredFaqs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Nenhuma pergunta encontrada
                    </h3>
                    <p className="text-gray-600">
                      Tente ajustar sua busca ou selecione outra categoria
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Ainda tem dúvidas?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                    Nossa equipe está pronta para ajudar você! Entre em contato através do WhatsApp ou envie uma observação diretamente pela plataforma.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigateTo('chatbot')} // ou a rota que você usar
                      className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Chatbot
                    </button>

                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
                    >
                      Voltar ao Dashboard
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
