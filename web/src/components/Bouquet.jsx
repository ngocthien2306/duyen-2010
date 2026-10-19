import { motion } from 'framer-motion';

// Bó hoa SVG tự "nở" khi xuất hiện
const FLOWERS = [
  { x: 150, y: 95, r: 34, petals: 8, c1: '#e2657f', c2: '#b42647', d: 1.4 },
  { x: 95, y: 125, r: 28, petals: 7, c1: '#f6c7d0', c2: '#ee9aab', d: 1.6 },
  { x: 205, y: 125, r: 28, petals: 7, c1: '#fbe4e8', c2: '#ee9aab', d: 1.7 },
  { x: 120, y: 60, r: 24, petals: 6, c1: '#f3d9a4', c2: '#d4a24c', d: 1.9 },
  { x: 185, y: 58, r: 25, petals: 8, c1: '#ee9aab', c2: '#d13d5e', d: 2.0 },
  { x: 150, y: 150, r: 22, petals: 6, c1: '#fff', c2: '#f6c7d0', d: 2.2 },
];
const STEMS = FLOWERS.map((f) => `M150 300 Q ${150 + (f.x - 150) * 0.4} ${220} ${f.x} ${f.y + f.r * 0.6}`);

export default function Bouquet({ className = '' }) {
  return (
    <svg viewBox="0 0 300 340" className={className} aria-hidden>
      <defs>
        <linearGradient id="wrap" x1="0" x2="1">
          <stop offset="0" stopColor="#f3d9a4" />
          <stop offset="1" stopColor="#e8c27a" />
        </linearGradient>
      </defs>
      {STEMS.map((d, i) => (
        <motion.path key={i} d={d} stroke="#4f7a4a" strokeWidth="3" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2 + i * 0.08 }} />
      ))}
      {[[110, 200, -30], [190, 205, 35], [140, 230, -10]].map(([x, y, rot], i) => (
        <motion.ellipse key={i} cx={x} cy={y} rx="22" ry="8" fill="#6d9b5f" transform={`rotate(${rot} ${x} ${y})`}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.1 }} style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
      {FLOWERS.map((f, i) => <Flower key={i} {...f} />)}
      {/* Giấy gói */}
      <motion.path d="M90 230 L150 335 L210 230 L185 250 L150 238 L115 250 Z" fill="url(#wrap)" stroke="#d4a24c" strokeWidth="1.5"
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} />
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.4, type: 'spring' }} style={{ transformOrigin: '150px 268px' }}>
        <path d="M150 268 C130 250 118 262 132 272 Z M150 268 C170 250 182 262 168 272 Z" fill="#d13d5e" />
        <path d="M150 268 L138 296 M150 268 L162 296" stroke="#d13d5e" strokeWidth="4" strokeLinecap="round" />
        <circle cx="150" cy="268" r="6" fill="#b42647" />
      </motion.g>
    </svg>
  );
}

function Flower({ x, y, r, petals, c1, c2, d }) {
  return (
    <motion.g initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: d, type: 'spring', stiffness: 90, damping: 11 }} style={{ transformOrigin: `${x}px ${y}px` }}>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse key={i} cx={x} cy={y - r * 0.5} rx={r * 0.38} ry={r * 0.6} fill={i % 2 ? c1 : c2} opacity="0.95"
          transform={`rotate(${(360 / petals) * i} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={r * 0.32} fill={c2} />
      <circle cx={x} cy={y} r={r * 0.16} fill="#f3d9a4" />
    </motion.g>
  );
}
