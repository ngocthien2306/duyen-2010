import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className = '', y = 40 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

export function Title({ eyebrow, title, sub }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 mt-1">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-wine-700/80">{sub}</p>}
    </Reveal>
  );
}
