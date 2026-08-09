import { useEffect, useRef, useState } from "react";
import { banners } from "../data/banners.js";

function Highlight({ text, word }) {
  if (!word) return text;
  const parts = text.split(word);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <span className="text-gold">{word}</span>
      {parts[1]}
    </>
  );
}

function SplitCard({ banner }) {
  return (
    <div
      className="flex h-full w-full items-center gap-3 px-4 py-5 sm:px-5"
      style={{ backgroundColor: banner.bg || "#E23744" }}
    >
      <div className="min-w-0 flex-1">
        {banner.label && (
          <p className="mb-2 inline-block rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-maroon-dark">
            {banner.label}
          </p>
        )}
        <p className="text-2xl font-black leading-tight text-white sm:text-3xl">
          {banner.headline}
        </p>
        {banner.subtext && (
          <p className="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
            <Highlight text={banner.subtext} word={banner.highlight} />
          </p>
        )}
      </div>
      {banner.imageSrc && (
        <img
          src={banner.imageSrc}
          alt={banner.imageAlt || ""}
          className="h-28 w-28 shrink-0 rounded-2xl object-cover shadow-lg sm:h-32 sm:w-32"
        />
      )}
    </div>
  );
}

function PhotoCard({ banner }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {banner.imageSrc && (
        <img
          src={banner.imageSrc}
          alt={banner.imageAlt || ""}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-5">
        {banner.label && (
          <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-white/60">
            {banner.label}
          </p>
        )}
        <p className="text-2xl font-black leading-tight text-white sm:text-3xl">
          {banner.headline}
        </p>
        {banner.subtext && (
          <p className="mt-0.5 text-sm font-semibold text-white/80">
            {banner.subtext}
          </p>
        )}
      </div>
    </div>
  );
}

function BoldCard({ banner }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 py-5 text-center"
      style={{ backgroundColor: banner.bg || "#4338CA" }}
    >
      {banner.label && (
        <p className="mb-2 inline-block rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-maroon-dark">
          {banner.label}
        </p>
      )}
      <p className="whitespace-pre-line text-3xl font-black leading-tight text-white sm:text-4xl">
        <Highlight text={banner.headline} word={banner.highlight} />
      </p>
      {banner.subtext && (
        <p className="mt-2 text-sm font-black leading-tight text-white">{banner.subtext}</p>
      )}
    </div>
  );
}

const CARDS = { split: SplitCard, photo: PhotoCard, bold: BoldCard };

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(null);

  // Restart timer after every navigation so manual swipe gets a fresh 4s window
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % banners.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [current]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  }

  function handleTouchMove(e) {
    if (touchStartX.current === null) return;
    setDragX(e.touches[0].clientX - touchStartX.current);
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    setIsDragging(false);
    setDragX(0);
    const threshold = window.innerWidth * 0.25;
    if (dx < -threshold) {
      setCurrent((prev) => (prev + 1) % banners.length);
    } else if (dx > threshold) {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    }
  }

  if (!banners.length) return null;

  const slideWidth = window.innerWidth;
  const trackX = -(current * slideWidth) + dragX;

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(${trackX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
          willChange: isDragging ? "transform" : "auto",
        }}
      >
        {banners.map((banner, index) => {
          const Card = CARDS[banner.variant] || SplitCard;
          return (
            <div key={index} className="h-44 sm:h-52" style={{ width: slideWidth, flexShrink: 0 }}>
              <Card banner={banner} />
            </div>
          );
        })}
      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to banner ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
