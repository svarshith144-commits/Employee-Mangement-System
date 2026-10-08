import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  User, 
  Clock, 
  CalendarDays, 
  CheckSquare, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Activity,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Shield,
  Download
} from 'lucide-react';
import EmployeeQRCard from '../components/EmployeeQRCard';
import { generatePayslipPDF } from '../utils/pdfGenerator';

export default function EmployeeDetails() {
  const { id } = useParams();
  const { employees, attendance, leaveRequests, tasks, performance, payroll, documents, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('Profile');

  const emp = employees.find(e => e.id === id || e.employeeId === id) || employees[0];

  const empAtt = attendance.filter(a => a.employeeId === emp.id);
  const empLeave = leaveRequests.filter(l => l.employeeId === emp.id);
  const empTasks = tasks.filter(t => t.assignedToId === emp.id);
  const empPerf = performance[emp.id] || { overallScore: 85, ratings: { technical: 88, communication: 82, teamwork: 85, productivity: 86, problemSolving: 84 }, goals: [] };
  const empPayroll = payroll.filter(p => p.employeeId === emp.id);
  const empDocs = documents.filter(d => d.employeeId === emp.id);

  const tabs = [
    { label: 'Profile', icon: User },
    { label: 'Attendance', icon: Clock },
    { label: 'Leave', icon: CalendarDays },
    { label: 'Tasks', icon: CheckSquare },
    { label: 'Performance', icon: TrendingUp },
    { label: 'Payroll', icon: DollarSign },
    { label: 'Documents', icon: FileText },
    { label: 'Activity', icon: Activity },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Back Link & Header */}
      <div className="flex items-center gap-4">
        <Link 
          to="/employees" 
          className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-extrabold text-white">{emp.name}</h2>
          <p className="text-xs text-slate-400">Employee Profile & Workspace Record</p>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={emp.avatar} 
            alt={emp.name} 
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30"
          />
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-100">{emp.name}</h3>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                {emp.status}
              </span>
            </div>
            <p className="text-xs text-indigo-400 font-semibold">{emp.designation}</p>
            <p className="text-xs text-slate-400 mt-0.5">{emp.department} • Joined {emp.joiningDate}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">Manager:</span>
            <span className="font-semibold text-slate-200">{emp.manager}</span>
          </div>
          <div className="px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">Location:</span>
            <span className="font-semibold text-slate-200">{emp.workLocation}</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        
        {/* PROFILE TAB */}
        {activeTab === 'Profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Personal & Employment Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Full Name</span>
                  <span className="font-semibold text-slate-200">{emp.name}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Employee ID</span>
                  <span className="font-semibold text-indigo-400 font-mono">{emp.employeeId}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Email Address</span>
                  <span className="font-semibold text-slate-200">{emp.email}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Phone</span>
                  <span className="font-semibold text-slate-200">{emp.phone}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Date of Birth</span>
                  <span className="font-semibold text-slate-200">{emp.dob || '1995-05-12'}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Emergency Contact</span>
                  <span className="font-semibold text-slate-200">{emp.emergencyContact}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 sm:col-span-2">
                  <span className="text-slate-500 block text-[10px]">Address</span>
                  <span className="font-semibold text-slate-200">{emp.address || 'Indiranagar 100ft Rd, Bengaluru, KA'}</span>
                </div>
              </div>
            </div>

            <div>
              <EmployeeQRCard employee={emp} />
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'Attendance' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Attendance Log History</h4>
            <div className="divide-y divide-slate-800">
              {empAtt.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No recent attendance records found.</p>
              ) : (
                empAtt.map(a => (
                  <div key={a.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200">{a.date}</span>
                      <span className="text-[10px] text-slate-400 ml-3">Method: {a.method}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-slate-400">In: <strong className="text-slate-200">{a.checkIn}</strong></span>
                      <span className="text-slate-400">Out: <strong className="text-slate-200">{a.checkOut}</strong></span>
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-bold text-[10px]">
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* LEAVE TAB */}
        {activeTab === 'Leave' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Leave Applications & History</h4>
            <div className="space-y-3">
              {empLeave.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No leave requests submitted yet.</p>
              ) : (
                empLeave.map(l => (
                  <div key={l.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{l.leaveType} Leave ({l.days} Days)</div>
                      <div className="text-slate-400">{l.startDate} to {l.endDate}</div>
                      <p className="text-[11px] text-slate-500 mt-1">{l.reason}</p>
                    </div>
                    <span className={`px-2.5 py-1 font-bold text-[10px] rounded-full border ${
                      l.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {l.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'Tasks' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Assigned Tasks</h4>
            <div className="space-y-3">
              {empTasks.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No tasks assigned to this employee.</p>
              ) : (
                empTasks.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{t.title}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{t.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-indigo-400 font-bold">{t.status}</span>
                      <div className="text-[10px] text-slate-500">Due {t.dueDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PAYROLL TAB */}
        {activeTab === 'Payroll' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">Payslip Records</h4>
            <div className="space-y-3">
              {empPayroll.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No payslip records available.</p>
              ) : (
                empPayroll.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{p.month} {p.year} Payslip</div>
                      <div className="text-emerald-400 font-bold text-sm mt-0.5">Net Salary: ₹{p.netSalary?.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => generatePayslipPDF(p)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === 'Performance' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-slate-200 text-sm mb-2">Overall Score: {empPerf.overallScore}%</h4>
              <p className="text-slate-400 mb-4">{empPerf.managerFeedback}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(empPerf.ratings || {}).map(([k, v]) => (
                  <div key={k} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="capitalize text-slate-400 text-[10px]">{k}</div>
                    <div className="text-lg font-bold text-indigo-400">{v}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'Documents' && (
          <div className="space-y-3 text-xs">
            {empDocs.map(d => (
              <div key={d.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">{d.title}</div>
                  <div className="text-[10px] text-slate-500">{d.category} • {d.fileSize}</div>
                </div>
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] font-semibold">View File</button>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'Activity' && (
          <div className="space-y-3 text-xs text-slate-400">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
              <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>Checked-in via QR Scan today at 09:12 AM</div>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>Updated task "Develop Spring Security JWT Endpoints" progress to 75%</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
