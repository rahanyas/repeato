import {
  Layers
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="font-mono font-bold text-stone-900 text-xs">R</span>
          </div>
          <span className="text-sm font-medium text-stone-700">Recurra</span>
        </div>
        <p className="text-xs text-stone-400 font-mono flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> built for students who'd rather study than guess
        </p>
      </div>
    </footer>
  );
}

export default Footer