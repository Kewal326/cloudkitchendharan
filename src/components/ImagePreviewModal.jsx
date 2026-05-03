import { menuImageAlt } from "../utils/seo.js";

export default function ImagePreviewModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close image preview"
        onClick={onClose}
        className="absolute inset-0 bg-maroon-dark/55"
      />
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-soft">
        <img
          src={item.image}
          alt={menuImageAlt(item)}
          className="aspect-square w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/menu/placeholder.jpg";
          }}
        />
        <div className="p-4">
          <p className="text-lg font-black text-maroon-dark">{item.name}</p>
          <p className="mt-1 text-sm text-stone-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
