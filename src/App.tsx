import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black font-sans selection:bg-[#0066ff]/30">
        <Navbar />
        
        <main className="w-full h-full pt-[65px]">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}
