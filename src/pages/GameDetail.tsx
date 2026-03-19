import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function GameDetail() {
  const { id } = useParams();

  const gamesData: Record<string, any> = {
    'college-admissions': {
      title: 'College Admissions: Dean of Doom',
      desc: '',
      longDesc: `这是一个以大学招生为背景的模拟游戏，在游戏里玩家要扮演一个“野鸡大学”的招生官，在无尽的网页bug，垃圾广告弹窗，学术造假与贿赂中去根据千变万化的录取条件与学生档案决定需要被录取与拒绝的申请学生。
      同时游戏会根据玩家的不同抉择情况衍生出多种诸如升职，降职，被解雇，辞职，成为合作伙伴或是被抓捕等等多种不同结局。`,
      videoUrl: 'https://www.youtube.com/embed/q3NNq2lNPbU',
      posterUrl: 'https://files.catbox.moe/hyf7a2.png'
    },
    'evergreen': {
      title: 'Evergreen',
      desc: 'https://v3.globalgamejam.org/2023/games/evergreen-0',
      longDesc: `Global Game Jam 2023 参赛作品。
      
      Evergreen 是一款关于生命、成长与自然循环的游戏。玩家需要在一片荒芜的土地上，通过种植和培育各种植物，恢复生态平衡。
      
      游戏特色：
      - 治愈系的视觉风格
      - 轻松的放置与养成玩法
      - 动态的生态系统模拟
      
      本项目在 48 小时内完成，团队成员紧密合作，克服了时间紧迫的困难，最终呈现出这款充满绿意的小游戏。`,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      posterUrl: 'https://picsum.photos/seed/evergreen/1200/675'
    }
  };

  const game = gamesData[id || ''] || gamesData['college-admissions'];

  return (
    <div className="pb-24 px-8 max-w-5xl mx-auto min-h-[calc(100vh-65px)]">
      <div className="mb-8 pt-4">
        <Link 
          to="/games" 
          className="inline-flex items-center text-black/50 hover:text-black transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回游戏列表
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">{game.title}</h1>
        {game.desc && (
          <p className="text-xl text-black/70 font-light">
            {game.desc.startsWith('http') ? (
              <a 
                href={game.desc} 
                target="_blank" 
                rel="noopener noreferrer"
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

      <div className="aspect-video w-full bg-black rounded-sm overflow-hidden mb-12 shadow-lg">
        {game.videoUrl.includes('youtube.com') ? (
          <iframe 
            className="w-full h-full"
            src={game.videoUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        ) : (
          <video 
            controls 
            poster={game.posterUrl}
            className="w-full h-full object-cover"
          >
            <source src={game.videoUrl} type="video/mp4" />
            您的浏览器不支持 HTML5 视频。
          </video>
        )}
      </div>

      <div className="prose prose-neutral prose-lg max-w-none font-light leading-relaxed">
        {game.longDesc.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph.trim()}</p>
        ))}
      </div>
    </div>
  );
}
