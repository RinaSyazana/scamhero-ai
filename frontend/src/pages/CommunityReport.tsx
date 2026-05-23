import React, { useState, useEffect } from 'react';
import {
  ChevronUp, ChevronDown, Image as ImageIcon, Info,
  MapPin, Clock, Smartphone, ThumbsUp, ThumbsDown,
  TrendingUp, Users, FileText, CheckCircle2, Plus,
  Search, Filter, X, AlertTriangle, MessageCircle,
  Award, Flame, Eye, ArrowUpDown, SortAsc, SortDesc,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api, { API_URL } from '../api';
import { ScamReport } from '../types';
import { useAuth } from '../context/AuthContext';

const CommunityReport = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (reportId: string) => {
    if (!window.confirm('Are you sure you want to delete this report? This cannot be undone.')) {
      return;
    }
    setDeletingId(reportId);
    try {
      const token = await user?.getIdToken();
      await api.delete(`/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (err: any) {
      console.error('Failed to delete report:', err);
      alert(err.response?.data?.error || 'Failed to delete report');
    } finally {
      setDeletingId(null);
    }
  };

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

  // Sort reports based on selected criteria
  const getSortedReports = () => {
    let sorted = [...reports];

    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
        break;
      case 'platform':
        sorted.sort((a, b) => {
          const platformA = a.platform || '';
          const platformB = b.platform || '';
          if (sortOrder === 'asc') {
            return platformA.localeCompare(platformB);
          } else {
            return platformB.localeCompare(platformA);
          }
        });
        break;
      case 'amountLost':
        sorted.sort((a, b) => {
          const amountA = a.amountLost || 0;
          const amountB = b.amountLost || 0;
          if (sortOrder === 'asc') {
            return amountA - amountB;
          } else {
            return amountB - amountA;
          }
        });
        break;
      case 'date':
      default:
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          if (sortOrder === 'asc') {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
        break;
    }

    return sorted;
  };

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

  // Updated filters - removed verified and most-discussed
  const filters = [
    { id: 'all', label: 'All Reports', icon: FileText },
    { id: 'trending', label: 'Trending', icon: Flame },
  ];

  const trendingScams = [
    { tag: '#FakeParcelDelivery', growth: '+34%', posts: 234 },
    { tag: '#GovernmentAidScam', growth: '+22%', posts: 189 },
    { tag: '#CryptoInvestment', growth: '+15%', posts: 156 },
    { tag: '#UnpaidTollsSMS', growth: '+12%', posts: 143 }
  ];

  // Sorting options
  const sortOptions = [
    { value: 'date', label: 'Date', icon: Clock },
    { value: 'title', label: 'Title', icon: FileText },
    { value: 'platform', label: 'Platform', icon: Smartphone },
    { value: 'amountLost', label: 'Amount Lost', icon: AlertTriangle },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isFilterDropdownOpen && !target.closest('.filter-dropdown')) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFilterDropdownOpen]);

  const sortedReports = getSortedReports();

  return (
    <div className="bg-transparent w-full">
      {/* REMOVED max-w-7xl and mx-auto - now full width with minimal padding */}
      <div className="px-2 py-2">

        {/* Page Header - Reduced margin bottom */}
        <div className="mb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-indigo-100 shadow-sm mb-2">
                <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">Community Hub</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent tracking-tight">
                Community Reports
              </h1>
              <p className="text-slate-600 font-medium mt-1 text-sm max-w-2xl">
                Real scam reports from real people. Stay informed and protect your community.
              </p>
            </div>

            <Link
              to="/add-report"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2 px-5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Report
            </Link>
          </div>
        </div>

        {/* Top Navigation Bar - Search & Filters - Reduced padding */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports by title, description, or platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>

            {/* Filter Tabs - Only All Reports and Trending */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === filter.id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* More Filters Dropdown */}
            <div className="relative filter-dropdown">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200 transition-all"
              >
                <Filter className="h-3.5 w-3.5" />
                More Filters
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-indigo-600" />
                        Sort Reports
                      </h3>
                      {(sortBy !== 'date' || sortOrder !== 'desc') && (
                        <button
                          onClick={() => {
                            setSortBy('date');
                            setSortOrder('desc');
                          }}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = sortBy === option.value;
                        return (
                          <div key={option.value}>
                            <button
                              onClick={() => {
                                if (sortBy === option.value) {
                                  // Toggle order if same field
                                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                } else {
                                  // Set new field with default desc order
                                  setSortBy(option.value);
                                  setSortOrder('desc');
                                }
                                setIsFilterDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${isActive
                                  ? 'bg-indigo-50 text-indigo-700'
                                  : 'hover:bg-gray-50 text-slate-700'
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                                <span className="text-sm font-medium">{option.label}</span>
                              </div>
                              {isActive && (
                                <div className="flex items-center gap-1">
                                  {sortOrder === 'asc' ? (
                                    <SortAsc className="h-4 w-4" />
                                  ) : (
                                    <SortDesc className="h-4 w-4" />
                                  )}
                                  <span className="text-xs font-semibold">
                                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                  </span>
                                </div>
                              )}
                            </button>

                            {/* Show order toggles for active sort */}
                            {isActive && (
                              <div className="flex gap-2 mt-1 ml-7">
                                <button
                                  onClick={() => {
                                    setSortOrder('asc');
                                    setIsFilterDropdownOpen(false);
                                  }}
                                  className={`flex-1 text-xs py-1 px-2 rounded-md transition-all ${sortOrder === 'asc'
                                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                      : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                                    }`}
                                >
                                  ↑ Ascending
                                </button>
                                <button
                                  onClick={() => {
                                    setSortOrder('desc');
                                    setIsFilterDropdownOpen(false);
                                  }}
                                  className={`flex-1 text-xs py-1 px-2 rounded-md transition-all ${sortOrder === 'desc'
                                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                      : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                                    }`}
                                >
                                  ↓ Descending
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs text-slate-500 flex items-center justify-between">
                        <span>Current sort: </span>
                        <span className="font-semibold text-indigo-600">
                          {sortOptions.find(opt => opt.value === sortBy)?.label || 'Date'}
                          ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid - Reduced gap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Feed - Reports */}
          <div className="lg:col-span-2 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : sortedReports.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-sm">
                <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p className="font-semibold text-lg text-slate-700">No reports found.</p>
                <p className="text-sm text-slate-500 mt-1">Be the first to report a scam to the community.</p>
              </div>
            ) : (
              sortedReports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

                  {/* Report Header - Reduced padding */}
                  <div className="p-5 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {report.reportedBy.avatarUrl ? (
                          <img src={report.reportedBy.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full ring-2 ring-indigo-100" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm ring-2 ring-indigo-100">
                            {report.reportedBy.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate">@{report.reportedBy.username}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">{formatTimeAgo(report.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${report.verificationStatus === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {report.verificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Report Content - Reduced padding */}
                  <div className="p-5">
                    <h2 className="text-lg font-extrabold text-slate-800 mb-2 leading-tight">
                      {report.title}
                    </h2>
                    <p className="text-slate-600 mb-3 leading-relaxed text-sm">
                      {report.description}
                    </p>

                    {/* Tags & Metadata */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {report.platform && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-slate-600">
                          <Smartphone className="w-3 h-3" />
                          {report.platform}
                        </span>
                      )}
                      {report.location && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-slate-600">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                      )}
                      {report.amountLost && report.amountLost > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          Lost: RM {report.amountLost.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Media Attachments */}
                    {report.mediaUrls && report.mediaUrls.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto mb-3 pb-1">
                        {report.mediaUrls.map((url, idx) => (
                          <img
                            key={idx}
                            src={`${API_URL}${url}`}
                            alt={`Media ${idx + 1}`}
                            className="w-20 h-20 flex-shrink-0 rounded-lg border border-gray-200 object-cover cursor-pointer hover:shadow-md hover:scale-105 transition-all"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Voting Footer */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all group">
                        <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{report.likes || 0}</span>
                        <span className="text-slate-500 text-xs">Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rose-600 transition-all group">
                        <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{report.dislikes || 0}</span>
                        <span className="text-slate-500 text-xs">Not Helpful</span>
                      </button>
                    </div>
                    {/* Delete button - only visible to the report owner */}
                    {user && report.reportedBy.uid === user.uid && (
                      <button
                        onClick={() => handleDelete(report.id)}
                        disabled={deletingId === report.id}
                        className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === report.id ? (
                          <div className="w-3.5 h-3.5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Sidebar - Reduced spacing */}
          <div className="space-y-5">

            {/* Stats Cards */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="inline-flex p-1.5 bg-indigo-50 rounded-lg mb-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Active Users</p>
                  <p className="text-lg font-bold text-slate-800">8.9K</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-1.5 bg-amber-50 rounded-lg mb-1.5">
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Reports</p>
                  <p className="text-lg font-bold text-slate-800">{reports.length || '42K'}</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-1.5 bg-emerald-50 rounded-lg mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Verified</p>
                  <p className="text-lg font-bold text-slate-800">11K</p>
                </div>
              </div>
            </div>

            {/* Trending Scams - Reduced padding */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Trending Scams</h3>
              </div>

              <div className="space-y-2">
                {trendingScams.map((item, i) => (
                  <div key={i} className="group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-all -mx-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-sm font-bold text-slate-700">{item.tag}</span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg">
                        ↗ {item.growth}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MessageCircle className="w-3 h-3" />
                      <span>{item.posts} discussions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips - Reduced padding */}
            <div className="bg-gradient-to-br from-indigo-50 via-indigo-50 to-purple-50 rounded-xl p-5 shadow-sm border border-indigo-100">
              <div className="flex items-center gap-2 mb-2.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-indigo-900 text-sm">Safety Tips</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-indigo-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Never share OTP or banking passwords</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Verify URLs before clicking links</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Report suspicious activity immediately</span>
                </li>
              </ul>
            </div>

            {/* Community Guidelines - Reduced padding */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                Community Guidelines
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share authentic scam experiences only. Respect privacy and avoid sharing personal information of others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityReport;