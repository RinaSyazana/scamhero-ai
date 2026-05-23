import React, { useState } from 'react';
import {
  X, Image as ImageIcon, Plus, XCircle, MapPin, Smartphone, Send,
  TrendingUp, Filter, AlertCircle, DollarSign, Shield, FileText,
  Upload, ChevronDown, CheckCircle2, Clock, AlertTriangle,
  ArrowLeft, HelpCircle, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const AddReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('WhatsApp');
  const [location, setLocation] = useState('Kuala Lumpur, MY');
  const [amountLost, setAmountLost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      setError('Please provide a title and description for the report.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('platform', platform);
      formData.append('location', location);
      formData.append('amountLost', amountLost ? amountLost.toString() : '0');
      
      const reportedByObj = {
        username: user?.displayName || (user?.email ? user.email.split('@')[0] : 'Anonymous'),
        avatarUrl: user?.photoURL || '',
        uid: user?.uid || ''
      };
      formData.append('reportedBy', JSON.stringify(reportedByObj));
      
      selectedFiles.forEach(file => {
        formData.append('media', file);
      });

      await api.post('/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/reports');
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  const locations = [
    'Kuala Lumpur, MY',
    'Selangor, MY',
    'Penang, MY',
    'Johor, MY',
    'Sabah, MY',
    'Sarawak, MY',
    'Global'
  ];

  const platforms = [
    'WhatsApp',
    'Telegram',
    'Facebook Marketplace',
    'SMS',
    'Email',
    'Phone Call',
    'Instagram',
    'Other'
  ];

  const trendingScams = [
    { tag: '#FakeParcelDelivery', growth: '+34%', description: 'Fake tracking links via SMS' },
    { tag: '#GovernmentAidScam', growth: '+22%', description: 'Fake financial assistance offers' },
    { tag: '#CryptoInvestment', growth: '+15%', description: 'Fake crypto trading platforms' },
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="px-2 py-2">

        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-indigo-100 shadow-sm mb-2">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">Report a Scam</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent tracking-tight">
                Add New Report
              </h1>
              <p className="text-slate-600 font-medium mt-1 text-sm max-w-2xl">
                Share your experience and help protect others from scams
              </p>
            </div>

            <Link
              to="/reports"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Form Header */}
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full ring-2 ring-indigo-100" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm ring-2 ring-indigo-100">
                      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-800">@{user?.displayName || 'Anonymous'}</p>
                    <p className="text-xs text-slate-500">Your report will be reviewed by AI</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6">
                {error && (
                  <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                      Scam Title / Subject *
                    </label>
                    <input
                      type="text"
                      className="w-full text-slate-800 text-base font-medium placeholder-slate-300 border border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all bg-gray-50"
                      placeholder="e.g., Fake parcel delivery scam via SMS"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Description Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                      Description *
                    </label>
                    <textarea
                      className="w-full text-slate-800 text-sm placeholder-slate-300 border border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all bg-gray-50 resize-none"
                      placeholder="Describe the scam in detail (e.g., how it happened, scammer's tactics, red flags to watch out for)..."
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      Include as much detail as possible to help others
                    </p>
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                      Media Attachments
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      <label className="w-24 h-24 flex-shrink-0 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all cursor-pointer group">
                        <Upload className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-center px-2">Upload</span>
                        <input type="file" className="hidden" multiple accept="image/*,video/*" onChange={handleFileChange} />
                      </label>
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} className="w-24 h-24 relative bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          )}
                          <button 
                            onClick={() => removeFile(idx)}
                            type="button"
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md z-10"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400 mt-2">
                      Max 5 images/videos (20MB per file). Screenshots recommended.
                    </p>
                  </div>

                  {/* Two Column Layout for Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        Location/Region
                      </label>
                      <div className="relative">
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 appearance-none cursor-pointer"
                        >
                          {locations.map(loc => (
                            <option key={loc}>{loc}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Platform */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        Platform/Channel
                      </label>
                      <div className="relative">
                        <select
                          value={platform}
                          onChange={(e) => setPlatform(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 appearance-none cursor-pointer"
                        >
                          {platforms.map(plat => (
                            <option key={plat}>{plat}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Amount Lost */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      Amount Lost (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 text-sm font-bold">
                        RM
                      </div>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={amountLost}
                        onChange={(e) => setAmountLost(e.target.value)}
                        className="w-full pl-9 pr-3 border border-gray-200 rounded-xl p-2.5 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-6 py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
                <button
                  onClick={() => navigate('/reports')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-100 transition-all"
                >
                  Discard Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-indigo-400 disabled:to-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">

            {/* AI Status Card */}
            <div className="bg-gradient-to-br from-indigo-50 via-indigo-50 to-purple-50 rounded-2xl p-5 shadow-sm border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                  <Shield className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="font-bold text-indigo-900 text-sm">AI Review Status</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-700">Initial Review</span>
                  <span className="font-semibold text-indigo-800 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending
                  </span>
                </div>
                <div className="h-1.5 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-xs text-indigo-700 mt-2">
                  Your report will be reviewed within 2 minutes after submission
                </p>
              </div>
            </div>

            {/* Trending Scams Context */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Trending Scams</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                AI has detected a surge in these scams. Check if your report matches.
              </p>
              <div className="space-y-2">
                {trendingScams.map((item, i) => (
                  <div key={i} className="p-2 hover:bg-gray-50 rounded-lg transition-all">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-sm font-bold text-slate-700">{item.tag}</span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg">
                        ↗ {item.growth}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-800">Community Guidelines</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Do not share personal contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>AI will redact phone numbers automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Be honest and accurate in your report</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Respect victim privacy and confidentiality</span>
                </li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-amber-50 rounded-2xl p-5 shadow-sm border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-amber-800 text-sm">Pro Tips</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-700">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 ml-1"></div>
                  <span>Include screenshots of suspicious messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 ml-1"></div>
                  <span>Note down scammer phone numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 ml-1"></div>
                  <span>Describe the scammer's tactics in detail</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReport;