import Stamp from "./Stamp.comp";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 mb-6">
          Built from 7 years of past papers
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-[1.1] tracking-tight">
          Every exam repeats itself.
          <br />
          <span className="text-stone-400">We show you how.</span>
        </h1>
        <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-md">
          Upload past question papers and Recurra finds every question that keeps
          coming back — reworded, reordered, but never really new — and tells you
          which ones are due again this year.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <button className="flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-md font-medium hover:bg-stone-800 transition-colors">
            Upload your first paper <ArrowRight className="w-4 h-4" />
          </button>
          <button className="text-stone-600 font-medium hover:text-stone-900 transition-colors px-2">
            See a live example
          </button>
        </div>
        <p className="mt-6 text-xs font-mono text-stone-400">No sign-up needed to try it. PDF or scanned images.</p>
      </div>

      {/* Hero visual: a mock exam question card with the stamp overlaid, as if graded */}
      <div className="relative">
        <div className="bg-white border border-stone-200 rounded-lg shadow-sm p-6 rotate-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wide text-teal-700 bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5">
              Operating Systems
            </span>
            <span className="text-[11px] font-mono text-stone-400">10 marks</span>
          </div>
          <p className="text-stone-900 font-medium leading-relaxed">
            Explain deadlock and the necessary conditions for its occurrence.
          </p>
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            {[2019, 2021, 2023, 2025].map((y) => (
              <div key={y} className="flex items-center gap-3 text-xs">
                <span className="font-mono text-stone-400 w-10">{y}</span>
                <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-teal-600/70" style={{ width: `${70 + y % 20}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-8 -right-6">
          <Stamp confidence={92} />
        </div>
      </div>
    </section>
  );
}

export default Hero;