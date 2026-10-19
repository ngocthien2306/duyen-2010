import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { couple } from '../data';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export default function Gate({ onUnlock }) {
  const [stage, setStage] = useState('sealed'); // sealed → code → opening
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(0);
  const [shake, setShake] = useState(false);

  const press = (k) => {
    if (k === '⌫') return setCode((c) => c.slice(0, -1));
    if (!k || code.length >= couple.passcode.length) return;
    const next = code + k;
    setCode(next);
    if (next.length === couple.passcode.length) {
      if (next === couple.passcode) {
        setStage('opening');
        setTimeout(() => onUnlock(next), 2200);
      } else {
        setWrong((w) => w + 1);
        setShake(true);
        setTimeout(() => { setShake(false); setCode(''); }, 550);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#b4185d_0%,#460624_70%)] px-4"
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.9 }}
    >
      <Stars />
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-script text-3xl text-gold-300">
          Ngày Phụ nữ Việt Nam
        </motion.p>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-1 font-serif text-6xl font-bold text-shine">
          20 · 10
        </motion.h1>

        <Envelope open={stage === 'opening'} onClick={() => stage === 'sealed' && setStage('code')} />

        <AnimatePresence mode="wait">
          {stage === 'sealed' && (
            <motion.p key="tap" initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 2 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }} className="mt-6 text-wine-100">
              Chạm vào lá thư để mở nha 💌
            </motion.p>
          )}
          {stage === 'code' && (
            <motion.div key="code" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 w-full">
              <p className="text-sm text-wine-100">Nhập mật mã để mở quà</p>
              <motion.div animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : {}} className="my-4 flex justify-center gap-3">
                {Array.from({ length: couple.passcode.length }).map((_, i) => (
                  <span key={i} className={`h-4 w-4 rounded-full border-2 border-gold-300 transition ${i < code.length ? 'bg-gold-300 scale-110' : ''}`} />
                ))}
              </motion.div>
              {wrong > 0 && <p className="mb-3 text-sm text-gold-300">Gợi ý: {couple.passcodeHint}</p>}
              <div className="mx-auto grid w-64 grid-cols-3 gap-3">
                {KEYS.map((k, i) => (
                  <button
                    key={i}
                    onClick={() => press(k)}
                    disabled={!k}
                    className="h-14 rounded-2xl bg-white/10 text-xl font-semibold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20 active:scale-90 disabled:opacity-0"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {stage === 'opening' && (
            <motion.p key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 font-script text-3xl text-gold-300">
              Đúng rồi! Em giỏi quá 💖
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Envelope({ open, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: open ? 1 : 1.04, rotate: open ? 0 : -1 }}
      animate={open ? { y: 30 } : { y: [0, -8, 0] }}
      transition={open ? { duration: 0.6 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      className="relative mt-8 h-44 w-64 [perspective:800px]"
      aria-label="Mở lá thư"
    >
      {/* Lá thư bên trong */}
      <motion.div
        initial={false}
        animate={open ? { y: -110, opacity: 1 } : { y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-x-4 top-3 z-10 flex h-36 flex-col items-center justify-center rounded-lg bg-cream p-3 shadow-xl"
      >
        <span className="font-script text-2xl text-wine-600">Gửi {couple.her}</span>
        <span className="mt-1 text-3xl">🌹</span>
      </motion.div>
      {/* Thân phong bì */}
      <div className="absolute inset-0 z-20 rounded-xl bg-gradient-to-br from-wine-400 to-wine-600 shadow-2xl" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }} />
      {/* Nắp phong bì */}
      <motion.div
        initial={false}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 60%)', zIndex: open ? 5 : 30 }}
        className="absolute inset-x-0 top-0 h-full rounded-t-xl bg-gradient-to-b from-wine-300 to-wine-500"
      />
      {/* Dấu sáp */}
      {!open && (
        <div className="absolute left-1/2 top-[48%] z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-xl shadow-lg ring-4 ring-gold-300/40">
          ❤
        </div>
      )}
    </motion.button>
  );
}

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, d: 2 + (i % 5), s: i % 3 === 0 ? 3 : 2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.s, height: s.s }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: s.d, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}
