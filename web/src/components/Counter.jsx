import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { Title } from './Reveal';
import { couple } from '../data';

const DAY = 86400000;

function diff(from) {
  const ms = Math.max(0, Date.now() - from);
  return { days: Math.floor(ms / DAY), hours: Math.floor(ms / 3600000) % 24, minutes: Math.floor(ms / 60000) % 60, seconds: Math.floor(ms / 1000) % 60 };
}

export default function Counter() {
  const start = new Date(couple.startDate).getTime();
  const [t, setT] = useState(() => diff(start));
  useEffect(() => { const id = setInterval(() => setT(diff(start)), 1000); return () => clearInterval(id); }, [start]);

  const nextMilestone = Math.ceil((t.days + 1) / 100) * 100;
  const milestoneDate = new Date(start + nextMilestone * DAY);
  const daysLeft = nextMilestone - t.days;
  const units = [['Ngày', t.days], ['Giờ', t.hours], ['Phút', t.minutes], ['Giây', t.seconds]];

  return (
    <section id="counter" className="section">
      <Title eyebrow="Mình đã bên nhau" title="Từng giây đều đáng giá" sub={`Kể từ ngày 12/07/2025 — ngày ${couple.her} chính thức là người yêu của ${couple.me}.`} />
      <Reveal className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {units.map(([label, v]) => (
          <div key={label} className="card flex flex-col items-center py-6">
            <motion.span key={v} initial={{ y: -10, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-5xl font-bold tabular-nums text-wine-600 sm:text-6xl">
              {String(v).padStart(label === 'Ngày' ? 1 : 2, '0')}
            </motion.span>
            <span className="mt-1 text-sm uppercase tracking-[0.2em] text-wine-400">{label}</span>
          </div>
        ))}
      </Reveal>
      <Reveal delay={0.2} className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
        <Stat icon="💐" big="20/10 thứ 2" small="mình đón cùng nhau" />
        <Stat icon="🎯" big={`${daysLeft} ngày`} small={`nữa là tròn ${nextMilestone} ngày (${milestoneDate.toLocaleDateString('vi-VN')})`} />
        <Stat icon="💓" big={`~${(t.days * 24 * 60 * 75).toLocaleString('vi-VN')}`} small="nhịp tim anh đã đập vì em" />
      </Reveal>
    </section>
  );
}

function Stat({ icon, big, small }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-serif text-xl font-bold text-wine-800">{big}</p>
        <p className="text-sm text-wine-600/80">{small}</p>
      </div>
    </div>
  );
}
