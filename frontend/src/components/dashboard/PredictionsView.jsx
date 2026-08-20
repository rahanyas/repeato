import { Filter, Clock } from "lucide-react";
import ConfidenceBar from "../shared/ConfidenceBar";
import { predictions } from "../../data/mockData";

export default function PredictionsView() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-2">
        <Filter className="w-3.5 h-3.5 shrink-0" />
        Ranked by likelihood of reappearing next exam
      </div>
      {predictions.map((p, idx) => (
        <div key={p.id} className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-5">
          <span className="font-mono text-lg sm:text-2xl text-stone-300 w-6 sm:w-8 shrink-0 text-center">{idx + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wide text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5">
                {p.subject}
              </span>
              <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {p.gapPattern}
              </span>
            </div>
            <p className="text-stone-900 font-medium text-sm sm:text-base mb-2">{p.text}</p>
            <ConfidenceBar value={p.confidence} />
          </div>
          <div className="text-right shrink-0 w-12 sm:w-16">
            <p className="font-mono text-base sm:text-xl font-bold text-stone-900">{p.confidence}%</p>
            <p className="text-[10px] sm:text-[11px] text-stone-500">{p.occurrences}× seen</p>
          </div>
        </div>
      ))}
    </div>
  );
}
