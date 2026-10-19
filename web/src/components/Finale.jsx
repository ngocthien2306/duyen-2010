import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { couple, photos } from '../data';

export default function Finale() {
  const canvas = useRef(null);
  const [launching, setLaunching] = useState(false);
  const fire = useRef(() => {});

  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext('2d');
    let raf; let parts = [];
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const colors = ['#f6c7d0', '#e2657f', '#f3d9a4', '#ffffff', '#fda4af', '#c4b5fd'];
    fire.current = (x = Math.random() * c.width, y = c.height * (0.15 + Math.random() * 0.35)) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const heart = Math.random() > 0.5;
      for (let i = 0; i < 90; i++) {
        const t = (i / 90) * Math.PI * 2;
        // Nửa số pháo nổ hình trái tim
        const vx = heart ? 16 * Math.sin(t) ** 3 : Math.cos(t) * (2 + Math.random() * 4) * 4;
        const vy = heart ? -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) : Math.sin(t) * (2 + Math.random() * 4) * 4;
        parts.push({ x, y, vx: vx * 0.22, vy: vy * 0.22, life: 1, color });
      }
    };
    const tick = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.globalCompositeOperation = 'lighter';
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.vx *= 0.985; p.vy *= 0.985; p.life -= 0.012;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    if (!launching) return;
    const id = setInterval(() => fire.current(), 450);
    const stop = setTimeout(() => setLaunching(false), 8000);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [launching]);

  return (
    <section id="finale" className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#4a0f22_0%,#12030a_70%)] text-white"
      onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); fire.current(e.clientX - r.left, e.clientY - r.top); }}>
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="section relative flex min-h-[100svh] flex-col items-center justify-center text-center">
        <motion.img src={photos.finale} alt="" initial={{ opacity: 0, scale: 0.8, rotate: -6 }} whileInView={{ opacity: 1, scale: 1, rotate: -3 }} viewport={{ once: true }}
          className="w-44 rounded-sm bg-white p-2 pb-8 shadow-2xl sm:w-56" />
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-10 font-serif text-4xl font-bold leading-tight sm:text-6xl">
          Chúc mừng 20/10,<br /><span className="text-shine">{couple.her}</span> 💐
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-6 max-w-lg text-lg text-wine-100">
          Cảm ơn em đã là một phần đẹp nhất trong cuộc đời anh. Hôm nay và mọi ngày về sau, anh vẫn sẽ chọn em.
        </motion.p>
        <button onClick={(e) => { e.stopPropagation(); setLaunching(true); }} className="btn-primary mt-10 text-lg">Bắn pháo hoa 🎆</button>
        <p className="mt-4 text-sm text-wine-300">hoặc chạm vào bầu trời</p>
        <p className="absolute bottom-6 text-xs text-wine-300/70">Made with ❤ by {couple.me} · 20/10/2026</p>
      </div>
    </section>
  );
}
