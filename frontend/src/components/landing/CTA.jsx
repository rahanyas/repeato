import { FileText, ArrowRight } from "lucide-react";

export default function CTA({ onGetStarted }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <FileText className="w-8 h-8 text-stone-300 mx-auto mb-6" strokeWidth={1.5} />
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
        Got a stack of old papers sitting in a drive folder?
      </h2>
      <p className="text-stone-600 mb-8 max-w-md mx-auto">
        That's all it takes to get started. Upload them and see your first predictions in minutes.
      </p>
      <button
        onClick={onGetStarted}
        className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-md font-medium hover:bg-stone-800 transition-colors w-full sm:w-auto"
      >
        Upload your first paper <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}
