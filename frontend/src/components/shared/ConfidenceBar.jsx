

export default function ConfidenceBar({ value }) {
  const color = value >= 80 ? "bg-amber-500" : value >= 60 ? "bg-teal-600" : "bg-stone-400";
  return (
    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
      <div className={`h-full ${color} transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}
