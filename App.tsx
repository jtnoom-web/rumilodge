
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { MembershipTier, UserProfile } from './types';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NewQuestion from './pages/NewQuestion';
import Membership from './pages/Membership';
import Login from './pages/Login';
import ChatDetail from './pages/ChatDetail';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('rumi_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem('rumi_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rumi_user');
  };

  const updateTier = (tier: MembershipTier) => {
    if (user) {
      const updated = { ...user, tier };
      setUser(updated);
      localStorage.setItem('rumi_user', JSON.stringify(updated));
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Login onLogin={handleLogin} />} />
            <Route path="/new" element={user ? <NewQuestion user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/membership" element={user ? <Membership user={user} onUpgrade={updateTier} /> : <Login onLogin={handleLogin} />} />
            <Route path="/chat/:id" element={user ? <ChatDetail user={user} /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

const Navbar: React.FC<{ user: UserProfile; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Journal' },
    { path: '/new', label: 'Seek Guidance' },
    { path: '/membership', label: 'Tiers' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-emerald-900 text-stone-100 border-b border-emerald-800 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-emerald-900 font-bold">R</span>
          </div>
          <span className="font-cinzel text-xl tracking-widest hidden sm:block">Rumi Lodge</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-amber-400 transition-colors font-semibold ${location.pathname === link.path ? 'text-amber-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-emerald-700 mx-2"></div>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-2 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full font-bold">
              {user.tier}
            </span>
            <button onClick={onLogout} className="text-sm text-stone-400 hover:text-white transition-colors">Logout</button>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-emerald-950 border-t border-emerald-800 p-4 space-y-4">
           {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-amber-400 py-2 border-b border-emerald-900"
            >
              {link.label}
            </Link>
          ))}
          <button onClick={onLogout} className="block w-full text-left py-2 text-stone-400">Logout</button>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-stone-900 text-stone-400 py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="font-cinzel text-amber-500 mb-2">rumilodge.online</div>
      <p className="max-w-md mx-auto italic text-sm mb-6">"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."</p>
      <div className="flex justify-center space-x-6 text-xs uppercase tracking-widest mb-6">
        <a href="#" className="hover:text-amber-500">Ethics</a>
        <a href="#" className="hover:text-amber-500">Privacy</a>
        <a href="#" className="hover:text-amber-500">Monastery</a>
      </div>
      <p className="text-[10px]">&copy; 2024 Rumi Lodge. All rights reserved.</p>
    </div>
  </footer>
);

export default App;
