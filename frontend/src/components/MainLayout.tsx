import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { Home, Shield, MessageSquare, BookOpen, User, LucideIcon, LogOut } from 'lucide-react';
=======
import { Home, Shield, MessageSquare, BookOpen, LucideIcon, Settings, LogOut } from 'lucide-react';
>>>>>>> 09dbcdf57d760fda97e2ecf983f74135e5dec021
import { useAuth } from '../context/AuthContext';

interface TabItem {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
}

const tabs: TabItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/' },
  { id: 'detect', name: 'Detect Scam', icon: Shield, path: '/detect' },
  { id: 'community', name: 'Community', icon: MessageSquare, path: '/reports' },
  { id: 'education', name: 'Edu Scam', icon: BookOpen, path: '/education' },
  { id: 'profile', name: 'Profile', icon: User, path: '/profile' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
<<<<<<< HEAD

=======
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Track active tab path using useState
>>>>>>> 09dbcdf57d760fda97e2ecf983f74135e5dec021
  const [activePath, setActivePath] = useState<string>(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  const handleLogout = async () => {
<<<<<<< HEAD
    await logout();
    navigate('/login');
  };

  // Guest layout: no top header, no bottom nav — just content + login strip
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Guest: Login Strip at bottom */}
        <div className="fixed bottom-0 w-full bg-white border-t border-slate-100 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.04)] z-50 safe-area-pb">
          <div className="flex items-center justify-between px-5 h-16 gap-4">
            <p className="text-xs font-semibold text-slate-500">
              <span className="font-extrabold text-slate-700">ScamHero</span> — Sign in for full access to all features.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#1D61D1] hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-all flex-shrink-0"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated layout: top header + bottom nav with all tabs
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Top Header */}
      <header className="fixed top-0 w-full bg-white border-b border-slate-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] z-50">
        <div className="flex items-center justify-between px-5 h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#1D61D1] rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-extrabold text-slate-800 tracking-tight">ScamHero</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 px-3 py-2 rounded-xl transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Content (padded for top header + bottom nav) */}
      <main className="flex-1 overflow-y-auto pt-14 pb-24">
=======
    try {
      setIsDropdownOpen(false);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      
      {/* Floating Top Right User Profile Dropdown */}
      <div className="fixed top-4 right-6 z-50" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 overflow-hidden hover:ring-2 hover:ring-[#1D61D1] transition-all"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#1D61D1] font-bold text-lg">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings className="w-4 h-4 mr-2 text-slate-400" />
                Settings
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto pt-16 pb-24">
>>>>>>> 09dbcdf57d760fda97e2ecf983f74135e5dec021
        {children}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.03)] z-50 safe-area-pb">
        <div className="flex justify-around items-center h-20 px-1">
          {tabs.map((tab) => {
            const isActive = activePath === tab.path;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex flex-col items-center justify-center w-full h-full group"
              >
                {/* Top Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full flex justify-center">
                    <div className="w-8 h-[3px] bg-[#1D61D1] rounded-b-md"></div>
                  </div>
                )}

                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full mb-0.5 transition-all duration-300
                    ${isActive ? 'bg-blue-50 text-[#1D61D1]' : 'text-slate-400 group-hover:text-slate-500'}
                  `}
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                <span
                  className={`
                    text-[10px] font-bold tracking-wide transition-colors duration-300
                    ${isActive ? 'text-[#1D61D1]' : 'text-slate-400 group-hover:text-slate-500'}
                  `}
                >
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
