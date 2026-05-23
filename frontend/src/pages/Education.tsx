import React, { useState } from 'react';
import {
  Shield, Link2Off, Bot, MessageSquare, Mail, Target, QrCode,
  AlertTriangle, ChevronRight, Smartphone, Sparkles, BookOpen,
  Zap, TrendingUp, GraduationCap, Eye, Award, Phone,
  Building, Users, Receipt, ScanLine
} from 'lucide-react';

const Education = () => {
  // State for active threat vector
  const [activeThreat, setActiveThreat] = useState('smishing');

  // Threat content configuration
  const threatDetails = {
    smishing: {
      name: "Smishing (SMS Phishing)",
      badge: "SMS Deconstruction",
      message: {
        title: "⚠️ URGENT ACTION REQUIRED:",
        body: "Your MYPOST parcel is held at the sorting center due to an incorrect delivery address.",
        instruction: "Please update your details immediately or your package will be returned to sender:",
        link: "https://bit.ly/mypost-update-my",
        qrPlaceholder: false
      },
      callouts: [
        {
          number: "1",
          title: "Unknown / Personal Sender Number",
          desc: "Official institutions use specialized 5-digit shortcodes (e.g., 68886), not random personal mobile numbers."
        },
        {
          number: "2",
          title: "Psychological Urgency Triggers",
          desc: "Scammers use 'URGENT' and panic-inducing language to make you act impulsively without verification."
        },
        {
          number: "3",
          title: "Masked Shortened URLs",
          desc: "Legitimate companies use official domains. Scammers use bit.ly or misspellings to hide the true destination."
        }
      ],
      borderColors: ["rose-500", "amber-500", "indigo-500"],
      gradient: "from-rose-500 to-red-500",
      icon: MessageSquare,
      headerIcon: <Smartphone className="w-3.5 h-3.5 text-indigo-600" />,
      senderInfo: "+60 11-2345 6789"
    },
    phishing: {
      name: "Phishing (Email Spoofing)",
      badge: "Email Teardown",
      message: {
        title: "🔐 SECURITY ALERT:",
        body: "We noticed a suspicious login attempt to your Bank of America account from an unrecognized device.",
        instruction: "Verify your identity immediately to prevent account suspension:",
        link: "http://secure-verify-account.com/bank",
        qrPlaceholder: false
      },
      callouts: [
        {
          number: "1",
          title: "Spoofed Email Address",
          desc: "Sender address appears legitimate but has subtle domain misspellings like @bankofamerica-verify.com."
        },
        {
          number: "2",
          title: "Generic Greetings",
          desc: "Phishing emails often use 'Dear Customer' instead of your real name, indicating lack of personalization."
        },
        {
          number: "3",
          title: "Fake Login Pages",
          desc: "Links lead to cloned banking sites designed to capture your credentials and drain accounts."
        }
      ],
      borderColors: ["rose-500", "amber-500", "indigo-500"],
      gradient: "from-rose-500 to-red-500",
      icon: Mail,
      headerIcon: <Mail className="w-3.5 h-3.5 text-indigo-600" />,
      senderInfo: "security@bankofamerica-verify.com"
    },
    spearPhishing: {
      name: "Spear Phishing",
      badge: "Targeted Attack",
      message: {
        title: "Hi [Your Name], it's [CEO Name].",
        body: "I'm in a board meeting right now but need an urgent wire transfer of $12,500 to our new vendor.",
        instruction: "Can you process it ASAP? Invoice details:",
        link: "http://internal-payment-approval.com/invoice123",
        qrPlaceholder: false
      },
      callouts: [
        {
          number: "1",
          title: "Highly Personalized Context",
          desc: "Attackers research your company hierarchy and use real names of colleagues or executives."
        },
        {
          number: "2",
          title: "Authority Impersonation",
          desc: "Creates pressure by pretending to be a superior requesting urgent financial actions."
        },
        {
          number: "3",
          title: "Custom Domain Look-alike",
          desc: "Fake domain resembling internal company portal to bypass email filters."
        }
      ],
      borderColors: ["purple-500", "violet-500", "indigo-500"],
      gradient: "from-purple-500 to-indigo-600",
      icon: Target,
      headerIcon: <Building className="w-3.5 h-3.5 text-indigo-600" />,
      senderInfo: "CEO Office • Internal Request"
    },
    quishing: {
      name: "Quishing (QR Code Scams)",
      badge: "QR Code Fraud",
      message: {
        title: "🚗 PARKING TICKET NOTICE:",
        body: "Unpaid parking violation detected for your vehicle (License: WPK 3821).",
        instruction: "Pay within 24h to avoid penalty of $200. Scan QR code below to pay securely:",
        link: "http://qr.pay-ticket-fast.com",
        qrPlaceholder: true
      },
      callouts: [
        {
          number: "1",
          title: "Fake QR Code Stickers",
          desc: "Scammers place malicious QR codes over legitimate ones on parking meters or flyers."
        },
        {
          number: "2",
          title: "Impersonation of Authority",
          desc: "Messages impersonate law enforcement or utility companies demanding immediate payment."
        },
        {
          number: "3",
          title: "Hidden Destination URLs",
          desc: "QR codes can point to phishing sites without revealing the URL until after scanning."
        }
      ],
      borderColors: ["emerald-500", "teal-500", "cyan-500"],
      gradient: "from-emerald-500 to-teal-600",
      icon: QrCode,
      headerIcon: <QrCode className="w-3.5 h-3.5 text-indigo-600" />,
      senderInfo: "Parking Enforcement Bureau"
    }
  };

  const current = threatDetails[activeThreat];

  // Handle threat selection
  const ThreatCard = ({ id, title, subtitle, icon: Icon, colorScheme }) => (
    <div
      onClick={() => setActiveThreat(id)}
      className={`group bg-white p-4 rounded-xl border transition-all cursor-pointer ${activeThreat === id
          ? `border-${colorScheme}-400 shadow-lg ring-2 ring-${colorScheme}-200`
          : `border-${colorScheme}-100 hover:border-${colorScheme}-300 hover:shadow-md`
        }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${colorScheme}-100 to-${colorScheme}-200 text-${colorScheme}-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{title} <span className={`text-${colorScheme}-600 font-medium`}>{subtitle}</span></h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {id === 'smishing' && 'Fraudulent text messages designed to steal credentials or infect your device with malware.'}
            {id === 'phishing' && 'Deceptive emails mimicking trusted brands and banks to harvest login data and financial info.'}
            {id === 'spearPhishing' && 'Highly targeted attacks customized to specific individuals or organizations using gathered intel.'}
            {id === 'quishing' && 'Malicious QR codes placed in public areas hiding fake login portals to capture payment details.'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full pt-4 pb-24 px-2 sm:px-4 bg-transparent">

      {/* Page Header with Gradient */}
      <div className="mb-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Knowledge Base</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent tracking-tight">
          Scam Awareness & Education Hub
        </h1>
        <p className="text-slate-600 font-medium mt-3 text-lg max-w-2xl lg:mx-0 mx-auto">
          Learn how to spot, dissect, and defeat malicious vectors with interactive guides.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Central Learning Area (65%) */}
        <div className="lg:w-[65%] space-y-6">

          {/* Featured Module — Dynamic Anatomy of Attack */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 rounded-[28px] border border-indigo-100 shadow-xl shadow-indigo-100/20 overflow-hidden transition-all duration-300">
            <div className={`bg-gradient-to-r ${activeThreat === 'smishing' ? 'from-indigo-600 to-purple-600' : activeThreat === 'phishing' ? 'from-rose-600 to-red-600' : activeThreat === 'spearPhishing' ? 'from-purple-600 to-indigo-600' : 'from-emerald-600 to-teal-600'} px-6 py-4 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Anatomy of a {current.name}
                </h2>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {current.badge}
                </span>
              </div>
            </div>

            {/* Teardown Visual Area */}
            <div className="relative p-6 sm:p-8">
              <div className="bg-gradient-to-br from-slate-100 to-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex flex-col md:flex-row items-center md:items-start gap-8">

                {/* Smartphone Mockup - Dynamic Content */}
                <div className={`relative w-64 h-[420px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[32px] p-2 flex-shrink-0 shadow-2xl ring-4 transition-all duration-300 ${activeThreat === 'smishing' ? 'ring-indigo-200/50' :
                    activeThreat === 'phishing' ? 'ring-rose-200/50' :
                      activeThreat === 'spearPhishing' ? 'ring-purple-200/50' : 'ring-emerald-200/50'
                  }`}>
                  {/* Screen */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-[24px] overflow-hidden relative font-sans">
                    {/* Status Bar */}
                    <div className={`w-full h-6 bg-gradient-to-r ${activeThreat === 'smishing' ? 'from-indigo-100 to-purple-100' :
                        activeThreat === 'phishing' ? 'from-rose-100 to-red-100' :
                          activeThreat === 'spearPhishing' ? 'from-purple-100 to-indigo-100' : 'from-emerald-100 to-teal-100'
                      } flex justify-center items-center transition-all duration-300`}>
                      <div className="w-16 h-3 bg-slate-800 rounded-b-lg"></div>
                    </div>
                    {/* Header */}
                    <div className="px-4 py-3 bg-white border-b border-indigo-100 flex items-center justify-between">
                      <span className="text-indigo-600 text-sm"><ChevronRight className="w-5 h-5 rotate-180" /></span>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-0.5">
                          {current.headerIcon}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-800 relative group">
                          {current.senderInfo}
                        </span>
                      </div>
                      <span className="w-5"></span>
                    </div>

                    {/* Message Bubble - Dynamic Content */}
                    <div className="p-4">
                      <p className="text-[10px] text-center text-slate-400 mb-4 font-medium">Today 10:42 AM</p>
                      <div className={`bg-gradient-to-br ${activeThreat === 'smishing' ? 'from-rose-50 to-orange-50' :
                          activeThreat === 'phishing' ? 'from-red-50 to-rose-50' :
                            activeThreat === 'spearPhishing' ? 'from-purple-50 to-indigo-50' : 'from-emerald-50 to-teal-50'
                        } p-3 rounded-xl rounded-tl-none border ${activeThreat === 'smishing' ? 'border-rose-200' :
                          activeThreat === 'phishing' ? 'border-red-200' :
                            activeThreat === 'spearPhishing' ? 'border-purple-200' : 'border-emerald-200'
                        } shadow-md transition-all duration-300`}>
                        <p className="text-sm text-slate-800 leading-snug">
                          <span className={`font-bold ${activeThreat === 'smishing' ? 'text-rose-700' :
                              activeThreat === 'phishing' ? 'text-red-700' :
                                activeThreat === 'spearPhishing' ? 'text-purple-700' : 'text-emerald-700'
                            } relative`}>
                            {current.message.title}
                          </span> {current.message.body}
                        </p>
                        <p className="text-sm text-slate-700 leading-snug mt-2">
                          {current.message.instruction}
                        </p>

                        {/* QR Code Placeholder for Quishing */}
                        {current.message.qrPlaceholder && (
                          <div className="mt-3 flex justify-center">
                            <div className="bg-white p-2 rounded-lg shadow-inner border border-gray-200">
                              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center">
                                <QrCode className="w-10 h-10 text-white" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className={`mt-2 ${activeThreat === 'smishing' ? 'bg-rose-100' :
                            activeThreat === 'phishing' ? 'bg-red-100' :
                              activeThreat === 'spearPhishing' ? 'bg-purple-100' : 'bg-emerald-100'
                          } px-2 py-1 rounded-md inline-block transition-all duration-300`}>
                          <span className={`${activeThreat === 'smishing' ? 'text-rose-700' :
                              activeThreat === 'phishing' ? 'text-red-700' :
                                activeThreat === 'spearPhishing' ? 'text-purple-700' : 'text-emerald-700'
                            } text-xs font-mono break-all transition-all duration-300`}>
                            {current.message.link}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines (Desktop only) */}
                  <div className="hidden md:block">
                    <div className="absolute top-[75px] -right-4 w-8 h-0.5 bg-gradient-to-r from-rose-400 to-rose-300"></div>
                    <div className="absolute top-[170px] -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300"></div>
                    <div className="absolute top-[265px] -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-indigo-300"></div>
                  </div>
                </div>

                {/* Dynamic Explanatory Callouts */}
                <div className="flex-1 space-y-4 w-full md:pt-0 pt-4">
                  {current.callouts.map((callout, idx) => (
                    <div key={idx} className={`bg-white p-4 rounded-xl shadow-md border-l-4 border-${current.borderColors[idx]} hover:shadow-lg transition-all`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${current.gradient} text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0`}>
                          {callout.number}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 mb-1">{callout.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">{callout.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Prevention Checklist Row - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-[20px] border border-blue-200 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">Verify Senders</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Cross-check numbers with official channels before responding.</p>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-[20px] border border-amber-200 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                <Link2Off className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">Never Click Urgency Links</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Navigate to official websites manually instead of clicking links.</p>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-[20px] border border-emerald-200 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">Report to Copilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Submit suspicious texts to AI for instant safety scanning.</p>
            </div>
          </div>

          {/* Additional Learning Section */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-[24px] p-6 border border-purple-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-purple-700 uppercase tracking-wide">Pro Tips</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-purple-500 mt-0.5" />
                <p className="text-xs text-slate-700">🔍 <span className="font-semibold">Hover before you click</span> — Always preview URLs before tapping on mobile devices</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-purple-500 mt-0.5" />
                <p className="text-xs text-slate-700">⏱️ <span className="font-semibold">Take 30 seconds</span> — Scammers rely on rushed decisions, slow down and verify</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-purple-500 mt-0.5" />
                <p className="text-xs text-slate-700">🛡️ <span className="font-semibold">Enable 2FA</span> — Two-factor authentication adds critical protection to your accounts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glossary Sidebar (35%) - Interactive Threat Directory */}
        <div className="lg:w-[35%] space-y-6">
          {/* Threat Vector Directory Card - Interactive */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-[24px] p-6 border border-gray-200 shadow-xl sticky top-4">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Threat Vector Directory</h3>
            </div>

            <div className="space-y-5">
              <ThreatCard
                id="smishing"
                title="Smishing"
                subtitle="(SMS Phishing)"
                icon={MessageSquare}
                colorScheme="indigo"
              />
              <ThreatCard
                id="phishing"
                title="Phishing"
                subtitle="(Email Spoofing)"
                icon={Mail}
                colorScheme="rose"
              />
              <ThreatCard
                id="spearPhishing"
                title="Spear Phishing"
                subtitle=""
                icon={Target}
                colorScheme="purple"
              />
              <ThreatCard
                id="quishing"
                title="Quishing"
                subtitle="(QR Code Scams)"
                icon={QrCode}
                colorScheme="emerald"
              />
            </div>

            {/* Active Threat Indicator */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className={`w-2 h-2 rounded-full ${activeThreat === 'smishing' ? 'bg-indigo-500' :
                    activeThreat === 'phishing' ? 'bg-rose-500' :
                      activeThreat === 'spearPhishing' ? 'bg-purple-500' : 'bg-emerald-500'
                  }`}></div>
                <span>Currently viewing: <span className="font-bold text-slate-700">{current.name}</span></span>
              </div>
            </div>
          </div>

          {/* Trending Tactics AI Insight Card - Enhanced */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-[24px] p-6 border-2 border-amber-300 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-400/10 to-orange-400/10 rounded-tr-full"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide">AI Threat Intelligence</h3>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-3">
                <p className="text-base font-extrabold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                  AI Voice Cloning Impersonation
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                🚨 Copilot has detected a <span className="font-bold text-rose-600 bg-rose-100 px-1 rounded">40% surge</span> in scams utilizing AI-generated audio to mimic distressed family members over phone calls.
              </p>
              <div className="mt-3 p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800 font-semibold">
                  💡 Pro Tip: Always verify identities through secondary channels like video calls or secret questions.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[24px] p-6 border border-indigo-200 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center gap-1 bg-indigo-100 px-3 py-1 rounded-full mb-3">
                <Zap className="w-3 h-3 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-700">Did You Know?</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-indigo-600 text-lg">91%</span> of cyberattacks begin with a phishing email. Stay vigilant and always verify before clicking!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;