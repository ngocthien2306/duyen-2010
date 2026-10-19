import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { reasons } from '../data';

const COLORS = ['from-wine-400 to-wine-600', 'from-gold-400 to-wine-400', 'from-wine-500 to-wine-800', 'from-wine-300 to-wine-500'];

export default function Reasons() {
  const [i, setI] = useState(0);
  const visible = reasons.slice(i, i + 3);
  const finished = i >= reasons.length;

  return (
    <section id="reasons" className="overflow-hidden bg-wine-950 text-white">
      <div className="section">
        <div className="mb-12 text-center">
          <p className="font-script text-3xl text-gold-300">{reasons.length} lý do</p>
          <h2 className="mt-1 font-serif text-3xl font-bold sm:text-5xl">Vì sao anh thương em?</h2>
          <p className="mt-4 text-wine-200">Vuốt thẻ sang trái/phải để đọc lý do tiếp theo</p>
        </div>
        <div className="relative mx-auto h-[22rem] w-full max-w-xs">
          <AnimatePresence>
            {visible.map((r, k) => {
              const idx = i + k;
              const top = k === 0;
              return (
                <motion.div key={idx}
                  className={`absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-br ${COLORS[idx % COLORS.length]} p-8 text-center shadow-2xl ring-1 ring-white/20 ${top ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  style={{ zIndex: 10 - k }}
                  initial={{ scale: 0.9, y: 30, opacity: 0 }}
                  animate={{ scale: 1 - k * 0.05, y: k * 16, opacity: 1, rotate: k * 2 }}
                  exit={{ x: 400, rotate: 25, opacity: 0, transition: { duration: 0.35 } }}
                  drag={top ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90) setI(i + 1); }}
                  onTap={() => top && setI(i + 1)}>
                  <span className="text-6xl">{r.emoji}</span>
                  <p className="mt-6 font-serif text-xl leading-relaxed sm:text-2xl">{r.text}</p>
                  <p className="absolute bottom-5 text-xs tracking-[0.3em] text-white/70">#{idx + 1} / {reasons.length}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {finished && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="font-script text-4xl text-gold-300">...và hàng triệu lý do nữa</p>
              <p className="mt-3 text-wine-200">mà một trang web không chứa hết được 🥹</p>
              <button onClick={() => setI(0)} className="btn mt-6 bg-white/10 ring-1 ring-white/30">Đọc lại từ đầu</button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
