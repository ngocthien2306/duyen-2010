import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Title } from './Reveal';
import { coupons } from '../data';
import { api, local } from '../api';

export default function Coupons({ redeemed: serverRedeemed = [] }) {
  const [revealed, setRevealed] = useState(() => local.get('revealed', []));
  const [redeemed, setRedeemed] = useState(() => local.get('redeemed', []));
  const [busy, setBusy] = useState(null);

  useEffect(() => { if (serverRedeemed.length) setRedeemed((r) => [...new Set([...r, ...serverRedeemed])]); }, [serverRedeemed]);
  useEffect(() => local.set('revealed', revealed), [revealed]);
  useEffect(() => local.set('redeemed', redeemed), [redeemed]);

  const redeem = async (c) => {
    setBusy(c.id);
    try { await api.redeem(c.id, c.title); } catch { /* vẫn đánh dấu, anh sẽ thấy qua tin nhắn */ }
    setRedeemed((r) => [...new Set([...r, c.id])]);
    setBusy(null);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors: ['#e2657f', '#f3d9a4', '#fff'] });
  };

  return (
    <section id="coupons" className="bg-gradient-to-b from-cream to-wine-50">
      <div className="section">
        <Title eyebrow="Quà 20/10" title="Phiếu yêu thương" sub="Cào lớp vàng để mở quà. Muốn dùng lúc nào thì bấm “Dùng ngay” — anh sẽ nhận được thông báo liền và phải thực hiện vô điều kiện 😤" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coupons.map((c, i) => {
            const isOpen = revealed.includes(c.id);
            const used = redeemed.includes(c.id);
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
                className={`relative overflow-hidden rounded-3xl bg-white p-1.5 shadow-lg ring-1 ring-wine-100 ${used ? 'opacity-70' : ''}`}>
                <div className="relative h-52 overflow-hidden rounded-[1.3rem] border-2 border-dashed border-wine-200">
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <span className="text-5xl">{c.icon}</span>
                    <p className="mt-3 font-serif text-lg font-bold leading-snug text-wine-900">{c.title}</p>
                    <p className="mt-1 text-sm text-wine-500">{c.note}</p>
                  </div>
                  {!isOpen && <Scratch onDone={() => setRevealed((r) => [...r, c.id])} />}
                  {used && <span className="absolute right-3 top-3 rotate-12 rounded-md border-2 border-wine-500 px-2 py-0.5 text-xs font-bold uppercase text-wine-500">Đã dùng</span>}
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">No. {String(i + 1).padStart(2, '0')}</span>
                  {isOpen && !used && (
                    <button disabled={busy === c.id} onClick={() => redeem(c)} className="rounded-full bg-wine-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-wine-700">
                      {busy === c.id ? 'Đang gửi...' : 'Dùng ngay'}
                    </button>
                  )}
                  {used && <span className="text-sm text-wine-500">Đã báo anh ✓</span>}
                  {!isOpen && <span className="text-sm text-wine-300">Cào nè 👆</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Scratch({ onDone }) {
  const ref = useRef(null);
  const drawing = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const c = ref.current;
    const ratio = window.devicePixelRatio || 1;
    c.width = c.offsetWidth * ratio; c.height = c.offsetHeight * ratio;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, '#e8c27a'); g.addColorStop(0.5, '#f3d9a4'); g.addColorStop(1, '#d4a24c');
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(107,21,48,0.75)';
    ctx.font = `600 ${16 * ratio}px "Be Vietnam Pro", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✨ Cào để mở quà ✨', c.width / 2, c.height / 2);
    for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 2 * ratio, 2 * ratio); }
  }, []);

  const scratch = (e) => {
    if (!drawing.current || doneRef.current) return;
    const c = ref.current; const rect = c.getBoundingClientRect(); const ratio = c.width / rect.width;
    const ctx = c.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc((e.clientX - rect.left) * ratio, (e.clientY - rect.top) * ratio, 22 * ratio, 0, Math.PI * 2);
    ctx.fill();
  };

  const check = () => {
    drawing.current = false;
    const c = ref.current; const ctx = c.getContext('2d');
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    if (clear / (data.length / 64) > 0.45 && !doneRef.current) { doneRef.current = true; c.style.transition = 'opacity .5s'; c.style.opacity = '0'; setTimeout(onDone, 500); }
  };

  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
      onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
      onPointerMove={scratch} onPointerUp={check} onPointerCancel={check} />
  );
}
