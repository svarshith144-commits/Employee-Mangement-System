import { create } from 'zustand';

// Preset Users for quick testing & role switching
export const PRESET_USERS = {
  EMPLOYEE: {
    id: 'EMP-1024',
    name: 'Revanth Kumar',
    email: 'revanth.k@enterprise.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    designation: 'Senior Software Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2023-03-15',
    manager: 'Sarah Jenkins',
    workLocation: 'Bengaluru HQ (Hybrid)',
    phone: '+91 98765 43210',
    emergencyContact: '+91 98765 00000 (Spouse)',
    employmentType: 'Full-time Permanent'
  },
  MANAGER: {
    id: 'MGR-2001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise.com',
    role: 'MANAGER',
    department: 'Engineering',
    designation: 'VP of Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2021-06-01',
    manager: 'CEO',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98765 11111',
    emergencyContact: '+91 98765 22222',
    employmentType: 'Full-time Executive'
  },
  HR: {
    id: 'HR-3005',
    name: 'Michael Scott',
    email: 'michael.s@enterprise.com',
    role: 'HR',
    department: 'Human Resources',
    designation: 'Head of People Operations',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2020-01-10',
    manager: 'CEO',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98765 33333',
    emergencyContact: '+91 98765 44444',
    employmentType: 'Full-time'
  },
  ADMIN: {
    id: 'ADM-0001',
    name: 'Eleanor Vance',
    email: 'eleanor.v@enterprise.com',
    role: 'ADMIN',
    department: 'Executive Administration',
    designation: 'Chief Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2019-01-01',
    manager: 'Board of Directors',
    workLocation: 'Global HQ',
    phone: '+91 98765 99999',
    emergencyContact: '+91 98765 88888',
    employmentType: 'Executive'
  }
};

const MOCK_EMPLOYEES = [
  {
    id: 'EMP-1024',
    employeeId: 'EMP-1024',
    name: 'Revanth Kumar',
    email: 'revanth.k@enterprise.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    designation: 'Senior Software Developer',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2023-03-15',
    manager: 'Sarah Jenkins',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '1996-08-24',
    address: 'Indiranagar 100ft Rd, Bengaluru, KA',
    emergencyContact: '+91 98765 00000 (Spouse)',
    employmentType: 'Full-time Permanent',
    qrToken: 'QR-EMP-1024-SECURE-HASH-88392',
    salary: 58000
  },
  {
    id: 'MGR-2001',
    employeeId: 'MGR-2001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise.com',
    role: 'MANAGER',
    department: 'Engineering',
    designation: 'VP of Engineering',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2021-06-01',
    manager: 'Eleanor Vance',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98765 11111',
    gender: 'Female',
    dob: '1989-11-12',
    address: 'Koramangala 4th Block, Bengaluru, KA',
    emergencyContact: '+91 98765 22222',
    employmentType: 'Full-time Executive',
    qrToken: 'QR-MGR-2001-SECURE-HASH-11203',
    salary: 140000
  },
  {
    id: 'HR-3005',
    employeeId: 'HR-3005',
    name: 'Michael Scott',
    email: 'michael.s@enterprise.com',
    role: 'HR',
    department: 'Human Resources',
    designation: 'Head of People Operations',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2020-01-10',
    manager: 'Eleanor Vance',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98765 33333',
    gender: 'Male',
    dob: '1985-04-15',
    address: 'Whitefield, Bengaluru, KA',
    emergencyContact: '+91 98765 44444',
    employmentType: 'Full-time',
    qrToken: 'QR-HR-3005-SECURE-HASH-44129',
    salary: 95000
  },
  {
    id: 'ADM-0001',
    employeeId: 'ADM-0001',
    name: 'Eleanor Vance',
    email: 'eleanor.v@enterprise.com',
    role: 'ADMIN',
    department: 'Executive Administration',
    designation: 'Chief Operations Officer',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2019-01-01',
    manager: 'Board of Directors',
    workLocation: 'Global HQ',
    phone: '+91 98765 99999',
    gender: 'Female',
    dob: '1982-09-30',
    address: 'MG Road, Bengaluru, KA',
    emergencyContact: '+91 98765 88888',
    employmentType: 'Executive',
    qrToken: 'QR-ADM-0001-SECURE-HASH-99812',
    salary: 210000
  },
  {
    id: 'EMP-1025',
    employeeId: 'EMP-1025',
    name: 'Aisha Patel',
    email: 'aisha.p@enterprise.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    designation: 'Frontend Specialist',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2023-09-01',
    manager: 'Sarah Jenkins',
    workLocation: 'Remote (Mumbai)',
    phone: '+91 98123 45678',
    gender: 'Female',
    dob: '1998-02-14',
    address: 'Bandra West, Mumbai, MH',
    emergencyContact: '+91 98123 00000',
    employmentType: 'Full-time',
    qrToken: 'QR-EMP-1025-SECURE-HASH-77218',
    salary: 52000
  },
  {
    id: 'EMP-1026',
    employeeId: 'EMP-1026',
    name: 'David Miller',
    email: 'david.m@enterprise.com',
    role: 'EMPLOYEE',
    department: 'Finance',
    designation: 'Financial Analyst',
    status: 'ON_LEAVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2022-11-20',
    manager: 'Eleanor Vance',
    workLocation: 'Bengaluru HQ',
    phone: '+91 98999 12345',
    gender: 'Male',
    dob: '1994-07-08',
    address: 'HSR Layout, Bengaluru, KA',
    emergencyContact: '+91 98999 00000',
    employmentType: 'Full-time',
    qrToken: 'QR-EMP-1026-SECURE-HASH-66512',
    salary: 62000
  },
  {
    id: 'EMP-1027',
    employeeId: 'EMP-1027',
    name: 'Priya Sharma',
    email: 'priya.s@enterprise.com',
    role: 'EMPLOYEE',
    department: 'Marketing',
    designation: 'Lead Content Strategist',
    status: 'PROBATION',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    joiningDate: '2024-01-15',
    manager: 'Michael Scott',
    workLocation: 'Bengaluru HQ',
    phone: '+91 97777 55555',
    gender: 'Female',
    dob: '1997-05-19',
    address: 'JP Nagar, Bengaluru, KA',
    emergencyContact: '+91 97777 00000',
    employmentType: 'Probationary',
    qrToken: 'QR-EMP-1027-SECURE-HASH-33291',
    salary: 48000
  }
];

