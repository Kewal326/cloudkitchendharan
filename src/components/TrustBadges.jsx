export default function TrustBadges() {
  return (
    <div className="border-b border-maroon/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-3 py-2.5 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          100% Veg
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
          🙏 Satvik on request
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
          🌙 Vrat menu available
        </span>
      </div>
    </div>
  );
}
