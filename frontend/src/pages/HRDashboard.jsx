import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { UserCheck, Users, CalendarDays, FileText, Megaphone, Plus, Clock, Award } from 'lucide-react';

export default function HRDashboard() {
  const { employees, leaveRequests, attendance, documents } = useStore();

  const pendingLeaveCount = leaveRequests.filter(r => r.status === 'PENDING').length;
  const onLeaveCount = employees.filter(e => e.status === 'ON_LEAVE').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full">
            Human Resources Portal
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">HR Operations Dashboard</h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/employees"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" /> Manage Workforce
          </Link>
        </div>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Total Employees</span>
          <div className="text-3xl font-extrabold text-white mt-1">{employees.length}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+3 New this month</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Pending Leave Requests</span>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{pendingLeaveCount}</div>
          <Link to="/leave" className="text-[11px] text-indigo-400 hover:underline">Review requests →</Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Currently On Leave</span>
          <div className="text-3xl font-extrabold text-indigo-300 mt-1">{onLeaveCount}</div>
          <span className="text-[11px] text-slate-500 font-mono">Approved status</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Compliance Documents</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{documents.length}</div>
          <span className="text-[11px] text-slate-500 font-mono">100% verified</span>
        </div>
      </div>
    </div>
  );
}
