import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg(null);
      await loginWithGoogle();
    } catch (error: any) {
      console.error('Failed to log in with Google', error);
      setErrorMsg(error.message || 'Failed to login with Google.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative flex items-center justify-center overflow-hidden font-sans">
      
      {/* Background Split Canvas with Wave */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#1D61D1]">
        <svg 
          className="absolute -bottom-[1px] w-full" 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          style={{ height: '8vw', minHeight: '60px' }}
        >
          <path 
            d="M0,0 C320,120 420,120 720,120 C1020,120 1120,0 1440,0 L1440,120 L0,120 Z" 
            fill="#F9FAFB"
          />
        </svg>
      </div>

      {/* Version Tag */}
      <div className="absolute bottom-6 w-full text-center text-xs font-semibold tracking-wider text-gray-400 uppercase z-0">
        SCAMHERO SYSTEM V1.0.0
      </div>

      {/* Floating Contextual Widget */}
      <div className="fixed bottom-6 right-6 bg-blue-50 p-4 rounded-xl shadow-md border border-blue-100 z-10 w-64">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">System Status</h4>
        <button className="w-full bg-[#1D61D1] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-200">
          Check API Connection
        </button>
      </div>

      {/* Central Authentication Card */}
      <div className="relative z-10 bg-white w-full max-w-[420px] rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-10 mx-4 border border-gray-100">
        
        {/* App Icon Badge */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#1D61D1] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Hero Typography */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back !</h1>
          <p className="text-slate-500 text-sm font-medium">Sign in to continue your session</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Auth Actions */}
        <div className="space-y-4">
          
          {/* Action Button 1 (Email) */}
          <button className="w-full bg-[#1D61D1] hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-[12px] transition-colors duration-200">
            Login with Email
          </button>
          
          {/* Action Button 2 (Create Account) */}
          <button className="w-full bg-transparent border border-blue-200 text-[#1D61D1] hover:bg-blue-50 font-bold py-3.5 px-4 rounded-[12px] transition-colors duration-200">
            Create Account
          </button>

          {/* Divider Line */}
          <div className="py-4 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Or connect with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Third-Party Auth */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-4 rounded-[12px] flex items-center justify-center transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
