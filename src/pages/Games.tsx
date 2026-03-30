import { useNavigate } from 'react-router-dom';

const games = [
  { id: 'college-admissions', title: 'College Admissions: Dean of Doom', desc: '', image: 'https://files.catbox.moe/hyf7a2.png', seed: 'college' },
  { id: 'evergreen', title: 'Evergreen', desc: 'https://v3.globalgamejam.org/2023/games/evergreen-0', image: 'https://files.catbox.moe/dzpjkn.png', seed: 'evergreen' },
];

export default function Games() {
  const navigate = useNavigate();

  return (
    <div className="pb-12 px-8 max-w-7xl mx-auto min-h-[calc(100vh-65px)]">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">Games</h1>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {games.map((game) => (
          <div 
            key={game.id}
            onClick={game.id !== 'evergreen' ? () => navigate(`/games/${game.id}`) : undefined}
            className={`group block max-w-4xl ${game.id !== 'evergreen' ? 'cursor-pointer' : ''}`}
          >
            <div className="aspect-video overflow-hidden mb-6 rounded-sm">
              <img 
                src={game.image || `https://picsum.photos/seed/${game.seed}/1200/675`} 
                alt={game.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${game.id !== 'evergreen' ? 'group-hover:scale-105' : ''}`}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className={`text-3xl font-bold text-black mb-3 transition-colors ${game.id !== 'evergreen' ? 'group-hover:text-[#0066ff]' : ''}`}>{game.title}</h3>
              {game.desc && (
                <p className="text-xl text-black/70 font-light">
                  {game.desc.startsWith('http') ? (
                    <a 
                      href={game.desc} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#0066ff] hover:underline break-all"
                    >
                      {game.desc}
                    </a>
                  ) : (
                    game.desc
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
