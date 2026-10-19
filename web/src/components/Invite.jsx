import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { invite, photos } from '../data';
import { api, local } from '../api';

const NO_TEXTS = ['Để em suy nghĩ', 'Chắc chưa?', 'Nghĩ lại đi mà 🥺', 'Bấm không được đâu', 'Thôi đồng ý đi', 'Anh buồn đó 😢'];

export default function Invite({ serverAnswer }) {
  const [answered, setAnswered] = useState(() => local.get('rsvp', false) || serverAnswer === 'yes');
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);

  const dodge = () => {
    setTries((t) => t + 1);
    setNoPos({ x: (Math.random() - 0.5) * 240, y: (Math.random() - 0.5) * 160 });
  };

  const yes = () => {
    setAnswered(true);
    local.set('rsvp', true);
    api.rsvp('yes', tries).catch(() => {});
    const end = Date.now() + 1500;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#e2657f', '#f3d9a4'] });
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#e2657f', '#f3d9a4'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <section id="invite" className="relative overflow-hidden bg-wine-900 text-white">
      <img src={photos.nightView} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-wine-950 via-wine-900/70 to-wine-950" />
      <div className="section relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mx-auto max-w-lg rounded-[2rem] border border-gold-300/40 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
          <p className="font-script text-3xl text-gold-300">Thiệp mời</p>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{invite.title}</h2>
          <div className="mx-auto my-8 h-px w-24 bg-gold-300/60" />
          <dl className="space-y-4 text-left">
            {[['🕖', 'Khi nào', invite.when], ['📍', 'Ở đâu', invite.where], ['🎁', 'Có gì', invite.what]].map(([icon, k, v]) => (
              <div key={k} className="flex gap-4">
                <span className="text-2xl">{icon}</span>
                <div><dt className="text-xs uppercase tracking-widest text-gold-300">{k}</dt><dd className="text-lg">{v}</dd></div>
              </div>
            ))}
          </dl>
          {answered ? (
            <motion.p initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="mt-10 font-script text-3xl text-gold-300">Hẹn em tối nay nha! 💖</motion.p>
          ) : (
            <div className="relative mt-10 flex h-28 items-center justify-center gap-4">
              <button onClick={yes} className="btn-primary z-10 text-lg">Em đồng ý 💖</button>
              <motion.button animate={noPos} transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onPointerEnter={dodge} onClick={dodge} className="btn bg-white/10 ring-1 ring-white/30">
                {NO_TEXTS[Math.min(tries, NO_TEXTS.length - 1)]}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
