import { motion } from 'framer-motion';
import { Title } from './Reveal';
import { story } from '../data';

export default function Story() {
  return (
    <section id="story" className="section">
      <Title eyebrow="Chuyện của chúng mình" title="Từ Louisa đến mãi về sau" />
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-wine-200 via-wine-400 to-gold-400 md:left-1/2" />
        <div className="space-y-14">
          {story.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div key={s.title} initial={{ opacity: 0, x: left ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
                className={`relative grid items-center gap-6 pl-14 md:grid-cols-2 md:pl-0 ${left ? '' : 'md:[&>*:first-child]:order-2'}`}>
                <span className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-wine-500 text-white shadow-lg ring-4 ring-cream md:left-1/2 md:top-1/2 md:-translate-y-1/2">❤</span>
                <div className={`${left ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                  <p className="font-script text-2xl text-wine-500">{s.date}</p>
                  <h3 className="font-serif text-2xl font-bold text-wine-900 sm:text-3xl">{s.title}</h3>
                  <p className="mt-1 text-sm uppercase tracking-widest text-gold-500">{s.place}</p>
                  <p className="mt-3 leading-relaxed text-wine-800/85">{s.text}</p>
                </div>
                <div className={`${left ? 'md:pl-14' : 'md:pr-14'}`}>
                  <div className="overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white">
                    <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} src={s.photo} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
