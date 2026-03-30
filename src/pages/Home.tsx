import { motion } from 'motion/react';
import HeroGame from '../components/HeroGame';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="h-[calc(100vh-65px)] flex flex-col justify-center relative w-full overflow-hidden">
        
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-200 via-white via-40% to-white" />

        {/* Name Text */}
        <div className="absolute top-24 right-12 md:right-24 z-30 text-right pointer-events-none select-none">
          <motion.h1 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black text-black leading-[0.85] tracking-tighter"
          >
            Meizheng<br />Jiang
          </motion.h1>
        </div>

        <div className="absolute inset-0 z-20">
          <HeroGame />
        </div>
      </div>
    </div>
  );
}
