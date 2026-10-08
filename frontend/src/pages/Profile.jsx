import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import EmployeeQRCard from '../components/EmployeeQRCard';
import { User, Mail, Phone, MapPin, Building2, Shield, Lock, Save, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const { currentUser, updateEmployee } = useStore();
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [emergencyContact, setEmergencyContact] = useState(currentUser.emergencyContact || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateEmployee(currentUser.id, { phone, address, emergencyContact });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Employee Profile Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          View your employment credentials and update permitted personal contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Edit Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/30" />
            <div>
              <h3 className="text-lg font-bold text-slate-100">{currentUser.name}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{currentUser.designation}</p>
              <span className="text-[10px] font-mono text-slate-400">{currentUser.id}</span>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            {/* Non-Editable Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative">
                <Lock className="w-3.5 h-3.5 text-slate-600 absolute right-3 top-3" />
                <span className="text-[10px] text-slate-500 block">Department</span>
                <span className="font-semibold text-slate-300">{currentUser.department}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative">
                <Lock className="w-3.5 h-3.5 text-slate-600 absolute right-3 top-3" />
                <span className="text-[10px] text-slate-500 block">Designation</span>
                <span className="font-semibold text-slate-300">{currentUser.designation}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative">
                <Lock className="w-3.5 h-3.5 text-slate-600 absolute right-3 top-3" />
                <span className="text-[10px] text-slate-500 block">Reporting Manager</span>
                <span className="font-semibold text-slate-300">{currentUser.manager}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative">
                <Lock className="w-3.5 h-3.5 text-slate-600 absolute right-3 top-3" />
                <span className="text-[10px] text-slate-500 block">Joining Date</span>
                <span className="font-semibold text-slate-300">{currentUser.joiningDate}</span>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-sm">Editable Contact Details</h4>
              
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Emergency Contact</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Home Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* QR Pass */}
        <div>
          <EmployeeQRCard employee={currentUser} />
        </div>

      </div>
    </div>
  );
}