const MOCK_DEPARTMENTS = [
  { id: 'DEP-01', name: 'Engineering', description: 'Core software development, cloud infrastructure, AI, & DevOps', manager: 'Sarah Jenkins', employeeCount: 42, status: 'ACTIVE' },
  { id: 'DEP-02', name: 'Human Resources', description: 'Talent acquisition, employee welfare, payroll, & compliance', manager: 'Michael Scott', employeeCount: 12, status: 'ACTIVE' },
  { id: 'DEP-03', name: 'Finance', description: 'Financial planning, accounting, auditing, & tax management', manager: 'Eleanor Vance', employeeCount: 15, status: 'ACTIVE' },
  { id: 'DEP-04', name: 'Marketing', description: 'Brand strategy, content creation, performance marketing, & PR', manager: 'Priya Sharma', employeeCount: 18, status: 'ACTIVE' },
  { id: 'DEP-05', name: 'Sales & Operations', description: 'Client acquisition, enterprise partnerships, & operational flow', manager: 'David Miller', employeeCount: 28, status: 'ACTIVE' }
];

const MOCK_ATTENDANCE = [
  { id: 'ATT-101', employeeId: 'EMP-1024', date: '2026-10-08', checkIn: '09:12 AM', checkOut: '06:08 PM', workingHours: '8h 56m', status: 'PRESENT', method: 'QR_SCAN' },
  { id: 'ATT-102', employeeId: 'EMP-1024', date: '2026-10-07', checkIn: '09:05 AM', checkOut: '06:15 PM', workingHours: '9h 10m', status: 'PRESENT', method: 'MANUAL' },
  { id: 'ATT-103', employeeId: 'EMP-1024', date: '2026-10-06', checkIn: '09:45 AM', checkOut: '06:00 PM', workingHours: '8h 15m', status: 'LATE', method: 'QR_SCAN' },
  { id: 'ATT-104', employeeId: 'EMP-1024', date: '2026-10-05', checkIn: '09:00 AM', checkOut: '05:30 PM', workingHours: '8h 30m', status: 'PRESENT', method: 'QR_SCAN' },
  { id: 'ATT-105', employeeId: 'EMP-1025', date: '2026-10-08', checkIn: '08:55 AM', checkOut: '06:05 PM', workingHours: '9h 10m', status: 'PRESENT', method: 'QR_SCAN' },
  { id: 'ATT-106', employeeId: 'EMP-1026', date: '2026-10-08', checkIn: '-', checkOut: '-', workingHours: '0h 00m', status: 'ON_LEAVE', method: 'SYSTEM' }
];

