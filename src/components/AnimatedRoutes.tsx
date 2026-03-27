import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Home from '../pages/Home';
import Art from '../pages/Art';
import PageTransition from './PageTransition';

export default function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/art" element={<PageTransition><Art /></PageTransition>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}
