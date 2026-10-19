import { motion } from 'framer-motion';

// Bó hoa hồng hồng vẽ bằng SVG: hồng nở dần từ nụ, lá, hoa baby, giấy gói 2 lớp và nơ lụa
const PALETTES = [
  ['#9c0f48', '#ec407a', '#fbb6cf'], // hồng đậm
  ['#c2185b', '#f06292', '#ffc6da'], // hồng tươi
  ['#d81b60', '#f48fb1', '#ffd6e5'], // hồng phấn
  ['#e0457b', '#ffa3c0', '#ffe3ee'], // hồng pastel
];

const ROSES = [
  // x, y, scale, palette, rotate — sắp thành hình vòm
  [200, 120, 1.05, 0, 0], [140, 140, 0.95, 1, -20], [260, 140, 0.95, 2, 25],
  [95, 185, 0.85, 3, -35], [305, 185, 0.85, 1, 40], [170, 190, 1.0, 2, 10],
  [235, 195, 1.0, 0, -15], [130, 240, 0.85, 1, 15], [270, 240, 0.85, 3, -10], [200, 250, 0.95, 1, 30],
];

const LEAVES = [
  [70, 230, -55], [330, 230, 55], [110, 110, -30], [290, 105, 35], [60, 175, -75], [345, 170, 70], [150, 280, -20], [255, 285, 20],
];

const BABY = [[60, 140], [340, 135], [120, 85], [285, 75], [200, 70], [45, 215], [355, 215], [165, 95], [240, 92]];

function petal(r) {
  return `M0 0 C ${-r * 0.95} ${-r * 0.25} ${-r * 0.85} ${-r * 1.05} 0 ${-r * 0.98} C ${r * 0.85} ${-r * 1.05} ${r * 0.95} ${-r * 0.25} 0 0 Z`;
}

const LAYERS = [
  { n: 6, r: 40, off: 0, shade: 2 },
  { n: 5, r: 33, off: 22, shade: 1 },
  { n: 5, r: 25, off: 52, shade: 1 },
  { n: 4, r: 17, off: 15, shade: 0 },
];

function Rose({ x, y, s, pal, rot, delay }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx="3" cy="6" rx="42" ry="38" fill="#7a0a35" opacity="0.18" />
      {LAYERS.map((L, li) => (
        <motion.g key={li}
          initial={{ scale: li === 3 ? 0.6 : 0.2, opacity: 0, rotate: -40 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: delay + (3 - li) * 0.18, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          {Array.from({ length: L.n }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / L.n) * i + L.off})`}>
              <path d={petal(L.r)} fill={`url(#rg${pal}-${L.shade})`} stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" />
              <path d={`M0 ${-L.r * 0.18} Q ${L.r * 0.18} ${-L.r * 0.55} 0 ${-L.r * 0.86}`} fill="none" stroke="rgba(120,0,40,0.12)" strokeWidth="1" />
            </g>
          ))}
        </motion.g>
      ))}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay, duration: 0.6 }}>
        <circle r="9" fill={`url(#rg${pal}-0)`} />
        <path d="M-3 2 C -9 -5 4 -10 7 -3 C 10 5 -3 10 -8 3 C -12 -5 -2 -14 8 -10" fill="none" stroke={PALETTES[pal][0]} strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      </motion.g>
    </g>
  );
}

