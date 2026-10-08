import React, { useState } from 'react';
import { useStore, PRESET_USERS } from '../store/useStore';
import { 
  Bell, 
  Search, 
  QrCode, 
  UserCheck, 
  ShieldAlert, 
  Briefcase, 
  LogOut, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onOpenQRScanner }) {
  const { currentUser, switchRole, notifications, markNotificationRead, markAllNotificationsRead, logout } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read && (n.userId === currentUser.id || n.userId === 'ALL')).length;

  const roleColors = {
    EMPLOYEE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    MANAGER: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    HR: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    ADMIN: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between transition-all">
      {/* Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search employees, tasks, departments..." 
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* QR Scanner Quick Button */}
        <button
          onClick={onOpenQRScanner}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold transition-all group"
          title="Open QR Scanner for Attendance"
        >
          <QrCode className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Scan QR Attendance</span>
        </button>

        {/* Dynamic Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all ${roleColors[currentUser.role]}`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Role: {currentUser.role}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Simulate Role Context
              </div>
              {Object.keys(PRESET_USERS).map((roleKey) => {
                const u = PRESET_USERS[roleKey];
                const isActive = currentUser.role === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => {
                      switchRole(roleKey);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                      isActive ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.designation} ({roleKey})</div>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-2 ring-slate-900 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-2 ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-100">Notifications</h4>
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-full">
                    {unreadCount} New
                  </span>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] text-indigo-400 hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 my-2">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-500">No notifications available</p>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.link) navigate(n.link);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-xs rounded-xl cursor-pointer transition-colors ${
                        !n.read ? 'bg-indigo-950/30 text-slate-200' : 'text-slate-400 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex justify-between font-semibold text-slate-200 mb-1">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{n.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Summary */}
        <Link to="/profile" className="flex items-center gap-3 pl-2 border-l border-slate-800/80">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/30"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400">{currentUser.designation}</div>
          </div>
        </Link>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="p-2 text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ml-1"
          title="Sign Out of Platform"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden xl:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
