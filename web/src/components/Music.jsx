import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { playlist } from '../data';

// Nạp YouTube IFrame API một lần
let ytReady;
function loadYT() {
  if (!ytReady) {
    ytReady = new Promise((resolve) => {
      if (window.YT?.Player) return resolve(window.YT);
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    });
  }
  return ytReady;
}

const Music = forwardRef(function Music(_, ref) {
  const host = useRef(null);
  const player = useRef(null);
  const wantPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadYT().then((YT) => {
      if (cancelled) return;
      player.current = new YT.Player(host.current, {
        videoId: playlist[0].id,
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => { if (wantPlay.current) player.current.playVideo(); },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (e.data === YT.PlayerState.ENDED) next();
          },
          // Video không cho nhúng hoặc bị lỗi → chuyển bài kế tiếp
          onError: () => next(),
        },
      });
    });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playAt = (i) => {
    setTrack(i);
    wantPlay.current = true;
    player.current?.loadVideoById?.(playlist[i].id);
  };
  const next = () => setTrack((t) => { const n = (t + 1) % playlist.length; player.current?.loadVideoById?.(playlist[n].id); return n; });

  useImperativeHandle(ref, () => ({
    play: () => { wantPlay.current = true; player.current?.playVideo?.(); },
  }));

  const toggle = () => {
    if (!player.current?.playVideo) { wantPlay.current = true; return; }
    if (playing) player.current.pauseVideo(); else player.current.playVideo();
  };

  const song = playlist[track];

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {/* Khung video luôn tồn tại để nhạc không bị ngắt; thu gọn thì đẩy ra ngoài màn hình */}
      <div className={open ? 'w-[280px] overflow-hidden rounded-2xl bg-wine-950 shadow-2xl ring-1 ring-gold-300/40' : 'pointer-events-none fixed -left-[9999px] top-0 w-[280px]'}>
        <div className="aspect-video w-full [&>*]:h-full [&>*]:w-full"><div ref={host} /></div>
        {open && (
          <ul className="no-scrollbar max-h-56 overflow-y-auto p-2">
            {playlist.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => playAt(i)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${i === track ? 'bg-wine-700 text-white' : 'text-wine-100 hover:bg-white/10'}`}>
                  <span className="w-4 text-xs opacity-60">{i === track && playing ? '♪' : i + 1}</span>
                  <span className="min-w-0"><span className="block truncate font-medium">{s.title}</span><span className="block truncate text-xs opacity-60">{s.artist}</span></span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggle} aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wine-900 text-white shadow-xl ring-2 ring-gold-300/60">
          <motion.span animate={{ rotate: playing ? 360 : 0 }} transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
            className="absolute inset-1 rounded-full bg-[repeating-radial-gradient(circle,#2a0713_0,#2a0713_2px,#4a0f22_3px)]" />
          <span className="relative text-sm">{playing ? '❚❚' : '▶'}</span>
        </button>
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex max-w-[60vw] items-center gap-1 rounded-full bg-white/90 py-1 pl-3 pr-1 text-xs font-medium text-wine-700 shadow ring-1 ring-wine-100 backdrop-blur">
            <span className="truncate">♪ {song.title} · {song.artist}</span>
            <button onClick={next} className="rounded-full px-2 py-1 hover:bg-wine-50" aria-label="Bài tiếp theo">⏭</button>
            <button onClick={() => setOpen((o) => !o)} className="rounded-full px-2 py-1 hover:bg-wine-50" aria-label="Danh sách bài hát">{open ? '✕' : '☰'}</button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default Music;
