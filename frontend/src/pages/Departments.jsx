import React from 'react';
import { useStore } from '../store/useStore';
import { Building2, Users, UserCheck, Shield, ChevronDown, Sparkles } from 'lucide-react';

export default function Departments() {
  const { departments, employees } = useStore();

  const orgTree = [
    {
      title: 'Chief Operations Officer (Admin)',
      name: 'Eleanor Vance',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
      children: [
        {
          title: 'VP of Engineering',
          name: 'Sarah Jenkins',
          role: 'MANAGER',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
          children: [
            { name: 'Varshith Kumar', designation: 'Senior Software Developer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
            { name: 'Aisha Patel', designation: 'Frontend Specialist', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250' }
          ]
        },
        {
          title: 'Head of People Operations',
          name: 'Michael Scott',
          role: 'HR',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
          children: [
            { name: 'Priya Sharma', designation: 'Lead Content Strategist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Departments & Organization Structure</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Explore corporate structure, department heads, employee distribution, and reporting hierarchy.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(d => (
          <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                {d.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-100">{d.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">{d.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Department Head</span>
                <span className="font-bold text-slate-200">{d.manager}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Headcount</span>
                <span className="font-extrabold text-indigo-400 font-mono">{d.employeeCount} Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Organization Hierarchy Tree */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" /> Interactive Organization Hierarchy Chart
        </h3>

        <div className="space-y-6">
          {orgTree.map(exec => (
            <div key={exec.name} className="space-y-6">
              {/* Level 1: Exec */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-slate-950 border border-indigo-500/40 max-w-md mx-auto shadow-2xl flex items-center gap-4">
                <img src={exec.avatar} alt={exec.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/40" />
                <div>
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded-full">{exec.role}</span>
                  <h4 className="font-extrabold text-sm text-white">{exec.name}</h4>
                  <p className="text-xs text-indigo-300">{exec.title}</p>
                </div>
              </div>

              {/* Connecting vertical line */}
              <div className="w-0.5 h-6 bg-indigo-500/40 mx-auto" />

              {/* Level 2: Managers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {exec.children.map(mgr => (
                  <div key={mgr.name} className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl flex items-center gap-4">
                      <img src={mgr.avatar} alt={mgr.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-500/40" />
                      <div>
                        <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-[9px] font-bold rounded-full">{mgr.role}</span>
                        <h5 className="font-bold text-xs text-slate-100">{mgr.name}</h5>
                        <p className="text-[11px] text-slate-400">{mgr.title}</p>
                      </div>
                    </div>

                    <div className="w-0.5 h-4 bg-slate-800 mx-auto" />

                    {/* Level 3: Individual Contributors */}
                    <div className="space-y-2 pl-4 border-l-2 border-slate-800/80">
                      {mgr.children.map(emp => (
                        <div key={emp.name} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs">
                          <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-slate-200">{emp.name}</div>
                            <div className="text-[10px] text-slate-400">{emp.designation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
