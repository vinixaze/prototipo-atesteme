import type { NavigateTo, PageId } from "../../../lib/navigation/routes";

export interface TransversalityPageProps {
  navigateTo: NavigateTo;
  currentPage?: PageId;
  userName?: string;
  onLogout?: () => void;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SelectedFilters {
  filterType: '' | 'curricular' | 'bncc';
  component?: string;
  thematic?: string;
  year?: string;
  bnccType?: 'geral' | 'computacao';
  bnccCode?: string;
}

export interface BnccCode {
  value: string;
  label: string;
  bnccType: "geral" | "computacao";
  component?: string;
}

export interface HistoryItem {
  date: Date;
  filters: SelectedFilters;
  label: string;
}

export interface BnccSingleSelectProps {
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (next?: string) => void;
}

