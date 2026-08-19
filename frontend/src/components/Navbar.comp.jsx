function Nav() {
  return (
    <header className="border-b border-stone-800/10 bg-stone-50/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
            <span className="font-mono font-bold text-stone-900 text-sm">R</span>
          </div>
          <span className="font-semibold text-stone-900 tracking-tight">Recurra</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-stone-600 font-medium">
          <a href="#how" className="hover:text-stone-900 transition-colors">How it works</a>
          <a href="#product" className="hover:text-stone-900 transition-colors">Product</a>
          <a href="#faq" className="hover:text-stone-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            Sign in
          </button>
          <button className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav