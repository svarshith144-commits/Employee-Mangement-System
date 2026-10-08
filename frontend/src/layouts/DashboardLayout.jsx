import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import QRScannerModal from '../components/QRScannerModal';

export default function DashboardLayout() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header onOpenQRScanner={() => setIsQRModalOpen(true)} />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          <Outlet context={{ onOpenQRScanner: () => setIsQRModalOpen(true) }} />
        </main>
      </div>

      {/* Global QR Scanner Modal */}
      <QRScannerModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
}
