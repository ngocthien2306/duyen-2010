import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playlist } from '../data';

const Music = forwardRef(function Music(_, ref) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  useImperativeHandle(ref, () => ({ play: () => audio.current.play().then(() => setPlaying(true)).catch(() => {}) }));

  useEffect(() => { if (playing) audio.current.play().catch(() => {}); }, [track]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    if (playing) { audio.current.pause(); setPlaying(false); }
    else audio.current.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <audio ref={audio} src={playlist[track].src} onEnded={() => setTrack((t) => (t + 1) % playlist.length)} preload="none" />
      <button onClick={toggle} aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-wine-900 text-white shadow-xl ring-2 ring-gold-300/60">
        <motion.span animate={{ rotate: playing ? 360 : 0 }} transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
          className="absolute inset-1 rounded-full bg-[repeating-radial-gradient(circle,#2a0713_0,#2a0713_2px,#4a0f22_3px)]" />
        <span className="relative text-sm">{playing ? '❚❚' : '▶'}</span>
      </button>
      {playing && (
        <button onClick={() => setTrack((t) => (t + 1) % playlist.length)} className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-wine-700 shadow ring-1 ring-wine-100">
          ♪ {playlist[track].title} · ⏭
        </button>
      )}
    </div>
  );
});

export default Music;
