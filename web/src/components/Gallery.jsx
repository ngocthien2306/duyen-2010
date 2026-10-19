import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { gallery, foodMemories } from '../data';

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const all = [...gallery.map((g) => ({ src: g.src, caption: g.caption })), ...foodMemories.map((f) => ({ src: f.src, caption: `${f.title} · ${f.date}` }))];

  return (
    <section id="gallery" className="bg-gradient-to-b from-cream via-wine-50 to-cream">
      <div className="section">
        <Title eyebrow="Bức tường kỷ niệm" title="Những khoảnh khắc của tụi mình" sub="Kéo thả thử từng tấm ảnh nha, chạm để xem to." />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.figure key={g.src} drag dragSnapToOrigin whileDrag={{ scale: 1.1, zIndex: 30, rotate: 0 }}
              initial={{ opacity: 0, y: 40, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: g.tilt }} whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
              viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
              onTap={() => setOpen(i)}
              className="relative cursor-grab touch-pan-y bg-white p-2.5 pb-10 shadow-xl active:cursor-grabbing sm:p-3 sm:pb-12">
              <img src={g.src} alt={g.caption} loading="lazy" draggable={false} className="aspect-square w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-lg text-wine-700 sm:bottom-3 sm:text-xl">{g.caption}</figcaption>
            </motion.figure>
          ))}
        </div>

        <h3 className="mt-20 text-center font-serif text-2xl font-bold text-wine-900 sm:text-3xl">Nhật ký "ăn là chính" 🍜</h3>
        <p className="mt-2 text-center text-wine-700/80">Vuốt ngang để xem hết nè →</p>
        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {foodMemories.map((f, i) => (
            <button key={f.src} onClick={() => setOpen(gallery.length + i)} className="group w-56 shrink-0 snap-center overflow-hidden rounded-3xl bg-white text-left shadow-lg ring-1 ring-wine-100 sm:w-64">
              <div className="overflow-hidden"><img src={f.src} alt={f.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" /></div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">{f.date}</p>
                <p className="mt-1 font-medium text-wine-900">{f.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-wine-950/90 p-4 backdrop-blur">
            <motion.figure key={open} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <img src={all[open].src} alt={all[open].caption} className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl" />
              <figcaption className="mt-3 text-center font-script text-2xl text-wine-100">{all[open].caption}</figcaption>
              <div className="mt-3 flex justify-center gap-3">
                <button className="btn-ghost" onClick={() => setOpen((open - 1 + all.length) % all.length)}>←</button>
                <button className="btn-ghost" onClick={() => setOpen(null)}>Đóng</button>
                <button className="btn-ghost" onClick={() => setOpen((open + 1) % all.length)}>→</button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
