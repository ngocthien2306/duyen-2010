import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Title } from './Reveal';
import { quiz } from '../data';
import { api } from '../api';

export default function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const done = i >= quiz.length;

  const pick = (k) => {
    if (picked !== null) return;
    setPicked(k);
    const right = k === quiz[i].answer;
    const next = score + (right ? 1 : 0);
    if (right) setScore(next);
    setTimeout(() => {
      setPicked(null);
      setI(i + 1);
      if (i + 1 >= quiz.length) {
        api.quiz(next, quiz.length).catch(() => {});
        if (next >= quiz.length - 1) confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
      }
    }, 900);
  };

  const verdict = score === quiz.length ? 'Hiểu anh như hiểu chính mình! 100 điểm 💯' : score >= quiz.length - 2 ? 'Giỏi quá trời! Thưởng 1 cái ôm 🤗' : 'Hơi quên quên nha... phạt 10 cái thơm 😚';

  return (
    <section id="quiz" className="section">
      <Title eyebrow="Mini game" title="Em hiểu chuyện tụi mình bao nhiêu?" />
      <div className="card mx-auto max-w-xl overflow-hidden">
        <div className="h-2 bg-wine-100"><motion.div className="h-full bg-gradient-to-r from-wine-400 to-gold-400" animate={{ width: `${(Math.min(i, quiz.length) / quiz.length) * 100}%` }} /></div>
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <p className="text-sm font-semibold uppercase tracking-widest text-gold-500">Câu {i + 1}/{quiz.length}</p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-wine-900">{quiz[i].q}</h3>
                <div className="mt-6 grid gap-3">
                  {quiz[i].options.map((o, k) => {
                    const state = picked === null ? '' : k === quiz[i].answer ? 'bg-emerald-500 text-white ring-emerald-500' : k === picked ? 'bg-wine-500 text-white ring-wine-500' : 'opacity-50';
                    return (
                      <motion.button key={o} whileTap={{ scale: 0.97 }} onClick={() => pick(k)}
                        className={`rounded-2xl bg-wine-50 px-5 py-4 text-left font-medium text-wine-900 ring-1 ring-wine-100 transition hover:bg-wine-100 ${state}`}>
                        {o}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                <p className="text-6xl">{score === quiz.length ? '🏆' : '💝'}</p>
                <p className="mt-4 font-serif text-5xl font-bold text-wine-600">{score}/{quiz.length}</p>
                <p className="mt-3 text-lg text-wine-800">{verdict}</p>
                <button onClick={() => { setI(0); setScore(0); }} className="btn-ghost mt-6">Chơi lại</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
