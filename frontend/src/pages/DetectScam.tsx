import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Trash2, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Copy,
  Info,
  ImagePlus,
  FileText,
  X,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PredictResponse, PredictImageResponse, ScanHistoryItem } from '../types';

const AI_MODEL_URL = import.meta.env.VITE_AI_MODEL_URL || 'https://dumpster-herself-dragster.ngrok-free.dev';

const TEMPLATE_MESSAGES = [
  {
    label: "SMS Phishing (LHDN)",
    text: "RM0 LHDN: Tunggakan cukai pendapatan anda bagi tahun 2025 belum diselesaikan. Sila klik link di bawah untuk semakan segera sebelum tindakan undang-undang diambil: tng-update.com",
    type: "scam"
  },
  {
    label: "Fake Job Offer",
    text: "Part time job vacancy! High payout RM150-RM500/day. Working from home. No experience needed. Immediate payout, age 18+. Join now via link: bit.ly/part-time-my",
    type: "scam"
  },
  {
    label: "Bank Scam (TNG)",
    text: "TNG eWallet: Akaun anda telah dibekukan atas faktor keselamatan. Sila layari sh0pee-help.net untuk aktifkan semula e-wallet anda dalam tempoh 24 jam.",
    type: "scam"
  },
  {
    label: "Safe Chat (BM)",
    text: "Jom makan tengah hari sekali kat cafe esok, aku belanja. Lagipun esok tak ada lecture pagi.",
    type: "safe"
  },
  {
    label: "Safe Notice",
    text: "Your appointment for the annual health checkup at General Clinic is confirmed for tomorrow, 23rd May 2026 at 10:00 AM. Thank you.",
    type: "safe"
  }
];

const SCANNING_STEPS = [
  "Tokenizing message content...",
  "Evaluating XLM-RoBERTa neural weights...",
  "Applying Malaysian linguistic rules...",
  "Integrating fusion algorithm (70% AI / 30% Rules)..."
];

const IMAGE_SCANNING_STEPS = [
  "Processing uploaded screenshot...",
  "Running EasyOCR text extraction (Malay + English)...",
  "Evaluating XLM-RoBERTa neural weights...",
  "Applying Malaysian linguistic rules...",
  "Integrating fusion algorithm (70% AI / 30% Rules)..."
];

type InputMode = 'text' | 'image';

