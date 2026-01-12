import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { faqCategories, faqItems, faqTips, faqVideoChapters } from '../data/faq';
import { FaqAccordion } from './faq/FaqAccordion';
import { FaqCategoryFilter } from './faq/FaqCategoryFilter';
import { FaqHero } from './faq/FaqHero';
import { FaqSupportSection } from './faq/FaqSupportSection';
import { FaqTipsSection } from './faq/FaqTipsSection';
import { FaqVideoModal } from './faq/FaqVideoModal';
import { FaqVideoTrigger } from './faq/FaqVideoTrigger';

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
            <FaqHero />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
              <FaqTipsSection tips={faqTips} />

              <FaqVideoTrigger onOpen={() => setIsVideoModalOpen(true)} />

              <FaqVideoModal
                isOpen={isVideoModalOpen}
                onOpenChange={setIsVideoModalOpen}
                videoRef={videoRef}
                chapters={faqVideoChapters}
                activeChapter={activeChapter}
                expandedChapter={expandedChapter}
                onJumpToTimestamp={jumpToTimestamp}
              />

              <FaqCategoryFilter
                categories={faqCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              <FaqAccordion items={filteredFaqs} />
              <FaqSupportSection onNavigate={navigateTo} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
