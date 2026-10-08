import jsPDF from 'jspdf';

export const generatePayslipPDF = (payrollData) => {
  const doc = new jsPDF();
  
  // Header styling background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 40, 'F');
  
  // Header Title & Logo
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('ENTERPRISE DIGITAL PLATFORM', 15, 22);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Confidential Employee Salary Payslip', 15, 30);
  
  doc.text(`Pay Period: ${payrollData.month} ${payrollData.year}`, 140, 22);
  doc.text(`Doc ID: ${payrollData.id}`, 140, 30);
  
  // Divider line
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(1.5);
  doc.line(15, 45, 195, 45);
  
  // Employee Info Block
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Employee Information', 15, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Employee Name: ${payrollData.employeeName}`, 15, 65);
  doc.text(`Employee ID: ${payrollData.employeeId}`, 15, 73);
  doc.text(`Designation: ${payrollData.designation}`, 15, 81);
  doc.text(`Department: ${payrollData.department}`, 15, 89);
  
  doc.text(`Paid On: ${payrollData.paidOn}`, 120, 65);
  doc.text(`Status: ${payrollData.status}`, 120, 73);
  doc.text(`Payment Method: ${payrollData.paymentMethod}`, 120, 81);
  
  // Table Breakdown Box
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 100, 180, 75, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, 100, 180, 75, 'D');
  
  // Column Headers
  doc.setFont('helvetica', 'bold');
  doc.text('EARNINGS', 20, 110);
  doc.text('AMOUNT (₹)', 90, 110);
  
  doc.text('DEDUCTIONS & TAX', 110, 110);
  doc.text('AMOUNT (₹)', 170, 110);
  
  doc.line(15, 114, 195, 114);
  
  doc.setFont('helvetica', 'normal');
  
  // Earnings
  doc.text('Basic Salary', 20, 124);
  doc.text(`₹${payrollData.basicSalary?.toLocaleString()}`, 90, 124);
  
  doc.text('House & Travel Allowances', 20, 134);
  doc.text(`₹${payrollData.allowances?.toLocaleString()}`, 90, 134);
  
  doc.text('Performance Incentive / Bonus', 20, 144);
  doc.text(`₹${payrollData.bonus?.toLocaleString()}`, 90, 144);
  
  doc.setFont('helvetica', 'bold');
  doc.text('GROSS SALARY', 20, 160);
  doc.text(`₹${payrollData.grossSalary?.toLocaleString()}`, 90, 160);
  
  // Deductions
  doc.setFont('helvetica', 'normal');
  doc.text('Provident Fund & Insurance', 110, 124);
  doc.text(`₹${payrollData.deductions?.toLocaleString()}`, 170, 124);
  
  doc.text('Income Tax (TDS)', 110, 134);
  doc.text(`₹${payrollData.tax?.toLocaleString()}`, 170, 134);
  
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL DEDUCTIONS', 110, 160);
  doc.text(`₹${(payrollData.deductions + payrollData.tax)?.toLocaleString()}`, 170, 160);
  
  // Net Salary Highlight Box
  doc.setFillColor(238, 242, 255); // indigo 50
  doc.rect(15, 185, 180, 20, 'F');
  doc.setDrawColor(99, 102, 241);
  doc.rect(15, 185, 180, 20, 'D');
  
  doc.setTextColor(79, 70, 229);
  doc.setFontSize(14);
  doc.text('NET SALARY PAYABLE:', 25, 198);
  doc.setFontSize(16);
  doc.text(`₹${payrollData.netSalary?.toLocaleString()}`, 135, 198);
  
  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated document and does not require a physical signature.', 15, 230);
  doc.text('Enterprise HR Platform System • Generated on ' + new Date().toLocaleDateString(), 15, 236);
  
  doc.save(`Payslip_${payrollData.employeeId}_${payrollData.month}_${payrollData.year}.pdf`);
};
