import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shield, MessageSquare, BookOpen, LucideIcon } from 'lucide-react';

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
  
  // Track active tab path using useState
  const [activePath, setActivePath] = useState<string>(location.pathname);

  // Sync state if location changes from outside the tab bar
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto pb-24">
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
