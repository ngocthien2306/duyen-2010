import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { api, local } from '../api';

const STAR_COLORS = ['#f6c7d0', '#f3d9a4', '#ee9aab', '#fde68a', '#c4b5fd', '#fbcfe8'];

export default function WishJar({ initial = [] }) {
  const [wishes, setWishes] = useState(() => local.get('wishes', []));
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [flying, setFlying] = useState(null);

  useEffect(() => {
    if (!initial.length) return;
    setWishes((w) => {
      const seen = new Set(w.map((x) => x.text + x.at));
      return [...w, ...initial.filter((x) => !seen.has(x.text + x.at))].sort((a, b) => a.at - b.at);
    });
  }, [initial]);
  useEffect(() => local.set('wishes', wishes.slice(-50)), [wishes]);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setSending(true);
    const wish = { text: t, at: Date.now() };
    try { await api.wish(t); } catch { /* lưu tạm trên máy */ }
    setFlying(t); setText(''); setSending(false);
    setTimeout(() => { setWishes((w) => [...w, wish]); setFlying(null); }, 900);
  };

  return (
    <section id="wishes" className="bg-gradient-to-b from-wine-50 to-cream">
      <div className="section">
        <Title eyebrow="Lọ điều ước" title="Em ước gì, anh ghi lại hết" sub="Viết điều ước của em vào đây — nó sẽ hóa thành ngôi sao trong lọ, và anh sẽ thực hiện từng điều một." />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto h-80 w-56">
            <div className="absolute left-1/2 top-0 h-8 w-32 -translate-x-1/2 rounded-md bg-gradient-to-b from-gold-400 to-gold-500 shadow" />
            <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden rounded-b-[3rem] rounded-t-2xl border-4 border-white/80 bg-white/30 shadow-[inset_0_0_40px_rgba(255,255,255,0.8),0_20px_50px_-20px_rgba(107,21,48,0.4)] backdrop-blur-sm">
              <div className="absolute bottom-0 flex w-full flex-wrap-reverse content-start justify-center gap-1 p-4">
                {wishes.map((w, i) => (
                  <motion.span key={w.at + w.text} title={w.text} initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1, rotate: (i * 47) % 360 }}
                    transition={{ type: 'spring', stiffness: 80 }} className="text-2xl" style={{ color: STAR_COLORS[i % STAR_COLORS.length], filter: 'drop-shadow(0 0 4px rgba(255,255,255,.9))' }}>★</motion.span>
                ))}
              </div>
              <div className="absolute left-4 top-6 h-40 w-3 rounded-full bg-white/60" />
            </div>
            <AnimatePresence>
              {flying && (
                <motion.div initial={{ y: 200, x: 120, opacity: 1, scale: 1 }} animate={{ y: -20, x: 0, scale: 0.3, opacity: 0.6 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm text-wine-700 shadow-lg">
                  ★ {flying.slice(0, 20)}
                </motion.div>
              )}
            </AnimatePresence>
            <p className="absolute -bottom-10 w-full text-center font-script text-2xl text-wine-500">{wishes.length} điều ước</p>
          </div>

          <div>
            <form onSubmit={send} className="card p-6">
              <label htmlFor="wish" className="font-serif text-lg font-bold text-wine-900">Điều ước của em</label>
              <textarea id="wish" value={text} onChange={(e) => setText(e.target.value.slice(0, 300))} rows={3}
                placeholder="Ví dụ: Cuối tuần này đi ăn lẩu nha 🍲" className="mt-3 w-full resize-none rounded-2xl border-0 bg-wine-50 p-4 text-wine-900 outline-none ring-1 ring-wine-100 placeholder:text-wine-300 focus:ring-2 focus:ring-wine-400" />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-wine-400">{text.length}/300</span>
                <button disabled={sending || !text.trim()} className="btn-primary">{sending ? 'Đang gửi...' : 'Thả vào lọ ★'}</button>
              </div>
            </form>
            <ul className="mt-5 max-h-52 space-y-2 overflow-y-auto pr-1">
              {[...wishes].reverse().map((w) => (
                <li key={w.at + w.text} className="rounded-2xl bg-white/80 px-4 py-3 text-wine-800 ring-1 ring-wine-100">
                  <span className="mr-2 text-gold-500">★</span>{w.text}
                  <span className="ml-2 text-xs text-wine-300">{new Date(w.at).toLocaleDateString('vi-VN')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
