import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Image as ImageIcon, Info, ChevronDown as ChevronDownDropdown, MapPin, Clock, Smartphone, ThumbsUp, ThumbsDown, TrendingUp, Calendar, Users, FileText, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import { ScamReport } from '../types';

const CommunityReport = () => {
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/api/reports');
        setReports(response.data);
      } catch (err: any) {
        console.error('Failed to fetch reports:', err);
        setError('Failed to load community reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Helper to format date elapsed
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

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

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1D61D1]"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white rounded-[16px] border border-slate-200 p-12 text-center text-slate-500">
              <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="font-semibold text-lg">No reports found.</p>
              <p className="text-sm mt-1">Be the first to report a scam to the community.</p>
            </div>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-slate-300 transition-colors">
                
                <div className="flex flex-col sm:flex-row p-6 gap-6">
                  
                  {/* Left (Profile & Voting) */}
                  <div className="flex sm:flex-col items-center justify-start sm:justify-start gap-3 sm:w-16 flex-shrink-0">
                    {report.reportedBy.avatarUrl ? (
                      <img src={report.reportedBy.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border border-indigo-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                        {report.reportedBy.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <button className="p-1 text-slate-400 hover:text-[#1D61D1] transition-colors"><ChevronUp className="w-5 h-5" /></button>
                      <span className="text-sm font-bold text-slate-700">{report.likes - report.dislikes}</span>
                      <button className="p-1 text-slate-400 hover:text-rose-500 transition-colors"><ChevronDown className="w-5 h-5" /></button>
                    </div>
                    <span className="text-xs font-bold text-slate-500 hidden sm:block truncate w-full text-center mt-2" title={`@${report.reportedBy.username}`}>
                      @{report.reportedBy.username}
                    </span>
                  </div>

                  {/* Center (Alert Content) */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight break-words">{report.title}</h2>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed whitespace-pre-wrap break-words">
                      {report.description}
                    </p>
                    
                    {/* Media Attachments Check */}
                    {report.mediaUrls && report.mediaUrls.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto mb-4">
                        {report.mediaUrls.map((url, idx) => (
                          <div key={idx} className="w-32 h-24 flex-shrink-0 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden">
                            <ImageIcon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-semibold">Attached Media</span>
                          </div>
                        ))}
                      </div>
                    )}

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
                        <span className="font-medium">{formatTimeAgo(report.createdAt)}</span>
                      </div>
                      <div className="flex items-start text-xs text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate" title={report.location}>{report.location}</span>
                      </div>
                      <div className="flex items-start text-xs text-slate-600">
                        <Smartphone className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate" title={report.platform}>{report.platform}</span>
                      </div>
                      {report.amountLost && report.amountLost > 0 ? (
                        <div className="flex items-start text-xs text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded w-max">
                          Lost: RM {report.amountLost.toFixed(2)}
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="mt-6 sm:mt-0">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-extrabold whitespace-nowrap shadow-sm ${
                        report.verificationStatus === 'Verified' ? 'bg-rose-50 text-rose-600 border border-rose-100 shadow-rose-500/10' : 
                        'bg-amber-50 text-amber-600 border border-amber-100 shadow-amber-500/10'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> {report.verificationStatus}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Footer (Interaction Options) */}
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center space-x-6">
                  <button className="flex items-center text-sm font-bold text-[#1D61D1] hover:text-blue-800 transition-colors group">
                    <ThumbsUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>{report.likes || 0} Helpful</span>
                  </button>
                  <button className="flex items-center text-sm font-bold text-rose-400 hover:text-rose-600 transition-colors group">
                    <ThumbsDown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>{report.dislikes || 0} Not Helpful</span>
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

        {/* Sidebar (Right Column - 35%) */}
        <div className="lg:w-[35%] space-y-6 lg:mt-11">
          
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
                <span className="text-sm font-extrabold text-slate-800">{reports.length > 0 ? reports.length : '42K'}</span>
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