const DetectScam = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [scanResult, setScanResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [guestScans, setGuestScans] = useState<number>(0);

  // Load guest scan count & history
  useEffect(() => {
    if (!user) {
      const savedCount = parseInt(localStorage.getItem('scamhero_guest_scans') || '0', 10);
      setGuestScans(savedCount);
    } else {
      const savedHistory = localStorage.getItem('scamhero_scan_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    }
  }, [user]);

  // Cycle scanning step messages during loading
  const activeSteps = inputMode === 'image' ? IMAGE_SCANNING_STEPS : SCANNING_STEPS;
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setScanStepIndex(0);
      interval = setInterval(() => {
        setScanStepIndex((prev) => (prev < activeSteps.length - 1 ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading, activeSteps]);

  const handleScan = async (textToScan: string) => {
    const targetText = textToScan.trim();
    if (!targetText) return;

    if (!user && guestScans >= 3) {
      setError('You have reached the free scan limit for guest users. Please login to unlock unlimited scanning.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScanResult(null);

    try {
      const response = await fetch(`${AI_MODEL_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ message: targetText }),
      });

      if (!response.ok) {
        throw new Error(`Connection failed. AI Model server responded with status: ${response.status}`);
      }

      const data: PredictResponse = await response.json();
      setScanResult(data);

      if (!user) {
        const nextCount = guestScans + 1;
        setGuestScans(nextCount);
        localStorage.setItem('scamhero_guest_scans', nextCount.toString());
      } else {
        // Add to history
        const newHistoryItem: ScanHistoryItem = {
          id: Date.now().toString(),
          message: targetText,
          label: data.label,
          confidence: data.confidence,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedHistory = [newHistoryItem, ...history.filter(item => item.message !== targetText).slice(0, 9)];
        setHistory(updatedHistory);
        localStorage.setItem('scamhero_scan_history', JSON.stringify(updatedHistory));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to scan message. Please ensure the AI detection API is running and accessible.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be under 10MB.');
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setExtractedText(null);
    setScanResult(null);
    setError(null);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText(null);
    setScanResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageScan = async () => {
    if (!selectedImage) return;

    if (!user && guestScans >= 3) {
      setError('You have reached the free scan limit for guest users. Please login to unlock unlimited scanning.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScanResult(null);
    setExtractedText(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await fetch(`${AI_MODEL_URL}/predict-image`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' },
        body: formData,
      });

      if (response.status === 422) {
        const errData = await response.json();
        throw new Error(errData.detail || 'No readable text was detected in the uploaded screenshot.');
      }

      if (!response.ok) {
        throw new Error(`AI Model server responded with status: ${response.status}`);
      }

      const data: PredictImageResponse = await response.json();
      setExtractedText(data.extracted_text);
      setScanResult(data);

      if (!user) {
        const nextCount = guestScans + 1;
        setGuestScans(nextCount);
        localStorage.setItem('scamhero_guest_scans', nextCount.toString());
      } else {
        const newHistoryItem: ScanHistoryItem = {
          id: Date.now().toString(),
          message: `[IMG] ${data.extracted_text.slice(0, 80)}...`,
          label: data.label,
          confidence: data.confidence,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
        setHistory(updatedHistory);
        localStorage.setItem('scamhero_scan_history', JSON.stringify(updatedHistory));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to scan image.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTemplate = (text: string) => {
    setInputMode('text');
    setMessage(text);
    handleScan(text);
  };

  const copyToClipboard = () => {
    if (!message) return;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('scamhero_scan_history');
  };

  return (
    <div className="w-full space-y-6 pt-4 px-2 sm:px-4 bg-transparent">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Shield className="h-6 w-6 mr-2 text-[#1D61D1]" />
            AI Scam Copilot
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Real-time hybrid AI analysis for SMS, WhatsApp, and email messages. Supports English, Malay, and Manglish.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="bg-[#1D61D1] hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center"
            >
              Log In for Full Access
            </button>
          )}
          <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>FastAPI Connected</span>
          </div>
        </div>
      </div>

      {/* Guest Mode Notice Banner */}
      {!user && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-xs font-semibold">
            <span className="font-extrabold">Guest Mode:</span> You have <span className="font-extrabold text-amber-900">{Math.max(0, 3 - guestScans)} free scans</span> remaining. Login to unlock unlimited scans, full history, and community reporting.
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm transition-all flex-shrink-0"
          >
            Sign In Now
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input and Templates (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Input Box */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative">
            
            {/* Glassmorphic Overlay for Guest Scan Limit */}
            {!user && guestScans >= 3 && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[24px] z-20 flex flex-col items-center justify-center text-center p-6">
                <div className="p-3 bg-blue-50 rounded-full border border-blue-100 mb-4 animate-pulse">
                  <Shield className="h-8 w-8 text-[#1D61D1]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Scan Limit Reached</h3>
                <p className="text-slate-500 text-xs font-semibold max-w-[280px] mb-4">
                  You've used your 3 free guest scans. Login to enjoy unlimited scanning, AI insights, and community report submissions.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-[#1D61D1] hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                  Log In to Continue
                </button>
              </div>
            )}

            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-amber-500" />
              Message Scanner
            </h2>

            {/* Input Mode Tabs */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-4">
              <button
                onClick={() => { setInputMode('text'); setError(null); setScanResult(null); }}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  inputMode === 'text'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Text Input</span>
              </button>
              <button
                onClick={() => { setInputMode('image'); setError(null); setScanResult(null); }}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  inputMode === 'image'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Screenshot (OCR)</span>
              </button>
            </div>

            {/* Text Input Mode */}
            {inputMode === 'text' && (
              <>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Paste or write the suspicious message here (e.g., 'Tahniah! Akaun anda menang RM5000, klik bit.ly/claim untuk tebus...')"
                    className="w-full h-44 p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 text-sm font-medium transition-all"
                    maxLength={500}
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-slate-400">
                    {message && (
                      <button 
                        onClick={copyToClipboard}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Copy message"
                      >
                        <span className="text-[10px] mr-1">{copied ? 'Copied!' : ''}</span>
                        <Copy className="h-3.5 w-3.5 inline" />
                      </button>
                    )}
                    <span className="text-[10px] font-bold tracking-wider">{message.length}/500</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-5 gap-3">
                  <div className="text-xs text-slate-400 font-semibold flex items-center">
                    <Info className="h-3.5 w-3.5 mr-1" />
                    Input truncated after 64 tokens (~50 words)
                  </div>
                  <button
                    onClick={() => handleScan(message)}
                    disabled={isLoading || !message.trim()}
                    className={`py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                      isLoading || !message.trim()
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-[#1D61D1] hover:bg-blue-700 text-white shadow-blue-500/10'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        <span>Run Security Scan</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Image Upload Mode */}
            {inputMode === 'image' && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="screenshot-upload"
                />

                {!imagePreview ? (
                  <label
                    htmlFor="screenshot-upload"
                    className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                  >
                    <ImagePlus className="h-10 w-10 text-slate-300 group-hover:text-blue-400 transition-colors mb-3" />
                    <p className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Click to upload screenshot</p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP — max 10MB</p>
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Screenshot preview"
                      className="w-full max-h-52 object-contain rounded-2xl border border-slate-200 bg-slate-50"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-full border border-slate-200 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                      title="Remove image"
                    >
                      <X className="h-4 w-4 text-slate-500 hover:text-red-500" />
                    </button>
                  </div>
                )}


                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-5 gap-3">
                  <div className="text-xs text-slate-400 font-semibold flex items-center">
                    <Info className="h-3.5 w-3.5 mr-1" />
                    EasyOCR reads Malay + English text from screenshots
                  </div>
                  <button
                    onClick={handleImageScan}
                    disabled={isLoading || !selectedImage}
                    className={`py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                      isLoading || !selectedImage
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-[#1D61D1] hover:bg-blue-700 text-white shadow-blue-500/10'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Processing OCR...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4" />
                        <span>Scan Screenshot</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quick-Scan Templates */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-slate-400" />
              Quick-Scan Templates
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {TEMPLATE_MESSAGES.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => loadTemplate(tpl.text)}
                  disabled={isLoading}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all text-left flex flex-col items-start max-w-full md:max-w-[48%] group ${
                    tpl.type === 'scam' 
                      ? 'bg-red-50/30 border-red-100 hover:border-red-300 text-slate-700' 
                      : 'bg-emerald-50/20 border-emerald-100 hover:border-emerald-300 text-slate-700'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-wider mb-1 font-extrabold ${
                    tpl.type === 'scam' ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {tpl.label}
                  </span>
                  <span className="truncate w-full font-medium text-slate-500 group-hover:text-slate-800 transition-colors">
                    {tpl.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Scan Result (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scanner Output Card */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[380px] flex flex-col justify-between">
            
            {/* 1. Empty/Standby State */}
            {!isLoading && !scanResult && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center relative">
                    <Shield className="h-10 w-10 text-[#1D61D1] animate-pulse" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">AI Copilot Standby</h3>
                <p className="text-slate-400 text-xs font-medium max-w-[260px] mx-auto">
                  Type a message or select a template, then run the scan to evaluate security risk.
                </p>
              </div>
            )}

            {/* 2. Loading State */}
            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center relative">
                    <RefreshCw className="h-7 w-7 text-[#1D61D1] animate-spin" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">Analyzing Security Risk</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-[#1D61D1] tracking-wide inline-block animate-pulse">
                  {activeSteps[scanStepIndex]}
                </div>
              </div>
            )}

            {/* 3. Error State */}
            {!isLoading && error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-4 text-red-500">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Scan Failed</h3>
                <p className="text-red-600 text-xs font-semibold mb-4 max-w-[300px]">
                  {error}
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-medium text-slate-500 max-w-[320px]">
                  <p className="font-bold text-slate-700 mb-1">Troubleshooting Tips:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Ensure FastAPI is running locally on port 8000.</li>
                    <li>Verify ngrok is actively forwarding to port 8000.</li>
                    <li>Check if VITE_AI_MODEL_URL matches the active ngrok address.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* 4. Loaded Result State */}
            {!isLoading && scanResult && (
              <div className="flex-grow space-y-6">
                
                {/* Result Label Header */}
                <div className={`p-5 rounded-2xl border text-center transition-all ${
                  scanResult.label === 'SCAM'
                    ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                    : 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
                }`}>
                  <div className="flex justify-center mb-3">
                    {scanResult.label === 'SCAM' ? (
                      <div className="p-3 bg-rose-100 rounded-full border border-rose-200 animate-bounce">
                        <ShieldAlert className="h-8 w-8 text-rose-600" />
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-100 rounded-full border border-emerald-200">
                        <ShieldCheck className="h-8 w-8 text-emerald-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold tracking-wider uppercase mb-1">
                    {scanResult.label === 'SCAM' ? 'Flagged as Scam' : 'Verified Safe'}
                  </h3>
                  <p className="text-xs font-semibold opacity-75">
                    {scanResult.label === 'SCAM' 
                      ? 'High risk patterns and malicious indicators matching scam profiles.'
                      : 'Linguistic patterns match standard conversational messages.'}
                  </p>
                </div>

                {/* Score bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Threat Probability</span>
                    <span className={`text-xl font-extrabold ${scanResult.label === 'SCAM' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.round(scanResult.confidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        scanResult.label === 'SCAM' ? 'bg-gradient-to-r from-orange-500 to-rose-600' : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                      }`}
                      style={{ width: `${scanResult.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Breakdown details */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1 flex items-center">
                    <Info className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                    Confidence Contribution
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">XLM-RoBERTa AI (70%)</p>
                      <p className="text-base font-extrabold text-slate-700">{Math.round(scanResult.ai_prob * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Rule Engine (30%)</p>
                      <p className="text-base font-extrabold text-slate-700">{Math.round(scanResult.rule_score * 100)}%</p>
                    </div>
                  </div>
                </div>

                {/* AI Reasons Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Analysis Reasons</h4>
                  
                  {scanResult.reasons && scanResult.reasons.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {scanResult.reasons.map((reason, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-start p-2.5 rounded-xl border text-xs font-semibold ${
                            reason.type === 'scam' 
                              ? 'bg-red-50/20 border-red-100/50 text-slate-700' 
                              : 'bg-emerald-50/10 border-emerald-100/50 text-slate-700'
                          }`}
                        >
                          <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2.5 flex-shrink-0 ${
                            reason.type === 'scam' ? 'bg-red-500' : 'bg-emerald-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-slate-800">{reason.description}</p>
                            <span className={`text-[10px] font-bold mt-0.5 inline-block ${
                              reason.type === 'scam' ? 'text-red-600' : 'text-emerald-600'
                            }`}>
                              {reason.impact > 0 ? `+${reason.impact}` : reason.impact} Rule Impact
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-500 text-center">
                      No specific syntax rules triggered. Verdict determined via contextual neural semantics.
                    </div>
                  )}
                </div>

                {/* Action Guidelines */}
                {scanResult.label === 'SCAM' ? (
                  <div className="bg-rose-950 text-rose-50 border border-rose-900 rounded-2xl p-4 space-y-2 shadow-inner">
                    <h4 className="text-xs font-extrabold tracking-wide uppercase flex items-center text-rose-200">
                      <AlertTriangle className="h-4 w-4 mr-1.5" />
                      Immediate Danger Actions
                    </h4>
                    <ul className="text-xs font-medium space-y-1.5 list-disc pl-4 text-rose-100">
                      <li>Call <span className="font-extrabold text-white bg-rose-900 px-1 rounded">997</span> (National Scam Response Centre) if money was transferred.</li>
                      <li>Do not tap links, answer the sender, or submit OTP tokens.</li>
                      <li>Block and report this number instantly.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-emerald-950 text-emerald-50 border border-emerald-900 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-extrabold tracking-wide uppercase flex items-center text-emerald-200">
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Security Recommendation
                    </h4>
                    <p className="text-xs font-medium text-emerald-100">
                      While the model flags this as safe, always stay alert. Never share passwords or credential tokens.
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* History Area */}
      {user ? (
        history.length > 0 && (
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                Your Recent Scans
              </h2>
              <button
                onClick={clearHistory}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Clear History
              </button>
            </div>
            
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-2">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="py-3.5 flex items-center justify-between gap-4 group hover:bg-slate-50/50 px-2 rounded-xl transition-all cursor-pointer"
                  onClick={() => {
                    setMessage(item.message);
                    handleScan(item.message);
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{item.message}</p>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wide">{item.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      item.label === 'SCAM' 
                        ? 'bg-rose-50 border-rose-100 text-rose-700' 
                        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    }`}>
                      {item.label} ({Math.round(item.confidence * 100)}%)
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 text-center py-8">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-700 mb-1">Scan History Locked</h3>
          <p className="text-slate-400 text-xs font-semibold max-w-md mx-auto mb-3">
            Your scan history is only preserved when logged in. Create a free account to track and analyze threat trends.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-bold text-[#1D61D1] hover:underline"
          >
            Log In Now &rarr;
          </button>
        </div>
      )}

    </div>
  );
};

export default DetectScam;
