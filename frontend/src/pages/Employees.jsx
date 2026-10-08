import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Grid, 
  List, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Shield, 
  ChevronRight,
  X,
  CheckCircle2
} from 'lucide-react';

export default function Employees() {
  const { employees, currentUser, addEmployee, departments } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: 'Software Developer',
    role: 'EMPLOYEE',
    phone: '',
    gender: 'Male',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: 50000,
    status: 'ACTIVE'
  });

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'ALL' || emp.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      ...formData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      workLocation: 'Bengaluru HQ',
      emergencyContact: '+91 98000 00000'
    });
    setIsAddModalOpen(false);
  };

  const statusBadges = {
    ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    ON_LEAVE: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    PROBATION: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    INACTIVE: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    RESIGNED: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    TERMINATED: 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  const isHrOrAdmin = currentUser.role === 'HR' || currentUser.role === 'ADMIN';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Employee Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage organization members, details, roles, and employment statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* HR/Admin Add Employee Button */}
          {isHrOrAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" /> Add New Employee
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Department Filter */}
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.name} className="bg-slate-900">{d.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Statuses</option>
              <option value="ACTIVE" className="bg-slate-900">ACTIVE</option>
              <option value="ON_LEAVE" className="bg-slate-900">ON_LEAVE</option>
              <option value="PROBATION" className="bg-slate-900">PROBATION</option>
              <option value="INACTIVE" className="bg-slate-900">INACTIVE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <div 
              key={emp.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative group"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-950 border border-slate-800 text-indigo-400 font-bold rounded-lg">
                  {emp.employeeId}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${statusBadges[emp.status] || 'bg-slate-800 text-slate-400'}`}>
                  {emp.status}
                </span>
              </div>

              {/* Avatar & Info */}
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={emp.avatar} 
                  alt={emp.name} 
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/20 mb-3 group-hover:ring-indigo-500/50 transition-all"
                />
                <h3 className="text-base font-bold text-slate-100">{emp.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold">{emp.designation}</p>
                <p className="text-[11px] text-slate-400">{emp.department}</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-400 mb-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{emp.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{emp.workLocation}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/employees/${emp.id}`}
                className="w-full py-2.5 bg-slate-950 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                View Full Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-slate-200">{emp.name}</div>
                        <div className="text-[11px] text-slate-400">{emp.email}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-semibold text-indigo-400">{emp.employeeId}</td>
                    <td className="p-4">{emp.department}</td>
                    <td className="p-4">{emp.designation}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg">
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${statusBadges[emp.status]}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/employees/${emp.id}`}
                        className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg font-bold text-[11px] transition-all"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal for HR/Admin */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base">Add New Employee Record</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="john.doe@enterprise.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Software Developer"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">System Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Monthly Basic Salary (₹)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
