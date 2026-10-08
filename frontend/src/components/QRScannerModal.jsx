import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { X, QrCode, CheckCircle2, AlertCircle, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScannerModal({ isOpen, onClose }) {
  const { employees, scanQRAttendance, currentUser } = useStore();
  const [scanResult, setScanResult] = useState(null);
  const [selectedSimEmp, setSelectedSimEmp] = useState(currentUser.id);
  const [isScanningActive, setIsScanningActive] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setScanResult(null);
      return;
    }

    let scanner;
    try {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 220, height: 220 }
      }, false);

      scanner.render((decodedText) => {
        handleProcessQR(decodedText);
        scanner.clear();
      }, (error) => {
        // ignore scan glitches
      });
    } catch (e) {
      console.log('Scanner element fallback initialized');
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(e => {});
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcessQR = (token) => {
    const res = scanQRAttendance(token);
    setScanResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">QR Attendance Scanner</h3>
              <p className="text-[11px] text-slate-400">Scan employee pass or company kiosk QR code</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Result Alert Box */}
          {scanResult && (
            <div className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
              scanResult.success 
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
            }`}>
              {scanResult.success ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {scanResult.success ? `${scanResult.action === 'CHECK_IN' ? 'Check-In' : 'Check-Out'} Successful!` : 'Notice'}
                </h4>
                <p className="text-xs mt-0.5 leading-relaxed">{scanResult.message}</p>
                {scanResult.employee && (
                  <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-300">
                    Employee: {scanResult.employee.name} ({scanResult.employee.employeeId})
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HTML5 Camera Reader Target */}
          <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 text-center">
            <div id="reader" className="w-full text-slate-300 text-xs"></div>
          </div>

          {/* Instant Simulation Section */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quick One-Click Test Simulator</span>
            </div>
            
            <p className="text-[11px] text-slate-400 mb-3">
              Select an employee below to simulate scanning their unique encrypted QR token:
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedSimEmp}
                onChange={(e) => setSelectedSimEmp(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.employeeId}) - {e.department}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  const emp = employees.find(e => e.id === selectedSimEmp);
                  if (emp) handleProcessQR(emp.qrToken);
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <ShieldCheck className="w-4 h-4" />
                Simulate QR Scan
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
          >
            Close Scanner
          </button>
        </div>

      </div>
    </div>
  );
}
