

export default function Stamp({ confidence = 92, size = "md" }) {
  const dims = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24 sm:w-32 sm:h-32",
  }[size];

  const textSize = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl sm:text-3xl",
  }[size];

  const high = confidence >= 80;

  return (
    <div
      className={`${dims} shrink-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed
        ${high ? "border-amber-500 text-amber-700 bg-amber-50/60" : "border-stone-300 text-stone-500"}
        -rotate-6 select-none`}
    >
      <span className={`font-mono font-bold leading-none ${textSize}`}>{confidence}%</span>
      <span className="font-mono text-[8px] sm:text-[9px] tracking-widest mt-1 text-center leading-tight px-1">
        LIKELY
        <br />
        REPEAT
      </span>
    </div>
  );
}