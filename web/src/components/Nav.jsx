import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  ['top', '💐', 'Bó hồng'], ['counter', '⏳', 'Đếm ngày'], ['film', '🎬', 'Phim'], ['story', '📖', 'Chuyện mình'], ['gallery', '📸', 'Kỷ niệm'],
  ['letter', '💌', 'Thư tay'], ['reasons', '💝', 'Lý do'], ['garden', '🌷', 'Vườn hoa'], ['coupons', '🎁', 'Phiếu quà'],
  ['poem', '✍️', 'Thơ AI'], ['wishes', '⭐', 'Điều ước'], ['quiz', '🎮', 'Mini game'], ['invite', '🥂', 'Lời mời'], ['finale', '🎆', 'Pháo hoa'],
];

export default function Nav() {
  const [active, setActive] = useState('top');
  const bar = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Giữ mục đang xem luôn nằm trong thanh cuộn ngang trên điện thoại
  useEffect(() => {
    const el = bar.current?.querySelector(`[data-id="${active}"]`);
    if (el && bar.current) bar.current.scrollTo({ left: el.offsetLeft - bar.current.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <>
      <nav aria-label="Mục lục" className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-full bg-white/70 p-1.5 shadow-lg ring-1 ring-wine-100 backdrop-blur md:flex">
        {ITEMS.map(([id, icon, label]) => (
          <a key={id} href={`#${id}`} title={label}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-base transition ${active === id ? 'bg-wine-500 shadow' : 'hover:bg-wine-50'}`}>
            {icon}
            <span className="pointer-events-none absolute right-11 whitespace-nowrap rounded-full bg-wine-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">{label}</span>
          </a>
        ))}
      </nav>
      {/* Thanh mục lục cho điện thoại */}
      <nav aria-label="Mục lục" className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] md:hidden">
        <div ref={bar} className="no-scrollbar flex gap-1.5 overflow-x-auto bg-white/75 px-3 py-2 shadow-sm backdrop-blur-md">
          {ITEMS.map(([id, icon, label]) => (
            <a key={id} href={`#${id}`} data-id={id}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${active === id ? 'bg-wine-500 text-white shadow' : 'text-wine-700'}`}>
              <span>{icon}</span>{label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
