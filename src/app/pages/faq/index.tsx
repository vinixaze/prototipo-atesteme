import { useMemo, useRef, useState } from 'react';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { TipsGrid } from './components/TipsGrid';
import { VideoTutorialSection } from './components/VideoTutorialSection';
import { VideoModal } from './components/VideoModal';
import { CategoryFilter } from './components/CategoryFilter';
import { AccordionSection } from './components/AccordionSection';
import { ContactSection } from './components/ContactSection';
import { categories, faqs, tips, videoChapters } from './data';
import { FAQItem, VideoChapter } from './types';
import type { FAQPageProps } from "./types";

export default function FAQPage({ navigateTo, userRole }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchQuery]);

  const jumpToTimestamp = (timestamp: number, chapterId: number) => {
    setActiveChapter(chapterId);
    setExpandedChapter((prev) => (prev === chapterId ? null : chapterId));
    if (videoRef.current) {
      const videoId = 'dQw4w9WgXcQ';
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
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <HeroSection />

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
              <TipsGrid tips={tips} />

              <VideoTutorialSection
                onOpenModal={() => setIsVideoModalOpen(true)}
                chaptersCount={videoChapters.length}
              />

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <AccordionSection items={filteredFaqs} />

              <ContactSection
                onChatbot={() => navigateTo('chatbot')}
                onDashboard={() => navigateTo('dashboard')}
              />
            </div>
          </div>
        </main>
      </div>

      <VideoModal
        open={isVideoModalOpen}
        onOpenChange={setIsVideoModalOpen}
        chapters={videoChapters}
        activeChapter={activeChapter}
        expandedChapter={expandedChapter}
        onChapterToggle={(chapterId) =>
          setExpandedChapter((prev) => (prev === chapterId ? null : chapterId))
        }
        onJump={jumpToTimestamp}
        iframeRef={videoRef}
      />
    </div>
  );
}

