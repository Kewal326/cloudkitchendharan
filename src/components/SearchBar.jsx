export default function SearchBar({ searchTerm, onSearchChange, onFocus, onBlur }) {
  return (
    <div className="mx-auto max-w-7xl px-3 pb-2 sm:px-5">
      <label className="sr-only" htmlFor="menu-search">
        Search menu
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-maroon/40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          id="menu-search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search paneer, pizza, vrat..."
          className="h-11 w-full rounded-full border border-white/20 bg-white pl-10 pr-4 text-base text-maroon-dark outline-none transition placeholder:text-maroon/45 focus:border-gold focus:ring-4 focus:ring-gold/20"
        />
      </div>
    </div>
  );
}
