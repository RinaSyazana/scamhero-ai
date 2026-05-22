import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, Mail, User, Calendar, CheckCircle2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const displayName = user.displayName || 'ScamHero User';
  const email = user.email || '';
  const photoURL = user.photoURL;
  const createdAt = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 px-2 lg:px-0">

      {/* Avatar + Name Card */}
      <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1D61D1] to-blue-400 flex items-center justify-center text-white text-3xl font-extrabold border-4 border-blue-100 shadow-md mb-4">
            {initials}
          </div>
        )}
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">{displayName}</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">{email}</p>

        <div className="mt-4 flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-700">Verified Member</span>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-700 uppercase tracking-wide mb-2">Account Details</h2>

        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <User className="h-4 w-4 text-[#1D61D1]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Display Name</p>
            <p className="text-sm font-bold text-slate-700">{displayName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <Mail className="h-4 w-4 text-[#1D61D1]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</p>
            <p className="text-sm font-bold text-slate-700">{email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <Calendar className="h-4 w-4 text-[#1D61D1]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Member Since</p>
            <p className="text-sm font-bold text-slate-700">{createdAt}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <Shield className="h-4 w-4 text-[#1D61D1]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Access Level</p>
            <p className="text-sm font-bold text-slate-700">Full Access — Unlimited Scans</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all"
      >
        <LogOut className="h-4 w-4" />
        <span>Log Out</span>
      </button>

    </div>
  );
};

export default Profile;
