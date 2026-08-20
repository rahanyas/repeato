
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { uploadQueue } from "../../data/mockData";

export default function UploadView() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-white hover:border-teal-500 transition-colors cursor-pointer">
        <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 mb-3" strokeWidth={1.5} />
        <p className="text-stone-700 font-medium">Drop question papers here</p>
        <p className="text-xs text-stone-500 mt-1 font-mono">PDF · scanned images also supported</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">
        {uploadQueue.map((f) => (
          <div key={f.name} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="text-sm text-stone-700 font-mono truncate">{f.name}</span>
            </div>
            {f.status === "done" ? (
              <span className="flex items-center gap-1.5 text-xs font-mono text-teal-700 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" /> <span className="hidden xs:inline">parsed</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-mono text-amber-600 shrink-0">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden xs:inline">extracting questions…</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
