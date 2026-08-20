

const items = [
  { value: "142", label: "papers analyzed" },
  { value: "3,081", label: "questions indexed" },
  { value: "612", label: "clusters found" },
  { value: "89%", label: "prediction accuracy*" },
];

export default function StatBar() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.label}>
            <p className="text-xl sm:text-2xl font-bold font-mono text-stone-900">{i.value}</p>
            <p className="text-xs text-stone-500 mt-1">{i.label}</p>
          </div>
        ))}
      </div>
      <p className="max-w-6xl mx-auto px-4 sm:px-6 pb-4 text-[11px] text-stone-400">
        *measured against reappearance in the following year's paper, across pilot subjects
      </p>
    </section>
  );
}
