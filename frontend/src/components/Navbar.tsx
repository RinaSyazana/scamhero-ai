import { Shield, ChevronDown, User, Search, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo & Location */}
          <div className="flex items-center space-x-6 lg:space-x-10 w-1/4">
            <div className="flex items-center space-x-2">
              <Shield className="h-7 w-7 text-[#1D61D1]" />
              <span className="text-xl font-extrabold text-slate-800 tracking-tight hidden sm:block">ScamHero AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm font-semibold text-slate-600 cursor-pointer hover:text-[#1D61D1] transition-colors">
              <span>Kuala Lumpur, MY</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Central Search */}
          <div className="flex-1 max-w-xl px-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] sm:text-sm transition-all"
                placeholder="Search for numbers, URLs, or scam types..."
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end space-x-4 w-1/4">
            <div className="relative p-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </div>
            <div className="flex items-center justify-center h-9 w-9 bg-blue-50 text-[#1D61D1] rounded-full border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
              <User className="h-5 w-5" />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
