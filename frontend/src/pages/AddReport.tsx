import { X, Image as ImageIcon, Plus, XCircle, MapPin, Smartphone, Send, TrendingUp, Filter, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddReport = () => {
  return (
    <div className="max-w-7xl mx-auto pt-4 pb-24 px-2 lg:px-0">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Report</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Central Composition Workspace (65%) */}
        <div className="lg:w-[65%]">
          
          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
            
            {/* Top Bar */}
            <div className="flex justify-end p-4">
              <Link to="/reports" className="text-slate-400 hover:text-slate-600 transition-colors flex items-center text-sm font-semibold">
                Cancel <X className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="px-6 pb-6">
              
              {/* Author Identity Header */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200 mr-3">
                  UA
                </div>
                <span className="text-sm font-bold text-slate-700">@User_A</span>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left: Text Area & Media (flex-grow) */}
                <div className="flex-1 space-y-6">
                  
                  {/* Text Area */}
                  <div>
                    <textarea 
                      className="w-full text-slate-800 text-lg placeholder-slate-300 border-none focus:ring-0 resize-none outline-none leading-relaxed min-h-[120px]"
                      placeholder="Describe the scam alert (e.g., alert title, platform used, scammer tactics)..."
                    ></textarea>
                  </div>

                  {/* Multi-Image Upload Grid */}
                  <div className="space-y-2">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      
                      {/* Large Upload Box */}
                      <div className="w-32 h-32 flex-shrink-0 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-[#1D61D1]/50 hover:text-[#1D61D1] transition-all cursor-pointer group">
                        <ImageIcon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-center px-2">Add First Image/Media</span>
                      </div>
                      
                      {/* Preview Slot 1 */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <button className="absolute top-1 right-1 bg-white rounded-full p-0.5 text-slate-400 hover:text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Preview Slot 2 */}
                      <div className="relative w-24 h-24 flex-shrink-0 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-50 cursor-pointer">
                        <Plus className="w-6 h-6" />
                      </div>

                    </div>
                    <p className="text-[11px] font-semibold text-slate-400">
                      You can upload up to 5 images or videos (max 20MB per file).
                    </p>
                  </div>

                </div>

                {/* Right: Contextual Metadata Section */}
                <div className="md:w-56 flex-shrink-0 space-y-5">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> Location/Region
                    </label>
                    <div className="relative">
                      <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all text-slate-700 appearance-none cursor-pointer">
                        <option>Current Location (KL)</option>
                        <option>Selangor, MY</option>
                        <option>Penang, MY</option>
                        <option>Global</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                        <ChevronDownIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center">
                      <Smartphone className="w-3.5 h-3.5 mr-1" /> Platform/Channel
                    </label>
                    <div className="relative">
                      <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1D61D1]/20 focus:border-[#1D61D1] transition-all text-slate-700 appearance-none cursor-pointer">
                        <option>WhatsApp</option>
                        <option>Telegram</option>
                        <option>Facebook Marketplace</option>
                        <option>SMS</option>
                        <option>Email</option>
                        <option>Phone Call</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                        <ChevronDownIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start">
                    <AlertCircle className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-700 leading-tight">Initial Status:</p>
                      <p className="text-[10px] font-semibold text-amber-600 mt-0.5">Awaiting AI Review</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Workspace Footer & Action Triggers */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 sm:px-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
              <button className="w-full sm:w-auto bg-transparent border border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-700 font-bold py-2.5 px-5 rounded-xl text-sm transition-colors duration-200">
                Discard Draft
              </button>
              <button className="w-full sm:w-auto bg-[#1D61D1] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-sm shadow-blue-500/20 flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </button>
            </div>

          </div>
        </div>

        {/* Supporting Right Sidebar (35%) */}
        <div className="lg:w-[35%] space-y-6">
          
          {/* Active Context: Trending Scams */}
          <div className="bg-white rounded-[16px] p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
              Trending Scams Context
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-4">
              AI has detected a surge in the following scams. Check if your report matches these vectors.
            </p>
            <div className="space-y-3">
              {[
                { tag: '#FakeParcelDelivery', growth: '+34%' },
                { tag: '#GovernmentAidScam', growth: '+22%' },
                { tag: '#CryptoInvestment', growth: '+15%' },
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

          {/* Passive Analytics / Filters Info */}
          <div className="bg-slate-50 rounded-[16px] p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              System Guidelines
            </h3>
            <ul className="text-xs font-medium text-slate-500 space-y-2 mt-4">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 mr-2 flex-shrink-0"></div>
                Ensure screenshots do not contain personal sensitive information (e.g. full IC number).
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 mr-2 flex-shrink-0"></div>
                The AI Copilot will automatically redact visible phone numbers not linked to the scam.
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 mr-2 flex-shrink-0"></div>
                Reports are typically verified by AI within 2 minutes of submission.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

// Helper component for chevron down since it wasn't imported at top to avoid conflict
function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default AddReport;
