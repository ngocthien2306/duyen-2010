import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { gallery } from '../data';

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const all = gallery;
  const canDrag = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  return (
    <section id="gallery" className="bg-gradient-to-b from-cream via-wine-50 to-cream">
      <div className="section">
        <Title eyebrow="Bức tường kỷ niệm" title="Những khoảnh khắc của tụi mình" sub="Chạm vào từng tấm để xem to nha." />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.figure key={g.src} drag={canDrag} dragSnapToOrigin whileDrag={{ scale: 1.1, zIndex: 30, rotate: 0 }}
              initial={{ opacity: 0, y: 40, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: g.tilt }} whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
              viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
              onTap={() => setOpen(i)}
              className="relative sm:cursor-grab bg-white p-2.5 pb-10 shadow-xl active:cursor-grabbing sm:p-3 sm:pb-12">
              <img src={g.src} alt={g.caption} loading="lazy" draggable={false} className="aspect-square w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-2 text-center font-script text-lg text-wine-700 sm:bottom-3 sm:text-xl">{g.caption}</figcaption>
            </motion.figure>
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
