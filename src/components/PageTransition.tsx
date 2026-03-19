import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Enter Animation (Slides OUT to left to reveal screen) - CUT OUT (Faster) */}
      <motion.div
        className="fixed -top-[50vh] -bottom-[50vh] w-[200vw] z-[100] bg-white pointer-events-none"
        initial={{ x: '-20%', skewX: '-30deg' }}
        animate={{ x: '-150%', skewX: '-30deg' }}
        exit={{ x: '-150%', skewX: '-30deg' }}
        transition={{ duration: 0.35, ease: [0.1, 0, 0.9, 1], delay: 0.05 }}
      />
      <motion.div
        className="fixed -top-[50vh] -bottom-[50vh] w-[200vw] z-[101] bg-[#0066ff] pointer-events-none"
        initial={{ x: '-10%', skewX: '-30deg' }}
        animate={{ x: '-150%', skewX: '-30deg' }}
        exit={{ x: '-150%', skewX: '-30deg' }}
        transition={{ duration: 0.35, ease: [0.1, 0, 0.9, 1] }}
      />

      {/* Exit Animation (Slides IN from right to cover screen) - CUT IN (Slower, Sticky) */}
      <motion.div
        className="fixed -top-[50vh] -bottom-[50vh] w-[200vw] z-[100] bg-white pointer-events-none"
        initial={{ x: '150%', skewX: '-30deg' }}
        animate={{ x: '150%', skewX: '-30deg' }}
        exit={{ x: '-20%', skewX: '-30deg' }}
        transition={{ duration: 0.55, ease: [0.7, 0, 0.1, 1] }}
      />
      <motion.div
        className="fixed -top-[50vh] -bottom-[50vh] w-[200vw] z-[101] bg-[#0066ff] pointer-events-none"
        initial={{ x: '150%', skewX: '-30deg' }}
        animate={{ x: '150%', skewX: '-30deg' }}
        exit={{ x: '-10%', skewX: '-30deg' }}
        transition={{ duration: 0.55, ease: [0.7, 0, 0.1, 1], delay: 0.05 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.15 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