const MOCK_LEAVE_BALANCES = {
  'EMP-1024': { annual: { total: 15, used: 3, remaining: 12 }, sick: { total: 12, used: 5, remaining: 7 }, casual: { total: 10, used: 2, remaining: 8 }, maternity: { total: 0, used: 0, remaining: 0 }, paternity: { total: 10, used: 0, remaining: 10 }, unpaid: { total: 0, used: 0, remaining: 0 } },
  'MGR-2001': { annual: { total: 20, used: 5, remaining: 15 }, sick: { total: 12, used: 2, remaining: 10 }, casual: { total: 10, used: 1, remaining: 9 }, maternity: { total: 90, used: 0, remaining: 90 }, paternity: { total: 0, used: 0, remaining: 0 }, unpaid: { total: 0, used: 0, remaining: 0 } }
};

const MOCK_LEAVE_REQUESTS = [
  {
    id: 'LV-901',
    employeeId: 'EMP-1024',
    employeeName: 'Revanth Kumar',
    department: 'Engineering',
    leaveType: 'CASUAL',
    startDate: '2026-10-12',
    endDate: '2026-10-14',
    days: 3,
    reason: 'Family personal function and festival celebrations',
    document: null,
    status: 'PENDING',
    appliedOn: '2026-10-06',
    approvedBy: 'Sarah Jenkins'
  },
  {
    id: 'LV-900',
    employeeId: 'EMP-1024',
    employeeName: 'Revanth Kumar',
    department: 'Engineering',
    leaveType: 'SICK',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    days: 2,
    reason: 'Severe viral fever and physician prescribed bed rest',
    document: 'medical_cert_sep.pdf',
    status: 'APPROVED',
    appliedOn: '2026-09-17',
    approvedBy: 'Sarah Jenkins'
  },
  {
    id: 'LV-899',
    employeeId: 'EMP-1026',
    employeeName: 'David Miller',
    department: 'Finance',
    leaveType: 'ANNUAL',
    startDate: '2026-10-05',
    endDate: '2026-10-10',
    days: 6,
    reason: 'Annual family vacation trip to Himachal Pradesh',
    document: null,
    status: 'APPROVED',
    appliedOn: '2026-09-25',
    approvedBy: 'Eleanor Vance'
  }
];

const MOCK_TASKS = [
  {
    id: 'TSK-101',
    title: 'Develop Spring Security JWT & OAuth Auth Endpoints',
    description: 'Implement JWT authentication filter, refreshes, token validation, and RBAC endpoint guards in Spring Boot.',
    assignedToId: 'EMP-1024',
    assignedToName: 'Revanth Kumar',
    assignedById: 'MGR-2001',
    assignedByName: 'Sarah Jenkins',
    priority: 'HIGH',
    dueDate: '2026-10-15',
    status: 'IN_PROGRESS',
    progress: 75,
    department: 'Engineering'
  },
  {
    id: 'TSK-102',
    title: 'Design QR Scanner and Realtime STOMP Notification Client',
    description: 'Create responsive QR camera scanner component using html5-qrcode and connect to WebSocket STOMP notification topic.',
    assignedToId: 'EMP-1024',
    assignedToName: 'Revanth Kumar',
    assignedById: 'MGR-2001',
    assignedByName: 'Sarah Jenkins',
    priority: 'URGENT',
    dueDate: '2026-10-10',
    status: 'IN_PROGRESS',
    progress: 90,
    department: 'Engineering'
  },
  {
    id: 'TSK-103',
    title: 'Refactor Database Schema for Payslip & PDF Generator',
    description: 'Normalize Payroll, Payslip, and Tax deduction tables for multi-currency compliance.',
    assignedToId: 'EMP-1025',
    assignedToName: 'Aisha Patel',
    assignedById: 'MGR-2001',
    assignedByName: 'Sarah Jenkins',
    priority: 'MEDIUM',
    dueDate: '2026-10-18',
    status: 'TODO',
    progress: 10,
    department: 'Engineering'
  },
  {
    id: 'TSK-104',
    title: 'Q3 Financial Performance Audit & Tax Filings',
    description: 'Review corporate tax statements, expense receipts, and generate executive summary.',
    assignedToId: 'EMP-1026',
    assignedToName: 'David Miller',
    assignedById: 'ADM-0001',
    assignedByName: 'Eleanor Vance',
    priority: 'HIGH',
    dueDate: '2026-10-25',
    status: 'REVIEW',
    progress: 85,
    department: 'Finance'
  },
  {
    id: 'TSK-105',
    title: 'Conduct Q4 Hiring Drive for Senior Engineers',
    description: 'Screen resume pipelines, schedule technical interviews, and issue offer letters.',
    assignedToId: 'HR-3005',
    assignedToName: 'Michael Scott',
    assignedById: 'ADM-0001',
    assignedByName: 'Eleanor Vance',
    priority: 'MEDIUM',
    dueDate: '2026-10-30',
    status: 'IN_PROGRESS',
    progress: 50,
    department: 'Human Resources'
  }
];

