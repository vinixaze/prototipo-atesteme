export interface DashboardPageProps {
  userName: string;
  navigateTo: (page: string, data?: any) => void;
  userRole?: 'admin' | 'user';
  onLogout?: () => void;
  activeModule?: 'atesteme' | 'prosaeb';
  onModuleChange?: (module: 'atesteme' | 'prosaeb') => void;
}

export interface ModuleColors {
  primary: string;
  button: string;
  icon: string;
  textGradient: string;
}

export interface ProgressDataItem {
  category: string;
  percentage: number;
  color: string;
}

export interface Category {
  name: string;
  fullName: string;
  color: string;
}

export interface RankingSlide {
  title: string;
  icon: any;
  position: string;
  total: string;
  color: string;
}

export interface RecommendedCompetency {
  category: string;
  title: string;
  icon: any;
  color: string;
  status?: string;
  isInProgress?: boolean;
}

