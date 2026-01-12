import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { BnccSingleSelectProps } from "../../types/transversality";

export default function BnccSingleSelect({
  label,
  placeholder = "Digite um código…",
  options,
  value,
  onChange,
}: BnccSingleSelectProps) {
  const [query, setQuery] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value ?? "");
  }, [value]);

  const filtered = useMemo<{ value: string; label: string }[]>(() => {
    const q = query.trim().toLowerCase();
    const base = options;

    if (!q) return base.slice(0, 80);

    return base
      .filter(
        (o) =>
          o.value.toLowerCase().includes(q) ||
          o.label.toLowerCase().includes(q)
      )
      .slice(0, 80);
  }, [query, options]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (code: string) => {
    onChange(code);
    setOpen(false);
  };

  const clear = () => {
    onChange(undefined);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label} <span className="text-red-500">*</span>
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
          className="w-full pl-11 pr-10 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {(query || value) && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center"
            aria-label="Limpar"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
            <div
              className="max-h-64 overflow-y-auto overscroll-contain"
              onWheelCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Nenhum resultado
                </div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pick(opt.value)}
                    className={`w-full text-left px-4 py-3 transition-colors ${value === opt.value
                      ? "bg-[#8B27FF]/10"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <div className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {opt.label}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {value && (
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B27FF]/10 text-[#8B27FF] border border-[#8B27FF]/20">
            <span className="text-xs font-bold font-mono">{value}</span>
            <button
              type="button"
              onClick={clear}
              className="p-0.5 hover:bg-[#8B27FF]/10 rounded-full"
              aria-label="Remover"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

