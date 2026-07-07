export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(0,127,255,0.08)] bg-white/80 backdrop-blur-[12px]">
      <div className="container flex h-[72px] items-center justify-between max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-3 max-sm:py-4">
        <a
          href="/"
          aria-label="홈으로 이동"
          className="text-text inline-flex items-center gap-3 font-extrabold tracking-[-0.02em]"
        >
          <span className="from-brand flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br to-[#59afff] text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(0,127,255,0.22)]">
            A
          </span>
          <span>Azure Notes</span>
        </a>

        <nav className="flex gap-5">
          <a
            href="/"
            className="text-muted hover:text-brand font-semibold transition-colors"
          >
            Home
          </a>
          <a
            href="/blog"
            className="text-muted hover:text-brand font-semibold transition-colors"
          >
            Blog
          </a>
          <a
            href="/notes"
            className="text-muted hover:text-brand font-semibold transition-colors"
          >
            Notes
          </a>
          <a
            href="/about"
            className="text-muted hover:text-brand font-semibold transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
