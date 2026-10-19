import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { api, local } from '../api';

const COMPLIMENTS = [
  'Em xinh nhất hôm nay', 'Cười cái coi 😊', 'Em giỏi quá trời', 'Thương em nhiều', 'Vại tương lơ của anh',
  'Công chúa của anh 👑', 'Em là duyên của anh', 'Ăn nhiều vào nha', 'Hôm nay em tuyệt lắm', 'Anh nhớ em rồi',
  'Mãi bên nhau nha', 'Em là nhà', 'Ngủ ngon, mơ đẹp', 'Không ai bằng em', 'Em đáng được yêu thương',
];
const HUES = ['#e2657f', '#ee9aab', '#f6c7d0', '#d13d5e', '#f3d9a4', '#c084fc', '#fda4af'];

export default function Garden({ initialCount = 0 }) {
  const [flowers, setFlowers] = useState(() => local.get('garden', []));
  const [total, setTotal] = useState(initialCount);
  const [toast, setToast] = useState(null);
  const box = useRef(null);
  const toastTimer = useRef();

  useEffect(() => setTotal((t) => Math.max(t, initialCount)), [initialCount]);
  useEffect(() => local.set('garden', flowers.slice(-60)), [flowers]);

  const plant = (e) => {
    const rect = box.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = Math.max(35, ((e.clientY - rect.top) / rect.height) * 100);
    const f = { id: Date.now(), x, y, hue: HUES[Math.floor(Math.random() * HUES.length)], size: 0.7 + Math.random() * 0.6, petals: 5 + Math.floor(Math.random() * 4) };
    setFlowers((fs) => [...fs, f].slice(-60));
    setTotal((t) => t + 1);
    setToast({ text: COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)], x, y });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1600);
    api.flower().catch(() => {});
  };

  return (
    <section id="garden" className="section">
      <Title eyebrow="Vườn hoa của em" title="Chạm để trồng một bông hoa" sub="Mỗi bông hoa là một lời anh muốn nói. Trồng thật nhiều vào nha!" />
      <div ref={box} onPointerDown={plant}
        className="relative h-[26rem] cursor-pointer select-none overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-100 via-wine-50 to-[#cfe8c4] shadow-inner ring-1 ring-wine-100 touch-manipulation">
        <div className="absolute right-8 top-6 h-16 w-16 rounded-full bg-gold-300 shadow-[0_0_60px_20px_rgba(243,217,164,0.8)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#9cc98a] to-transparent" />
        {flowers.length === 0 && <p className="absolute inset-0 flex items-center justify-center font-script text-3xl text-wine-400">chạm vào đây nè 🌱</p>}
        {flowers.map((f) => <Bloom key={f.id} {...f} />)}
        <AnimatePresence>
          {toast && (
            <motion.div key={toast.text + toast.x} initial={{ opacity: 0, y: 0, scale: 0.6 }} animate={{ opacity: 1, y: -70, scale: 1 }} exit={{ opacity: 0 }}
              className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 font-medium text-wine-700 shadow-lg"
              style={{ left: `${Math.min(80, Math.max(20, toast.x))}%`, top: `${toast.y}%` }}>
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute bottom-3 left-4 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-wine-700 shadow">🌷 {total} bông hoa đã nở</div>
      </div>
    </section>
  );
}

function Bloom({ x, y, hue, size, petals }) {
  return (
    <div className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-100%)' }}>
      <svg width={60 * size} height={100 * size} viewBox="0 0 60 100" overflow="visible">
        <motion.path d="M30 100 Q 26 70 30 40" stroke="#4f7a4a" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
        <motion.ellipse cx="22" cy="72" rx="9" ry="4" fill="#6d9b5f" transform="rotate(-30 22 72)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} style={{ transformOrigin: '30px 75px' }} />
        <motion.g initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 9 }} style={{ transformOrigin: '30px 32px' }}>
          {Array.from({ length: petals }).map((_, i) => (
            <ellipse key={i} cx="30" cy="20" rx="8" ry="13" fill={hue} opacity="0.92" transform={`rotate(${(360 / petals) * i} 30 32)`} />
          ))}
          <circle cx="30" cy="32" r="6" fill="#f3d9a4" />
        </motion.g>
      </svg>
    </div>
  );
}
