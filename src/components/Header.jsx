import { PRIMARY_PHONE } from "../utils/order.js";

export default function Header() {
  return (
    <header className="bg-brand">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img
            src="/images/brand/cloud-kitchen-logo.png"
            alt="Cloud Kitchen Dharan logo"
            className="h-10 w-10 shrink-0 rounded-full border border-white/20 bg-white object-cover shadow-sm"
            width="40"
            height="40"
          />
          <div className="min-w-0">
            <p className="truncate text-xl font-black tracking-normal text-white sm:text-2xl">
              Cloud Kitchen
            </p>
            <p className="flex items-center gap-1 text-[11px] font-black text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              100% Veg · Dharan
            </p>
          </div>
        </div>
        <a
          href={`tel:${PRIMARY_PHONE}`}
          className="shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm font-black text-white transition hover:bg-white/20 sm:px-4"
        >
          {PRIMARY_PHONE}
        </a>
      </div>
    </header>
  );
}
