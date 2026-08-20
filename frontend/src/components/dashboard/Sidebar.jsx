import { LayoutGrid, Layers, TrendingUp, UploadCloud, X } from "lucide-react";
import { subjects } from "../../data/mockData";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "clusters", label: "Clusters", icon: Layers },
  { id: "predictions", label: "Predictions", icon: TrendingUp },
  { id: "upload", label: "Upload", icon: UploadCloud },
];

export default function Sidebar({ tab, setTab, activeSubject, setActiveSubject, open, onClose, onExit }) {
  const content = (
    <>
      <div className="px-5 py-6 border-b border-stone-800 flex items-center justify-between">
        <div>
          <button
            onClick={onExit}
            className="flex items-center gap-2"
            aria-label="Back to homepage"
          >
            <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="font-mono font-bold text-stone-900 text-sm">R</span>
            </div>
            <span className="font-semibold text-white tracking-tight">Recurra</span>
          </button>
          <p className="text-[11px] font-mono text-stone-500 mt-2">question repetition engine</p>
        </div>
        <button className="lg:hidden text-stone-400 p-1" onClick={onClose} aria-label="Close menu">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              setTab(n.id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 lg:py-2 rounded-md text-sm transition-colors
              ${tab === n.id ? "bg-stone-800 text-white" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"}`}
          >
            <n.icon className="w-4 h-4" strokeWidth={1.75} />
            {n.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-stone-800">
        <p className="text-[11px] font-mono text-stone-500 px-3 mb-2">Subject</p>
        {["All subjects", ...subjects].map((s) => (
          <button
            key={s}
            onClick={() => setActiveSubject(s)}
            className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-mono truncate
              ${activeSubject === s ? "text-amber-400" : "text-stone-500 hover:text-stone-300"}`}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-stone-900 text-stone-300 flex-col">
        {content}
      </aside>

      {/* Mobile off-canvas drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-64 max-w-[80%] bg-stone-900 text-stone-300 flex flex-col h-full">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
