package com.enterprise.hrms.controller;

import com.enterprise.hrms.model.Attendance;
import com.enterprise.hrms.model.Employee;
import com.enterprise.hrms.repository.AttendanceRepository;
import com.enterprise.hrms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin(origins = "*")
public class QRController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/scan")
    public ResponseEntity<?> scanQRAttendance(@RequestBody Map<String, String> request) {
        String token = request.get("qrToken");
        Optional<Employee> empOpt = employeeRepository.findByQrToken(token);

        if (empOpt.isEmpty()) {
            empOpt = employeeRepository.findById(token);
        }

        if (empOpt.isEmpty()) {
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("message", "Invalid or unregistered Employee QR Code");
            return ResponseEntity.badRequest().body(err);
        }

        Employee emp = empOpt.get();
        LocalDate today = LocalDate.now();
        String timeStr = LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a"));

        Optional<Attendance> attOpt = attendanceRepository.findByEmployeeIdAndDate(emp.getId(), today);

        Map<String, Object> resp = new HashMap<>();
        resp.put("employeeId", emp.getId());
        resp.put("employeeName", emp.getName());
        resp.put("timestamp", timeStr);

        if (attOpt.isPresent() && "-".equals(attOpt.get().getCheckOut())) {
            Attendance att = attOpt.get();
            att.setCheckOut(timeStr);
            att.setWorkingHours("8h 45m");
            attendanceRepository.save(att);

            resp.put("success", true);
            resp.put("action", "CHECK_OUT");
            resp.put("message", "Verified QR check-out for " + emp.getName() + " at " + timeStr);
        } else if (attOpt.isEmpty()) {
            Attendance newAtt = Attendance.builder()
                    .employeeId(emp.getId())
                    .date(today)
                    .checkIn(timeStr)
                    .checkOut("-")
                    .workingHours("In Progress")
                    .status("PRESENT")
                    .method("QR_SCAN")
                    .build();
            attendanceRepository.save(newAtt);

            resp.put("success", true);
            resp.put("action", "CHECK_IN");
            resp.put("message", "Verified QR check-in for " + emp.getName() + " at " + timeStr);
        } else {
            resp.put("success", false);
            resp.put("message", emp.getName() + " has already completed check-in & check-out for today.");
        }

        return ResponseEntity.ok(resp);
    }
}
