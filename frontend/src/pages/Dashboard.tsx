import { ShieldAlert, ShieldCheck, Activity, BarChart3, AlertTriangle, Clock, Zap } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-4 px-2 lg:px-0">

      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">System Overview</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Real-time scam detection and community analytics.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column (65%) */}
        <div className="lg:w-[65%] space-y-6">

          {/* Hero Analytics Card */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-[24px] p-8 shadow-lg shadow-indigo-100/30 border border-indigo-100">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 rounded-full border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Community Risk: Elevated</span>
              </div>
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-500/25 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Run Instant AI Scan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-4 -m-2">
                <p className="text-slate-600 font-semibold text-sm mb-1 uppercase tracking-wide">Total Scam Detections</p>
                <div className="flex items-end space-x-3">
                  <span className="text-5xl font-extrabold text-rose-600 tracking-tight">42,109</span>
                  <span className="text-sm font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded-md mb-1">+12%</span>
                </div>
              </div>
              <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 -m-2">
                <p className="text-slate-600 font-semibold text-sm mb-1 uppercase tracking-wide">Total Safe Detections</p>
                <div className="flex items-end space-x-3">
                  <span className="text-5xl font-extrabold text-emerald-600 tracking-tight">184,520</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scam Statistics Visualization Card */}
          <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 rounded-[24px] p-8 shadow-lg shadow-gray-100/30 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-indigo-500" />
                Scam Vectors & Frequency Analytics
              </h2>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1 rounded-lg border border-amber-200">
                <span className="text-xs font-bold text-amber-700">SMS Scams up 14% today</span>
              </div>
            </div>

            {/* Fake Bar Chart */}
            <div className="h-64 flex items-end space-x-2 sm:space-x-6 mb-6">
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-xl h-[40%] transition-all group-hover:from-blue-500 group-hover:to-blue-400 shadow-md"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-3">Phishing</span>
              </div>
              <div className="flex-1 flex flex-col items-center group relative">
                <div className="absolute -top-8 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md hidden sm:block shadow-sm">High</div>
                <div className="w-full bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-xl h-[85%] shadow-lg shadow-rose-500/30"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 mt-3">SMS</span>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-xl h-[60%] transition-all group-hover:from-emerald-500 group-hover:to-emerald-400 shadow-md"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-3">WhatsApp</span>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-xl h-[30%] transition-all group-hover:from-purple-500 group-hover:to-purple-400 shadow-md"></div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-3 truncate w-full text-center">E-Comm</span>
              </div>
            </div>

            <div className="flex justify-center space-x-6 border-t border-gray-200 pt-4">
              <div className="flex items-center text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 mr-2 shadow-sm"></div> Critical Volume</div>
              <div className="flex items-center text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 mr-2 shadow-sm"></div> Standard Volume</div>
            </div>
          </div>

          {/* Trending Keywords Card */}
          <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-[20px] p-6 shadow-lg shadow-indigo-100/30 border border-indigo-100">
            <h2 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Trending Scam Keywords (AI Flagged)</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-1.5 rounded-full text-xs font-bold border border-rose-200 hover:from-rose-200 hover:to-pink-200 transition-all cursor-pointer shadow-sm">#TaxRefund</span>
              <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-200 hover:from-amber-200 hover:to-orange-200 transition-all cursor-pointer shadow-sm">#ParcelDelivery</span>
              <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-200 hover:from-emerald-200 hover:to-green-200 transition-all cursor-pointer shadow-sm">#CryptoBonus</span>
              <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold border border-purple-200 hover:from-purple-200 hover:to-indigo-200 transition-all cursor-pointer shadow-sm">#AccountLocked</span>
              <span className="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-bold border border-red-200 hover:from-red-200 hover:to-rose-200 transition-all cursor-pointer shadow-sm">#UrgentPayment</span>
            </div>
          </div>

        </div>

        {/* Right Column (35%) */}
        <div className="lg:w-[35%] space-y-6">

          {/* Recent Scam Alerts Stack */}
          <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 rounded-[24px] p-6 shadow-lg shadow-gray-100/30 border border-gray-100">
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
                <div key={i} className={`flex items-start p-4 rounded-2xl transition-all hover:shadow-md cursor-pointer ${alert.type === 'high'
                    ? 'bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 hover:from-rose-100 hover:to-red-100'
                    : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:from-amber-100 hover:to-orange-100'
                  }`}>
                  <div className={`p-2 rounded-xl mr-4 flex-shrink-0 ${alert.type === 'high'
                      ? 'bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-md shadow-rose-500/30'
                      : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30'
                    }`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-sm ${alert.type === 'high' ? 'text-rose-800' : 'text-amber-800'
                      }`}>{alert.title}</h3>
                    <p className="text-slate-600 text-xs mt-1 font-medium">{alert.sub}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap ml-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {alert.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Activity Feed Card */}
          <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-[24px] p-6 shadow-lg shadow-indigo-100/30 border border-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="flex justify-between items-center mb-6 mt-2">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-indigo-500" />
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

              <div className="flex items-start group bg-white/50 rounded-xl p-3 -m-1 hover:bg-white/80 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 shadow-md shadow-indigo-500/30">
                  UA
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">User A flagged a <span className="font-bold text-indigo-600">WhatsApp number</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">Just now</p>
                </div>
              </div>

              <div className="flex items-start group bg-white/50 rounded-xl p-3 -m-1 hover:bg-white/80 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 shadow-md shadow-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Copilot blocked malicious <span className="font-bold text-emerald-600">URL in KL</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">1 min ago</p>
                </div>
              </div>

              <div className="flex items-start group bg-white/50 rounded-xl p-3 -m-1 hover:bg-white/80 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 shadow-md shadow-blue-500/30">
                  UB
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">User B verified an <span className="font-bold text-blue-600">Email as Safe</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">3 mins ago</p>
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