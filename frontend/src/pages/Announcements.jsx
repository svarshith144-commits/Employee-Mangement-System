import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Megaphone, Plus, Bell, Calendar, User, ShieldAlert, X } from 'lucide-react';

export default function Announcements() {
  const { announcements, currentUser, createAnnouncement, departments } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'GENERAL',
    targetDepartment: 'All Employees',
    urgent: false
  });

  const isHrOrAdmin = currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnnouncement(form);
    setIsModalOpen(false);
    setForm({ title: '', content: '', category: 'GENERAL', targetDepartment: 'All Employees', urgent: false });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Company Announcements</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Official communications, holiday notices, HR policies, and executive updates.
          </p>
        </div>

        {isHrOrAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Post New Announcement
          </button>
        )}
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-3">
            {ann.urgent && (
              <div className="absolute top-0 right-0 px-4 py-1 bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-bl-2xl">
                URGENT BROADCAST
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                ann.category === 'HOLIDAY' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                ann.category === 'URGENT' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              }`}>
                {ann.category}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Target: {ann.targetDepartment}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100">{ann.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{ann.content}</p>

            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-500">
              <span className="font-medium text-slate-400">Author: {ann.author}</span>
              <span className="font-mono">{ann.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-slate-100 text-sm">Post Company Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Diwali Festival Holidays Announcement"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Content</label>
                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Full text content of announcement..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="GENERAL">GENERAL</option>
                    <option value="HOLIDAY">HOLIDAY</option>
                    <option value="HR">HR</option>
                    <option value="POLICY">POLICY</option>
                    <option value="EVENT">EVENT</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Target Department</label>
                  <select
                    value={form.targetDepartment}
                    onChange={(e) => setForm({ ...form, targetDepartment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All Employees">All Employees</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={form.urgent}
                  onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="urgentCheck" className="text-slate-300 font-semibold cursor-pointer">
                  Mark as High Priority / Urgent Alert
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                >
                  Broadcast Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
