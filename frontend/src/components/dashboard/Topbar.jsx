import { Search, Menu } from "lucide-react";

export default function Topbar({ tab, activeSubject, onMenuClick }) {
  return (
    <header className="bg-white border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button className="lg:hidden text-stone-600 p-1 -ml-1 shrink-0" onClick={onMenuClick} aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-stone-900 capitalize truncate">{tab}</h1>
          <p className="text-xs text-stone-500 font-mono truncate">{activeSubject}</p>
        </div>
      </div>
      <div className="relative hidden sm:block">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          placeholder="Search questions…"
          className="pl-9 pr-4 py-2 text-sm rounded-md border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent w-48 md:w-64"
        />
      </div>
      <button className="sm:hidden text-stone-500 p-1" aria-label="Search">
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
}
