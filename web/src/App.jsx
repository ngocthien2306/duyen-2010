import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Gate from './components/Gate';
import Petals from './components/Petals';
import Hero from './components/Hero';
import Counter from './components/Counter';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import Reasons from './components/Reasons';
import Garden from './components/Garden';
import Coupons from './components/Coupons';
import Poem from './components/Poem';
import WishJar from './components/WishJar';
import Quiz from './components/Quiz';
import Invite from './components/Invite';
import Finale from './components/Finale';
import Music from './components/Music';
import Nav from './components/Nav';
import { api, setKey } from './api';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [state, setState] = useState({});
  const music = useRef(null);

  const unlock = (code) => {
    setKey(code);
    setUnlocked(true);
    music.current?.play();
    // Anh xem thử bằng link có ?thien thì không báo "em đã mở quà"
    if (!new URLSearchParams(window.location.search).has('thien')) api.open().catch(() => {});
    api.state().then(setState).catch(() => {});
  };

  useEffect(() => { document.body.style.overflow = unlocked ? '' : 'hidden'; }, [unlocked]);

  return (
    <>
      <AnimatePresence>{!unlocked && <Gate onUnlock={unlock} />}</AnimatePresence>
      <Music ref={music} />
      {unlocked && (
        <>
          <Petals />
          <Nav />
          <main>
            <Hero />
            <Counter />
            <Story />
            <Gallery />
            <Letter />
            <Reasons />
            <Garden initialCount={state.flowers || 0} />
            <Coupons redeemed={state.redeemed} />
            <Poem />
            <WishJar initial={state.wishes} />
            <Quiz />
            <Invite serverAnswer={state.rsvp} />
            <Finale />
          </main>
        </>
      )}
    </>
  );
}
