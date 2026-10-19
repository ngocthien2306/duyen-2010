import { useEffect, useRef } from 'react';

// Cánh hoa rơi nhẹ phủ toàn trang (canvas, không chặn click)
export default function Petals({ count = 22 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const colors = ['#f6c7d0', '#ee9aab', '#fbe4e8', '#e2657f'];
    const petals = Array.from({ length: count }, () => spawn(true));
    function spawn(initial) {
      return {
        x: Math.random() * w, y: initial ? Math.random() * h : -20,
        r: 6 + Math.random() * 8, vy: 0.4 + Math.random() * 0.9, vx: -0.3 + Math.random() * 0.6,
        a: Math.random() * Math.PI * 2, va: -0.02 + Math.random() * 0.04, sway: Math.random() * 100,
        c: colors[Math.floor(Math.random() * colors.length)],
      };
    }
    const tick = (t) => {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p, i) => {
        p.y += p.vy; p.x += p.vx + Math.sin((t / 1000) + p.sway) * 0.4; p.a += p.va;
        if (p.y > h + 20) petals[i] = spawn(false);
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r, -p.r, p.r * 0.8, p.r * 0.6, 0, p.r);
        ctx.bezierCurveTo(-p.r * 0.8, p.r * 0.6, -p.r, -p.r, 0, -p.r);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-40" aria-hidden />;
}
