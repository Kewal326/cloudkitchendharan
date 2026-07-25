import { useEffect, useRef } from "react";

const COLORS = ["#E23744","#F59E0B","#22C55E","#60A5FA","#F472B6","#A78BFA","#FFFFFF","#FCD34D"];

function rand(a, b) { return a + Math.random() * (b - a); }

export default function Confetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const particles = [-100, 0, 100].flatMap((offset) =>
      Array.from({ length: 34 }, () => ({
        x: cx + offset + rand(-15, 15),
        y: canvas.height * 0.4,
        w: rand(6, 12), h: rand(3, 6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: rand(-7, 7), vy: rand(-15, -5),
        rot: rand(0, 360), vr: rand(-12, 12),
        opacity: 1,
      }))
    );

    let frame, t0 = null;
    const DURATION = 3200;

    function draw(ts) {
      if (!t0) t0 = ts;
      const t = (ts - t0) / DURATION;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.38; p.vx *= 0.99;
        p.rot += p.vr;
        p.opacity = t > 0.55 ? Math.max(0, 1 - (t - 0.55) / 0.45) : 1;
        if (p.opacity <= 0 || p.y > canvas.height + 20) return;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (t < 1) frame = requestAnimationFrame(draw);
    }

    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[100]" style={{ width: "100%", height: "100%" }} />;
}
