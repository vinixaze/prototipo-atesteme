import { SelectedFilters } from "../../types/transversality";
import { curricularOptions, thematicOptionsByComponent, bnccTypeOptions } from "./constants";

export const getSearchLabel = (filters: SelectedFilters): string => {
  if (filters.filterType === "curricular" && filters.component) {
    const comp = curricularOptions.find((o) => o.value === filters.component)?.label ?? "Busca";
    const them = filters.component && filters.thematic
      ? thematicOptionsByComponent[filters.component]?.find((o) => o.value === filters.thematic)?.label
      : "";
    const yr = filters.year ? ` (${filters.year})` : "";
    return them ? `${comp} - ${them}${yr}` : `${comp}${yr}`;
  }

  if (filters.filterType === "bncc" && filters.bnccType) {
    const typeLabel = bnccTypeOptions.find((o) => o.value === filters.bnccType)?.label ?? "BNCC";
    return filters.bnccCode
      ? `${typeLabel} - ${filters.bnccCode}`
      : typeLabel;
  }

  return "Nova busca";
};

export const isSearchEnabled = (filters: SelectedFilters): boolean => {
  if (filters.filterType === "curricular") {
    return !!(filters.component && filters.thematic && filters.year);
  }
  if (filters.filterType === "bncc") {
    return !!(filters.bnccType && filters.bnccCode);
  }
  return false;
};

export const handleFilterSelect = (
  filterName: keyof SelectedFilters,
  value: any,
  currentFilters: SelectedFilters
): SelectedFilters => {
  const next: SelectedFilters = { ...currentFilters, [filterName]: value };

  if (filterName === 'filterType') {
    return { filterType: value };
  }

  if (filterName === 'component') {
    delete next.thematic;
    delete next.year;
  }
  if (filterName === 'thematic') {
    delete next.year;
  }

  if (filterName === "bnccType") {
    delete next.bnccCode;
  }

  return next;
};

