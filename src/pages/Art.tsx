import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

const artworks = [
  { id: 1, url: 'https://files.catbox.moe/u4xfy2.png' },
  { id: 2, url: 'https://files.catbox.moe/psscyg.png' },
  { id: 3, url: 'https://files.catbox.moe/9xadtf.jpg' },
  { id: 4, url: 'https://files.catbox.moe/aqzwts.jpg' },
  { id: 5, url: 'https://files.catbox.moe/ljmcis.png' },
  { id: 6, url: 'https://files.catbox.moe/xuf2x2.png' },
  { id: 7, url: 'https://files.catbox.moe/0a2jr3.jpg' },
];

export default function Art() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pb-12 px-8 max-w-7xl mx-auto min-h-[calc(100vh-65px)]">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">Art</h1>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {artworks.map((art) => {
          const imgUrl = art.url;
          return (
            <div 
              key={art.id}
              className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm"
              onClick={() => setSelectedImage(imgUrl)}
            >
              <img 
                src={imgUrl} 
                alt={`Artwork ${art.id}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged artwork"
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
