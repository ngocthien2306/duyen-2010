import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Title } from './Reveal';
import { film } from '../data';

const SCENE_MS = 5200;

// "Video" kỷ niệm dựng bằng code: ảnh chuyển cảnh kiểu Ken Burns, chữ hiện dần, khung điện ảnh
export default function Film() {
  const box = useRef(null);
  const inView = useInView(box, { margin: '-30%' });
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Tự dừng khi cuộn đi chỗ khác
  useEffect(() => { if (!inView) setPlaying(false); }, [inView]);

  useEffect(() => {
    if (!playing) return;
    const t0 = Date.now() - elapsed;
    const id = setInterval(() => {
      const e = Date.now() - t0;
      if (e >= SCENE_MS) {
        setElapsed(0);
        setI((x) => {
          if (x + 1 >= film.length) { setPlaying(false); return x; }
          return x + 1;
        });
      } else setElapsed(e);
    }, 50);
    return () => clearInterval(id);
  }, [playing, i]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = () => {
    if (i === film.length - 1 && elapsed === 0) setI(0);
    setStarted(true); setPlaying(true);
  };
  const go = (k) => { setI(k); setElapsed(0); };
  const fullscreen = () => {
    const el = box.current;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  const s = film[i];
  const kb = KB[i % KB.length];

  return (
    <section id="film" className="section">
      <Title eyebrow="Phim ngắn 20/10" title="Một bộ phim nhỏ tên là Minh Duyên" sub="Bấm play, mở loa lên, và xem hết nha 🎬" />
      <div ref={box} className="relative mx-auto aspect-[9/14] w-full max-w-4xl select-none overflow-hidden rounded-[1.75rem] bg-black shadow-[0_30px_80px_-20px_rgba(131,19,67,0.6)] sm:aspect-video [&:fullscreen]:rounded-none">
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
            {s.photo ? (
              <>
                <motion.img src={s.photo} alt="" className="absolute inset-0 h-full w-full object-cover"
                  initial={kb.from} animate={kb.to} transition={{ duration: SCENE_MS / 1000 + 1.2, ease: 'linear' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
              </>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#9d1249_0%,#4c0524_55%,#000_100%)]" />
            )}
            <Caption scene={s} show={started} />
          </motion.div>
        </AnimatePresence>

        {/* Khung điện ảnh */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-black" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-black" />
        <FilmPetals active={playing} />

        {!started && (
          <button onClick={play} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 text-white" aria-label="Phát phim">
            <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl ring-2 ring-white/70 backdrop-blur">▶</motion.span>
            <span className="mt-4 font-script text-3xl">Phim của chúng mình</span>
          </button>
        )}

        {/* Thanh điều khiển */}
        {started && (
          <div className="absolute inset-x-0 bottom-[6%] z-20 px-3 pb-3 sm:px-5">
            <div className="flex gap-1">
              {film.map((_, k) => (
                <button key={k} onClick={() => go(k)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30" aria-label={`Cảnh ${k + 1}`}>
                  <span className="block h-full bg-white" style={{ width: k < i ? '100%' : k === i ? `${(elapsed / SCENE_MS) * 100}%` : '0%' }} />
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-white">
              <div className="flex items-center gap-1">
                <button onClick={() => go(Math.max(0, i - 1))} className="rounded-full px-3 py-2 hover:bg-white/15" aria-label="Cảnh trước">⏮</button>
                <button onClick={() => (playing ? setPlaying(false) : play())} className="rounded-full px-3 py-2 hover:bg-white/15" aria-label={playing ? 'Tạm dừng' : 'Phát'}>{playing ? '❚❚' : '▶'}</button>
                <button onClick={() => go(Math.min(film.length - 1, i + 1))} className="rounded-full px-3 py-2 hover:bg-white/15" aria-label="Cảnh sau">⏭</button>
              </div>
              <span className="text-xs tabular-nums opacity-80">{i + 1}/{film.length}</span>
              <button onClick={fullscreen} className="rounded-full px-3 py-2 hover:bg-white/15" aria-label="Toàn màn hình">⛶</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const KB = [
  { from: { scale: 1.0, x: '0%', y: '0%' }, to: { scale: 1.18, x: '-3%', y: '-2%' } },
  { from: { scale: 1.2, x: '3%', y: '0%' }, to: { scale: 1.02, x: '0%', y: '1%' } },
  { from: { scale: 1.05, x: '-2%', y: '2%' }, to: { scale: 1.2, x: '2%', y: '-2%' } },
  { from: { scale: 1.18, x: '0%', y: '-3%' }, to: { scale: 1.0, x: '0%', y: '2%' } },
];

function Caption({ scene, show }) {
  if (!show) return null;
  const center = !scene.photo;
  return (
    <div className={`absolute inset-x-0 z-10 px-6 text-white sm:px-12 ${center ? 'inset-y-0 flex flex-col items-center justify-center text-center' : 'bottom-[16%] sm:bottom-[18%]'}`}>
      {scene.kicker && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-200 sm:text-sm">
          {scene.kicker}
        </motion.p>
      )}
      <h3 className={`mt-2 font-serif font-bold leading-tight drop-shadow-lg ${center ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl'}`}>
        {scene.title.split(' ').map((w, k) => (
          <motion.span key={k} className="mr-[0.25em] inline-block" initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.7 + k * 0.12, duration: 0.6 }}>{w}</motion.span>
        ))}
      </h3>
      {scene.text && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-3 max-w-xl font-script text-2xl text-pink-100 sm:text-3xl">
          {scene.text}
        </motion.p>
      )}
    </div>
  );
}

function FilmPetals({ active }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Array.from({ length: 12 }).map((_, k) => (
        <motion.span key={k} className="absolute text-lg" style={{ left: `${(k * 83) % 100}%`, top: '-5%' }}
          animate={{ y: ['0vh', '75vh'], x: [0, k % 2 ? 40 : -40], rotate: [0, 360], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 6 + (k % 4), delay: k * 0.6, ease: 'linear' }}>🌸</motion.span>
      ))}
    </div>
  );
}
