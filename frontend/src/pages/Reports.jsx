import React from 'react';
import { useStore } from '../store/useStore';
import { BarChart3, Download, TrendingUp, Users, Calendar, Clock } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function Reports() {
  const { employees, departments } = useStore();

  const attendanceTrends = [
    { month: 'Jan', rate: 91, late: 4 },
    { month: 'Feb', rate: 93, late: 3 },
    { month: 'Mar', rate: 90, late: 5 },
    { month: 'Apr', rate: 95, late: 2 },
    { month: 'May', rate: 94, late: 3 },
    { month: 'Jun', rate: 96, late: 1 },
    { month: 'Jul', rate: 92, late: 4 },
    { month: 'Aug', rate: 95, late: 2 },
    { month: 'Sep', rate: 93, late: 3 },
    { month: 'Oct', rate: 94, late: 2 },
  ];

  const deptData = departments.map(d => ({
    name: d.name,
    count: d.employeeCount
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#a855f7', '#ec4899'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Employee Analytics & HR Reports</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize organizational growth, attendance rates, department statistics, and export summaries.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all">
          <Download className="w-4 h-4" /> Export Analytics Report
        </button>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Attendance Area Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" /> Monthly Attendance Rate (%)
            </h3>
            <span className="text-xs text-emerald-400 font-bold font-mono">94.2% Avg</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrends}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[80, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Headcount by Department
            </h3>
            <span className="text-xs text-indigo-400 font-bold font-mono">115 Total</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