const MOCK_PERFORMANCE = {
  'EMP-1024': {
    employeeId: 'EMP-1024',
    employeeName: 'Revanth Kumar',
    period: 'Q3 2026 Performance Review',
    overallScore: 87,
    ratings: {
      technical: 92,
      communication: 84,
      teamwork: 88,
      productivity: 86,
      problemSolving: 89
    },
    goals: [
      { id: 1, title: 'Deliver WebSocket Live Attendance Microservice', status: 'COMPLETED', progress: 100 },
      { id: 2, title: 'Maintain 95%+ Unit Test Code Coverage', status: 'IN_PROGRESS', progress: 85 },
      { id: 3, title: 'Mentor 2 Junior Frontend Interns', status: 'COMPLETED', progress: 100 }
    ],
    managerFeedback: 'Revanth consistently demonstrates outstanding technical competence and clean architecture design. His work on the real-time notification subsystem exceeded team expectations.',
    selfReview: 'Delivered core microservices on time with high code quality. Focused on improving automated testing and cross-team communication.'
  }
};

const MOCK_PAYROLL = [
  {
    id: 'PAY-2026-10',
    employeeId: 'EMP-1024',
    employeeName: 'Revanth Kumar',
    designation: 'Senior Software Developer',
    department: 'Engineering',
    month: 'October',
    year: 2026,
    basicSalary: 45000,
    allowances: 8000,
    bonus: 5000,
    grossSalary: 58000,
    deductions: 4500,
    tax: 3000,
    netSalary: 50500,
    status: 'PROCESSED',
    paidOn: '2026-10-01',
    paymentMethod: 'Direct Bank Transfer (HDFC ***4892)'
  },
  {
    id: 'PAY-2026-09',
    employeeId: 'EMP-1024',
    employeeName: 'Revanth Kumar',
    designation: 'Senior Software Developer',
    department: 'Engineering',
    month: 'September',
    year: 2026,
    basicSalary: 45000,
    allowances: 7800,
    bonus: 4000,
    grossSalary: 56800,
    deductions: 4000,
    tax: 3000,
    netSalary: 49800,
    status: 'PAID',
    paidOn: '2026-09-01',
    paymentMethod: 'Direct Bank Transfer (HDFC ***4892)'
  }
];

const MOCK_DOCUMENTS = [
  { id: 'DOC-1', employeeId: 'EMP-1024', title: 'Official Employment Offer Letter', category: 'OFFER_LETTER', fileSize: '2.4 MB', uploadedAt: '2023-03-15', fileUrl: '#', isPrivate: true },
  { id: 'DOC-2', employeeId: 'EMP-1024', title: 'Government Identification (Aadhaar/Passport)', category: 'ID_PROOF', fileSize: '1.1 MB', uploadedAt: '2023-03-16', fileUrl: '#', isPrivate: true },
  { id: 'DOC-3', employeeId: 'EMP-1024', title: 'Previous Company Experience Certificate', category: 'EXPERIENCE', fileSize: '850 KB', uploadedAt: '2023-03-18', fileUrl: '#', isPrivate: false },
  { id: 'DOC-4', employeeId: 'EMP-1024', title: 'Company Code of Conduct & IP Non-Disclosure', category: 'POLICY', fileSize: '4.2 MB', uploadedAt: '2023-03-15', fileUrl: '#', isPrivate: false }
];

