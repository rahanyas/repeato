import {
  CheckCircle2
} from 'lucide-react'


function ProductPreview() {
  const predictions = [
    { text: "Explain deadlock and the necessary conditions for its occurrence.", subject: "Operating Systems", confidence: 92 },
    { text: "Explain the working of TCP three-way handshake.", subject: "Computer Networks", confidence: 88 },
    { text: "Differentiate between B-Tree and B+ Tree with diagrams.", subject: "DBMS", confidence: 76 },
  ];

  return (
    <section id="product" className="bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            One ranked list. No guesswork.
          </h2>
          <p className="text-stone-400 leading-relaxed mb-6 max-w-md">
            Every prediction comes with the receipts — how many times it's appeared,
            how recently, and how regular the pattern is. You decide how much to trust it.
          </p>
          <ul className="space-y-3 text-sm text-stone-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> Frequency and recency-weighted scoring
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> Every reworded variant, side by side
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" /> Filter by subject, unit, or marks weight
            </li>
          </ul>
        </div>

        <div className="bg-stone-800/60 border border-stone-700 rounded-lg p-2">
          {predictions.map((p, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 ${i !== predictions.length - 1 ? "border-b border-stone-700" : ""}`}
            >
              <span className="font-mono text-lg text-stone-500 w-6 text-center">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wide text-teal-400">{p.subject}</span>
                <p className="text-sm text-stone-100 truncate">{p.text}</p>
              </div>
              <span className="font-mono text-sm font-bold text-amber-400 shrink-0">{p.confidence}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPreview