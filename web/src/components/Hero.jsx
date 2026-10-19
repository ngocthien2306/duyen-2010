import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Bouquet from './Bouquet';
import { couple, photos } from '../data';

export function heartBurst(x = 0.5, y = 0.5) {
  const heart = confetti.shapeFromText ? confetti.shapeFromText({ text: '❤', scalar: 2 }) : undefined;
  confetti({ particleCount: 40, spread: 80, startVelocity: 35, origin: { x, y }, scalar: 2, shapes: heart ? [heart] : undefined, colors: ['#e2657f', '#f6c7d0', '#d13d5e', '#f3d9a4'] });
}

export default function Hero() {
  return (
    <header
      id="top"
      onClick={(e) => heartBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight)}
      className="relative flex min-h-[100svh] cursor-pointer items-center overflow-hidden bg-wine-950 text-white"
    >
      <motion.img
        src={photos.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_25%] opacity-45"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-wine-950/70 via-wine-900/40 to-wine-950" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-4 pb-24 pt-20 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div className="text-center md:text-left">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-script text-3xl text-gold-300 sm:text-4xl">
            Chúc mừng ngày Phụ nữ Việt Nam
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-3 font-serif text-5xl font-bold leading-[1.05] sm:text-7xl">
            Gửi <span className="text-shine">{couple.her}</span>,<br /> người con gái anh thương
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mx-auto mt-6 max-w-lg text-lg text-wine-100 md:mx-0">
            20/10 năm nay, anh gói cả trái tim vào trang web nhỏ này. Kéo xuống từ từ thôi nha — mỗi góc đều có một bất ngờ 🎁
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href="#letter" onClick={(e) => e.stopPropagation()} className="btn-primary">Đọc thư anh viết 💌</a>
            <a href="#coupons" onClick={(e) => e.stopPropagation()} className="btn bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20">Mở quà 🎁</a>
          </motion.div>
          <p className="mt-6 text-xs text-wine-200/70">(chạm vào bất cứ đâu để thả tim)</p>
        </div>
        <Bouquet className="mx-auto w-64 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:w-80" />
      </div>
      <motion.a href="#counter" onClick={(e) => e.stopPropagation()} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-wine-200" aria-label="Cuộn xuống">↓</motion.a>
    </header>
  );
}
