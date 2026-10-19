import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from './Reveal';
import { poemStyles } from '../data';
import { api } from '../api';

// Thơ dự phòng khi chưa kết nối được AI
const FALLBACK = {
  sweet: 'Hai mươi tháng mười gió nhẹ sang,\nAnh gom nắng sớm gửi trao nàng.\nNụ cười em ấm hơn trà sữa,\nTim anh tan chảy, chẳng hề than.',
  funny: 'Em ơi 20/10 tới rồi,\nAnh rửa chén, nấu cơm, dọn nồi.\nUdon ba phút anh nấu ba chục,\nNhưng thương em thì chẳng chậm đâu nhỏ ơi!',
  lucbat: 'Phan Thiết nắng gió quê mình,\nĐài Loan xa xứ gặp tình em trao.\nXiaolongbao nóng hôm nào,\nCó em bên cạnh ngọt ngào biết bao.',
  deep: 'Có những ngày xứ người lạnh giá,\nEm là ngọn đèn nhỏ giữa đêm sâu.\nAnh chẳng cần chi nhiều hơn nữa,\nChỉ mong mình đi hết những mai sau.',
};

export default function Poem() {
  const [style, setStyle] = useState('sweet');
  const [poem, setPoem] = useState('');
  const [shown, setShown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shown >= poem.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 35);
    return () => clearTimeout(id);
  }, [shown, poem]);

  const write = async () => {
    setLoading(true); setPoem(''); setShown(0);
    let text;
    try { text = (await api.poem(style)).poem; } catch { text = FALLBACK[style]; }
    setPoem(text.trim()); setLoading(false);
  };

  return (
    <section id="poem" className="section">
      <Title eyebrow="Thi sĩ AI" title="Nhờ AI làm thơ tặng em" sub="Chọn một phong cách rồi bấm nút — mỗi lần là một bài thơ mới, viết riêng cho em." />
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap justify-center gap-2">
          {poemStyles.map((s) => (
            <button key={s.id} onClick={() => setStyle(s.id)}
              className={`rounded-full px-5 py-2.5 font-medium transition ${style === s.id ? 'bg-wine-600 text-white shadow-lg shadow-wine-500/30' : 'bg-white text-wine-700 ring-1 ring-wine-200 hover:bg-wine-50'}`}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button onClick={write} disabled={loading} className="btn-primary">{loading ? 'Thi sĩ đang nghĩ...' : poem ? 'Viết bài khác ✨' : 'Viết thơ cho em ✨'}</button>
        </div>
        <AnimatePresence mode="wait">
          {(loading || poem) && (
            <motion.div key={poem || 'loading'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="card mt-8 px-6 py-10 text-center sm:px-12">
              {loading ? (
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => <motion.span key={i} className="h-3 w-3 rounded-full bg-wine-400" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />)}
                </div>
              ) : (
                <p className="whitespace-pre-line font-serif text-xl italic leading-loose text-wine-900">{poem.slice(0, shown)}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
