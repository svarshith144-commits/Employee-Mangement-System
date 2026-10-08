import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import EmployeeQRCard from '../components/EmployeeQRCard';
import { QrCode, ShieldCheck, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export default function QRScanPage() {
  const { currentUser, employees, scanQRAttendance } = useStore();
  const [simTargetId, setSimTargetId] = useState(currentUser.id);
  const [scanRes, setScanRes] = useState(null);

  const handleSimulate = () => {
    const target = employees.find(e => e.id === simTargetId);
    if (target) {
      const res = scanQRAttendance(target.qrToken);
      setScanRes(res);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-extrabold text-white">QR Identification & Attendance System</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Scan company kiosk or employee pass to record encrypted instant check-in / check-out.
        </p>
      </div>

      {/* Grid: Pass Card vs Scanner Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pass Card */}
        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> Your Encrypted Employee Pass
          </h3>
          <EmployeeQRCard employee={currentUser} />
        </div>

        {/* Scan Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Kiosk QR Verification Engine</h3>
                <p className="text-xs text-slate-400">Validates employee security token & registers attendance</p>
              </div>
            </div>

            {/* Response Banner */}
            {scanRes && (
              <div className={`p-4 rounded-2xl border mb-6 flex items-start gap-3 animate-in fade-in duration-200 ${
                scanRes.success 
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
              }`}>
                {scanRes.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {scanRes.success ? `${scanRes.action} Recorded` : 'Scan Alert'}
                  </h4>
                  <p className="text-xs mt-0.5 leading-relaxed">{scanRes.message}</p>
                </div>
              </div>
            )}

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 mb-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-indigo-500/40 rounded-2xl flex items-center justify-center text-indigo-400">
                <QrCode className="w-16 h-16 animate-pulse" />
              </div>
              <p className="text-xs font-semibold text-slate-300">Camera / Scanner Ready</p>
              <p className="text-[11px] text-slate-500 mt-1">Hold employee QR pass in front of camera or test with quick simulator below.</p>
            </div>
          </div>

          {/* Quick Simulation */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" /> Instant Scanner Test Simulator
            </div>
            
            <div className="flex gap-2">
              <select
                value={simTargetId}
                onChange={(e) => setSimTargetId(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.employeeId})
                  </option>
                ))}
              </select>
              <button
                onClick={handleSimulate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                Trigger Scan
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
