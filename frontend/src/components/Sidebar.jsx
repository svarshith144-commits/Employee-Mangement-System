import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  CheckSquare,
  TrendingUp,
  DollarSign,
  FileText,
  Megaphone,
  Calendar,
  Building2,
  BarChart3,
  UserCheck,
  ShieldCheck,
  User,
  Settings,
  Sparkles,
  QrCode
} from 'lucide-react';

export default function Sidebar() {
  const { currentUser } = useStore();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Employees', icon: Users, path: '/employees', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Attendance', icon: Clock, path: '/attendance', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'QR Scan', icon: QrCode, path: '/attendance/scan', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Leave', icon: CalendarDays, path: '/leave', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Tasks', icon: CheckSquare, path: '/tasks', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Performance', icon: TrendingUp, path: '/performance', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Payroll', icon: DollarSign, path: '/payroll', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Documents', icon: FileText, path: '/documents', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Announcements', icon: Megaphone, path: '/announcements', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Calendar', icon: Calendar, path: '/calendar', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Departments', icon: Building2, path: '/departments', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
    { label: 'Reports', icon: BarChart3, path: '/reports', roles: ['MANAGER', 'HR', 'ADMIN'] },
    { label: 'HR Portal', icon: UserCheck, path: '/hr', roles: ['HR', 'ADMIN'], highlight: true },
    { label: 'Admin Panel', icon: ShieldCheck, path: '/admin', roles: ['ADMIN'], highlight: true },
    { label: 'Profile', icon: User, path: '/profile', roles: ['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              ENTERPRISE HR
            </h1>
            <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Digital Platform</p>
          </div>
        </div>

        {/* Current Active User Pill */}
        <div className="mx-4 my-4 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/40"
          />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</div>
            <div className="text-[10px] text-indigo-400 font-mono font-semibold truncate">{currentUser.id}</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 py-2 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : item.highlight
                      ? 'text-indigo-300 hover:bg-indigo-950/40 hover:text-indigo-200 border border-indigo-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Version info */}
      <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="font-mono">v2.5.0-STABLE</span>
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Status: Online" />
      </div>
    </aside>
  );
}
