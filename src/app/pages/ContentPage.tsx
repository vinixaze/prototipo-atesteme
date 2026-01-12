import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ContentCard from '../components/content/ContentCard';
import ContentEmptyState from '../components/content/ContentEmptyState';
import { contentCategories, contentItems } from '../data/contentData';

interface ContentPageProps {
  navigateTo: (page: string) => void;
  filterData?: {
    category?: string;
  };
  userRole?: 'admin' | 'user';
}

export default function ContentPage({ navigateTo, filterData, userRole }: ContentPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('INFORMAÇÕES E DADOS');
  const [selectedCompetency, setSelectedCompetency] = useState(''); // vazio
  const [selectedLevel, setSelectedLevel] = useState(''); // vazio



  const categories = contentCategories;

  // Obter competências únicas da categoria selecionada
  const availableCompetencies = Array.from(
    new Set(
      contentItems
        .filter(content => content.category === selectedCategory)
        .map(content => content.competency)
    )
  );



  // Filtrar conteúdos
  const filteredContents = contentItems.filter(content => {
    const matchesCategory = content.category === selectedCategory;
    const matchesCompetency = !selectedCompetency || content.competency === selectedCompetency;
    const matchesLevel = content.level === parseInt(selectedLevel);
    return matchesCategory && matchesCompetency && matchesLevel;
  });

  const currentCategory = categories.find(cat => cat.name === selectedCategory);

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
      <Header onMenuClick={() => setSidebarOpen(true)} userName="Usuário" navigateTo={navigateTo} onLogout={() => navigateTo('login')} />

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header Título Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Espaço de Aprendizagem
          </h1>
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-4">
            Conteúdo para você estudar
          </h2>
          <div className="bg-gradient-to-r from-[#8B27FF]/10 to-[#A855F7]/10 dark:from-[#8B27FF]/20 dark:to-[#A855F7]/20 rounded-xl px-6 py-3 inline-block">
            <p className="text-lg font-semibold text-[#8B27FF] dark:text-[#A855F7]">
              Explore materiais organizados por competências e níveis
            </p>
          </div>
        </motion.div>

        {/* Tabs de Categorias - Design Moderno */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-2 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;

              return (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedCompetency('');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 min-w-[120px] md:min-w-[160px] 
                    flex flex-col md:flex-row 
                    items-center justify-center 
                    gap-1 md:gap-2 
                    px-3 py-3 rounded-xl 
                    transition-all font-semibold text-sm
                    ${isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  style={{
                    backgroundColor: isActive ? category.color : 'transparent',
                  }}
                >
                  {/* Ícone */}
                  <Icon className="w-5 h-5 md:w-4 md:h-4" />

                  {/* Texto */}
                  <span className="text-[11px] leading-tight text-center md:text-sm">
                    {category.name}
                  </span>
                </motion.button>

              );
            })}
          </div>
        </motion.div>

        {/* Filtros Compactos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

              {/* Texto que aparece no "botão" */}
              <span className="absolute left-10 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
                {selectedCompetency ? selectedCompetency : 'Competências'}
              </span>

              <select
                value={selectedCompetency}
                onChange={(e) => setSelectedCompetency(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer
                 text-transparent"
              >
                <option value="" disabled hidden>
                  Competências
                </option>

                {availableCompetencies.map((competency) => (
                  <option key={competency} value={competency} className="text-gray-900">
                    {competency}
                  </option>
                ))}
              </select>
            </div>
          </div>



          <div className="w-full md:w-48">
            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

              {/* Texto do "botão" */}
              <span className="absolute left-4 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
                {selectedLevel ? `Nível ${selectedLevel}` : 'Níveis'}
              </span>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer
                 text-transparent"
              >
                <option value="" disabled hidden>
                  Níveis
                </option>

                <option value="1" className="text-gray-900">Nível 1</option>
                <option value="2" className="text-gray-900">Nível 2</option>
                <option value="3" className="text-gray-900">Nível 3</option>
                <option value="4" className="text-gray-900">Nível 4</option>
                <option value="5" className="text-gray-900">Nível 5</option>
              </select>
            </div>
          </div>


        </motion.div>

        {/* Lista de conteúdos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content, index) => (
            <ContentCard
              key={content.id}
              content={content}
              category={currentCategory}
              index={index}
            />
          ))}
        </div>

        {filteredContents.length === 0 && (
          <ContentEmptyState category={currentCategory} />
        )}
      </div>
    </div>
  );
}
