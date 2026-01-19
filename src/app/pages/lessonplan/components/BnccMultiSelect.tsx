import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { BNCC_SKILLS } from "../data";

type BnccMultiSelectProps = {
  label: string;
  placeholder?: string;
  type: "geral" | "computacao";
  selected: string[];
  onChange: (next: string[]) => void;
};

export default function BnccMultiSelect({
  label,
  placeholder = "Digite um cИdigo ou palavra-chave...",
  type,
  selected,
  onChange,
}: BnccMultiSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = BNCC_SKILLS.filter((s) => s.type === type);

    const filtered = !q
      ? base
      : base.filter(
          (s) =>
            s.code.toLowerCase().includes(q) ||
            s.text.toLowerCase().includes(q)
        );

    // mostra mais itens antes de scrollar
    return filtered.slice(0, 50);
  }, [query, type]);

  const add = (code: string) => {
    if (selected.includes(code)) return;
    onChange([...selected, code]);
    setQuery("");
    setOpen(false);
  };

  const remove = (code: string) => onChange(selected.filter((c) => c !== code));

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
            <div
              className="max-h-64 overflow-y-auto overscroll-contain"
              onWheelCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
            >
              {options.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Nenhum resultado
                </div>
              ) : (
                options.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => add(opt.code)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {opt.code}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {opt.text}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chips selecionados */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map((code) => {
            const item = BNCC_SKILLS.find((s) => s.code === code);
            return (
              <div
                key={code}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B27FF]/10 text-[#8B27FF] border border-[#8B27FF]/20"
              >
                <span className="text-xs font-bold">{code}</span>
                <span className="text-xs hidden sm:inline max-w-[260px] truncate">
                  {item?.text}
                </span>
                <button
                  type="button"
                  onClick={() => remove(code)}
                  className="p-0.5 hover:bg-[#8B27FF]/10 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
