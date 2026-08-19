function Stamp({ confidence = 92, size = "lg" }) {
  const dims = size === "lg" ? "w-32 h-32" : "w-20 h-20";
  const textSize = size === "lg" ? "text-3xl" : "text-xl";
  return (
    <div
      className={`${dims} shrink-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-amber-500 text-amber-700 -rotate-6 select-none bg-amber-50/60`}
    >
      <span className={`font-mono font-bold leading-none ${textSize}`}>{confidence}%</span>
      <span className="font-mono text-[9px] tracking-widest mt-1.5 text-center leading-tight px-1">
        LIKELY
        <br />
        REPEAT
      </span>
    </div>
  );
}

export default Stamp