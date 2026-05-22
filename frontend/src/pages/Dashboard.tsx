import { ShieldAlert, ShieldCheck, Activity, BarChart3, AlertTriangle, Clock, Zap } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-4 px-2 lg:px-0">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Real-time scam detection and community analytics.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (65%) */}
        <div className="lg:w-[65%] space-y-6">
          
          {/* Hero Analytics Card */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Community Risk: Elevated</span>
              </div>
              <button className="bg-[#1D61D1] hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors duration-200 shadow-md shadow-blue-500/20 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Run Instant AI Scan
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wide">Total Scam Detections</p>
                <div className="flex items-end space-x-3">
                  <span className="text-5xl font-extrabold text-rose-600 tracking-tight">42,109</span>
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md mb-1">+12%</span>
                </div>
              </div>
              <div>
                <p className="text-slate-500 font-semibold text-sm mb-1 uppercase tracking-wide">Total Safe Detections</p>
                <div className="flex items-end space-x-3">
                  <span className="text-5xl font-extrabold text-[#1D61D1] tracking-tight">184,520</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scam Statistics Visualization Card */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-slate-400" />
                Scam Vectors & Frequency Analytics
              </h2>
              <div className="bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                <span className="text-xs font-bold text-amber-700">SMS Scams up 14% today</span>
              </div>
            </div>
            
            {/* Fake Bar Chart */}
            <div className="h-64 flex items-end space-x-2 sm:space-x-6 mb-6">
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-slate-100 rounded-t-xl h-[40%] transition-all group-hover:bg-slate-200"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-3">Phishing</span>
              </div>
              <div className="flex-1 flex flex-col items-center group relative">
                <div className="absolute -top-8 bg-amber-100 text-amber-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md hidden sm:block">High</div>
                <div className="w-full bg-rose-500 rounded-t-xl h-[85%] shadow-lg shadow-rose-500/20"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 mt-3">SMS</span>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-slate-100 rounded-t-xl h-[60%] transition-all group-hover:bg-slate-200"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-3">WhatsApp</span>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-slate-100 rounded-t-xl h-[30%] transition-all group-hover:bg-slate-200"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-3 truncate w-full text-center">E-Comm</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 border-t border-slate-100 pt-4">
              <div className="flex items-center text-xs font-bold text-slate-500"><div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div> Critical Volume</div>
              <div className="flex items-center text-xs font-bold text-slate-500"><div className="w-3 h-3 rounded-full bg-slate-200 mr-2"></div> Standard Volume</div>
            </div>
          </div>

          {/* Trending Keywords Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Trending Scam Keywords (AI Flagged)</h2>
            <div className="flex flex-wrap gap-2">
              {['TaxRefund', 'ParcelDelivery', 'CryptoBonus', 'AccountLocked', 'UrgentPayment'].map(tag => (
                <span key={tag} className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
        </div>

        {/* Right Column (35%) */}
        <div className="lg:w-[35%] space-y-6">
          
          {/* Recent Scam Alerts Stack */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-rose-500" />
              Live Threat Alerts
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Fake Bank Phishing Link', sub: 'Circulating via WhatsApp', time: '2m ago', type: 'high' },
                { title: 'Impersonation Call', sub: 'Reported in Global Region', time: '15m ago', type: 'medium' },
                { title: 'Malicious Invoice PDF', sub: 'Email attachment flagged', time: '1h ago', type: 'high' }
              ].map((alert, i) => (
                <div key={i} className="flex items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:border-slate-200 hover:shadow-sm cursor-pointer">
                  <div className={`p-2 rounded-xl mr-4 flex-shrink-0 ${alert.type === 'high' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">{alert.title}</h3>
                    <p className="text-slate-500 text-xs mt-1 font-medium">{alert.sub}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {alert.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Activity Feed Card */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-[#1D61D1]"></div>
            
            <div className="flex justify-between items-center mb-6 mt-2">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-[#1D61D1]" />
                Live Copilot Pulse
              </h2>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
              </div>
            </div>
            
            <div className="space-y-5">
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
                  UA
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">User A flagged a <span className="font-bold text-slate-900">WhatsApp number</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">Just now</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1D61D1] flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Copilot blocked malicious <span className="font-bold text-slate-900">URL in KL</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">1 min ago</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0">
                  UB
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">User B verified an <span className="font-bold text-slate-900">Email as Safe</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">3 mins ago</p>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
