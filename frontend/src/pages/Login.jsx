import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, PRESET_USERS } from '../store/useStore';
import { Sparkles, Shield, Lock, ArrowRight, UserCheck } from 'lucide-react';

export default function Login() {
  const { isAuthenticated, login } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('varshith.k@enterprise.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedPresetRole, setSelectedPresetRole] = useState('EMPLOYEE');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(selectedPresetRole);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold text-white">Digital Employee Platform</h1>
          <p className="text-xs text-slate-400">Spring Security & React Enterprise Portal</p>
        </div>

        {/* Quick Role Simulator Tabs */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
            Select Role to Login As:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(PRESET_USERS).map(roleKey => {
              const u = PRESET_USERS[roleKey];
              const isSelected = selectedPresetRole === roleKey;
              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => {
                    setSelectedPresetRole(roleKey);
                    setEmail(u.email);
                  }}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="truncate font-bold">{u.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-slate-500">{roleKey}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Security Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
          >
            Authenticate & Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-500 font-mono">
          Spring Security 6.0 • JWT Bearer Token Enabled
        </div>
      </div>
    </div>
  );
}
