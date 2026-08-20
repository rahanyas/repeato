import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Highlight from "../shared/Highlight";
import { clusters } from "../../data/mockData";

export default function ClustersView() {
  const [expanded, setExpanded] = useState(1);

  return (
    <div className="space-y-4">
      {clusters.map((c) => {
        const isOpen = expanded === c.id;
        return (
          <div key={c.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : c.id)}
              className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 text-left hover:bg-stone-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-mono uppercase tracking-wide text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5">
                    {c.subject}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">{c.marks} marks</span>
                </div>
                <p className="text-stone-900 font-medium text-sm sm:text-base truncate">{c.canonical}</p>
              </div>
              <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                <div className="text-right hidden xs:block sm:block">
                  <p className="font-mono text-base sm:text-lg font-bold text-stone-900">{c.occurrences}×</p>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">since {2025 - c.occurrences < 2019 ? 2019 : 2025 - c.occurrences}</p>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4 text-stone-400" /> : <ChevronRight className="w-4 h-4 text-stone-400" />}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-stone-200 bg-stone-50 px-4 sm:px-5 py-4 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wide text-stone-500 mb-2">
                  {c.variants.length} phrasings found across papers
                </p>
                {c.variants.map((v, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 bg-white border border-stone-200 rounded-md p-3">
                    <div className="flex items-center justify-between sm:contents">
                      <span className="text-xs font-mono text-stone-400 sm:w-12 shrink-0 sm:pt-0.5">{v.year}</span>
                      <span className="text-xs font-mono text-teal-700 sm:hidden">{Math.round(v.similarity * 100)}%</span>
                    </div>
                    <p className="text-sm text-stone-700 flex-1">
                      {i === 0 ? <Highlight>{v.text}</Highlight> : v.text}
                    </p>
                    <span className="text-xs font-mono text-teal-700 shrink-0 pt-0.5 hidden sm:block">
                      {Math.round(v.similarity * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
