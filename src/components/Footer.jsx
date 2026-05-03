import { PRIMARY_PHONE } from "../utils/order.js";

export default function Footer() {
  return (
    <footer className="border-t border-maroon/10 bg-white/45">
      <div className="mx-auto max-w-7xl px-3 py-7 sm:px-5">
        <div className="grid gap-5 text-sm text-stone-700 sm:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-black text-maroon-dark">Cloud Kitchen Dharan</p>
            <p className="mt-1 leading-6">
              Vegetarian food delivery in Dharan from a 100% vegetarian cloud kitchen.
              Order satvik meals, snacks, momos, pizza, sabji, breads, waffles, tea,
              coffee, and shakes.
            </p>
          </div>

          <div>
            <p className="font-black text-maroon-dark">Service</p>
            <ul className="mt-2 space-y-1.5 leading-5">
              <li>Vegetarian food delivery in Dharan</li>
              <li>Pickup available</li>
              <li>No onion, no garlic meals available on request</li>
            </ul>
          </div>

          <div>
            <p className="font-black text-maroon-dark">Hours & Contact</p>
            <ul className="mt-2 space-y-1.5 leading-5">
              <li>Open daily: 8 AM - 9 PM</li>
              <li>
                Phone / WhatsApp:{" "}
                <a className="font-black text-maroon" href={`tel:${PRIMARY_PHONE}`}>
                  {PRIMARY_PHONE}
                </a>
              </li>
              <li>Dharan, Nepal</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
