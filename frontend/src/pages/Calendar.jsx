import React from 'react';
import { useStore } from '../store/useStore';
import { Calendar as CalendarIcon, Sparkles, MapPin, Tag } from 'lucide-react';

export default function CalendarPage() {
  const { holidays } = useStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Company Holiday Calendar</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Official corporate holidays, festival breaks, state holidays, and scheduled company events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {holidays.map(h => (
          <div key={h.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-indigo-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                {h.type}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-100">{h.title}</h3>
              <p className="text-xs text-indigo-400 font-mono mt-1 font-semibold">
                {h.date} ({h.day})
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
              <span>Status: Mandatory Holiday</span>
              <span>All Locations</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
