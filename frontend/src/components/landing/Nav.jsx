import  { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav({ onGetStarted }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#how", label: "How it works" },
    { href: "#product", label: "Product" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="border-b border-stone-800/10 bg-stone-50/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="font-mono font-bold text-stone-900 text-sm">R</span>
          </div>
          <span className="font-semibold text-stone-900 tracking-tight">Recurra</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-stone-600 font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-stone-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            <Link to='/sign-in'>
            Sign in
            </Link>
          </button>
          <button
            onClick={onGetStarted}
            className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors"
          >
            Get started
          </button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-stone-700"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 sm:px-6 py-4 space-y-4">
          <nav className="flex flex-col gap-3 text-sm text-stone-700 font-medium">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-stone-200">
            <button className="text-sm font-medium text-stone-600 text-left py-1">Sign in</button>
            <button
              onClick={() => {
                setOpen(false);
                onGetStarted?.();
              }}
              className="text-sm font-medium bg-stone-900 text-white px-4 py-2.5 rounded-md"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
