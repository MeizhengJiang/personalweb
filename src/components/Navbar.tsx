import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/art', label: 'Art' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black tracking-tight text-black hover:opacity-80 transition-opacity">
            My Portfolio
          </Link>
          
          <div className="flex items-center gap-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-opacity hover:opacity-100 ${
                    isActive ? 'opacity-100 text-black' : 'opacity-50 text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
