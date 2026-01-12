import { useRef, useEffect } from "react";
import { SelectedFilters, FilterOption, BnccCode } from "../../types/transversality";
import BnccSingleSelect from "./BnccSingleSelect";

interface BnccStepProps {
  selectedFilters: SelectedFilters;
  bnccTypeOptions: FilterOption[];
  filteredBnccCodes: BnccCode[];
  onFilterSelect: (filterName: keyof SelectedFilters, value: any) => void;
  bnccTypeRef: React.RefObject<HTMLDivElement>;
  codesRef: React.RefObject<HTMLDivElement>;
}

export default function BnccStep({
  selectedFilters,
  bnccTypeOptions,
  filteredBnccCodes,
  onFilterSelect,
  bnccTypeRef,
  codesRef,
}: BnccStepProps) {
  useEffect(() => {
    if (selectedFilters.filterType === "bncc" && selectedFilters.bnccType && bnccTypeRef.current) {
      setTimeout(() => bnccTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    }
  }, [selectedFilters.bnccType, selectedFilters.filterType, bnccTypeRef]);

  return (
    <div className="space-y-6" ref={bnccTypeRef}>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Filtros BNCC
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione o tipo de habilidade e escolha um código BNCC
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Tipo de Habilidade BNCC <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedFilters.bnccType || ""}
            onChange={(e) => onFilterSelect("bnccType", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
          >
            <option value="">Selecione...</option>
            {bnccTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} {option.count ? `(${option.count})` : ""}
              </option>
            ))}
          </select>
        </div>

        {selectedFilters.bnccType && (
          <div className="pt-2" ref={codesRef}>
            <BnccSingleSelect
              label="Código BNCC"
              placeholder="Digite um código… (ex: EM13LP28)"
              options={filteredBnccCodes.map((c) => ({ value: c.value, label: c.label }))}
              value={selectedFilters.bnccCode}
              onChange={(next) => onFilterSelect("bnccCode", next)}
            />

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Escolha apenas 1 código para habilitar a busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

