import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Tasks() {
  const { tasks, currentUser, employees, createTask, updateTaskStatus } = useStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedToId: employees[0]?.id || 'EMP-1024',
    priority: 'HIGH',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const isManager = currentUser.role === 'MANAGER' || currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
    { id: 'REVIEW', title: 'In Review', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
    { id: 'COMPLETED', title: 'Completed', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const assignedEmp = employees.find(emp => emp.id === taskData.assignedToId);
    createTask({
      ...taskData,
      assignedToName: assignedEmp ? assignedEmp.name : 'Team Member',
      department: assignedEmp ? assignedEmp.department : currentUser.department
    });
    setIsCreateModalOpen(false);
    setTaskData({
      title: '',
      description: '',
      assignedToId: employees[0]?.id || 'EMP-1024',
      priority: 'HIGH',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Task Management & Kanban</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Assign, track, and monitor team deliverables, priorities, and deadlines.
          </p>
        </div>

        {isManager && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Create & Assign Task
          </button>
        )}
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col min-h-[500px]">
              
              {/* Column Header */}
              <div className={`p-3 rounded-2xl border ${col.color} mb-4 flex items-center justify-between font-bold text-xs`}>
                <span>{col.title}</span>
                <span className="px-2 py-0.5 bg-slate-950 rounded-full font-mono text-[10px]">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.length === 0 ? (
                  <p className="text-xs text-slate-600 text-center py-8">No tasks</p>
                ) : (
                  colTasks.map(t => (
                    <div 
                      key={t.id} 
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3 shadow-md group"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                          t.priority === 'URGENT' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                          t.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                          'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {t.priority}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Due {t.dueDate}</span>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-100 group-hover:text-indigo-300 transition-colors">
                          {t.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>Progress</span>
                          <span className="font-mono font-bold text-slate-300">{t.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                          <div 
                            className="bg-indigo-500 h-1 rounded-full" 
                            style={{ width: `${t.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Info & Quick Status Move */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5 truncate">
                          <User className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{t.assignedToName}</span>
                        </div>

                        {/* Status transition dropdown */}
                        <select
                          value={t.status}
                          onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-200 focus:outline-none cursor-pointer"
                        >
                          <option value="TODO">TODO</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="REVIEW">REVIEW</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-slate-100 text-sm">Assign New Team Task</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Implement Spring Security JWT Endpoints"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description</label>
                <textarea
                  required
                  rows={3}
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Detail work scope & instructions..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Assign To</label>
                  <select
                    value={taskData.assignedToId}
                    onChange={(e) => setTaskData({ ...taskData, assignedToId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>{e.name} ({e.department})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Priority Level</label>
                  <select
                    value={taskData.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Due Date</label>
                <input
                  type="date"
                  required
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                >
                  Create & Notify Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
