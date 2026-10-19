import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Title } from './Reveal';
import { letter, photos } from '../data';

const FULL = letter.paragraphs.join('\n\n');

export default function Letter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });
  const [n, setN] = useState(0);
  const done = n >= FULL.length;

  useEffect(() => {
    if (!inView || done) return;
    const id = setTimeout(() => setN((x) => Math.min(FULL.length, x + 2)), 28);
    return () => clearTimeout(id);
  }, [inView, n, done]);

  return (
    <section id="letter" className="section">
      <Title eyebrow="Thư tay" title="Vài dòng anh muốn nói" />
      <motion.div ref={ref} initial={{ opacity: 0, rotate: -2, y: 40 }} whileInView={{ opacity: 1, rotate: -1, y: 0 }} viewport={{ once: true }}
        className="paper relative mx-auto max-w-2xl rounded-sm px-6 py-10 shadow-[0_30px_80px_-30px_rgba(107,21,48,0.45)] sm:px-14 sm:py-14">
        <img src={photos.her3} alt="" className="absolute -right-4 -top-8 w-24 rotate-6 rounded-sm bg-white p-1.5 pb-5 shadow-xl sm:-right-10 sm:w-32" />
        <span className="absolute -left-3 top-6 h-8 w-24 -rotate-12 bg-gold-300/70" />
        <p className="font-script text-3xl text-wine-700">{letter.greeting}</p>
        <p className="mt-4 min-h-[18rem] whitespace-pre-line font-serif text-lg leading-[34px] text-wine-950/90">
          {FULL.slice(0, n)}
          {!done && <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-wine-500 align-middle" />}
        </p>
        {!done && inView && <button onClick={() => setN(FULL.length)} className="mt-2 text-sm text-wine-400 underline">Đọc nhanh</button>}
        {done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-right">
            <p className="font-serif italic text-wine-700">{letter.signature}</p>
            <p className="font-script text-5xl text-wine-600">{letter.name} ❤</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
