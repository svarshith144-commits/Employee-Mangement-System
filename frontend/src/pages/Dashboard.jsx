import React from 'react';
import { useStore } from '../store/useStore';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  Clock, 
  CalendarDays, 
  CheckSquare, 
  TrendingUp, 
  QrCode, 
  Download, 
  Megaphone, 
  Bell, 
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { generatePayslipPDF } from '../utils/pdfGenerator';
import EmployeeQRCard from '../components/EmployeeQRCard';

export default function Dashboard() {
  const { currentUser, attendance, leaveBalances, tasks, announcements, notifications, payroll, holidays, markAttendanceToday } = useStore();
  const { onOpenQRScanner } = useOutletContext();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAtt = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);

  const empLeaveBal = leaveBalances[currentUser.id] || { annual: { remaining: 12 }, sick: { remaining: 7 }, casual: { remaining: 8 } };
  const totalLeaveRem = (empLeaveBal.annual?.remaining || 0) + (empLeaveBal.sick?.remaining || 0) + (empLeaveBal.casual?.remaining || 0);

  const userTasks = tasks.filter(t => t.assignedToId === currentUser.id);
  const activeTasksCount = userTasks.filter(t => t.status !== 'COMPLETED').length;

  const latestPayslip = payroll.find(p => p.employeeId === currentUser.id) || payroll[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Digital Employee Platform</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Good Morning, {currentUser.name.split(' ')[0]} 👋
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              Welcome back to your workspace. Here is your operational overview for today.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono">
              <span className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-300">
                ID: <strong className="text-indigo-400">{currentUser.id}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-300">
                Department: <strong className="text-emerald-400">{currentUser.department}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-300">
                Designation: <strong className="text-amber-400">{currentUser.designation}</strong>
              </span>
            </div>
          </div>

          {/* Today's Quick Check-In Box */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shrink-0 w-full md:w-72 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" /> Today's Punch
              </span>
              {todayAtt ? (
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                  {todayAtt.status}
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded-full">
                  NOT MARKED
                </span>
              )}
            </div>

            {todayAtt ? (
              <div className="space-y-1 mb-4 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Check In:</span>
                  <span className="font-mono text-slate-200 font-semibold">{todayAtt.checkIn}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Check Out:</span>
                  <span className="font-mono text-slate-200 font-semibold">{todayAtt.checkOut}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Working Hours:</span>
                  <span className="font-mono text-emerald-400 font-bold">{todayAtt.workingHours}</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                You haven't checked in yet today. Use quick check-in or scan QR.
              </p>
            )}

            <div className="flex gap-2">
              {!todayAtt ? (
                <button
                  onClick={() => markAttendanceToday('CHECK_IN')}
                  className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Quick Check-In
                </button>
              ) : todayAtt.checkOut === '-' ? (
                <button
                  onClick={() => markAttendanceToday('CHECK_OUT')}
                  className="flex-1 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-600/30 flex items-center justify-center gap-1"
                >
                  <Clock className="w-3.5 h-3.5" /> Check Out Now
                </button>
              ) : (
                <div className="w-full text-center py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded-xl">
                  ✓ Attendance Logged
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Stat */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Attendance Rate</span>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">94%</span>
            <span className="text-xs font-semibold text-emerald-400">+2% this month</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }} />
          </div>
        </div>

        {/* Leave Stat */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Leave Balance</span>
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalLeaveRem} Days</span>
            <span className="text-xs text-slate-400">Remaining</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>

        {/* Tasks Stat */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Assigned Tasks</span>
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{activeTasksCount} Active</span>
            <span className="text-xs text-amber-400 font-semibold">{userTasks.length} Total</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(activeTasksCount / (userTasks.length || 1)) * 100}%` }} />
          </div>
        </div>

        {/* Performance Stat */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Performance Index</span>
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">87%</span>
            <span className="text-xs text-purple-400 font-semibold">Q3 Rating</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '87%' }} />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Tasks & Announcements */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Tasks Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-100">My Active Tasks</h3>
                <p className="text-xs text-slate-400">Tasks assigned to you requiring attention</p>
              </div>
              <Link 
                to="/tasks" 
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View Kanban Board <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {userTasks.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No active tasks assigned.</p>
              ) : (
                userTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          task.priority === 'HIGH' || task.priority === 'URGENT' 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs font-bold text-slate-200 truncate">{task.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{task.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono">Due: {task.dueDate}</span>
                      <div className="text-xs font-bold text-indigo-400 mt-0.5">{task.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Announcements Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">Company Announcements</h3>
                  <p className="text-xs text-slate-400">Latest updates from HR and Operations</p>
                </div>
              </div>
              <Link to="/announcements" className="text-xs text-indigo-400 hover:underline">View All</Link>
            </div>

            <div className="space-y-4">
              {announcements.slice(0, 2).map(ann => (
                <div key={ann.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 relative overflow-hidden">
                  {ann.urgent && (
                    <div className="absolute top-0 right-0 px-3 py-0.5 bg-rose-600 text-white text-[9px] font-bold tracking-wider uppercase rounded-bl-xl">
                      URGENT
                    </div>
                  )}
                  <h4 className="text-sm font-bold text-slate-200 mb-1">{ann.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{ann.content}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>By {ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Employee QR & Latest Payslip */}
        <div className="space-y-8">
          
          {/* QR Pass Card */}
          <EmployeeQRCard employee={currentUser} />

          {/* Latest Payslip Quick Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100">Latest Payslip</h3>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                {latestPayslip?.status}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Period:</span>
                <span className="font-semibold text-slate-200">{latestPayslip?.month} {latestPayslip?.year}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gross Salary:</span>
                <span className="font-semibold text-slate-200">₹{latestPayslip?.grossSalary?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Deductions & Tax:</span>
                <span className="font-semibold text-rose-400">-₹{(latestPayslip?.deductions + latestPayslip?.tax)?.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm">
                <span className="text-indigo-300">Net Salary:</span>
                <span className="text-emerald-400">₹{latestPayslip?.netSalary?.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => generatePayslipPDF(latestPayslip)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" /> Download PDF Payslip
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
