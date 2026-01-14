import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './components/ContentHeader';
import CategoryTabs from './components/CategoryTabs';
import ContentFilters from './components/ContentFilters';
import ContentGrid from './components/ContentGrid';
import EmptyState from './components/EmptyState';
import { contentCategories, contentItems } from './data';

interface ContentsPageProps {
  navigateTo: (page: string) => void;
  filterData?: {
    category?: string;
  };
  userRole?: 'admin' | 'user';
}

export default function ContentsPage({ navigateTo, filterData, userRole }: ContentsPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('INFORMAÇÕES E DADOS');
  const [selectedCompetency, setSelectedCompetency] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const availableCompetencies = useMemo(() => {
    return Array.from(
      new Set(
        contentItems
          .filter((content) => content.category === selectedCategory)
          .map((content) => content.competency)
      )
    );
  }, [selectedCategory]);

  const filteredContents = contentItems.filter((content) => {
    const matchesCategory = content.category === selectedCategory;
    const matchesCompetency = !selectedCompetency || content.competency === selectedCompetency;
    const matchesLevel = content.level === parseInt(selectedLevel, 10);
    return matchesCategory && matchesCompetency && matchesLevel;
  });

  const currentCategory = contentCategories.find((category) => category.name === selectedCategory);

  useEffect(() => {
    if (filterData) {
      setSelectedCategory(filterData.category || 'INFORMAÇÕES E DADOS');
      setSelectedCompetency('');
      setSelectedLevel('');
    }
  }, [filterData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage="conteudos"
        onNavigate={(page) => {
          setSidebarOpen(false);
          navigateTo(page);
        }}
        isAdmin={userRole === 'admin'}
      />
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        userName="Usuário"
        navigateTo={navigateTo}
        onLogout={() => navigateTo('login')}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <ContentHeader
          title="Espaço de Aprendizagem"
          subtitle="Conteúdo para você estudar"
          highlight="Explore materiais organizados por competências e níveis"
        />

        <CategoryTabs
          categories={contentCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setSelectedCompetency('');
          }}
        />

        <ContentFilters
          selectedCompetency={selectedCompetency}
          selectedLevel={selectedLevel}
          availableCompetencies={availableCompetencies}
          onCompetencyChange={setSelectedCompetency}
          onLevelChange={setSelectedLevel}
        />

        <ContentGrid contents={filteredContents} currentCategory={currentCategory} />

        {filteredContents.length === 0 && <EmptyState currentCategory={currentCategory} />}
      </div>
    </div>
  );
}
