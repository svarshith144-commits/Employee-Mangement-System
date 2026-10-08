package com.enterprise.hrms.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "attendance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private LocalDate date;

    private String checkIn;
    private String checkOut;
    private String workingHours;
    
    private String status; // PRESENT, ABSENT, HALF_DAY, LATE, ON_LEAVE
    private String method; // QR_SCAN, MANUAL
}
