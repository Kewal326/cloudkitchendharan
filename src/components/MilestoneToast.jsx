import { useEffect, useRef } from "react";

const COLORS = ["#FFD700", "#FF4444", "#22C55E", "#3B82F6", "#FF9800", "#E879F9", "#FFFFFF"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function MilestoneToast({ discount, freeLabel, onDismiss }) {
  const pieces = useRef(
    [...Array(28)].map((_, i) => {
      const angle = (i * 360) / 28 + randomBetween(-8, 8);
      const dist = randomBetween(90, 150);
      return {
        color: COLORS[i % COLORS.length],
        tx: Math.cos((angle * Math.PI) / 180) * dist,
        ty: Math.sin((angle * Math.PI) / 180) * dist,
        delay: randomBetween(0, 0.15),
        w: randomBetween(5, 9),
        h: randomBetween(8, 16),
        rot: randomBetween(-720, 720),
      };
    })
  ).current;

  useEffect(() => {
    const t = setTimeout(onDismiss, 2800);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <>
      <style>{`
        @keyframes cfly {
          0%  { opacity: 1; transform: translate(0, 0) rotate(0deg); }
          100%{ opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); }
        }
        @keyframes toast-pop {
          0%  { opacity: 0; transform: scale(0.6); }
          55% { transform: scale(1.08); }
          100%{ opacity: 1; transform: scale(1); }
        }
        @keyframes toast-fade {
          0%  { opacity: 1; }
          100%{ opacity: 0; }
        }
      `}</style>

      {/* Tap-to-dismiss overlay with dim */}
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40"
        onClick={onDismiss}
      >
        <div className="relative flex items-center justify-center">
          {/* Confetti pieces */}
          {pieces.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: p.w,
                height: p.h,
                backgroundColor: p.color,
                borderRadius: 2,
                "--tx": `${p.tx}px`,
                "--ty": `${p.ty}px`,
                "--rot": `${p.rot}deg`,
                animation: `cfly 0.9s ease-out ${p.delay}s forwards`,
              }}
            />
          ))}

          {/* Text only — dark color readable on any background */}
          <div
            style={{
              animation: "toast-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards, toast-fade 0.4s ease-in 2.4s forwards",
            }}
            className="relative text-center"
          >
            {freeLabel ? (
              <>
                <p className="text-4xl font-black text-white">🎁 Free!</p>
                <p className="mt-1 text-lg font-black text-gold">{freeLabel}</p>
                <p className="mt-0.5 text-sm font-semibold text-white/90">added to your order</p>
              </>
            ) : (
              <>
                <p className="text-5xl font-black text-white">Rs.{discount} off!</p>
                <p className="mt-1 text-base font-semibold text-white/90">saved on your order</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
