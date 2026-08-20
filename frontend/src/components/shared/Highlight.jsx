

export default function Highlight({ children }) {
  return (
    <mark className="bg-amber-200/60 text-inherit px-0.5 rounded-sm decoration-clone">
      {children}
    </mark>
  );
}