export default function RoseBouquet({ className = '', onClick }) {
  return (
    <motion.svg viewBox="0 0 400 540" className={className} onClick={onClick} role="img" aria-label="Bó hoa hồng tặng em"
      animate={{ rotate: [-1.2, 1.2, -1.2] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} style={{ transformOrigin: '200px 520px' }}>
      <defs>
        {PALETTES.map((p, i) => [0, 1, 2].map((shade) => (
          <radialGradient key={`${i}-${shade}`} id={`rg${i}-${shade}`} cx="0.5" cy="1" r="1.05">
            <stop offset="0" stopColor={p[0]} />
            <stop offset={0.35 + shade * 0.12} stopColor={p[1]} />
            <stop offset="1" stopColor={p[2]} />
          </radialGradient>
        )))}
        <linearGradient id="paperBack" x1="0" x2="1">
          <stop offset="0" stopColor="#f9c5d5" /><stop offset="0.5" stopColor="#fde2ea" /><stop offset="1" stopColor="#f6b3c8" />
        </linearGradient>
        <linearGradient id="paperFront" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" /><stop offset="1" stopColor="#fbd3e0" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ribbon" x1="0" x2="1">
          <stop offset="0" stopColor="#c2185b" /><stop offset="0.5" stopColor="#f06292" /><stop offset="1" stopColor="#ad1457" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" x2="1">
          <stop offset="0" stopColor="#2e6b3f" /><stop offset="1" stopColor="#5f9e6e" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#831343" floodOpacity="0.25" /></filter>
      </defs>

      {/* Giấy gói phía sau */}
      <motion.path d="M30 150 L80 120 L120 160 L165 105 L200 140 L240 100 L280 158 L320 118 L372 152 L250 470 L150 470 Z"
        fill="url(#paperBack)" filter="url(#soft)" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} />

      {LEAVES.map(([x, y, r], i) => (
        <motion.path key={i} d="M0 0 C 14 -18 14 -46 0 -64 C -14 -46 -14 -18 0 0 Z M0 -4 L0 -58" fill="url(#leaf)" stroke="#24563a" strokeWidth="0.8"
          transform={`translate(${x} ${y}) rotate(${r})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }} />
      ))}

      {BABY.map(([x, y], i) => (
        <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 + i * 0.06, type: 'spring' }} style={{ transformOrigin: `${x}px ${y}px` }}>
          {[[0, 0], [7, -5], [-7, -4], [3, 7], [-5, 6], [10, 4], [-10, 2]].map(([dx, dy], k) => (
            <circle key={k} cx={x + dx} cy={y + dy} r={k === 0 ? 3.2 : 2.6} fill="#fff" stroke="#f8bbd0" strokeWidth="0.6" />
          ))}
        </motion.g>
      ))}

      {ROSES.map(([x, y, s, pal, rot], i) => <Rose key={i} x={x} y={y} s={s} pal={pal} rot={rot} delay={0.6 + i * 0.12} />)}

      {/* Giấy gói phía trước */}
      <motion.path d="M70 270 Q 200 330 330 270 L 250 480 Q 200 495 150 480 Z" fill="url(#paperFront)" stroke="#f8bbd0" strokeWidth="1.2" filter="url(#soft)"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} />
      <path d="M120 300 L 175 470 M280 300 L 225 470" stroke="#fbd3e0" strokeWidth="2" />

      {/* Nơ lụa */}
      <motion.g initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 2.6, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '200px 405px' }}>
        <path d="M200 405 C 160 370 130 380 140 408 C 148 430 180 418 200 405 Z" fill="url(#ribbon)" />
        <path d="M200 405 C 240 370 270 380 260 408 C 252 430 220 418 200 405 Z" fill="url(#ribbon)" />
        <path d="M196 410 C 185 440 175 470 168 500 L 182 494 L 190 506 C 196 476 202 444 204 412 Z" fill="#d81b60" />
        <path d="M204 410 C 215 440 225 470 232 500 L 218 494 L 210 506 C 204 476 198 444 196 412 Z" fill="#c2185b" />
        <ellipse cx="200" cy="406" rx="11" ry="9" fill="#ad1457" />
        <ellipse cx="197" cy="403" rx="4" ry="3" fill="#f8bbd0" opacity="0.7" />
      </motion.g>

      {/* Lấp lánh */}
      {[[60, 90], [345, 80], [30, 300], [372, 300], [200, 40], [110, 40], [300, 40]].map(([x, y], i) => (
        <motion.path key={i} d={`M${x} ${y - 9} L${x + 2.5} ${y - 2.5} L${x + 9} ${y} L${x + 2.5} ${y + 2.5} L${x} ${y + 9} L${x - 2.5} ${y + 2.5} L${x - 9} ${y} L${x - 2.5} ${y - 2.5} Z`}
          fill="#fff" animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.4, delay: 3 + i * 0.35 }}
          style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
    </motion.svg>
  );
}
