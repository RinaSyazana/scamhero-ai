import { Shield, Link2Off, Bot, MessageSquare, Mail, Target, QrCode, AlertTriangle, ChevronRight, Smartphone } from 'lucide-react';

const Education = () => {
  return (
    <div className="max-w-7xl mx-auto pt-4 pb-24 px-2 lg:px-0">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Scam Awareness & Education Hub</h1>
        <p className="text-slate-500 font-medium mt-2">Learn how to spot, dissect, and defeat malicious vectors.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Central Learning Area (65%) */}
        <div className="lg:w-[65%] space-y-6">
          
          {/* Featured Module — Anatomy of a Phishing Attack */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-[#1D61D1]" />
                Anatomy of a Phishing Attack
              </h2>
              <span className="bg-blue-50 text-[#1D61D1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Interactive Teardown</span>
            </div>

            {/* Teardown Visual Area */}
            <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-12">
              
              {/* Smartphone Mockup */}
              <div className="relative w-64 h-[420px] bg-slate-900 rounded-[32px] p-2 flex-shrink-0 shadow-xl ring-4 ring-slate-100">
                {/* Screen */}
                <div className="w-full h-full bg-[#f4f4f5] rounded-[24px] overflow-hidden relative font-sans">
                  {/* Status Bar */}
                  <div className="w-full h-6 bg-slate-200/50 flex justify-center items-center">
                    <div className="w-16 h-4 bg-slate-900 rounded-b-xl"></div>
                  </div>
                  {/* Header */}
                  <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                    <span className="text-[#1D61D1] text-sm"><ChevronRight className="w-5 h-5 rotate-180" /></span>
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mb-0.5">
                        <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-800 relative group">
                        +60 11-2345 6789
                        {/* Annotation Anchor 1 */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-500 animate-pulse md:hidden"></div>
                      </span>
                    </div>
                    <span className="w-5"></span>
                  </div>
                  
                  {/* Message Bubble */}
                  <div className="p-4">
                    <p className="text-[10px] text-center text-slate-400 mb-4 font-medium">Today 10:42 AM</p>
                    <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm relative">
                      {/* Annotation Anchor 2 */}
                      <p className="text-sm text-slate-800 leading-snug">
                        <span className="font-bold relative">
                          URGENT ACTION REQUIRED:
                          <div className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse md:hidden"></div>
                        </span> Your MYPOST parcel is held at the sorting center due to an incorrect delivery address.
                      </p>
                      <p className="text-sm text-slate-800 leading-snug mt-2">
                        Please update your details immediately or your package will be returned to sender:
                      </p>
                      {/* Annotation Anchor 3 */}
                      <div className="mt-2 text-[#1D61D1] underline text-sm break-all relative inline-block">
                        https://bit.ly/mypost-update-my
                        <div className="absolute -bottom-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse md:hidden"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Lines (Desktop only) */}
                <div className="hidden md:block">
                  <div className="absolute top-[75px] -right-4 w-12 border-t-2 border-dashed border-rose-300"></div>
                  <div className="absolute top-[170px] -right-4 w-12 border-t-2 border-dashed border-rose-300"></div>
                  <div className="absolute top-[265px] -right-4 w-12 border-t-2 border-dashed border-rose-300"></div>
                </div>
              </div>

              {/* Explanatory Callouts */}
              <div className="flex-1 space-y-6 w-full md:pt-4">
                
                {/* Callout 1 */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 font-bold text-xs shadow-sm z-10 hidden md:flex">1</div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
                    <span className="md:hidden w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold mr-2">1</span>
                    Unknown / Personal Sender Number
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Official institutions and delivery services use specialized 5-digit shortcodes (e.g., 68886) to send legitimate alerts, not random personal mobile numbers.
                  </p>
                </div>

                {/* Callout 2 */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 font-bold text-xs shadow-sm z-10 hidden md:flex">2</div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
                    <span className="md:hidden w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold mr-2">2</span>
                    Psychological Urgency Triggers
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scammers use capitalization and words like "URGENT" or "immediately" to induce panic, forcing you to act impulsively without verifying the source first.
                  </p>
                </div>

                {/* Callout 3 */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 font-bold text-xs shadow-sm z-10 hidden md:flex">3</div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
                    <span className="md:hidden w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold mr-2">3</span>
                    Masked Shortened URLs
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Legitimate companies will direct you to their official domain (e.g., pos.com.my). Scammers use bit.ly or subtle misspellings (e.g., mypost-update) to hide the true destination.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Prevention Checklist Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-[16px] border border-slate-200 shadow-sm flex items-start group hover:border-[#1D61D1]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D61D1] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Verify Senders</h3>
                <p className="text-xs text-slate-500 font-medium">Cross-check the number with official channels.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[16px] border border-slate-200 shadow-sm flex items-start group hover:border-[#1D61D1]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D61D1] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Link2Off className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Never Click Urgency Links</h3>
                <p className="text-xs text-slate-500 font-medium">Navigate to the official website manually instead.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[16px] border border-slate-200 shadow-sm flex items-start group hover:border-[#1D61D1]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D61D1] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Report to Copilot</h3>
                <p className="text-xs text-slate-500 font-medium">Submit suspicious texts to AI for instant scanning.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Glossary Sidebar (35%) */}
        <div className="lg:w-[35%] space-y-6">
          
          {/* Threat Vector Directory Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Threat Vector Directory</h3>
            
            <div className="space-y-6">
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center mr-4 border border-slate-100 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Smishing <span className="text-slate-400 font-medium">(SMS Phishing)</span></h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Fraudulent text messages designed to steal credentials or infect your device with malware.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center mr-4 border border-slate-100 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Phishing <span className="text-slate-400 font-medium">(Email Spoofing)</span></h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Deceptive emails mimicking trusted brands and banks to harvest login data and financial info.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center mr-4 border border-slate-100 flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Spear Phishing</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Highly targeted attacks customized to a specific individual or organization using gathered intel.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center mr-4 border border-slate-100 flex-shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Quishing <span className="text-slate-400 font-medium">(QR Code Scams)</span></h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Malicious QR codes placed in public areas hiding fake login portals to capture payment details.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Trending Tactics AI Insight Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border-2 border-amber-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-10"></div>
            
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wide">Trending Threat Insight</h3>
            </div>
            
            <p className="text-sm font-bold text-slate-800 leading-snug">
              AI Voice Cloning Impersonation
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Copilot has detected a 40% surge in scams utilizing AI-generated audio to mimic distressed family members over phone calls. Always verify identities through secondary channels.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Education;
