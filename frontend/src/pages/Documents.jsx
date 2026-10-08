import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { FileText, Shield, Download, Lock, Eye, Plus, Upload, X } from 'lucide-react';

export default function Documents() {
  const { documents, currentUser } = useStore();
  const [filterCategory, setFilterCategory] = useState('ALL');

  const myDocs = documents.filter(d => d.employeeId === currentUser.id || !d.isPrivate);

  const filteredDocs = filterCategory === 'ALL' 
    ? myDocs 
    : myDocs.filter(d => d.category === filterCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Document Vault & Files</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Secure employee documents, contracts, identity verification, and HR policy files.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all">
          <Upload className="w-4 h-4" /> Upload Secure File
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['ALL', 'OFFER_LETTER', 'ID_PROOF', 'EXPERIENCE', 'POLICY'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-indigo-500/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                {doc.isPrivate ? (
                  <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> PRIVATE
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                    COMPANY POLICY
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {doc.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  Category: {doc.category} • {doc.fileSize}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 font-mono">Uploaded: {doc.uploadedAt}</span>
              <button className="px-3 py-1.5 bg-slate-950 hover:bg-indigo-600 border border-slate-800 text-slate-300 hover:text-white rounded-xl font-bold flex items-center gap-1.5 transition-all">
                <Eye className="w-3.5 h-3.5" /> View Document
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