const MOCK_ANNOUNCEMENTS = [
  {
    id: 'ANN-101',
    title: '🪔 Diwali Festival Holidays Announcement',
    content: 'All offices will remain closed from October 20th to October 22nd, 2026. Wishing everyone a joyous Diwali!',
    date: '2026-10-05',
    category: 'HOLIDAY',
    targetDepartment: 'All Employees',
    author: 'Michael Scott (Head of HR)',
    urgent: true
  },
  {
    id: 'ANN-102',
    title: '🚀 Q4 All-Hands Town Hall & Strategy Update',
    content: 'Join us live this Thursday at 3:00 PM IST for our quarterly company update, performance highlights, and product roadmap overview.',
    date: '2026-10-04',
    category: 'EVENT',
    targetDepartment: 'All Employees',
    author: 'Eleanor Vance (COO)',
    urgent: false
  },
  {
    id: 'ANN-103',
    title: '🛡️ Updated Remote Work & Device Security Policy',
    content: 'Please ensure all workstation VPN software and security patches are updated to v4.8 by October 15th.',
    date: '2026-10-01',
    category: 'POLICY',
    targetDepartment: 'Engineering',
    author: 'Sarah Jenkins (VP of Eng)',
    urgent: false
  }
];

const MOCK_NOTIFICATIONS = [
  { id: 'NOT-1', userId: 'EMP-1024', title: 'Leave Application Pending', message: 'Your leave request for 12 Oct - 14 Oct is under review by Sarah Jenkins.', date: '10 mins ago', read: false, type: 'LEAVE', link: '/leave' },
  { id: 'NOT-2', userId: 'EMP-1024', title: 'New Task Assigned', message: 'You have been assigned: Develop Spring Security JWT Endpoints.', date: '1 hour ago', read: false, type: 'TASK', link: '/tasks' },
  { id: 'NOT-3', userId: 'EMP-1024', title: 'October Payslip Available', message: 'Your payslip for October 2026 is ready to download.', date: '1 day ago', read: true, type: 'PAYROLL', link: '/payroll' },
  { id: 'NOT-4', userId: 'MGR-2001', title: 'New Leave Request', message: 'Revanth Kumar applied for 3 days Casual Leave.', date: '2 hours ago', read: false, type: 'LEAVE', link: '/leave' }
];

const MOCK_HOLIDAYS = [
  { id: 'HOL-1', title: 'Gandhi Jayanti', date: '2026-10-02', day: 'Friday', type: 'National Holiday' },
  { id: 'HOL-2', title: 'Diwali Festival', date: '2026-10-20', day: 'Tuesday', type: 'Festival' },
  { id: 'HOL-3', title: 'Diwali Balipratipada', date: '2026-10-21', day: 'Wednesday', type: 'Festival' },
  { id: 'HOL-4', title: 'Kannada Rajyotsava', date: '2026-11-01', day: 'Sunday', type: 'State Holiday' },
  { id: 'HOL-5', title: 'Christmas Day', date: '2026-12-25', day: 'Friday', type: 'Public Holiday' }
];

