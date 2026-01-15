import { useState } from 'react';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import ExamCtaCards from './components/ExamCtaCards';
import ExamPageHeader from './components/ExamPageHeader';
import ExamStatsCards from './components/ExamStatsCards';
import ExamFilters from './components/ExamFilters';
import ExamList from './components/ExamList';
import ExamDetailsModal from './components/ExamDetailsModal';
import { exams } from './data/exams';
import { examDetails } from './data/examDetails';

interface ExamsPageProps {
  navigateTo: (page: string) => void;
  userRole?: 'admin' | 'user';
}

export default function ExamsPage({ navigateTo, userRole }: ExamsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Aprovado' | 'Reprovado' | 'Pendente'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [hoveredPendingId, setHoveredPendingId] = useState<string | null>(null);
  const [hoveredDownloadId, setHoveredDownloadId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  const filteredExams = exams.filter((exam) => {
    const matchesFilter = filterStatus === 'all' || exam.status === filterStatus;
    const matchesSearch =
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: exams.length,
    aprovados: exams.filter((exam) => exam.status === 'Aprovado').length,
    reprovados: exams.filter((exam) => exam.status === 'Reprovado').length,
    pendentes: exams.filter((exam) => exam.status === 'Pendente').length,
  };

  const selectedExam = selectedExamId ? exams.find((exam) => exam.id === selectedExamId) : null;
  const selectedDetails = selectedExamId ? examDetails[selectedExamId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        userName="AndrÇ¸"
        navigateTo={navigateTo}
        onLogout={() => navigateTo('login')}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="exames"
        onNavigate={(page) => {
          setIsSidebarOpen(false);
          navigateTo(page);
        }}
        isAdmin={userRole === 'admin'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <ExamCtaCards />
        <ExamPageHeader />
        <ExamStatsCards stats={stats} />

        <ExamFilters
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          showFilterDropdown={showFilterDropdown}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onToggleDropdown={() => setShowFilterDropdown((prev) => !prev)}
        />

        <ExamList
          exams={filteredExams}
          hoveredPendingId={hoveredPendingId}
          hoveredDownloadId={hoveredDownloadId}
          onViewExam={setSelectedExamId}
          onDownloadExam={() => {}}
          onSetHoveredPendingId={setHoveredPendingId}
          onSetHoveredDownloadId={setHoveredDownloadId}
        />
      </div>

      {selectedExam && selectedDetails && (
        <ExamDetailsModal
          exam={selectedExam}
          details={selectedDetails}
          isOpen={Boolean(selectedExamId)}
          onClose={() => setSelectedExamId(null)}
        />
      )}
    </div>
  );
}

