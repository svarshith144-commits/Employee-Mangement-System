import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  DollarSign, 
  Download, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Clock, 
  ShieldCheck,
  X
} from 'lucide-react';
import { generatePayslipPDF } from '../utils/pdfGenerator';

export default function Payroll() {
  const { payroll, currentUser, employees } = useStore();
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  const isHrOrAdmin = currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  // Filter payroll records
  const userPayroll = payroll.filter(p => p.employeeId === currentUser.id);
  const activeRecord = userPayroll[0] || payroll[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Payroll & Salary Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            View compensation breakdowns, tax deductions, pay history, and download PDF payslips.
          </p>
        </div>

        {isHrOrAdmin && (
          <button
            onClick={() => setIsProcessModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Process Monthly Payroll
          </button>
        )}
      </div>

      {/* Featured Current Payslip Card */}
      {activeRecord && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full">
                {activeRecord.month} {activeRecord.year} Payslip
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{activeRecord.employeeName}</h3>
              <p className="text-xs text-slate-400 font-mono">{activeRecord.designation} • {activeRecord.department}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Net Salary Payable</span>
                <span className="text-3xl font-extrabold text-emerald-400">₹{activeRecord.netSalary?.toLocaleString()}</span>
              </div>
              <button
                onClick={() => generatePayslipPDF(activeRecord)}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 shrink-0"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>

          {/* Salary Grid Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Earnings Column */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="font-bold text-slate-200 border-b border-slate-800/80 pb-2 text-sm text-indigo-300">
                Earnings Breakdown
              </h4>
              <div className="flex justify-between text-slate-300">
                <span>Basic Salary:</span>
                <span className="font-mono font-bold">₹{activeRecord.basicSalary?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>House & Travel Allowances:</span>
                <span className="font-mono font-bold">₹{activeRecord.allowances?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Performance Bonus:</span>
                <span className="font-mono font-bold">₹{activeRecord.bonus?.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-slate-100">
                <span>Gross Earnings:</span>
                <span className="text-indigo-400 font-mono">₹{activeRecord.grossSalary?.toLocaleString()}</span>
              </div>
            </div>

            {/* Deductions Column */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="font-bold text-slate-200 border-b border-slate-800/80 pb-2 text-sm text-rose-300">
                Deductions & Taxes
              </h4>
              <div className="flex justify-between text-slate-300">
                <span>Provident Fund & Medical Insurance:</span>
                <span className="font-mono font-bold text-rose-400">-₹{activeRecord.deductions?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Income Tax (TDS):</span>
                <span className="font-mono font-bold text-rose-400">-₹{activeRecord.tax?.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-slate-100">
                <span>Total Deductions:</span>
                <span className="text-rose-400 font-mono">-₹{(activeRecord.deductions + activeRecord.tax)?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Salary History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-100">Payroll Disbursement History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Period</th>
                <th className="p-3">Gross Salary</th>
                <th className="p-3">Deductions</th>
                <th className="p-3">Net Salary</th>
                <th className="p-3">Paid Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(isHrOrAdmin ? payroll : userPayroll).map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-200">{p.employeeName}</td>
                  <td className="p-3 font-mono text-slate-300">{p.month} {p.year}</td>
                  <td className="p-3 font-mono text-slate-200">₹{p.grossSalary?.toLocaleString()}</td>
                  <td className="p-3 font-mono text-rose-400">-₹{(p.deductions + p.tax)?.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">₹{p.netSalary?.toLocaleString()}</td>
                  <td className="p-3 font-mono text-slate-500">{p.paidOn}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => generatePayslipPDF(p)}
                      className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
