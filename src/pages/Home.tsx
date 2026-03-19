import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
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

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase text-black font-bold drop-shadow-md">Scroll</span>
          <ChevronDown className="w-4 h-4 text-black drop-shadow-md" />
        </motion.div>
      </div>

      {/* About Me Section */}
      <div className="min-h-screen bg-white flex flex-col justify-center px-8 py-24 relative z-10 border-t border-black/10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tight">
              About Me<span className="text-[#0066ff]">.</span>
            </h2>
            <div className="space-y-6 text-lg text-black/70 font-light leading-relaxed">
              <p>
                Hello! I'm a passionate indie game developer and digital artist. I focus on creating engaging interactive experiences and visually stunning artworks.
              </p>
              <p>
                In game development, I specialize in Unity and Unreal Engine, focusing on core gameplay programming and technical art. I love turning complex systems into smooth, intuitive player experiences.
              </p>
              <p>
                In the realm of digital art, I am drawn to cyberpunk and surrealist illustrations. I believe good art is not just a visual treat, but a medium for emotional storytelling.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-black font-bold text-xl mb-4">Skills</h3>
                <ul className="space-y-2 text-black/70 font-light">
                  <li>Unity / C#</li>
                  <li>Unreal Engine / C++</li>
                  <li>React / TypeScript</li>
                  <li>Blender / 3D Modeling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-black font-bold text-xl mb-4">Experience</h3>
                <ul className="space-y-2 text-black/70 font-light">
                  <li>Indie Game Studio - Lead Dev</li>
                  <li>Freelance Concept Artist</li>
                  <li>Global Game Jam Winner</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right side visual */}
          <div className="relative aspect-[4/5] md:aspect-square">
            <img 
              src="https://picsum.photos/seed/portrait/800/1000" 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