export const useStore = create((set, get) => ({
  isAuthenticated: Boolean(localStorage.getItem('ems_token')),
  token: localStorage.getItem('ems_token') || null,
  currentUser: (() => {
    try {
      const saved = localStorage.getItem('ems_user');
      return saved ? JSON.parse(saved) : PRESET_USERS.EMPLOYEE;
    } catch (e) {
      return PRESET_USERS.EMPLOYEE;
    }
  })(),
  employees: MOCK_EMPLOYEES,
  departments: MOCK_DEPARTMENTS,
  attendance: MOCK_ATTENDANCE,
  leaveBalances: MOCK_LEAVE_BALANCES,
  leaveRequests: MOCK_LEAVE_REQUESTS,
  tasks: MOCK_TASKS,
  performance: MOCK_PERFORMANCE,
  payroll: MOCK_PAYROLL,
  documents: MOCK_DOCUMENTS,
  announcements: MOCK_ANNOUNCEMENTS,
  notifications: MOCK_NOTIFICATIONS,
  holidays: MOCK_HOLIDAYS,

  // Login Action
  login: (roleKey = 'EMPLOYEE') => {
    const targetUser = PRESET_USERS[roleKey] || PRESET_USERS.EMPLOYEE;
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: targetUser.email, role: targetUser.role }))}.mock_sig`;
    localStorage.setItem('ems_token', token);
    localStorage.setItem('ems_user', JSON.stringify(targetUser));
    set({
      isAuthenticated: true,
      token,
      currentUser: targetUser
    });
    return { success: true, user: targetUser };
  },

  // Logout Action
  logout: () => {
    localStorage.removeItem('ems_token');
    localStorage.removeItem('ems_user');
    set({
      isAuthenticated: false,
      token: null
    });
  },

  // Role Switcher Action
  switchRole: (roleKey) => {
    if (PRESET_USERS[roleKey]) {
      const targetUser = PRESET_USERS[roleKey];
      localStorage.setItem('ems_user', JSON.stringify(targetUser));
      set({ currentUser: targetUser });
    }
  },

  // Manual Check-In / Check-Out
  markAttendanceToday: (type = 'CHECK_IN') => {
    const { currentUser, attendance } = get();
    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const existing = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);

    if (existing) {
      if (type === 'CHECK_OUT') {
        const updated = attendance.map(a => 
          a.id === existing.id 
            ? { ...a, checkOut: timeStr, workingHours: '8h 45m', status: 'PRESENT' } 
            : a
        );
        set({ attendance: updated });
        get().addNotification({
          userId: currentUser.id,
          title: 'Checked Out Successfully',
          message: `Checked out today at ${timeStr}. Working hours logged.`,
          type: 'ATTENDANCE',
          link: '/attendance'
        });
      }
    } else {
      const newAtt = {
        id: `ATT-${Date.now()}`,
        employeeId: currentUser.id,
        date: todayStr,
        checkIn: timeStr,
        checkOut: '-',
        workingHours: 'In Progress',
        status: 'PRESENT',
        method: 'MANUAL'
      };
      set({ attendance: [newAtt, ...attendance] });
      get().addNotification({
        userId: currentUser.id,
        title: 'Checked In Successfully',
        message: `Checked in today at ${timeStr}. Welcome!`,
        type: 'ATTENDANCE',
        link: '/attendance'
      });
    }
  },

  // QR Code Attendance Check-in/out
  scanQRAttendance: (qrToken) => {
    const { employees, attendance, currentUser } = get();
    // Validate target employee by QR Token or ID
    const target = employees.find(e => e.qrToken === qrToken || e.employeeId === qrToken) || currentUser;

    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const existing = attendance.find(a => a.employeeId === target.id && a.date === todayStr);

    if (existing && existing.checkOut === '-') {
      // Perform Check-Out
      const updated = attendance.map(a => 
        a.id === existing.id ? { ...a, checkOut: timeStr, workingHours: '8h 50m' } : a
      );
      set({ attendance: updated });
      get().addNotification({
        userId: target.id,
        title: 'QR Attendance Check-Out',
        message: `Verified QR check-out for ${target.name} at ${timeStr}.`,
        type: 'ATTENDANCE',
        link: '/attendance'
      });
      return { success: true, message: `Successfully Checked-Out ${target.name} at ${timeStr}`, action: 'CHECK_OUT', employee: target };
    } else if (!existing) {
      // Perform Check-In
      const newRecord = {
        id: `ATT-QR-${Date.now()}`,
        employeeId: target.id,
        date: todayStr,
        checkIn: timeStr,
        checkOut: '-',
        workingHours: 'In Progress',
        status: 'PRESENT',
        method: 'QR_SCAN'
      };
      set({ attendance: [newRecord, ...attendance] });
      get().addNotification({
        userId: target.id,
        title: 'QR Attendance Check-In',
        message: `Verified QR check-in for ${target.name} at ${timeStr}.`,
        type: 'ATTENDANCE',
        link: '/attendance'
      });
      return { success: true, message: `Successfully Checked-In ${target.name} at ${timeStr}`, action: 'CHECK_IN', employee: target };
    } else {
      return { success: false, message: `${target.name} has already completed attendance check-in & check-out for today.`, employee: target };
    }
  },

  // Leave Management Actions
  applyLeave: (leaveData) => {
    const { currentUser, leaveRequests, leaveBalances } = get();
    const newRequest = {
      id: `LV-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      days: leaveData.days || 1,
      reason: leaveData.reason,
      document: leaveData.document || null,
      status: 'PENDING',
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: currentUser.manager
    };
    set({ leaveRequests: [newRequest, ...leaveRequests] });
    
    // Notify Manager & Employee
    get().addNotification({
      userId: currentUser.id,
      title: 'Leave Request Submitted',
      message: `Your ${leaveData.leaveType} leave request (${leaveData.startDate} to ${leaveData.endDate}) was submitted for approval.`,
      type: 'LEAVE',
      link: '/leave'
    });
    
    get().addNotification({
      userId: 'MGR-2001', // Sarah Jenkins Manager
      title: '🔔 Pending Leave Approval',
      message: `${currentUser.name} applied for ${leaveData.days || 1} day(s) ${leaveData.leaveType} leave.`,
      type: 'LEAVE',
      link: '/leave'
    });
  },

  updateLeaveStatus: (requestId, newStatus) => {
    const { leaveRequests } = get();
    const updated = leaveRequests.map(r => r.id === requestId ? { ...r, status: newStatus } : r);
    set({ leaveRequests: updated });
    
    const req = leaveRequests.find(r => r.id === requestId);
    if (req) {
      get().addNotification({
        userId: req.employeeId,
        title: `Leave ${newStatus.toUpperCase()}`,
        message: `Your leave request from ${req.startDate} to ${req.endDate} has been ${newStatus.toLowerCase()}.`,
        type: 'LEAVE',
        link: '/leave'
      });
    }
  },

  // Task Actions
  createTask: (taskData) => {
    const { tasks, currentUser } = get();
    const newTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: taskData.title,
      description: taskData.description,
      assignedToId: taskData.assignedToId,
      assignedToName: taskData.assignedToName,
      assignedById: currentUser.id,
      assignedByName: currentUser.name,
      priority: taskData.priority || 'MEDIUM',
      dueDate: taskData.dueDate,
      status: 'TODO',
      progress: 0,
      department: taskData.department || currentUser.department
    };
    set({ tasks: [newTask, ...tasks] });
    
    get().addNotification({
      userId: taskData.assignedToId,
      title: '🔔 New Task Assigned',
      message: `You have been assigned task: "${taskData.title}" by ${currentUser.name}.`,
      type: 'TASK',
      link: '/tasks'
    });
  },

  updateTaskStatus: (taskId, newStatus, newProgress) => {
    const { tasks } = get();
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: newStatus,
          progress: newProgress !== undefined ? newProgress : (newStatus === 'COMPLETED' ? 100 : t.progress)
        };
      }
      return t;
    });
    set({ tasks: updated });
  },

  // Employee CRUD for HR/Admin
  addEmployee: (empData) => {
    const { employees } = get();
    const newId = `EMP-${1000 + employees.length + 1}`;
    const newEmp = {
      ...empData,
      id: newId,
      employeeId: newId,
      status: empData.status || 'ACTIVE',
      qrToken: `QR-${newId}-HASH-${Math.floor(10000 + Math.random() * 90000)}`
    };
    set({ employees: [...employees, newEmp] });
    return newEmp;
  },

  updateEmployee: (empId, updatedFields) => {
    const { employees } = get();
    const updated = employees.map(e => e.id === empId ? { ...e, ...updatedFields } : e);
    set({ employees: updated });
  },

  // Announcement creation
  createAnnouncement: (annData) => {
    const { announcements, currentUser } = get();
    const newAnn = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: annData.title,
      content: annData.content,
      date: new Date().toISOString().split('T')[0],
      category: annData.category || 'GENERAL',
      targetDepartment: annData.targetDepartment || 'All Employees',
      author: `${currentUser.name} (${currentUser.designation})`,
      urgent: annData.urgent || false
    };
    set({ announcements: [newAnn, ...announcements] });

    // Broadcast to notifications
    get().addNotification({
      userId: 'ALL',
      title: `📢 Announcement: ${annData.title}`,
      message: annData.content.slice(0, 100) + '...',
      type: 'ANNOUNCEMENT',
      link: '/announcements'
    });
  },

  // Notification Handling
  addNotification: (notif) => {
    const { notifications } = get();
    const newNotif = {
      id: `NOT-${Date.now()}`,
      date: 'Just now',
      read: false,
      ...notif
    };
    set({ notifications: [newNotif, ...notifications] });
  },

  markNotificationRead: (id) => {
    const { notifications } = get();
    set({ notifications: notifications.map(n => n.id === id ? { ...n, read: true } : n) });
  },

  markAllNotificationsRead: () => {
    const { notifications } = get();
    set({ notifications: notifications.map(n => ({ ...n, read: true })) });
  }
}));
