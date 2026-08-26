import { UploadCloud, ScanSearch, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: UploadCloud,
    title: "Upload past papers",
    body: "Drop in PDFs or scanned copies from as many years as you have. Repeato reads and splits each one into individual questions automatically.",
  },
  {
    n: "02",
    icon: ScanSearch,
    title: "Questions get matched",
    body: "Same question asked five different ways is still the same question. Repeato groups reworded variants into a single cluster and tracks it across years.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Get a ranked prediction",
    body: "Each cluster is scored on frequency, recency, and how regularly it repeats — so you know exactly what's worth studying first.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">How it works</h2>
      <p className="text-stone-600 mb-10 sm:mb-12 max-w-lg">
        Three steps, from a stack of old papers to a ranked study list.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {steps.map((s) => (
          <div key={s.n} className="relative">
            <span className="font-mono text-4xl sm:text-5xl font-bold text-stone-200 block mb-4">{s.n}</span>
            <s.icon className="w-5 h-5 text-teal-700 mb-3" strokeWidth={1.75} />
            <h3 className="font-semibold text-stone-900 mb-2">{s.title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
