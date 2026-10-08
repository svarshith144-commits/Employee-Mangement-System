import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { useOutletContext } from 'react-router-dom';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  UserX, 
  UserCheck, 
  Filter, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';

export default function Attendance() {
  const { attendance, currentUser, employees, markAttendanceToday } = useStore();
  const { onOpenQRScanner } = useOutletContext();
  const [filterDept, setFilterDept] = useState('ALL');

  const todayStr = new Date().toISOString().split('T')[0];
  const userAtt = attendance.filter(a => a.employeeId === currentUser.id);
  const todayUserAtt = userAtt.find(a => a.date === todayStr);

  // Stats for HR / Manager view
  const todayAllAtt = attendance.filter(a => a.date === todayStr);
  const totalEmployeesCount = employees.length;
  const presentTodayCount = todayAllAtt.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const lateTodayCount = todayAllAtt.filter(a => a.status === 'LATE').length;
  const onLeaveTodayCount = todayAllAtt.filter(a => a.status === 'ON_LEAVE').length;
  const absentTodayCount = Math.max(0, totalEmployeesCount - presentTodayCount - onLeaveTodayCount);

  const isManagerOrHr = currentUser.role === 'MANAGER' || currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Attendance Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time QR scanner check-in, check-out logs, working hours, & employee tracking.
          </p>
        </div>

        <button
          onClick={onOpenQRScanner}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <QrCode className="w-4 h-4" /> Open QR Scanner
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Total Workforce</span>
            <span className="text-2xl font-extrabold text-white">{totalEmployeesCount}</span>
          </div>
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Present Today</span>
            <span className="text-2xl font-extrabold text-emerald-400">{presentTodayCount}</span>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Late Arrivals</span>
            <span className="text-2xl font-extrabold text-amber-400">{lateTodayCount}</span>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">On Leave</span>
            <span className="text-2xl font-extrabold text-indigo-300">{onLeaveTodayCount}</span>
          </div>
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Absent Today</span>
            <span className="text-2xl font-extrabold text-rose-400">{absentTodayCount}</span>
          </div>
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
            <UserX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Today's Punch Widget for logged-in user */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl ring-1 ring-indigo-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Your Attendance Status for Today ({todayStr})</h3>
            <p className="text-xs text-slate-400">
              {todayUserAtt 
                ? `Checked-in at ${todayUserAtt.checkIn} (${todayUserAtt.workingHours} logged)` 
                : 'Not checked-in yet. Use button or scan your QR code pass.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {!todayUserAtt ? (
            <button
              onClick={() => markAttendanceToday('CHECK_IN')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-all"
            >
              Manual Check-In
            </button>
          ) : todayUserAtt.checkOut === '-' ? (
            <button
              onClick={() => markAttendanceToday('CHECK_OUT')}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-amber-600/30 transition-all"
            >
              Manual Check-Out
            </button>
          ) : (
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl text-xs">
              ✓ Today Completed ({todayUserAtt.checkIn} - {todayUserAtt.checkOut})
            </div>
          )}
        </div>
      </div>

      {/* Attendance Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-slate-100">
            {isManagerOrHr ? "All Employees' Daily Attendance Logs" : "Your Monthly Attendance History"}
          </h3>
          <span className="text-xs text-slate-400 font-mono">Total Logs: {isManagerOrHr ? attendance.length : userAtt.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Date</th>
                <th className="p-3">Check-In</th>
                <th className="p-3">Check-Out</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Method</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(isManagerOrHr ? attendance : userAtt).map(a => {
                const emp = employees.find(e => e.id === a.employeeId) || { name: 'Varshith Kumar', employeeId: a.employeeId, avatar: currentUser.avatar };
                return (
                  <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-slate-200">{emp.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{emp.employeeId}</div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{a.date}</td>
                    <td className="p-3 font-mono text-emerald-400">{a.checkIn}</td>
                    <td className="p-3 font-mono text-indigo-300">{a.checkOut}</td>
                    <td className="p-3 font-mono font-bold text-slate-200">{a.workingHours}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded-lg">
                        {a.method}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                        a.status === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        a.status === 'LATE' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
