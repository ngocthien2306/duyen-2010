import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import RoseBouquet from './RoseBouquet';
import { couple, photos } from '../data';

export function heartBurst(x = 0.5, y = 0.5) {
  const heart = confetti.shapeFromText ? confetti.shapeFromText({ text: '❤', scalar: 2 }) : undefined;
  confetti({ particleCount: 40, spread: 80, startVelocity: 35, origin: { x, y }, scalar: 2, shapes: heart ? [heart] : undefined, colors: ['#e2657f', '#f6c7d0', '#d13d5e', '#f3d9a4'] });
}

export function roseRain() {
  const rose = confetti.shapeFromText ? confetti.shapeFromText({ text: '🌸', scalar: 3 }) : undefined;
  const end = Date.now() + 1800;
  (function frame() {
    confetti({ particleCount: 4, startVelocity: 0, ticks: 300, gravity: 0.6, origin: { x: Math.random(), y: -0.05 }, scalar: 3, drift: Math.random() - 0.5, shapes: rose ? [rose] : undefined });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function Hero() {
  return (
    <header
      id="top"
      className="hero-romance relative flex min-h-[100svh] items-center overflow-hidden text-wine-950"
    >
      <motion.img
        src={photos.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_25%] opacity-[0.07]"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f8]/50 via-[#fff0f6]/80 to-[#fff7fa]" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <span className="hero-date" aria-hidden="true">20.10</span>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-2 px-6 pb-20 pt-20 sm:gap-8 sm:pt-24 sm:px-8 md:grid-cols-[1fr_1.15fr]">
        <div className="text-center md:text-left">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[.32em] text-wine-600">Một món quà dành riêng cho em</p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-script text-2xl text-wine-500 sm:text-3xl">
            Chúc mừng ngày Phụ nữ Việt Nam
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-4 font-serif text-[2.7rem] font-medium leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
            Gửi <span className="hero-name">{couple.her}</span>,<br /> <span className="hero-subtitle">người con gái anh thương.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mx-auto mt-5 max-w-sm text-sm leading-7 text-wine-800/75 md:mx-0">
            Một bó hoa, một lá thư, và thật nhiều yêu thương. Anh gói tất cả ở đây, chỉ dành cho em.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href="#letter" onClick={(e) => e.stopPropagation()} className="btn-primary">Đọc thư anh viết 💌</a>
            <a href="#coupons" onClick={(e) => e.stopPropagation()} className="btn-ghost">Mở quà 🎁</a>
          </motion.div>
          <p className="mt-7 font-script text-xl text-wine-500">Vì có em, ngày nào cũng thật đẹp ♡</p>
        </div>
        <div className="bouquet-stage relative mx-auto w-full max-w-[26rem] md:max-w-[34rem]">
          <div className="bouquet-halo" aria-hidden="true" />
          <span className="bouquet-caption" aria-hidden="true">Blooming, just for you</span>
          <button type="button" className="bouquet-button relative block w-full" aria-label="Chạm bó hoa để thả mưa hoa" onClick={() => { heartBurst(); roseRain(); }}>
            <RoseBouquet className="relative w-full drop-shadow-[0_22px_24px_rgba(164,52,100,0.16)]" />
          </button>
          <p className="relative -mt-2 text-center text-xs tracking-wide text-wine-600">Chạm vào bó hoa, có bất ngờ nè ♡</p>
        </div>
      </div>
      <motion.a href="#counter" onClick={(e) => e.stopPropagation()} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-wine-500" aria-label="Cuộn xuống">↓</motion.a>
    </header>
  );
}
