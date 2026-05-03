import { PRIMARY_PHONE } from "../utils/order.js";

export default function Header() {
  return (
    <header className="border-b border-maroon/10 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img
            src="/images/brand/cloud-kitchen-logo.png"
            alt="Cloud Kitchen Dharan logo"
            className="h-10 w-10 shrink-0 rounded-full border border-maroon/10 bg-white object-cover shadow-sm"
            width="40"
            height="40"
          />
          <div className="min-w-0">
            <p className="truncate text-xl font-black tracking-normal text-maroon sm:text-2xl">
              Cloud Kitchen
            </p>
            <p className="mt-0.5 min-w-0 truncate text-[10px] font-black uppercase leading-none tracking-normal text-green-700 sm:text-[11px]">
              <span className="truncate">Veg Food Delivery Dharan</span>
            </p>
          </div>
        </div>
        <a
          href={`tel:${PRIMARY_PHONE}`}
          className="shrink-0 rounded-full border border-maroon/20 bg-white px-3 py-2 text-sm font-black text-maroon-dark shadow-sm transition hover:border-gold hover:bg-amber-50 sm:px-4"
        >
          {PRIMARY_PHONE}
        </a>
      </div>
    </header>
  );
}
