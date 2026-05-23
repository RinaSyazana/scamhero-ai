import { ShieldAlert, ShieldCheck, Activity, BarChart3, AlertTriangle, Clock, Zap, MessageSquare, Shield, BookOpen, Newspaper, TrendingUp, Users, Eye, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data for charts
  const scamData = [
    { name: 'Phishing', percentage: 40, color: 'from-blue-500 to-blue-400', height: '40%' },
    { name: 'SMS', percentage: 85, color: 'from-rose-500 to-rose-400', height: '85%', alert: true },
    { name: 'WhatsApp', percentage: 60, color: 'from-emerald-500 to-emerald-400', height: '60%' },
    { name: 'E-Commerce', percentage: 30, color: 'from-purple-500 to-purple-400', height: '30%' },
  ];

  const recentAlerts = [
    { title: "Fake Banking App Alert", time: "5 mins ago", severity: "Critical" },
    { title: "SMS Spoofing Campaign", time: "23 mins ago", severity: "High" },
    { title: "WhatsApp Impersonation", time: "1 hour ago", severity: "Medium" },
  ];

  return (
    <div className="w-full bg-transparent">
      <div className="w-full px-2 sm:px-4 py-2 lg:py-4">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 shadow-sm mb-3">
                <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">Live System Overview</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-slate-100 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent tracking-tight">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium mt-2 max-w-2xl">
                Real-time scam detection analytics & monitoring center
              </p>
            </div>

            <button
              onClick={() => navigate('/detect')}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Run Instant AI Scan
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stats Grid - Added dark mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Detections */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/50 dark:to-red-950/50 rounded-xl">
                <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">42,109</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total Scam Detections</p>
            <div className="mt-3 h-1 bg-rose-100 dark:bg-rose-900/50 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"></div>
            </div>
          </div>

          {/* Safe Detections */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">184,520</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Total Safe Detections</p>
            <div className="mt-3 h-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-xl">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">Live</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">3</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Active Critical Alerts</p>
            <div className="mt-3 h-1 bg-amber-100 dark:bg-amber-900/50 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Community Reports */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-lg">+23</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,847</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Community Reports Today</p>
            <div className="mt-3 h-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Chart Area (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Scam Vectors Chart - Added dark mode */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Scam Vectors & Frequency
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Distribution of scam types in last 24 hours</p>
                </div>
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">⚠️ SMS Scams up 14% today</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-80 flex items-end gap-4 mb-6">
                {scamData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3 h-full">
                    <div className="relative w-full flex-1 flex items-end">
                      {item.alert && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                          ⚠️ Critical
                        </div>
                      )}
                      <div
                        className={`w-full bg-gradient-to-t ${item.color} rounded-t-xl transition-all duration-300 hover:opacity-90 cursor-pointer shadow-md`}
                        style={{ height: item.height }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-400"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Critical Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Standard Volume</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed - FIXED: Added dark mode */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Recent Scam Alerts
                </h2>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800/50 dark:to-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${alert.severity === 'Critical' ? 'bg-rose-100 dark:bg-rose-950/50' :
                          alert.severity === 'High' ? 'bg-amber-100 dark:bg-amber-950/50' : 'bg-blue-100 dark:bg-blue-950/50'
                        }`}>
                        <AlertTriangle className={`h-4 w-4 ${alert.severity === 'Critical' ? 'text-rose-600 dark:text-rose-400' :
                            alert.severity === 'High' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                          }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{alert.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{alert.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${alert.severity === 'Critical' ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400' :
                        alert.severity === 'High' ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                      }`}>
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Access & News (1/3 width on desktop) */}
          <div className="space-y-8">

            {/* Quick Access Utilities - FIXED: Added dark mode */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Quick Access
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/reports')}
                  className="w-full group flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800/50 dark:to-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform mr-4">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Community Report</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">View and submit scam reports</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </button>

                <button
                  onClick={() => navigate('/detect')}
                  className="w-full group flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800/50 dark:to-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform mr-4">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Scam Detection</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">AI analysis of suspicious content</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                </button>

                <button
                  onClick={() => navigate('/education')}
                  className="w-full group flex items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800/50 dark:to-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform mr-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Edu Scam</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Learn to identify scam tactics</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Breaking News Alert - FIXED: Added dark mode */}
            <div className="bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 dark:from-rose-950/30 dark:via-red-950/30 dark:to-orange-950/30 rounded-2xl p-6 shadow-lg border border-rose-200 dark:border-rose-800/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/10 to-red-400/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-400/5 to-orange-400/5 rounded-tr-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">Breaking Alert</h3>
                    <p className="text-xs text-rose-600 dark:text-rose-500">Scam in the News</p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 mb-4 border border-rose-200 dark:border-rose-800/50 shadow-sm">
                  <p className="text-base font-extrabold bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent leading-tight">
                    "Duped again: Retiree loses over RM100k to scam recovery scheme"
                  </p>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  A vulnerable Malaysian retiree was double-scammed by a fraudulent recovery platform, exploiting their urgency to reclaim lost funds.
                </p>

                <div className="mt-4 flex items-center justify-between p-3 bg-rose-100/80 dark:bg-rose-950/50 rounded-xl border border-rose-200 dark:border-rose-800/50">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Total Loss Reported</span>
                  <span className="font-extrabold text-rose-700 dark:text-rose-400 text-xl tracking-tight">-RM100,000+</span>
                </div>

                <button className="mt-4 w-full text-center text-sm font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 transition-colors">
                  Read Full Story →
                </button>
              </div>
            </div>

            {/* Community Risk Indicator - FIXED: Added dark mode */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 shadow-sm border border-amber-200 dark:border-amber-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-bold text-amber-800 dark:text-amber-300">Community Risk Level</h3>
                </div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-200 dark:bg-amber-900/50 px-2 py-1 rounded-lg animate-pulse">ELEVATED</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                Unusual scam activity detected in your area. Stay vigilant and verify before trusting any unsolicited messages.
              </p>
              <div className="h-2 bg-amber-200 dark:bg-amber-800/50 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;