import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shield, MessageSquare, BookOpen, LucideIcon, Settings, LogOut } from 'lucide-react';
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
  { id: 'community', name: 'Community Report', icon: MessageSquare, path: '/reports' },
  { id: 'education', name: 'Edu Scam', icon: BookOpen, path: '/education' },
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

  // Sync state if location changes from outside the tab bar
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
        {children}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-100 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.03)] z-50 safe-area-pb">
        <div className="flex justify-around items-center h-20 px-2">
          {tabs.map((tab) => {
            const isActive = activePath === tab.path;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex flex-col items-center justify-center w-full h-full group"
              >
                {/* Top Active Indicator Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full flex justify-center">
                    <div className="w-10 h-[3px] bg-[#1D61D1] rounded-b-md"></div>
                  </div>
                )}
                
                {/* Icon Container with active badge tint */}
                <div 
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full mb-1 transition-all duration-300
                    ${isActive ? 'bg-blue-50 text-[#1D61D1]' : 'text-slate-400 group-hover:text-slate-500'}
                  `}
                >
                  <Icon 
                    className="w-6 h-6" 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                </div>
                
                {/* Text Label */}
                <span 
                  className={`
                    text-[11px] font-bold tracking-wide transition-colors duration-300
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
