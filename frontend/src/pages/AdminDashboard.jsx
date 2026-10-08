import React from 'react';
import { useStore } from '../store/useStore';
import { ShieldCheck, Users, Building2, Key, Settings, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const { employees, departments } = useStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-full">
            Executive Admin Control Panel
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">Global System Administration</h2>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Total System Users</span>
          <div className="text-3xl font-extrabold text-white mt-1">{employees.length}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">JWT Authenticated</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Departments</span>
          <div className="text-3xl font-extrabold text-indigo-400 mt-1">{departments.length}</div>
          <span className="text-[11px] text-slate-500">Active Units</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">System Health</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">99.99%</div>
          <span className="text-[11px] text-emerald-400 font-semibold">All Systems Operational</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold">Database Engine</span>
          <div className="text-xl font-extrabold text-amber-400 mt-1">PostgreSQL / H2</div>
          <span className="text-[11px] text-slate-500 font-mono">STOMP WebSocket Active</span>
        </div>
      </div>
    </div>
  );
}
