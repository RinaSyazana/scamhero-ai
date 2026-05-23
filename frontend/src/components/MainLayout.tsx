import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shield, MessageSquare, BookOpen, User, LucideIcon, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TabItem {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
  isSpecial?: boolean; // Flag for special highlighted tab (Detect Scam)
}

const tabs: TabItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/' },
  { id: 'community', name: 'Community', icon: MessageSquare, path: '/reports' },
  { id: 'detect', name: 'Detect Scam', icon: Shield, path: '/detect', isSpecial: true },
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

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track active tab path using useState
  const [activePath, setActivePath] = useState<string>(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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
    try {
      setIsDropdownOpen(false);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  // Unified gradient background for all pages
  const getPageBackground = () => {
    return isDarkMode
      ? 'bg-gradient-to-br from-black via-gray-950 to-slate-950'
      : 'bg-gradient-to-br from-blue-50 via-sky-50/50 to-indigo-50/30';
  };

  // Guest layout: no top header, no bottom nav — just content + login strip
  if (!user) {
    const guestBackground = getPageBackground();
    return (
      <div className={`min-h-screen ${guestBackground} dark:bg-slate-900 dark:text-white flex flex-col font-sans`}>
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Guest: Login Strip at bottom */}
        <div className="fixed bottom-0 w-full bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-t border-purple-100 dark:border-slate-800 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.04)] z-50 safe-area-pb">
          <div className="flex items-center justify-between px-4 h-16 gap-4">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="font-extrabold bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">ScamHero</span> — Sign in for full access to all features.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md shadow-blue-500/25 transition-all flex-shrink-0"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated layout: floating user dropdown + bottom nav with all tabs
  const pageBackground = getPageBackground();

  return (
    <div className={`min-h-screen ${pageBackground} dark:bg-slate-900 dark:text-white flex flex-col font-sans relative transition-all duration-500`}>

      {/* Animated Background Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-200/30 dark:bg-cyan-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Top Right User Profile Dropdown */}
      <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md border border-purple-100 dark:border-slate-700 overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent font-bold text-lg">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-slate-900/80 backdrop-blur-md rounded-lg shadow-xl border border-blue-100 dark:border-blue-500/30 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
            <div className="px-4 py-3 border-b border-purple-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex items-center">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 mr-2 text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 mr-2 text-amber-500" />
                  )}
                  Theme
                </div>
                <div className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors duration-300 ${isDarkMode ? 'bg-blue-500' : 'bg-slate-300'}`}>
                  <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Viewport - REDUCED PADDING */}
      <main className="flex-1 overflow-y-auto pt-2 lg:pt-4 pb-24 relative z-10 px-0">
        {children}
      </main>

      {/* Fixed Bottom Navigation Bar - Redesigned with Special Center Tab */}
      <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border-t border-blue-100/50 dark:border-blue-500/30 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] shadow-[0_-8px_25px_-5px_rgba(0,0,0,0.05)] z-50 safe-area-pb">
        <div className="flex justify-around items-center h-16 px-1 relative">
          {tabs.map((tab, index) => {
            const isActive = activePath === tab.path;
            const isHovered = hoveredTab === tab.id;
            const Icon = tab.icon;

            // Special styling for Detect Scam tab (center position)
            const isSpecial = tab.isSpecial;

            // Determine position for special styling
            const isCenter = index === 2; // Detect Scam is at index 2

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative flex flex-col items-center justify-center transition-all duration-300
                  ${isCenter ? 'z-10 -mt-4' : 'w-full h-full group'}
                  ${isCenter ? 'w-auto px-2' : 'flex-1'}
                `}
              >
                {/* Special Center Tab (Detect Scam) - Always Highlighted / Hero Style */}
                {isSpecial ? (
                  <>
                    {/* Glow effect behind the button */}
                    <div className={`
                      absolute inset-0 rounded-full blur-xl transition-opacity duration-300
                      ${isActive ? 'opacity-100' : 'opacity-60'}
                      bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500
                    `} style={{ transform: 'scale(0.9)' }}></div>

                    {/* Main floating button */}
                    <div className={`
                      relative flex flex-col items-center justify-center transition-all duration-300
                      ${isActive
                        ? 'transform scale-110'
                        : isHovered
                          ? 'transform scale-105'
                          : 'transform scale-100'}
                    `}>
                      <div className={`
                        w-14 h-14 rounded-full flex items-center justify-center shadow-lg
                        transition-all duration-300 relative overflow-hidden
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 shadow-blue-500/50'
                          : isHovered
                            ? 'bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 shadow-blue-400/40'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md'
                        }
                      `}>
                        {/* Animated ring pulse for active state */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                        )}
                        <Icon className={`
                          w-7 h-7 transition-all duration-300
                          ${isActive ? 'text-white drop-shadow-md' : 'text-white'}
                        `} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <span className={`
                        text-[10px] font-bold tracking-wide mt-1 transition-all duration-300
                        ${isActive
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400'
                          : isHovered
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400'}
                      `}>
                        {tab.name}
                      </span>
                    </div>

                    {/* Active bottom dot for special tab */}
                    {isActive && (
                      <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Top Active Indicator with gradient */}
                    {isActive && (
                      <div className="absolute top-0 left-0 w-full flex justify-center">
                        <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 rounded-b-md"></div>
                      </div>
                    )}

                    <div
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-xl mb-0.5 transition-all duration-300
                        ${isActive
                          ? 'bg-blue-100 text-blue-600 dark:bg-slate-800/80 dark:text-blue-400 shadow-md dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                          : isHovered
                            ? 'bg-blue-50/80 text-blue-500 dark:bg-slate-800/50 dark:text-blue-400 transform scale-105'
                            : 'text-slate-400 dark:text-slate-500'
                        }
                      `}
                    >
                      <Icon
                        className="w-5 h-5 transition-all duration-300"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>

                    <span
                      className={`
                        text-[10px] font-bold tracking-wide transition-all duration-300
                        ${isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : isHovered
                            ? 'text-blue-500 dark:text-blue-400'
                            : 'text-slate-400 dark:text-slate-500'}
                      `}
                    >
                      {tab.name}
                    </span>

                    {/* Active dot indicator for mobile */}
                    {isActive && (
                      <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;