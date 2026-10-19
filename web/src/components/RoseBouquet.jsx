import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COLORS = [
  ['#a81752', '#ec6199', '#ffd0e2'],
  ['#ce4479', '#ffa8c9', '#fff1f5'],
  ['#b82767', '#f786b5', '#ffe2ec'],
  ['#9b2059', '#dc508b', '#ffb6d2'],
];
const ROSES = [
  [192, 99, .8, 1, -12], [144, 111, .79, 2, 22], [242, 109, .83, 0, -18],
  [100, 140, .8, 1, -25], [290, 139, .83, 2, 25],
  [157, 151, .94, 0, 12], [216, 145, .96, 1, -8], [262, 172, .86, 3, 20],
  [77, 187, .76, 2, -14], [122, 191, .91, 3, 30], [186, 197, 1.02, 2, -16],
  [319, 187, .75, 1, 8], [299, 220, .88, 0, -18], [240, 211, .95, 0, 15],
  [98, 238, .79, 1, -25], [147, 249, .91, 2, 22], [262, 257, .83, 1, -12],
  [201, 262, .98, 1, 6], [226, 297, .62, 2, 24],
];
const SPRIGS = [[89, 181, -55], [115, 128, -36], [151, 112, -22], [252, 121, 28], [294, 167, 53], [320, 225, 73], [82, 245, -72], [286, 278, 65]];
const BABY = [[61, 165], [95, 112], [160, 72], [226, 71], [292, 109], [337, 163], [54, 218], [341, 240], [118, 285], [288, 291]];

function Rose({ flower, index, id, reduced }) {
  const [x, y, scale, palette, rotation] = flower;
  return <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <ellipse cx="1" cy="6" rx="39" ry="35" fill="#8c1748" opacity=".17" />
    <motion.g initial={reduced ? false : { scale: .3, opacity: 0, rotate: -25 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ delay: .25 + index * .055, duration: 1.1 }}>
      {[{ n: 7, r: 43, offset: 8 }, { n: 6, r: 34, offset: 33 }, { n: 5, r: 25, offset: 5 }, { n: 4, r: 17, offset: 40 }].map((layer, li) =>
        <g key={li}>
          {Array.from({ length: layer.n }, (_, p) => {
            const r = layer.r * (1 + Math.sin(p * 5 + index) * .065);
            return <g key={p} transform={`rotate(${p * 360 / layer.n + layer.offset})`}>
              <path d={`M ${-r * .27} 4 C ${-r * 1.04} ${-r * .12}, ${-r * .91} ${-r * .9}, ${-r * .23} ${-r} C ${r * .21} ${-r * 1.1}, ${r * .87} ${-r * .87}, ${r * .66} ${-r * .42} Q ${r * .42} ${r * .12}, ${-r * .27} 4`} fill={`url(#${id}-rose-${palette})`} stroke={COLORS[palette][2]} strokeWidth=".65" />
              <path d={`M ${-r * .66} ${-r * .5} Q ${-r * .6} ${-r * .97} ${-r * .13} ${-r * .94}`} fill="none" stroke="#fff9fc" strokeWidth="1.1" opacity=".65" strokeLinecap="round" />
            </g>;
          })}
        </g>
      )}
      <path d="M-6 5 C-16-4-3-16 7-9 C19 1 3 16-7 8 C-17-1-5-10 3-5 C10 0 3 7-2 3" fill={`url(#${id}-rose-${palette})`} stroke={COLORS[palette][0]} strokeWidth="1.8" strokeLinecap="round" />
    </motion.g>
  </g>;
}

