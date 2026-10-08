package com.enterprise.hrms.repository;

import com.enterprise.hrms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeId(String employeeId);
    Optional<Attendance> findByEmployeeIdAndDate(String employeeId, LocalDate date);
    List<Attendance> findByDate(LocalDate date);
}
