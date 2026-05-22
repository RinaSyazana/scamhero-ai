import { ChevronUp, ChevronDown, Image as ImageIcon, Info, ChevronDown as ChevronDownDropdown, MapPin, Clock, Smartphone, ThumbsUp, ThumbsDown, TrendingUp, Calendar, Users, FileText, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityReport = () => {
  return (
    <div className="max-w-7xl mx-auto pt-4 pb-20 px-2 lg:px-0">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Feed (Central Column - 65%) */}
        <div className="lg:w-[65%] space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Community Scam Reports</h1>
            <Link to="/add-report" className="bg-[#1D61D1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm shadow-blue-500/20 flex items-center">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Report
            </Link>
          </div>
          
          {/* Report Cards Thread */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              
              <div className="flex flex-col sm:flex-row p-6 gap-6">
                
                {/* Left (Profile & Voting) */}
                <div className="flex sm:flex-col items-center justify-start sm:justify-start gap-3 sm:w-16 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                    UA
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="p-1 text-slate-400 hover:text-[#1D61D1] transition-colors"><ChevronUp className="w-5 h-5" /></button>
                    <span className="text-sm font-bold text-slate-700">142</span>
                    <button className="p-1 text-slate-400 hover:text-rose-500 transition-colors"><ChevronDown className="w-5 h-5" /></button>
                  </div>
                  <span className="text-xs font-bold text-slate-500 hidden sm:block truncate w-full text-center mt-2">@User_A</span>
                </div>

                {/* Center (Alert Content) */}
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight">ALERT: KL Parking Scam</h2>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Received a suspicious WhatsApp message claiming I had an unpaid parking ticket in Kuala Lumpur. It included a link to a fake DBKL payment portal asking for credit card details. The URL was slightly misspelled. Do not click!
                  </p>
                  
                  {/* Media Attachment Thumbnail */}
                  <div className="w-32 h-24 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-4 cursor-pointer hover:bg-slate-50 transition-colors">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-semibold">fake_portal_qr.jpg</span>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-slate-500 space-x-4">
                    <button className="flex items-center hover:text-slate-700 transition-colors">
                      <Info className="w-4 h-4 mr-1" /> View Analysis
                    </button>
                    <button className="flex items-center hover:text-slate-700 transition-colors">
                      More <ChevronDownDropdown className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Right (Metadata & Status) */}
                <div className="sm:w-48 flex-shrink-0 flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                  <div className="space-y-3">
                    <div className="flex items-start text-xs text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="font-medium">Today, 13:30</span>
                    </div>
                    <div className="flex items-start text-xs text-slate-600">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="font-medium">Shah Alam, Selangor</span>
                    </div>
                    <div className="flex items-start text-xs text-slate-600">
                      <Smartphone className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="font-medium">WhatsApp</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 sm:mt-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-100 whitespace-nowrap shadow-sm shadow-rose-500/10">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Verified Scam
                    </span>
                  </div>
                </div>

              </div>

              {/* Card Footer (Interaction Options) */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center space-x-6">
                <button className="flex items-center text-sm font-bold text-[#1D61D1] hover:text-blue-800 transition-colors group">
                  <ThumbsUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>240 Helpful</span>
                </button>
                <button className="flex items-center text-sm font-bold text-rose-400 hover:text-rose-600 transition-colors group">
                  <ThumbsDown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>12 Not Helpful</span>
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* Sidebar (Right Column - 35%) */}
        <div className="lg:w-[35%] space-y-6 lg:mt-11">
          
          {/* Widget 1: Trending Scams */}
          <div className="bg-white rounded-[16px] p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
              Trending Scams
            </h3>
            <div className="space-y-3">
              {[
                { tag: '#FakeParcelDelivery', growth: '+34%' },
                { tag: '#GovernmentAidScam', growth: '+22%' },
                { tag: '#CryptoInvestment', growth: '+15%' },
                { tag: '#UnpaidTollsSMS', growth: '+12%' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors -mx-2">
                  <span className="text-sm font-bold text-slate-700">{item.tag}</span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md flex items-center">
                    ↗ {item.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Search Filters */}
          <div className="bg-white rounded-[16px] p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-5">Search Filters</h3>
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Keyword</label>
                <input type="text" placeholder="e.g. tracking number" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Date Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="text" placeholder="Last 7 Days" className="w-full pl-9 border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Platform</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all text-slate-700 appearance-none">
                    <option>All Platforms</option>
                    <option>WhatsApp</option>
                    <option>SMS</option>
                    <option>Telegram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Severity</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all text-slate-700 appearance-none">
                    <option>Any Risk</option>
                    <option>High Risk</option>
                    <option>Verified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Location</label>
                <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all text-slate-700 appearance-none">
                  <option>Kuala Lumpur, MY</option>
                  <option>Selangor, MY</option>
                  <option>Global</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-3">
                <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  Filter
                </button>
                <button className="flex-1 bg-[#1D61D1] text-white font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                  Search
                </button>
              </div>

            </div>
          </div>

          {/* Widget 3: Platform Metrics */}
          <div className="bg-white rounded-[16px] p-5 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                <Users className="w-5 h-5 text-[#1D61D1] mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Users</span>
                <span className="text-sm font-extrabold text-slate-800">8.9K</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                <FileText className="w-5 h-5 text-amber-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Reports</span>
                <span className="text-sm font-extrabold text-slate-800">42K</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Solved</span>
                <span className="text-sm font-extrabold text-slate-800">11K</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityReport;
