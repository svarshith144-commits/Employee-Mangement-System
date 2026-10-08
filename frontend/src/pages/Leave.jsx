import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  CalendarDays, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Check, 
  X, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function Leave() {
  const { currentUser, leaveRequests, leaveBalances, applyLeave, updateLeaveStatus } = useStore();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Apply Form State
  const [leaveType, setLeaveType] = useState('CASUAL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [docName, setDocName] = useState('');

  const empBal = leaveBalances[currentUser.id] || {
    annual: { total: 15, used: 3, remaining: 12 },
    sick: { total: 12, used: 5, remaining: 7 },
    casual: { total: 10, used: 2, remaining: 8 }
  };

  const isManagerOrHr = currentUser.role === 'MANAGER' || currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  // Requests filtered for current view
  const myRequests = leaveRequests.filter(r => r.employeeId === currentUser.id);
  const pendingApprovals = leaveRequests.filter(r => r.status === 'PENDING');

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 1;

    applyLeave({
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      document: docName || null
    });

    setIsApplyModalOpen(false);
    setReason('');
    setDocName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Leave Management System</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Apply for leave, track balances, and manage team leave approval workflows.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Apply For Leave
        </button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Annual Leave */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">Annual Leave</span>
            <span className="font-mono text-indigo-400 font-bold">{empBal.annual?.remaining}/{empBal.annual?.total} Days</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(empBal.annual?.remaining / empBal.annual?.total) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Used: {empBal.annual?.used} days</span>
            <span>Available: {empBal.annual?.remaining} days</span>
          </div>
        </div>

        {/* Sick Leave */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">Sick Leave</span>
            <span className="font-mono text-emerald-400 font-bold">{empBal.sick?.remaining}/{empBal.sick?.total} Days</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(empBal.sick?.remaining / empBal.sick?.total) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Used: {empBal.sick?.used} days</span>
            <span>Available: {empBal.sick?.remaining} days</span>
          </div>
        </div>

        {/* Casual Leave */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">Casual Leave</span>
            <span className="font-mono text-amber-400 font-bold">{empBal.casual?.remaining}/{empBal.casual?.total} Days</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(empBal.casual?.remaining / empBal.casual?.total) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Used: {empBal.casual?.used} days</span>
            <span>Available: {empBal.casual?.remaining} days</span>
          </div>
        </div>
      </div>

      {/* Manager Approval Queue Section */}
      {isManagerOrHr && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-slate-100">Pending Team Leave Approvals</h3>
            </div>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-full">
              {pendingApprovals.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No pending leave requests from team members.</p>
            ) : (
              pendingApprovals.map(req => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm">{req.employeeName}</span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md">{req.department}</span>
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold text-[10px] rounded-md">{req.leaveType}</span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Dates: <strong className="text-slate-200">{req.startDate} → {req.endDate}</strong> ({req.days} Day(s))
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Reason: {req.reason}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'APPROVED')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-600/20"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'REJECTED')}
                      className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Employee Personal Leave Applications History */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-100">Your Leave History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Leave Type</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Days</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Applied On</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myRequests.map(r => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-indigo-400">{r.leaveType}</td>
                  <td className="p-3 font-mono text-slate-200">{r.startDate} to {r.endDate}</td>
                  <td className="p-3 font-bold">{r.days}</td>
                  <td className="p-3 max-w-xs truncate text-slate-400">{r.reason}</td>
                  <td className="p-3 font-mono text-slate-500">{r.appliedOn}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                      r.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      r.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-slate-100 text-sm">Apply for Leave</h3>
              <button onClick={() => setIsApplyModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="CASUAL">CASUAL</option>
                  <option value="SICK">SICK</option>
                  <option value="ANNUAL">ANNUAL</option>
                  <option value="MATERNITY">MATERNITY</option>
                  <option value="PATERNITY">PATERNITY</option>
                  <option value="UNPAID">UNPAID</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Reason for Leave</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide brief explanation for leave request..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Upload Supporting Document (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setDocName(e.target.files[0]?.name || '')}
                  className="w-full text-slate-400 bg-slate-950 border border-slate-800 rounded-xl p-2"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
