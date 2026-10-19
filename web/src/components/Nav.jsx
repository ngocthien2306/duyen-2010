import { useEffect, useState } from 'react';

const ITEMS = [
  ['top', '🏠', 'Đầu trang'], ['counter', '⏳', 'Đếm ngày'], ['story', '📖', 'Chuyện mình'], ['gallery', '📸', 'Kỷ niệm'],
  ['letter', '💌', 'Thư tay'], ['reasons', '💝', 'Lý do'], ['garden', '🌷', 'Vườn hoa'], ['coupons', '🎁', 'Phiếu quà'],
  ['poem', '✍️', 'Thơ AI'], ['wishes', '⭐', 'Điều ước'], ['quiz', '🎮', 'Mini game'], ['invite', '🥂', 'Lời mời'], ['finale', '🎆', 'Pháo hoa'],
];

export default function Nav() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Mục lục" className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1.5 rounded-full bg-white/70 p-1.5 shadow-lg ring-1 ring-wine-100 backdrop-blur md:flex">
      {ITEMS.map(([id, icon, label]) => (
        <a key={id} href={`#${id}`} title={label}
          className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-base transition ${active === id ? 'bg-wine-600 shadow' : 'hover:bg-wine-50'}`}>
          {icon}
          <span className="pointer-events-none absolute right-11 whitespace-nowrap rounded-full bg-wine-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">{label}</span>
        </a>
      ))}
    </nav>
  );
}