export default function RoseBouquet({ className = '' }) {
  const id = useId().replace(/:/g, '');
  const reduced = useReducedMotion();
  return <motion.svg viewBox="0 0 400 490" className={className} role="img" aria-label="Bó 19 bông hồng phấn, hoa baby và lá bạc, gói giấy ngọc trai với nơ lụa hồng"
    animate={reduced ? {} : { rotate: [-1, 1, -1], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}>
    <defs>
      {COLORS.map((colors, i) => <radialGradient key={i} id={`${id}-rose-${i}`} cx=".45" cy=".85" r=".95"><stop stopColor={colors[0]} /><stop offset=".52" stopColor={colors[1]} /><stop offset="1" stopColor={colors[2]} /></radialGradient>)}
      <linearGradient id={`${id}-paper`} x2="1" y2=".6"><stop stopColor="#fff9f5" /><stop offset=".45" stopColor="#fce5ed" /><stop offset=".7" stopColor="#fff7fa" /><stop offset="1" stopColor="#efb6cc" /></linearGradient>
      <linearGradient id={`${id}-silk`}><stop stopColor="#b72b65" /><stop offset=".28" stopColor="#ee82b0" /><stop offset=".48" stopColor="#f8b5d0" /><stop offset=".62" stopColor="#df6095" /><stop offset="1" stopColor="#a91c58" /></linearGradient>
      <linearGradient id={`${id}-leaf`} x2="1" y2="1"><stop stopColor="#abc3ad" /><stop offset="1" stopColor="#507e70" /></linearGradient>
    </defs>
    <path d="M44 159 L97 113 L163 156 L216 97 L271 150 L310 112 L366 161 L264 414 L149 414Z" fill="#eaa8c3" stroke="#f9d7e4" />
    <path d="M37 196 L64 147 L177 228 L327 144 L369 195 L259 432 L155 433Z" fill="#f8d6e2" stroke="#fff3f5" strokeWidth="1.5" />
    {SPRIGS.map(([x, y, angle], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${angle}) scale(.78)`}>
      <path d="M0 26 Q-8-28 0-100" fill="none" stroke="#749582" strokeWidth="1.4" />
      {[0, 1, 2, 3].map(n => <g key={n} transform={`translate(${-n % 2 * 3} ${-n * 22})`}><ellipse cx="-9" cy="-9" rx="9" ry="15" transform="rotate(-38 -9 -9)" fill={`url(#${id}-leaf)`} /><ellipse cx="10" cy="-19" rx="9" ry="14" transform="rotate(40 10 -19)" fill={`url(#${id}-leaf)`} /><path d="M-15-20 L0 0 L17-29" stroke="#e1e8cf" opacity=".4" strokeWidth=".6" fill="none" /></g>)}
    </g>)}
    {BABY.map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <path d="M8 35 L0 0 M5 24 L-12 6 M4 18 L14-10" stroke="#91a18a" strokeWidth=".9" fill="none" />
      {[[0, 0], [-12, 6], [14, -10], [9, 12], [-6, -10]].map(([dx, dy], j) => <g key={j} transform={`translate(${dx} ${dy})`}><circle r="4.3" fill="#eec8ce" />{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={Math.cos(a * Math.PI / 180) * 2} cy={Math.sin(a * Math.PI / 180) * 2} r="2.5" fill="#fffaf5" />)}<circle r="1.1" fill="#d5b179" /></g>)}
    </g>)}
    {ROSES.map((flower, i) => <Rose key={i} flower={flower} index={i} id={id} reduced={reduced} />)}
    <path d="M52 265 Q110 290 211 345 L171 432 L143 418Z" fill={`url(#${id}-paper)`} stroke="#fff6f8" strokeWidth="1.5" />
    <path d="M345 262 Q282 302 160 338 L177 434 L259 424Z" fill={`url(#${id}-paper)`} stroke="#fff9fa" strokeWidth="1.5" />
    <path d="M74 280 Q133 325 193 348 M328 283 Q264 329 213 349 L248 413 M98 314 L151 409" fill="none" stroke="#d69ab2" strokeWidth=".8" opacity=".6" />
    <path d="M145 417 Q200 439 259 424" fill="none" stroke="#c9a478" strokeWidth="1.2" />
    <g transform="translate(202 367) rotate(-7)">
      <path d="M-6 3 Q-28 44-40 91 L-18 82 L-8 96 Q1 57 8 7" fill={`url(#${id}-silk)`} />
      <path d="M3 5 Q5 52 30 93 L35 77 L56 83 Q29 44 12 2" fill={`url(#${id}-silk)`} />
      <path d="M-3 0 C-90-66-91 30-48 23 Q-22 21-3 0 M4 0 C85-68 94 26 51 23 Q26 24 4 0" fill={`url(#${id}-silk)`} stroke="#fbb9d2" strokeWidth=".7" />
      <path d="M-7-5 Q-45-31-64-14 M11-5 Q51-33 67-14" stroke="#ffd0e1" strokeWidth="1.3" fill="none" opacity=".7" />
      <rect x="-10" y="-10" width="23" height="21" rx="8" fill={`url(#${id}-silk)`} />
    </g>
    <g transform="translate(257 358) rotate(13)"><path d="M-8-13 Q-24-33-30-7" fill="none" stroke="#c6a174" strokeWidth="1" /><rect x="-24" y="-9" width="46" height="30" rx="2" fill="#fffaf4" stroke="#ddbc98" strokeWidth=".6" /><text x="-1" y="4" textAnchor="middle" fill="#a34d70" fontFamily="Georgia, serif" fontStyle="italic" fontSize="7">for you</text><path d="M-3 10 Q-6 6-8 10 Q-9 13-3 16 Q3 12 1 10 Q-1 7-3 10" fill="#d77c9f" /></g>
    {[[44, 116], [350, 103], [193, 30], [43, 288], [356, 302]].map(([x, y], i) => <motion.path key={i} d={`M${x} ${y - 5} Q${x} ${y} ${x + 5} ${y} Q${x} ${y} ${x} ${y + 5} Q${x} ${y} ${x - 5} ${y} Q${x} ${y} ${x} ${y - 5}`} fill="#c79a63" animate={reduced ? { opacity: .6 } : { opacity: [.2, .9, .2] }} transition={{ repeat: Infinity, duration: 3, delay: i * .4 }} />)}
  </motion.svg>;
}
