import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Shield, Download, CheckCircle2 } from 'lucide-react';

export default function EmployeeQRCard({ employee }) {
  if (!employee) return null;

  const handleDownloadQR = () => {
    const svg = document.getElementById(`qr-svg-${employee.id}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = `QR_${employee.employeeId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center max-w-sm mx-auto">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Official Employee Pass</span>
        </div>
        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> VERIFIED
        </span>
      </div>

      {/* Employee Photo & Basic Info */}
      <div className="flex flex-col items-center mb-5">
        <img 
          src={employee.avatar} 
          alt={employee.name} 
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 mb-3 shadow-lg"
        />
        <h3 className="text-lg font-bold text-slate-100">{employee.name}</h3>
        <p className="text-xs text-indigo-400 font-semibold">{employee.designation}</p>
        <span className="mt-1 text-[11px] font-mono px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-lg">
          {employee.employeeId}
        </span>
      </div>

      {/* QR Display */}
      <div className="bg-white p-4 rounded-2xl shadow-inner inline-block mx-auto mb-4 ring-1 ring-slate-700">
        <QRCodeSVG 
          id={`qr-svg-${employee.id}`}
          value={employee.qrToken || employee.employeeId}
          size={160}
          level="H"
          includeMargin={false}
        />
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
        Scan at office kiosk or handheld device for instant attendance check-in & check-out.
      </p>

      {/* Actions */}
      <button
        onClick={handleDownloadQR}
        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
      >
        <Download className="w-4 h-4 text-indigo-400" />
        Download Pass QR
      </button>
    </div>
  );
}
