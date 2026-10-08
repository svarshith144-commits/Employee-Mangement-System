import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Attendance from './pages/Attendance';
import QRScanPage from './pages/QRScanPage';
import Leave from './pages/Leave';
import Tasks from './pages/Tasks';
import Performance from './pages/Performance';
import Payroll from './pages/Payroll';
import Documents from './pages/Documents';
import Announcements from './pages/Announcements';
import CalendarPage from './pages/Calendar';
import Departments from './pages/Departments';
import Reports from './pages/Reports';
import HRDashboard from './pages/HRDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance/scan" element={<QRScanPage />} />
          <Route path="leave" element={<Leave />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="performance" element={<Performance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="documents" element={<Documents />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="departments" element={<Departments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="hr" element={<HRDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
